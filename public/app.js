// Estado Global de ZonaSwitchChile
let catalog = [];
let cart = JSON.parse(localStorage.getItem('zonaswitch_cart_v3')) || [];
let currentUser = JSON.parse(localStorage.getItem('zonaswitch_user')) || null;
let activeCategory = 'todos';
let searchQuery = '';
let selectedGameForModal = null;
let selectedLicenseType = null;

// Textos exactos de condiciones de licencias solicitados por el usuario
const LICENSE_CONDITIONS = {
  secundaria: [
    "✔️ Deberás seguir los pasos de instalación proporcionados.",
    "✔️ Puedes acumular trofeos y guardar avances.",
    "✔️ Para jugar no es necesario usar conexión a internet."
  ],
  primaria: [
    "✔️ Instalas desde nuestra cuenta y lo juegas con tu cuenta personal.",
    "✔️ Puedes acumular trofeos y guardar avances.",
    "✔️ Puedes jugar con o sin internet."
  ]
};

// Inicializar Aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  initUserSession();
  fetchCatalog();
  updateCartBadge();
});

// Registrar Listeners principales
function initEventListeners() {
  // Abrir / Cerrar Drawer del Carrito
  document.getElementById('cart-btn').addEventListener('click', openCartDrawer);
  document.getElementById('close-drawer').addEventListener('click', closeCartDrawer);
  document.getElementById('drawer-overlay').addEventListener('click', closeCartDrawer);

  // Búsqueda en tiempo real
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderCatalog();
  });

  // Filtros por Categoría
  const categoryContainer = document.getElementById('category-pills');
  categoryContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('pill-btn')) {
      document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      activeCategory = e.target.dataset.category;
      renderCatalog();
    }
  });

  // Listeners de Modales de Autenticación
  document.getElementById('open-login-btn').addEventListener('click', openLoginModal);
  document.getElementById('open-register-btn').addEventListener('click', openRegisterModal);
  document.getElementById('close-login-modal').addEventListener('click', closeLoginModal);
  document.getElementById('close-register-modal').addEventListener('click', closeRegisterModal);

  document.getElementById('switch-to-register').addEventListener('click', (e) => {
    e.preventDefault(); closeLoginModal(); openRegisterModal();
  });
  document.getElementById('switch-to-login').addEventListener('click', (e) => {
    e.preventDefault(); closeRegisterModal(); openLoginModal();
  });

  // Validaciones en tiempo real para contraseña en Registro
  const regPasswordInput = document.getElementById('register-password');
  regPasswordInput.addEventListener('input', validateRegisterPasswordForm);

  // Form de Autenticación
  document.getElementById('register-form').addEventListener('submit', handleRegisterSubmit);
  document.getElementById('login-form').addEventListener('submit', handleLoginSubmit);

  // Listeners de Modal de Detalle de Juego
  document.getElementById('close-game-modal').addEventListener('click', closeGameModal);

  // Radios de Licencia (Secundaria / Primaria)
  document.querySelectorAll('input[name="license_type"]').forEach(radio => {
    radio.addEventListener('change', handleLicenseSelection);
  });

  document.getElementById('gmodal-add-btn').addEventListener('click', handleAddSelectedLicenseToCart);
  document.getElementById('gmodal-buy-btn').addEventListener('click', handleBuySelectedLicenseNow);

  // Formulario Checkout
  document.getElementById('checkout-form').addEventListener('submit', handleCheckout);

  // Modal de Recibo
  document.getElementById('close-modal-btn').addEventListener('click', closeReceiptModal);
  document.getElementById('copy-code-btn').addEventListener('click', copyOrderCode);
}

// --- GESTIÓN DE SESIÓN DE USUARIOS ---
function initUserSession() {
  const userNavArea = document.getElementById('user-nav-area');
  if (currentUser) {
    userNavArea.innerHTML = `
      <div class="user-profile-badge">
        <span>👤</span>
        <span class="user-name-tag">${escapeHTML(currentUser.username)}</span>
        <button class="logout-icon-btn" onclick="handleLogout()" title="Cerrar Sesión">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    `;
  } else {
    userNavArea.innerHTML = `
      <button class="nav-auth-btn login-btn" onclick="openLoginModal()">Iniciar Sesión</button>
      <button class="nav-auth-btn register-btn" onclick="openRegisterModal()">Registrarse</button>
    `;
  }
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('zonaswitch_user');
  initUserSession();
  showToast('Has cerrado sesión correctamente.');
}

