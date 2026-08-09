/* ==========================================================================
   ZonaSwitchChile - Juego Detail Pro Level Controller JS
   ========================================================================== */

let currentDetailGame = null;
let currentSelectedLicense = 'primaria';
let detailActiveThumbIndex = 0;
let detailImagesList = [];

document.addEventListener('DOMContentLoaded', async () => {
  // Escuchar cambio de moneda para actualizar precios en tiempo real
  const currencySelect = document.getElementById('currency-select');
  if (currencySelect) {
    currencySelect.addEventListener('change', () => {
      renderGameDetailView();
      renderRelatedGames();
    });
  }
  const mobileCurrencySelect = document.getElementById('mobile-currency-select');
  if (mobileCurrencySelect) {
    mobileCurrencySelect.addEventListener('change', () => {
      renderGameDetailView();
      renderRelatedGames();
    });
  }

  // Cargar catálogo e inicializar juego por URL id
  await initJuegoPage();
});

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

async function initJuegoPage() {
  const urlParams = new URLSearchParams(window.location.search);
  let rawParam = urlParams.get('id') || urlParams.get('slug');

  // Si no se proporcionó id en la querystring, extraer el slug directamente del path de la URL (ej: /Mario-Kart-8-Deluxe)
  if (!rawParam) {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const lastSegment = pathSegments[pathSegments.length - 1];
      if (lastSegment && !lastSegment.includes('.')) {
        rawParam = decodeURIComponent(lastSegment);
      }
    }
  }

  // Intentar cargar catálogo desde el servidor si aún no está cargado
  if (!Array.isArray(catalog) || catalog.length === 0) {
    try {
      const res = await apiFetch('/api/juegos');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) catalog = data;
      }
    } catch (e) {}
  }

  if (!Array.isArray(catalog) || catalog.length === 0) {
    catalog = [...DEFAULT_GAMES_FRONTEND];
  }

  if (rawParam) {
    const clean = rawParam.toLowerCase().trim();
    currentDetailGame = catalog.find(g =>
      slugify(g.titulo).toLowerCase() === clean ||
      String(g.id) === clean
    );
  }

  if (!currentDetailGame) {
    currentDetailGame = catalog[0];
  }

  if (!currentDetailGame) return;

  // Actualizar la URL de la barra de direcciones a la limpia SEO (ej: https://zonaswitchchile.com/Mario-Kart-8-Deluxe)
  if (currentDetailGame.titulo && window.history && window.history.replaceState) {
    const cleanSlug = slugify(currentDetailGame.titulo);
    if (!window.location.pathname.endsWith(cleanSlug)) {
      window.history.replaceState(null, currentDetailGame.titulo, `/${cleanSlug}`);
    }
  }

  // Actualizar título de la ventana
  document.title = `${currentDetailGame.titulo} | ZonaSwitchChile`;

  // Construir lista de imágenes para la galería / carrusel de capturas
  detailImagesList = [];
  if (currentDetailGame.imagen) detailImagesList.push(currentDetailGame.imagen);
  if (currentDetailGame.imagenDetalle && currentDetailGame.imagenDetalle !== currentDetailGame.imagen) {
    detailImagesList.push(currentDetailGame.imagenDetalle);
  }
  if (Array.isArray(currentDetailGame.imagenesDetalle)) {
    currentDetailGame.imagenesDetalle.forEach(img => {
      if (img && !detailImagesList.includes(img)) detailImagesList.push(img);
    });
  }

  // Agregar fotos de muestra si faltan capturas adicionales
  if (detailImagesList.length < 3) {
    const extraSampleImages = [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800&auto=format&fit=crop'
    ];
    extraSampleImages.forEach(img => {
      if (detailImagesList.length < 4 && !detailImagesList.includes(img)) {
        detailImagesList.push(img);
      }
    });
  }

  renderGameDetailView();
  renderRelatedGames();
}

