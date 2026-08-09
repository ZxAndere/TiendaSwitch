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
  initAdminQuickGearButton();
}

function renderGameDetailView() {
  if (!currentDetailGame) return;

  const game = currentDetailGame;

  // Breadcrumbs
  const crumbCat = document.getElementById('jd-crumb-category');
  if (crumbCat) crumbCat.textContent = game.categoria || 'Nintendo';

  const crumbTitle = document.getElementById('jd-crumb-title');
  if (crumbTitle) crumbTitle.textContent = game.titulo;

  // Hero Media
  const heroImg = document.getElementById('jd-hero-img');
  if (heroImg) {
    heroImg.src = detailImagesList[detailActiveThumbIndex] || game.imagen;
    heroImg.alt = game.titulo;
  }

  // Badge de descuento animado
  const orig = Number(game.precioOriginal) || (Number(game.precioSecundaria) * 1.5);
  const cur = Number(game.precioSecundaria) || 10000;
  const pct = Math.max(10, Math.round(((orig - cur) / orig) * 100));

  const discBadge = document.getElementById('jd-discount-badge');
  if (discBadge) discBadge.textContent = `-${pct}% OFF`;

  const sizeBadge = document.getElementById('jd-hero-size-badge');
  if (sizeBadge) sizeBadge.textContent = `📦 ${game.peso || '15 GB'}`;

  const ratingElem = document.getElementById('jd-hero-rating-badge');
  if (ratingElem) ratingElem.style.display = 'none';

  // Tira de miniaturas
  const strip = document.getElementById('jd-thumbnails-strip');
  if (strip) {
    strip.innerHTML = detailImagesList.map((imgUrl, idx) => `
      <div class="jd-thumb-item ${idx === detailActiveThumbIndex ? 'active' : ''}" onclick="selectDetailThumbnail(${idx})">
        <img src="${escapeHTML(imgUrl)}" alt="Captura ${idx + 1}">
      </div>
    `).join('');
  }

  // Encabezado
  const catTag = document.getElementById('jd-category-tag');
  if (catTag) catTag.textContent = game.categoria || 'Nintendo Switch';

  const titleEl = document.getElementById('jd-title');
  if (titleEl) titleEl.textContent = game.titulo;

  const pesoVal = document.getElementById('jd-peso-val');
  if (pesoVal) pesoVal.textContent = game.peso || '15 GB';

  const ratingVal = document.getElementById('jd-rating-val');
  if (ratingVal && ratingVal.parentElement) ratingVal.parentElement.style.display = 'none';

  // Precios y Ahorro
  const selectedPrice = currentSelectedLicense === 'primaria' ? game.precioPrimaria : game.precioSecundaria;
  const convertedCurrent = formatCLP(selectedPrice);
  const convertedOld = formatCLP(orig);
  const savingsAmount = Math.max(0, orig - selectedPrice);

  const priceCur = document.getElementById('jd-price-current');
  if (priceCur) priceCur.textContent = convertedCurrent;

  const priceOld = document.getElementById('jd-price-old');
  if (priceOld) priceOld.textContent = convertedOld;

  const savingsTag = document.getElementById('jd-savings-tag');
  if (savingsTag) savingsTag.textContent = `¡Ahorras ${formatCLP(savingsAmount)} (${pct}% OFF)!`;

  // Precios en las tarjetas de licencias
  const licPriceSec = document.getElementById('jd-lic-price-sec');
  if (licPriceSec) licPriceSec.textContent = formatCLP(game.precioSecundaria);

  const licPricePrim = document.getElementById('jd-lic-price-prim');
  if (licPricePrim) licPricePrim.textContent = formatCLP(game.precioPrimaria);

  // Acordeón texto
  updateLicenseAccordionContent();

  // Tabs contenido
  const descContent = document.getElementById('jd-desc-content');
  if (descContent) {
    descContent.innerHTML = `
      <p style="margin-bottom: 1rem;">${escapeHTML(game.resumenExtenso || game.descripcion || '')}</p>
      <p>Disfruta de la máxima calidad de Nintendo Switch en formato digital. Con tu compra obtienes acceso inmediato a los servidores oficiales de Nintendo eShop con garantía de uso permanente ZonaSwitchChile.</p>
    `;
  }

  const specSize = document.getElementById('jd-spec-size');
  if (specSize) specSize.textContent = game.peso || '15 GB';

  const specCat = document.getElementById('jd-spec-category');
  if (specCat) specCat.textContent = game.categoria || 'Acción / Aventura';

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

  renderGameDetailView();
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
          <li>🌐 <strong>Multijugador Online:</strong> Compatible 100% con tu suscripción a Nintendo Switch Online.</li>
          <li>🛡️ <strong>Garantía VIP:</strong> Licencia permanente con garantía de por vida ZonaSwitchChile.</li>
        </ul>
      `;
    }
  }
}

function handleAddDetailToCart() {
  if (!currentDetailGame) return;
  addGameWithLicenseToCart(currentDetailGame, currentSelectedLicense);
  openCartDrawer();
}

function handleDirectDetailCheckout() {
  if (!currentDetailGame) return;
  addGameWithLicenseToCart(currentDetailGame, currentSelectedLicense);
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
  if (!container || !currentDetailGame || !Array.isArray(catalog)) return;

  const otherGames = catalog.filter(g => g.id !== currentDetailGame.id && g.visible !== false);
  if (otherGames.length === 0) return;

  // Seleccionar 4 juegos al azar del catálogo existente
  const shuffled = [...otherGames].sort(() => 0.5 - Math.random());
  const displayList = shuffled.slice(0, 4);

  container.innerHTML = displayList.map(g => {
    const orig = Number(g.precioOriginal) || (Number(g.precioSecundaria) * 1.5);
    const cur = Number(g.precioSecundaria);
    return `
      <article class="game-card in-view" onclick="window.location.href='juego.html?id=${g.id}'">
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
              <span class="original-price">${formatCLP(orig)}</span>
              <span class="current-price">${formatCLP(cur)}</span>
            </div>
            <button class="btn-card-buy" type="button">Ver Detalle →</button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function parseYouTubeEmbedUrl(url) {
  if (!url) return null;
  let videoId = '';
  try {
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0].split('&')[0];
    } else if (url.includes('youtube.com/watch')) {
      const u = new URL(url);
      videoId = u.searchParams.get('v');
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('youtube.com/embed/')[1].split('?')[0];
    } else if (url.includes('youtube.com/shorts/')) {
      videoId = url.split('youtube.com/shorts/')[1].split('?')[0];
    }
  } catch (e) {}

  if (videoId) {
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
  }
  return url;
}