// Validar reglas de contraseña en vivo
function validateRegisterPasswordForm() {
  const pwd = document.getElementById('register-password').value;
  const ruleLen = document.getElementById('rule-length');
  const ruleNum = document.getElementById('rule-number');
  const submitBtn = document.getElementById('register-submit-btn');

  const isLenValid = pwd.length >= 6;
  const isNumValid = /\d/.test(pwd);

  if (isLenValid) {
    ruleLen.className = 'rule-item valid';
    ruleLen.textContent = '✔️ Mínimo 6 caracteres completado';
  } else {
    ruleLen.className = 'rule-item invalid';
    ruleLen.textContent = '❌ Mínimo 6 letras / caracteres';
  }

  if (isNumValid) {
    ruleNum.className = 'rule-item valid';
    ruleNum.textContent = '✔️ Al menos 1 número completado';
  } else {
    ruleNum.className = 'rule-item invalid';
    ruleNum.textContent = '❌ Al menos 1 número';
  }

  const username = document.getElementById('register-username').value.trim();
  submitBtn.disabled = !(isLenValid && isNumValid && username.length >= 3);
}

// Submit de Registro en Servidor
async function handleRegisterSubmit(e) {
  e.preventDefault();
  const username = document.getElementById('register-username').value.trim();
  const password = document.getElementById('register-password').value;
  const errorMsg = document.getElementById('register-error-msg');
  errorMsg.textContent = '';

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (!res.ok || !data.exito) {
      errorMsg.textContent = data.error || 'No se pudo realizar el registro.';
      return;
    }

    // Auto-login
    currentUser = data.usuario;
    localStorage.setItem('zonaswitch_user', JSON.stringify(currentUser));
    initUserSession();
    closeRegisterModal();
    document.getElementById('register-form').reset();
    showToast(`¡Bienvenido a ZonaSwitchChile, ${currentUser.username}!`);
  } catch (err) {
    errorMsg.textContent = 'Error de comunicación con el servidor.';
  }
}

// Submit de Login en Servidor
async function handleLoginSubmit(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const errorMsg = document.getElementById('login-error-msg');
  errorMsg.textContent = '';

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (!res.ok || !data.exito) {
      errorMsg.textContent = data.error || 'Credenciales incorrectas.';
      return;
    }

    currentUser = data.usuario;
    localStorage.setItem('zonaswitch_user', JSON.stringify(currentUser));
    initUserSession();
    closeLoginModal();
    document.getElementById('login-form').reset();
    showToast(`¡Hola de nuevo, ${currentUser.username}!`);
  } catch (err) {
    errorMsg.textContent = 'Error de comunicación con el servidor.';
  }
}

function openLoginModal() { document.getElementById('login-modal-backdrop').classList.add('active'); }
function closeLoginModal() { document.getElementById('login-modal-backdrop').classList.remove('active'); }
function openRegisterModal() { document.getElementById('register-modal-backdrop').classList.add('active'); }
function closeRegisterModal() { document.getElementById('register-modal-backdrop').classList.remove('active'); }

