// Estado Global de ZonaSwitchChile
const DEFAULT_GAMES_FRONTEND = [
  {
    id: 1,
    titulo: "The Legend of Zelda: Tears of the Kingdom",
    categoria: "Acción / Aventura",
    precioSecundaria: 14990,
    precioPrimaria: 24990,
    precioOriginal: 59990,
    rating: 5,
    peso: "16.3 GB",
    imagen: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=800&auto=format&fit=crop",
    imagenDetalle: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=1200&auto=format&fit=crop",
    descripcion: "Explora los cielos y las profundidades de Hyrule en esta aclamada secuela épica.",
    resumenExtenso: "Embarca en una aventura sin precedentes a través de la tierra y los cielos de Hyrule...",
    visible: true
  },
  {
    id: 2,
    titulo: "Super Mario Bros. Wonder",
    categoria: "Plataformas",
    precioSecundaria: 12990,
    precioPrimaria: 21990,
    precioOriginal: 54990,
    rating: 5,
    peso: "4.5 GB",
    imagen: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800&auto=format&fit=crop",
    imagenDetalle: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1200&auto=format&fit=crop",
    descripcion: "Disfruta de la magia de las Flores Maravilla y transforma el mundo de Mario en compañía.",
    resumenExtenso: "Super Mario Bros. Wonder redefine la experiencia clásica de plataformas 2D...",
    visible: true
  },
  {
    id: 3,
    titulo: "Mario Kart 8 Deluxe",
    categoria: "Multijugador",
    precioSecundaria: 11990,
    precioPrimaria: 19990,
    precioOriginal: 49990,
    rating: 5,
    peso: "8.0 GB",
    imagen: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    imagenDetalle: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    descripcion: "Compite con tus personajes favoritos en 48 pistas llenas de emoción y objetos locos.",
    resumenExtenso: "La versión definitiva del juego de carreras más famoso de Nintendo...",
    visible: true
  },
  {
    id: 4,
    titulo: "Super Smash Bros. Ultimate",
    categoria: "Multijugador",
    precioSecundaria: 13990,
    precioPrimaria: 22990,
    precioOriginal: 54990,
    rating: 5,
    peso: "17.0 GB",
    imagen: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop",
    imagenDetalle: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop",
    descripcion: "¡Todos están aquí! El mayor crossover de la historia del videojuego con más de 80 luchadores.",
    resumenExtenso: "Super Smash Bros. Ultimate reúne a icónicos héroes y villanos...",
    visible: true
  },
  {
    id: 5,
    titulo: "Pokémon Escarlata",
    categoria: "Acción / Aventura",
    precioSecundaria: 12990,
    precioPrimaria: 21990,
    precioOriginal: 54990,
    rating: 5,
    peso: "10.0 GB",
    imagen: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    imagenDetalle: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    descripcion: "Explora la región de Paldea en un mundo abierto sin fronteras y atrapa nuevos Pokémon.",
    resumenExtenso: "Vive la primera gran aventura de mundo abierto de Pokémon...",
    visible: true
  },
  {
    id: 6,
    titulo: "Metroid Dread",
    categoria: "Acción / Aventura",
    precioSecundaria: 10990,
    precioPrimaria: 18990,
    precioOriginal: 49990,
    rating: 5,
    peso: "4.1 GB",
    imagen: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop",
    imagenDetalle: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop",
    descripcion: "Acompaña a Samus Aran en su misión más peligrosa huyendo de los mortales robots E.M.M.I.",
    resumenExtenso: "Metroid Dread marca el regreso de la legendaria caza-recompensas Samus Aran...",
    visible: true
  },
  {
    id: 7,
    titulo: "Animal Crossing: New Horizons",
    categoria: "Simulación",
    precioSecundaria: 11990,
    precioPrimaria: 19990,
    precioOriginal: 49990,
    rating: 5,
    peso: "7.0 GB",
    imagen: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop",
    imagenDetalle: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1200&auto=format&fit=crop",
    descripcion: "Crea tu propio paraíso en una isla desierta y vive a tu propio ritmo con vecinos encantadores.",
    resumenExtenso: "Escapa a tu propia isla desierta en Animal Crossing: New Horizons...",
    visible: true
  },
  {
    id: 8,
    titulo: "Hollow Knight",
    categoria: "Indie",
    precioSecundaria: 4990,
    precioPrimaria: 8990,
    precioOriginal: 14990,
    rating: 5,
    peso: "5.3 GB",
    imagen: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
    imagenDetalle: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
    descripcion: "Desciende al oscuro reino de Hallownest en una obra maestra de acción y exploración en 2D.",
    resumenExtenso: "Hollow Knight es una aventura de acción en 2D de estilo metroidvania...",
    visible: true
  }
];

let catalog = [...DEFAULT_GAMES_FRONTEND];
let cart = JSON.parse(localStorage.getItem('zonaswitch_cart_v4')) || [];
let currentUser = JSON.parse(localStorage.getItem('zonaswitch_user')) || null;
let activeCategory = 'todos';
let searchQuery = '';
let selectedGameForModal = null;
let selectedLicenseType = null;
let currentModalImages = [];
let currentModalImageIndex = 0;
let payCarouselIndex = 0;

let adminCatalog = []; // Catálogo completo para el panel de administración
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
  PEN: { symbol: 'S/. ', code: 'PEN', rate: 0.003697, decimals: 2 },
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
  try { renderCatalog(); } catch (e) { console.error('Error renderCatalog:', e); }
  try { initEventListeners(); } catch (e) { console.error('Error initEventListeners:', e); }
  try { initUserSession(); } catch (e) { console.error('Error initUserSession:', e); }
  try { fetchSettings(); } catch (e) { console.error('Error fetchSettings:', e); }
  try { fetchCoupons(); } catch (e) { console.error('Error fetchCoupons:', e); }
  try { fetchCatalog(); } catch (e) { console.error('Error fetchCatalog:', e); }
  try { fetchAndRenderGallery(); } catch (e) { console.error('Error fetchAndRenderGallery:', e); }
  try { updateCartBadge(); } catch (e) { console.error('Error updateCartBadge:', e); }
  try { checkPaymentReturnUrls(); } catch (e) { console.error('Error checkPaymentReturnUrls:', e); }
  try { initRealtimeCatalogStream(); } catch (e) { console.error('Error initRealtimeCatalogStream:', e); }
});

