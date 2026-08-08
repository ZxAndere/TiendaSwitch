// Estado Global de ZonaSwitchChile
let catalog = [];
let cart = JSON.parse(localStorage.getItem('zonaswitch_cart_v4')) || [];
let currentUser = JSON.parse(localStorage.getItem('zonaswitch_user')) || null;
let activeCategory = 'todos';
let searchQuery = '';
let selectedGameForModal = null;
let selectedLicenseType = null;
let currentModalImages = [];
let currentModalImageIndex = 0;
let payCarouselIndex = 0;

let pendingRegisterData = null; // Guardar datos temporales para confirmación OTP
let pendingUpdateType = null; // 'email' o 'password'

// Textos exactos de condiciones de Cuentas solicitados por el usuario
const ACCOUNT_CONDITIONS = {
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

// --- SISTEMA DE MULTIMONEDA / CONVERSIÓN DE PESOS Y DIVISAS 2026 ---
const CURRENCY_RATES = {
  CLP: { symbol: '$', code: 'CLP', rate: 1, decimals: 0 },
  ARS: { symbol: '$', code: 'ARS', rate: 1.63865, decimals: 0 },
  BRL: { symbol: 'R$ ', code: 'BRL', rate: 0.005582, decimals: 2 },
  MXN: { symbol: '$', code: 'MXN', rate: 0.018757, decimals: 2 },
  COP: { symbol: '$', code: 'COP', rate: 3.47445, decimals: 0 },
  PEN: { symbol: 'S/ ', code: 'PEN', rate: 0.003697, decimals: 2 },
  HNL: { symbol: 'L ', code: 'HNL', rate: 0.029421, decimals: 2 }
};

let currentCurrency = localStorage.getItem('zonaswitch_currency') || 'CLP';

// Helper de formato de moneda dinámico y exacto
function formatCLP(num) {
  if (typeof num !== 'number') return '$0 CLP';
  const conf = CURRENCY_RATES[currentCurrency] || CURRENCY_RATES.CLP;
  const val = num * conf.rate;

  const formatted = conf.decimals === 0
    ? Math.round(val).toLocaleString('es-CL')
    : val.toLocaleString('es-CL', { minimumFractionDigits: conf.decimals, maximumFractionDigits: conf.decimals });

  return `${conf.symbol}${formatted} ${conf.code}`;
}

// Inicializar Aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  initUserSession();
  fetchCatalog();
  updateCartBadge();
  checkPaymentReturnUrls();
});

