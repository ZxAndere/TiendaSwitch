var currentDetailGame = null;
window.currentDetailGame = null;
let currentSelectedLicense = null;
let detailActiveThumbIndex = 0;
let detailImagesList = [];
let currentThumbOffsetIndex = 0;
let catalogLoadedFromServer = false;
let currentTrailerList = [];
let currentTrailerIndex = 0;
let isTrailerInitialized = false;

function safeEscapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>'"]/g,
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

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
      if (lastSegment && !lastSegment.includes('.html') && !lastSegment.includes('.')) {
        rawParam = decodeURIComponent(lastSegment);
      }
    }
  }

  // Cargar SIEMPRE el catálogo oficial del servidor para que los relacionados
  // coincidan exclusivamente con los juegos visibles que existen en la tienda.
  try {
    const listRes = await fetch('/api/juegos');
    if (listRes.ok) {
      const serverGames = await listRes.json();
      if (Array.isArray(serverGames) && serverGames.length > 0) {
        catalog = serverGames.filter(g => g && g.visible !== false);
        catalogLoadedFromServer = true;
      }
    }
  } catch (e) {}

  // Buscar primero el producto dentro del catálogo oficial.
  if (rawParam && Array.isArray(catalog) && catalog.length > 0) {
    const clean = rawParam.toLowerCase().trim();
    currentDetailGame = catalog.find(g =>
      slugify(g.titulo).toLowerCase() === clean ||
      String(g.id) === clean
    ) || null;
  }

  // Si no está en el listado oficial, intentar el endpoint individual.
  if (!currentDetailGame && rawParam) {
    try {
      const res = await fetch(`/api/juegos/${encodeURIComponent(rawParam)}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.id) currentDetailGame = data;
      }
    } catch (e) {}
  }

  if (!currentDetailGame && Array.isArray(catalog) && catalog.length > 0) {
    currentDetailGame = catalog[0];
  }

  if (typeof trackAnalytics === 'function' && currentDetailGame) trackAnalytics({ type: 'game_view', gameId: currentDetailGame.id });

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
  initDetailTrailers(currentDetailGame);
  renderRelatedGames();
  initAdminQuickGearButton();
}

function renderGameDetailView(animatePrice = false) {
  if (!currentDetailGame) return;

  const game = currentDetailGame;

  try {
    // Breadcrumbs
    const crumbCat = document.getElementById('jd-crumb-category');
    if (crumbCat) crumbCat.textContent = game.categoria || 'Switch';

    const crumbTitle = document.getElementById('jd-crumb-title');
    if (crumbTitle) crumbTitle.textContent = game.titulo || '';
  } catch (e) {}

  try {
    // Hero Media
    const heroImg = document.getElementById('jd-hero-img');
    if (heroImg) {
      heroImg.src = (detailImagesList && detailImagesList[detailActiveThumbIndex]) || game.imagen || '';
      heroImg.alt = game.titulo || '';
    }
  } catch (e) {}

  try {
    // Badge de descuento animado
    const orig = Number(game.precioOriginal) || (Number(game.precioSecundaria) * 1.5) || 15000;
    const cur = Number(game.precioSecundaria) || 10000;
    const pct = Math.max(10, Math.round(((orig - cur) / orig) * 100));

    const discBadge = document.getElementById('jd-discount-badge');
    if (discBadge) discBadge.textContent = `-${pct}% OFF`;

    const sizeBadge = document.getElementById('jd-hero-size-badge');
    if (sizeBadge) sizeBadge.textContent = `${game.peso || '15 GB'}`;

    const ratingElem = document.getElementById('jd-hero-rating-badge');
    if (ratingElem) ratingElem.style.display = 'none';
  } catch (e) {}

  try {
    // Tira de miniaturas (Galería de 5 visibles + Flechas)
    const strip = document.getElementById('jd-thumbnails-strip');
    const arrowsBox = document.getElementById('jd-gallery-arrows-box');
    if (strip) {
      strip.innerHTML = (detailImagesList || []).map((imgUrl, idx) => `
        <div class="jd-thumb-item ${idx === detailActiveThumbIndex ? 'active' : ''}" onclick="selectDetailThumbnail(${idx})">
          <img src="${safeEscapeHTML(imgUrl)}" alt="Captura ${idx + 1}" loading="lazy">
        </div>
      `).join('');
    }
    if (arrowsBox) {
      arrowsBox.style.display = (detailImagesList && detailImagesList.length > 5) ? 'flex' : 'none';
    }
  } catch (e) {}

  try {
    // Encabezado
    const catTag = document.getElementById('jd-category-tag');
    if (catTag) catTag.textContent = game.categoria || 'Switch';

    const titleEl = document.getElementById('jd-title');
    if (titleEl) titleEl.textContent = game.titulo || '';

    const pesoVal = document.getElementById('jd-peso-val');
    if (pesoVal) pesoVal.textContent = game.peso || '15 GB';

    const ratingVal = document.getElementById('jd-rating-val');
    if (ratingVal && ratingVal.parentElement) ratingVal.parentElement.style.display = 'none';
  } catch (e) {}

  try {
    // Precios y Ahorro
    const orig = Number(game.precioOriginal) || (Number(game.precioSecundaria) * 1.5) || 15000;
    const curSec = Number(game.precioSecundaria) || 20000;
    const curPrim = Number(game.precioPrimaria) || 30000;

    const priceCur = document.getElementById('jd-price-current');
    const priceOld = document.getElementById('jd-price-old');
    const savingsTag = document.getElementById('jd-savings-tag');

    if (!currentSelectedLicense) {
      if (priceCur) priceCur.innerHTML = `<small style="font-size: 0.7em; font-weight: 600; opacity: 0.85; margin-right: 4px;">Desde</small> ${formatCLP(curSec)}`;
      if (priceOld) priceOld.textContent = formatCLP(orig);
      const pct = Math.max(10, Math.round(((orig - curSec) / orig) * 100));
      if (savingsTag) savingsTag.textContent = `¡Hasta ${pct}% OFF! (Selecciona tu cuenta)`;
    } else {
      const selectedPrice = currentSelectedLicense === 'primaria' ? curPrim : curSec;
      const convertedCurrent = formatCLP(selectedPrice);
      const convertedOld = formatCLP(orig);
      const savingsAmount = Math.max(0, orig - selectedPrice);
      const pct = Math.max(10, Math.round(((orig - selectedPrice) / orig) * 100));

      if (priceCur) {
        priceCur.textContent = convertedCurrent;
        if (animatePrice) {
          priceCur.classList.remove('price-anim-pop');
          void priceCur.offsetWidth;
          priceCur.classList.add('price-anim-pop');
        }
      }
      if (priceOld) priceOld.textContent = convertedOld;
      if (savingsTag) {
        savingsTag.textContent = `¡Ahorras ${formatCLP(savingsAmount)} (${pct}% OFF)!`;
        if (animatePrice) {
          savingsTag.classList.remove('price-anim-pop');
          void savingsTag.offsetWidth;
          savingsTag.classList.add('price-anim-pop');
        }
      }
    }

    // Precios en las tarjetas de licencias
    const licPriceSec = document.getElementById('jd-lic-price-sec');
    if (licPriceSec) licPriceSec.textContent = formatCLP(curSec);

    const licPricePrim = document.getElementById('jd-lic-price-prim');
    if (licPricePrim) licPricePrim.textContent = formatCLP(curPrim);

    // Estado visual de las tarjetas y radios
    const cardSec = document.getElementById('jd-card-secundaria');
    const cardPrim = document.getElementById('jd-card-primaria');
    const radioSec = document.getElementById('jd-radio-secundaria');
    const radioPrim = document.getElementById('jd-radio-primaria');
    const stockSec = Number.isInteger(game.stockSecundaria) ? game.stockSecundaria : null;
    const stockPrim = Number.isInteger(game.stockPrimaria) ? game.stockPrimaria : null;
    [
      {card: cardSec, radio: radioSec, stock: stockSec, type: 'secundaria'},
      {card: cardPrim, radio: radioPrim, stock: stockPrim, type: 'primaria'}
    ].forEach(x => {
      if (!x.card) return;
      let badge=x.card.querySelector('.jd-stock-status');
      if(!badge){ badge=document.createElement('span'); badge.className='jd-stock-status'; badge.style.cssText='display:block;margin-top:.5rem;font-weight:800;font-size:.8rem;'; x.card.appendChild(badge); }
      const out = x.stock !== null && x.stock <= 0;
      badge.textContent = out ? '⛔ Fuera de Stock' : (x.stock === null ? '✅ Disponible' : (x.stock <= 3 ? `⚠️ Últimas ${x.stock}` : `✅ ${x.stock} disponibles`));
      badge.style.color = out ? '#f87171' : (x.stock !== null && x.stock <= 3 ? '#fbbf24' : '#34d399');
      x.card.style.opacity = out ? '0.55' : '1'; x.card.style.pointerEvents = out ? 'none' : 'auto';
      if(x.radio) x.radio.disabled = out;
    });
    if ((currentSelectedLicense === 'primaria' && stockPrim === 0) || (currentSelectedLicense === 'secundaria' && stockSec === 0)) currentSelectedLicense = null;

    if (currentSelectedLicense === 'secundaria') {
      if (cardSec) cardSec.classList.add('active');
      if (cardPrim) cardPrim.classList.remove('active');
      if (radioSec) radioSec.checked = true;
      if (radioPrim) radioPrim.checked = false;
    } else if (currentSelectedLicense === 'primaria') {
      if (cardPrim) cardPrim.classList.add('active');
      if (cardSec) cardSec.classList.remove('active');
      if (radioPrim) radioPrim.checked = true;
      if (radioSec) radioSec.checked = false;
    } else {
      if (cardSec) cardSec.classList.remove('active');
      if (cardPrim) cardPrim.classList.remove('active');
      if (radioSec) radioSec.checked = false;
      if (radioPrim) radioPrim.checked = false;
    }
  } catch (e) {}

  try {
    // Acordeón texto
    updateLicenseAccordionContent();
  } catch (e) {}

  try {
    // Tabs contenido / Descripción
    const descContent = document.getElementById('jd-desc-content');
    if (descContent) {
      descContent.innerHTML = `
        <p style="margin-bottom: 1rem;">${safeEscapeHTML(game.resumenExtenso || game.descripcion || '')}</p>
        <p>Disfruta de la máxima calidad de Switch en formato digital. Con tu compra obtienes acceso inmediato a los servidores oficiales de la eShop con garantía de uso permanente ZonaSwitchChile.</p>
      `;
    }

    const specCat = document.getElementById('jd-spec-category');
    if (specCat) specCat.textContent = game.categoria || 'Acción / Aventura';
  } catch (e) {}

  try {
    // Video Tráiler Embebido Directamente en la Página
    const videoWrapper = document.getElementById('jd-video-wrapper');
    if (videoWrapper) {
      const videoUrl = getYouTubeEmbedUrl(game);
      videoWrapper.innerHTML = `
        <iframe
          src="${videoUrl}"
          title="Tráiler Oficial de ${safeEscapeHTML(game.titulo)}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen>
        </iframe>
      `;
    }
  } catch (e) {}
}

function selectDetailThumbnail(index) {
  if (index >= 0 && index < detailImagesList.length) {
    detailActiveThumbIndex = index;
    const heroImg = document.getElementById('jd-hero-img');
    if (heroImg) {
      heroImg.style.opacity = '0.4';
      setTimeout(() => {
        heroImg.src = detailImagesList[detailActiveThumbIndex];
        heroImg.style.opacity = '1';
      }, 150);
    }

    const strip = document.getElementById('jd-thumbnails-strip');
    if (strip) {
      const items = strip.querySelectorAll('.jd-thumb-item');
      items.forEach((item, idx) => {
        if (idx === index) item.classList.add('active');
        else item.classList.remove('active');
      });
    }
  }
}

function selectDetailLicense(type) {
  if (!currentDetailGame) return;
  const stock = type === 'primaria' ? currentDetailGame.stockPrimaria : currentDetailGame.stockSecundaria;
  if (Number.isInteger(stock) && stock <= 0) {
    if (typeof showToast === 'function') showToast('⚠️ Esta licencia está Fuera de Stock.');
    return;
  }
  currentSelectedLicense = type;

  const cardSec = document.getElementById('jd-card-secundaria');
  const cardPrim = document.getElementById('jd-card-primaria');
  const radioSec = document.getElementById('jd-radio-secundaria');
  const radioPrim = document.getElementById('jd-radio-primaria');

  if (type === 'secundaria') {
    if (cardSec) cardSec.classList.add('active');
    if (cardPrim) cardPrim.classList.remove('active');
    if (radioSec) radioSec.checked = true;
    if (radioPrim) radioPrim.checked = false;
  } else {
    if (cardPrim) cardPrim.classList.add('active');
    if (cardSec) cardSec.classList.remove('active');
    if (radioPrim) radioPrim.checked = true;
    if (radioSec) radioSec.checked = false;
  }

  renderGameDetailView(true);
}

function toggleLicenseAccordion() {
  const body = document.getElementById('jd-accordion-body');
  const arrow = document.getElementById('jd-accordion-arrow');
  if (body) body.classList.toggle('open');
  if (arrow) arrow.classList.toggle('open');
}

function updateLicenseAccordionContent() {
  const label = document.getElementById('jd-accordion-selected-label');
  const content = document.getElementById('jd-accordion-content-text');

  if (currentSelectedLicense === 'secundaria') {
    if (label) label.textContent = 'Cuenta Secundaria';
    if (content) {
      content.innerHTML = `
        <ul style="padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.4rem;">
          <li>🎮 <strong>Modo de Juego:</strong> Juegas directamente iniciando el juego desde el perfil enviado por la tienda.</li>
          <li>🌐 <strong>Conexión a Internet:</strong> Se requiere conexión Wi-Fi/Internet al iniciar el juego para validar la licencia digital.</li>
          <li>💰 <strong>Ahorro Máximo:</strong> La opción más económica para disfrutar del juego completo al 100%.</li>
          <li>🛡️ <strong>Garantía:</strong> Soporte permanente y reemplazo ante cualquier inconveniente.</li>
        </ul>
      `;
    }
  } else {
    if (label) label.textContent = 'Cuenta Primaria';
    if (content) {
      content.innerHTML = `
        <ul style="padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.4rem;">
          <li>🎮 <strong>Tu Perfil Personal:</strong> Juegas con tu perfil personal de siempre, acumulando tus propios trofeos y partidas guardadas.</li>
          <li>✈️ <strong>Modo Offline / Sin Wi-Fi:</strong> Juegas en cualquier lugar sin necesidad de estar conectado a internet.</li>
          <li>🌐 <strong>Multijugador Online:</strong> Compatible 100% con tu suscripción a Switch Online.</li>
          <li>🛡️ <strong>Garantía VIP:</strong> Licencia permanente con garantía de por vida ZonaSwitchChile.</li>
        </ul>
      `;
    }
  }
}

function promptSelectLicense() {
  if (typeof showToast === 'function') {
    showToast('⚠️ Por favor selecciona una cuenta (Secundaria o Primaria) para continuar.');
  }
  const secCard = document.getElementById('jd-card-secundaria');
  const primCard = document.getElementById('jd-card-primaria');
  if (secCard && primCard) {
    secCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    secCard.style.animation = 'jdLicensePop 0.4s ease 2';
    primCard.style.animation = 'jdLicensePop 0.4s ease 2';
    setTimeout(() => {
      secCard.style.animation = '';
      primCard.style.animation = '';
    }, 900);
  }
}

function handleAddDetailToCart() {
  if (!currentDetailGame) return;
  if (!currentSelectedLicense) {
    promptSelectLicense();
    return;
  }
  const selectedStock = currentSelectedLicense === 'primaria' ? currentDetailGame.stockPrimaria : currentDetailGame.stockSecundaria;
  if (Number.isInteger(selectedStock) && selectedStock <= 0) { if (typeof showToast === 'function') showToast('⚠️ Fuera de Stock.'); return; }
  addGameWithLicenseToCart(currentDetailGame, currentSelectedLicense);
  openCartDrawer();
}

function handleDirectDetailCheckout() {
  if (!currentDetailGame) return;
  if (!currentSelectedLicense) {
    promptSelectLicense();
    return;
  }
  const selectedStock = currentSelectedLicense === 'primaria' ? currentDetailGame.stockPrimaria : currentDetailGame.stockSecundaria;
  if (Number.isInteger(selectedStock) && selectedStock <= 0) {
    if (typeof showToast === 'function') showToast('⚠️ Fuera de Stock.');
    return;
  }
  // Compra directa: el ítem va al pago SIN agregarlo al carrito
  if (typeof buildDirectCheckoutItem === 'function') {
    directCheckoutItem = buildDirectCheckoutItem(currentDetailGame, currentSelectedLicense);
  }
  if (typeof openPaymentModal === 'function') {
    openPaymentModal();
  } else {
    openCartDrawer();
  }
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
  if (!container || !currentDetailGame || !Array.isArray(catalog) || !catalogLoadedFromServer) return;

  const otherGames = catalog.filter(g => g && Number(g.id) !== Number(currentDetailGame.id) && g.visible !== false);
  if (otherGames.length === 0) return;

  // Seleccionar 4 juegos al azar del catálogo existente
  const shuffled = [...otherGames].sort(() => 0.5 - Math.random());
  const displayList = shuffled.slice(0, 4);

  container.innerHTML = displayList.map(g => {
    const orig = Number(g.precioOriginal) || (Number(g.precioSecundaria) * 1.5);
    const cur = Number(g.precioSecundaria);
    return `
      <article class="game-card in-view" onclick="window.location.href='/juego?id=${g.id}'">
        <div class="card-media">
          <img src="${escapeHTML(g.imagen || '')}" alt="${escapeHTML(g.titulo || '')}" loading="lazy" onload="this.classList.add('loaded')" onerror="this.classList.remove('loaded')">
          <span class="card-tag">${escapeHTML(g.categoria || 'Switch')}</span>
        </div>
        <div class="card-content">
          <h3 class="card-title">${escapeHTML(g.titulo || '')}</h3>
          <p class="card-desc">${escapeHTML(g.descripcion || '')}</p>
          <div class="card-footer">
            <div class="price-container">
              <span class="original-price">${formatCLP(orig)}</span>
              <span class="current-price"><small style="font-size: 0.75em; font-weight: 600; opacity: 0.85; margin-right: 3px;">Desde</small> ${formatCLP(cur)}</span>
            </div>
            <button class="buy-card-btn" type="button" title="Ver Detalles" aria-label="Ver Detalles">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
              <span class="buy-btn-text">Ver Detalles</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function parseYouTubeVideoId(url) {
  if (!url) return null;
  const str = String(url).trim();
  if (!str) return null;

  // Todo ID extraído DEBE pasar la validación estricta de 11 caracteres
  // (evita inyección de atributos en el <iframe src> con URLs maliciosas)
  const validId = (id) => (typeof id === 'string' && /^[a-zA-Z0-9_-]{11}$/.test(id)) ? id : null;

  const direct = validId(str);
  if (direct) return direct;

  try {
    if (str.includes('youtu.be/')) {
      return validId(str.split('youtu.be/')[1].split('?')[0].split('&')[0].split('#')[0]);
    }
    if (str.includes('youtube.com/watch')) {
      const u = new URL(str);
      return validId(u.searchParams.get('v'));
    }
    if (str.includes('youtube.com/embed/')) {
      return validId(str.split('youtube.com/embed/')[1].split('?')[0].split('#')[0]);
    }
    if (str.includes('youtube.com/shorts/')) {
      return validId(str.split('youtube.com/shorts/')[1].split('?')[0].split('#')[0]);
    }
  } catch (e) {}
  return null;
}

function getYouTubeEmbedUrl(game) {
  if (!game) return 'https://www.youtube.com/embed/uHGShqcAHlQ?autoplay=0&rel=0&modestbranding=1&enablejsapi=1';

  const customYt = game.youtubeUrl || game.videoTrailerUrl;
  let videoId = parseYouTubeVideoId(customYt);

  const trailerMap = {
    1: 'uHGShqcAHlQ', // Zelda TOTK
    2: 'JStAYvbe_3s', // Mario Wonder
    3: 'tKlRN2YpxRE', // Mario Kart 8 Deluxe
    4: 'WShCN-AYHqA', // Smash Ultimate
    5: '7V20G0S_Y4w', // Pokémon Escarlata
    6: '8wjY0q01uOk'  // Metroid Dread
  };

  if (!videoId) {
    videoId = trailerMap[game.id] || 'uHGShqcAHlQ';
  }

  return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1`;
}

function slideThumbnails(direction) {
  const total = detailImagesList ? detailImagesList.length : 0;
  if (total <= 5) return;
  const maxOffset = total - 5;
  currentThumbOffsetIndex += direction;
  if (currentThumbOffsetIndex < 0) currentThumbOffsetIndex = 0;
  if (currentThumbOffsetIndex > maxOffset) currentThumbOffsetIndex = maxOffset;

  const strip = document.getElementById('jd-thumbnails-strip');
  if (strip) {
    const offsetPercent = currentThumbOffsetIndex * (100 / 5 + 0.65);
    strip.style.transform = `translateX(-${offsetPercent}%)`;
  }
}

function initDetailTrailers(game) {
  if (!game) return;
  currentTrailerList = [];

  if (Array.isArray(game.youtubeTrailers) && game.youtubeTrailers.length > 0) {
    game.youtubeTrailers.forEach(t => {
      const id = parseYouTubeVideoId(t);
      if (id && !currentTrailerList.includes(id)) currentTrailerList.push(id);
    });
  }

  if (currentTrailerList.length === 0) {
    const customYt = game.youtubeUrl || game.videoTrailerUrl;
    const customId = parseYouTubeVideoId(customYt);
    if (customId) {
      currentTrailerList.push(customId);
    } else {
      const trailerMap = {
        1: 'uHGShqcAHlQ',
        2: 'JStAYvbe_3s',
        3: 'tKlRN2YpxRE',
        4: 'WShCN-AYHqA',
        5: '7V20G0S_Y4w',
        6: '8wjY0q01uOk'
      };
      currentTrailerList.push(trailerMap[game.id] || 'uHGShqcAHlQ');
    }
  }

  currentTrailerIndex = 0;
  isTrailerInitialized = false;
  updateTrailerIframe();
}

function switchTrailerVideo(direction) {
  if (!currentTrailerList || currentTrailerList.length <= 1) return;
  currentTrailerIndex = (currentTrailerIndex + direction + currentTrailerList.length) % currentTrailerList.length;
  updateTrailerIframe(true);
}

function updateTrailerIframe(forceReload = false) {
  const iframe = document.getElementById('jd-video-iframe');
  const arrowsBox = document.getElementById('jd-video-arrows-box');
  const counterBadge = document.getElementById('jd-video-counter-badge');

  if (arrowsBox) {
    if (currentTrailerList.length > 1) {
      arrowsBox.style.display = 'flex';
      if (counterBadge) counterBadge.textContent = `${currentTrailerIndex + 1}/${currentTrailerList.length}`;
    } else {
      arrowsBox.style.display = 'none';
    }
  }

  if (iframe) {
    const videoId = currentTrailerList[currentTrailerIndex] || 'uHGShqcAHlQ';
    const targetSrc = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1`;
    if (!isTrailerInitialized || forceReload || iframe.getAttribute('data-video-id') !== videoId) {
      iframe.src = targetSrc;
      iframe.setAttribute('data-video-id', videoId);
      isTrailerInitialized = true;
    }
  }
}

// --- MODO ADMINISTRADOR: BOTÓN CON TUERCA ABAJO A LA IZQUIERDA Y MODAL QUICK-EDIT ---
function initAdminQuickGearButton() {
  const gearBtn = document.getElementById('admin-game-gear-btn');
  if (!gearBtn) return;

  const activeGame = (typeof currentDetailGame !== 'undefined' && currentDetailGame) ? currentDetailGame : (window.currentDetailGame || null);
  const savedUser = JSON.parse(localStorage.getItem('zonaswitch_user')) || (typeof currentUser !== 'undefined' ? currentUser : null);
  const isAdmin = savedUser && savedUser.role === 'admin';

  if (isAdmin && activeGame) {
    gearBtn.style.display = 'flex';
    gearBtn.onclick = () => openAdminQuickGameModal();
  } else {
    gearBtn.style.display = 'none';
  }

  const closeBtn = document.getElementById('close-admin-game-modal');
  if (closeBtn) {
    closeBtn.onclick = closeAdminQuickGameModal;
  }

  const form = document.getElementById('admin-quick-game-form');
  if (form) {
    form.onsubmit = handleAdminQuickGameSubmit;
  }
}
window.initAdminQuickGearButton = initAdminQuickGearButton;

function openAdminQuickGameModal() {
  if (!verifyAdminSecurity()) return;

  const modal = document.getElementById('admin-game-modal-backdrop');
  if (!modal || !currentDetailGame) return;

  document.getElementById('admin-quick-game-title').textContent = `Editar Juego: ${currentDetailGame.titulo}`;
  
  const secInp = document.getElementById('admin-qg-precio-secundaria');
  if (secInp) secInp.value = currentDetailGame.precioSecundaria || '';

  const primInp = document.getElementById('admin-qg-precio-primaria');
  if (primInp) primInp.value = currentDetailGame.precioPrimaria || '';

  const origInp = document.getElementById('admin-qg-precio-original');
  if (origInp) origInp.value = currentDetailGame.precioOriginal || (Number(currentDetailGame.precioSecundaria) * 1.5) || '';
  const stockSecInp=document.getElementById('admin-qg-stock-secundaria'); if(stockSecInp) stockSecInp.value=currentDetailGame.stockSecundaria ?? '';
  const stockPrimInp=document.getElementById('admin-qg-stock-primaria'); if(stockPrimInp) stockPrimInp.value=currentDetailGame.stockPrimaria ?? '';

  document.getElementById('admin-qg-imagen').value = currentDetailGame.imagen || '';
  document.getElementById('admin-qg-imagen-detalle').value = currentDetailGame.imagenDetalle || '';

  const trailersContainer = document.getElementById('admin-qg-trailers-container');
  if (trailersContainer) {
    trailersContainer.innerHTML = '';
    let trailers = [];
    if (Array.isArray(currentDetailGame.youtubeTrailers) && currentDetailGame.youtubeTrailers.length > 0) {
      trailers = currentDetailGame.youtubeTrailers;
    } else if (currentDetailGame.youtubeUrl || currentDetailGame.videoTrailerUrl) {
      trailers = [currentDetailGame.youtubeUrl || currentDetailGame.videoTrailerUrl];
    }
    if (trailers.length > 0) {
      trailers.forEach(t => addAdminQuickTrailerInput(t));
    } else {
      addAdminQuickTrailerInput();
    }
  }

  const extraContainer = document.getElementById('admin-qg-extra-images-container');
  extraContainer.innerHTML = '';

  const existingExtra = Array.isArray(currentDetailGame.imagenesDetalle) ? currentDetailGame.imagenesDetalle : [];
  if (existingExtra.length > 0) {
    existingExtra.forEach(img => addAdminQuickImageInput(img));
  } else {
    addAdminQuickImageInput();
  }

  modal.classList.add('active');
}

function closeAdminQuickGameModal() {
  const modal = document.getElementById('admin-game-modal-backdrop');
  if (modal) modal.classList.remove('active');
}

function addAdminQuickTrailerInput(val = '') {
  const container = document.getElementById('admin-qg-trailers-container');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'extra-trailer-row';
  div.style.cssText = 'display: flex; gap: 0.5rem; align-items: center;';
  div.innerHTML = `
    <input type="url" class="admin-extra-trailer-input" placeholder="https://www.youtube.com/watch?v=..." value="${escapeHTML(val)}" style="flex: 1; background: var(--bg-dark); border: 1px solid var(--border-subtle); color: #fff; padding: 0.55rem; border-radius: 4px;">
    <button type="button" onclick="this.parentElement.remove()" style="background: rgba(255,0,60,0.2); border: 1px solid var(--switch-red); color: var(--switch-red); padding: 0.55rem 0.75rem; border-radius: 4px; cursor: pointer; font-weight: bold; display: inline-flex; align-items: center;"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></button>
  `;
  container.appendChild(div);
}

function addAdminQuickImageInput(val = '') {
  const container = document.getElementById('admin-qg-extra-images-container');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'extra-img-row';
  div.style.cssText = 'display: flex; gap: 0.5rem; align-items: center;';
  div.innerHTML = `
    <input type="url" class="admin-extra-img-input" placeholder="https://..." value="${escapeHTML(val)}" style="flex: 1; background: var(--bg-dark); border: 1px solid var(--border-subtle); color: #fff; padding: 0.55rem; border-radius: 4px;">
    <button type="button" onclick="this.parentElement.remove()" style="background: rgba(255,0,60,0.2); border: 1px solid var(--switch-red); color: var(--switch-red); padding: 0.55rem 0.75rem; border-radius: 4px; cursor: pointer; font-weight: bold; display: inline-flex; align-items: center;"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></button>
  `;
  container.appendChild(div);
}

async function handleAdminQuickGameSubmit(e) {
  if (e) e.preventDefault();

  if (!verifyAdminSecurity()) return;
  if (!currentDetailGame) return;

  const secInp = document.getElementById('admin-qg-precio-secundaria');
  const primInp = document.getElementById('admin-qg-precio-primaria');
  const origInp = document.getElementById('admin-qg-precio-original');

  const precioSecundaria = secInp && secInp.value !== '' ? Number(secInp.value) : currentDetailGame.precioSecundaria;
  const precioPrimaria = primInp && primInp.value !== '' ? Number(primInp.value) : currentDetailGame.precioPrimaria;
  const precioOriginal = origInp && origInp.value !== '' ? Number(origInp.value) : currentDetailGame.precioOriginal;
  const stockSecundaria = document.getElementById('admin-qg-stock-secundaria')?.value ?? '';
  const stockPrimaria = document.getElementById('admin-qg-stock-primaria')?.value ?? '';

  const imagen = document.getElementById('admin-qg-imagen').value.trim();
  const imagenDetalle = document.getElementById('admin-qg-imagen-detalle').value.trim();
  
  const trailerInputs = document.querySelectorAll('.admin-extra-trailer-input');
  const youtubeTrailers = [];
  trailerInputs.forEach(inp => {
    const val = inp.value.trim();
    if (val) youtubeTrailers.push(val);
  });
  const youtubeUrl = youtubeTrailers.length > 0 ? youtubeTrailers[0] : '';
  const errorMsg = document.getElementById('admin-quick-game-error');
  if (errorMsg) errorMsg.textContent = '';

  const extraInputs = document.querySelectorAll('.admin-extra-img-input');
  const imagenesDetalle = [];
  extraInputs.forEach(inp => {
    const val = inp.value.trim();
    if (val) imagenesDetalle.push(val);
  });

  const saveBtn = document.getElementById('save-admin-quick-game-btn');
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.textContent = 'Guardando...';
  }

  try {
    const res = await apiFetch('/api/admin/juegos/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gameId: currentDetailGame.id,
        precioSecundaria,
        precioPrimaria,
        precioOriginal,
        stockSecundaria,
        stockPrimaria,
        imagen,
        imagenDetalle,
        imagenesDetalle,
        youtubeUrl,
        youtubeTrailers
      })
    });

    const data = await res.json();
    if (!res.ok || !data.exito) {
      if (res.status === 401 || res.status === 403) {
        triggerSecurityViolation();
        return;
      }
      if (errorMsg) errorMsg.textContent = data.error || 'Error al actualizar juego.';
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Guardar Cambios en Juego';
      }
      return;
    }

      currentDetailGame.precioSecundaria = precioSecundaria;
      currentDetailGame.precioPrimaria = precioPrimaria;
      currentDetailGame.precioOriginal = precioOriginal;
      currentDetailGame.stockSecundaria = stockSecundaria === '' ? currentDetailGame.stockSecundaria : Number(stockSecundaria);
      currentDetailGame.stockPrimaria = stockPrimaria === '' ? currentDetailGame.stockPrimaria : Number(stockPrimaria);
      currentDetailGame.imagen = imagen;
      currentDetailGame.imagenDetalle = imagenDetalle;
      currentDetailGame.imagenesDetalle = imagenesDetalle;
      currentDetailGame.youtubeUrl = youtubeUrl;
      currentDetailGame.youtubeTrailers = youtubeTrailers;

    if (Array.isArray(catalog)) {
      const catGame = catalog.find(g => g.id === currentDetailGame.id);
      if (catGame) {
        Object.assign(catGame, currentDetailGame);
      }
    }

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

    detailActiveThumbIndex = 0;
    renderGameDetailView();
    if (typeof renderCatalog === 'function') renderCatalog();
    closeAdminQuickGameModal();
    showToast('¡Precios, imágenes y tráiler actualizados con éxito! ⚙️💰');
  } catch (err) {
    if (errorMsg) errorMsg.textContent = 'Error de conexión con el servidor.';
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Guardar Cambios en Juego';
    }
  }
}

// Auto-refrescar datos del juego al volver a la pestaña sin necesidad de Control + F5
window.addEventListener('focus', () => {
  if (typeof initJuegoPage === 'function') initJuegoPage();
});
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && typeof initJuegoPage === 'function') {
    initJuegoPage();
  }
});

