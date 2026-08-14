/* ==========================================================================
   ZonaSwitch Admin — Panel de administración (admin.html)
   Vanilla JS, sin dependencias. Todos los textos en español.
   ========================================================================== */
'use strict';

/* ==========================================================================
   HELPERS
   ========================================================================== */

function escapeHTML(str) {
  return String(str == null ? '' : str).replace(/[&<>'"]/g,
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* Mismo comportamiento que formatCLP del sitio con moneda CLP */
function formatCLP(num) {
  const n = Number(num);
  if (num === null || num === undefined || num === '' || isNaN(n)) return '$0 CLP';
  return '$' + Math.round(n).toLocaleString('es-CL') + ' CLP';
}

function formatFecha(f) {
  if (f === null || f === undefined || f === '') return '—';
  const d = new Date(f);
  if (isNaN(d.getTime())) return escapeHTML(String(f));
  return d.toLocaleString('es-CL', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

/* Iconos Lucide inline (stroke currentColor, 24×24, stroke-width 2, sin fill) */
const ICONS = {
  dashboard: '<rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path>',
  gamepad: '<line x1="6" x2="10" y1="11" y2="11"></line><line x1="8" x2="8" y1="9" y2="13"></line><line x1="15" x2="15.01" y1="12" y2="12"></line><line x1="18" x2="18.01" y1="10" y2="10"></line><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"></path>',
  ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2"></path>',
  image: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
  settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle>',
  search: '<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>',
  refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path>',
  plus: '<path d="M5 12h14"></path><path d="M12 5v14"></path>',
  more: '<circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>',
  pencil: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path>',
  trash: '<path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>',
  x: '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path>',
  eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>',
  clock: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
  package: '<path d="M16.5 9.4 7.55 4.24"></path><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="M3.29 7 12 12l8.71-5"></path><path d="M12 22V12"></path>',
  chevLeft: '<path d="m15 18-6-6 6-6"></path>',
  chevRight: '<path d="m9 18 6-6-6-6"></path>',
  chevUp: '<path d="m18 15-6-6-6 6"></path>',
  chevDown: '<path d="m6 9 6 6 6-6"></path>',
  chevronsLeft: '<path d="m11 17-5-5 5-5"></path><path d="m18 17-5-5 5-5"></path>',
  chevronsRight: '<path d="m6 17 5-5-5-5"></path><path d="m13 17 5-5-5-5"></path>',
  check: '<path d="M20 6 9 17l-5-5"></path>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>',
  wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>',
  star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line>'
};

function icon(name, size = 18) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

/* ==========================================================================
   FETCH WRAPPER — Bearer token + no-cache. Solo 401 redirige (la sesión murió).
   Un 403 se devuelve al caller: puede ser "no eres el titular de la orden"
   (retry-payment) y debe mostrarse su error, no expulsar del panel.
   ========================================================================== */
async function apiFetch(path, opts = {}) {
  const headers = Object.assign({ 'Cache-Control': 'no-cache, no-store' }, opts.headers || {});
  const token = localStorage.getItem('userToken');
  if (token) headers['Authorization'] = 'Bearer ' + token;
  if (opts.body !== undefined && !headers['Content-Type']) headers['Content-Type'] = 'application/json';
  const res = await fetch(path, Object.assign({}, opts, { headers }));
  if (res.status === 401) {
    window.location.href = '/';
    throw new Error('Sesión expirada');
  }
  return res;
}

async function readError(res) {
  try {
    const d = await res.json();
    return d && d.error ? d.error : 'Error inesperado.';
  } catch (e) {
    return 'Error inesperado.';
  }
}

/* ==========================================================================
   TOAST — banner fino top-center (estilo iOS del sitio)
   ========================================================================== */
let toastTimer = null;

function showToast(message, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = message;
  t.className = 'toast show' + (type === 'error' ? ' toast-error' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    t.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   ESTADO
   ========================================================================== */
const PAGE_SIZES = [10, 20, 50, 100];
const DEFAULT_PAGE_SIZE = 20;
const state = {
  user: null,
  view: 'juegos',
  /* Tamaño de página compartido entre tablas, persistido */
  pageSize: (() => {
    try {
      const v = Number(localStorage.getItem('zonaswitch_admin_pagesize'));
      return PAGE_SIZES.includes(v) ? v : DEFAULT_PAGE_SIZE;
    } catch (e) {
      return DEFAULT_PAGE_SIZE;
    }
  })(),
  games: [],
  gamesLoaded: false,
  gamesQuery: '',
  gamesSort: { key: null, dir: 1 },
  gamesPage: 1,
  /* Selección masiva de juegos (ids); sobrevive búsqueda/orden/paginación */
  selectedGames: new Set(),
  currentGamePage: [],
  orders: [],
  ordersLoaded: false,
  ordersQuery: '',
  ordersStatus: '',
  ordersPage: 1,
  ordersTimer: null,
  editingGameId: null,
  detailOrder: null,
  dash: { orders: [], games: [], users: [], coupons: [], audit: [], analytics: null, loaded: false },
  coupons: [],
  couponsLoaded: false,
  gallery: [],
  galleryLoaded: false,
  galleryEnabled: false,
  users: [],
  usersLoaded: false,
  importPayload: null,
  importPreview: null,
  importTimer: null,
  sysChecked: false
};

/* ==========================================================================
   NAVEGACIÓN
   ========================================================================== */
const NAV_GROUPS = [
  { id: 'panel', label: 'Panel' },
  { id: 'ventas', label: 'Ventas' },
  { id: 'catalogo', label: 'Catálogo' },
  { id: 'sistema', label: 'Sistema' }
];

const NAV_ITEMS = [
  { view: 'dashboard', label: 'Dashboard', icon: 'dashboard', group: 'panel' },
  { view: 'pedidos', label: 'Pedidos', icon: 'bag', group: 'ventas' },
  { view: 'juegos', label: 'Juegos', icon: 'gamepad', group: 'catalogo' },
  { view: 'cupones', label: 'Cupones', icon: 'ticket', group: 'catalogo' },
  { view: 'galeria', label: 'Galería de Clientes', icon: 'image', group: 'catalogo' },
  { view: 'usuarios', label: 'Usuarios', icon: 'users', group: 'sistema' },
  { view: 'ajustes', label: 'Ajustes', icon: 'settings', group: 'sistema' }
];

const VIEW_META = {
  dashboard: { title: 'Dashboard', sub: 'Resumen de la tienda' },
  juegos: { title: 'Juegos', sub: 'Catálogo completo de la tienda' },
  pedidos: { title: 'Pedidos', sub: 'Todas las órdenes de la tienda' },
  cupones: { title: 'Cupones', sub: 'Códigos de descuento' },
  galeria: { title: 'Galería de Clientes', sub: 'Fotos enviadas por clientes' },
  usuarios: { title: 'Usuarios', sub: 'Cuentas y roles' },
  ajustes: { title: 'Ajustes', sub: 'Configuración de la tienda' }
};

function renderNav() {
  const sidebar = document.getElementById('sidebar-nav');
  let html = '';
  NAV_GROUPS.forEach(group => {
    const items = NAV_ITEMS.filter(i => i.group === group.id);
    if (!items.length) return;
    html += `<span class="nav-group-label">${escapeHTML(group.label)}</span>`;
    items.forEach(i => {
      html += `<button type="button" class="nav-btn" data-action="nav" data-view="${i.view}" title="${escapeHTML(i.label)}">${icon(i.icon, 18)}<span class="nav-label">${escapeHTML(i.label)}</span></button>`;
    });
  });
  sidebar.innerHTML = html;

  const mobile = document.getElementById('mobile-nav');
  mobile.innerHTML = NAV_ITEMS.map(i =>
    `<button type="button" class="nav-btn" data-action="nav" data-view="${i.view}">${icon(i.icon, 16)}<span class="nav-label">${escapeHTML(i.label)}</span></button>`
  ).join('');
}

function switchView(view) {
  state.view = view;
  /* La selección de juegos es específica de la vista: se limpia al cambiar */
  state.selectedGames.clear();
  state.currentGamePage = [];
  document.querySelectorAll('.view').forEach(v => {
    v.hidden = v.id !== 'view-' + view;
  });
  document.querySelectorAll('[data-action="nav"]').forEach(b => {
    const active = b.dataset.view === view;
    b.classList.toggle('active', active);
    if (active) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  });
  const meta = VIEW_META[view] || { title: view, sub: '' };
  document.getElementById('topbar-title').textContent = meta.title;
  document.getElementById('topbar-subtitle').textContent = meta.sub;
  if (view === 'juegos') {
    ensureGames();
    if (state.gamesLoaded) renderGames();
  } else if (view === 'pedidos') ensureOrders();
  else if (view === 'dashboard') ensureDash();
  else if (view === 'cupones') ensureCoupons();
  else if (view === 'galeria') ensureGallery();
  else if (view === 'usuarios') ensureUsers();
  else if (view === 'ajustes') ensureSystemStatus();
}

function ensureGames() {
  if (!state.gamesLoaded) fetchGames();
}

function ensureOrders() {
  if (!state.ordersLoaded) fetchOrders();
}

function ensureDash() {
  if (!state.dash.loaded) fetchDash();
}

function ensureCoupons() {
  if (!state.couponsLoaded) fetchCouponsAdmin();
}

function ensureGallery() {
  if (!state.galleryLoaded) fetchGallery();
}

function ensureUsers() {
  if (!state.usersLoaded) fetchUsers();
}

/* ==========================================================================
   SIDEBAR RAIL
   ========================================================================== */
function setRailIcon(rail) {
  const btn = document.getElementById('rail-toggle');
  btn.innerHTML = icon(rail ? 'chevronsRight' : 'chevronsLeft', 18);
  btn.setAttribute('aria-label', rail ? 'Expandir menú' : 'Colapsar menú');
  btn.setAttribute('title', rail ? 'Expandir menú' : 'Colapsar menú');
}

function bindRail() {
  let rail = '0';
  try {
    rail = localStorage.getItem('zonaswitch_admin_rail') === '1' ? '1' : '0';
  } catch (e) {}
  document.body.dataset.rail = rail;
  setRailIcon(rail === '1');
}

function toggleRail() {
  const rail = document.body.dataset.rail !== '1';
  document.body.dataset.rail = rail ? '1' : '0';
  try {
    localStorage.setItem('zonaswitch_admin_rail', rail ? '1' : '0');
  } catch (e) {}
  setRailIcon(rail);
}

/* ==========================================================================
   TABLA — piezas compartidas
   ========================================================================== */
function skeletonRows(count, cols) {
  let out = '';
  for (let i = 0; i < count; i++) {
    out += '<tr>';
    for (let c = 0; c < cols; c++) {
      out += `<td><span class="skeleton-line${c === 0 ? ' wide' : ''}"></span></td>`;
    }
    out += '</tr>';
  }
  return out;
}

function tableEmpty(colspan, title, hint) {
  return `<tr><td colspan="${colspan}"><div class="empty-state empty-inline"><span class="empty-icon" aria-hidden="true">${icon('package', 24)}</span><h3>${escapeHTML(title)}</h3><p>${escapeHTML(hint)}</p></div></td></tr>`;
}

function renderPagination(containerId, page, total) {
  const el = document.getElementById(containerId);
  if (!total) {
    el.innerHTML = '';
    el.style.display = 'none';
    return;
  }
  el.style.display = '';
  const pages = Math.ceil(total / state.pageSize);
  const from = (page - 1) * state.pageSize + 1;
  const to = Math.min(page * state.pageSize, total);
  const sizeOptions = PAGE_SIZES.map(s =>
    `<option value="${s}"${s === state.pageSize ? ' selected' : ''}>${s} por página</option>`
  ).join('');
  el.innerHTML = `
    <div class="page-left">
      <span class="page-info">Mostrando ${from}–${to} de ${total}</span>
      <select class="toolbar-select page-size-select" data-action="page-size" aria-label="Tamaño de página">${sizeOptions}</select>
    </div>
    <div class="page-btns">
      <button type="button" class="btn-ghost" data-action="page-prev" ${page <= 1 ? 'disabled' : ''}>${icon('chevLeft', 14)} Anterior</button>
      <button type="button" class="btn-ghost" data-action="page-next" ${page >= pages ? 'disabled' : ''}>Siguiente ${icon('chevRight', 14)}</button>
    </div>`;
}

function gotoPage(delta) {
  if (state.view === 'juegos') {
    state.gamesPage += delta;
    renderGames();
  } else if (state.view === 'pedidos') {
    state.ordersPage += delta;
    renderOrders();
  }
}

/* ==========================================================================
   CHIPS DE ESTADO
   ========================================================================== */
const CHIP_CLASSES = {
  pendiente: 'chip-pendiente',
  pagada: 'chip-pagada',
  rechazada: 'chip-rechazada',
  cancelada: 'chip-cancelada',
  reembolsada: 'chip-reembolsada'
};

function statusChip(st) {
  const s = String(st || '').toLowerCase();
  const cls = CHIP_CLASSES[s] || 'chip-cancelada';
  return `<span class="chip ${cls}">${escapeHTML(s || 'sin estado')}</span>`;
}

/* Stock: null/ausente = ilimitado; entero ≤ 0 = agotado */
function stockCell(s) {
  if (s === null || s === undefined || s === '') return '<span class="stock-unlimited">∞</span>';
  const n = Number(s);
  if (!Number.isInteger(n) || n <= 0) return `<span class="chip chip-agotado">${icon('alert', 12)} agotado</span>`;
  return escapeHTML(String(n));
}

/* ==========================================================================
   VISTA: JUEGOS
   ========================================================================== */
async function fetchGames() {
  const tb = document.getElementById('games-tbody');
  document.getElementById('games-count').textContent = '';
  tb.innerHTML = skeletonRows(5, 10);
  try {
    const res = await apiFetch('/api/admin/juegos');
    if (!res.ok) {
      showToast(await readError(res), 'error');
      tb.innerHTML = tableEmpty(10, 'No se pudieron cargar los juegos.', 'Usa el botón Actualizar para reintentar.');
      return;
    }
    state.games = await res.json();
    state.gamesLoaded = true;
    renderGames();
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') {
      tb.innerHTML = tableEmpty(10, 'No se pudieron cargar los juegos.', 'Error de comunicación con el servidor.');
    }
  }
}

function filteredGames() {
  const q = state.gamesQuery.trim().toLowerCase();
  if (!q) return state.games;
  return state.games.filter(g =>
    String(g.titulo || '').toLowerCase().includes(q) ||
    String(g.categoria || '').toLowerCase().includes(q)
  );
}

function sortGames(list) {
  const { key, dir } = state.gamesSort;
  if (!key) return list;
  return [...list].sort((a, b) => {
    if (key === 'titulo' || key === 'categoria') {
      return String(a[key] || '').toLowerCase().localeCompare(String(b[key] || '').toLowerCase(), 'es') * dir;
    }
    if (key === 'createdAt') {
      /* Sin fecha: siempre al final, en ambos sentidos */
      const ha = !!(a[key] && !isNaN(new Date(a[key]).getTime()));
      const hb = !!(b[key] && !isNaN(new Date(b[key]).getTime()));
      if (ha && hb) return (new Date(a[key]).getTime() - new Date(b[key]).getTime()) * dir;
      if (ha) return -1;
      if (hb) return 1;
      return 0;
    }
    const va = (a[key] === null || a[key] === undefined || a[key] === '') ? Infinity : Number(a[key]);
    const vb = (b[key] === null || b[key] === undefined || b[key] === '') ? Infinity : Number(b[key]);
    return (va - vb) * dir;
  });
}

function sortHeader(key, label, align = '') {
  const active = state.gamesSort.key === key;
  const arrow = active
    ? (state.gamesSort.dir > 0 ? icon('chevUp', 13) : icon('chevDown', 13))
    : `<span class="sort-idle">${icon('chevUp', 10)}${icon('chevDown', 10)}</span>`;
  const ariaSort = active ? (state.gamesSort.dir > 0 ? 'ascending' : 'descending') : 'none';
  return `<th scope="col" class="${align}" aria-sort="${ariaSort}"><button type="button" class="th-sort${active ? ' active' : ''}" data-action="sort" data-key="${key}">${escapeHTML(label)} ${arrow}</button></th>`;
}

function gamesThead() {
  return `<tr>
    <th scope="col" class="col-check"><input type="checkbox" id="select-all-games" class="row-check" aria-label="Seleccionar todos"></th>
    ${sortHeader('titulo', 'Juego')}
    ${sortHeader('categoria', 'Categoría')}
    ${sortHeader('createdAt', 'Creado')}
    ${sortHeader('precioSecundaria', 'Sec', 'num')}
    <th scope="col" class="num">Prim</th>
    ${sortHeader('stockSecundaria', 'Stock S', 'num')}
    <th scope="col" class="num">Stock P</th>
    <th scope="col">Estado</th>
    <th scope="col">Acciones</th>
  </tr>`;
}

function gamesRow(g) {
  const deleted = !!g.deletedAt;
  const title = escapeHTML(g.titulo || 'Sin título');
  const ariaTitle = escapeHTML(g.titulo || '');
  const deletedChip = deleted ? '<span class="chip chip-cancelada">Desactivado</span>' : '';
  return `<tr class="${deleted ? 'row-deleted' : ''}">
    <td data-label="Seleccionar" class="col-check">
      <input type="checkbox" class="row-check" data-action="toggle-select" data-id="${g.id}" ${state.selectedGames.has(g.id) ? 'checked' : ''} aria-label="Seleccionar ${ariaTitle}">
    </td>
    <td data-label="Juego"><div class="cell-game">
      <img class="game-thumb" src="${escapeHTML(g.imagen || '')}" alt="" loading="lazy" onerror="this.classList.add('thumb-broken')">
      <div class="cell-game-txt">
        <span class="cell-title" title="${ariaTitle}">${title}</span>
        ${deletedChip}
      </div>
    </div></td>
    <td data-label="Categoría">${escapeHTML(g.categoria || '—')}</td>
    <td data-label="Creado">${g.createdAt ? formatFecha(g.createdAt) : '—'}</td>
    <td data-label="Sec" class="num">${formatCLP(g.precioSecundaria)}</td>
    <td data-label="Prim" class="num">${formatCLP(g.precioPrimaria)}</td>
    <td data-label="Stock S" class="num">${stockCell(g.stockSecundaria)}</td>
    <td data-label="Stock P" class="num">${stockCell(g.stockPrimaria)}</td>
    <td data-label="Estado">
      <label class="switch" title="${g.visible ? 'Visible en la tienda' : 'Oculto en la tienda'}">
        <input type="checkbox" data-action="toggle-visibility" data-id="${g.id}" ${g.visible ? 'checked' : ''} aria-label="Mostrar u ocultar ${ariaTitle} en la tienda">
        <span class="slider"></span>
      </label>
      <span class="switch-label">${g.visible ? 'Visible' : 'Oculto'}</span>
    </td>
    <td data-label="Acciones" class="cell-actions">
      <button type="button" class="btn-ghost" data-action="edit-game" data-id="${g.id}">${icon('pencil', 14)}<span>Editar</span></button>
      <button type="button" class="icon-btn" data-action="kebab" data-id="${g.id}" aria-haspopup="menu" aria-expanded="false" aria-label="Acciones de ${ariaTitle}">${icon('more', 18)}</button>
    </td>
  </tr>`;
}

function renderGames() {
  const list = sortGames(filteredGames());
  const pages = Math.max(1, Math.ceil(list.length / state.pageSize));
  if (state.gamesPage > pages) state.gamesPage = pages;
  const pageList = list.slice((state.gamesPage - 1) * state.pageSize, state.gamesPage * state.pageSize);
  state.currentGamePage = pageList;
  document.getElementById('games-count').textContent = list.length ? `${list.length} juegos` : '';
  document.getElementById('games-thead').innerHTML = gamesThead();
  const tb = document.getElementById('games-tbody');
  if (!pageList.length) {
    tb.innerHTML = tableEmpty(10, 'No se encontraron juegos.',
      list.length ? 'Prueba con otro término de búsqueda.' : 'Crea tu primer juego con el botón "Crear Juego".');
  } else {
    tb.innerHTML = pageList.map(gamesRow).join('');
  }
  renderPagination('games-pagination', state.gamesPage, list.length);
  syncSelectAll(pageList.map(g => g.id));
  renderSelectionBar();
  buildCategoriasList();
}

/* --- Selección masiva --- */
function syncSelectAll(pageIds) {
  const el = document.getElementById('select-all-games');
  if (!el) return;
  const sel = pageIds.filter(id => state.selectedGames.has(id)).length;
  el.checked = pageIds.length > 0 && sel === pageIds.length;
  el.indeterminate = sel > 0 && sel < pageIds.length;
}

function renderSelectionBar() {
  const bar = document.getElementById('selection-bar');
  const n = state.selectedGames.size;
  bar.hidden = n === 0;
  document.getElementById('bulk-progress').hidden = true;
  if (n) document.getElementById('selection-count').textContent = `${n} juegos seleccionados`;
}

function setBulkBusy(busy, label) {
  const progress = document.getElementById('bulk-progress');
  progress.hidden = !busy;
  if (busy) progress.textContent = label;
  document.querySelectorAll('#selection-bar button').forEach(b => { b.disabled = busy; });
}

/* Ejecuta una petición por id; acumula errores y la última lista de juegos */
async function bulkApiLoop(ids, fn, onProgress) {
  const errors = [];
  let lastJuegos = null;
  for (let i = 0; i < ids.length; i++) {
    if (onProgress) onProgress(i + 1);
    try {
      const res = await fn(ids[i]);
      const d = await res.json().catch(() => ({}));
      if (!res.ok) errors.push({ id: ids[i], error: d.error || 'Error' });
      else if (Array.isArray(d.juegos)) lastJuegos = d.juegos;
    } catch (err) {
      if (String(err.message) === 'Sesión expirada') throw err;
      errors.push({ id: ids[i], error: 'Error de comunicación' });
    }
  }
  return { errors, lastJuegos };
}

/* Cierre común: sin errores → limpiar selección + toast de éxito;
   con errores → conservar selección + toast con el primer error. */
function finishBulkOp(total, errors, okMessage) {
  if (!errors.length) {
    state.selectedGames.clear();
    renderGames();
    showToast(okMessage);
  } else {
    const ok = total - errors.length;
    showToast(`${ok} de ${total} completados. Error: ${errors[0].error}`, 'error');
    renderGames();
  }
}

async function bulkToggleVisibility(visible) {
  const ids = [...state.selectedGames];
  const n = ids.length;
  if (!n) return;
  setBulkBusy(true, `Procesando 0 de ${n}…`);
  try {
    const result = await bulkApiLoop(ids, id =>
      apiFetch('/api/admin/juegos/toggle', {
        method: 'POST',
        body: JSON.stringify({ gameId: id, visible })
      }),
      done => setBulkProgress(`Procesando ${done} de ${n}…`)
    );
    if (result.lastJuegos) state.games = result.lastJuegos;
    finishBulkOp(n, result.errors, `${n} juegos actualizados.`);
  } catch (err) {
    if (String(err.message) === 'Sesión expirada') return;
    setBulkBusy(false);
    showToast('Error de comunicación con el servidor.', 'error');
  }
}

function setBulkProgress(label) {
  const p = document.getElementById('bulk-progress');
  p.textContent = label;
}

function openBulkEditModal() {
  const n = state.selectedGames.size;
  if (!n) return;
  document.getElementById('bulk-hint').textContent =
    `Los campos vacíos no se modifican. Se aplicará a ${n} juegos seleccionados.`;
  ['be-sec', 'be-prim', 'be-stock-sec', 'be-stock-prim'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('be-visible').value = '';
  document.getElementById('bulk-form-error').hidden = true;
  document.querySelectorAll('#bulk-modal .field').forEach(f => f.classList.remove('invalid'));
  document.querySelectorAll('#bulk-modal .field-err').forEach(e => (e.textContent = ''));
  openModal('bulk-modal');
}

async function bulkEditApply() {
  const ids = [...state.selectedGames];
  const n = ids.length;
  if (!n) {
    closeModal('bulk-modal');
    return;
  }
  const sec = document.getElementById('be-sec').value.trim();
  const prim = document.getElementById('be-prim').value.trim();
  const stockSec = document.getElementById('be-stock-sec').value.trim();
  const stockPrim = document.getElementById('be-stock-prim').value.trim();
  const vis = document.getElementById('be-visible').value;

  const errs = {};
  const intOk = v => v === '' || (Number.isInteger(Number(v)) && Number(v) >= 0);
  if (!intOk(sec)) errs['be-sec'] = 'Precio inválido (entero ≥ 0).';
  if (!intOk(prim)) errs['be-prim'] = 'Precio inválido (entero ≥ 0).';
  if (!intOk(stockSec)) errs['be-stock-sec'] = 'Stock inválido (entero ≥ 0).';
  if (!intOk(stockPrim)) errs['be-stock-prim'] = 'Stock inválido (entero ≥ 0).';
  if (Object.keys(errs).length) {
    renderFieldErrors(errs);
    return;
  }

  const btn = document.getElementById('bulk-apply-btn');
  const banner = document.getElementById('bulk-form-error');
  btn.disabled = true;
  banner.hidden = true;

  const payloadBase = {};
  if (sec !== '') payloadBase.precioSecundaria = Number(sec);
  if (prim !== '') payloadBase.precioPrimaria = Number(prim);
  if (stockSec !== '') payloadBase.stockSecundaria = Number(stockSec);
  if (stockPrim !== '') payloadBase.stockPrimaria = Number(stockPrim);

  try {
    let errors = [];
    let lastJuegos = null;

    /* Precios y stock vía update (el endpoint no acepta visible) */
    if (Object.keys(payloadBase).length) {
      const upd = await bulkApiLoop(ids, id =>
        apiFetch('/api/admin/juegos/update', {
          method: 'POST',
          body: JSON.stringify(Object.assign({ gameId: id }, payloadBase))
        }),
        done => { btn.textContent = `Aplicando ${done} de ${n}…`; }
      );
      errors = upd.errors;
      lastJuegos = upd.lastJuegos;
    }

    /* Visibilidad vía toggle */
    if (vis !== '') {
      const tg = await bulkApiLoop(ids, id =>
        apiFetch('/api/admin/juegos/toggle', {
          method: 'POST',
          body: JSON.stringify({ gameId: id, visible: vis === '1' })
        })
      );
      errors = errors.concat(tg.errors);
      if (tg.lastJuegos) lastJuegos = tg.lastJuegos;
    }

    if (lastJuegos) state.games = lastJuegos;
    renderGames();
    if (errors.length) {
      banner.textContent = `${n - errors.length} de ${n} juegos actualizados. Error: ${errors[0].error}`;
      banner.hidden = false;
    } else {
      state.selectedGames.clear();
      closeModal('bulk-modal');
      showToast(`${n} juegos actualizados.`);
    }
  } catch (err) {
    if (String(err.message) === 'Sesión expirada') return;
    banner.textContent = 'Error de comunicación con el servidor.';
    banner.hidden = false;
  } finally {
    btn.disabled = false;
    btn.textContent = 'Aplicar';
  }
}

function bulkPermanentDelete() {
  const n = state.selectedGames.size;
  if (!n) return;
  openConfirm({
    title: 'Eliminar definitivamente',
    message: 'Esto elimina los juegos seleccionados y sus cuentas de forma permanente. Esta acción no se puede deshacer.',
    checkboxLabel: `Entiendo que esto elimina ${n} juegos y sus cuentas de forma permanente.`,
    confirmLabel: 'Eliminar definitivamente',
    danger: true,
    onConfirm: async () => {
      const ids = [...state.selectedGames];
      try {
        const result = await bulkApiLoop(ids, id =>
          apiFetch('/api/admin/juegos/delete', {
            method: 'POST',
            body: JSON.stringify({ gameId: id, permanent: true })
          }),
          done => {
            document.getElementById('confirm-yes').textContent = `Procesando ${done} de ${n}…`;
          }
        );
        if (result.lastJuegos) state.games = result.lastJuegos;
        renderGames();
        if (result.errors.length) {
          return { ok: false, error: `${n - result.errors.length} de ${n} eliminados. Error: ${result.errors[0].error}` };
        }
        state.selectedGames.clear();
        renderGames();
        showToast(`${n} juegos eliminados definitivamente.`);
        return { ok: true };
      } catch (err) {
        if (String(err.message) === 'Sesión expirada') return { ok: true };
        return { ok: false, error: 'Error de comunicación con el servidor.' };
      }
    }
  });
}

function toggleSort(key) {
  if (state.gamesSort.key === key) state.gamesSort.dir = -state.gamesSort.dir;
  else state.gamesSort = { key, dir: 1 };
  state.gamesPage = 1;
  renderGames();
}

function buildCategoriasList() {
  const cats = [...new Set(state.games.map(g => String(g.categoria || '').trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, 'es'));
  document.getElementById('categorias-list').innerHTML =
    cats.map(c => `<option value="${escapeHTML(c)}"></option>`).join('');
}

async function toggleVisibility(id, visible) {
  try {
    const res = await apiFetch('/api/admin/juegos/toggle', {
      method: 'POST',
      body: JSON.stringify({ gameId: id, visible })
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) {
      showToast(d.error || 'No se pudo actualizar la visibilidad.', 'error');
      renderGames();
      return;
    }
    if (Array.isArray(d.juegos)) state.games = d.juegos;
    renderGames();
    showToast(d.mensaje || (visible ? 'Juego visible en la tienda.' : 'Juego oculto de la tienda.'));
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') {
      showToast('Error de comunicación con el servidor.', 'error');
      renderGames();
    }
  }
}

async function deactivateGame(id) {
  try {
    const res = await apiFetch('/api/admin/juegos/delete', {
      method: 'POST',
      body: JSON.stringify({ gameId: id })
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) {
      showToast(d.error || 'No se pudo desactivar el juego.', 'error');
      return;
    }
    if (Array.isArray(d.juegos)) state.games = d.juegos;
    renderGames();
    showToast(d.mensaje || 'Juego desactivado.');
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') showToast('Error de comunicación con el servidor.', 'error');
  }
}

function gameKebabItems(g) {
  const items = [{ label: 'Editar', icon: 'pencil', action: () => openGameModal(g.id) }];
  if (g.deletedAt) {
    items.push({ label: 'Reactivar', icon: 'refresh', action: () => toggleVisibility(g.id, true) });
  } else {
    items.push({
      label: 'Desactivar', icon: 'trash', danger: true,
      action: () => openConfirm({
        title: 'Desactivar juego',
        message: `¿Desactivar "${g.titulo}"? El juego dejará de mostrarse en la tienda. Podrás reactivarlo después.`,
        confirmLabel: 'Desactivar',
        danger: true
      }).then(r => { if (r.ok) deactivateGame(g.id); })
    });
  }
  items.push({
    label: 'Eliminar definitivamente', icon: 'trash', danger: true,
    action: () => permanentlyDeleteGame(g)
  });
  return items;
}

/* Eliminación permanente: pide escribir el título exacto y mantiene el diálogo
   abierto con el error del servidor si la petición falla. */
function permanentlyDeleteGame(g) {
  return openConfirm({
    title: 'Eliminar definitivamente',
    message: 'Esto elimina el juego y sus cuentas de forma permanente. Esta acción no se puede deshacer.',
    confirmText: String(g.titulo || ''),
    confirmLabel: 'Eliminar definitivamente',
    danger: true,
    onConfirm: async () => {
      try {
        const res = await apiFetch('/api/admin/juegos/delete', {
          method: 'POST',
          body: JSON.stringify({ gameId: g.id, permanent: true })
        });
        const d = await res.json().catch(() => ({}));
        if (!res.ok) return { ok: false, error: d.error || 'No se pudo eliminar el juego.' };
        if (Array.isArray(d.juegos)) state.games = d.juegos;
        renderGames();
        showToast('Juego eliminado definitivamente.');
        return { ok: true };
      } catch (err) {
        if (String(err.message) === 'Sesión expirada') return { ok: true };
        return { ok: false, error: 'Error de comunicación con el servidor.' };
      }
    }
  });
}

/* ==========================================================================
   MODAL EDITOR DE JUEGO (crear / editar)
   ========================================================================== */
function renderPreview(inputId, previewId) {
  const el = document.getElementById(previewId);
  const url = document.getElementById(inputId).value.trim();
  if (/^https?:\/\//i.test(url)) {
    el.innerHTML = `<img src="${escapeHTML(url)}" alt="Vista previa" onerror="this.classList.add('thumb-broken')">`;
  } else {
    el.innerHTML = `<span class="preview-empty">${icon('image', 22)}</span>`;
  }
}

function setFieldValue(id, val) {
  document.getElementById(id).value = val === null || val === undefined ? '' : String(val);
}

function openGameModal(gameId) {
  const isEdit = gameId !== null && gameId !== undefined;
  const g = isEdit ? state.games.find(x => Number(x.id) === Number(gameId)) : null;
  if (isEdit && !g) return;
  state.editingGameId = isEdit ? g.id : null;

  document.getElementById('game-modal-title').textContent = isEdit ? 'Editar Juego' : 'Crear Juego';
  const form = document.getElementById('game-form');
  form.reset();
  document.getElementById('game-form-error').hidden = true;
  document.querySelectorAll('#game-form .field').forEach(f => f.classList.remove('invalid'));
  document.querySelectorAll('#game-form .field-err').forEach(e => (e.textContent = ''));

  if (isEdit) {
    setFieldValue('f-titulo', g.titulo);
    setFieldValue('f-categoria', g.categoria);
    setFieldValue('f-peso', g.peso);
    setFieldValue('f-rating', g.rating == null ? 5 : g.rating);
    setFieldValue('f-sec', g.precioSecundaria);
    setFieldValue('f-prim', g.precioPrimaria);
    setFieldValue('f-orig', g.precioOriginal);
    setFieldValue('f-stock-sec', g.stockSecundaria);
    setFieldValue('f-stock-prim', g.stockPrimaria);
    setFieldValue('f-imagen', g.imagen);
    setFieldValue('f-imagen-detalle', g.imagenDetalle);
    setFieldValue('f-descripcion', g.descripcion);
    setFieldValue('f-resumen', g.resumenExtenso);
    setFieldValue('f-youtube', g.youtubeUrl);
    setFieldValue('f-cuentas', Array.isArray(g.cuentas) ? g.cuentas.join('\n') : (g.cuentas || ''));
    setFieldValue('f-correo-texto', g.correoTexto);
    setFieldValue('f-correo-imagen', g.correoImagen);
    document.getElementById('f-visible').checked = g.visible !== false;
  } else {
    document.getElementById('f-visible').checked = true;
    document.getElementById('f-rating').value = 5;
  }
  renderPreview('f-imagen', 'preview-imagen');
  renderPreview('f-imagen-detalle', 'preview-imagen-detalle');
  openModal('game-modal');
}

function validateGameForm() {
  const val = id => document.getElementById(id).value.trim();
  const errs = {};
  if (!val('f-titulo')) errs.titulo = 'El título es obligatorio.';
  if (!val('f-categoria')) errs.categoria = 'La categoría es obligatoria.';

  const numOk = (v, min) => v !== '' && !isNaN(Number(v)) && Number(v) >= (min || 0);
  if (!numOk(val('f-sec'), 0)) errs.sec = 'Ingresa un precio válido.';
  if (!numOk(val('f-prim'), 0)) errs.prim = 'Ingresa un precio válido.';
  if (val('f-orig') !== '' && !numOk(val('f-orig'), 0)) errs.orig = 'Ingresa un precio válido.';
  if (val('f-rating') !== '' && (isNaN(Number(val('f-rating'))) || Number(val('f-rating')) < 0 || Number(val('f-rating')) > 5)) {
    errs.rating = 'La valoración debe estar entre 0 y 5.';
  }

  const stockOk = v => v === '' || (Number.isInteger(Number(v)) && Number(v) >= 0);
  if (!stockOk(val('f-stock-sec'))) errs['stock-sec'] = 'Stock inválido (entero ≥ 0).';
  if (!stockOk(val('f-stock-prim'))) errs['stock-prim'] = 'Stock inválido (entero ≥ 0).';

  const urlOk = v => v !== '' && /^https?:\/\//i.test(v);
  if (!val('f-imagen')) errs.imagen = 'La URL de la imagen principal es obligatoria.';
  else if (!urlOk(val('f-imagen'))) errs.imagen = 'La URL debe comenzar con http(s).';
  if (!val('f-imagen-detalle')) errs['imagen-detalle'] = 'La URL de la imagen de detalle es obligatoria.';
  else if (!urlOk(val('f-imagen-detalle'))) errs['imagen-detalle'] = 'La URL debe comenzar con http(s).';

  if (!val('f-descripcion')) errs.descripcion = 'La descripción corta es obligatoria.';
  return errs;
}

function renderFieldErrors(errs) {
  Object.keys(errs).forEach(key => {
    const errEl = document.getElementById('err-' + key);
    if (errEl) {
      errEl.textContent = errs[key];
      const field = errEl.closest('.field');
      if (field) field.classList.add('invalid');
    }
  });
}

async function handleGameSubmit(e) {
  e.preventDefault();
  const errs = validateGameForm();
  if (Object.keys(errs).length) {
    renderFieldErrors(errs);
    return;
  }

  const val = id => document.getElementById(id).value.trim();
  const payload = {
    titulo: val('f-titulo'),
    categoria: val('f-categoria'),
    peso: val('f-peso'),
    rating: val('f-rating') || 5,
    precioSecundaria: val('f-sec'),
    precioPrimaria: val('f-prim'),
    precioOriginal: val('f-orig'),
    stockSecundaria: val('f-stock-sec'),
    stockPrimaria: val('f-stock-prim'),
    imagen: val('f-imagen'),
    imagenDetalle: val('f-imagen-detalle'),
    descripcion: val('f-descripcion'),
    resumenExtenso: val('f-resumen'),
    youtubeUrl: val('f-youtube'),
    correoTexto: val('f-correo-texto'),
    correoImagen: val('f-correo-imagen'),
    cuentas: document.getElementById('f-cuentas').value,
    visible: document.getElementById('f-visible').checked
  };

  const editing = state.editingGameId !== null;
  if (editing) payload.gameId = state.editingGameId;

  const btn = document.getElementById('game-save-btn');
  const banner = document.getElementById('game-form-error');
  btn.disabled = true;
  btn.textContent = 'Guardando…';
  banner.hidden = true;

  try {
    const res = await apiFetch(editing ? '/api/admin/juegos/update' : '/api/admin/juegos/create', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) {
      banner.textContent = d.error || 'No se pudo guardar el juego.';
      banner.hidden = false;
      return;
    }
    if (Array.isArray(d.juegos)) state.games = d.juegos;
    renderGames();
    closeModal('game-modal');
    showToast(d.mensaje || (editing ? 'Juego actualizado.' : 'Juego creado.'));
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') {
      banner.textContent = 'Error de comunicación con el servidor.';
      banner.hidden = false;
    }
  } finally {
    btn.disabled = false;
    btn.textContent = 'Guardar';
  }
}

/* ==========================================================================
   VISTA: PEDIDOS (filtrado server-side)
   ========================================================================== */
async function fetchOrders() {
  const tb = document.getElementById('orders-tbody');
  document.getElementById('orders-count').textContent = '';
  tb.innerHTML = skeletonRows(5, 6);
  try {
    const params = new URLSearchParams();
    if (state.ordersQuery) params.set('q', state.ordersQuery);
    if (state.ordersStatus) params.set('status', state.ordersStatus);
    const res = await apiFetch('/api/admin/orders?' + params.toString());
    if (!res.ok) {
      showToast(await readError(res), 'error');
      tb.innerHTML = tableEmpty(6, 'No se pudieron cargar los pedidos.', 'Usa el botón Actualizar para reintentar.');
      return;
    }
    state.orders = await res.json();
    state.ordersLoaded = true;
    renderOrders();
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') {
      tb.innerHTML = tableEmpty(6, 'No se pudieron cargar los pedidos.', 'Error de comunicación con el servidor.');
    }
  }
}

function ordersRow(o) {
  const code = escapeHTML(o.codigoOrden || '—');
  const cliente = escapeHTML(o.emailCompleto || o.usuario || '—');
  const fecha = formatFecha(o.fecha);
  const total = escapeHTML(o.totalFormatted || formatCLP(o.total));
  return `<tr>
    <td data-label="Código"><span class="cell-code">${code}</span></td>
    <td data-label="Cliente">${cliente}</td>
    <td data-label="Fecha">${fecha}</td>
    <td data-label="Total" class="num">${total}</td>
    <td data-label="Estado">${statusChip(o.estado)}</td>
    <td data-label="Acciones" class="cell-actions">
      <button type="button" class="btn-ghost" data-action="open-order" data-code="${code}">${icon('eye', 14)}<span>Ver</span></button>
      <button type="button" class="icon-btn" data-action="kebab" data-code="${code}" aria-haspopup="menu" aria-expanded="false" aria-label="Acciones de la orden ${code}">${icon('more', 18)}</button>
    </td>
  </tr>`;
}

function renderOrders() {
  const list = Array.isArray(state.orders) ? state.orders : [];
  const pages = Math.max(1, Math.ceil(list.length / state.pageSize));
  if (state.ordersPage > pages) state.ordersPage = pages;
  const pageList = list.slice((state.ordersPage - 1) * state.pageSize, state.ordersPage * state.pageSize);
  document.getElementById('orders-count').textContent = list.length ? `${list.length} pedidos` : '';
  const tb = document.getElementById('orders-tbody');
  if (!pageList.length) {
    const filtered = state.ordersQuery || state.ordersStatus;
    tb.innerHTML = tableEmpty(6, 'No se encontraron pedidos.',
      filtered ? 'Prueba con otro término o cambia el filtro de estado.' : 'Aún no hay pedidos en la tienda.');
  } else {
    tb.innerHTML = pageList.map(ordersRow).join('');
  }
  renderPagination('orders-pagination', state.ordersPage, list.length);
}

/* --- Disponibilidad de acciones por estado --- */
function canResend(o) {
  return o.estado === 'pagada' && Array.isArray(o.carrito) && o.carrito.some(i => i.varianteAsignada);
}

function canRetry(o) {
  return ['pendiente', 'rechazada', 'cancelada'].includes(o.estado);
}

function canCancel(o) {
  return !['cancelada', 'reembolsada'].includes(o.estado) &&
    !(o.estado === 'pagada' && o.deliveryStatus === 'delivered');
}

function canRefund(o) {
  return o.estado === 'pagada';
}

function orderKebabItems(o) {
  const code = String(o.codigoOrden || '');
  const items = [{ label: 'Ver detalle', icon: 'eye', action: () => openOrderDetail(code) }];
  if (canResend(o)) items.push({ label: 'Reenviar entrega', icon: 'send', action: () => resendDelivery(code) });
  if (canRetry(o)) items.push({ label: 'Reintentar pago', icon: 'refresh', action: () => retryPayment(code) });
  if (canCancel(o)) items.push({ label: 'Cancelar orden', icon: 'x', danger: true, action: () => cancelOrder(code) });
  if (canRefund(o)) items.push({ label: 'Reembolsar', icon: 'trash', danger: true, action: () => refundOrder(code) });
  return items;
}

/* ==========================================================================
   DETALLE DE PEDIDO
   ========================================================================== */
async function openOrderDetail(code) {
  try {
    const res = await apiFetch('/api/admin/orders/' + encodeURIComponent(code));
    const d = await res.json().catch(() => ({}));
    if (!res.ok) {
      showToast(d.error || 'No se pudo cargar la orden.', 'error');
      return;
    }
    state.detailOrder = d;
    renderOrderDetail(d);
    openModal('order-modal');
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') showToast('Error de comunicación con el servidor.', 'error');
  }
}

function renderOrderDetail(o) {
  const code = escapeHTML(o.codigoOrden || '—');
  document.getElementById('order-head').innerHTML = `
    <div class="order-head">
      <span class="order-code">${code}</span>
      ${statusChip(o.estado)}
      <span class="order-total">${escapeHTML(o.totalFormatted || formatCLP(o.total))}</span>
    </div>`;

  const items = (Array.isArray(o.carrito) && o.carrito.length)
    ? o.carrito.map(i => `<tr>
        <td>${escapeHTML(i.titulo || '—')}</td>
        <td>${escapeHTML(i.licencia || '—')}</td>
        <td class="num">${escapeHTML(String(i.cantidad == null ? 1 : i.cantidad))}</td>
        <td>${i.varianteAsignada ? `<code>${escapeHTML(i.varianteAsignada)}</code>` : '—'}</td>
      </tr>`).join('')
    : '<tr><td colspan="4">Sin productos</td></tr>';

  const hist = (Array.isArray(o.history) && o.history.length)
    ? o.history.map(h => `<li>
        <span class="tl-dot" aria-hidden="true"></span>
        <div>
          <strong>${escapeHTML(h.type || '')}</strong>
          <span class="tl-meta">${escapeHTML(h.actor || '')}${h.actor ? ' · ' : ''}${formatFecha(h.at)}</span>
          ${h.detail ? `<p>${escapeHTML(h.detail)}</p>` : ''}
        </div>
      </li>`).join('')
    : '<li><span class="tl-dot" aria-hidden="true"></span><div><p>Sin historial</p></div></li>';

  document.getElementById('order-body').innerHTML = `
    <section class="detail-section">
      <h4>${icon('users', 14)} Cliente</h4>
      <div class="detail-grid">
        <div class="detail-item"><label>Cliente</label><p>${escapeHTML(o.clienteCompleto || o.cliente || '—')}</p></div>
        <div class="detail-item"><label>Email</label><p>${escapeHTML(o.emailCompleto || '—')}</p></div>
        <div class="detail-item"><label>Usuario</label><p>${escapeHTML(o.usuario || '—')}</p></div>
        <div class="detail-item"><label>Fecha</label><p>${formatFecha(o.fecha)}</p></div>
        <div class="detail-item"><label>Entrega</label><p>${escapeHTML(o.deliveryStatus || '—')}</p></div>
      </div>
    </section>
    <section class="detail-section">
      <h4>${icon('package', 14)} Productos</h4>
      <table class="detail-table">
        <thead><tr><th scope="col">Título</th><th scope="col">Licencia</th><th scope="col" class="num">Cant.</th><th scope="col">Cuenta asignada</th></tr></thead>
        <tbody>${items}</tbody>
      </table>
    </section>
    <section class="detail-section">
      <h4>${icon('clock', 14)} Historial</h4>
      <ul class="timeline">${hist}</ul>
    </section>`;

  document.getElementById('order-foot').innerHTML = orderFootActions(o);
}

function orderFootActions(o) {
  const code = escapeHTML(o.codigoOrden || '');
  let h = '';
  if (canResend(o)) {
    h += `<button type="button" class="btn-secondary" data-action="order-resend" data-code="${code}">${icon('send', 15)} Reenviar entrega</button>`;
  }
  if (canRetry(o)) {
    h += `<button type="button" class="btn-secondary" data-action="order-retry" data-code="${code}">${icon('refresh', 15)} Reintentar pago</button>`;
  }
  if (canCancel(o)) {
    h += `<button type="button" class="btn-danger" data-action="order-cancel" data-code="${code}">${icon('x', 15)} Cancelar orden</button>`;
  }
  if (canRefund(o)) {
    h += `<button type="button" class="btn-danger" data-action="order-refund" data-code="${code}">${icon('trash', 15)} Reembolsar</button>`;
  }
  h += `<button type="button" class="btn-secondary" data-action="close-modal" data-modal="order-modal">Cerrar</button>`;
  return h;
}

/* ==========================================================================
   ACCIONES DE PEDIDO
   ========================================================================== */
function afterOrderAction(code) {
  fetchOrders();
  if (state.detailOrder && String(state.detailOrder.codigoOrden) === String(code)) {
    apiFetch('/api/admin/orders/' + encodeURIComponent(code))
      .then(res => (res.ok ? res.json() : null))
      .then(d => {
        if (d) {
          state.detailOrder = d;
          renderOrderDetail(d);
        }
      })
      .catch(() => {});
  }
}

async function resendDelivery(code) {
  try {
    const res = await apiFetch(`/api/admin/orders/${encodeURIComponent(code)}/resend-delivery`, {
      method: 'POST',
      body: '{}'
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) {
      showToast(d.error || 'No se pudo reenviar la entrega.', 'error');
      return;
    }
    showToast('Entrega reenviada.');
    afterOrderAction(code);
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') showToast('Error de comunicación con el servidor.', 'error');
  }
}

async function cancelOrder(code) {
  const r = await openConfirm({
    title: 'Cancelar orden',
    message: 'La orden quedará cancelada y no se entregará. Esta acción no se puede deshacer.',
    textareaLabel: 'Motivo de la cancelación',
    required: true,
    confirmLabel: 'Cancelar orden',
    danger: true
  });
  if (!r.ok) return;
  try {
    const res = await apiFetch(`/api/admin/orders/${encodeURIComponent(code)}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason: r.reason })
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) {
      showToast(d.error || 'No se pudo cancelar la orden.', 'error');
      return;
    }
    showToast('Orden cancelada.');
    afterOrderAction(code);
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') showToast('Error de comunicación con el servidor.', 'error');
  }
}

async function refundOrder(code) {
  const r = await openConfirm({
    title: 'Reembolsar orden',
    message: 'El reembolso quedará registrado en la orden.',
    textareaLabel: 'Motivo del reembolso',
    required: true,
    confirmLabel: 'Reembolsar',
    danger: true
  });
  if (!r.ok) return;
  try {
    const res = await apiFetch(`/api/admin/orders/${encodeURIComponent(code)}/refund`, {
      method: 'POST',
      body: JSON.stringify({ reason: r.reason })
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) {
      showToast(d.error || 'No se pudo registrar el reembolso.', 'error');
      return;
    }
    showToast(d.aviso ? `Reembolso registrado. ${d.aviso}` : 'Reembolso registrado.');
    afterOrderAction(code);
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') showToast('Error de comunicación con el servidor.', 'error');
  }
}

async function retryPayment(code) {
  const o = state.detailOrder && String(state.detailOrder.codigoOrden) === String(code)
    ? state.detailOrder
    : (Array.isArray(state.orders) ? state.orders.find(x => String(x.codigoOrden) === String(code)) : null);
  const email = (o && (o.emailCompleto || o.email)) || '';
  try {
    const res = await apiFetch(`/api/orders/${encodeURIComponent(code)}/retry-payment`, {
      method: 'POST',
      body: JSON.stringify(email ? { email } : {})
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) {
      showToast(d.error || 'No se pudo reintentar el pago.', 'error');
      return;
    }
    if (d.redirectUrl) {
      window.location.href = d.redirectUrl;
    } else {
      showToast('Reintento de pago iniciado.');
      afterOrderAction(code);
    }
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') showToast('Error de comunicación con el servidor.', 'error');
  }
}

/* ==========================================================================
   VISTA: DASHBOARD — KPIs y paneles (todo calculado cliente-side)
   ========================================================================== */
const AUDIT_ACTION_LABELS = {
  'juegos.create': 'Juego creado',
  'juegos.update': 'Juego actualizado',
  'juegos.toggle': 'Visibilidad cambiada',
  'juegos.delete': 'Juego desactivado',
  'coupons.create': 'Cupón creado',
  'coupons.delete': 'Cupón eliminado',
  'gallery.add': 'Foto de galería agregada',
  'gallery.delete': 'Foto eliminada',
  'settings.gallery': 'Galería modificada',
  'orders.cancel': 'Orden cancelada',
  'orders.refund': 'Orden reembolsada',
  'orders.resend_delivery': 'Entrega reenviada',
  'orders.status': 'Estado cambiado',
  'users.role': 'Rol cambiado',
  'juegos.import': 'Importación de juegos'
};

function isAgotado(g) {
  return [g.stockPrimaria, g.stockSecundaria].some(s => Number.isInteger(s) && s <= 0);
}

function isLowOrOut(g) {
  return [g.stockPrimaria, g.stockSecundaria].some(s => Number.isInteger(s) && s <= 3);
}

function kpiCard(label, value, ic, tint, clickable, view) {
  const inner = `<div class="kpi-text"><span class="kpi-label">${escapeHTML(label)}</span><span class="kpi-value">${value}</span></div><span class="kpi-icon kpi-${tint}" aria-hidden="true">${icon(ic, 20)}</span>`;
  if (clickable) {
    return `<button type="button" class="kpi-card" data-action="nav" data-view="${view}">${inner}</button>`;
  }
  return `<div class="kpi-card">${inner}</div>`;
}

function dashSkeleton() {
  document.getElementById('dash-kpis').innerHTML =
    '<div class="kpi-card"><div class="kpi-text"><span class="skeleton-line"></span><span class="skeleton-line" style="width:65%"></span></div></div>'.repeat(4);
  ['dash-recent', 'dash-stock', 'dash-audit', 'dash-top', 'dash-viewed', 'dash-cart', 'dash-repeat', 'dash-searches', 'dash-funnel', 'dash-activity', 'dash-fav', 'dash-revenue', 'dash-newusers'].forEach(id => {
    document.getElementById(id).innerHTML =
      '<div class="panel-list">' + '<span class="skeleton-line" style="margin:10px 20px;width:82%"></span>'.repeat(4) + '</div>';
  });
}

async function fetchDash() {
  dashSkeleton();
  try {
    const [oR, gR, uR, cR, aR, anR] = await Promise.all([
      apiFetch('/api/admin/orders'),
      apiFetch('/api/admin/juegos'),
      apiFetch('/api/admin/users'),
      apiFetch('/api/coupons'),
      apiFetch('/api/admin/audit?limit=8'),
      apiFetch('/api/admin/analytics?days=30')
    ]);
    const grab = async (r, fallback) => (r.ok ? (await r.json().catch(() => fallback)) : fallback);
    state.dash.orders = await grab(oR, []);
    state.dash.games = await grab(gR, []);
    state.dash.users = await grab(uR, []);
    state.dash.coupons = await grab(cR, []);
    state.dash.audit = await grab(aR, []);
    state.dash.analytics = await grab(anR, null);
    state.dash.loaded = true;
    renderDash();
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') showToast('Error de comunicación con el servidor.', 'error');
  }
}

function renderDash() {
  const { orders, games, coupons, audit, analytics } = state.dash;
  const ventas = orders.reduce((acc, o) => {
    if (['cancelada', 'reembolsada'].includes(o.estado)) return acc;
    return acc + (Number(o.total != null ? o.total : o.monto) || 0);
  }, 0);
  const pendientes = orders.filter(o => o.estado === 'pendiente').length;
  const agotados = games.filter(isAgotado).length;

  document.getElementById('dash-kpis').innerHTML =
    kpiCard('Ventas totales', formatCLP(ventas), 'wallet', 'cyan', false) +
    kpiCard('Pedidos pendientes', String(pendientes), 'clock', 'gold', false) +
    kpiCard('Agotados', String(agotados), 'package', 'red', true, 'juegos') +
    kpiCard('Cupones', String(coupons.length), 'ticket', 'cyan', true, 'cupones');

  renderDashRecent(orders);
  renderDashStock(games);
  renderDashAudit(audit);
  renderDashTop(games);
  renderDashAnalytics(analytics);
}

function renderDashRecent(orders) {
  const el = document.getElementById('dash-recent');
  const recent = (Array.isArray(orders) ? orders : []).slice(0, 8);
  if (!recent.length) {
    el.innerHTML = '<p class="panel-empty">Aún no hay pedidos.</p>';
    return;
  }
  el.innerHTML = `<div class="table-wrap"><table class="data-table">
    <thead><tr><th scope="col">Código</th><th scope="col">Cliente</th><th scope="col" class="num">Total</th><th scope="col">Estado</th><th scope="col"></th></tr></thead>
    <tbody>${recent.map(o => {
      const code = escapeHTML(o.codigoOrden || '—');
      return `<tr>
        <td data-label="Código"><span class="cell-code">${code}</span></td>
        <td data-label="Cliente">${escapeHTML(o.emailCompleto || o.usuario || '—')}</td>
        <td data-label="Total" class="num">${escapeHTML(o.totalFormatted || formatCLP(o.total))}</td>
        <td data-label="Estado">${statusChip(o.estado)}</td>
        <td data-label=""><button type="button" class="btn-ghost" data-action="open-order" data-code="${code}">${icon('eye', 14)}<span>Ver</span></button></td>
      </tr>`;
    }).join('')}</tbody>
  </table></div>`;
}

function renderDashStock(games) {
  const el = document.getElementById('dash-stock');
  const low = (Array.isArray(games) ? games : [])
    .filter(isLowOrOut)
    .map(g => ({
      g,
      min: Math.min(
        Number.isInteger(g.stockPrimaria) ? g.stockPrimaria : Infinity,
        Number.isInteger(g.stockSecundaria) ? g.stockSecundaria : Infinity
      )
    }))
    .sort((a, b) => a.min - b.min)
    .slice(0, 10);
  if (!low.length) {
    el.innerHTML = '<p class="panel-empty">Sin juegos con stock bajo.</p>';
    return;
  }
  el.innerHTML = low.map(({ g }) => {
    const sec = Number.isInteger(g.stockSecundaria) ? String(g.stockSecundaria) : '∞';
    const prim = Number.isInteger(g.stockPrimaria) ? String(g.stockPrimaria) : '∞';
    return `<button type="button" class="stock-row" data-action="nav" data-view="juegos" title="Ver juegos">
      <img class="stock-thumb" src="${escapeHTML(g.imagen || '')}" alt="" loading="lazy" onerror="this.classList.add('thumb-broken')">
      <span class="stock-info">
        <span class="stock-title">${escapeHTML(g.titulo || 'Sin título')}</span>
        <span class="stock-sub">Sec: ${sec} · Prim: ${prim}</span>
      </span>
      ${isAgotado(g) ? `<span class="stock-tag">${icon('alert', 12)} agotado</span>` : ''}
    </button>`;
  }).join('');
}

function auditLabel(action) {
  return AUDIT_ACTION_LABELS[String(action || '')] || escapeHTML(String(action || 'Acción'));
}

function renderDashAudit(audit) {
  const el = document.getElementById('dash-audit');
  const list = (Array.isArray(audit) ? audit : []).slice(0, 8);
  if (!list.length) {
    el.innerHTML = '<p class="panel-empty">Sin actividad reciente.</p>';
    return;
  }
  el.innerHTML = `<ul class="audit-list">${list.map(a => {
    const bad = a.result && !/^(ok|success|exito|true)$/i.test(String(a.result));
    return `<li>
      <span class="audit-dot${bad ? ' err' : ''}" aria-hidden="true"></span>
      <div>
        <strong>${auditLabel(a.action)}</strong>
        <span class="tl-meta">${escapeHTML(a.actorUsername || '')}${a.actorUsername ? ' · ' : ''}${formatFecha(a.timestamp)}</span>
        ${a.summary ? `<p>${escapeHTML(a.summary)}</p>` : ''}
      </div>
    </li>`;
  }).join('')}</ul>`;
}

function renderDashTop(games) {
  const el = document.getElementById('dash-top');
  const top = (Array.isArray(games) ? games : [])
    .map(g => ({ g, sold: (Number(g.soldPrimaria) || 0) + (Number(g.soldSecundaria) || 0) }))
    .filter(x => x.sold > 0)
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);
  if (!top.length) {
    el.innerHTML = '<p class="panel-empty">Aún no hay ventas registradas.</p>';
    return;
  }
  el.innerHTML = `<div class="panel-list">${top.map((x, i) => `
    <div class="top-row">
      <span class="top-rank">${i + 1}</span>
      <span class="top-info">
        <span class="top-title">${escapeHTML(x.g.titulo || 'Sin título')}</span>
        <span class="top-count">S: ${Number(x.g.soldSecundaria) || 0} · P: ${Number(x.g.soldPrimaria) || 0}</span>
      </span>
      <span class="top-count">${x.sold} vendidos</span>
    </div>`).join('')}</div>`;
}

/* ==========================================================================
   DASHBOARD — analytics (GET /api/admin/analytics?days=30)
   ========================================================================== */
const DASH_EMPTY = '<p class="panel-empty">Sin datos suficientes todavía</p>';

/* Acepta fracción (0-1) o porcentaje directo (0-100) */
function toPercent(v) {
  let r = Number(v) || 0;
  if (r <= 1) r = Math.round(r * 100);
  else r = Math.round(r);
  return Math.min(100, Math.max(0, r));
}

function gameTitleById(id) {
  const g = state.dash.games.find(x => Number(x.id) === Number(id));
  return g ? (g.titulo || 'Sin título') : 'Juego #' + escapeHTML(String(id));
}

function renderDashAnalytics(a) {
  /* Top vistos */
  const elV = document.getElementById('dash-viewed');
  const viewed = (a && Array.isArray(a.topViewed) ? a.topViewed : []).slice(0, 5);
  if (!viewed.length) {
    elV.innerHTML = DASH_EMPTY;
  } else {
    elV.innerHTML = `<div class="panel-list">${viewed.map(v => `
      <button type="button" class="stock-row" data-action="nav" data-view="juegos" title="Ver juegos">
        <span class="mini-icon" aria-hidden="true">${icon('eye', 14)}</span>
        <span class="stock-info">
          <span class="stock-title">${escapeHTML(gameTitleById(v.gameId))}</span>
        </span>
        <span class="top-count">${escapeHTML(String(v.count ?? 0))} vistas</span>
      </button>`).join('')}</div>`;
  }

  /* Carritos abandonados */
  const elC = document.getElementById('dash-cart');
  const ca = a && a.cartAbandonment ? a.cartAbandonment : null;
  if (!ca || (!Number(ca.started) && !Number(ca.purchased))) {
    elC.innerHTML = DASH_EMPTY;
  } else {
    const started = Number(ca.started) || 0;
    const purchased = Number(ca.purchased) || 0;
    const pct = toPercent(ca.rate);
    elC.innerHTML = `
      <div class="panel-list">
        <p class="cart-line">${started} carritos iniciados · ${purchased} compras · <strong>${pct}% abandono</strong></p>
        <div class="progress-track" role="img" aria-label="${pct}% de abandono de carrito"><div class="progress-fill${pct >= 70 ? ' high' : ''}" style="width:${pct}%"></div></div>
      </div>`;
  }

  /* Clientes recurrentes (cálculo cliente-side sobre los pedidos) */
  const elR = document.getElementById('dash-repeat');
  const ordersArr = Array.isArray(state.dash.orders) ? state.dash.orders : [];
  const byEmail = new Map();
  ordersArr.forEach(o => {
    const email = String(o.emailCompleto || o.email || '').trim().toLowerCase();
    if (!email) return;
    byEmail.set(email, (byEmail.get(email) || 0) + 1);
  });
  const recurrent = [...byEmail.entries()].filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1]);
  if (!recurrent.length) {
    elR.innerHTML = DASH_EMPTY;
  } else {
    const repOrders = recurrent.reduce((acc, [, n]) => acc + n, 0);
    elR.innerHTML = `
      <div class="panel-list">
        <p class="cart-line"><strong>${recurrent.length}</strong> clientes recurrentes (${repOrders} de ${ordersArr.length} pedidos)</p>
        ${recurrent.slice(0, 3).map(([email, n]) => `
          <div class="top-row">
            <span class="top-info"><span class="top-title">${escapeHTML(email)}</span></span>
            <span class="top-count">${n} pedidos</span>
          </div>`).join('')}
      </div>`;
  }

  /* Búsquedas frecuentes */
  const elS = document.getElementById('dash-searches');
  const searches = (a && Array.isArray(a.searches) ? a.searches : []).slice(0, 5);
  if (!searches.length) {
    elS.innerHTML = DASH_EMPTY;
  } else {
    elS.innerHTML = `<div class="search-chips">${searches.map(s => `
      <span class="chip chip-search">${icon('search', 12)} ${escapeHTML(String(s.search || ''))} · ${escapeHTML(String(s.count ?? 0))}</span>`).join('')}</div>`;
  }

  renderFunnel(a);
  renderActivity(a);
  renderFavorites(a);
  renderRevenue(a);
  renderNewUsers(a);
}

/* --- Embudo de compra --- */
/* Color con intención: conversión sana verde, baja ámbar, nula roja */
function rateChip(pct, label) {
  const cls = pct >= 15 ? 'chip-pagada' : (pct > 0 ? 'chip-pendiente' : 'chip-rechazada');
  return `<span class="chip ${cls}">${pct}% ${label}</span>`;
}

function renderFunnel(a) {
  const el = document.getElementById('dash-funnel');
  const f = a && a.funnel ? a.funnel : null;
  if (!f) {
    el.innerHTML = DASH_EMPTY;
    return;
  }
  const views = Number(f.views) || 0;
  const addToCart = Number(f.addToCart) || 0;
  const checkoutStart = Number(f.checkoutStart) || 0;
  const purchases = Number(f.purchases) || 0;
  if (!views && !addToCart && !checkoutStart && !purchases) {
    el.innerHTML = DASH_EMPTY;
    return;
  }
  const rates = [
    { label: 'vista→carrito', v: f.viewToCart },
    { label: 'carrito→checkout', v: f.cartToCheckout },
    { label: 'checkout→compra', v: f.checkoutToPurchase }
  ];
  const step = (ic, count, label) => `
    <div class="funnel-step">
      <span class="funnel-icon" aria-hidden="true">${icon(ic, 16)}</span>
      <span class="funnel-num">${count}</span>
      <span class="funnel-label">${escapeHTML(label)}</span>
    </div>`;
  el.innerHTML = `
    <div class="funnel">
      <div class="funnel-steps">
        ${step('eye', views, 'Vistas')}
        <span class="funnel-connector" aria-hidden="true"></span>
        ${step('bag', addToCart, 'Carrito')}
        <span class="funnel-connector" aria-hidden="true"></span>
        ${step('ticket', checkoutStart, 'Checkout')}
        <span class="funnel-connector" aria-hidden="true"></span>
        ${step('check', purchases, 'Compras')}
      </div>
      <div class="funnel-rates">
        ${rates.map(r => rateChip(toPercent(r.v), r.label)).join('')}
      </div>
      <div class="funnel-foot">
        <span class="funnel-foot-label">Ticket promedio</span>
        <span class="funnel-ticket">${formatCLP(a.ticketPromedio)}</span>
      </div>
    </div>`;
}

/* --- Actividad por hora (24 barras) --- */
function renderActivity(a) {
  const el = document.getElementById('dash-activity');
  const hours = a && Array.isArray(a.activityByHour) ? a.activityByHour : [];
  const counts = hours.map(h => Number(h.count) || 0);
  if (!hours.length || counts.every(c => c === 0)) {
    el.innerHTML = DASH_EMPTY;
    return;
  }
  const max = Math.max(...counts);
  let peakCount = 0;
  let peakHour = 0;
  hours.forEach(h => {
    const c = Number(h.count) || 0;
    if (c > peakCount) {
      peakCount = c;
      peakHour = Number(h.hour);
    }
  });
  el.innerHTML = `
    <div class="hour-chart">
      ${hours.map(h => {
        const c = Number(h.count) || 0;
        const hh = Number(h.hour);
        const isPeak = c > 0 && c === peakCount;
        return `<div class="hour-col${isPeak ? ' peak' : ''}" title="Hora ${hh} · ${c} eventos">
          <div class="hour-bar${c ? '' : ' zero'}" style="height:${c ? Math.max(4, Math.round((c / max) * 100)) : 2}%"></div>
          ${isPeak ? `<span class="peak-tag">pico ${c}</span>` : ''}
        </div>`;
      }).join('')}
    </div>
    <div class="hour-labels"><span>0</span><span>6</span><span>12</span><span>18</span><span>24</span></div>`;
}

/* --- Top favoritos --- */
function renderFavorites(a) {
  const el = document.getElementById('dash-fav');
  const fav = (a && Array.isArray(a.topFavorited) ? a.topFavorited : []).slice(0, 5);
  if (!fav.length) {
    el.innerHTML = DASH_EMPTY;
    return;
  }
  el.innerHTML = `<div class="panel-list">${fav.map(v => `
    <button type="button" class="stock-row" data-action="nav" data-view="juegos" title="Ver juegos">
      <span class="mini-icon mini-heart" aria-hidden="true">${icon('heart', 14)}</span>
      <span class="stock-info">
        <span class="stock-title">${escapeHTML(gameTitleById(v.gameId))}</span>
      </span>
      <span class="top-count">${escapeHTML(String(v.count ?? 0))} favoritos</span>
    </button>`).join('')}</div>`;
}

/* --- Ingresos por juego --- */
function renderRevenue(a) {
  const el = document.getElementById('dash-revenue');
  const rev = (a && Array.isArray(a.topRevenue) ? a.topRevenue : []).slice(0, 5);
  if (!rev.length) {
    el.innerHTML = DASH_EMPTY;
    return;
  }
  el.innerHTML = `<div class="panel-list">${rev.map((x, i) => `
    <div class="top-row">
      <span class="top-rank">${i + 1}</span>
      <span class="top-info">
        <span class="top-title">${escapeHTML(x.titulo || 'Sin título')}</span>
      </span>
      <span class="top-count">x${escapeHTML(String(x.units ?? 0))} · ${formatCLP(x.revenue)}</span>
    </div>`).join('')}</div>`;
}

/* --- Nuevos clientes --- */
function renderNewUsers(a) {
  const el = document.getElementById('dash-newusers');
  const nu = a && a.newUsers ? a.newUsers : null;
  const week = nu ? Number(nu.thisWeek) || 0 : 0;
  const month = nu ? Number(nu.thisMonth) || 0 : 0;
  if (!nu || (!week && !month)) {
    el.innerHTML = DASH_EMPTY;
    return;
  }
  const max = Math.max(week, month, 1);
  el.innerHTML = `
    <p class="cart-line"><strong>${week}</strong> nuevos esta semana · <strong>${month}</strong> este mes</p>
    <div class="mini-bars">
      <div class="mini-bar-col"><div class="mini-bar bar-week" style="height:${Math.round((week / max) * 100)}%"></div><span class="mini-bar-label">Semana</span></div>
      <div class="mini-bar-col"><div class="mini-bar bar-month" style="height:${Math.round((month / max) * 100)}%"></div><span class="mini-bar-label">Mes</span></div>
    </div>`;
}

/* ==========================================================================
   VISTA: CUPONES
   ========================================================================== */
async function fetchCouponsAdmin() {
  const tb = document.getElementById('coupons-tbody');
  tb.innerHTML = skeletonRows(4, 5);
  try {
    const res = await apiFetch('/api/coupons');
    if (!res.ok) {
      showToast(await readError(res), 'error');
      tb.innerHTML = tableEmpty(5, 'No se pudieron cargar los cupones.', 'Usa el botón Actualizar para reintentar.');
      return;
    }
    const d = await res.json();
    state.coupons = Array.isArray(d) ? d : [];
    state.couponsLoaded = true;
    renderCoupons();
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') {
      tb.innerHTML = tableEmpty(5, 'No se pudieron cargar los cupones.', 'Error de comunicación con el servidor.');
    }
  }
}

function renderCoupons() {
  const tb = document.getElementById('coupons-tbody');
  if (!state.coupons.length) {
    tb.innerHTML = tableEmpty(5, 'No hay cupones.', 'Crea tu primer código de descuento con el formulario.');
    return;
  }
  tb.innerHTML = state.coupons.map(c => `
    <tr>
      <td data-label="Código"><span class="cell-code">${escapeHTML(c.code || '—')}</span></td>
      <td data-label="Tipo">${c.type === 'fixed' ? '<span class="chip chip-fixed">Fijo</span>' : '<span class="chip chip-percent">%</span>'}</td>
      <td data-label="Valor" class="num">${c.type === 'fixed' ? formatCLP(c.value) : escapeHTML(String(c.value)) + '%'}</td>
      <td data-label="Descripción">${escapeHTML(c.desc || '—')}</td>
      <td data-label="Acciones" class="cell-actions">
        <button type="button" class="btn-ghost danger" data-action="delete-coupon" data-code="${escapeHTML(c.code || '')}">${icon('trash', 14)}<span>Eliminar</span></button>
      </td>
    </tr>`).join('');
}

function handleCouponSubmit(e) {
  e.preventDefault();
  const code = document.getElementById('c-code').value.trim();
  const type = document.getElementById('c-type').value;
  const value = document.getElementById('c-value').value.trim();
  const errs = {};
  if (!code) errs['c-code'] = 'El código es obligatorio.';
  if (value === '' || !Number.isInteger(Number(value)) || Number(value) < 1) {
    errs['c-value'] = 'Ingresa un valor entero mayor o igual a 1.';
  } else if (type === 'percent' && Number(value) > 100) {
    errs['c-value'] = 'El porcentaje debe estar entre 1 y 100.';
  }
  if (Object.keys(errs).length) {
    renderFieldErrors(errs);
    return;
  }

  const payload = { code, type, value: Number(value), desc: document.getElementById('c-desc').value.trim() };
  const btn = document.getElementById('coupon-save-btn');
  const banner = document.getElementById('coupon-form-error');
  btn.disabled = true;
  btn.textContent = 'Guardando…';
  banner.hidden = true;

  apiFetch('/api/admin/coupons/create', { method: 'POST', body: JSON.stringify(payload) })
    .then(async res => {
      const d = await res.json().catch(() => ({}));
      if (!res.ok) {
        banner.textContent = d.error || 'No se pudo guardar el cupón.';
        banner.hidden = false;
        return;
      }
      if (Array.isArray(d.cupones)) state.coupons = d.cupones;
      renderCoupons();
      document.getElementById('coupon-form').reset();
      showToast(d.mensaje || 'Cupón guardado.');
    })
    .catch(err => {
      if (String(err.message) !== 'Sesión expirada') {
        banner.textContent = 'Error de comunicación con el servidor.';
        banner.hidden = false;
      }
    })
    .finally(() => {
      btn.disabled = false;
      btn.textContent = 'Guardar Cupón';
    });
}

async function deleteCoupon(code) {
  const r = await openConfirm({
    title: 'Eliminar cupón',
    message: `¿Eliminar el cupón "${code}"? Los clientes ya no podrán usarlo.`,
    confirmLabel: 'Eliminar',
    danger: true
  });
  if (!r.ok) return;
  try {
    const res = await apiFetch('/api/admin/coupons/delete', { method: 'POST', body: JSON.stringify({ code }) });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) {
      showToast(d.error || 'No se pudo eliminar el cupón.', 'error');
      return;
    }
    if (Array.isArray(d.cupones)) state.coupons = d.cupones;
    renderCoupons();
    showToast(d.mensaje || 'Cupón eliminado.');
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') showToast('Error de comunicación con el servidor.', 'error');
  }
}

/* ==========================================================================
   VISTA: GALERÍA DE CLIENTES
   ========================================================================== */
async function fetchGallery() {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '<div class="panel-list">' + '<span class="skeleton-line" style="width:90%;margin:8px 6px"></span>'.repeat(5) + '</div>';
  try {
    const [setRes, listRes] = await Promise.all([apiFetch('/api/settings'), apiFetch('/api/gallery')]);
    if (!setRes.ok || !listRes.ok) {
      showToast('No se pudo cargar la galería.', 'error');
      grid.innerHTML = '<div class="panel-card"><p class="panel-empty">No se pudo cargar la galería. Usa Actualizar para reintentar.</p></div>';
      return;
    }
    const set = await setRes.json().catch(() => ({}));
    const list = await listRes.json().catch(() => []);
    state.galleryEnabled = !!set.galleryEnabled;
    state.gallery = Array.isArray(list) ? list : [];
    state.galleryLoaded = true;
    document.getElementById('gallery-toggle').checked = state.galleryEnabled;
    renderGalleryGrid();
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') showToast('Error de comunicación con el servidor.', 'error');
  }
}

function renderGalleryGrid() {
  const grid = document.getElementById('gallery-grid');
  if (!state.gallery.length) {
    grid.innerHTML = '<div class="panel-card"><p class="panel-empty">Aún no hay fotos en la galería. Agrega la primera con el formulario.</p></div>';
    return;
  }
  grid.innerHTML = state.gallery.map(item => `
    <figure class="gallery-item">
      <img src="${escapeHTML(item.imagen || '')}" alt="Foto de ${escapeHTML(item.user || '')}" loading="lazy" onerror="this.classList.add('thumb-broken')">
      <button type="button" class="gallery-del" data-action="delete-gallery" data-id="${escapeHTML(String(item.id ?? ''))}" aria-label="Eliminar foto de ${escapeHTML(item.user || '')}">${icon('trash', 15)}</button>
      <figcaption class="gallery-cap">
        <strong>${escapeHTML(item.user || '—')}</strong>
        ${starRow(item.stars)}
        ${item.comment ? `<p>${escapeHTML(item.comment)}</p>` : ''}
      </figcaption>
    </figure>`).join('');
}

/* Estrellas de la galería: los datos guardan cadenas con el carácter U+2B50;
   se muestran como iconos SVG, nunca como texto. */
function starsData(n) {
  return Array.from({ length: n }, () => String.fromCodePoint(0x2B50)).join(' ');
}

function starRow(stars) {
  const count = (String(stars || '').match(new RegExp(String.fromCodePoint(0x2B50), 'g')) || []).length;
  if (!count) return '';
  let out = '';
  for (let i = 0; i < Math.min(count, 5); i++) out += icon('star', 12);
  return `<span class="stars">${out}</span>`;
}

async function toggleGallery(enabled) {
  const sw = document.getElementById('gallery-toggle');
  sw.disabled = true;
  try {
    const res = await apiFetch('/api/admin/settings/toggle-gallery', { method: 'POST', body: JSON.stringify({ enabled }) });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) {
      showToast(d.error || 'No se pudo actualizar la galería.', 'error');
      sw.checked = !enabled;
      return;
    }
    state.galleryEnabled = !!(d.settings && d.settings.galleryEnabled);
    sw.checked = state.galleryEnabled;
    showToast(d.mensaje || (state.galleryEnabled ? 'Galería habilitada.' : 'Galería deshabilitada.'));
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') showToast('Error de comunicación con el servidor.', 'error');
  } finally {
    sw.disabled = false;
  }
}

function handleGallerySubmit(e) {
  e.preventDefault();
  const user = document.getElementById('g-user').value.trim();
  const imagen = document.getElementById('g-imagen').value.trim();
  const comment = document.getElementById('g-comment').value.trim();
  const errs = {};
  if (!user) errs['g-user'] = 'El usuario es obligatorio.';
  if (!imagen) errs['g-imagen'] = 'La URL de la foto es obligatoria.';
  else if (!/^https?:\/\//i.test(imagen)) errs['g-imagen'] = 'La URL debe comenzar con http(s).';
  if (!comment) errs['g-comment'] = 'El comentario es obligatorio.';
  if (Object.keys(errs).length) {
    renderFieldErrors(errs);
    return;
  }

  const payload = { user, stars: document.getElementById('g-stars').value, comment, imagen };
  const btn = document.getElementById('gallery-save-btn');
  const banner = document.getElementById('gallery-form-error');
  btn.disabled = true;
  btn.textContent = 'Guardando…';
  banner.hidden = true;

  apiFetch('/api/admin/gallery/add', { method: 'POST', body: JSON.stringify(payload) })
    .then(async res => {
      const d = await res.json().catch(() => ({}));
      if (!res.ok) {
        banner.textContent = d.error || 'No se pudo agregar la foto.';
        banner.hidden = false;
        return;
      }
      if (Array.isArray(d.galeria)) state.gallery = d.galeria;
      renderGalleryGrid();
      document.getElementById('gallery-form').reset();
      showToast(d.mensaje || 'Foto agregada a la galería.');
    })
    .catch(err => {
      if (String(err.message) !== 'Sesión expirada') {
        banner.textContent = 'Error de comunicación con el servidor.';
        banner.hidden = false;
      }
    })
    .finally(() => {
      btn.disabled = false;
      btn.textContent = 'Agregar a la galería';
    });
}

async function deleteGalleryItem(id) {
  const r = await openConfirm({
    title: 'Eliminar foto',
    message: '¿Eliminar esta foto y reseña de la galería?',
    confirmLabel: 'Eliminar',
    danger: true
  });
  if (!r.ok) return;
  try {
    const res = await apiFetch('/api/admin/gallery/delete', { method: 'POST', body: JSON.stringify({ id }) });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) {
      showToast(d.error || 'No se pudo eliminar la foto.', 'error');
      return;
    }
    if (Array.isArray(d.galeria)) state.gallery = d.galeria;
    renderGalleryGrid();
    showToast(d.mensaje || 'Foto eliminada.');
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') showToast('Error de comunicación con el servidor.', 'error');
  }
}

/* ==========================================================================
   VISTA: USUARIOS
   ========================================================================== */
async function fetchUsers() {
  const tb = document.getElementById('users-tbody');
  tb.innerHTML = skeletonRows(4, 4);
  try {
    const res = await apiFetch('/api/admin/users');
    if (!res.ok) {
      showToast(await readError(res), 'error');
      tb.innerHTML = tableEmpty(4, 'No se pudieron cargar los usuarios.', 'Usa el botón Actualizar para reintentar.');
      return;
    }
    state.users = await res.json();
    state.usersLoaded = true;
    renderUsers();
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') {
      tb.innerHTML = tableEmpty(4, 'No se pudieron cargar los usuarios.', 'Error de comunicación con el servidor.');
    }
  }
}

function renderUsers() {
  const tb = document.getElementById('users-tbody');
  if (!state.users.length) {
    tb.innerHTML = tableEmpty(4, 'No hay usuarios.', '');
    return;
  }
  const meId = state.user ? String(state.user.id) : null;
  tb.innerHTML = state.users.map(u => {
    const isMe = meId !== null && String(u.id) === meId;
    const roleChip = u.role === 'admin'
      ? '<span class="chip chip-admin">admin</span>'
      : '<span class="chip chip-user">usuario</span>';
    const actionBtn = isMe
      ? '<span class="text-dim">—</span>'
      : `<button type="button" class="btn-ghost${u.role === 'admin' ? ' danger' : ''}" data-action="toggle-user-role" data-id="${escapeHTML(String(u.id))}">${u.role === 'admin' ? 'Quitar admin' : 'Hacer admin'}</button>`;
    return `<tr>
      <td data-label="Usuario">${escapeHTML(u.username || '—')}${isMe ? '<span class="badge-you">tú</span>' : ''}</td>
      <td data-label="Email">${escapeHTML(u.email || '—')}</td>
      <td data-label="Rol">${roleChip}</td>
      <td data-label="Acciones" class="cell-actions">${actionBtn}</td>
    </tr>`;
  }).join('');
}

async function toggleUserRole(id) {
  const user = state.users.find(u => String(u.id) === String(id));
  if (!user) return;
  const makeAdmin = user.role !== 'admin';
  const r = await openConfirm({
    title: makeAdmin ? 'Hacer administrador' : 'Quitar permisos de administrador',
    message: `¿${makeAdmin ? 'Otorgar permisos de administrador a' : 'Quitar los permisos de administrador a'} "${user.username}"?`,
    confirmLabel: makeAdmin ? 'Hacer admin' : 'Quitar admin',
    danger: !makeAdmin
  });
  if (!r.ok) return;
  try {
    const res = await apiFetch(`/api/admin/users/${encodeURIComponent(id)}/role`, {
      method: 'POST',
      body: JSON.stringify({ role: makeAdmin ? 'admin' : 'user' })
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) {
      showToast(d.error || 'No se pudo cambiar el rol.', 'error');
      return;
    }
    showToast(d.usuario && d.usuario.role === 'admin' ? 'Ahora es administrador.' : 'Ya no es administrador.');
    fetchUsers();
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') showToast('Error de comunicación con el servidor.', 'error');
  }
}

/* ==========================================================================
   VISTA: AJUSTES — estado del sistema, preferencias y privacidad
   ========================================================================== */
function ensureSystemStatus() {
  if (!state.sysChecked) fetchSystemStatus(false);
}

async function fetchSystemStatus(force) {
  if (state.sysChecked && !force) return;
  const el = document.getElementById('sys-status');
  el.innerHTML = '<div class="panel-list">' +
    '<span class="skeleton-line" style="margin:10px 20px;width:72%"></span>'.repeat(3) + '</div>';
  try {
    const res = await apiFetch('/api/debug/mongo');
    if (!res.ok) {
      renderSystemStatus(null);
      state.sysChecked = true;
      return;
    }
    const d = await res.json();
    renderSystemStatus(d);
    state.sysChecked = true;
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') renderSystemStatus(null);
  }
}

function renderSystemStatus(d) {
  const el = document.getElementById('sys-status');
  if (!d) {
    el.innerHTML = `
      <div class="settings-row"><span class="settings-label">MongoDB</span><span class="chip chip-cancelada">No disponible</span></div>
      <div class="settings-row"><span class="settings-label">URI configurada</span><span class="settings-value">—</span></div>
      <div class="settings-row"><span class="settings-label">Último error</span><span class="settings-value">No disponible</span></div>`;
    return;
  }
  const mongoChip = d.connected
    ? '<span class="chip chip-pagada">Conectado</span>'
    : '<span class="chip chip-rechazada">Desconectado</span>';
  el.innerHTML = `
    <div class="settings-row"><span class="settings-label">MongoDB</span>${mongoChip}</div>
    <div class="settings-row"><span class="settings-label">URI configurada</span><span class="settings-value">${d.hasUri ? 'Sí' : 'No'}</span></div>
    <div class="settings-row"><span class="settings-label">Último error</span><span class="settings-value">${escapeHTML(d.lastError || '—')}</span></div>`;
}

/* Preferencias: tema (misma clave que la tienda) y tamaño de página */
function setTheme(theme) {
  const light = theme === 'light';
  document.documentElement.classList.toggle('light-mode', light);
  try {
    localStorage.setItem('zonaswitch_theme', light ? 'light' : 'dark');
  } catch (e) {}
  document.querySelectorAll('#theme-seg .seg-btn').forEach(b => {
    b.classList.toggle('active', (b.dataset.theme === 'light') === light);
  });
}

function initSettings() {
  const isLight = document.documentElement.classList.contains('light-mode');
  document.querySelectorAll('#theme-seg .seg-btn').forEach(b => {
    b.classList.toggle('active', (b.dataset.theme === 'light') === isLight);
  });
  const sel = document.getElementById('settings-pagesize');
  sel.innerHTML = PAGE_SIZES.map(s =>
    `<option value="${s}"${s === state.pageSize ? ' selected' : ''}>${s} por página</option>`
  ).join('');
}

/* Privacidad: estado de seguimiento de la cuenta admin (desde el gate) */
function renderPrivacyRow() {
  const row = document.getElementById('privacy-optout-row');
  if (!state.user || state.user.trackingOptOut === undefined) {
    row.hidden = true;
    return;
  }
  row.hidden = false;
  document.getElementById('privacy-optout-chip').innerHTML = state.user.trackingOptOut
    ? '<span class="chip chip-cancelada">Seguimiento desactivado</span>'
    : '<span class="chip chip-pagada">Seguimiento activado</span>';
}

/* ==========================================================================
   IMPORTAR / EXPORTAR JUEGOS
   ========================================================================== */
const CSV_COLUMNS = ['id', 'titulo', 'categoria', 'precioSecundaria', 'precioPrimaria', 'precioOriginal', 'rating', 'peso', 'imagen', 'imagenDetalle', 'descripcion', 'resumenExtenso', 'youtubeUrl', 'visible', 'stockPrimaria', 'stockSecundaria', 'createdAt'];

function openImportModal() {
  state.importPayload = null;
  state.importPreview = null;
  document.getElementById('import-file').value = '';
  document.getElementById('import-json').value = '';
  document.getElementById('import-preview').hidden = true;
  document.getElementById('import-form-error').hidden = true;
  const btn = document.getElementById('import-apply-btn');
  btn.disabled = true;
  btn.textContent = 'Aplicar juegos';
  openModal('import-modal');
}

function showImportError(msg) {
  const b = document.getElementById('import-form-error');
  b.textContent = msg;
  b.hidden = false;
}

function handleImportFile(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  document.getElementById('import-json').value = '';
  const reader = new FileReader();
  reader.onload = () => {
    const text = String(reader.result || '');
    if (/\.json$/i.test(file.name)) {
      let rows = null;
      try {
        rows = JSON.parse(text);
      } catch (err) {
        showImportError('El archivo JSON no es válido: ' + err.message);
        return;
      }
      if (!Array.isArray(rows)) {
        showImportError('El JSON debe ser un arreglo de juegos.');
        return;
      }
      state.importPayload = { rows };
    } else {
      state.importPayload = { csv: text };
    }
    previewImport();
  };
  reader.readAsText(file);
}

function handleImportJsonInput() {
  clearTimeout(state.importTimer);
  state.importTimer = setTimeout(() => {
    const text = document.getElementById('import-json').value.trim();
    if (!text) return;
    let rows = null;
    try {
      rows = JSON.parse(text);
    } catch (err) {
      showImportError('El JSON pegado no es válido: ' + err.message);
      return;
    }
    if (!Array.isArray(rows)) {
      showImportError('El JSON debe ser un arreglo de juegos.');
      return;
    }
    document.getElementById('import-file').value = '';
    state.importPayload = { rows };
    previewImport();
  }, 400);
}

async function previewImport() {
  document.getElementById('import-form-error').hidden = true;
  try {
    const res = await apiFetch('/api/admin/juegos/import/preview', { method: 'POST', body: JSON.stringify(state.importPayload) });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) {
      showImportError(d.error || 'No se pudo previsualizar la importación.');
      return;
    }
    state.importPreview = d;
    renderImportPreview(d);
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') showImportError('Error de comunicación con el servidor.');
  }
}

function renderImportPreview(d) {
  const valid = Number(d.valid) || 0;
  const invalid = Number(d.invalid) || 0;
  const dups = Number(d.duplicates) || 0;
  const errors = Array.isArray(d.errors) ? d.errors : [];
  document.getElementById('import-preview').hidden = false;
  document.getElementById('import-summary').innerHTML =
    `<span class="chip chip-pagada">${valid} juegos válidos</span>` +
    (invalid ? `<span class="chip chip-rechazada">${invalid} con errores</span>` : '') +
    (dups ? `<span class="chip chip-pendiente">${dups} duplicados</span>` : '');
  const wrap = document.getElementById('import-errors-wrap');
  wrap.hidden = errors.length === 0;
  document.getElementById('import-errors-tbody').innerHTML = errors.map(err =>
    `<tr><td>${escapeHTML(String(err.row ?? ''))}</td><td>${escapeHTML(String(err.field ?? ''))}</td><td>${escapeHTML(String(err.message ?? ''))}</td></tr>`
  ).join('');
  const btn = document.getElementById('import-apply-btn');
  btn.disabled = valid === 0;
  btn.textContent = `Aplicar ${valid} juegos`;
}

async function applyImport() {
  if (!state.importPayload || !state.importPreview) return;
  const btn = document.getElementById('import-apply-btn');
  btn.disabled = true;
  btn.textContent = 'Importando…';
  try {
    const res = await apiFetch('/api/admin/juegos/import/commit', { method: 'POST', body: JSON.stringify(state.importPayload) });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) {
      showImportError(d.error || 'No se pudo importar.');
      btn.disabled = false;
      btn.textContent = 'Aplicar juegos';
      return;
    }
    if (Array.isArray(d.juegos)) {
      state.games = d.juegos;
      renderGames();
    }
    closeModal('import-modal');
    showToast(d.imported ? `${d.imported} juegos importados.` : (d.mensaje || 'Importación completada.'));
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') showImportError('Error de comunicación con el servidor.');
  }
}

/* --- Exportar --- */
function downloadFile(name, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function csvCell(v) {
  let s = String(v === null || v === undefined ? '' : v);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return '"' + s.replace(/"/g, '""') + '"';
}

function exportGamesCsv() {
  const lines = [CSV_COLUMNS.map(csvCell).join(',')];
  state.games.forEach(g => lines.push(CSV_COLUMNS.map(c => csvCell(g[c])).join(',')));
  downloadFile('juegos.csv', '\uFEFF' + lines.join('\r\n'), 'text/csv;charset=utf-8');
  showToast('Archivo CSV descargado.');
}

function exportGamesJson() {
  const clean = state.games.map(g => {
    const out = {};
    Object.keys(g).forEach(k => {
      if (!['cuentas', 'soldPrimaria', 'soldSecundaria', 'siguienteVarianteIndex', 'deletedAt'].includes(k)) out[k] = g[k];
    });
    return out;
  });
  downloadFile('juegos.json', JSON.stringify(clean, null, 2), 'application/json');
  showToast('Archivo JSON descargado.');
}

function exportMenuItems() {
  return [
    { label: 'CSV (para Excel)', icon: 'download', action: exportGamesCsv },
    { label: 'JSON', icon: 'download', action: exportGamesJson }
  ];
}

/* ==========================================================================
   MENÚ KEBAB (posición fija, nunca recortado por overflow)
   ========================================================================== */
function openKebab(items, anchor) {
  const menu = document.getElementById('kebab-menu');
  menu.innerHTML = items.map((it, i) =>
    `<button type="button" class="kebab-item${it.danger ? ' kebab-danger' : ''}" data-kebab-index="${i}">${icon(it.icon, 16)}<span>${escapeHTML(it.label)}</span></button>`
  ).join('');

  const r = anchor.getBoundingClientRect();
  const menuW = 210;
  const left = Math.min(r.right - menuW + 8, window.innerWidth - menuW - 8);
  menu.style.top = Math.max(8, r.bottom + 6) + 'px';
  menu.style.left = Math.max(8, left) + 'px';
  menu._items = items;
  menu._anchor = anchor;
  menu.hidden = false;
  anchor.setAttribute('aria-expanded', 'true');
  const first = menu.querySelector('button');
  if (first) first.focus();
}

function closeKebab() {
  const menu = document.getElementById('kebab-menu');
  if (menu.hidden) return;
  menu.hidden = true;
  const anchor = menu._anchor;
  if (anchor) {
    anchor.setAttribute('aria-expanded', 'false');
    if (anchor.focus) anchor.focus();
  }
  menu._items = null;
  menu._anchor = null;
}

function openKebabAt(btn) {
  let items = null;
  if (btn.dataset.id !== undefined) {
    const g = state.games.find(x => Number(x.id) === Number(btn.dataset.id));
    if (g) items = gameKebabItems(g);
  } else if (btn.dataset.code !== undefined) {
    const o = (Array.isArray(state.orders) ? state.orders : []).find(x => String(x.codigoOrden) === String(btn.dataset.code));
    if (o) items = orderKebabItems(o);
  }
  if (items) openKebab(items, btn);
}

/* ==========================================================================
   MODALES
   ========================================================================== */
let lastFocus = null;

function openModal(id) {
  lastFocus = document.activeElement;
  const modal = document.getElementById(id);
  modal.hidden = false;
  const first = modal.querySelector('input, textarea, select, button');
  if (first && first.focus) first.focus();
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}

/* ==========================================================================
   CONFIRM DIALOG (reemplaza confirm()/prompt())
   Opciones: title, message, textareaLabel (motivo opcional), required,
   confirmLabel, danger, confirmText (el usuario debe tipear el texto exacto
   para habilitar Confirmar), onConfirm (async; si devuelve {ok:false,error}
   el diálogo se mantiene abierto mostrando el error).
   ========================================================================== */
let confirmResolver = null;
let confirmOptions = null;
let confirmBusy = false;

function confirmYesDisabled() {
  const opts = confirmOptions || {};
  if (opts.confirmText !== null && opts.confirmText !== undefined) {
    return document.getElementById('confirm-text').value !== opts.confirmText;
  }
  if (opts.checkboxLabel !== null && opts.checkboxLabel !== undefined) {
    return !document.getElementById('confirm-check').checked;
  }
  return false;
}

function openConfirm({ title, message, textareaLabel = null, required = false, confirmLabel = 'Confirmar', danger = false, confirmText = null, checkboxLabel = null, onConfirm = null }) {
  confirmOptions = { confirmText, checkboxLabel, confirmLabel, required };
  confirmBusy = false;
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-msg').textContent = message;
  const wrap = document.getElementById('confirm-reason-wrap');
  const ta = document.getElementById('confirm-reason');
  wrap.hidden = !textareaLabel;
  document.getElementById('confirm-reason-label').textContent = textareaLabel || '';
  ta.value = '';
  document.getElementById('confirm-reason-err').textContent = '';
  ta.required = !!required;

  const txtWrap = document.getElementById('confirm-text-wrap');
  const txt = document.getElementById('confirm-text');
  txtWrap.hidden = confirmText === null || confirmText === undefined;
  document.getElementById('confirm-text-label').textContent = 'Escribí el título para confirmar';
  txt.value = '';
  document.getElementById('confirm-text-err').textContent = '';

  const chkWrap = document.getElementById('confirm-check-wrap');
  const chk = document.getElementById('confirm-check');
  chkWrap.hidden = checkboxLabel === null || checkboxLabel === undefined;
  document.getElementById('confirm-check-text').textContent = checkboxLabel || '';
  chk.checked = false;
  document.getElementById('confirm-check-err').textContent = '';

  document.getElementById('confirm-api-error').hidden = true;

  const yes = document.getElementById('confirm-yes');
  yes.textContent = confirmLabel;
  yes.classList.toggle('btn-danger', !!danger);
  yes.classList.toggle('btn-primary', !danger);
  yes.disabled = confirmYesDisabled();
  openModal('confirm-modal');
  if (textareaLabel) ta.focus();
  else if (confirmText !== null && confirmText !== undefined) txt.focus();
  else if (checkboxLabel !== null && checkboxLabel !== undefined) chk.focus();
  else yes.focus();
  return new Promise(res => {
    confirmResolver = res;
  });
}

function finishConfirm(result) {
  const resolve = confirmResolver;
  confirmResolver = null;
  confirmOptions = null;
  closeModal('confirm-modal');
  resolve(result);
}

function resolveConfirm(ok) {
  if (!confirmResolver || confirmBusy) return;
  const opts = confirmOptions || {};
  const ta = document.getElementById('confirm-reason');
  const txt = document.getElementById('confirm-text');
  const chk = document.getElementById('confirm-check');
  const reason = ta.value.trim();
  if (ok && ta.required && !reason) {
    document.getElementById('confirm-reason-err').textContent = 'El motivo es obligatorio.';
    ta.focus();
    return;
  }
  if (ok && opts.confirmText !== null && opts.confirmText !== undefined && txt.value !== opts.confirmText) {
    document.getElementById('confirm-text-err').textContent = 'El texto no coincide con el título del juego.';
    txt.focus();
    return;
  }
  if (ok && opts.checkboxLabel !== null && opts.checkboxLabel !== undefined && !chk.checked) {
    document.getElementById('confirm-check-err').textContent = 'Debes confirmar para continuar.';
    chk.focus();
    return;
  }
  if (ok && opts.onConfirm) {
    confirmBusy = true;
    const yes = document.getElementById('confirm-yes');
    yes.disabled = true;
    yes.textContent = 'Procesando…';
    Promise.resolve(opts.onConfirm(reason, txt.value)).then(result => {
      if (result && result.ok) {
        finishConfirm({ ok: true, reason });
        return;
      }
      confirmBusy = false;
      yes.disabled = confirmYesDisabled();
      yes.textContent = opts.confirmLabel;
      const errEl = document.getElementById('confirm-api-error');
      errEl.textContent = (result && result.error) || 'No se pudo completar la acción.';
      errEl.hidden = false;
    });
    return;
  }
  finishConfirm({ ok, reason });
}

/* ==========================================================================
   DELEGACIÓN DE EVENTOS
   ========================================================================== */
document.addEventListener('click', (e) => {
  /* Cierre del kebab: clic dentro ejecuta la acción, clic fuera cierra */
  const menu = document.getElementById('kebab-menu');
  if (!menu.hidden) {
    if (menu.contains(e.target)) {
      const btn = e.target.closest('[data-kebab-index]');
      if (btn) {
        const items = menu._items || [];
        const item = items[Number(btn.dataset.kebabIndex)];
        closeKebab();
        if (item && item.action) item.action();
      }
      return;
    }
    closeKebab();
  }

  /* Clic en el fondo de un modal (excepto confirm: requiere decisión explícita) */
  if (e.target.classList && e.target.classList.contains('modal-backdrop')) {
    if (e.target.id !== 'confirm-modal') closeModal(e.target.id);
    return;
  }

  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;
  switch (action) {
    case 'toggle-rail': toggleRail(); break;
    case 'nav': switchView(el.dataset.view); break;
    case 'create-game': openGameModal(null); break;
    case 'edit-game': openGameModal(Number(el.dataset.id)); break;
    case 'refresh-games': fetchGames(); break;
    case 'refresh-orders': fetchOrders(); break;
    case 'sort': toggleSort(el.dataset.key); break;
    case 'kebab': openKebabAt(el); break;
    case 'page-prev': gotoPage(-1); break;
    case 'page-next': gotoPage(1); break;
    case 'close-modal': closeModal(el.dataset.modal); break;
    case 'open-order': openOrderDetail(el.dataset.code); break;
    case 'order-resend': resendDelivery(el.dataset.code); break;
    case 'order-retry': retryPayment(el.dataset.code); break;
    case 'order-cancel': cancelOrder(el.dataset.code); break;
    case 'order-refund': refundOrder(el.dataset.code); break;
    case 'refresh-dash': fetchDash(); break;
    case 'open-import': openImportModal(); break;
    case 'export-menu': openKebab(exportMenuItems(), el); break;
    case 'refresh-coupons': fetchCouponsAdmin(); break;
    case 'delete-coupon': deleteCoupon(el.dataset.code); break;
    case 'refresh-gallery': fetchGallery(); break;
    case 'delete-gallery': deleteGalleryItem(Number(el.dataset.id)); break;
    case 'refresh-users': fetchUsers(); break;
    case 'toggle-user-role': toggleUserRole(el.dataset.id); break;
    case 'clear-selection':
      state.selectedGames.clear();
      renderGames();
      break;
    case 'bulk-toggle': bulkToggleVisibility(el.dataset.visible === '1'); break;
    case 'bulk-edit': openBulkEditModal(); break;
    case 'bulk-delete': bulkPermanentDelete(); break;
    case 'check-mongo': fetchSystemStatus(true); break;
    case 'set-theme': setTheme(el.dataset.theme); break;
  }
});

document.addEventListener('change', (e) => {
  const t = e.target;
  if (t.dataset.action === 'toggle-visibility') {
    t.disabled = true;
    toggleVisibility(Number(t.dataset.id), t.checked);
  } else if (t.dataset.action === 'toggle-select') {
    const id = Number(t.dataset.id);
    if (t.checked) state.selectedGames.add(id);
    else state.selectedGames.delete(id);
    renderGames();
  } else if (t.dataset.action === 'page-size') {
    const v = Number(t.value);
    state.pageSize = PAGE_SIZES.includes(v) ? v : DEFAULT_PAGE_SIZE;
    try {
      localStorage.setItem('zonaswitch_admin_pagesize', String(state.pageSize));
    } catch (err) {}
    state.gamesPage = 1;
    state.ordersPage = 1;
    if (state.view === 'juegos') renderGames();
    else if (state.view === 'pedidos') renderOrders();
  } else if (t.id === 'select-all-games') {
    const ids = state.currentGamePage.map(g => g.id);
    ids.forEach(id => {
      if (t.checked) state.selectedGames.add(id);
      else state.selectedGames.delete(id);
    });
    renderGames();
  } else if (t.id === 'confirm-check') {
    document.getElementById('confirm-yes').disabled = !t.checked;
    document.getElementById('confirm-api-error').hidden = true;
  } else if (t.id === 'orders-status') {
    state.ordersStatus = t.value;
    state.ordersPage = 1;
    fetchOrders();
  } else if (t.id === 'settings-pagesize') {
    const v = Number(t.value);
    state.pageSize = PAGE_SIZES.includes(v) ? v : DEFAULT_PAGE_SIZE;
    try {
      localStorage.setItem('zonaswitch_admin_pagesize', String(state.pageSize));
    } catch (err) {}
  } else if (t.id === 'gallery-toggle') {
    toggleGallery(t.checked);
  } else if (t.id === 'import-file') {
    handleImportFile(e);
  }
});

document.addEventListener('input', (e) => {
  const t = e.target;
  if (t.id === 'games-search') {
    state.gamesQuery = t.value;
    state.gamesPage = 1;
    renderGames();
  } else if (t.id === 'orders-search') {
    state.ordersQuery = t.value;
    clearTimeout(state.ordersTimer);
    state.ordersTimer = setTimeout(() => {
      state.ordersPage = 1;
      fetchOrders();
    }, 300);
  } else if (t.id === 'f-imagen') {
    renderPreview('f-imagen', 'preview-imagen');
  } else if (t.id === 'f-imagen-detalle') {
    renderPreview('f-imagen-detalle', 'preview-imagen-detalle');
  } else if (t.id === 'import-json') {
    handleImportJsonInput();
  } else if (t.id === 'confirm-text') {
    document.getElementById('confirm-yes').disabled = confirmYesDisabled();
    document.getElementById('confirm-api-error').hidden = true;
  }
  /* Limpiar error de campo al escribir */
  const field = t.closest('.field');
  if (field) {
    field.classList.remove('invalid');
    const errEl = field.querySelector('.field-err');
    if (errEl) errEl.textContent = '';
  }
  if (t.closest('#game-form')) {
    document.getElementById('game-form-error').hidden = true;
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const menu = document.getElementById('kebab-menu');
    if (!menu.hidden) {
      closeKebab();
      return;
    }
    const conf = document.getElementById('confirm-modal');
    if (!conf.hidden) {
      resolveConfirm(false);
      return;
    }
    const open = [...document.querySelectorAll('.modal-backdrop')].find(m => !m.hidden);
    if (open) closeModal(open.id);
    return;
  }
  /* Atajo: '/' enfoca la búsqueda de la vista actual */
  if (e.key === '/' && !e.target.matches('input, textarea, select')) {
    e.preventDefault();
    const box = state.view === 'juegos'
      ? document.getElementById('games-search')
      : document.getElementById('orders-search');
    if (box) box.focus();
  }
});

/* ==========================================================================
   GATE DE ACCESO — /api/auth/me con Bearer. Nada sensible antes de esto.
   ========================================================================== */
async function gate() {
  try {
    const res = await apiFetch('/api/auth/me');
    if (!res.ok) {
      window.location.href = '/';
      return;
    }
    const d = await res.json();
    if (!d.usuario || d.usuario.role !== 'admin') {
      window.location.href = '/';
      return;
    }
    state.user = d.usuario;
    const name = d.usuario.username || 'Admin';
    document.getElementById('user-chip').innerHTML =
      `<span class="avatar">${escapeHTML(String(name).charAt(0).toUpperCase())}</span><span class="user-chip-name">${escapeHTML(name)}</span>`;
    init();
  } catch (err) {
    if (String(err.message) !== 'Sesión expirada') window.location.href = '/';
  }
}

function init() {
  document.getElementById('gate-loader').hidden = true;
  bindRail();
  renderNav();
  document.getElementById('g-stars').innerHTML =
    `<option value="${starsData(5)}">5 estrellas</option><option value="${starsData(4)}">4 estrellas</option>`;
  document.getElementById('game-form').addEventListener('submit', handleGameSubmit);
  document.getElementById('coupon-form').addEventListener('submit', handleCouponSubmit);
  document.getElementById('gallery-form').addEventListener('submit', handleGallerySubmit);
  document.getElementById('import-apply-btn').addEventListener('click', applyImport);
  document.getElementById('bulk-apply-btn').addEventListener('click', bulkEditApply);
  document.getElementById('confirm-no').addEventListener('click', () => resolveConfirm(false));
  document.getElementById('confirm-yes').addEventListener('click', () => resolveConfirm(true));
  initSettings();
  renderPrivacyRow();
  switchView('juegos');
}

gate();