// Registrar Listeners principales
function initEventListeners() {
  // Abrir / Cerrar Drawer del Carrito
  const cartBtn = document.getElementById('cart-btn');
  const closeDrawerBtn = document.getElementById('close-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');

  if (cartBtn) cartBtn.addEventListener('click', openCartDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeCartDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeCartDrawer);

  // Código de Descuento en Carrito
  const applyCouponBtn = document.getElementById('apply-coupon-btn');
  const couponInput = document.getElementById('coupon-code-input');
  if (applyCouponBtn) applyCouponBtn.addEventListener('click', handleApplyCoupon);
  if (couponInput) {
    couponInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleApplyCoupon();
      }
    });
  }

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

  // Búsqueda en tiempo real & Predictivo (Auto-complete)
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderCatalog();
      handleSearchAutocomplete(searchInput, 'search-autocomplete-dropdown');
    });
  }

  const mobileSearchInput = document.getElementById('mobile-search-input');
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      const desktopSearch = document.getElementById('search-input');
      if (desktopSearch) desktopSearch.value = e.target.value;
      renderCatalog();
      handleSearchAutocomplete(mobileSearchInput, 'mobile-search-autocomplete-dropdown');
    });
  }

  // Guía de Instalación Modal triggers
  const openGuideBtn = document.getElementById('open-install-guide-btn');
  const mobileOpenGuideBtn = document.getElementById('mobile-open-install-guide-btn');
  const closeGuideBtn = document.getElementById('close-install-guide-modal');
  if (openGuideBtn) openGuideBtn.addEventListener('click', openInstallGuideModal);
  if (mobileOpenGuideBtn) mobileOpenGuideBtn.addEventListener('click', () => { closeMobileDrawer(); openInstallGuideModal(); });
  if (closeGuideBtn) closeGuideBtn.addEventListener('click', closeInstallGuideModal);

  // Formulario agregar foto a galería (Admin)
  const addGalleryForm = document.getElementById('admin-add-gallery-form');
  if (addGalleryForm) addGalleryForm.addEventListener('submit', handleAdminAddGallerySubmit);

  // Formulario agregar cupón de descuento (Admin)
  const addCouponForm = document.getElementById('admin-add-coupon-form');
  if (addCouponForm) addCouponForm.addEventListener('submit', handleAdminAddCouponSubmit);
  const saveCouponBtn = document.getElementById('save-coupon-btn');
  if (saveCouponBtn) {
    saveCouponBtn.addEventListener('click', (e) => {
      const form = document.getElementById('admin-add-coupon-form');
      if (form && form.checkValidity()) {
        e.preventDefault();
        handleAdminAddCouponSubmit(e);
      }
    });
  }

  const editGameForm = document.getElementById('game-edit-form');
  if (editGameForm) editGameForm.addEventListener('submit', handleGameEditSubmit);

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

  // Validaciones de formulario de registro
  const regUsernameInput = document.getElementById('register-username');
  const regEmailInput = document.getElementById('register-email');
  const regPasswordInput = document.getElementById('register-password');

  if (regUsernameInput) regUsernameInput.addEventListener('input', validateRegisterPasswordForm);
  if (regEmailInput) regEmailInput.addEventListener('input', validateRegisterPasswordForm);
  if (regPasswordInput) regPasswordInput.addEventListener('input', validateRegisterPasswordForm);

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
  const usernameForm = document.getElementById('tab-username');
  if (usernameForm) usernameForm.addEventListener('submit', handleUsernameChangeSubmit);

  const emailForm = document.getElementById('tab-email');
  if (emailForm) emailForm.addEventListener('submit', handleEmailChangeSubmit);

  const passwordForm = document.getElementById('tab-password');
  if (passwordForm) passwordForm.addEventListener('submit', handlePasswordChangeSubmit);

  const updateOtpForm = document.getElementById('update-otp-form');
  if (updateOtpForm) updateOtpForm.addEventListener('submit', handleUpdateOtpSubmit);

  // Control del Menú Lateral Móvil (3 Rayas ☰)
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMobileDrawerBtn = document.getElementById('close-mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-drawer-overlay');

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileDrawer);
  if (closeMobileDrawerBtn) closeMobileDrawerBtn.addEventListener('click', closeMobileDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileDrawer);



  const mobileCurrencySelect = document.getElementById('mobile-currency-select');
  if (mobileCurrencySelect) {
    mobileCurrencySelect.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      const desktopCurrency = document.getElementById('currency-select');
      if (desktopCurrency) desktopCurrency.value = currentCurrency;
      renderCatalog();
    });
  }

  // Tabs de configuración de cuenta
  document.querySelectorAll('.settings-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.settings-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.settings-tab-content .tab-pane').forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      const tabId = e.target.dataset.tab;
      const pane = document.getElementById(tabId);
      if (pane) pane.classList.add('active');
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
  if (gmodalAddBtn) gmodalAddBtn.addEventListener('click', (e) => {
    animateButtonSuccess(e.currentTarget, '✓ ¡Añadido al Carrito!');
    handleAddSelectedLicenseToCart();
  });

  const gmodalBuyBtn = document.getElementById('gmodal-buy-btn');
  if (gmodalBuyBtn) gmodalBuyBtn.addEventListener('click', (e) => {
    animateButtonSuccess(e.currentTarget, '✓ Redirigiendo...');
    handleBuySelectedLicenseNow();
  });

  // Checkout & Recibo
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) checkoutForm.addEventListener('submit', handleCheckout);

  const paymentCheckoutForm = document.getElementById('payment-checkout-form');
  if (paymentCheckoutForm) paymentCheckoutForm.addEventListener('submit', handlePaymentSubmit);

  const closeModalBtn = document.getElementById('close-modal-btn');
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeReceiptModal);

  const copyCodeBtn = document.getElementById('copy-code-btn');
  if (copyCodeBtn) copyCodeBtn.addEventListener('click', copyOrderCode);

  // Admin game search input listener
  const adminSearchInput = document.getElementById('admin-game-search');
  if (adminSearchInput) {
    adminSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = adminCatalog.filter(g =>
        g.titulo.toLowerCase().includes(q) ||
        g.categoria.toLowerCase().includes(q)
      );
      renderAdminGamesList(filtered);
    });
  }

  // Admin game edit form listener
  const gameEditForm = document.getElementById('game-edit-form');
  if (gameEditForm) gameEditForm.addEventListener('submit', handleGameEditSubmit);

  const closeGameEditBtn = document.getElementById('close-game-edit-modal');
  if (closeGameEditBtn) closeGameEditBtn.addEventListener('click', closeGameEditModal);

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

function openUserSettingsModal() {
  const backdrop = document.getElementById('user-settings-modal-backdrop');
  const adminTabBtn = document.getElementById('admin-tab-btn');
  const isAdmin = currentUser && (currentUser.role === 'admin' || (currentUser.username && currentUser.username.toLowerCase() === 'zxandere'));

  if (adminTabBtn) {
    if (isAdmin) {
      adminTabBtn.style.display = 'inline-block';
      fetchAndRenderAdminGames();
    } else {
      adminTabBtn.style.display = 'none';
      if (adminTabBtn.classList.contains('active')) {
        document.querySelectorAll('.settings-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.settings-tab-content .tab-pane').forEach(p => p.classList.remove('active'));
        const userBtn = document.querySelector('.settings-tabs .tab-btn[data-tab="tab-username"]');
        const userPane = document.getElementById('tab-username');
        if (userBtn) userBtn.classList.add('active');
        if (userPane) userPane.classList.add('active');
      }
    }
  }

  backdrop.classList.add('active');
}

function closeUserSettingsModal() { document.getElementById('user-settings-modal-backdrop').classList.remove('active'); }
function openUpdateOtpModal() { document.getElementById('update-otp-modal-backdrop').classList.add('active'); }
function closeUpdateOtpModal() { document.getElementById('update-otp-modal-backdrop').classList.remove('active'); }

// --- FUNCIONES DEL PANEL DE ADMINISTRADOR (SOLO PARA "ZxAndere") ---

async function fetchAndRenderAdminGames() {
  const container = document.getElementById('admin-games-container');
  if (!currentUser) return;

  if (container) container.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 1rem;">Cargando juegos en panel admin...</p>';

  try {
    const res = await fetch(`/api/admin/juegos?user=${encodeURIComponent(currentUser.username)}`);
    if (!res.ok) throw new Error('Acceso denegado');
    adminCatalog = await res.json();
    renderAdminGamesList(adminCatalog);
  } catch (err) {
    if (container) container.innerHTML = '<p style="text-align: center; color: var(--switch-red); padding: 1rem;">No se pudieron cargar los juegos del panel admin.</p>';
  }
}