// --- CATÁLOGO DE JUEGOS ---
async function fetchCatalog() {
  const grid = document.getElementById('games-grid');
  try {
    const res = await fetch('/api/juegos');
    if (!res.ok) throw new Error('Error al consultar catálogo');
    catalog = await res.json();
    renderCatalog();
  } catch (err) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">⚠️</div>
        <h3>No se pudo cargar el catálogo</h3>
      </div>
    `;
  }
}

function renderCatalog() {
  const grid = document.getElementById('games-grid');
  const countLabel = document.getElementById('games-count');

  const filtered = catalog.filter(game => {
    const matchCategory = activeCategory === 'todos' || game.categoria === activeCategory;
    const matchSearch = game.titulo.toLowerCase().includes(searchQuery) ||
                        game.categoria.toLowerCase().includes(searchQuery);
    return matchCategory && matchSearch;
  });

  countLabel.textContent = `${filtered.length} juego(s) disponible(s)`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>No se encontraron juegos</h3>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(game => `
    <article class="game-card" onclick="openGameModal(${game.id})">
      <div class="card-media">
        <img src="${game.imagen}" alt="${game.titulo}" loading="lazy">
        <span class="card-tag">${game.categoria}</span>
        <span class="card-size-tag">📦 ${game.peso}</span>
      </div>
      <div class="card-content">
        <div class="card-rating">★ ${game.rating}</div>
        <h3 class="card-title">${game.titulo}</h3>
        <p class="card-desc">${game.descripcion}</p>
        <div class="card-license-hint">
          🎮 Desde $${game.precioSecundaria.toFixed(2)} (Secundaria) / $${game.precioPrimaria.toFixed(2)} (Primaria)
        </div>
        <div class="card-footer">
          <div class="price-container">
            <span class="original-price">$${game.precioOriginal.toFixed(2)}</span>
            <span class="current-price">$${game.precioSecundaria.toFixed(2)}</span>
          </div>
          <button class="view-details-btn">
            Ver Licencias &rarr;
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// --- MODAL DE DETALLE DEL JUEGO Y LICENCIAS OBLIGATORIAS ---
function openGameModal(gameId) {
  const game = catalog.find(g => g.id === gameId);
  if (!game) return;

  selectedGameForModal = game;
  selectedLicenseType = null;

  document.getElementById('gmodal-img').src = game.imagen;
  document.getElementById('gmodal-title').textContent = game.titulo;
  document.getElementById('gmodal-category').textContent = game.categoria;
  document.getElementById('gmodal-rating').textContent = `★ ${game.rating}`;
  document.getElementById('gmodal-size').textContent = `📦 ${game.peso}`;
  document.getElementById('gmodal-summary').textContent = game.resumenExtenso || game.descripcion;

  document.getElementById('gmodal-price-sec').textContent = `$${game.precioSecundaria.toFixed(2)}`;
  document.getElementById('gmodal-price-prim').textContent = `$${game.precioPrimaria.toFixed(2)}`;

  // Reset radios and buttons
  document.querySelectorAll('input[name="license_type"]').forEach(r => r.checked = false);
  document.getElementById('license-info-box').innerHTML = `
    <p class="info-placeholder">👇 Selecciona una opción (Secundaria o Primaria) para ver las condiciones e instalar en tu consola.</p>
  `;

  document.getElementById('gmodal-add-btn').disabled = true;
  document.getElementById('gmodal-buy-btn').disabled = true;

  document.getElementById('game-modal-backdrop').classList.add('active');
}

function closeGameModal() {
  document.getElementById('game-modal-backdrop').classList.remove('active');
}

function handleLicenseSelection(e) {
  selectedLicenseType = e.target.value; // 'secundaria' o 'primaria'
  const bullets = LICENSE_CONDITIONS[selectedLicenseType];

  const infoBox = document.getElementById('license-info-box');
  infoBox.innerHTML = `
    <ul class="license-bullets">
      ${bullets.map(b => `<li>${b}</li>`).join('')}
    </ul>
  `;

  document.getElementById('gmodal-add-btn').disabled = false;
  document.getElementById('gmodal-buy-btn').disabled = false;
}

// Añadir juego con la licencia seleccionada al carrito
function handleAddSelectedLicenseToCart() {
  if (!selectedGameForModal || !selectedLicenseType) return;
  addGameWithLicenseToCart(selectedGameForModal, selectedLicenseType);
  closeGameModal();
}

function handleBuySelectedLicenseNow() {
  if (!selectedGameForModal || !selectedLicenseType) return;
  addGameWithLicenseToCart(selectedGameForModal, selectedLicenseType);
  closeGameModal();
  openCartDrawer();
}

function addGameWithLicenseToCart(game, licenseType) {
  const isPrimaria = licenseType === 'primaria';
  const price = isPrimaria ? game.precioPrimaria : game.precioSecundaria;
  const licenseTitle = isPrimaria ? 'Licencia Primaria' : 'Licencia Secundaria';

  // ID único combinando id de juego + tipo de licencia
  const cartItemId = `${game.id}-${licenseType}`;
  const existingIndex = cart.findIndex(item => item.cartItemId === cartItemId);

  if (existingIndex > -1) {
    cart[existingIndex].cantidad += 1;
  } else {
    cart.push({
      cartItemId,
      id: game.id,
      titulo: game.titulo,
      precio: price,
      precioOriginal: game.precioOriginal,
      imagen: game.imagen,
      licencia: licenseTitle,
      cantidad: 1
    });
  }

  saveCart();
  updateCartBadge();
  showToast(`¡"${game.titulo}" (${licenseTitle}) añadido al carrito!`);
}

// --- CARRITO ---
function saveCart() {
  localStorage.setItem('zonaswitch_cart_v3', JSON.stringify(cart));
}

function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  const drawerCount = document.getElementById('drawer-count');
  const totalCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  badge.textContent = totalCount;
  if (drawerCount) drawerCount.textContent = totalCount;
}

function openCartDrawer() {
  renderCartDrawer();
  document.getElementById('cart-drawer').classList.add('active');
  document.getElementById('drawer-overlay').classList.add('active');
}