// Registrar Listeners principales
function initEventListeners() {
  // Abrir / Cerrar Drawer del Carrito
  document.getElementById('cart-btn').addEventListener('click', openCartDrawer);
  document.getElementById('close-drawer').addEventListener('click', closeCartDrawer);
  document.getElementById('drawer-overlay').addEventListener('click', closeCartDrawer);

  // Modal de Selección de Pasarela de Pago
  const openPayModalBtn = document.getElementById('open-payment-modal-btn');
  const closePayModalBtn = document.getElementById('close-payment-modal');
  const submitPayBtn = document.getElementById('submit-payment-btn');

  if (openPayModalBtn) openPayModalBtn.addEventListener('click', openPaymentModal);
  if (closePayModalBtn) closePayModalBtn.addEventListener('click', closePaymentModal);
  if (submitPayBtn) submitPayBtn.addEventListener('click', handlePaymentSubmit);

  const payPrevBtn = document.getElementById('pay-slider-prev');
  const payNextBtn = document.getElementById('pay-slider-next');
  if (payPrevBtn) payPrevBtn.addEventListener('click', () => navigatePaySlider(-1));
  if (payNextBtn) payNextBtn.addEventListener('click', () => navigatePaySlider(1));

  // Radios de selección de pasarela de pago (Flow vs Mercado Pago)
  document.querySelectorAll('input[name="payment_gateway"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      document.querySelectorAll('.gateway-option-card').forEach(card => card.classList.remove('active'));
      e.target.closest('.gateway-option-card').classList.add('active');
    });
  });

  // Búsqueda en tiempo real (Buscador en el Header)
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderCatalog();
    });
  }

  // Selector de Conversión de Moneda
  const currSelect = document.getElementById('currency-select');
  if (currSelect) {
    currSelect.value = currentCurrency;
    currSelect.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      localStorage.setItem('zonaswitch_currency', currentCurrency);
      renderCatalog();
      renderCartDrawer();
      if (selectedGameForModal) {
        document.getElementById('gmodal-price-sec').textContent = formatCLP(selectedGameForModal.precioSecundaria);
        document.getElementById('gmodal-price-prim').textContent = formatCLP(selectedGameForModal.precioPrimaria);
      }
    });
  }

  // Filtros por Categoría
  const categoryContainer = document.getElementById('category-pills');
  if (categoryContainer) {
    categoryContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('pill-btn')) {
        document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        activeCategory = e.target.dataset.category;
        renderCatalog();
      }
    });
  }

  // Modales de Autenticación
  const openLoginBtn = document.getElementById('open-login-btn');
  const openRegBtn = document.getElementById('open-register-btn');
  if (openLoginBtn) openLoginBtn.addEventListener('click', openLoginModal);
  if (openRegBtn) openRegBtn.addEventListener('click', openRegisterModal);

  const closeLoginBtn = document.getElementById('close-login-modal');
  if (closeLoginBtn) closeLoginBtn.addEventListener('click', closeLoginModal);

  const closeRegBtn = document.getElementById('close-register-modal');
  if (closeRegBtn) closeRegBtn.addEventListener('click', closeRegisterModal);

  const closeVerifyBtn = document.getElementById('close-verify-modal');
  if (closeVerifyBtn) closeVerifyBtn.addEventListener('click', closeVerifyModal);

  const closeOrdersBtn = document.getElementById('close-user-orders-modal');
  if (closeOrdersBtn) closeOrdersBtn.addEventListener('click', closeUserOrdersModal);

  const closeSettingsBtn = document.getElementById('close-user-settings-modal');
  if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', closeUserSettingsModal);

  const closeUpdateOtpBtn = document.getElementById('close-update-otp-modal');
  if (closeUpdateOtpBtn) closeUpdateOtpBtn.addEventListener('click', closeUpdateOtpModal);

  const switchToReg = document.getElementById('switch-to-register');
  if (switchToReg) switchToReg.addEventListener('click', (e) => {
    e.preventDefault(); closeLoginModal(); openRegisterModal();
  });
  const switchToLogin = document.getElementById('switch-to-login');
  if (switchToLogin) switchToLogin.addEventListener('click', (e) => {
    e.preventDefault(); closeRegisterModal(); openLoginModal();
  });

  // Forms & Botones OTP y Usuario
  const regForm = document.getElementById('register-form');
  if (regForm) regForm.addEventListener('submit', handleRegisterSubmit);

  const verifyOtpForm = document.getElementById('verify-otp-form');
  if (verifyOtpForm) verifyOtpForm.addEventListener('submit', handleVerifyOtpSubmit);

  const resendBtn = document.getElementById('resend-code-btn');
  if (resendBtn) resendBtn.addEventListener('click', handleResendCode);

  const loginForm = document.getElementById('login-form');
  if (loginForm) loginForm.addEventListener('submit', handleLoginSubmit);

  // Settings Forms
  const usernameForm = document.getElementById('change-username-form');
  if (usernameForm) usernameForm.addEventListener('submit', handleUsernameChangeSubmit);

  const emailForm = document.getElementById('change-email-form');
  if (emailForm) emailForm.addEventListener('submit', handleEmailChangeSubmit);

  const passwordForm = document.getElementById('change-password-form');
  if (passwordForm) passwordForm.addEventListener('submit', handlePasswordChangeSubmit);

  const updateOtpForm = document.getElementById('update-otp-form');
  if (updateOtpForm) updateOtpForm.addEventListener('submit', handleUpdateOtpSubmit);

  // Tabs de configuración de cuenta
  document.querySelectorAll('.settings-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.settings-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.settings-tab-content .tab-pane').forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      const tabId = e.target.dataset.tab;
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Modal de Detalle de Juego
  const closeGameModalBtn = document.getElementById('close-game-modal');
  if (closeGameModalBtn) closeGameModalBtn.addEventListener('click', closeGameModal);

  const sliderPrevBtn = document.getElementById('modal-slider-prev');
  const sliderNextBtn = document.getElementById('modal-slider-next');
  if (sliderPrevBtn) sliderPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); navigateModalSlider(-1); });
  if (sliderNextBtn) sliderNextBtn.addEventListener('click', (e) => { e.stopPropagation(); navigateModalSlider(1); });

  // Radios de Cuenta (Secundaria / Primaria)
  document.querySelectorAll('input[name="license_type"]').forEach(radio => {
    radio.addEventListener('change', handleLicenseSelection);
  });

  const gmodalAddBtn = document.getElementById('gmodal-add-btn');
  if (gmodalAddBtn) gmodalAddBtn.addEventListener('click', handleAddSelectedLicenseToCart);

  const gmodalBuyBtn = document.getElementById('gmodal-buy-btn');
  if (gmodalBuyBtn) gmodalBuyBtn.addEventListener('click', handleBuySelectedLicenseNow);

  // Checkout & Recibo
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) checkoutForm.addEventListener('submit', handleCheckout);

  const paymentCheckoutForm = document.getElementById('payment-checkout-form');
  if (paymentCheckoutForm) paymentCheckoutForm.addEventListener('submit', handlePaymentSubmit);

  const closeModalBtn = document.getElementById('close-modal-btn');
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeReceiptModal);

  const copyCodeBtn = document.getElementById('copy-code-btn');
  if (copyCodeBtn) copyCodeBtn.addEventListener('click', copyOrderCode);

  // Cerrar menú desplegable al hacer clic afuera
  document.addEventListener('click', (e) => {
    const userMenu = document.getElementById('user-dropdown-menu');
    const trigger = document.getElementById('user-menu-trigger');
    if (userMenu && trigger && !trigger.contains(e.target) && !userMenu.contains(e.target)) {
      userMenu.classList.remove('active');
    }
  });
}