function renderAdminGamesList(gamesList) {
  const container = document.getElementById('admin-games-container');
  if (!container) return;

  if (!Array.isArray(gamesList) || gamesList.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 1rem;">No se encontraron juegos.</p>';
    return;
  }

  container.innerHTML = gamesList.map(game => {
    const isVisible = game.visible !== false;
    return `
      <div class="admin-game-row ${!isVisible ? 'hidden-game' : ''}">
        <div class="admin-game-info">
          <img class="admin-game-thumb" src="${escapeHTML(game.imagen)}" alt="${escapeHTML(game.titulo)}">
          <div class="admin-game-details">
            <span class="admin-game-title">${escapeHTML(game.titulo)}</span>
            <span class="admin-game-sub">
              ${escapeHTML(game.categoria)} | Sec: ${formatCLP(game.precioSecundaria)} - Prim: ${formatCLP(game.precioPrimaria)}
            </span>
          </div>
        </div>
        <div class="admin-game-actions">
          <label class="toggle-switch-label" title="Mostrar u Ocultar en la tienda">
            <span>${isVisible ? '🟢 Visible' : '🔴 Oculto'}</span>
            <input type="checkbox" ${isVisible ? 'checked' : ''} onchange="toggleGameVisibility(${game.id}, this.checked)">
            <span class="toggle-slider"></span>
          </label>
          <button type="button" class="edit-game-gear-btn" onclick="openGameEditModal(${game.id})" title="Editar datos del juego (Tuerca ⚙️)">
            ⚙️
          </button>
        </div>
      </div>
    `;
  }).join('');
}

async function toggleGameVisibility(gameId, isVisible) {
  if (!currentUser) return;
  try {
    const res = await fetch('/api/admin/juegos/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId, visible: isVisible, username: currentUser.username })
    });
    const data = await res.json();
    if (data.exito && data.juegos) {
      adminCatalog = data.juegos;
      renderAdminGamesList(adminCatalog);
      // Reajustar catálogo de la tienda en tiempo real
      await fetchCatalog();
      showToast(data.mensaje || 'Visibilidad actualizada');
    } else {
      alert(data.error || 'Error al cambiar visibilidad');
    }
  } catch (e) {
    alert('Error al conectar con el servidor');
  }
}

function openGameEditModal(gameId) {
  const game = adminCatalog.find(g => g.id === Number(gameId)) || catalog.find(g => g.id === Number(gameId));
  if (!game) return;

  document.getElementById('edit-game-id').value = game.id;
  document.getElementById('edit-game-titulo').value = game.titulo || '';
  document.getElementById('edit-game-categoria').value = game.categoria || '';
  document.getElementById('edit-game-secundaria').value = game.precioSecundaria || '';
  document.getElementById('edit-game-primaria').value = game.precioPrimaria || '';
  document.getElementById('edit-game-imagen').value = game.imagen || '';
  const imgDet = document.getElementById('edit-game-imagen-detalle');
  if (imgDet) imgDet.value = game.imagenDetalle || game.imagen || '';
  document.getElementById('edit-game-descripcion').value = game.descripcion || '';

  const correoTxt = document.getElementById('edit-game-correo-texto');
  if (correoTxt) correoTxt.value = game.correoTexto || '';

  const correoImg = document.getElementById('edit-game-correo-imagen');
  if (correoImg) correoImg.value = game.correoImagen || '';

  // Renderizar la lista dinámica de variantes de cuenta (Cuenta / Contraseña / Código)
  renderAccountVariantsList(game.cuentas || []);

  document.getElementById('game-edit-error').textContent = '';
  document.getElementById('game-edit-modal-backdrop').classList.add('active');
}

function closeGameEditModal() {
  document.getElementById('game-edit-modal-backdrop').classList.remove('active');
}

async function handleGameEditSubmit(e) {
  e.preventDefault();
  const adminUsername = (currentUser && currentUser.username) ? currentUser.username : 'ZxAndere';

  const gameId = document.getElementById('edit-game-id').value;
  const titulo = document.getElementById('edit-game-titulo').value.trim();
  const categoria = document.getElementById('edit-game-categoria').value.trim();
  const precioSecundaria = document.getElementById('edit-game-secundaria').value;
  const precioPrimaria = document.getElementById('edit-game-primaria').value;
  const imagen = document.getElementById('edit-game-imagen').value.trim();
  const imgDetEl = document.getElementById('edit-game-imagen-detalle');
  const imagenDetalle = imgDetEl ? imgDetEl.value.trim() : '';
  const descripcion = document.getElementById('edit-game-descripcion').value.trim();

  const correoTextoEl = document.getElementById('edit-game-correo-texto');
  const correoTexto = correoTextoEl ? correoTextoEl.value.trim() : '';

  const correoImagenEl = document.getElementById('edit-game-correo-imagen');
  const correoImagen = correoImagenEl ? correoImagenEl.value.trim() : '';

  // Extraer todas las variantes de cuentas del creador dinámico
  const variantCards = document.querySelectorAll('#account-variants-list-container .variant-row-card');
  const cuentasArray = [];

  variantCards.forEach(card => {
    const cuentaInp = card.querySelector('.var-input-cuenta');
    const passInp = card.querySelector('.var-input-pass');
    const codigoInp = card.querySelector('.var-input-codigo');

    const cuenta = cuentaInp ? cuentaInp.value.trim() : '';
    const pass = passInp ? passInp.value.trim() : '';
    const codigo = codigoInp ? codigoInp.value.trim() : '';

    if (cuenta || pass || codigo) {
      let formattedLine = cuenta;
      if (pass || codigo) formattedLine += ` / ${pass}`;
      if (codigo) formattedLine += ` / ${codigo}`;
      cuentasArray.push(formattedLine);
    }
  });

  const errorMsg = document.getElementById('game-edit-error');
  errorMsg.textContent = '';

  const saveBtn = document.getElementById('save-game-edit-btn');
  saveBtn.disabled = true;
  saveBtn.textContent = 'Guardando...';

  try {
    const res = await fetch('/api/admin/juegos/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gameId,
        titulo,
        categoria,
        precioSecundaria,
        precioPrimaria,
        imagen,
        imagenDetalle,
        descripcion,
        correoTexto,
        correoImagen,
        cuentas: cuentasArray,
        username: adminUsername
      })
    });

    const data = await res.json();
    if (!res.ok || !data.exito) {
      errorMsg.textContent = data.error || 'No se pudo guardar la información.';
      saveBtn.disabled = false;
      saveBtn.textContent = '💾 Guardar Cambios en Tiempo Real';
      return;
    }

    if (data.juegos) adminCatalog = data.juegos;
    renderAdminGamesList(adminCatalog);
    await fetchCatalog();
    closeGameEditModal();
    showToast(data.mensaje || '¡Juego y cuentas actualizados con éxito! 🎉');
  } catch (err) {
    errorMsg.textContent = 'Error de comunicación con el servidor.';
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 Guardar Cambios en Tiempo Real';
  }
}

