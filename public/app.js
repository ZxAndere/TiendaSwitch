// Estado Global de la Aplicación
let catalog = [];
let cart = JSON.parse(localStorage.getItem('switch_cart_v2')) || [];
let activeCategory = 'todos';
let searchQuery = '';

// Inicializar Aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  fetchCatalog();
  updateCartBadge();
});

// Registrar Listeners
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

  // Formulario Checkout
  document.getElementById('checkout-form').addEventListener('submit', handleCheckout);

  // Modal de Recibo
  document.getElementById('close-modal-btn').addEventListener('click', closeReceiptModal);
  document.getElementById('copy-code-btn').addEventListener('click', copyOrderCode);
}

// Cargar catálogo desde la API Express
async function fetchCatalog() {
  const grid = document.getElementById('games-grid');
  renderSkeletons(grid);

  try {
    const res = await fetch('/api/juegos');
    if (!res.ok) throw new Error('Error al consultar el catálogo');
    catalog = await res.json();
    renderCatalog();
  } catch (err) {
    console.error('Error al cargar juegos:', err);
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">⚠️</div>
        <h3>No se pudo cargar el catálogo</h3>
        <p>Asegúrate de que el servidor Node.js esté en ejecución.</p>
      </div>
    `;
  }
}

// Renderizar Skeleton Loaders mientras carga
function renderSkeletons(container) {
  container.innerHTML = Array(6).fill(0).map(() => `
    <div class="game-card" style="opacity: 0.6;">
      <div class="card-media" style="background: rgba(255,255,255,0.05); animate: pulse 1.5s infinite;"></div>
      <div class="card-content">
        <div style="height: 20px; background: rgba(255,255,255,0.08); border-radius: 4px; margin-bottom: 8px;"></div>
        <div style="height: 14px; width: 60%; background: rgba(255,255,255,0.05); border-radius: 4px;"></div>
      </div>
    </div>
  `).join('');
}

// Renderizar Cuadrícula de Juegos según Filtros
function renderCatalog() {
  const grid = document.getElementById('games-grid');
  const countLabel = document.getElementById('games-count');

  const filtered = catalog.filter(game => {
    const matchCategory = activeCategory === 'todos' || game.categoria === activeCategory;
    const matchSearch = game.titulo.toLowerCase().includes(searchQuery) ||
                        game.categoria.toLowerCase().includes(searchQuery) ||
                        (game.descripcion && game.descripcion.toLowerCase().includes(searchQuery));
    return matchCategory && matchSearch;
  });

  countLabel.textContent = `${filtered.length} juego(s) disponible(s)`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>No encontramos juegos</h3>
        <p>Intenta buscar con otros términos o selecciona otra categoría.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(game => {
    const discountPercent = Math.round((1 - (game.precio / game.precioOriginal)) * 100);
    return `
      <article class="game-card">
        <div class="card-media">
          <img src="${game.imagen}" alt="${game.titulo}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=600&q=80'">
          <span class="card-tag">${game.categoria}</span>
          ${discountPercent > 0 ? `<span class="discount-badge">-${discountPercent}%</span>` : ''}
        </div>
        <div class="card-content">
          <div class="card-rating">
            ★ ${game.rating} <span style="color: var(--text-dim); font-weight: normal;">(Excelente)</span>
          </div>
          <h3 class="card-title">${game.titulo}</h3>
          <p class="card-desc">${game.descripcion}</p>
          <div class="card-footer">
            <div class="price-container">
              <span class="original-price">$${game.precioOriginal.toFixed(2)}</span>
              <span class="current-price">$${game.precio.toFixed(2)}</span>
            </div>
            <button class="add-cart-btn" onclick="addToCart(${game.id})">
              <span>+ Añadir</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Añadir juego al carrito
function addToCart(gameId) {
  const game = catalog.find(g => g.id === gameId);
  if (!game) return;

  const existingIndex = cart.findIndex(item => item.id === gameId);

  if (existingIndex > -1) {
    cart[existingIndex].cantidad += 1;
  } else {
    cart.push({
      id: game.id,
      titulo: game.titulo,
      precio: game.precio,
      precioOriginal: game.precioOriginal,
      imagen: game.imagen,
      cantidad: 1
    });
  }

  saveCart();
  updateCartBadge();
  showToast(`¡"${game.titulo}" se añadió al carrito!`);
}

// Guardar en LocalStorage
function saveCart() {
  localStorage.setItem('switch_cart_v2', JSON.stringify(cart));
}

// Actualizar Contador en la Navbar con Animación
function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  const drawerCount = document.getElementById('drawer-count');
  const totalCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  badge.textContent = totalCount;
  if (drawerCount) drawerCount.textContent = totalCount;

  badge.classList.remove('bump');
  void badge.offsetWidth; // trigger reflow
  if (totalCount > 0) {
    badge.classList.add('bump');
  }
}

// Abrir y Renderizar Drawer
function openCartDrawer() {
  renderCartDrawer();
  document.getElementById('cart-drawer').classList.add('active');
  document.getElementById('drawer-overlay').classList.add('active');
  document.getElementById('cart-drawer').setAttribute('aria-hidden', 'false');
}

// Cerrar Drawer
function closeCartDrawer() {
  document.getElementById('cart-drawer').classList.remove('active');
  document.getElementById('drawer-overlay').classList.remove('active');
  document.getElementById('cart-drawer').setAttribute('aria-hidden', 'true');
}

// Renderizar contenido interno del Carrito Lateral
function renderCartDrawer() {
  const container = document.getElementById('cart-items-container');
  const checkoutWrapper = document.getElementById('checkout-wrapper');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-view">
        <div class="empty-cart-icon">🛒</div>
        <h4>Tu carrito está vacío</h4>
        <p style="font-size: 0.85rem; margin-top: 0.4rem;">¡Explora las ofertas del catálogo y añade tus juegos favoritos!</p>
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
        <img class="cart-item-img" src="${item.imagen}" alt="${item.titulo}" onerror="this.src='https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=100&q=80'">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.titulo}</div>
          <div class="cart-item-price">$${item.precio.toFixed(2)} c/u</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
            <span class="qty-val">${item.cantidad}</span>
            <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="remove-item-btn" onclick="removeFromCart(${item.id})" title="Eliminar ítem">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    `;
  }).join('');

  const ahorro = totalOriginal - subtotal;

  document.getElementById('summary-subtotal').textContent = `$${totalOriginal.toFixed(2)}`;
  document.getElementById('summary-discount').textContent = `-$${ahorro.toFixed(2)}`;
  document.getElementById('summary-total').textContent = `$${subtotal.toFixed(2)}`;
}

// Cambiar Cantidad
function changeQuantity(gameId, delta) {
  const itemIndex = cart.findIndex(item => item.id === gameId);
  if (itemIndex === -1) return;

  cart[itemIndex].cantidad += delta;

  if (cart[itemIndex].cantidad <= 0) {
    cart.splice(itemIndex, 1);
  }

  saveCart();
  updateCartBadge();
  renderCartDrawer();
}

// Eliminar ítem completo
function removeFromCart(gameId) {
  cart = cart.filter(item => item.id !== gameId);
  saveCart();
  updateCartBadge();
  renderCartDrawer();
  showToast('Ítem removido del carrito.');
}

// Enviar datos de Checkout a la API
async function handleCheckout(e) {
  e.preventDefault();

  if (cart.length === 0) return;

  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const email = document.getElementById('email').value.trim();

  const btn = document.getElementById('submit-order-btn');
  btn.disabled = true;
  btn.innerHTML = '<span>Procesando pedido...</span>';

  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, email, carrito: cart })
    });

    const data = await res.json();

    if (data.exito) {
      // Limpiar carrito
      cart = [];
      saveCart();
      updateCartBadge();
      closeCartDrawer();
      document.getElementById('checkout-form').reset();

      // Mostrar Modal Recibo
      openReceiptModal(data.detalles);
    } else {
      alert(data.error || 'Ocurrió un problema al procesar el pedido.');
    }
  } catch (err) {
    console.error(err);
    alert('Error de conexión con el servidor.');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `
      <span>Finalizar Pedido y Recibir Juegos</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    `;
  }
}

// Mostrar Recibo Modal
function openReceiptModal(detalles) {
  document.getElementById('receipt-title').textContent = `¡Gracias por tu compra, ${detalles.cliente.split(' ')[0]}!`;
  document.getElementById('receipt-code').textContent = detalles.codigoOrden;
  document.getElementById('receipt-client').textContent = detalles.cliente;
  document.getElementById('receipt-total').textContent = `$${detalles.total}`;
  document.getElementById('receipt-savings').textContent = `$${detalles.ahorro}`;
  document.getElementById('receipt-items').textContent = `${detalles.articulos} juego(s)`;
  document.getElementById('receipt-date').textContent = detalles.fecha;

  document.getElementById('modal-backdrop').classList.add('active');
}

function closeReceiptModal() {
  document.getElementById('modal-backdrop').classList.remove('active');
}

// Copiar Código de Orden
function copyOrderCode() {
  const code = document.getElementById('receipt-code').textContent;
  navigator.clipboard.writeText(code).then(() => {
    showToast('¡Código de orden copiado al portapapeles!');
  });
}

// Mostrar Toast Flotante
function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: var(--joycon-cyan);">⚡</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