function closeCartDrawer() {
  document.getElementById('cart-drawer').classList.remove('active');
  document.getElementById('drawer-overlay').classList.remove('active');
}

function renderCartDrawer() {
  const container = document.getElementById('cart-items-container');
  const checkoutWrapper = document.getElementById('checkout-wrapper');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-view">
        <div class="empty-cart-icon">🛒</div>
        <h4>Tu carrito está vacío</h4>
        <p style="font-size: 0.85rem;">Explora el catálogo y selecciona tu juego y tipo de licencia.</p>
      </div>
    `;
    checkoutWrapper.style.display = 'none';
    return;
  }

  checkoutWrapper.style.display = 'block';

  let subtotal = 0;
  let totalOriginal = 0;

  container.innerHTML = cart.map(item => {
    const itemSubtotal = item.precio * item.cantidad;
    const itemOriginal = (item.precioOriginal || item.precio * 2) * item.cantidad;
    subtotal += itemSubtotal;
    totalOriginal += itemOriginal;

    return `
      <div class="cart-item-card">
        <img class="cart-item-img" src="${item.imagen}" alt="${item.titulo}">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.titulo}</div>
          <div class="cart-item-license-tag">📌 ${item.licencia}</div>
          <div class="cart-item-price">$${item.precio.toFixed(2)} c/u</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="changeQuantity('${item.cartItemId}', -1)">-</button>
            <span class="qty-val">${item.cantidad}</span>
            <button class="qty-btn" onclick="changeQuantity('${item.cartItemId}', 1)">+</button>
          </div>
        </div>
        <button class="remove-item-btn" onclick="removeFromCart('${item.cartItemId}')">
          🗑️
        </button>
      </div>
    `;
  }).join('');

  const ahorro = totalOriginal - subtotal;

  document.getElementById('summary-subtotal').textContent = `$${totalOriginal.toFixed(2)}`;
  document.getElementById('summary-discount').textContent = `-$${ahorro.toFixed(2)}`;
  document.getElementById('summary-total').textContent = `$${subtotal.toFixed(2)}`;
}

function changeQuantity(cartItemId, delta) {
  const itemIndex = cart.findIndex(item => item.cartItemId === cartItemId);
  if (itemIndex === -1) return;

  cart[itemIndex].cantidad += delta;
  if (cart[itemIndex].cantidad <= 0) {
    cart.splice(itemIndex, 1);
  }

  saveCart();
  updateCartBadge();
  renderCartDrawer();
}

function removeFromCart(cartItemId) {
  cart = cart.filter(item => item.cartItemId !== cartItemId);
  saveCart();
  updateCartBadge();
  renderCartDrawer();
  showToast('Ítem removido del carrito.');
}

// --- CHECKOUT ---
async function handleCheckout(e) {
  e.preventDefault();
  if (cart.length === 0) return;

  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const email = document.getElementById('email').value.trim();
  const username = currentUser ? currentUser.username : 'Invitado';

  const btn = document.getElementById('submit-order-btn');
  btn.disabled = true;
  btn.textContent = 'Procesando pedido...';

  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, email, username, carrito: cart })
    });

    const data = await res.json();
    if (data.exito) {
      cart = [];
      saveCart();
      updateCartBadge();
      closeCartDrawer();
      document.getElementById('checkout-form').reset();
      openReceiptModal(data.detalles);
    } else {
      alert(data.error || 'Ocurrió un problema.');
    }
  } catch (err) {
    alert('Error de conexión.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Finalizar Pedido en ZonaSwitchChile';
  }
}

function openReceiptModal(detalles) {
  document.getElementById('receipt-title').textContent = `¡Gracias por tu compra en ZonaSwitchChile, ${detalles.cliente.split(' ')[0]}!`;
  document.getElementById('receipt-code').textContent = detalles.codigoOrden;
  document.getElementById('receipt-client').textContent = detalles.cliente;
  document.getElementById('receipt-user').textContent = detalles.usuario;
  document.getElementById('receipt-total').textContent = `$${detalles.total}`;
  document.getElementById('receipt-date').textContent = detalles.fecha;

  document.getElementById('modal-backdrop').classList.add('active');
}

function closeReceiptModal() {
  document.getElementById('modal-backdrop').classList.remove('active');
}

function copyOrderCode() {
  const code = document.getElementById('receipt-code').textContent;
  navigator.clipboard.writeText(code).then(() => {
    showToast('¡Código de orden copiado al portapapeles!');
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>🇨🇱</span><span>${escapeHTML(message)}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