function renderGameDetailView() {
  if (!currentDetailGame) return;

  const game = currentDetailGame;

  // Breadcrumbs
  document.getElementById('jd-crumb-category').textContent = game.categoria || 'Nintendo';
  document.getElementById('jd-crumb-title').textContent = game.titulo;

  // Hero Media
  const heroImg = document.getElementById('jd-hero-img');
  heroImg.src = detailImagesList[detailActiveThumbIndex] || game.imagen;
  heroImg.alt = game.titulo;

  // Badge de descuento animado
  const orig = Number(game.precioOriginal) || (Number(game.precioPrimaria) * 1.5);
  const cur = Number(game.precioSecundaria) || 10000;
  const pct = Math.max(10, Math.round(((orig - cur) / orig) * 100));
  document.getElementById('jd-discount-badge').textContent = `-${pct}% OFF`;

  document.getElementById('jd-hero-size-badge').textContent = `📦 ${game.peso || '15 GB'}`;
  document.getElementById('jd-hero-rating-badge').textContent = `⭐ ${game.rating || 5.0} / 5.0`;

  // Tira de miniaturas
  const strip = document.getElementById('jd-thumbnails-strip');
  strip.innerHTML = detailImagesList.map((imgUrl, idx) => `
    <div class="jd-thumb-item ${idx === detailActiveThumbIndex ? 'active' : ''}" onclick="selectDetailThumbnail(${idx})">
      <img src="${escapeHTML(imgUrl)}" alt="Captura ${idx + 1}">
    </div>
  `).join('');

  // Encabezado
  document.getElementById('jd-category-tag').textContent = game.categoria || 'Nintendo Switch';
  document.getElementById('jd-title').textContent = game.titulo;
  document.getElementById('jd-peso-val').textContent = game.peso || '15 GB';
  document.getElementById('jd-rating-val').textContent = (game.rating || 5.0).toFixed(1);

  // Precios y Ahorro
  const selectedPrice = currentSelectedLicense === 'primaria' ? game.precioPrimaria : game.precioSecundaria;
  const convertedCurrent = formatCLP(selectedPrice);
  const convertedOld = formatCLP(orig);
  const savingsAmount = Math.max(0, orig - selectedPrice);

  document.getElementById('jd-price-current').textContent = convertedCurrent;
  document.getElementById('jd-price-old').textContent = convertedOld;
  document.getElementById('jd-savings-tag').textContent = `¡Ahorras ${formatCLP(savingsAmount)} (${pct}% OFF)!`;

  // Precios en las tarjetas de licencias
  document.getElementById('jd-lic-price-sec').textContent = formatCLP(game.precioSecundaria);
  document.getElementById('jd-lic-price-prim').textContent = formatCLP(game.precioPrimaria);

  // Acordeón texto
  updateLicenseAccordionContent();

  // Tabs contenido
  document.getElementById('jd-desc-content').innerHTML = `
    <p style="margin-bottom: 1rem;">${escapeHTML(game.resumenExtenso || game.descripcion || '')}</p>
    <p>Disfruta de la máxima calidad de Nintendo Switch en formato digital. Con tu compra obtienes acceso inmediato a los servidores oficiales de Nintendo eShop con garantía de uso permanente ZonaSwitchChile.</p>
  `;

  document.getElementById('jd-spec-size').textContent = game.peso || '15 GB';
  document.getElementById('jd-spec-category').textContent = game.categoria || 'Acción / Aventura';

  // Tráiler Teaser Listener
  const trailerBtn = document.getElementById('jd-trailer-btn');
  if (trailerBtn) {
    trailerBtn.onclick = () => openTrailerModal(game);
  }
}

function selectDetailThumbnail(index) {
  if (index >= 0 && index < detailImagesList.length) {
    detailActiveThumbIndex = index;
    const heroImg = document.getElementById('jd-hero-img');
    heroImg.style.opacity = '0.4';
    setTimeout(() => {
      heroImg.src = detailImagesList[detailActiveThumbIndex];
      heroImg.style.opacity = '1';
    }, 150);

    const strip = document.getElementById('jd-thumbnails-strip');
    const items = strip.querySelectorAll('.jd-thumb-item');
    items.forEach((item, idx) => {
      if (idx === index) item.classList.add('active');
      else item.classList.remove('active');
    });
  }
}

function selectDetailLicense(type) {
  currentSelectedLicense = type;

  const cardSec = document.getElementById('jd-card-secundaria');
  const cardPrim = document.getElementById('jd-card-primaria');
  const radioSec = document.getElementById('jd-radio-secundaria');
  const radioPrim = document.getElementById('jd-radio-primaria');

  if (type === 'secundaria') {
    cardSec.classList.add('active');
    cardPrim.classList.remove('active');
    radioSec.checked = true;
    radioPrim.checked = false;
  } else {
    cardPrim.classList.add('active');
    cardSec.classList.remove('active');
    radioPrim.checked = true;
    radioSec.checked = false;
  }

  renderGameDetailView();
}

function toggleLicenseAccordion() {
  const body = document.getElementById('jd-accordion-body');
  const arrow = document.getElementById('jd-accordion-arrow');
  body.classList.toggle('open');
  arrow.classList.toggle('open');
}