function openMobileDrawer() {
  document.getElementById('mobile-nav-drawer').classList.add('active');
  document.getElementById('mobile-drawer-overlay').classList.add('active');
}
function closeMobileDrawer() {
  document.getElementById('mobile-nav-drawer').classList.remove('active');
  document.getElementById('mobile-drawer-overlay').classList.remove('active');
}

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
  const mobileUserContainer = document.getElementById('mobile-user-nav-container');

  if (currentUser) {
    const userHtml = `
      <div class="user-profile-menu-container">
        <button class="user-profile-trigger" id="user-menu-trigger">
          <span>👤</span>
          <span>${escapeHTML(currentUser.username)}</span>
          <span style="font-size: 0.7rem;">▼</span>
        </button>
        <div class="user-dropdown-menu" id="user-dropdown-menu">
          <button class="dropdown-item" onclick="openUserOrdersModal(); closeMobileDrawer();">📦 Mis Órdenes</button>
          <button class="dropdown-item" onclick="openUserSettingsModal(); closeMobileDrawer();">⚙️ Opciones de Cuenta</button>
          <button class="dropdown-item danger" onclick="handleLogout(); closeMobileDrawer();">🚪 Cerrar Sesión</button>
        </div>
      </div>
    `;

    if (userNavArea) userNavArea.innerHTML = userHtml;
    if (mobileUserContainer) {
      mobileUserContainer.innerHTML = `
        <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle); padding: 0.85rem; border-radius: var(--radius-sm); display: flex; flex-direction: column; gap: 0.6rem;">
          <div style="font-weight: 800; font-size: 0.9rem; color: var(--joycon-cyan);">👤 ${escapeHTML(currentUser.username)}</div>
          <button class="dropdown-item" onclick="openUserOrdersModal(); closeMobileDrawer();" style="padding: 0.4rem 0;">📦 Mis Órdenes</button>
          <button class="dropdown-item" onclick="openUserSettingsModal(); closeMobileDrawer();" style="padding: 0.4rem 0;">⚙️ Opciones de Cuenta</button>
          <button class="dropdown-item danger" onclick="handleLogout(); closeMobileDrawer();" style="padding: 0.4rem 0;">🚪 Cerrar Sesión</button>
        </div>
      `;
    }

    const trigger = document.getElementById('user-menu-trigger');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const menu = document.getElementById('user-dropdown-menu');
        if (menu) menu.classList.toggle('active');
      });
    }
  } else {
    const authHtml = `
      <button class="nav-auth-btn login-btn" onclick="openLoginModal(); closeMobileDrawer();">Iniciar Sesión</button>
      <button class="nav-auth-btn register-btn" onclick="openRegisterModal(); closeMobileDrawer();">Registrarse</button>
    `;
    if (userNavArea) userNavArea.innerHTML = authHtml;
    if (mobileUserContainer) mobileUserContainer.innerHTML = authHtml;
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
function openRegisterModal() { 
  document.getElementById('register-modal-backdrop').classList.add('active'); 
  validateRegisterPasswordForm();
}
function closeRegisterModal() { document.getElementById('register-modal-backdrop').classList.remove('active'); }

// --- CATÁLOGO DE JUEGOS ---
async function fetchCatalog() {
  renderCatalog();
  try {
    const res = await fetch('/api/juegos');
    if (!res.ok) throw new Error('Error al consultar catálogo');
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      catalog = data;
    }
  } catch (err) {
    console.warn('Cargando catálogo local por defecto:', err);
    if (!Array.isArray(catalog) || catalog.length === 0) {
      catalog = [...DEFAULT_GAMES_FRONTEND];
    }
  } finally {
    renderCatalog();
  }
}