function openTrailerModal(game) {
  const modal = document.getElementById('trailer-modal-backdrop');
  const wrapper = document.getElementById('trailer-video-wrapper');
  if (!modal || !wrapper) return;

  const customYt = parseYouTubeEmbedUrl(game.youtubeUrl || game.videoTrailerUrl);

  const trailerMap = {
    1: 'https://www.youtube-nocookie.com/embed/uHGShqcAHlQ?autoplay=1', // Zelda TOTK
    2: 'https://www.youtube-nocookie.com/embed/JStAYvbe_3s?autoplay=1', // Mario Wonder
    3: 'https://www.youtube-nocookie.com/embed/tKlRN2YpxRE?autoplay=1', // Mario Kart 8 Deluxe
    4: 'https://www.youtube-nocookie.com/embed/WShCN-AYHqA?autoplay=1', // Smash Ultimate
    5: 'https://www.youtube-nocookie.com/embed/7V20G0S_Y4w?autoplay=1', // Pokémon Escarlata
    6: 'https://www.youtube-nocookie.com/embed/8wjY0q01uOk?autoplay=1'  // Metroid Dread
  };

  const videoUrl = customYt || trailerMap[game.id] || 'https://www.youtube-nocookie.com/embed/uHGShqcAHlQ?autoplay=1';

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

// --- MODO ADMINISTRADOR: BOTÓN CON TUERCA ABAJO A LA IZQUIERDA Y MODAL QUICK-EDIT ---
function initAdminQuickGearButton() {
  const gearBtn = document.getElementById('admin-game-gear-btn');
  if (!gearBtn) return;

  const savedUser = JSON.parse(localStorage.getItem('zonaswitch_user')) || currentUser;
  const isAdmin = savedUser && (savedUser.role === 'admin' || (savedUser.username && savedUser.username.toLowerCase() === 'zxandere'));

  if (isAdmin && currentDetailGame) {
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
  document.getElementById('admin-qg-imagen').value = currentDetailGame.imagen || '';
  document.getElementById('admin-qg-imagen-detalle').value = currentDetailGame.imagenDetalle || '';
  document.getElementById('admin-qg-youtube').value = currentDetailGame.youtubeUrl || currentDetailGame.videoTrailerUrl || '';

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

function addAdminQuickImageInput(val = '') {
  const container = document.getElementById('admin-qg-extra-images-container');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'extra-img-row';
  div.style.cssText = 'display: flex; gap: 0.5rem; align-items: center;';
  div.innerHTML = `
    <input type="url" class="admin-extra-img-input" placeholder="https://..." value="${escapeHTML(val)}" style="flex: 1; background: var(--bg-dark); border: 1px solid var(--border-subtle); color: #fff; padding: 0.55rem; border-radius: 4px;">
    <button type="button" onclick="this.parentElement.remove()" style="background: rgba(255,0,60,0.2); border: 1px solid var(--switch-red); color: var(--switch-red); padding: 0.55rem 0.75rem; border-radius: 4px; cursor: pointer; font-weight: bold;">🗑️</button>
  `;
  container.appendChild(div);
}

async function handleAdminQuickGameSubmit(e) {
  if (e) e.preventDefault();

  if (!verifyAdminSecurity()) return;
  if (!currentDetailGame) return;

  const imagen = document.getElementById('admin-qg-imagen').value.trim();
  const imagenDetalle = document.getElementById('admin-qg-imagen-detalle').value.trim();
  const youtubeUrl = document.getElementById('admin-qg-youtube').value.trim();
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
        imagen,
        imagenDetalle,
        imagenesDetalle,
        youtubeUrl
      })
    });

    const data = await res.json();
    if (!res.ok || !data.exito) {
      if (res.status === 401 || res.status === 403) {
        triggerSecurityViolation();
        return;
      }
      if (errorMsg) errorMsg.textContent = data.error || 'Error al actualizar juego.';
      return;
    }

    if (data.juego) {
      currentDetailGame = data.juego;
    } else {
      currentDetailGame.imagen = imagen;
      currentDetailGame.imagenDetalle = imagenDetalle;
      currentDetailGame.imagenesDetalle = imagenesDetalle;
      currentDetailGame.youtubeUrl = youtubeUrl;
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
    closeAdminQuickGameModal();
    showToast('¡Imágenes y tráiler del juego actualizados con éxito! ⚙️🎉');
  } catch (err) {
    if (errorMsg) errorMsg.textContent = 'Error de conexión con el servidor.';
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = '💾 Guardar Cambios en Juego';
    }
  }
}