function updateLicenseAccordionContent() {
  const label = document.getElementById('jd-accordion-selected-label');
  const content = document.getElementById('jd-accordion-content-text');

  if (currentSelectedLicense === 'secundaria') {
    label.textContent = 'Cuenta Secundaria';
    content.innerHTML = `
      <ul style="padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.4rem;">
        <li>🎮 <strong>Modo de Juego:</strong> Juegas directamente iniciando el juego desde el perfil enviado por la tienda.</li>
        <li>🌐 <strong>Conexión a Internet:</strong> Se requiere conexión Wi-Fi/Internet al iniciar el juego para validar la licencia digital.</li>
        <li>💰 <strong>Ahorro Máximo:</strong> La opción más económica para disfrutar del juego completo al 100%.</li>
        <li>🛡️ <strong>Garantía:</strong> Soporte permanente y reemplazo ante cualquier inconveniente.</li>
      </ul>
    `;
  } else {
    label.textContent = 'Cuenta Primaria';
    content.innerHTML = `
      <ul style="padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.4rem;">
        <li>⭐ <strong>Tu Perfil Personal:</strong> Juegas con tu perfil personal de siempre, acumulando tus propios trofeos, partidas guardadas e historial de horas.</li>
        <li>✈️ <strong>Modo Offline / Sin Wi-Fi:</strong> Juegas en cualquier lugar sin necesidad de estar conectado a internet.</li>
        <li>🌐 <strong>Multijugador Online:</strong> Compatible 100% con tu suscripción a Nintendo Switch Online.</li>
        <li>🛡️ <strong>Garantía VIP:</strong> Licencia permanente con garantía de por vida ZonaSwitchChile.</li>
      </ul>
    `;
  }
}

function handleAddDetailToCart() {
  if (!currentDetailGame) return;

  const licenseName = currentSelectedLicense === 'primaria' ? 'Primaria' : 'Secundaria';
  const price = currentSelectedLicense === 'primaria' ? currentDetailGame.precioPrimaria : currentDetailGame.precioSecundaria;

  addToCart(currentDetailGame.id, licenseName, price);
  showToast(`¡${currentDetailGame.titulo} (${licenseName}) añadido al carrito! 🛒`);
}

function handleDirectDetailCheckout() {
  handleAddDetailToCart();
  openCartDrawer();
}

function switchDetailTab(tabId) {
  const buttons = document.querySelectorAll('.jd-tab-btn');
  const panes = document.querySelectorAll('.jd-tab-pane');

  buttons.forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  panes.forEach(pane => {
    if (pane.id === tabId) pane.classList.add('active');
    else pane.classList.remove('active');
  });
}

function renderRelatedGames() {
  const container = document.getElementById('jd-related-grid');
  if (!container || !currentDetailGame) return;

  const related = catalog.filter(g => g.id !== currentDetailGame.id && g.categoria === currentDetailGame.categoria);
  const displayList = related.length >= 2 ? related.slice(0, 4) : catalog.filter(g => g.id !== currentDetailGame.id).slice(0, 4);

  container.innerHTML = displayList.map(g => `
    <article class="game-card in-view" onclick="window.location.href='/${slugify(g.titulo)}'">
      <div class="card-media">
        <img src="${escapeHTML(g.imagen || '')}" alt="${escapeHTML(g.titulo || '')}" loading="lazy">
        <span class="card-tag">${escapeHTML(g.categoria || 'Nintendo')}</span>
        <span class="card-size-tag">📦 ${escapeHTML(g.peso || 'N/A')}</span>
      </div>
      <div class="card-content">
        <h3 class="card-title">${escapeHTML(g.titulo || '')}</h3>
        <p class="card-desc">${escapeHTML(g.descripcion || '')}</p>
        <div class="card-footer">
          <div class="price-container">
            <span class="original-price">${formatCLP(g.precioOriginal || g.precioSecundaria * 1.5)}</span>
            <span class="current-price">${formatCLP(g.precioSecundaria)}</span>
          </div>
          <button class="btn-card-buy" type="button">Ver Detalle →</button>
        </div>
      </div>
    </article>
  `).join('');
}

function openTrailerModal(game) {
  const modal = document.getElementById('trailer-modal-backdrop');
  const wrapper = document.getElementById('trailer-video-wrapper');
  if (!modal || !wrapper) return;

  // Renderizar trailer YouTube Embed según el juego
  const trailerMap = {
    1: 'https://www.youtube-nocookie.com/embed/uHGShqcAHlQ?autoplay=1', // Zelda TOTK
    2: 'https://www.youtube-nocookie.com/embed/JStAYvbe_3s?autoplay=1', // Mario Wonder
    3: 'https://www.youtube-nocookie.com/embed/tKlRN2YpxRE?autoplay=1', // Mario Kart 8 Deluxe
    4: 'https://www.youtube-nocookie.com/embed/WShCN-AYHqA?autoplay=1', // Smash Ultimate
    5: 'https://www.youtube-nocookie.com/embed/7V20G0S_Y4w?autoplay=1', // Pokémon Escarlata
    6: 'https://www.youtube-nocookie.com/embed/8wjY0q01uOk?autoplay=1'  // Metroid Dread
  };

  const videoUrl = trailerMap[game.id] || 'https://www.youtube-nocookie.com/embed/uHGShqcAHlQ?autoplay=1';

  wrapper.innerHTML = `
    <iframe src="${videoUrl}" title="Tráiler de ${escapeHTML(game.titulo)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `;

  modal.classList.add('active');

  const closeBtn = document.getElementById('close-trailer-modal');
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.classList.remove('active');
      wrapper.innerHTML = '';
    };
  }
}