function openVerifyModal() { document.getElementById('verify-modal-backdrop').classList.add('active'); }
function closeVerifyModal() { document.getElementById('verify-modal-backdrop').classList.remove('active'); }
function openUserOrdersModal() { fetchAndRenderUserOrders(); document.getElementById('user-orders-modal-backdrop').classList.add('active'); }
function closeUserOrdersModal() { document.getElementById('user-orders-modal-backdrop').classList.remove('active'); }
function openUserSettingsModal() { document.getElementById('user-settings-modal-backdrop').classList.add('active'); }
function closeUserSettingsModal() { document.getElementById('user-settings-modal-backdrop').classList.remove('active'); }
function openUpdateOtpModal() { document.getElementById('update-otp-modal-backdrop').classList.add('active'); }
function closeUpdateOtpModal() { document.getElementById('update-otp-modal-backdrop').classList.remove('active'); }

// --- GESTIÓN DE CONFIGURACIÓN DE CUENTA Y ÓRDENES ---
async function fetchAndRenderUserOrders() {
  const container = document.getElementById('user-orders-container');
  if (!currentUser) return;

  container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">Cargando tus órdenes...</p>';

  try {
    const res = await fetch(`/api/user/orders?user=${encodeURIComponent(currentUser.username)}`);
    const orders = await res.json();

    if (!Array.isArray(orders) || orders.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📦</div>
          <p>Aún no has realizado ninguna compra en la tienda.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = orders.map(order => {
      const isPaid = order.estado === 'pagada';
      const itemsHtml = Array.isArray(order.carrito) 
        ? order.carrito.map(i => `<div class="oh-item"><span>• ${escapeHTML(i.titulo)} (${i.licencia})</span><strong>${formatCLP(i.precio * i.cantidad)}</strong></div>`).join('')
        : '';

      return `
        <div class="order-history-card">
          <div class="oh-header">
            <div>
              <span class="oh-code">${escapeHTML(order.codigoOrden)}</span>
              <div class="oh-date">${escapeHTML(order.fecha)}</div>
            </div>
            <span class="oh-badge ${isPaid ? 'pagada' : 'pendiente'}">${isPaid ? '🟢 Pagada' : '🟡 Pendiente'}</span>
          </div>
          <div class="oh-body">
            ${itemsHtml}
          </div>
          <div class="oh-footer">
            <span>Total Cancelado (${order.metodoPago === 'mercadopago' ? 'Mercado Pago' : 'Flow'}):</span>
            <span class="highlight-green">${order.totalFormatted || formatCLP(order.total)}</span>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    container.innerHTML = '<p style="text-align: center; color: #ff4d6d;">No se pudieron cargar tus órdenes.</p>';
  }
}

async function handleUsernameChangeSubmit(e) {
  e.preventDefault();
  if (!currentUser) return;

  const newUsername = document.getElementById('new-username-input').value.trim();
  const currentPassword = document.getElementById('username-current-password').value;
  const errorMsg = document.getElementById('change-username-error');
  errorMsg.textContent = '';

  try {
    const res = await fetch('/api/user/update-username', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser.id, newUsername, currentPassword })
    });

    const data = await res.json();
    if (!res.ok || !data.exito) {
      errorMsg.textContent = data.error || 'No se pudo cambiar el usuario.';
      return;
    }

    currentUser = data.usuario;
    localStorage.setItem('zonaswitch_user', JSON.stringify(currentUser));
    initUserSession();
    closeUserSettingsModal();
    showToast(`¡Tu nombre de usuario ahora es ${currentUser.username}!`);
  } catch (err) {
    errorMsg.textContent = 'Error de conexión con el servidor.';
  }
}

async function handleEmailChangeSubmit(e) {
  e.preventDefault();
  if (!currentUser) return;

  const newEmail = document.getElementById('new-email-input').value.trim();
  const currentPassword = document.getElementById('email-current-password').value;
  const errorMsg = document.getElementById('change-email-error');
  errorMsg.textContent = '';

  try {
    const res = await fetch('/api/user/send-email-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser.id, newEmail, currentPassword })
    });

    const data = await res.json();
    if (!res.ok || !data.exito) {
      errorMsg.textContent = data.error || 'No se pudo enviar el código.';
      return;
    }

    pendingUpdateType = 'email';
    document.getElementById('update-otp-title').textContent = 'Confirmar Nuevo Correo';
    document.getElementById('update-otp-subtitle').textContent = `Ingresa el código enviado a ${newEmail}`;
    closeUserSettingsModal();
    openUpdateOtpModal();
    showToast(`¡Código enviado al nuevo correo ${newEmail}! 📩`);
  } catch (err) {
    errorMsg.textContent = 'Error al conectar con el servidor.';
  }
}

async function handlePasswordChangeSubmit(e) {
  e.preventDefault();
  if (!currentUser) return;

  const newPassword = document.getElementById('new-password-input').value;
  const errorMsg = document.getElementById('change-password-error');
  errorMsg.textContent = '';

  try {
    const res = await fetch('/api/user/send-password-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser.id, newPassword })
    });

    const data = await res.json();
    if (!res.ok || !data.exito) {
      errorMsg.textContent = data.error || 'No se pudo enviar el código.';
      return;
    }

    pendingUpdateType = 'password';
    document.getElementById('update-otp-title').textContent = 'Confirmar Nueva Contraseña';
    document.getElementById('update-otp-subtitle').textContent = `Ingresa el código enviado a tu correo registrado`;
    closeUserSettingsModal();
    openUpdateOtpModal();
    showToast('¡Código enviado a tu correo registrado! 📩');
  } catch (err) {
    errorMsg.textContent = 'Error de conexión con el servidor.';
  }
}

async function handleUpdateOtpSubmit(e) {
  e.preventDefault();
  if (!currentUser || !pendingUpdateType) return;

  const code = document.getElementById('update-code-input').value.trim();
  const errorMsg = document.getElementById('update-otp-error');
  const btn = document.getElementById('update-otp-submit-btn');
  errorMsg.textContent = '';

  btn.disabled = true;

  try {
    const endpoint = pendingUpdateType === 'email' ? '/api/user/confirm-email-update' : '/api/user/confirm-password-update';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser.id, code })
    });

    const data = await res.json();
    if (!res.ok || !data.exito) {
      errorMsg.textContent = data.error || 'Código incorrecto o expirado.';
      btn.disabled = false;
      return;
    }

    if (data.usuario) {
      currentUser = data.usuario;
      localStorage.setItem('zonaswitch_user', JSON.stringify(currentUser));
      initUserSession();
    }

    closeUpdateOtpModal();
    pendingUpdateType = null;
    showToast(data.mensaje || '¡Cambio realizado con éxito! 🎉');
  } catch (err) {
    errorMsg.textContent = 'Error de comunicación.';
  } finally {
    btn.disabled = false;
  }
}

function initUserSession() {
  const userNavArea = document.getElementById('user-nav-area');
  if (!userNavArea) return;

  if (currentUser) {
    userNavArea.innerHTML = `
      <div class="user-profile-menu-container">
        <button class="user-profile-trigger" id="user-menu-trigger">
          <span>👤</span>
          <span>${escapeHTML(currentUser.username)}</span>
          <span style="font-size: 0.7rem;">▼</span>
        </button>
        <div class="user-dropdown-menu" id="user-dropdown-menu">
          <button class="dropdown-item" onclick="openUserOrdersModal()">📦 Mis Órdenes</button>
          <button class="dropdown-item" onclick="openUserSettingsModal()">⚙️ Opciones de Cuenta</button>
          <button class="dropdown-item danger" onclick="handleLogout()">🚪 Cerrar Sesión</button>
        </div>
      </div>
    `;

    document.getElementById('user-menu-trigger').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('user-dropdown-menu').classList.toggle('active');
    });
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

function validateRegisterPasswordForm() {
  const pwd = document.getElementById('register-password').value;
  const email = document.getElementById('register-email').value.trim();
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
  submitBtn.disabled = !(isLenValid && isNumValid && username.length >= 3 && email.includes('@'));
}

async function handleRegisterSubmit(e) {
  e.preventDefault();
  const username = document.getElementById('register-username').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const errorMsg = document.getElementById('register-error-msg');
  const submitBtn = document.getElementById('register-submit-btn');
  errorMsg.textContent = '';

  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando código...';

  try {
    const res = await fetch('/api/auth/send-register-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    if (!res.ok || !data.exito) {
      errorMsg.textContent = data.error || 'No se pudo enviar el código de verificación.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Continuar y Enviar Código';
      return;
    }

    pendingRegisterData = { username, email, password };
    document.getElementById('verify-email-target').textContent = email;
    closeRegisterModal();
    openVerifyModal();
    showToast('¡Código de 6 dígitos enviado a tu correo! 📩');
  } catch (err) {
    errorMsg.textContent = 'Error de comunicación con el servidor.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Continuar y Enviar Código';
  }
}

async function handleVerifyOtpSubmit(e) {
  e.preventDefault();
  if (!pendingRegisterData) return;

  const code = document.getElementById('verify-code-input').value.trim();
  const errorMsg = document.getElementById('verify-error-msg');
  const submitBtn = document.getElementById('verify-submit-btn');
  errorMsg.textContent = '';

  submitBtn.disabled = true;
  submitBtn.textContent = 'Verificando...';

  try {
    const res = await fetch('/api/auth/verify-register-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: pendingRegisterData.email, code })
    });

    const data = await res.json();
    if (!res.ok || !data.exito) {
      errorMsg.textContent = data.error || 'Código incorrecto o expirado.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Verificar y Crear Cuenta';
      return;
    }

    currentUser = data.usuario;
    localStorage.setItem('zonaswitch_user', JSON.stringify(currentUser));
    initUserSession();
    closeVerifyModal();
    pendingRegisterData = null;
    document.getElementById('register-form').reset();
    document.getElementById('verify-otp-form').reset();
    showToast(`¡Cuenta creada y verificada exitosamente, ${currentUser.username}! 🎉`);
  } catch (err) {
    errorMsg.textContent = 'Error de conexión con el servidor.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Verificar y Crear Cuenta';
  }
}

async function handleResendCode() {
  if (!pendingRegisterData) return;
  const resendBtn = document.getElementById('resend-code-btn');
  resendBtn.disabled = true;
  resendBtn.textContent = 'Enviando...';

  try {
    const res = await fetch('/api/auth/send-register-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pendingRegisterData)
    });
    const data = await res.json();
    if (data.exito) {
      showToast('¡Nuevo código enviado a tu correo! 📩');
    } else {
      alert(data.error || 'No se pudo reenviar el código.');
    }
  } catch (err) {
    alert('Error al conectar con el servidor.');
  } finally {
    resendBtn.disabled = false;
    resendBtn.textContent = 'Reenviar correo con código';
  }
}

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

  grid.innerHTML = filtered.map((game) => `
    <article class="game-card" onclick="openGameModal(${game.id})">
      <div class="card-media">
        <img src="${game.imagen}" alt="${game.titulo}" loading="lazy">
        <span class="card-tag">${game.categoria}</span>
        <span class="card-size-tag">📦 ${game.peso}</span>
      </div>
      <div class="card-content">
        <h3 class="card-title">${game.titulo}</h3>
        <p class="card-desc">${game.descripcion}</p>
        <div class="card-license-hint">
          🎮 Secundaria: ${formatCLP(game.precioSecundaria)} | Primaria: ${formatCLP(game.precioPrimaria)}
        </div>
        <div class="card-footer">
          <div class="price-container">
            <span class="original-price">${formatCLP(game.precioOriginal)}</span>
            <span class="current-price">${formatCLP(game.precioSecundaria)}</span>
          </div>
          <button class="buy-card-btn">
            Comprar
          </button>
        </div>
      </div>
    </article>
  `).join('');

  initScrollObserverForCards();
}

// Observador para animar tarjetas al scroll (Aparecer gradualmente al estar en vista)
function initScrollObserverForCards() {
  const cards = document.querySelectorAll('.game-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight + 100) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.01,
      rootMargin: '100px 0px 100px 0px'
    });

    cards.forEach(card => observer.observe(card));
  } else {
    cards.forEach(card => card.classList.add('in-view'));
  }

  // Fallback de seguridad: Asegura que todas las tarjetas se muestren tras 300ms
  setTimeout(() => {
    document.querySelectorAll('.game-card').forEach(card => card.classList.add('in-view'));
  }, 300);
}

// --- MODAL DE DETALLE DEL JUEGO Y SELECCIÓN DE CUENTA ---
function openGameModal(gameId) {
  const game = catalog.find(g => g.id === gameId);
  if (!game) return;

  selectedGameForModal = game;
  selectedLicenseType = null;

  // Configurar carrusel de imágenes
  if (game.imagenesDetalle && Array.isArray(game.imagenesDetalle) && game.imagenesDetalle.length > 0) {
    currentModalImages = game.imagenesDetalle;
  } else {
    currentModalImages = [game.imagenDetalle || game.imagen];
  }
  currentModalImageIndex = 0;
  renderModalSlider();

  document.getElementById('gmodal-title').textContent = game.titulo;
  document.getElementById('gmodal-category').textContent = game.categoria;
  document.getElementById('gmodal-size').textContent = `📦 ${game.peso}`;
  document.getElementById('gmodal-summary').textContent = game.resumenExtenso || game.descripcion;

  document.getElementById('gmodal-price-sec').textContent = formatCLP(game.precioSecundaria);
  document.getElementById('gmodal-price-prim').textContent = formatCLP(game.precioPrimaria);

  // Reset radios y botones
  document.querySelectorAll('input[name="license_type"]').forEach(r => r.checked = false);
  document.getElementById('license-info-box').innerHTML = `
    <p class="info-placeholder">👇 Por favor selecciona una opción (Cuenta Secundaria o Cuenta Primaria) para ver los detalles.</p>
  `;

  document.getElementById('gmodal-add-btn').disabled = true;
  document.getElementById('gmodal-buy-btn').disabled = true;

  document.getElementById('game-modal-backdrop').classList.add('active');
}

function renderModalSlider() {
  const imgElem = document.getElementById('gmodal-img');
  const prevBtn = document.getElementById('modal-slider-prev');
  const nextBtn = document.getElementById('modal-slider-next');
  const dotsContainer = document.getElementById('modal-slider-dots');

  if (currentModalImages.length > 0) {
    imgElem.src = currentModalImages[currentModalImageIndex];
  }

  if (currentModalImages.length > 1) {
    if (prevBtn) prevBtn.style.display = 'flex';
    if (nextBtn) nextBtn.style.display = 'flex';
    if (dotsContainer) {
      dotsContainer.style.display = 'flex';
      dotsContainer.innerHTML = currentModalImages.map((_, idx) => `
        <span class="dot-pill ${idx === currentModalImageIndex ? 'active' : ''}" onclick="setModalSliderImage(${idx})"></span>
      `).join('');
    }
  } else {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (dotsContainer) {
      dotsContainer.style.display = 'none';
      dotsContainer.innerHTML = '';
    }
  }
}

function navigateModalSlider(direction) {
  if (currentModalImages.length <= 1) return;
  currentModalImageIndex = (currentModalImageIndex + direction + currentModalImages.length) % currentModalImages.length;
  renderModalSlider();
}

function setModalSliderImage(index) {
  if (index >= 0 && index < currentModalImages.length) {
    currentModalImageIndex = index;
    renderModalSlider();
  }
}

function closeGameModal() {
  document.getElementById('game-modal-backdrop').classList.remove('active');
}

function handleLicenseSelection(e) {
  selectedLicenseType = e.target.value; // 'secundaria' o 'primaria'
  const bullets = ACCOUNT_CONDITIONS[selectedLicenseType];

  const infoBox = document.getElementById('license-info-box');
  infoBox.innerHTML = `
    <ul class="license-bullets">
      ${bullets.map(b => `<li>${b}</li>`).join('')}
    </ul>
  `;

  document.getElementById('gmodal-add-btn').disabled = false;
  document.getElementById('gmodal-buy-btn').disabled = false;
}

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
  const accountTitle = isPrimaria ? 'Cuenta Primaria' : 'Cuenta Secundaria';

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
      imagen: game.imagen,
      licencia: accountTitle,
      cantidad: 1
    });
  }

  saveCart();
  updateCartBadge();
  showToast(`¡"${game.titulo}" (${accountTitle}) añadido al carrito!`);
}

// --- CARRITO ---
function saveCart() {
  localStorage.setItem('zonaswitch_cart_v4', JSON.stringify(cart));
}

function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  const drawerCount = document.getElementById('drawer-count');
  const totalCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  if (badge) badge.textContent = totalCount;
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
        <p style="font-size: 0.85rem;">Explora el catálogo y selecciona tu juego y tipo de cuenta.</p>
      </div>
    `;
    checkoutWrapper.style.display = 'none';
    return;
  }

  checkoutWrapper.style.display = 'block';

  let total = 0;

  container.innerHTML = cart.map(item => {
    const itemSubtotal = item.precio * item.cantidad;
    total += itemSubtotal;

    return `
      <div class="cart-item-card">
        <img class="cart-item-img" src="${item.imagen}" alt="${item.titulo}">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.titulo}</div>
          <div class="cart-item-license-tag">📌 ${item.licencia}</div>
          <div class="cart-item-price">${formatCLP(item.precio)} c/u</div>
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

  document.getElementById('summary-total').textContent = formatCLP(total);
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

// --- MODAL DE SELECCIÓN DE MÉTODO DE PAGO Y CHECKOUT ---
function openPaymentModal() {
  if (cart.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  // OBLIGATORIO: Debe tener cuenta e iniciar sesión para pagar
  if (!currentUser) {
    showToast('⚠️ Debes registrarte o iniciar sesión para realizar una compra.');
    closeCartDrawer();
    openLoginModal();
    return;
  }

  closeCartDrawer();

  // Autocompletar nombre de usuario si hay sesión activa
  if (currentUser) {
    const nameInput = document.getElementById('checkout-name');
    if (nameInput && !nameInput.value) nameInput.value = currentUser.username;
  }

  payCarouselIndex = 0;
  renderPayCarousel();

  document.getElementById('payment-modal-backdrop').classList.add('active');
}

function closePaymentModal() {
  document.getElementById('payment-modal-backdrop').classList.remove('active');
}

function renderPayCarousel() {
  if (cart.length === 0) return;

  if (payCarouselIndex >= cart.length) payCarouselIndex = 0;
  if (payCarouselIndex < 0) payCarouselIndex = cart.length - 1;

  const currentItem = cart[payCarouselIndex];
  document.getElementById('pay-carousel-img').src = currentItem.imagen;
  document.getElementById('pay-carousel-title').textContent = currentItem.titulo;
  document.getElementById('pay-carousel-lic').textContent = `Licencia ${currentItem.licencia} (${currentItem.cantidad}x)`;

  const prevBtn = document.getElementById('pay-slider-prev');
  const nextBtn = document.getElementById('pay-slider-next');
  const showArrows = cart.length > 1;
  if (prevBtn) prevBtn.style.display = showArrows ? 'flex' : 'none';
  if (nextBtn) nextBtn.style.display = showArrows ? 'flex' : 'none';

  // Puntos del carrusel
  const dotsContainer = document.getElementById('pay-slider-dots');
  if (dotsContainer) {
    if (cart.length > 1) {
      dotsContainer.innerHTML = cart.map((_, idx) => `
        <span class="dot ${idx === payCarouselIndex ? 'active' : ''}" onclick="setPaySliderIndex(${idx})"></span>
      `).join('');
    } else {
      dotsContainer.innerHTML = '';
    }
  }

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  document.getElementById('pay-total-items').textContent = totalItems;
  document.getElementById('pay-total-price').textContent = formatCLP(totalPrice);
}

function navigatePaySlider(direction) {
  payCarouselIndex = (payCarouselIndex + direction + cart.length) % cart.length;
  renderPayCarousel();
}

function setPaySliderIndex(index) {
  payCarouselIndex = index;
  renderPayCarousel();
}

async function handlePaymentSubmit(e) {
  if (e) e.preventDefault();
  if (cart.length === 0) return;

  const nombre = document.getElementById('checkout-name').value.trim();
  const apellido = document.getElementById('checkout-surname').value.trim();
  const email = document.getElementById('checkout-email').value.trim();
  
  const gatewayRadio = document.querySelector('input[name="payment_gateway"]:checked');
  const metodoPago = gatewayRadio ? gatewayRadio.value : 'flow';

  if (!nombre || !apellido || !email) {
    alert('Por favor completa tu nombre, apellido y correo electrónico.');
    return;
  }

  const username = currentUser ? currentUser.username : 'Invitado';
  const btn = document.getElementById('submit-payment-btn');
  btn.disabled = true;
  btn.innerHTML = `<span>Conectando con ${metodoPago === 'mercadopago' ? 'Mercado Pago' : 'Flow'}...</span>`;

  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, email, username, metodoPago, carrito: cart })
    });

    const data = await res.json();
    if (data.exito && data.redirectUrl) {
      const pasarelaNombre = metodoPago === 'mercadopago' ? 'Mercado Pago 💙' : 'Flow Chile 💳';
      showToast(`¡Redirigiendo a la pasarela segura de ${pasarelaNombre}!`);
      setTimeout(() => {
        window.location.href = data.redirectUrl;
      }, 600);
    } else {
      alert(data.error || 'Ocurrió un problema al procesar el pago.');
    }
  } catch (err) {
    alert('Error de conexión con el servidor.');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `
      <span>Continuar al Pago</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    `;
  }
}

async function checkPaymentReturnUrls() {
  const urlParams = new URLSearchParams(window.location.search);
  const flowOrderCode = urlParams.get('flow_order');
  const mpOrderCode = urlParams.get('mp_order');
  const status = urlParams.get('status');

  const orderCode = flowOrderCode || mpOrderCode;

  if (orderCode) {
    // Limpiar query string de la URL
    window.history.replaceState({}, document.title, window.location.pathname);

    try {
      const res = await fetch(`/api/orders/${orderCode}`);
      if (res.ok) {
        const order = await res.json();
        if (status === '2' || status === 'approved' || order.estado === 'pagada') {
          cart = [];
          saveCart();
          updateCartBadge();
          openReceiptModal({
            codigoOrden: order.codigoOrden,
            cliente: order.cliente,
            usuario: order.usuario,
            total: order.totalFormatted || formatCLP(order.total),
            fecha: order.fecha
          });
          const pasarela = order.metodoPago === 'mercadopago' ? 'Mercado Pago 💙' : 'Flow 💳';
          showToast(`¡Pago en ${pasarela} completado con éxito! 🎉`);
        } else if (status === '3' || status === 'failure') {
          showToast('El pago fue rechazado o no se completó.');
        } else if (status === '4' || status === 'cancelled') {
          showToast('El pago fue cancelado.');
        }
      }
    } catch (err) {
      console.error('Error al consultar orden de retorno:', err);
    }
  }
}

function openReceiptModal(detalles) {
  document.getElementById('receipt-title').textContent = `¡Gracias por tu compra en ZonaSwitchChile, ${detalles.cliente.split(' ')[0]}!`;
  document.getElementById('receipt-code').textContent = detalles.codigoOrden;
  document.getElementById('receipt-client').textContent = detalles.cliente;
  document.getElementById('receipt-user').textContent = detalles.usuario;
  document.getElementById('receipt-total').textContent = detalles.total;
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