function renderCatalog() {
  const grid = document.getElementById('games-grid');
  const countLabel = document.getElementById('games-count');
  if (!grid) return;

  if (!Array.isArray(catalog) || catalog.length === 0) {
    catalog = [...DEFAULT_GAMES_FRONTEND];
  }

  const filtered = catalog.filter(game => {
    if (!game) return false;
    const title = (game.titulo || '').toLowerCase();
    const category = (game.categoria || '').toLowerCase();
    const q = (searchQuery || '').toLowerCase();
    const matchCategory = activeCategory === 'todos' || game.categoria === activeCategory;
    const matchSearch = title.includes(q) || category.includes(q);
    return matchCategory && matchSearch;
  });

  if (countLabel) {
    countLabel.textContent = `${filtered.length} juego(s) disponible(s)`;
  }

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
    <article class="game-card in-view" onclick="openGameModal(${game.id})">
      <div class="card-media">
        <img src="${escapeHTML(game.imagen || '')}" alt="${escapeHTML(game.titulo || '')}" loading="lazy">
        <span class="card-tag">${escapeHTML(game.categoria || 'Nintendo')}</span>
        <span class="card-size-tag">📦 ${escapeHTML(game.peso || 'N/A')}</span>
      </div>
      <div class="card-content">
        <h3 class="card-title">${escapeHTML(game.titulo || '')}</h3>
        <p class="card-desc">${escapeHTML(game.descripcion || '')}</p>
        <div class="card-license-hint">
          🎮 Secundaria: ${formatCLP(game.precioSecundaria)} | Primaria: ${formatCLP(game.precioPrimaria)}
        </div>
        <div class="card-footer">
          <div class="price-container">
            <span class="original-price">${formatCLP(game.precioOriginal || game.precioSecundaria)}</span>
            <span class="current-price">${formatCLP(game.precioSecundaria)}</span>
          </div>
          <button class="buy-card-btn">
            Comprar
          </button>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.game-card').forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'none';
  });
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

  let subtotal = 0;

  container.innerHTML = cart.map(item => {
    const itemSubtotal = item.precio * item.cantidad;
    subtotal += itemSubtotal;

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

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'fixed') {
      discount = Math.min(subtotal, appliedCoupon.value);
    }
  }

  const total = Math.max(0, subtotal - discount);

  const discountRow = document.getElementById('cart-discount-row');
  const discountVal = document.getElementById('summary-discount');
  if (discountRow && discountVal) {
    if (discount > 0) {
      discountRow.style.display = 'flex';
      discountVal.textContent = `- ${formatCLP(discount)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }

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
  const subtotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'fixed') {
      discount = Math.min(subtotal, appliedCoupon.value);
    }
  }

  const finalTotal = Math.max(0, subtotal - discount);

  document.getElementById('pay-total-items').textContent = totalItems;
  document.getElementById('pay-total-price').textContent = formatCLP(finalTotal);

  // Cambiar texto de botón según precio ($0 CLP -> Finalizar Pedido)
  const submitPayBtn = document.getElementById('submit-payment-btn');
  if (submitPayBtn) {
    const btnSpan = submitPayBtn.querySelector('span');
    if (finalTotal === 0) {
      if (btnSpan) btnSpan.textContent = '¡Finalizar Pedido ($0 CLP)!';
    } else {
      if (btnSpan) btnSpan.textContent = 'Continuar al Pago';
    }
  }

  // Mostrar aviso de Cupón de Descuento debajo de la foto del juego
  const couponNoticeBox = document.getElementById('checkout-coupon-notice');
  const couponDetailText = document.getElementById('checkout-coupon-detail');
  if (couponNoticeBox && couponDetailText) {
    if (appliedCoupon) {
      couponNoticeBox.style.display = 'flex';
      const discText = appliedCoupon.type === 'percent' ? `${appliedCoupon.value}% OFF` : `-${formatCLP(appliedCoupon.value)}`;
      couponDetailText.textContent = `¡Sí! Cupón "${appliedCoupon.code}" aplicado (${discText} - Ahorro: ${formatCLP(discount)})`;
    } else {
      couponNoticeBox.style.display = 'none';
    }
  }
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
  const emailInput = document.getElementById('checkout-email');
  const email = emailInput ? emailInput.value.trim() : '';
  const selectedGatewayRadio = document.querySelector('input[name="payment_gateway"]:checked');
  const metodoPago = selectedGatewayRadio ? selectedGatewayRadio.value : 'flow';

  if (!nombre || !apellido || !email) {
    alert('Por favor completa tu nombre, apellido y correo electrónico.');
    return;
  }

  // Validación estricta de correo electrónico (debe incluir @ y formato válido)
  if (!email.includes('@') || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Por favor ingresa un correo electrónico válido (debe incluir @ y un dominio válido, ej: tuusuario@gmail.com).');
    if (emailInput) emailInput.focus();
    return;
  }

  const subtotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'fixed') {
      discount = Math.min(subtotal, appliedCoupon.value);
    }
  }
  const montoTotal = Math.max(0, subtotal - discount);

  const username = currentUser ? currentUser.username : 'Invitado';
  const btn = document.getElementById('submit-payment-btn');
  btn.disabled = true;
  btn.innerHTML = `<span>Procesando pedido...</span>`;

  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, email, username, metodoPago, carrito: cart, montoTotal })
    });

    const data = await res.json();
    if (data.exito) {
      // Si el total es $0 CLP (Cupón PRUEBAXD), finalizar de inmediato sin salir del sitio
      if (montoTotal === 0) {
        closePaymentModal();
        cart = [];
        saveCart();
        updateCartBadge();
        openReceiptModal({
          codigoOrden: data.codigoOrden,
          cliente: `${nombre} ${apellido}`,
          usuario: username,
          total: '$0 CLP',
          fecha: new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        });
        showToast('¡Pedido de prueba $0 CLP completado exitosamente! 🎉');
        return;
      }

      if (data.redirectUrl) {
        const pasarelaNombre = metodoPago === 'mercadopago' ? 'Mercado Pago 💙' : 'Flow Chile 💳';
        showToast(`¡Redirigiendo a la pasarela segura de ${pasarelaNombre}!`);
        setTimeout(() => {
          window.location.href = data.redirectUrl;
        }, 600);
      }
    } else {
      alert(data.error || 'Ocurrió un problema al procesar el pago.');
    }
  } catch (err) {
    alert('Error de conexión con el servidor.');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `
      <span>${montoTotal === 0 ? '¡Finalizar Pedido ($0 CLP)!' : 'Continuar al Pago'}</span>
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

  const itemsContainer = document.getElementById('receipt-items-assigned-container');
  if (itemsContainer) {
    if (Array.isArray(detalles.carrito) && detalles.carrito.length > 0) {
      itemsContainer.innerHTML = `
        <h5 style="color: var(--joycon-cyan); font-size: 0.9rem; font-weight: 800; margin-bottom: 0.6rem;">🎮 Datos de Acceso Entregados (Correo Digital):</h5>
        ${detalles.carrito.map(item => `
          <div style="background: rgba(15, 22, 36, 0.9); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.85rem; margin-bottom: 0.6rem;">
            <div style="font-weight: 800; color: #ffffff; font-size: 0.9rem;">${escapeHTML(item.titulo)} (${item.licencia})</div>
            ${item.correoTexto ? `<p style="font-size: 0.8rem; color: var(--text-muted); margin: 0.3rem 0;">${escapeHTML(item.correoTexto)}</p>` : ''}
            <div style="background: rgba(0, 240, 255, 0.08); border: 1px solid rgba(0, 240, 255, 0.3); padding: 0.6rem; border-radius: 6px; font-family: monospace; font-size: 0.85rem; color: var(--joycon-cyan); margin-top: 0.4rem; word-break: break-all;">
              🔑 ${escapeHTML(item.varianteAsignada || 'Asignación automática enviada a tu correo')}
            </div>
            ${item.correoImagen ? `<img src="${escapeHTML(item.correoImagen)}" alt="Banner correo" style="width: 100%; max-height: 140px; object-fit: cover; border-radius: 6px; margin-top: 0.5rem;">` : ''}
          </div>
        `).join('')}
      `;
    } else {
      itemsContainer.innerHTML = '';
    }
  }

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

function showToast(message, duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">🇨🇱</span>
      <span class="toast-text">${escapeHTML(message)}</span>
      <button class="toast-close-btn" aria-label="Cerrar">&times;</button>
    </div>
  `;

  container.appendChild(toast);

  // Animación de entrada
  requestAnimationFrame(() => toast.classList.add('show'));

  // Temporizador para auto-remover
  const autoRemoveTimer = setTimeout(() => {
    dismissToast(toast, 'right');
  }, duration);

  // Botón de cierre manual
  const closeBtn = toast.querySelector('.toast-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      clearTimeout(autoRemoveTimer);
      dismissToast(toast, 'right');
    });
  }

  // --- GESTOS DE DESLIZAMIENTO (SWIPE LEFT/RIGHT CON MOUSE O TOUCH) ---
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  function onPointerDown(e) {
    isDragging = true;
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    toast.style.transition = 'none';
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const deltaX = currentX - startX;
    const opacity = Math.max(0, 1 - Math.abs(deltaX) / 180);
    toast.style.transform = `translateX(${deltaX}px)`;
    toast.style.opacity = opacity;
  }

  function onPointerEnd() {
    if (!isDragging) return;
    isDragging = false;
    const deltaX = currentX - startX;

    if (Math.abs(deltaX) > 40) {
      clearTimeout(autoRemoveTimer);
      const direction = deltaX > 0 ? 'right' : 'left';
      dismissToast(toast, direction);
    } else {
      toast.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    }
  }

  toast.addEventListener('touchstart', onPointerDown, { passive: true });
  toast.addEventListener('touchmove', onPointerMove, { passive: true });
  toast.addEventListener('touchend', onPointerEnd);

  toast.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerEnd);
}

function dismissToast(toast, direction = 'right') {
  toast.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease';
  toast.style.transform = direction === 'left' ? 'translateX(-350px)' : 'translateX(350px)';
  toast.style.opacity = '0';
  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 300);
}

// Sincronización del catálogo a tiempo real mediante Server-Sent Events (SSE)
function initRealtimeCatalogStream() {
  if ('EventSource' in window) {
    try {
      const evtSource = new EventSource('/api/juegos/stream');
      evtSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'CATALOG_UPDATED' && Array.isArray(data.games) && data.games.length > 0) {
            catalog = data.games;
            renderCatalog();
            if (currentUser && (currentUser.role === 'admin' || (currentUser.username && currentUser.username.toLowerCase() === 'zxandere'))) {
              fetchAndRenderAdminGames();
            }
          }
        } catch (e) {}
      };
    } catch (e) {}
  }
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// --- SISTEMA DE CUPONES DE DESCUENTO Y ADMINISTRACIÓN ---
let appliedCoupon = null;
let AVAILABLE_COUPONS = {};
let adminCouponsStore = [];

async function fetchCoupons() {
  try {
    const res = await fetch('/api/coupons');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        adminCouponsStore = data;
        AVAILABLE_COUPONS = {};
        data.forEach(c => {
          AVAILABLE_COUPONS[c.code] = c;
        });
      }
    }
  } catch (e) {}
}

async function fetchAndRenderAdminCoupons() {
  const container = document.getElementById('admin-coupons-items-container');
  if (!container) return;
  container.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 1rem;">Cargando cupones...</p>';

  await fetchCoupons();
  renderAdminCouponsList(adminCouponsStore);
}

function renderAdminCouponsList(coupons) {
  const container = document.getElementById('admin-coupons-items-container');
  if (!container) return;

  if (!Array.isArray(coupons) || coupons.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 1rem;">No hay cupones registrados.</p>';
    return;
  }

  container.innerHTML = coupons.map(c => `
    <div class="admin-game-row">
      <div class="admin-game-info">
        <div style="font-size: 1.5rem; margin-right: 0.5rem;">🎟️</div>
        <div class="admin-game-details">
          <span class="admin-game-title" style="color: var(--joycon-cyan); font-weight: 800;">${escapeHTML(c.code)}</span>
          <span class="admin-game-sub">${escapeHTML(c.desc || (c.type === 'percent' ? `${c.value}% OFF` : `$${c.value} CLP OFF`))}</span>
        </div>
      </div>
      <div class="admin-game-actions">
        <button type="button" class="remove-item-btn" onclick="deleteCoupon('${escapeHTML(c.code)}')" title="Eliminar cupón permanente">
          🗑️ Eliminar
        </button>
      </div>
    </div>
  `).join('');
}

async function handleAdminAddCouponSubmit(e) {
  if (e) e.preventDefault();
  const adminUsername = (currentUser && currentUser.username) ? currentUser.username : 'ZxAndere';

  const codeInp = document.getElementById('admin-coupon-code');
  const typeInp = document.getElementById('admin-coupon-type');
  const valueInp = document.getElementById('admin-coupon-value');
  const descInp = document.getElementById('admin-coupon-desc');
  const errorMsg = document.getElementById('admin-coupon-error');

  if (!codeInp || !valueInp) return;

  const code = codeInp.value.trim();
  const type = typeInp ? typeInp.value : 'percent';
  const value = valueInp.value;
  const desc = descInp ? descInp.value.trim() : '';

  if (errorMsg) errorMsg.textContent = '';

  if (!code || value === undefined || value === '') {
    if (errorMsg) errorMsg.textContent = 'Por favor completa el código y el valor del descuento.';
    return;
  }

  const saveBtn = document.getElementById('save-coupon-btn');
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.textContent = 'Guardando...';
  }

  try {
    const res = await fetch('/api/admin/coupons/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, type, value, desc, username: adminUsername })
    });

    const data = await res.json();
    if (!res.ok || !data.exito) {
      if (errorMsg) errorMsg.textContent = data.error || 'No se pudo guardar el cupón.';
      return;
    }

    const form = document.getElementById('admin-add-coupon-form');
    if (form) form.reset();

    if (data.cupones) {
      adminCouponsStore = data.cupones;
      renderAdminCouponsList(adminCouponsStore);
      await fetchCoupons();
    }
    showToast(`¡Cupón "${code.toUpperCase()}" guardado exitosamente! 🎟️`);
  } catch (err) {
    if (errorMsg) errorMsg.textContent = 'Error de comunicación con el servidor.';
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = '🎟️ Guardar Cupón Permanente';
    }
  }
}

async function deleteCoupon(code) {
  const adminUsername = (currentUser && currentUser.username) ? currentUser.username : 'ZxAndere';
  if (!confirm(`¿Estás seguro de borrar permanentemente el cupón ${code}?`)) return;

  try {
    const res = await fetch('/api/admin/coupons/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, username: adminUsername })
    });
    const data = await res.json();
    if (data.exito && data.cupones) {
      adminCouponsStore = data.cupones;
      renderAdminCouponsList(adminCouponsStore);
      await fetchCoupons();
      showToast(`Cupón ${code} eliminado`);
    }
  } catch (err) {
    alert('Error al conectar con el servidor');
  }
}

function switchAdminSubtab(subtab) {
  const btnGames = document.getElementById('btn-subtab-games');
  const btnCoupons = document.getElementById('btn-subtab-coupons');
  const btnGallery = document.getElementById('btn-subtab-gallery');
  const viewGames = document.getElementById('admin-view-games');
  const viewCoupons = document.getElementById('admin-view-coupons');
  const viewGallery = document.getElementById('admin-view-gallery');

  if (btnGames) btnGames.classList.remove('active');
  if (btnCoupons) btnCoupons.classList.remove('active');
  if (btnGallery) btnGallery.classList.remove('active');
  if (viewGames) viewGames.style.display = 'none';
  if (viewCoupons) viewCoupons.style.display = 'none';
  if (viewGallery) viewGallery.style.display = 'none';

  if (subtab === 'games') {
    if (btnGames) btnGames.classList.add('active');
    if (viewGames) viewGames.style.display = 'block';
  } else if (subtab === 'coupons') {
    if (btnCoupons) btnCoupons.classList.add('active');
    if (viewCoupons) viewCoupons.style.display = 'block';
    fetchAndRenderAdminCoupons();
  } else if (subtab === 'gallery') {
    if (btnGallery) btnGallery.classList.add('active');
    if (viewGallery) viewGallery.style.display = 'block';
  }
}

function handleApplyCoupon() {
  const input = document.getElementById('coupon-code-input');
  const msgEl = document.getElementById('coupon-message');
  if (!input || !msgEl) return;

  const rawCode = input.value.trim();
  const code = rawCode.toUpperCase();

  if (!code) {
    msgEl.className = 'coupon-msg error';
    msgEl.style.color = '#ff4d6d';
    msgEl.textContent = 'Por favor ingresa un código de descuento.';
    return;
  }

  const coupon = AVAILABLE_COUPONS[code];
  if (coupon) {
    appliedCoupon = coupon;
    msgEl.className = 'coupon-msg success';
    msgEl.style.color = '#34d399';
    msgEl.textContent = `✓ ¡Código aplicado! (${coupon.desc})`;
    renderCartDrawer();
    renderPayCarousel();
    showToast(`¡Código ${coupon.code} aplicado con éxito! 🎉`);
  } else {
    appliedCoupon = null;
    msgEl.className = 'coupon-msg error';
    msgEl.style.color = '#ff4d6d';
    msgEl.textContent = '❌ El código de descuento no existe.';
    renderCartDrawer();
    renderPayCarousel();
  }
}

// --- BUSCADOR PREDICTIVO INSTANTÁNEO (AUTO-COMPLETE) ---
function handleSearchAutocomplete(inputEl, dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (!dropdown || !inputEl) return;

  const q = inputEl.value.toLowerCase().trim();
  if (!q) {
    dropdown.classList.remove('active');
    dropdown.innerHTML = '';
    return;
  }

  const matches = catalog.filter(g =>
    g.titulo.toLowerCase().includes(q) || g.categoria.toLowerCase().includes(q)
  ).slice(0, 5);

  if (matches.length === 0) {
    dropdown.classList.remove('active');
    dropdown.innerHTML = '';
    return;
  }

  dropdown.innerHTML = matches.map(game => `
    <div class="autocomplete-item" onclick="selectAutocompleteResult(${game.id}, '${dropdownId}')">
      <img class="autocomplete-thumb" src="${escapeHTML(game.imagen)}" alt="${escapeHTML(game.titulo)}">
      <div class="autocomplete-info">
        <span class="autocomplete-title">${escapeHTML(game.titulo)}</span>
        <span class="autocomplete-sub">${escapeHTML(game.categoria)} • desde ${formatCLP(game.precioSecundaria)}</span>
      </div>
    </div>
  `).join('');

  dropdown.classList.add('active');
}

function selectAutocompleteResult(gameId, dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) dropdown.classList.remove('active');

  const desktopSearch = document.getElementById('search-input');
  const mobileSearch = document.getElementById('mobile-search-input');
  if (desktopSearch) desktopSearch.value = '';
  if (mobileSearch) mobileSearch.value = '';
  searchQuery = '';
  renderCatalog();

  openGameModal(gameId);
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.header-search-box') && !e.target.closest('.mobile-search-box')) {
    document.querySelectorAll('.search-autocomplete-dropdown').forEach(d => d.classList.remove('active'));
  }
});

// --- GUÍA DE INSTALACIÓN PASO A PASO ---
function openInstallGuideModal() {
  switchGuideTab('secundaria');
  document.getElementById('install-guide-modal-backdrop').classList.add('active');
}

function closeInstallGuideModal() {
  document.getElementById('install-guide-modal-backdrop').classList.remove('active');
}

function switchGuideTab(type) {
  const btnSec = document.getElementById('guide-tab-sec');
  const btnPrim = document.getElementById('guide-tab-prim');
  const content = document.getElementById('guide-body-content');
  if (!content) return;

  if (type === 'secundaria') {
    if (btnSec) btnSec.classList.add('active');
    if (btnPrim) btnPrim.classList.remove('active');

    content.innerHTML = `
      <div class="guide-step-card">
        <h5>1️⃣ Paso 1: Crear Usuario en tu Consola</h5>
        <p>Ve a <strong>Configuración de la Consola -> Usuarios -> Agregar usuario -> Crear un nuevo usuario</strong>. Elige cualquier ícono y apodo.</p>
      </div>
      <div class="guide-step-card">
        <h5>2️⃣ Paso 2: Vincular Cuenta de Nintendo</h5>
        <p>Selecciona <strong>"Vincular una cuenta de Nintendo"</strong> e ingresa el correo y la contraseña que te enviamos tras tu compra.</p>
      </div>
      <div class="guide-step-card">
        <h5>3️⃣ Paso 3: Descargar el Juego desde eShop</h5>
        <p>Abre <strong>Nintendo eShop</strong> usando el nuevo usuario creado. Haz clic en el ícono de perfil arriba a la derecha -> <strong>Volver a descargar</strong> -> Selecciona tu juego y presiona Descargar.</p>
      </div>
      <div class="guide-step-card">
        <h5>4️⃣ Paso 4: Cómo Jugar (Licencia Secundaria)</h5>
        <p>Para jugar, debes abrir el juego usando el usuario entregado y tener tu consola conectada a Internet al iniciar el juego.</p>
      </div>
    `;
  } else {
    if (btnPrim) btnPrim.classList.add('active');
    if (btnSec) btnSec.classList.remove('active');

    content.innerHTML = `
      <div class="guide-step-card">
        <h5>1️⃣ Paso 1: Crear Usuario y Vincular</h5>
        <p>Agrega un nuevo usuario en la consola e ingresa los datos de la Cuenta Primaria enviados a tu correo.</p>
      </div>
      <div class="guide-step-card">
        <h5>2️⃣ Paso 2: Confirmar Consola Principal</h5>
        <p>Ingresa a Nintendo eShop. La cuenta se registrará automáticamente como <strong>Consola Principal</strong>.</p>
      </div>
      <div class="guide-step-card">
        <h5>3️⃣ Paso 3: Descargar el Juego</h5>
        <p>Ve a <strong>Perfil de eShop -> Volver a descargar</strong> y presiona el botón de descarga.</p>
      </div>
      <div class="guide-step-card">
        <h5>4️⃣ Paso 4: ¡Juega con tu Cuenta Personal!</h5>
        <p>¡Listo! Puedes cambiar a tu perfil personal de siempre. El juego funcionará con tu usuario personal, trofeos propios y sin necesidad de internet.</p>
      </div>
    `;
  }
}

// --- MICROINTERACCIONES DE BOTONES ---
function animateButtonSuccess(btn, successText = '✓ ¡Listo!') {
  if (!btn) return;
  const originalHtml = btn.innerHTML;
  btn.classList.add('btn-success-clicked');
  btn.innerHTML = `<span>${successText}</span>`;
  setTimeout(() => {
    btn.classList.remove('btn-success-clicked');
    btn.innerHTML = originalHtml;
  }, 1200);
}

// --- SMART STICKY NAVBAR SCROLL HANDLER ---
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const currentScrollY = window.scrollY;

  if (currentScrollY > 150) {
    if (currentScrollY > lastScrollY + 5) {
      navbar.classList.add('nav-hidden');
    } else if (currentScrollY < lastScrollY - 5) {
      navbar.classList.remove('nav-hidden');
      navbar.classList.add('nav-scrolled');
    }
  } else {
    navbar.classList.remove('nav-hidden');
    navbar.classList.remove('nav-scrolled');
  }

  lastScrollY = currentScrollY;
}, { passive: true });

// --- SISTEMA DE GALERÍA DE CLIENTES Y RESEÑAS CON SLIDER DE 4 TARJETAS ---
let customerGalleryStore = [];
let isGalleryEnabled = false;
let currentGalleryPage = 0;
const GALLERY_ITEMS_PER_PAGE = 4;

async function fetchSettings() {
  try {
    const res = await fetch('/api/settings');
    if (!res.ok) return;
    const data = await res.json();
    isGalleryEnabled = !!data.galleryEnabled;
    applyGalleryVisibility();
  } catch (err) {}
}

function applyGalleryVisibility() {
  const section = document.getElementById('customer-gallery-section');
  const toggleBtn = document.getElementById('toggle-gallery-status-btn');

  if (section) {
    section.style.display = isGalleryEnabled ? 'block' : 'none';
  }

  if (toggleBtn) {
    if (isGalleryEnabled) {
      toggleBtn.innerHTML = '🟢 Habilitada (Visible en tienda)';
      toggleBtn.style.background = 'rgba(52, 211, 153, 0.2)';
      toggleBtn.style.color = '#34d399';
      toggleBtn.style.borderColor = '#34d399';
    } else {
      toggleBtn.innerHTML = '🔴 Deshabilitada (Oculta)';
      toggleBtn.style.background = 'rgba(255, 0, 60, 0.2)';
      toggleBtn.style.color = '#ff4d6d';
      toggleBtn.style.borderColor = '#ff4d6d';
    }
  }
}

async function handleAdminToggleGallery() {
  if (!currentUser) return;

  const newStatus = !isGalleryEnabled;
  try {
    const res = await fetch('/api/admin/settings/toggle-gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled: newStatus, username: currentUser.username })
    });
    const data = await res.json();
    if (data.exito) {
      isGalleryEnabled = newStatus;
      applyGalleryVisibility();
      showToast(data.mensaje || 'Visibilidad de la galería actualizada.');
    }
  } catch (err) {
    alert('Error al conectar con el servidor.');
  }
}

async function fetchAndRenderGallery() {
  const container = document.getElementById('customer-gallery-grid');
  if (!container) return;

  try {
    const res = await fetch('/api/gallery');
    if (!res.ok) throw new Error('Error al consultar galería');
    customerGalleryStore = await res.json();
    renderCustomerGallery(customerGalleryStore);
  } catch (err) {
    console.error('Error cargando galería:', err);
  }
}

function renderCustomerGallery(items) {
  const container = document.getElementById('customer-gallery-grid');
  const pageIndicator = document.getElementById('gallery-page-indicator');
  const prevBtn = document.getElementById('gallery-prev-btn');
  const nextBtn = document.getElementById('gallery-next-btn');

  if (!container) return;

  if (!Array.isArray(items) || items.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--text-muted); grid-column: 1/-1;">No hay fotos registradas en la galería.</p>';
    if (pageIndicator) pageIndicator.textContent = '0 / 0';
    return;
  }

  const totalPages = Math.ceil(items.length / GALLERY_ITEMS_PER_PAGE);
  if (currentGalleryPage >= totalPages) currentGalleryPage = totalPages - 1;
  if (currentGalleryPage < 0) currentGalleryPage = 0;

  const startIndex = currentGalleryPage * GALLERY_ITEMS_PER_PAGE;
  const pageItems = items.slice(startIndex, startIndex + GALLERY_ITEMS_PER_PAGE);

  if (pageIndicator) pageIndicator.textContent = `${currentGalleryPage + 1} / ${totalPages}`;
  if (prevBtn) prevBtn.disabled = currentGalleryPage === 0;
  if (nextBtn) nextBtn.disabled = currentGalleryPage >= totalPages - 1;

  container.innerHTML = pageItems.map(item => `
    <div class="gallery-card in-view">
      <img src="${escapeHTML(item.imagen)}" alt="Setup de ${escapeHTML(item.user)}" loading="lazy">
      <div class="gallery-card-info">
        <div class="gallery-user">${escapeHTML(item.stars || '⭐ ⭐ ⭐ ⭐ ⭐')} <strong>${escapeHTML(item.user)}</strong></div>
        <p>"${escapeHTML(item.comment)}"</p>
      </div>
    </div>
  `).join('');
}

function slideGallery(delta) {
  if (!Array.isArray(customerGalleryStore) || customerGalleryStore.length === 0) return;
  const totalPages = Math.ceil(customerGalleryStore.length / GALLERY_ITEMS_PER_PAGE);
  const newPage = currentGalleryPage + delta;
  if (newPage >= 0 && newPage < totalPages) {
    currentGalleryPage = newPage;
    renderCustomerGallery(customerGalleryStore);
  }
}

// --- FUNCIONES ADMIN PARA LA GALERÍA DE CLIENTES ---


async function fetchAndRenderAdminGallery() {
  const container = document.getElementById('admin-gallery-items-container');
  if (!container) return;

  container.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 1rem;">Cargando fotos de galería...</p>';

  try {
    const res = await fetch('/api/gallery');
    const items = await res.json();
    customerGalleryStore = items;
    renderAdminGalleryList(items);
  } catch (err) {
    container.innerHTML = '<p style="text-align: center; color: var(--switch-red); padding: 1rem;">Error cargando la galería en admin.</p>';
  }
}

function renderAdminGalleryList(items) {
  const container = document.getElementById('admin-gallery-items-container');
  if (!container) return;

  if (!Array.isArray(items) || items.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 1rem;">No hay fotos en la galería.</p>';
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="admin-game-row">
      <div class="admin-game-info">
        <img class="admin-game-thumb" src="${escapeHTML(item.imagen)}" alt="${escapeHTML(item.user)}">
        <div class="admin-game-details">
          <span class="admin-game-title">${escapeHTML(item.user)} (${escapeHTML(item.stars)})</span>
          <span class="admin-game-sub">${escapeHTML(item.comment)}</span>
        </div>
      </div>
      <div class="admin-game-actions">
        <button type="button" class="remove-item-btn" onclick="deleteGalleryItem(${item.id})" title="Eliminar reseña de la tienda">
          🗑️ Eliminar
        </button>
      </div>
    </div>
  `).join('');
}

async function handleAdminAddGallerySubmit(e) {
  e.preventDefault();
  if (!currentUser) return;

  const user = document.getElementById('admin-gallery-user').value.trim();
  const stars = document.getElementById('admin-gallery-stars').value;
  const imagen = document.getElementById('admin-gallery-imagen').value.trim();
  const comment = document.getElementById('admin-gallery-comment').value.trim();
  const errorMsg = document.getElementById('admin-gallery-error');
  errorMsg.textContent = '';

  const saveBtn = document.getElementById('save-gallery-btn');
  saveBtn.disabled = true;
  saveBtn.textContent = 'Guardando...';

  try {
    const res = await fetch('/api/admin/gallery/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user,
        stars,
        imagen,
        comment,
        username: currentUser.username
      })
    });

    const data = await res.json();
    if (!res.ok || !data.exito) {
      errorMsg.textContent = data.error || 'No se pudo publicar la foto.';
      return;
    }

    document.getElementById('admin-add-gallery-form').reset();
    if (data.galeria) {
      customerGalleryStore = data.galeria;
      renderAdminGalleryList(customerGalleryStore);
      renderCustomerGallery(customerGalleryStore);
    }
    showToast('¡Foto y reseña agregadas a la galería con éxito! 📸');
  } catch (err) {
    errorMsg.textContent = 'Error al conectar con el servidor.';
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = '📸 Publicar Foto en Galería';
  }
}

