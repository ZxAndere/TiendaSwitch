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
cart = Array.isArray(cart) ? cart.map(item => {
  if (!item || typeof item !== 'object') return null;
  const raw = String(item.licencia || '').trim().toLowerCase();
  if (raw.includes('primaria')) item.licencia = 'Primaria';
  else if (raw.includes('secundaria')) item.licencia = 'Secundaria';
  return item;
}).filter(Boolean) : [];
localStorage.setItem('zonaswitch_cart_v4', JSON.stringify(cart));
let currentUser = JSON.parse(localStorage.getItem('zonaswitch_user')) || null;
let favoriteGameIds = new Set(JSON.parse(localStorage.getItem('zonaswitch_favorites') || '[]').map(Number));

// Interceptor global de fetch para inyectar automáticamente el token JWT y cabeceras Anti-Caché
const originalFetch = window.fetch;
window.fetch = async function (resource, init) {
  init = init || {};
  init.cache = 'no-store';

  // Inyectar cabeceras anti-caché para rutas de la API interna
  if (typeof resource === 'string' && resource.startsWith('/api/')) {
    init.headers = init.headers || {};
    if (init.headers instanceof Headers) {
      init.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      init.headers.set('Pragma', 'no-cache');
    } else if (Array.isArray(init.headers)) {
      init.headers.push(['Cache-Control', 'no-cache, no-store, must-revalidate']);
      init.headers.push(['Pragma', 'no-cache']);
    } else {
      init.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      init.headers['Pragma'] = 'no-cache';
    }
  }

  const token = localStorage.getItem('userToken');
  if (token) {
    init.headers = init.headers || {};
    if (init.headers instanceof Headers) {
      if (!init.headers.has('Authorization')) {
        init.headers.set('Authorization', `Bearer ${token}`);
      }
    } else if (Array.isArray(init.headers)) {
      const hasAuth = init.headers.some(h => h[0].toLowerCase() === 'authorization');
      if (!hasAuth) {
        init.headers.push(['Authorization', `Bearer ${token}`]);
      }
    } else {
      if (!init.headers['Authorization'] && !init.headers['authorization']) {
        init.headers['Authorization'] = `Bearer ${token}`;
      }
    }
  }

  const response = await originalFetch(resource, init);

  // Solo /api/auth/me indica el estado real de la sesión. Otros 401/403 (ej: rutas
  // admin-only) NO deben cerrar la sesión de un usuario válido.
  const isSessionProbe = typeof resource === 'string' && resource.includes('/api/auth/me');
  if ((response.status === 401 || response.status === 403) && isSessionProbe) {
    console.warn('⚠️ Sesión expirada o token inválido. Cerrando sesión...');
    handleLogout();
  }

  return response;
};

const apiFetch = function (resource, init) {
  return window.fetch(resource, init);
};

let activeCategory = 'todos';
let searchQuery = '';
let filterState = { priceMin: null, priceMax: null, sort: '', license: '', inStockOnly: false };
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

// --- SISTEMA DE MULTIMONEDA / CONVERSIÓN DE PESOS Y DIVISAS 2026 (FREECURRENCY API) ---
const CURRENCY_RATES = {
  CLP: { symbol: '$', code: 'CLP', rate: 1, decimals: 0, name: 'Chile (CLP)' },
  USD: { symbol: 'US$', code: 'USD', rate: 0.00106, decimals: 2, name: 'EE.UU. (USD)' },
  CAD: { symbol: 'CA$', code: 'CAD', rate: 0.00145, decimals: 2, name: 'Canadá (CAD)' },
  MXN: { symbol: '$', code: 'MXN', rate: 0.0185, decimals: 2, name: 'México (MXN)' },
  BRL: { symbol: 'R$ ', code: 'BRL', rate: 0.0055, decimals: 2, name: 'Brasil (BRL)' },
  ARS: { symbol: '$', code: 'ARS', rate: 1.63, decimals: 0, name: 'Argentina (ARS)' },
  COP: { symbol: '$', code: 'COP', rate: 4.25, decimals: 0, name: 'Colombia (COP)' },
  PEN: { symbol: 'S/. ', code: 'PEN', rate: 0.0037, decimals: 2, name: 'Perú (PEN)' },
  UYU: { symbol: '$U ', code: 'UYU', rate: 0.043, decimals: 2, name: 'Uruguay (UYU)' },
  CRC: { symbol: '₡', code: 'CRC', rate: 0.54, decimals: 2, name: 'Costa Rica (CRC)' },
  EUR: { symbol: '€', code: 'EUR', rate: 0.00098, decimals: 2, name: 'España (EUR)' },
  HNL: { symbol: 'L ', code: 'HNL', rate: 0.026, decimals: 2, name: 'Honduras (HNL)' }
};

let currentCurrency = localStorage.getItem('zonaswitch_currency') || 'CLP';

// --- TEMA CLARO / OSCURO ---
function applyTheme(theme) {
  const isLight = theme === 'light';
  document.documentElement.classList.toggle('light-mode', isLight);
  try { localStorage.setItem('zonaswitch_theme', isLight ? 'light' : 'dark'); } catch (e) {}
  document.querySelectorAll('[data-theme-label]').forEach(el => {
    el.textContent = isLight ? 'Modo oscuro' : 'Modo claro';
  });
}

function toggleTheme() {
  const next = document.documentElement.classList.contains('light-mode') ? 'dark' : 'light';
  applyTheme(next);
}

async function loadLiveExchangeRates() {
  try {
    const res = await fetch('/api/exchange-rates');
    const data = await res.json();
    if (data && data.success && data.rates) {
      Object.keys(data.rates).forEach(code => {
        if (CURRENCY_RATES[code]) {
          CURRENCY_RATES[code].rate = data.rates[code].rate;
        } else {
          CURRENCY_RATES[code] = data.rates[code];
        }
      });
      // Actualizar precios visibles con las tasas reales SIN re-renderizar el
      // grid (un re-render repetiría la animación de entrada = sensación de
      // "carga doble"). Si el catálogo aún no llegó, el render de fetchCatalog
      // toma las tasas ya aplicadas en CURRENCY_RATES.
      if (catalogLoaded && typeof refreshCatalogPricesInPlace === 'function') refreshCatalogPricesInPlace();
      if (typeof renderGameDetailView === 'function') renderGameDetailView();
      if (typeof renderCartDrawer === 'function') renderCartDrawer();
    }
  } catch (err) {
    console.warn('ℹ️ Usando tasas de cambio predeterminadas locales:', err.message);
  }
}

// Helper de formato de moneda dinámico y exacto
function formatCLP(num) {
  const n = Number(num);
  if (isNaN(n) || num === null || num === undefined || num === '') return '$0 CLP';
  const conf = CURRENCY_RATES[currentCurrency] || CURRENCY_RATES.CLP;
  const val = n * conf.rate;

  const formatted = conf.decimals === 0
    ? Math.round(val).toLocaleString('es-CL')
    : val.toLocaleString('es-CL', { minimumFractionDigits: conf.decimals, maximumFractionDigits: conf.decimals });

  return `${conf.symbol}${formatted} ${conf.code}`;
}

function renderGlobalAdminGear() {
  const savedUser = JSON.parse(localStorage.getItem('zonaswitch_user')) || currentUser;
  const isAdmin = savedUser && savedUser.role === 'admin';

  const gearBtns = document.querySelectorAll('.admin-quick-gear-btn, #admin-game-gear-btn, #global-admin-gear-btn');

  gearBtns.forEach(btn => {
    if (isAdmin) {
      btn.style.display = 'flex';
      btn.style.opacity = '1';
      btn.style.visibility = 'visible';
    } else {
      btn.style.display = 'none';
    }
  });

  const globalGear = document.getElementById('global-admin-gear-btn');
  if (globalGear && isAdmin) {
    globalGear.onclick = () => {
      openUserSettingsModal();
      switchAdminSubtab('games');
    };
  }
}

// Inicializar Aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('userToken')) {
    apiFetch('/api/auth/me').catch(() => {});
  }

  try { initFilters(); } catch (e) { console.error('Error initFilters:', e); }
  try { initGridViewControls(); } catch (e) { console.error('Error initGridViewControls:', e); }
  try { applyTheme(localStorage.getItem('zonaswitch_theme') === 'light' ? 'light' : 'dark'); } catch (e) {}
  try { initEventListeners(); } catch (e) { console.error('Error initEventListeners:', e); }
  try { initUserSession(); } catch (e) { console.error('Error initUserSession:', e); }
  try { renderGlobalAdminGear(); } catch (e) { console.error('Error renderGlobalAdminGear:', e); }
  try { fetchSettings(); } catch (e) { console.error('Error fetchSettings:', e); }
  try { if (currentUser && currentUser.role === 'admin') fetchCoupons(); } catch (e) { console.error('Error fetchCoupons:', e); }
  try { fetchCatalog(); } catch (e) { console.error('Error fetchCatalog:', e); }
  try { fetchAndRenderGallery(); } catch (e) { console.error('Error fetchAndRenderGallery:', e); }
  try { initAuthPasswordFieldsObserver(); } catch (e) { console.error('Error initAuthPasswordFieldsObserver:', e); }
  try { updateCartBadge(); } catch (e) { console.error('Error updateCartBadge:', e); }
  try { checkPaymentReturnUrls(); } catch (e) { console.error('Error checkPaymentReturnUrls:', e); }
  try { initRealtimeCatalogStream(); } catch (e) { console.error('Error initRealtimeCatalogStream:', e); }
  try { loadLiveExchangeRates(); } catch (e) { console.error('Error loadLiveExchangeRates:', e); }
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

  // Selector de Conversión de Moneda (Escritorio)
  const currSelect = document.getElementById('currency-select');
  if (currSelect) {
    currSelect.value = currentCurrency;
    currSelect.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      localStorage.setItem('zonaswitch_currency', currentCurrency);
      const mobileCurrencySelect = document.getElementById('mobile-currency-select');
      if (mobileCurrencySelect) mobileCurrencySelect.value = currentCurrency;
      renderCatalog(true);
      if (typeof renderCartDrawer === 'function') renderCartDrawer();
      if (typeof renderGameDetailView === 'function') renderGameDetailView(true);
      if (typeof updateFilterPriceLabels === 'function') updateFilterPriceLabels();
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

  // Filtros del catálogo (Precio, Orden, Licencia)
  const filterToggleBtn = document.getElementById('filter-toggle-btn');
  const filterPanel = document.getElementById('filter-panel');
  if (filterToggleBtn && filterPanel) {
    filterToggleBtn.addEventListener('click', () => {
      const open = filterPanel.classList.toggle('open');
      filterToggleBtn.classList.toggle('open', open);
      filterToggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  const filterPriceMin = document.getElementById('filter-price-min');
  const filterPriceMax = document.getElementById('filter-price-max');
  if (filterPriceMin) {
    filterPriceMin.addEventListener('input', () => {
      const valEl = document.getElementById('filter-price-min-val');
      if (valEl) valEl.value = filterPriceMin.value;
      applyFilters();
    });
  }
  if (filterPriceMax) {
    filterPriceMax.addEventListener('input', () => {
      const valEl = document.getElementById('filter-price-max-val');
      if (valEl) valEl.value = filterPriceMax.value;
      applyFilters();
    });
  }

  // Campos numéricos de precio: Enter/blur sincroniza el slider con límites
  const priceMinInput = document.getElementById('filter-price-min-val');
  const priceMaxInput = document.getElementById('filter-price-max-val');
  if (priceMinInput && filterPriceMin) {
    priceMinInput.addEventListener('change', () => {
      const maxVal = Math.max(0, Number(priceMinInput.max) || Number(filterPriceMin.max) || 0);
      let v = Math.round(Number(priceMinInput.value) || 0);
      v = Math.max(0, Math.min(maxVal, v));
      if (priceMaxInput && priceMaxInput.value !== '') {
        v = Math.min(v, Number(priceMaxInput.value) || 0);
      }
      filterPriceMin.value = v;
      priceMinInput.value = filterPriceMin.value;
      applyFilters();
    });
  }
  if (priceMaxInput && filterPriceMax) {
    priceMaxInput.addEventListener('change', () => {
      const maxVal = Math.max(0, Number(priceMaxInput.max) || Number(filterPriceMax.max) || 0);
      let v = Math.round(Number(priceMaxInput.value) || 0);
      v = Math.max(0, Math.min(maxVal, v));
      if (priceMinInput && priceMinInput.value !== '') {
        v = Math.max(v, Number(priceMinInput.value) || 0);
      }
      filterPriceMax.value = v;
      priceMaxInput.value = filterPriceMax.value;
      applyFilters();
    });
  }

  const filterSort = document.getElementById('filter-sort');
  if (filterSort) filterSort.addEventListener('change', applyFilters);

  const filterLicense = document.getElementById('filter-license');
  if (filterLicense) filterLicense.addEventListener('change', applyFilters);

  const filterInStock = document.getElementById('filter-in-stock');
  if (filterInStock) filterInStock.addEventListener('change', applyFilters);

  const filterResetBtn = document.getElementById('filter-reset-btn');
  if (filterResetBtn) filterResetBtn.addEventListener('click', resetFilters);

  // Barra inferior móvil: Buscar abre la búsqueda flotante
  const bottomNavSearchBtn = document.getElementById('bottom-nav-search-btn');
  if (bottomNavSearchBtn) {
    bottomNavSearchBtn.addEventListener('click', openMobileSearchOverlay);
  }

  // Búsqueda flotante móvil
  const mobileSearchOverlay = document.getElementById('mobile-search-overlay');
  const mobileSearchOverlayInput = document.getElementById('mobile-search-overlay-input');
  const mobileSearchOverlayClose = document.getElementById('mobile-search-overlay-close');
  if (mobileSearchOverlayInput) {
    mobileSearchOverlayInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      const desktopSearch = document.getElementById('search-input');
      if (desktopSearch) desktopSearch.value = e.target.value;
      renderCatalog();
      handleSearchAutocomplete(mobileSearchOverlayInput, 'mobile-search-overlay-suggestions');
    });
  }
  if (mobileSearchOverlay && mobileSearchOverlayClose) {
    mobileSearchOverlayClose.addEventListener('click', closeMobileSearchOverlay);
    mobileSearchOverlay.addEventListener('click', (e) => {
      if (e.target === mobileSearchOverlay) closeMobileSearchOverlay();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const overlay = document.getElementById('mobile-search-overlay');
      if (overlay && overlay.classList.contains('active')) closeMobileSearchOverlay();
    }
  });

  // Barra inferior móvil: Cuenta abre la hoja de acciones rápidas
  const bottomNavAccountBtn = document.getElementById('bottom-nav-account-btn');
  if (bottomNavAccountBtn) {
    bottomNavAccountBtn.addEventListener('click', openAccountSheet);
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

  ensureRecoveryUi();
  ensureAccountDeleteUi();
  ensureAdminOrdersUi();

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
    mobileCurrencySelect.value = currentCurrency;
    mobileCurrencySelect.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      localStorage.setItem('zonaswitch_currency', currentCurrency);
      const desktopCurrency = document.getElementById('currency-select');
      if (desktopCurrency) desktopCurrency.value = currentCurrency;
      renderCatalog();
      if (typeof renderCartDrawer === 'function') renderCartDrawer();
      if (typeof renderGameDetailView === 'function') renderGameDetailView();
      if (typeof updateFilterPriceLabels === 'function') updateFilterPriceLabels();
    });
  }

  // Tabs de configuración de cuenta + layout especial para Admin
  document.querySelectorAll('.settings-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.settings-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.settings-tab-content .tab-pane').forEach(p => p.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const tabId = e.currentTarget.dataset.tab;
      const pane = document.getElementById(tabId);
      if (pane) pane.classList.add('active');

      const backdrop = document.getElementById('user-settings-modal-backdrop');
      const modalCard = backdrop ? backdrop.querySelector('.user-modal-card') : null;
      const isAdmin = !!(currentUser && currentUser.role === 'admin');
      const adminMode = isAdmin && tabId === 'tab-admin';
      if (modalCard) modalCard.classList.toggle('wide-admin', adminMode);
      if (backdrop) backdrop.classList.toggle('admin-mode', adminMode);
      if (adminMode && typeof fetchAndRenderAdminGames === 'function') fetchAndRenderAdminGames();
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

  // Admin: creación de juegos
  const openCreateGameBtn = document.getElementById('open-create-game-modal');
  if (openCreateGameBtn) openCreateGameBtn.addEventListener('click', openCreateGameModal);

  const closeCreateGameBtn = document.getElementById('close-game-create-modal');
  if (closeCreateGameBtn) closeCreateGameBtn.addEventListener('click', closeCreateGameModal);

  const gameCreateForm = document.getElementById('game-create-form');
  if (gameCreateForm) gameCreateForm.addEventListener('submit', handleGameCreateSubmit);

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

// --- SEGURIDAD Y VERIFICACIÓN DE ADMINISTRADOR ---
function verifyAdminSecurity() {
  const isAdmin = currentUser && currentUser.role === 'admin';
  if (!isAdmin) {
    triggerSecurityViolation();
    return false;
  }
  return true;
}

function triggerSecurityViolation() {
  showToast('⛔ Identidad no verificada. Has sido deslogueado por seguridad.');
  handleLogout();
  closeUserSettingsModal();
  const gearBtn = document.getElementById('admin-game-gear-btn');
  if (gearBtn) gearBtn.style.display = 'none';
  const adminModal = document.getElementById('admin-game-modal-backdrop');
  if (adminModal) adminModal.classList.remove('active');
}

let adminCouponsVisible = false;
function toggleAdminCouponsVisibility() {
  if (!verifyAdminSecurity()) return;
  adminCouponsVisible = !adminCouponsVisible;
  const container = document.getElementById('admin-coupons-items-container');
  const btn = document.getElementById('toggle-coupons-btn');
  if (container) {
    container.style.display = adminCouponsVisible ? 'block' : 'none';
  }
  if (btn) {
    btn.textContent = adminCouponsVisible ? 'Ocultar Cupones' : 'Ver Cupones';
  }
}

function openUserSettingsModal() {
  const backdrop = document.getElementById('user-settings-modal-backdrop');
  if (!backdrop) return;
  const modalCard = backdrop.querySelector('.user-modal-card');
  const adminTabBtn = document.getElementById('admin-tab-btn');
  const isAdmin = currentUser && currentUser.role === 'admin';
  ensureAdminOrdersUi();

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

  const activeTab = backdrop.querySelector('.settings-tabs .tab-btn.active');
  const adminMode = !!(activeTab && activeTab.getAttribute('data-tab') === 'tab-admin' && isAdmin);
  if (modalCard) modalCard.classList.toggle('wide-admin', adminMode);
  backdrop.classList.toggle('admin-mode', adminMode);
  backdrop.classList.add('active');
}

function closeUserSettingsModal() { const b=document.getElementById('user-settings-modal-backdrop'); if(b){ b.classList.remove('active','admin-mode'); const card=b.querySelector('.user-modal-card'); if(card) card.classList.remove('wide-admin'); } }
function openUpdateOtpModal() { document.getElementById('update-otp-modal-backdrop').classList.add('active'); }
function closeUpdateOtpModal() { document.getElementById('update-otp-modal-backdrop').classList.remove('active'); }

// --- FUNCIONES DEL PANEL DE ADMINISTRADOR (PROTEGIDO POR ROL) ---

async function fetchAndRenderAdminGames() {
  if (!verifyAdminSecurity()) return;
  const container = document.getElementById('admin-games-container');

  if (container) container.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 1rem;">Cargando juegos en panel admin...</p>';

  try {
    const res = await apiFetch('/api/admin/juegos');
    if (!res.ok) {
      triggerSecurityViolation();
      return;
    }
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
              ${escapeHTML(game.categoria)} | Sec: ${formatCLP(game.precioSecundaria)} - Prim: ${formatCLP(game.precioPrimaria)} | Stock S: ${game.stockSecundaria == null ? '∞' : game.stockSecundaria} / P: ${game.stockPrimaria == null ? '∞' : game.stockPrimaria}
            </span>
          </div>
        </div>
        <div class="admin-game-actions">
          <label class="toggle-switch-label" title="Mostrar u Ocultar en la tienda">
            <span>${isVisible ? 'Visible' : 'Oculto'}</span>
            <input type="checkbox" ${isVisible ? 'checked' : ''} onchange="toggleGameVisibility(${game.id}, this.checked)">
            <span class="toggle-slider"></span>
          </label>
          <button type="button" class="edit-game-gear-btn" onclick="openGameEditModal(${game.id})" title="Editar datos del juego">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

async function deactivateGame(gameId){ if(!verifyAdminSecurity())return; if(!confirm('¿Desactivar este juego de la tienda?'))return; const r=await apiFetch('/api/admin/juegos/delete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({gameId})});const d=await r.json();if(!r.ok)return showToast(d.error||'No se pudo desactivar.');adminCatalog=d.juegos||adminCatalog;renderAdminGamesList(adminCatalog);await fetchCatalog();showToast('Juego desactivado.');}

async function toggleGameVisibility(gameId, isVisible) {
  if (!currentUser) return;
  try {
    const res = await apiFetch('/api/admin/juegos/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId, visible: isVisible })
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
  if (document.getElementById('edit-game-stock-primaria')) document.getElementById('edit-game-stock-primaria').value = game.stockPrimaria ?? '';
  if (document.getElementById('edit-game-stock-secundaria')) document.getElementById('edit-game-stock-secundaria').value = game.stockSecundaria ?? '';
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

function openCreateGameModal() {
  if (!verifyAdminSecurity()) return;
  const backdrop = document.getElementById('game-create-modal-backdrop');
  const form = document.getElementById('game-create-form');
  const error = document.getElementById('game-create-error');
  if (!backdrop || !form) return;
  form.reset();
  const visible = document.getElementById('create-game-visible');
  if (visible) visible.checked = true;
  const rating = document.getElementById('create-game-rating');
  if (rating) rating.value = '5';
  if (error) error.textContent = '';
  backdrop.classList.add('active');
}

function closeCreateGameModal() {
  const backdrop = document.getElementById('game-create-modal-backdrop');
  if (backdrop) backdrop.classList.remove('active');
}

async function handleGameCreateSubmit(e) {
  e.preventDefault();
  if (!verifyAdminSecurity()) return;

  const get = id => document.getElementById(id);
  const errorMsg = get('game-create-error');
  const saveBtn = get('save-game-create-btn');
  const payload = {
    titulo: get('create-game-titulo')?.value.trim() || '',
    categoria: get('create-game-categoria')?.value.trim() || '',
    precioSecundaria: get('create-game-secundaria')?.value,
    precioPrimaria: get('create-game-primaria')?.value,
    precioOriginal: get('create-game-original')?.value,
    rating: get('create-game-rating')?.value,
    peso: get('create-game-peso')?.value.trim() || '',
    imagen: get('create-game-imagen')?.value.trim() || '',
    imagenDetalle: get('create-game-imagen-detalle')?.value.trim() || '',
    descripcion: get('create-game-descripcion')?.value.trim() || '',
    resumenExtenso: get('create-game-resumen')?.value.trim() || '',
    youtubeUrl: get('create-game-youtube')?.value.trim() || '',
    correoTexto: get('create-game-correo-texto')?.value.trim() || '',
    correoImagen: get('create-game-correo-imagen')?.value.trim() || '',
    cuentas: get('create-game-cuentas')?.value || '',
    visible: !!get('create-game-visible')?.checked,
    stockPrimaria: get('create-game-stock-primaria')?.value ?? '',
    stockSecundaria: get('create-game-stock-secundaria')?.value ?? ''
  };

  if (!payload.titulo || !payload.categoria || payload.precioSecundaria === '' || payload.precioPrimaria === '' || !payload.imagen || !payload.imagenDetalle || !payload.descripcion) {
    if (errorMsg) errorMsg.textContent = 'Completa todos los campos obligatorios.';
    return;
  }

  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.textContent = 'Creando juego...';
  }
  if (errorMsg) errorMsg.textContent = '';

  try {
    const res = await apiFetch('/api/admin/juegos/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (!res.ok || !data.exito) {
      if (errorMsg) errorMsg.textContent = data.error || 'No se pudo crear el juego.';
      return;
    }

    adminCatalog = Array.isArray(data.juegos) ? data.juegos : [...adminCatalog, data.juego];
    renderAdminGamesList(adminCatalog);
    await fetchCatalog();
    closeCreateGameModal();
    showToast(data.mensaje || 'Juego creado y guardado correctamente. 🎮');
  } catch (err) {
    if (errorMsg) errorMsg.textContent = 'Error de comunicación con el servidor.';
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Crear y Guardar Juego';
    }
  }
}

function closeGameEditModal() {
  document.getElementById('game-edit-modal-backdrop').classList.remove('active');
}

async function handleGameEditSubmit(e) {
  e.preventDefault();

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
    const res = await apiFetch('/api/admin/juegos/update', {
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
        stockPrimaria: document.getElementById('edit-game-stock-primaria')?.value ?? '',
        stockSecundaria: document.getElementById('edit-game-stock-secundaria')?.value ?? ''
      })
    });

    const data = await res.json();
    if (!res.ok || !data.exito) {
      errorMsg.textContent = data.error || 'No se pudo guardar la información.';
      saveBtn.disabled = false;
      saveBtn.textContent = 'Guardar Cambios en Tiempo Real';
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
    saveBtn.textContent = 'Guardar Cambios en Tiempo Real';
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

// --- BÚSQUEDA FLOTANTE MÓVIL (barra inferior → Buscar) ---
function openMobileSearchOverlay() {
  const overlay = document.getElementById('mobile-search-overlay');
  if (!overlay) return;
  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('scroll-locked');
  setTimeout(() => {
    const input = document.getElementById('mobile-search-overlay-input');
    if (input) input.focus();
  }, 60);
}

function closeMobileSearchOverlay() {
  const overlay = document.getElementById('mobile-search-overlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('scroll-locked');
  const input = document.getElementById('mobile-search-overlay-input');
  if (input) input.blur();
}

// --- HOJA DE CUENTA (BARRA INFERIOR → CUENTA) ---
function buildAccountSheet() {
  const sheet = document.createElement('div');
  sheet.id = 'account-sheet';
  sheet.className = 'account-sheet-backdrop';
  sheet.setAttribute('aria-hidden', 'true');
  sheet.innerHTML = `
    <div class="account-sheet-card" role="dialog" aria-label="Menú de cuenta">
      <div class="account-sheet-inner">
        <div class="account-sheet-header">
          <span class="account-sheet-title" id="account-sheet-title">Cuenta</span>
          <button type="button" class="account-sheet-close" id="account-sheet-close" aria-label="Cerrar menú de cuenta">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>
        <div class="account-sheet-items" id="account-sheet-items"></div>
      </div>
    </div>
  `;
  sheet.addEventListener('click', (e) => {
    if (e.target === sheet) closeAccountSheet();
  });
  sheet.querySelector('#account-sheet-close').addEventListener('click', closeAccountSheet);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAccountSheet();
  });
  document.body.appendChild(sheet);
  return sheet;
}

function renderAccountSheetContent(sheet) {
  const title = sheet.querySelector('#account-sheet-title');
  const items = sheet.querySelector('#account-sheet-items');
  const loggedIn = !!(currentUser && currentUser.username);
  const themeItem = `
      <button type="button" class="account-sheet-item" data-theme-btn onclick="toggleTheme()" style="border-top: 1px solid var(--border-subtle); border-radius: 0;">
        <span class="icon-sun"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg></span>
        <span class="icon-moon"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg></span>
        <span data-theme-label>Modo claro</span>
      </button>
  `;
  if (loggedIn) {
    title.textContent = currentUser.username;
    items.innerHTML = `
      <button type="button" class="account-sheet-item" onclick="closeAccountSheet(); openUserOrdersModal();">
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg> Mis Pedidos
      </button>
      <button type="button" class="account-sheet-item" onclick="closeAccountSheet(); openUserSettingsModal();">
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg> Mi Cuenta
      </button>
      <button type="button" class="account-sheet-item account-sheet-item-danger" onclick="closeAccountSheet(); handleLogout();">
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg> Cerrar sesión
      </button>
    ` + themeItem;
  } else {
    title.textContent = 'Cuenta';
    items.innerHTML = `
      <button type="button" class="account-sheet-item" onclick="closeAccountSheet(); openLoginModal();">
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" x2="3" y1="12" y2="12"></line></svg> Iniciar Sesión
      </button>
      <button type="button" class="account-sheet-item" onclick="closeAccountSheet(); openRegisterModal();">
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg> Crear Cuenta
      </button>
    ` + themeItem;
  }
}

function openAccountSheet() {
  let sheet = document.getElementById('account-sheet');
  if (!sheet) sheet = buildAccountSheet();
  renderAccountSheetContent(sheet);
  sheet.classList.add('active');
  sheet.setAttribute('aria-hidden', 'false');
  document.body.classList.add('scroll-locked');
}

function closeAccountSheet() {
  const sheet = document.getElementById('account-sheet');
  if (!sheet) return;
  sheet.classList.remove('active');
  sheet.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('scroll-locked');
}

// --- GESTIÓN DE CONFIGURACIÓN DE CUENTA Y ÓRDENES ---
async function fetchAndRenderUserOrders() {
  const container = document.getElementById('user-orders-container');
  if (!currentUser) return;
  container.innerHTML = '<p style=\"text-align:center;color:var(--text-muted)\">Cargando tus órdenes...</p>';
  try {
    const res = await apiFetch('/api/user/orders');
    const orders = await res.json();
    if (!res.ok) throw new Error(orders.error || 'Error');
    if (!Array.isArray(orders) || !orders.length) {
      container.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--text-muted)"><div style="font-size:2.5rem;display:flex;justify-content:center;"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg></div><p>Aún no has realizado ninguna compra.</p></div>';
      return;
    }
    container.innerHTML = orders.map(order => {
      const paid = order.estado === 'pagada';
      const retryable = ['pendiente','rechazada','cancelada'].includes(order.estado);
      return `<div class=\"order-history-card\">
        <div class="oh-header"><div><span class="oh-code">${escapeHTML(order.codigoOrden)}</span><div class="oh-date">${escapeHTML(order.fecha || '')}</div></div><span class="oh-badge ${paid?'pagada':'pendiente'}">${paid?'Pagada':escapeHTML(order.estado||'Pendiente')}</span></div>
        <div class=\"oh-body\">${Array.isArray(order.carrito)?order.carrito.map(i=>`<div class=\"oh-item\"><span>• ${escapeHTML(i.titulo)} (${escapeHTML(i.licencia)}) x${i.cantidad}</span><strong>${formatCLP((Number(i.precio)||0)*(Number(i.cantidad)||1))}</strong></div>`).join(''):''}</div>
        <div class=\"oh-footer\"><span>Total:</span><span class=\"highlight-green\">${escapeHTML(order.totalFormatted || formatCLP(order.total))}</span></div>
        <div style=\"display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.75rem\">
          <button type="button" class="tab-btn" onclick="showUserOrderDetail('${escapeHTML(order.codigoOrden)}')"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg> Ver detalle</button>
          ${retryable?`<button type="button" class="tab-btn" onclick="retryOrderPayment('${escapeHTML(order.codigoOrden)}','${escapeHTML(order.email||'')}')"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path></svg> Reintentar pago</button>`:''}
        </div>
      </div>`;
    }).join('');
  } catch (err) {
    container.innerHTML = '<p style=\"text-align:center;color:#ff4d6d\">No se pudieron cargar tus órdenes.</p>';
  }
}

async function showUserOrderDetail(code) {
  try {
    const res = await apiFetch(`/api/user/orders/${encodeURIComponent(code)}`);
    const data = await res.json();
    if (!res.ok) return showToast(data.error || 'No se pudo cargar la orden.');
    const history = Array.isArray(data.history) ? data.history.map(h=>`<li><strong>${escapeHTML(h.type)}</strong> — ${escapeHTML(h.detail||'')} <small>${escapeHTML(h.at||'')}</small></li>`).join('') : '';
    const items = Array.isArray(data.carrito) ? data.carrito.map(i=>`<li>${escapeHTML(i.titulo)} (${escapeHTML(i.licencia)}) x${i.cantidad}</li>`).join('') : '';
    showSimpleModal(`Orden ${escapeHTML(data.codigoOrden)}`, `<p><strong>Estado:</strong> ${escapeHTML(data.estado)}</p><p><strong>Entrega:</strong> ${escapeHTML(data.deliveryStatus||'')}</p><p><strong>Total:</strong> ${escapeHTML(data.totalFormatted||formatCLP(data.total))}</p><h4>Productos</h4><ul>${items}</ul><h4>Historial</h4><ul>${history || '<li>Sin eventos</li>'}</ul>`);
  } catch (e) { showToast('No se pudo cargar el detalle.'); }
}

async function retryOrderPayment(code, email) {
  try {
    const res = await apiFetch(`/api/orders/${encodeURIComponent(code)}/retry-payment`, { method:'POST', body: JSON.stringify({ email: email || '' }), headers: { 'Content-Type': 'application/json' } });
    const data = await res.json();
    if (!res.ok || !data.exito) return showToast(data.error || 'No se pudo reintentar el pago.');
    if (data.redirectUrl) window.location.href = data.redirectUrl;
  } catch (e) { showToast('Error de conexión.'); }
}

function showSimpleModal(title, html) {
  let backdrop=document.getElementById('simple-info-modal');
  if(!backdrop){ backdrop=document.createElement('div'); backdrop.id='simple-info-modal'; backdrop.className='modal-backdrop active'; document.body.appendChild(backdrop); }
  backdrop.innerHTML=`<div class=\"user-modal-card wide\"><button class=\"modal-close-x\" onclick=\"document.getElementById('simple-info-modal').remove()\">&times;</button><div class=\"user-modal-header\"><h3>${title}</h3></div><div style=\"padding:1rem;max-height:65vh;overflow:auto\">${html}</div></div>`;
}

async function handleUsernameChangeSubmit(e) {
  e.preventDefault();
  if (!currentUser) return;

  const newUsername = document.getElementById('new-username-input').value.trim();
  const currentPassword = document.getElementById('username-current-password').value;
  const errorMsg = document.getElementById('change-username-error');
  errorMsg.textContent = '';

  try {
    const res = await apiFetch('/api/user/update-username', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newUsername, currentPassword })
    });

    const data = await res.json();
    if (!res.ok || !data.exito) {
      errorMsg.textContent = data.error || 'No se pudo cambiar el usuario.';
      return;
    }

    currentUser = data.usuario;
    localStorage.setItem('zonaswitch_user', JSON.stringify(currentUser));
    if (data.token) localStorage.setItem('userToken', data.token);
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
    const res = await apiFetch('/api/user/send-email-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newEmail, currentPassword })
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
    const res = await apiFetch('/api/user/send-password-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword })
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
    const res = await apiFetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });

    const data = await res.json();
    if (!res.ok || !data.exito) {
      errorMsg.textContent = data.error || 'Código incorrecto o expirado.';
      btn.disabled = false;
      return;
    }

    if (pendingUpdateType === 'password') {
      handleLogout();
      closeUpdateOtpModal();
      pendingUpdateType = null;
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
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span>${escapeHTML(currentUser.username)}</span>
          <span style="font-size: 0.7rem;">▼</span>
        </button>
        <div class="user-dropdown-menu" id="user-dropdown-menu">
          <button class="dropdown-item" onclick="openUserOrdersModal(); closeMobileDrawer();"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg> Mis Órdenes</button>
          <button class="dropdown-item" onclick="openUserSettingsModal(); closeMobileDrawer();"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg> Opciones de Cuenta</button>
          <button class="dropdown-item danger" onclick="handleLogout(); closeMobileDrawer();"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg> Cerrar Sesión</button>
        </div>
      </div>
    `;

    if (userNavArea) userNavArea.innerHTML = userHtml;
    if (mobileUserContainer) {
      mobileUserContainer.innerHTML = `
        <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle); padding: 0.85rem; border-radius: var(--radius-sm); display: flex; flex-direction: column; gap: 0.6rem;">
          <div style="font-weight: 800; font-size: 0.9rem; color: var(--joycon-cyan); display: flex; align-items: center; gap: 0.5rem;"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> ${escapeHTML(currentUser.username)}</div>
          <button class="dropdown-item" onclick="openUserOrdersModal(); closeMobileDrawer();" style="padding: 0.4rem 0;"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg> Mis Órdenes</button>
          <button class="dropdown-item" onclick="openUserSettingsModal(); closeMobileDrawer();" style="padding: 0.4rem 0;"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg> Opciones de Cuenta</button>
          <button class="dropdown-item danger" onclick="handleLogout(); closeMobileDrawer();" style="padding: 0.4rem 0;"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg> Cerrar Sesión</button>
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

  if (typeof window.initAdminQuickGearButton === 'function') {
    window.initAdminQuickGearButton();
  }
  renderGlobalAdminGear();
}

async function handleLogout() {
  try {
    if (localStorage.getItem('userToken')) {
      await originalFetch('/api/auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } });
    }
  } catch (e) {}
  currentUser = null;
  localStorage.removeItem('zonaswitch_user');
  localStorage.removeItem('userToken');
  initUserSession();
  showToast('Has cerrado sesión correctamente.');
}

function toggleFavoriteGame(gameId, event) {
  if (event) { event.preventDefault(); event.stopPropagation(); }
  const id = Number(gameId);
  if (favoriteGameIds.has(id)) favoriteGameIds.delete(id); else favoriteGameIds.add(id);
  localStorage.setItem('zonaswitch_favorites', JSON.stringify([...favoriteGameIds]));
  renderCatalog();
  // Micro-pop del corazón (Apple: escala con overshoot al tocar)
  const heartBtn = document.querySelector(`.favorite-game-btn[data-fav-id="${id}"]`);
  if (heartBtn) {
    heartBtn.classList.remove('heart-pop');
    void heartBtn.offsetWidth;
    heartBtn.classList.add('heart-pop');
  }
  showToast(favoriteGameIds.has(id) ? '❤️ Agregado a favoritos' : '🤍 Eliminado de favoritos');
}

function isGameInFavorites(gameId) { return favoriteGameIds.has(Number(gameId)); }



function ensureRecoveryUi() {
  const loginForm=document.getElementById('login-form'); if(!loginForm || document.getElementById('forgot-password-link')) return;
  const link=document.createElement('button'); link.type='button'; link.id='forgot-password-link'; link.textContent='¿Olvidaste tu contraseña?'; link.style.cssText='display:block;margin:.6rem auto 0;background:none;border:0;color:var(--joycon-cyan,#00f0ff);cursor:pointer;font-weight:700;';
  loginForm.appendChild(link); link.addEventListener('click', openRecoveryModal);
}
function openRecoveryModal() {
  let m=document.getElementById('recovery-modal'); if(!m){ m=document.createElement('div'); m.id='recovery-modal'; m.className='modal-backdrop active'; document.body.appendChild(m); }
  m.innerHTML=`<div class="auth-modal-card"><button class="modal-close-x" onclick="document.getElementById('recovery-modal').remove()">&times;</button><div class="auth-modal-header"><div class="otp-badge-icon"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div><h3>Recuperar contraseña</h3><p>Te enviaremos un código de 6 dígitos.</p></div><form id="recovery-form" class="auth-form"><div class="form-group"><label>Correo</label><input id="recovery-email" type="email" required></div><div class="auth-error-msg" id="recovery-error"></div><button class="auth-submit-btn" type="submit">Enviar código</button></form></div>`;
  document.getElementById('recovery-form').onsubmit=async e=>{e.preventDefault(); const email=document.getElementById('recovery-email').value.trim(); const err=document.getElementById('recovery-error'); const r=await originalFetch('/api/auth/forgot-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})}); const d=await r.json(); if(!r.ok){err.textContent=d.error||'No se pudo enviar.';return;} document.getElementById('recovery-modal').remove(); openResetPasswordModal(email);};
}
function openResetPasswordModal(email) {
  const m=document.createElement('div'); m.id='reset-modal'; m.className='modal-backdrop active'; document.body.appendChild(m);
  m.innerHTML=`<div class="auth-modal-card"><button class="modal-close-x" onclick="document.getElementById('reset-modal').remove()">&times;</button><div class="auth-modal-header"><div class="otp-badge-icon"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg></div><h3>Restablecer contraseña</h3><p>Ingresa el código recibido y una nueva contraseña.</p></div><form id="reset-form" class="auth-form"><div class="form-group"><label>Código</label><input id="reset-code" maxlength="6" required></div><div class="form-group"><label>Nueva contraseña</label><input id="reset-password" type="password" minlength="6" required></div><div class="auth-error-msg" id="reset-error"></div><button class="auth-submit-btn">Cambiar contraseña</button></form></div>`;
  document.getElementById('reset-form').onsubmit=async e=>{e.preventDefault(); const code=document.getElementById('reset-code').value.trim(); const newPassword=document.getElementById('reset-password').value; const r=await originalFetch('/api/auth/reset-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,code,newPassword})}); const d=await r.json(); if(!r.ok){document.getElementById('reset-error').textContent=d.error||'No se pudo restablecer.';return;} m.remove(); openLoginModal(); showToast('Contraseña restablecida correctamente.');};
}
function ensureAccountDeleteUi(){
  const form=document.getElementById('tab-password');
  if(!form || document.getElementById('delete-account-zone')) return;
  const box=document.createElement('div');
  box.id='delete-account-zone';
  box.className='delete-account-zone';
  box.innerHTML=`<div class=\"delete-account-title\">Eliminar mi cuenta</div><p>Esta acción es permanente.</p><button type=\"button\" class=\"delete-account-btn\" onclick=\"deleteMyAccount()\">Eliminar cuenta</button>`;
  form.appendChild(box);
}
async function deleteMyAccount(){ if(!confirm('¿Seguro que quieres eliminar tu cuenta?')) return; const password=prompt('Escribe tu contraseña actual para confirmar:'); if(!password) return; try{const r=await apiFetch('/api/user/account',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({currentPassword:password})}); const d=await r.json(); if(!r.ok){showToast(d.error||'No se pudo eliminar la cuenta.');return;} localStorage.removeItem('userToken');localStorage.removeItem('zonaswitch_user');currentUser=null;initUserSession();closeUserSettingsModal();showToast('Cuenta eliminada correctamente.');}catch(e){showToast('Error de conexión.');}}
function ensureAdminOrdersUi(){
  // Guard de rol SIN efectos secundarios: verifyAdminSecurity() aquí disparaba
  // triggerSecurityViolation() (toast + logout) para todo visitante no-admin
  // en cada carga de página.
  if (!currentUser || currentUser.role !== 'admin') return;
  const tabs=document.querySelector('.admin-subtabs'); const games=document.getElementById('admin-view-games'); if(!tabs||!games||document.getElementById('btn-subtab-orders')) return;
  const b=document.createElement('button'); b.type='button'; b.className='tab-btn'; b.id='btn-subtab-orders'; b.textContent='Pedidos'; b.onclick=()=>switchAdminSubtab('orders'); tabs.appendChild(b);
  const view=document.createElement('div'); view.id='admin-view-orders'; view.style.display='none'; view.innerHTML=`<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:.75rem"><input id="admin-order-search" class="admin-search-input" placeholder="Código, email o usuario" style="flex:1"><select id="admin-order-status" style="min-width:160px;background:var(--bg-dark);color:#fff;border:1px solid var(--border-subtle);padding:.6rem;border-radius:8px"><option value="">Todos los estados</option><option>pendiente</option><option>pagada</option><option>rechazada</option><option>cancelada</option><option>reembolsada</option></select><button type="button" class="auth-submit-btn" style="width:auto" onclick="fetchAdminOrders()">Actualizar</button></div><div id="admin-orders-container" class="admin-games-container"></div>`; games.parentElement.insertBefore(view, games.nextSibling); document.getElementById('admin-order-search').addEventListener('input', fetchAdminOrders); document.getElementById('admin-order-status').addEventListener('change', fetchAdminOrders);
}
async function fetchAdminOrders(){ if(!verifyAdminSecurity()) return; const q=document.getElementById('admin-order-search')?.value.trim()||''; const status=document.getElementById('admin-order-status')?.value||''; const c=document.getElementById('admin-orders-container'); if(!c)return; c.innerHTML='<p style=\"text-align:center;color:var(--text-muted)\">Cargando...</p>'; try{const r=await apiFetch(`/api/admin/orders?q=${encodeURIComponent(q)}&status=${encodeURIComponent(status)}`);const d=await r.json(); if(!r.ok)throw new Error(d.error); c.innerHTML=(d||[]).map(o=>`<div class=\"admin-game-row\"><div class=\"admin-game-info\"><div class=\"admin-game-details\"><strong class=\"admin-game-title\">${escapeHTML(o.codigoOrden)}</strong><span class=\"admin-game-sub\">${escapeHTML(o.emailCompleto||o.usuario||'')} · ${escapeHTML(o.estado||'')}</span><span class=\"admin-game-sub\">${escapeHTML(o.totalFormatted||formatCLP(o.total))} · ${escapeHTML(o.deliveryStatus||'')}</span></div></div><div class=\"admin-game-actions\"><button type=\"button\" class=\"admin-icon-btn\" onclick=\"showAdminOrderDetail('${escapeHTML(o.codigoOrden)}')\" title=\"Ver detalle\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\"></path><circle cx=\"12\" cy=\"12\" r=\"3\"></circle></svg></button><button type=\"button\" class=\"admin-icon-btn\" onclick=\"resendAdminDelivery('${escapeHTML(o.codigoOrden)}')\" title=\"Reenviar entrega\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m22 2-7 20-4-9-9-4Z\"></path><path d=\"M22 2 11 13\"></path></svg></button>${['pendiente','rechazada','cancelada'].includes(o.estado)?`<button type=\"button\" class=\"admin-icon-btn\" onclick=\"retryAdminPayment('${escapeHTML(o.codigoOrden)}','${escapeHTML(o.emailCompleto||'')}')\" title=\"Reintentar pago\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\"></path><path d=\"M21 3v5h-5\"></path><path d=\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\"></path><path d=\"M8 16H3v5\"></path></svg></button>`:''}<button type=\"button\" class=\"admin-icon-btn\" onclick=\"cancelAdminOrder('${escapeHTML(o.codigoOrden)}')\" title=\"Cancelar orden\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M18 6 6 18\"></path><path d=\"m6 6 12 12\"></path></svg></button><button type=\"button\" class=\"admin-icon-btn\" onclick=\"refundAdminOrder('${escapeHTML(o.codigoOrden)}')\" title=\"Reembolsar\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M9 14 4 9l5-5\"></path><path d=\"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11\"></path></svg></button></div></div>`).join('') || '<p>No hay pedidos.</p>'; }catch(e){c.innerHTML='<p style=\"color:#f87171\">No se pudieron cargar los pedidos.</p>';}}
async function showAdminOrderDetail(code){ const r=await apiFetch(`/api/admin/orders/${encodeURIComponent(code)}`); const d=await r.json(); if(!r.ok)return showToast(d.error||'Error'); const items=(d.carrito||[]).map(i=>`<li>${escapeHTML(i.titulo)} (${escapeHTML(i.licencia)}) x${i.cantidad}${i.varianteAsignada?`<br><code>${escapeHTML(i.varianteAsignada)}</code>`:''}</li>`).join(''); const hist=(d.history||[]).map(h=>`<li><b>${escapeHTML(h.type)}</b> — ${escapeHTML(h.detail||'')} <small>${escapeHTML(h.at||'')}</small></li>`).join(''); showSimpleModal(`Orden ${escapeHTML(d.codigoOrden)}`,`<p><b>Cliente:</b> ${escapeHTML(d.clienteCompleto||d.cliente||'')}</p><p><b>Email:</b> ${escapeHTML(d.emailCompleto||'')}</p><p><b>Estado:</b> ${escapeHTML(d.estado||'')}</p><p><b>Entrega:</b> ${escapeHTML(d.deliveryStatus||'')}</p><p><b>Total:</b> ${escapeHTML(d.totalFormatted||formatCLP(d.total))}</p><h4>Productos</h4><ul>${items}</ul><h4>Historial</h4><ul>${hist||'<li>Sin historial</li>'}</ul>`);}
async function resendAdminDelivery(code){ const r=await apiFetch(`/api/admin/orders/${encodeURIComponent(code)}/resend-delivery`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({})});const d=await r.json();showToast(r.ok?'📩 Entrega reenviada.':(d.error||'No se pudo reenviar.')); if(r.ok)fetchAdminOrders(); }
async function retryAdminPayment(code, email){ const r=await apiFetch(`/api/orders/${encodeURIComponent(code)}/retry-payment`,{method:'POST',body:JSON.stringify({email:email||''}),headers:{'Content-Type':'application/json'}});const d=await r.json();if(!r.ok)return showToast(d.error||'No se pudo reintentar.');if(d.redirectUrl)window.location.href=d.redirectUrl; }
async function cancelAdminOrder(code){ const reason=prompt('Motivo de la cancelación:','Cancelada por administración');if(reason===null)return;const r=await apiFetch(`/api/admin/orders/${encodeURIComponent(code)}/cancel`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({reason})});const d=await r.json();showToast(r.ok?'✖️ Orden cancelada.':(d.error||'No se pudo cancelar.'));if(r.ok)fetchAdminOrders();}
async function refundAdminOrder(code){ const reason=prompt('Motivo del reembolso/cancelación:','Gestionado por administración');if(reason===null)return;const r=await apiFetch(`/api/admin/orders/${encodeURIComponent(code)}/refund`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({reason})});const d=await r.json();showToast(r.ok?'↩️ Reembolso registrado.':(d.error||'No se pudo registrar.'));if(r.ok)fetchAdminOrders(); }
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
    ruleLen.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg> Mínimo 6 caracteres completado';
  } else {
    ruleLen.className = 'rule-item invalid';
    ruleLen.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg> Mínimo 6 letras / caracteres';
  }

  if (isNumValid) {
    ruleNum.className = 'rule-item valid';
    ruleNum.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg> Al menos 1 número completado';
  } else {
    ruleNum.className = 'rule-item invalid';
    ruleNum.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg> Al menos 1 número';
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
    if (data.token) localStorage.setItem('userToken', data.token);
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
    if (data.token) localStorage.setItem('userToken', data.token);
    initUserSession();
    closeLoginModal();
    document.getElementById('login-form').reset();
    showToast(`¡Hola de nuevo, ${currentUser.username}!`);
  } catch (err) {
    errorMsg.textContent = 'Error de comunicación con el servidor.';
  }
}

// Los modales de auth (login/registro/ajustes) están SIEMPRE en el DOM con sus
// campos de autofill. Si quedan como type="password" o con hints de autocomplete
// al cargar la página, los gestores de contraseñas (incl. iCloud Passwords)
// ofrecen autofill aunque no haya pantalla de login. En reposo todos los campos
// quedan inertes (type="text", autocomplete="off", forms sin hint) y se activan
// solo mientras su modal está abierto. Un MutationObserver cubre TODAS las vías
// de apertura/cierre (botones, ESC, clicks en el backdrop, subtabs).
const AUTH_AUTOFILL_FIELDS = {
  'login-password': { type: 'password', hint: 'current-password' },
  'register-password': { type: 'password', hint: 'new-password' },
  'username-current-password': { type: 'password', hint: 'current-password' },
  'email-current-password': { type: 'password', hint: 'current-password' },
  'new-password-input': { type: 'password', hint: 'new-password' },
  'login-username': { type: 'text', hint: 'username' },
  'register-username': { type: 'text', hint: 'username' },
  'register-email': { type: 'text', hint: 'email' },
  'new-username-input': { type: 'text', hint: 'username' },
  'new-email-input': { type: 'text', hint: 'email' }
};
const AUTH_MODAL_IDS = ['login-modal-backdrop', 'register-modal-backdrop', 'user-settings-modal-backdrop'];
const AUTH_FORM_IDS = ['login-form', 'register-form', 'tab-username', 'tab-email', 'tab-password'];

function syncAuthPasswordFields() {
  const anyOpen = AUTH_MODAL_IDS.some(id => {
    const b = document.getElementById(id);
    return b && b.classList.contains('active');
  });
  for (const [id, cfg] of Object.entries(AUTH_AUTOFILL_FIELDS)) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (anyOpen) {
      if (el.type !== cfg.type) el.type = cfg.type;
      el.autocomplete = cfg.hint;
    } else {
      el.type = 'text';
      el.autocomplete = 'off';
    }
  }
  AUTH_FORM_IDS.forEach(id => {
    const f = document.getElementById(id);
    if (f) f.autocomplete = anyOpen ? 'on' : 'off';
  });
}

function initAuthPasswordFieldsObserver() {
  syncAuthPasswordFields();
  const mo = new MutationObserver(() => syncAuthPasswordFields());
  AUTH_MODAL_IDS.forEach(id => {
    const b = document.getElementById(id);
    if (b) mo.observe(b, { attributes: true, attributeFilter: ['class'] });
  });
}

function openLoginModal() { document.getElementById('login-modal-backdrop').classList.add('active'); }
function closeLoginModal() { document.getElementById('login-modal-backdrop').classList.remove('active'); }
function openRegisterModal() {
  document.getElementById('register-modal-backdrop').classList.add('active');
  validateRegisterPasswordForm();
}
function closeRegisterModal() { document.getElementById('register-modal-backdrop').classList.remove('active'); }

// --- CATÁLOGO DE JUEGOS CON RETROCESO EXPONENCIAL Y LÍMITE DE REINTENTOS (Problema 7) ---
let isFetchingCatalog = false;
let catalogFirstRender = true; // true: primera carga con stagger elegante; luego re-renders rápidos
let catalogLoaded = false;     // true: el catálogo mostrado está listo (servidor o fallback local)
let lastCatalogFetchAt = 0;    // cooldown anti-race: evita que el auto-refresh pise la carga inicial

async function fetchCatalog(retries = 3, baseDelay = 1000) {
  if (isFetchingCatalog) return;
  isFetchingCatalog = true;

  let attempt = 0;
  let success = false;

  while (attempt < retries && !success) {
    try {
      const res = await apiFetch('/api/juegos');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        catalog = data;
        catalogLoaded = true;
        success = true;
      } else {
        throw new Error('Respuesta de catálogo vacía');
      }
    } catch (err) {
      attempt++;
      console.warn(`⚠️ [fetchCatalog] Intento ${attempt}/${retries} falló:`, err.message || err);
      if (attempt < retries) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  if (!success && (!Array.isArray(catalog) || catalog.length === 0)) {
    console.warn('⚠️ Se agotaron los reintentos de red. Cargando catálogo por defecto.');
    catalog = [...DEFAULT_GAMES_FRONTEND];
    catalogLoaded = true;
  }

  isFetchingCatalog = false;
  lastCatalogFetchAt = Date.now();
  renderCatalog();
  // Re-sincronizar el tope del rango de precio con el catálogo real cargado
  // (initFilters en DOMContentLoaded se ejecuta antes de que llegue la API)
  try { initFilters(); } catch (e) { console.error('Error initFilters:', e); }
}

// --- VISTA DEL CATÁLOGO: DENSIDAD DEL MOSAICO (0-4) Y MODO LISTA (persistente) ---
const GRID_VIEW_STORAGE_KEY = 'zonaswitch_gridview';
let gridViewDensity = 2;
let gridViewList = false;

function loadGridViewPref() {
  try {
    const raw = localStorage.getItem(GRID_VIEW_STORAGE_KEY);
    if (!raw) return;
    const pref = JSON.parse(raw);
    // Migración: rango nuevo 1-4 (la antigua densidad 0 se sube a 1)
    if (Number.isInteger(pref.density)) gridViewDensity = Math.min(4, Math.max(1, pref.density));
    if (typeof pref.list === 'boolean') gridViewList = pref.list;
  } catch (e) {}
}

function saveGridViewPref() {
  try {
    localStorage.setItem(GRID_VIEW_STORAGE_KEY, JSON.stringify({ density: gridViewDensity, list: gridViewList }));
  } catch (e) {}
}

function applyGridViewClasses() {
  const grid = document.getElementById('games-grid');
  if (!grid) return;
  grid.classList.remove('density-1', 'density-2', 'density-3', 'density-4', 'mode-list');
  grid.classList.add('density-' + gridViewDensity);
  grid.classList.toggle('mode-list', gridViewList);
}

function initGridViewControls() {
  const slider = document.getElementById('grid-density-slider');
  const viewToggle = document.getElementById('grid-view-toggle');
  if (!slider && !viewToggle) return;

  loadGridViewPref();
  applyGridViewClasses();

  if (slider) {
    slider.value = String(gridViewDensity);
    slider.disabled = gridViewList;
    slider.addEventListener('input', () => {
      gridViewDensity = Number(slider.value);
      applyGridViewClasses();
    });
    slider.addEventListener('change', saveGridViewPref);
  }

  if (viewToggle) {
    const btnGrid = viewToggle.querySelector('[data-view="grid"]');
    const btnList = viewToggle.querySelector('[data-view="list"]');
    const syncToggle = () => {
      if (btnGrid) {
        btnGrid.classList.toggle('active', !gridViewList);
        btnGrid.setAttribute('aria-pressed', String(!gridViewList));
      }
      if (btnList) {
        btnList.classList.toggle('active', gridViewList);
        btnList.setAttribute('aria-pressed', String(gridViewList));
      }
      if (slider) slider.disabled = gridViewList;
    };
    if (btnGrid) btnGrid.addEventListener('click', () => {
      gridViewList = false;
      applyGridViewClasses();
      saveGridViewPref();
      syncToggle();
    });
    if (btnList) btnList.addEventListener('click', () => {
      gridViewList = true;
      applyGridViewClasses();
      saveGridViewPref();
      syncToggle();
    });
    syncToggle();
  }
}

// --- SISTEMA DE FILTROS DEL CATÁLOGO (PRECIO, ORDEN, LICENCIA) ---
function initFilters() {
  const minEl = document.getElementById('filter-price-min');
  const maxEl = document.getElementById('filter-price-max');
  if (!minEl && !maxEl) return;
  const rangeMax = Math.max(10000, Math.ceil(catalog.reduce((m, g) => Math.max(m, Number(g && g.precioSecundaria) || 0, Number(g && g.precioPrimaria) || 0), 0) / 500) * 500);
  if (minEl) {
    minEl.max = rangeMax;
    const valEl = document.getElementById('filter-price-min-val');
    if (valEl) { valEl.max = rangeMax; valEl.value = minEl.value; }
  }
  if (maxEl) {
    maxEl.max = rangeMax;
    maxEl.value = rangeMax;
    const valEl = document.getElementById('filter-price-max-val');
    if (valEl) { valEl.max = rangeMax; valEl.value = rangeMax; }
  }
}

// Sincroniza los campos numéricos de precio con los sliders (valores crudos en CLP)
function updateFilterPriceLabels() {
  const minEl = document.getElementById('filter-price-min');
  const maxEl = document.getElementById('filter-price-max');
  const minVal = document.getElementById('filter-price-min-val');
  const maxVal = document.getElementById('filter-price-max-val');
  if (minEl && minVal) minVal.value = minEl.value;
  if (maxEl && maxVal) maxVal.value = maxEl.value;
}

function applyFilters() {
  const minEl = document.getElementById('filter-price-min');
  const maxEl = document.getElementById('filter-price-max');
  const sortEl = document.getElementById('filter-sort');
  const licEl = document.getElementById('filter-license');
  const inStockEl = document.getElementById('filter-in-stock');

  // Mantener el tope del rango alineado con el precio máximo real del catálogo
  // (considera precioSecundaria Y precioPrimaria, que llega hasta $50.000)
  if (minEl || maxEl) {
    const rangeMax = Math.max(10000, Math.ceil(catalog.reduce((m, g) => Math.max(m, Number(g && g.precioSecundaria) || 0, Number(g && g.precioPrimaria) || 0), 0) / 500) * 500);
    if (minEl) minEl.max = rangeMax;
    if (maxEl && Number(maxEl.value) >= Number(maxEl.max)) {
      maxEl.max = rangeMax;
      maxEl.value = rangeMax;
      const valEl = document.getElementById('filter-price-max-val');
      if (valEl) { valEl.max = rangeMax; valEl.value = rangeMax; }
    }
  }

  filterState.priceMin = minEl && Number(minEl.value) > 0 ? Number(minEl.value) : null;
  filterState.priceMax = maxEl ? Number(maxEl.value) : null;
  filterState.sort = sortEl ? sortEl.value : '';
  filterState.license = licEl ? licEl.value : '';
  filterState.inStockOnly = !!(inStockEl && inStockEl.checked);
  renderCatalog();
}

function resetFilters() {
  const minEl = document.getElementById('filter-price-min');
  const maxEl = document.getElementById('filter-price-max');
  const sortEl = document.getElementById('filter-sort');
  const licEl = document.getElementById('filter-license');
  const inStockEl = document.getElementById('filter-in-stock');
  if (minEl) {
    minEl.value = minEl.min || '0';
    const valEl = document.getElementById('filter-price-min-val');
    if (valEl) valEl.value = minEl.value;
  }
  if (maxEl) {
    maxEl.value = maxEl.max;
    const valEl = document.getElementById('filter-price-max-val');
    if (valEl) valEl.value = maxEl.value;
  }
  if (sortEl) sortEl.value = '';
  if (licEl) licEl.value = '';
  if (inStockEl) inStockEl.checked = false;

  // Limpiar también búsqueda y categoría para un reinicio completo
  searchQuery = '';
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  activeCategory = 'todos';
  document.querySelectorAll('#category-pills .pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === 'todos');
  });

  applyFilters();
}

function renderCatalog(animatePrices = false, fast = true) {
  const grid = document.getElementById('games-grid');
  const countLabel = document.getElementById('games-count');
  if (!grid) return;

  // Asegurar la vista guardada (densidad/modo lista) en cada render
  applyGridViewClasses();

  if (!Array.isArray(catalog) || catalog.length === 0) {
    catalog = [...DEFAULT_GAMES_FRONTEND];
  }

  // Choreografía de entrada: el stagger aplica solo a la primera carga con
  // datos reales del servidor y a las sincronizaciones de fondo (fast=false);
  // los re-renders de interacción (filtros, búsqueda) entran rápido sin escalonado
  if (catalogFirstRender && catalogLoaded) {
    catalogFirstRender = false;
    grid.classList.remove('grid-rerender');
  } else if (fast) {
    grid.classList.add('grid-rerender');
  } else {
    grid.classList.remove('grid-rerender');
  }

  const filtered = catalog.filter(game => {
    if (!game) return false;
    const title = (game.titulo || '').toLowerCase();
    const category = (game.categoria || '').toLowerCase();
    const q = (searchQuery || '').toLowerCase();
    const matchCategory = activeCategory === 'todos' || activeCategory === 'favoritos' || game.categoria === activeCategory;
    const matchSearch = title.includes(q) || category.includes(q);

    // Vista "Favoritos": solo juegos con el corazón marcado (favoritos no es una categoría real)
    const matchFav = activeCategory !== 'favoritos' || favoriteGameIds.has(Number(game.id));

    // Precios y disponibilidad reales por tipo de cuenta
    const secPrice = Number(game.precioSecundaria) || 0;
    const primPrice = Number(game.precioPrimaria) || 0;
    const secAvail = !(Number.isInteger(game.stockSecundaria) && game.stockSecundaria <= 0);
    const primAvail = !(Number.isInteger(game.stockPrimaria) && game.stockPrimaria <= 0);

    // Filtro por tipo de licencia
    let matchLicense = true;
    if (filterState.license === 'secundaria') matchLicense = secAvail;
    else if (filterState.license === 'primaria') matchLicense = primAvail;
    else if (filterState.license === 'ambas') matchLicense = secAvail || primAvail;

    // El precio a comparar depende del tipo seleccionado; con "Todas" se usa
    // el menor de los dos (el precio "Desde" que se muestra en la tarjeta)
    const filterPrice = filterState.license === 'secundaria' ? secPrice
      : filterState.license === 'primaria' ? primPrice
      : (secPrice && primPrice ? Math.min(secPrice, primPrice) : (secPrice || primPrice));

    const matchPrice = (filterState.priceMin == null || filterPrice >= filterState.priceMin) &&
                       (filterState.priceMax == null || filterPrice <= filterState.priceMax);

    // Ocultar juegos totalmente agotados (ambos stocks en 0)
    const matchInStock = !filterState.inStockOnly || secAvail || primAvail;

    return matchCategory && matchSearch && matchFav && matchPrice && matchLicense && matchInStock;
  });

  // Ordenamiento elegido por el usuario (nunca modifica el catálogo original)
  if (filterState.sort) {
    filtered.sort((a, b) => {
      if (filterState.sort === 'precio-asc') return (Number(a.precioSecundaria) || 0) - (Number(b.precioSecundaria) || 0);
      if (filterState.sort === 'precio-desc') return (Number(b.precioSecundaria) || 0) - (Number(a.precioSecundaria) || 0);
      const ta = (a.titulo || '').toLowerCase();
      const tb = (b.titulo || '').toLowerCase();
      return filterState.sort === 'nombre-asc' ? ta.localeCompare(tb, 'es') : tb.localeCompare(ta, 'es');
    });
  }

  if (countLabel) {
    countLabel.textContent = `${filtered.length} juego(s) disponible(s)`;
  }

  if (filtered.length === 0) {
    const isFavView = activeCategory === 'favoritos';
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">${isFavView
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>'
          : '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>'}</div>
        <h3>${isFavView ? 'Aún no tienes juegos favoritos' : 'No se encontraron juegos'}</h3>
        ${isFavView ? '<p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">Toca el corazón en una tarjeta para guardarlos.</p>' : ''}
      </div>
    `;
    return;
  }

  const savedUser = JSON.parse(localStorage.getItem('zonaswitch_user')) || currentUser;
  const isAdmin = savedUser && savedUser.role === 'admin';

  grid.innerHTML = filtered.map((game) => {
    const slug = slugify(game.titulo || '');
    const targetUrl = `/juego?id=${game.id}&slug=${encodeURIComponent(slug)}`;
    const origPrice = Number(game.precioOriginal) || (Number(game.precioSecundaria) * 1.5);
    return `
    <a href="${targetUrl}" class="game-card in-view" data-id="${game.id}" onclick="openGameModal(${game.id}); return false;">
      <div class="card-media">
        <img src="${escapeHTML(game.imagen || '')}" alt="${escapeHTML(game.titulo || '')}" loading="lazy" onload="this.classList.add('loaded')" onerror="this.classList.remove('loaded')">
        <span class="card-tag">${escapeHTML(game.categoria || 'Nintendo')}</span>
        <button type="button" class="favorite-game-btn" onclick="toggleFavoriteGame(${game.id}, event)" data-fav-id="${game.id}" title="${isGameInFavorites(game.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}" style="position:absolute;right:.7rem;top:.7rem;z-index:4;background:rgba(0,0,0,.65);border:1px solid rgba(255,255,255,.15);color:#fff;border-radius:999px;width:36px;height:36px;cursor:pointer;display:flex;align-items:center;justify-content:center;">${isGameInFavorites(game.id)
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>'
          : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>'}</button>
        ${isAdmin ? `<button type="button" class="card-admin-gear" onclick="event.preventDefault(); event.stopPropagation(); openGameEditModal(${game.id});" title="Editar juego en tiempo real (Admin)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>` : ''}
      </div>
      <div class="card-content">
        <h3 class="card-title">${escapeHTML(game.titulo || '')}</h3>
        <p class="card-desc">${escapeHTML(game.descripcion || '')}</p>
        <div class="card-license-hint">
          <div class="card-license-option ${Number.isInteger(game.stockSecundaria) && game.stockSecundaria <= 0 ? 'out-of-stock' : 'in-stock'}">
            <span class="license-name"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="6" x2="10" y1="11" y2="11"></line><line x1="8" x2="8" y1="9" y2="13"></line><line x1="15" x2="15.01" y1="12" y2="12"></line><line x1="18" x2="18.01" y1="10" y2="10"></line><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"></path></svg> Secundaria</span>
            <span class="license-price">${formatCLP(game.precioSecundaria)}</span>
            <span class="license-stock">${Number.isInteger(game.stockSecundaria) ? (game.stockSecundaria <= 0 ? '⛔ Fuera de Stock' : `✅ ${game.stockSecundaria} disponibles`) : '✅ Disponible'}</span>
          </div>
          <div class="card-license-option ${Number.isInteger(game.stockPrimaria) && game.stockPrimaria <= 0 ? 'out-of-stock' : 'in-stock'}">
            <span class="license-name"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="6" x2="10" y1="11" y2="11"></line><line x1="8" x2="8" y1="9" y2="13"></line><line x1="15" x2="15.01" y1="12" y2="12"></line><line x1="18" x2="18.01" y1="10" y2="10"></line><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"></path></svg> Primaria</span>
            <span class="license-price">${formatCLP(game.precioPrimaria)}</span>
            <span class="license-stock">${Number.isInteger(game.stockPrimaria) ? (game.stockPrimaria <= 0 ? '⛔ Fuera de Stock' : `✅ ${game.stockPrimaria} disponibles`) : '✅ Disponible'}</span>
          </div>
        </div>
        <div class="card-footer">
          <div class="price-container">
            <span class="original-price">${formatCLP(origPrice)}</span>
            <span class="current-price"><small style="font-size: 0.75em; font-weight: 600; opacity: 0.85; margin-right: 3px;">Desde</small> ${formatCLP(game.precioSecundaria)}</span>
          </div>
          <span class="buy-card-btn" onclick="openGameModal(${game.id}); event.stopPropagation();">
            Ver Detalles
          </span>
        </div>
      </div>
    </a>
  `;
  }).join('');

  document.querySelectorAll('.game-card').forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'none';
  });

  if (animatePrices) {
    document.querySelectorAll('.game-card .current-price').forEach(el => {
      el.classList.remove('price-anim-pop');
      void el.offsetWidth;
      el.classList.add('price-anim-pop');
    });
  }
}

// Actualiza SOLO los precios visibles (tasas de cambio) sin re-renderizar el
// grid: evita que la sincronización de fondo repita la animación de entrada
function refreshCatalogPricesInPlace() {
  document.querySelectorAll('.game-card[data-id]').forEach(card => {
    const g = catalog.find(x => x && String(x.id) === card.dataset.id);
    if (!g) return;
    const orig = Number(g.precioOriginal) || (Number(g.precioSecundaria) * 1.5);
    const priceEls = card.querySelectorAll('.license-price');
    if (priceEls[0]) priceEls[0].textContent = formatCLP(g.precioSecundaria);
    if (priceEls[1]) priceEls[1].textContent = formatCLP(g.precioPrimaria);
    const cur = card.querySelector('.current-price');
    if (cur) cur.innerHTML = `<small style="font-size: 0.75em; font-weight: 600; opacity: 0.85; margin-right: 3px;">Desde</small> ${formatCLP(g.precioSecundaria)}`;
    const origEl = card.querySelector('.original-price');
    if (origEl) origEl.textContent = formatCLP(orig);
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

function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// --- NAVEGACIÓN A LA VISTA DEDICADA DE DETALLE DEL JUEGO (PRO LEVEL / CLEAN URL SEO) ---
function openGameModal(gameId) {
  const game = Array.isArray(catalog) ? catalog.find(g => Number(g.id) === Number(gameId)) : null;
  if (game && game.titulo) {
    const slug = slugify(game.titulo);
    window.location.href = `/juego?id=${gameId}&slug=${encodeURIComponent(slug)}`;
  } else {
    window.location.href = `/juego?id=${gameId}`;
  }
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
  if (infoBox) {
    infoBox.innerHTML = `
      <ul class="license-bullets">
        ${bullets.map(b => `<li>${b}</li>`).join('')}
      </ul>
    `;
  }

  const addBtn = document.getElementById('gmodal-add-btn');
  const buyBtn = document.getElementById('gmodal-buy-btn');
  if (addBtn) addBtn.disabled = false;
  if (buyBtn) buyBtn.disabled = false;

  const targetPriceId = selectedLicenseType === 'secundaria' ? 'gmodal-price-sec' : 'gmodal-price-prim';
  const priceElem = document.getElementById(targetPriceId);
  if (priceElem) {
    priceElem.classList.remove('price-anim-pop');
    void priceElem.offsetWidth;
    priceElem.classList.add('price-anim-pop');
  }
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
  openPaymentModal();
}

function addGameWithLicenseToCart(game, licenseType) {
  const normalizedLicense = String(licenseType || '').trim().toLowerCase();
  if (normalizedLicense !== 'primaria' && normalizedLicense !== 'secundaria') {
    showToast('⚠️ Tipo de licencia inválido.');
    return;
  }
  const isPrimaria = normalizedLicense === 'primaria';
  const price = isPrimaria ? game.precioPrimaria : game.precioSecundaria;
  const accountTitle = isPrimaria ? 'Primaria' : 'Secundaria';
  const stock = isPrimaria ? game.stockPrimaria : game.stockSecundaria;

  if (Number.isInteger(stock) && stock <= 0) {
    showToast(`⚠️ Cuenta ${accountTitle} fuera de stock.`);
    return;
  }

  const cartItemId = `${game.id}-${normalizedLicense}`;
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
      cantidad: 1,
      stockMax: Number.isInteger(stock) ? stock : null
    });
  }

  saveCart();
  updateCartBadge();
  showToast(`¡"${game.titulo}" (Cuenta ${accountTitle}) añadido al carrito!`);
}

// --- CARRITO ---
function saveCart() {
  localStorage.setItem('zonaswitch_cart_v4', JSON.stringify(cart));
}

function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  const drawerCount = document.getElementById('drawer-count');
  const totalCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  if (badge) {
    const changed = badge.textContent !== String(totalCount);
    badge.textContent = totalCount;
    // Micro-pop del contador al cambiar (Apple: rebote corto)
    if (changed && totalCount > 0) {
      badge.classList.remove('badge-pop');
      void badge.offsetWidth;
      badge.classList.add('badge-pop');
    }
  }
  if (drawerCount) drawerCount.textContent = totalCount;
}

function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return; // páginas sin carrito (ej: faq.html)
  renderCartDrawer();
  drawer.classList.add('active');
  const overlay = document.getElementById('drawer-overlay');
  if (overlay) overlay.classList.add('active');
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;
  drawer.classList.remove('active');
  const overlay = document.getElementById('drawer-overlay');
  if (overlay) overlay.classList.remove('active');
}

function renderCartDrawer() {
  const container = document.getElementById('cart-items-container');
  const checkoutWrapper = document.getElementById('checkout-wrapper');

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-view">
        <div class="empty-cart-icon"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg></div>
        <h4>Tu carrito está vacío</h4>
        <p style="font-size: 0.85rem;">Explora el catálogo y selecciona tu juego y tipo de cuenta.</p>
      </div>
    `;
    if (checkoutWrapper) checkoutWrapper.style.display = 'none';
    return;
  }

  if (checkoutWrapper) checkoutWrapper.style.display = 'block';

  let subtotal = 0;

  container.innerHTML = cart.map(item => {
    const itemSubtotal = item.precio * item.cantidad;
    subtotal += itemSubtotal;

    return `
      <div class="cart-item-card">
        <img class="cart-item-img" src="${escapeHTML(item.imagen)}" alt="${escapeHTML(item.titulo)}">
        <div class="cart-item-info">
          <div class="cart-item-title">${escapeHTML(item.titulo)}</div>
          <div class="cart-item-license-tag">${item.licencia}</div>
          <div class="cart-item-price">${formatCLP(item.precio)} c/u</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="changeQuantity('${item.cartItemId}', -1)">-</button>
            <span class="qty-val">${item.cantidad}</span>
            <button class="qty-btn" onclick="changeQuantity('${item.cartItemId}', 1)">+</button>
          </div>
        </div>
        <button class="remove-item-btn" onclick="removeFromCart('${item.cartItemId}')" aria-label="Eliminar del carrito">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
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

  const discountRows = document.querySelectorAll('#cart-discount-row, #drawer-discount-row');
  const discountVals = document.querySelectorAll('#summary-discount, #drawer-discount');
  discountRows.forEach(el => el.style.display = discount > 0 ? 'flex' : 'none');
  discountVals.forEach(el => el.textContent = `- ${formatCLP(discount)}`);

  const subtotalEls = document.querySelectorAll('#summary-subtotal, #drawer-subtotal');
  subtotalEls.forEach(el => el.textContent = formatCLP(subtotal));

  const totalEls = document.querySelectorAll('#summary-total, #drawer-total');
  totalEls.forEach(el => el.textContent = formatCLP(total));
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
    const res = await apiFetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, email, username, metodoPago, carrito: cart, couponCode: appliedCoupon ? appliedCoupon.code : null })
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

  if (orderCode || status) {
    // Limpiar query string de la URL sin recargar la página
    window.history.replaceState({}, document.title, window.location.pathname);

    if (status === '2' || status === 'approved') {
      if (orderCode) {
        try {
          const res = await apiFetch(`/api/orders/${orderCode}`);
          if (res.ok) {
            const order = await res.json();
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
            return;
          }
        } catch (err) {
          console.error('Error al consultar orden de retorno:', err);
        }
      }
      showToast('¡Pago completado con éxito! 🎉');
    } else if (status === '3' || status === '4' || status === 'cancelled' || status === 'failure' || status === 'rejected') {
      showPaymentCancelledModal();
    }
  }
}

function showPaymentCancelledModal() {
  let modal = document.getElementById('payment-cancelled-modal-backdrop');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'payment-cancelled-modal-backdrop';
    modal.className = 'modal-backdrop';
    modal.style.display = 'flex';
    modal.style.zIndex = '100000';
    modal.innerHTML = `
      <div class="modal-card" style="max-width: 440px; text-align: center; padding: 2.2rem 1.8rem; background: var(--bg-card, #111827); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.7); animation: modalFadeIn 0.3s cubic-bezier(0.32, 0.72, 0, 1);">
        <div style="font-size: 3.5rem; margin-bottom: 0.6rem; line-height: 1; display: flex; justify-content: center; color: #f87171;"><svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg></div>
        <h3 style="color: #f87171; font-size: 1.45rem; font-weight: 800; margin-bottom: 0.6rem;">Pago Cancelado</h3>
        <p style="color: var(--text-muted, #94a3b8); font-size: 0.95rem; line-height: 1.55; margin-bottom: 1.8rem;">
          La transacción en la pasarela de pago fue cancelada o no se pudo procesar. Tu carrito sigue guardado y no se ha realizado ningún cargo.
        </p>
        <div style="display: flex; flex-direction: column; gap: 0.8rem;">
          <button id="btn-cancel-retry-pay" style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border: none; padding: 0.9rem 1.2rem; border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.35); display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path></svg>
            Reintentar Pago
          </button>
          <button id="btn-cancel-go-home" style="background: rgba(255, 255, 255, 0.08); color: #cbd5e1; border: 1px solid rgba(255, 255, 255, 0.15); padding: 0.8rem 1.2rem; border-radius: 12px; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            Volver al Inicio
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('btn-cancel-go-home').addEventListener('click', () => {
      modal.style.display = 'none';
    });

    document.getElementById('btn-cancel-retry-pay').addEventListener('click', () => {
      modal.style.display = 'none';
      if (typeof openCartDrawer === 'function') {
        openCartDrawer();
      }
    });
  } else {
    modal.style.display = 'flex';
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
        <h5 style="color: var(--joycon-cyan); font-size: 0.9rem; font-weight: 800; margin-bottom: 0.6rem;">Datos de Acceso Entregados (Correo Digital):</h5>
        ${detalles.carrito.map(item => `
          <div style="background: rgba(15, 22, 36, 0.9); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.85rem; margin-bottom: 0.6rem;">
            <div style="font-weight: 800; color: #ffffff; font-size: 0.9rem;">${escapeHTML(item.titulo)} (${item.licencia})</div>
            ${item.correoTexto ? `<p style="font-size: 0.8rem; color: var(--text-muted); margin: 0.3rem 0;">${escapeHTML(item.correoTexto)}</p>` : ''}
            <div style="background: rgba(0, 240, 255, 0.08); border: 1px solid rgba(0, 240, 255, 0.3); padding: 0.6rem; border-radius: 6px; font-family: monospace; font-size: 0.85rem; color: var(--joycon-cyan); margin-top: 0.4rem; word-break: break-all; display: flex; align-items: flex-start; gap: 0.5rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0; margin-top: 2px;"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
              ${escapeHTML(item.varianteAsignada || 'Asignación automática enviada a tu correo')}
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

// --- ICONOS SVG PARA NOTIFICACIONES (reemplazan los emojis de prefijo) ---
const TOAST_ICON_SVGS = {
  'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path>',
  'alert-circle': '<circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line>',
  'x-circle': '<circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path>',
  'alert-triangle': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>',
  'info': '<circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path>',
  'heart': '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>',
  'shopping-cart': '<circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>',
  'package': '<path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path>',
  'mail': '<rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>',
  'search': '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>',
  'credit-card': '<rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line>',
  'ticket': '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2"></path>',
  'gamepad': '<line x1="6" x2="10" y1="11" y2="11"></line><line x1="8" x2="8" y1="9" y2="13"></line><line x1="15" x2="15.01" y1="12" y2="12"></line><line x1="18" x2="18.01" y1="10" y2="10"></line><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"></path>',
  'camera': '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle>',
  'lock': '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',
  'key': '<path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"></path>',
  'undo-2': '<path d="M9 14 4 9l5-5"></path><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"></path>',
  'send': '<path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path>'
};

const TOAST_EMOJI_ICONS = {
  '⛔': 'alert-circle', '❌': 'x-circle', '✖️': 'x-circle',
  '⚠️': 'alert-triangle', '⚠': 'alert-triangle',
  '✅': 'check-circle', '🎉': 'check-circle',
  '❤️': 'heart', '🤍': 'heart',
  '🛒': 'shopping-cart', '📦': 'package',
  '📩': 'mail', '📧': 'mail', '🔎': 'search', '🔍': 'search',
  '💳': 'credit-card', '🎟️': 'ticket',
  '🎮': 'gamepad', '📸': 'camera',
  '🔐': 'lock', '🔑': 'key',
  '↩️': 'undo-2', '✉️': 'send'
};

const TOAST_ICON_COLORS = {
  'check-circle': '#34d399',
  'alert-circle': '#f87171',
  'x-circle': '#f87171',
  'alert-triangle': '#fbbf24',
  'heart': '#ff4d6d',
  'undo-2': '#fbbf24',
  'info': '#00f0ff',
  'search': '#00f0ff',
  'lock': '#00f0ff',
  'key': '#00f0ff',
  'mail': '#00f0ff',
  'send': '#00f0ff',
  'credit-card': '#00f0ff',
  'shopping-cart': '#00f0ff',
  'package': '#00f0ff',
  'ticket': '#00f0ff',
  'gamepad': '#00f0ff',
  'camera': '#00f0ff'
};

function showToast(message, duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  // Detectar el emoji inicial/final del mensaje y elegir icono SVG (se quita el glifo)
  const emojiRe = /^([\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{21A9}\u{FE0F}]+)\s*/u;
  const trailingRe = /\s*([\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{21A9}\u{FE0F}]+)$/u;
  const raw = String(message);
  const prefixMatch = raw.match(emojiRe);
  const prefix = prefixMatch ? prefixMatch[1] : '';
  const clean = raw.replace(emojiRe, '').replace(trailingRe, '');
  const iconName = TOAST_EMOJI_ICONS[prefix] || (prefix.includes('⚠') ? 'alert-triangle' : 'info');
  const iconColor = TOAST_ICON_COLORS[iconName] || '#00f0ff';
  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${TOAST_ICON_SVGS[iconName]}</svg>`;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">${iconSvg}</span>
      <span class="toast-text">${escapeHTML(clean)}</span>
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
      toast.style.transition = 'transform 0.25s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.25s ease';
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
  toast.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 1, 1), opacity 0.2s ease';
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
            if (typeof renderCatalog === 'function') renderCatalog();

            // Sincronizar detalle de juego si el usuario está en la vista de detalle
            if (typeof currentDetailGame !== 'undefined' && currentDetailGame) {
              const updatedGame = catalog.find(g => Number(g.id) === Number(currentDetailGame.id));
              if (updatedGame) {
                currentDetailGame = updatedGame;
                if (typeof renderGameDetailView === 'function') {
                  renderGameDetailView();
                }
              }
            }

            // Sincronizar precios de los ítems en el carrito de compras
            if (Array.isArray(cart) && cart.length > 0) {
              cart.forEach(item => {
                const fresh = catalog.find(g => Number(g.id) === Number(item.id));
                if (fresh) {
                  item.precioSecundaria = fresh.precioSecundaria;
                  item.precioPrimaria = fresh.precioPrimaria;
                  item.precioOriginal = fresh.precioOriginal;
                  item.imagen = fresh.imagen;
                  item.titulo = fresh.titulo;
                }
              });
              saveCart();
              renderCartDrawer();
            }

            if (currentUser && currentUser.role === 'admin') {
              if (typeof fetchAndRenderAdminGames === 'function') {
                fetchAndRenderAdminGames();
              }
            }
          }
        } catch (e) { }
      };
    } catch (e) { }
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
    const res = await apiFetch('/api/coupons');
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
  } catch (e) { }
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
        <div style="font-size: 1.5rem; margin-right: 0.5rem; display: flex;"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2"></path></svg></div>
        <div class="admin-game-details">
          <span class="admin-game-title" style="color: var(--joycon-cyan); font-weight: 800;">${escapeHTML(c.code)}</span>
          <span class="admin-game-sub">${escapeHTML(c.desc || (c.type === 'percent' ? `${c.value}% OFF` : `$${c.value} CLP OFF`))}</span>
        </div>
      </div>
      <div class="admin-game-actions">
        <button type="button" class="remove-item-btn" onclick="deleteCoupon('${escapeHTML(c.code)}')" title="Eliminar cupón permanente" style="display: inline-flex; align-items: center; gap: 0.35rem; color: var(--text-muted);">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg> Eliminar
        </button>
      </div>
    </div>
  `).join('');
}

async function handleAdminAddCouponSubmit(e) {
  if (e) e.preventDefault();

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
    const res = await apiFetch('/api/admin/coupons/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, type, value, desc })
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
      saveBtn.textContent = 'Guardar Cupón Permanente';
    }
  }
}

async function deleteCoupon(code) {
  if (!verifyAdminSecurity()) return;
  if (!confirm(`¿Estás seguro de borrar permanentemente el cupón "${code}" de los datos?`)) return;

  try {
    const res = await apiFetch('/api/admin/coupons/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    const data = await res.json();
    if (!res.ok || res.status === 401 || res.status === 403) {
      triggerSecurityViolation();
      return;
    }
    if (data.exito && data.cupones) {
      adminCouponsStore = data.cupones;
      renderAdminCouponsList(adminCouponsStore);
      await fetchCoupons();

      // Si el cupón estaba aplicado en el carrito, removerlo y actualizar totales
      if (appliedCoupon && appliedCoupon.code.toUpperCase() === code.toUpperCase()) {
        appliedCoupon = null;
        updateCartBadge();
      }

      showToast(`¡Cupón "${code}" eliminado permanentemente de los datos! 🎟️❌`);
    }
  } catch (err) {
    showToast('Error al conectar con el servidor.');
  }
}

function switchAdminSubtab(subtab) {
  if (!verifyAdminSecurity()) return;

  const btnGames = document.getElementById('btn-subtab-games');
  const btnCoupons = document.getElementById('btn-subtab-coupons');
  const btnGallery = document.getElementById('btn-subtab-gallery');
  const viewGames = document.getElementById('admin-view-games');
  const viewCoupons = document.getElementById('admin-view-coupons');
  const viewGallery = document.getElementById('admin-view-gallery');
  const viewOrders = document.getElementById('admin-view-orders');

  if (btnGames) btnGames.classList.remove('active');
  if (btnCoupons) btnCoupons.classList.remove('active');
  if (btnGallery) btnGallery.classList.remove('active');
  if (viewGames) viewGames.style.display = 'none';
  if (viewCoupons) viewCoupons.style.display = 'none';
  if (viewGallery) viewGallery.style.display = 'none';
  if (viewOrders) viewOrders.style.display = 'none';

  if (subtab === 'games') {
    if (btnGames) btnGames.classList.add('active');
    if (viewGames) viewGames.style.display = 'block';
  } else if (subtab === 'coupons') {
    if (btnCoupons) btnCoupons.classList.add('active');
    if (viewCoupons) viewCoupons.style.display = 'block';
    fetchAndRenderAdminCoupons();
  } else if (subtab === 'orders') {
    const btnOrders=document.getElementById('btn-subtab-orders'); if(btnOrders) btnOrders.classList.add('active'); if(viewOrders) viewOrders.style.display='block'; fetchAdminOrders();
  } else if (subtab === 'gallery') {
    if (btnGallery) btnGallery.classList.add('active');
    if (viewGallery) viewGallery.style.display = 'block';
  }
}

async function handleApplyCoupon() {
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

  // Validar cupón en el servidor (no exponer lista completa al cliente)
  msgEl.className = 'coupon-msg';
  msgEl.style.color = '#94a3b8';
  msgEl.textContent = 'Verificando código...';

  try {
    const res = await fetch('/api/coupons/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    const data = await res.json();

    if (data.valid && data.coupon) {
      appliedCoupon = data.coupon;
      msgEl.className = 'coupon-msg success';
      msgEl.style.color = '#34d399';
      msgEl.textContent = `✓ ¡Código aplicado! (${data.coupon.desc})`;
      renderCartDrawer();
      renderPayCarousel();
      showToast(`¡Código ${data.coupon.code} aplicado con éxito! 🎉`);
    } else {
      appliedCoupon = null;
      msgEl.className = 'coupon-msg error';
      msgEl.style.color = '#ff4d6d';
      msgEl.textContent = data.error || '❌ El código de descuento no existe.';
      renderCartDrawer();
      renderPayCarousel();
    }
  } catch (err) {
    msgEl.className = 'coupon-msg error';
    msgEl.style.color = '#ff4d6d';
    msgEl.textContent = '❌ Error de conexión. Intenta de nuevo.';
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

  dropdown.innerHTML = matches.map(game => {
    const slug = slugify(game.titulo || '');
    const targetUrl = `/juego?id=${game.id}&slug=${encodeURIComponent(slug)}`;
    return `
    <a href="${targetUrl}" class="autocomplete-item" onclick="openGameModal(${game.id}); return false;" style="text-decoration: none; color: inherit; display: flex;">
      <img class="autocomplete-thumb" src="${escapeHTML(game.imagen)}" alt="${escapeHTML(game.titulo)}">
      <div class="autocomplete-info">
        <span class="autocomplete-title">${escapeHTML(game.titulo)}</span>
        <span class="autocomplete-sub">${escapeHTML(game.categoria)} • desde ${formatCLP(game.precioSecundaria)}</span>
      </div>
    </a>
  `;
  }).join('');

  dropdown.classList.add('active');
}

function selectAutocompleteResult(gameId, dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) dropdown.classList.remove('active');

  const desktopSearch = document.getElementById('search-input');
  if (desktopSearch) desktopSearch.value = '';
  searchQuery = '';
  renderCatalog();

  openGameModal(gameId);
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.header-search-box') && !e.target.closest('.mobile-search-box') && !e.target.closest('.mobile-search-overlay')) {
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
        <h5>Paso 1: Crear Usuario en tu Consola</h5>
        <p>Ve a <strong>Configuración de la Consola -> Usuarios -> Agregar usuario -> Crear un nuevo usuario</strong>. Elige cualquier ícono y apodo.</p>
      </div>
      <div class="guide-step-card">
        <h5>Paso 2: Vincular Cuenta de Nintendo</h5>
        <p>Selecciona <strong>"Vincular una cuenta de Nintendo"</strong> e ingresa el correo y la contraseña que te enviamos tras tu compra.</p>
      </div>
      <div class="guide-step-card">
        <h5>Paso 3: Descargar el Juego desde eShop</h5>
        <p>Abre <strong>Nintendo eShop</strong> usando el nuevo usuario creado. Haz clic en el ícono de perfil arriba a la derecha -> <strong>Volver a descargar</strong> -> Selecciona tu juego y presiona Descargar.</p>
      </div>
      <div class="guide-step-card">
        <h5>Paso 4: Cómo Jugar (Licencia Secundaria)</h5>
        <p>Para jugar, debes abrir el juego usando el usuario entregado y tener tu consola conectada a Internet al iniciar el juego.</p>
      </div>
    `;
  } else {
    if (btnPrim) btnPrim.classList.add('active');
    if (btnSec) btnSec.classList.remove('active');

    content.innerHTML = `
      <div class="guide-step-card">
        <h5>Paso 1: Crear Usuario y Vincular</h5>
        <p>Agrega un nuevo usuario en la consola e ingresa los datos de la Cuenta Primaria enviados a tu correo.</p>
      </div>
      <div class="guide-step-card">
        <h5>Paso 2: Confirmar Consola Principal</h5>
        <p>Ingresa a Nintendo eShop. La cuenta se registrará automáticamente como <strong>Consola Principal</strong>.</p>
      </div>
      <div class="guide-step-card">
        <h5>Paso 3: Descargar el Juego</h5>
        <p>Ve a <strong>Perfil de eShop -> Volver a descargar</strong> y presiona el botón de descarga.</p>
      </div>
      <div class="guide-step-card">
        <h5>Paso 4: ¡Juega con tu Cuenta Personal!</h5>
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
let lastScrollY = Math.max(0, window.scrollY);
let isNavHidden = false;

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const currentScrollY = Math.max(0, window.scrollY);
  const delta = currentScrollY - lastScrollY;

  if (currentScrollY <= 15) {
    navbar.classList.remove('nav-hidden');
    navbar.classList.remove('nav-scrolled');
    isNavHidden = false;
  } else if (delta > 4 && currentScrollY > 60) {
    if (!isNavHidden) {
      navbar.classList.add('nav-hidden');
      isNavHidden = true;
    }
  } else if (delta < -2) {
    if (isNavHidden) {
      navbar.classList.remove('nav-hidden');
      navbar.classList.add('nav-scrolled');
      isNavHidden = false;
    }
  }

  lastScrollY = currentScrollY;
}, { passive: true });

// --- BARRA INFERIOR MÓVIL: SE COMPACTA AL BAJAR Y SE EXPANDE AL SUBIR (rAF) ---
(function initBottomNavCompact() {
  const nav = document.getElementById('mobile-bottom-nav');
  if (!nav) return;
  let ticking = false;
  let lastScrollY = window.scrollY;
  function update() {
    const y = window.scrollY;
    if (y < 10) {
      // En la parte superior siempre expandida
      nav.classList.remove('nav-compact');
    } else if (y > lastScrollY + 4) {
      // Bajando → píldora compacta
      nav.classList.add('nav-compact');
    } else if (y < lastScrollY - 4) {
      // Subiendo → píldora expandida
      nav.classList.remove('nav-compact');
    }
    lastScrollY = y;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  update();
})();

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
  } catch (err) { }
}

function applyGalleryVisibility() {
  const section = document.getElementById('customer-gallery-section');
  const toggleBtn = document.getElementById('toggle-gallery-status-btn');

  if (section) {
    section.style.display = isGalleryEnabled ? 'block' : 'none';
  }

  if (toggleBtn) {
    if (isGalleryEnabled) {
      toggleBtn.innerHTML = 'Habilitada (Visible en tienda)';
      toggleBtn.style.background = 'rgba(52, 211, 153, 0.2)';
      toggleBtn.style.color = '#34d399';
      toggleBtn.style.borderColor = '#34d399';
    } else {
      toggleBtn.innerHTML = 'Deshabilitada (Oculta)';
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
    const res = await apiFetch('/api/admin/settings/toggle-gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled: newStatus })
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
        <button type="button" class="remove-item-btn" onclick="deleteGalleryItem(${item.id})" title="Eliminar reseña de la tienda" style="display: inline-flex; align-items: center; gap: 0.35rem; color: var(--text-muted);">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg> Eliminar
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
    const res = await apiFetch('/api/admin/gallery/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user,
        stars,
        imagen,
        comment
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
    saveBtn.textContent = 'Publicar Foto en Galería';
  }
}

async function deleteGalleryItem(id) {
  if (!currentUser || !confirm('¿Estás seguro de eliminar esta reseña de la tienda?')) return;

  try {
    const res = await apiFetch('/api/admin/gallery/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
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
        <button type="button" class="icon-btn-add" onclick="addAccountVariantRowAfter(this)" title="Agregar variante después de esta"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg></button>
        <button type="button" class="icon-btn-delete" onclick="removeAccountVariantRow(this)" title="Eliminar variante"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></button>
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
        <label>Códigos OTP (Ilimitados x coma / salto de línea)</label>
        <textarea class="var-input-codigo" rows="2" placeholder="123, 456, 789, 012... (Ilimitados códigos de 1 solo uso)">${escapeHTML(codigo)}</textarea>
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
        <button type="button" class="icon-btn-add" onclick="addAccountVariantRowAfter(this)" title="Agregar variante después de esta"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg></button>
        <button type="button" class="icon-btn-delete" onclick="removeAccountVariantRow(this)" title="Eliminar variante"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></button>
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
        <label>Códigos OTP (Ilimitados x coma / salto de línea)</label>
        <textarea class="var-input-codigo" rows="2" placeholder="123, 456, 789, 012... (Ilimitados códigos de 1 solo uso)"></textarea>
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

// Auto-refrescar datos del catálogo sin necesidad de Control + F5
// (cooldown 5s: los eventos focus/visibility de la carga inicial no deben
//  re-renderizar el grid y cortar la animación de entrada)
window.addEventListener('focus', () => {
  if (typeof fetchCatalog === 'function' && Date.now() - lastCatalogFetchAt > 5000) fetchCatalog();
});
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && typeof fetchCatalog === 'function' && Date.now() - lastCatalogFetchAt > 5000) {
    fetchCatalog();
  }
});

// --- MODALES ESTÉTICOS DE FOOTER (Sobre Nosotros) Y REDIRECCIÓN A TÉRMINOS ---
function openAboutUsModal() {
  let backdrop = document.getElementById('about-us-modal-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'about-us-modal-backdrop';
    backdrop.className = 'modal-backdrop';
    backdrop.innerHTML = `
      <div class="modal-card about-modal-content">
        <div class="about-modal-header">
          <h3>
            <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="6" x2="10" y1="11" y2="11"></line><line x1="8" x2="8" y1="9" y2="13"></line><line x1="15" x2="15.01" y1="12" y2="12"></line><line x1="18" x2="18.01" y1="10" y2="10"></line><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"></path></svg></span> Sobre ZonaSwitchChile
          </h3>
          <button type="button" onclick="closeAboutUsModal()" class="about-modal-close-btn">&times;</button>
        </div>
        <div class="about-modal-body">
          <p><strong>ZonaSwitchChile</strong> es tu tienda de confianza en Chile para la adquisición de juegos digitales de Nintendo Switch al mejor precio del mercado.</p>
          <p>Nos especializamos en brindar licencias <strong>100% digitales y originales</strong> (Cuentas Primarias y Secundarias), Directamente descargables desde nintendo eshop con máximo ahorro y soporte permanente.</p>
          <ul>
            <li><strong>Entrega Digital 24/7:</strong> Recibe tu juego de forma inmediata tras completar la compra.</li>
            <li><strong>Garantía VIP Permanente:</strong> Atención personalizada y garantía total de uso.</li>
            <li><strong>Múltiples Medios de Pago:</strong> Transferencias y pago online seguro en pesos chilenos (CLP).</li>
          </ul>
        </div>
        <div class="about-modal-footer">
          <button type="button" onclick="closeAboutUsModal()" class="modal-pretty-btn">
            <span>✓ Entendido</span>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeAboutUsModal();
    });
  }
  backdrop.classList.add('active');
}

function closeAboutUsModal() {
  const backdrop = document.getElementById('about-us-modal-backdrop');
  if (backdrop) backdrop.classList.remove('active');
}

function openTermsModal() {
  window.location.href = '/terminos';
}

function closeTermsModal() {
  const backdrop = document.getElementById('terms-modal-backdrop');
  if (backdrop) backdrop.classList.remove('active');
}