async function deleteGalleryItem(id) {
  if (!currentUser || !confirm('¿Estás seguro de eliminar esta reseña de la tienda?')) return;

  try {
    const res = await fetch('/api/admin/gallery/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, username: currentUser.username })
    });
    const data = await res.json();
    if (data.exito && data.galeria) {
      customerGalleryStore = data.galeria;
      renderAdminGalleryList(customerGalleryStore);
      renderCustomerGallery(customerGalleryStore);
      showToast('Reseña removida de la galería');
    }
  } catch (err) {
    alert('Error al conectar con el servidor');
  }
}

// --- FUNCIONES PARA LA CONSTRUCCIÓN DINÁMICA DE VARIANTES DE CUENTAS (Cuenta / Contraseña / Código) ---
function renderAccountVariantsList(cuentasArray) {
  const container = document.getElementById('account-variants-list-container');
  if (!container) return;

  container.innerHTML = '';

  let list = Array.isArray(cuentasArray) ? cuentasArray : [];
  if (list.length === 0) {
    list = [''];
  }

  list.forEach((item) => {
    let cuenta = '';
    let pass = '';
    let codigo = '';

    if (typeof item === 'string' && item.trim()) {
      const parts = item.includes('/') ? item.split('/') : item.split('|');
      cuenta = (parts[0] || '').trim();
      pass = (parts[1] || '').trim();
      codigo = (parts[2] || parts.slice(2).join('/')).trim();
    }

    appendAccountVariantCard(container, cuenta, pass, codigo);
  });

  updateVariantBadges();
}

function appendAccountVariantCard(container, cuenta = '', pass = '', codigo = '') {
  const card = document.createElement('div');
  card.className = 'variant-row-card';
  card.innerHTML = `
    <div class="variant-row-header">
      <span class="variant-number-badge">Variante #1</span>
      <div class="variant-row-actions">
        <button type="button" class="icon-btn-add" onclick="addAccountVariantRowAfter(this)" title="Agregar variante después de esta">➕</button>
        <button type="button" class="icon-btn-delete" onclick="removeAccountVariantRow(this)" title="Eliminar variante">🗑️</button>
      </div>
    </div>
    <div class="variant-inputs-grid">
      <div class="variant-field">
        <label>Cuenta / Correo</label>
        <input type="text" class="var-input-cuenta" placeholder="mario1@zonaswitch.cl" value="${escapeHTML(cuenta)}">
      </div>
      <span class="variant-slash-separator">/</span>
      <div class="variant-field">
        <label>Contraseña</label>
        <input type="text" class="var-input-pass" placeholder="Pass123!" value="${escapeHTML(pass)}">
      </div>
      <span class="variant-slash-separator">/</span>
      <div class="variant-field">
        <label>Códigos OTP (1 uso x coma)</label>
        <input type="text" class="var-input-codigo" placeholder="123, 456, 789, 012" value="${escapeHTML(codigo)}">
      </div>
    </div>
  `;
  container.appendChild(card);
  updateVariantBadges();
}

function addAccountVariantRow(cuenta = '', pass = '', codigo = '') {
  const container = document.getElementById('account-variants-list-container');
  if (!container) return;
  appendAccountVariantCard(container, cuenta, pass, codigo);
  const lastCard = container.querySelector('.variant-row-card:last-child');
  if (lastCard) {
    const input = lastCard.querySelector('.var-input-cuenta');
    if (input) input.focus();
  }
}

function addAccountVariantRowAfter(btnEl) {
  const currentCard = btnEl.closest('.variant-row-card');
  const container = document.getElementById('account-variants-list-container');
  if (!currentCard || !container) return;

  const newCard = document.createElement('div');
  newCard.className = 'variant-row-card';
  newCard.innerHTML = `
    <div class="variant-row-header">
      <span class="variant-number-badge">Variante #1</span>
      <div class="variant-row-actions">
        <button type="button" class="icon-btn-add" onclick="addAccountVariantRowAfter(this)" title="Agregar variante después de esta">➕</button>
        <button type="button" class="icon-btn-delete" onclick="removeAccountVariantRow(this)" title="Eliminar variante">🗑️</button>
      </div>
    </div>
    <div class="variant-inputs-grid">
      <div class="variant-field">
        <label>Cuenta / Correo</label>
        <input type="text" class="var-input-cuenta" placeholder="mario2@zonaswitch.cl" value="">
      </div>
      <span class="variant-slash-separator">/</span>
      <div class="variant-field">
        <label>Contraseña</label>
        <input type="text" class="var-input-pass" placeholder="Pass123!" value="">
      </div>
      <span class="variant-slash-separator">/</span>
      <div class="variant-field">
        <label>Códigos OTP (1 uso x coma)</label>
        <input type="text" class="var-input-codigo" placeholder="123, 456, 789, 012" value="">
      </div>
    </div>
  `;

  currentCard.after(newCard);
  updateVariantBadges();

  const input = newCard.querySelector('.var-input-cuenta');
  if (input) input.focus();
}

function removeAccountVariantRow(btnEl) {
  const container = document.getElementById('account-variants-list-container');
  const cards = container ? container.querySelectorAll('.variant-row-card') : [];

  if (cards.length <= 1) {
    const card = btnEl.closest('.variant-row-card');
    if (card) {
      card.querySelectorAll('input').forEach(inp => inp.value = '');
    }
    return;
  }

  const card = btnEl.closest('.variant-row-card');
  if (card) {
    card.remove();
    updateVariantBadges();
  }
}

function updateVariantBadges() {
  const container = document.getElementById('account-variants-list-container');
  if (!container) return;

  const cards = container.querySelectorAll('.variant-row-card');
  cards.forEach((card, idx) => {
    const badge = card.querySelector('.variant-number-badge');
    if (badge) {
      badge.textContent = `Variante #${idx + 1}`;
    }
  });
}
