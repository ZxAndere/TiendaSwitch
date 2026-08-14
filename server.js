process.env.NODE_ENV = process.env.NODE_ENV || 'production';
require('dotenv').config();
const dns = require('dns');
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}
const { Resend } = require('resend');
const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const mongoose = require('mongoose');

// Nuevas dependencias de seguridad
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3000;
let isMongoConnected = false;
let mongoLastError = null;

// [MOVIDO] flowHeaders está declarado donde se utiliza (sección de Flow)

// Manejo seguro de variables de entorno — JWT_SECRET OBLIGATORIO en producción
let JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET.trim() === '') {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT;
  if (isProduction) {
    console.error('❌ FATAL: JWT_SECRET no está definido en las variables de entorno. El servidor NO puede arrancar sin esta variable en producción.');
    process.exit(1);
  }
  // En desarrollo local, generar un secreto aleatorio temporal
  JWT_SECRET = crypto.randomBytes(64).toString('hex');
  console.warn('⚠️ ADVERTENCIA: JWT_SECRET no definido. Usando secreto temporal aleatorio (NO USAR EN PRODUCCIÓN).');
}

const OPTIONAL_ENV_VARS = ['FLOW_API_KEY', 'FLOW_SECRET_KEY', 'MP_ACCESS_TOKEN', 'MP_PUBLIC_KEY', 'JWT_SECRET', 'FREECURRENCY_API_KEY'];
OPTIONAL_ENV_VARS.forEach(v => {
  if (!process.env[v] || process.env[v].trim() === '') {
    console.warn(`⚠️ ADVERTENCIA DE CONFIGURACIÓN: La variable '${v}' no está configurada en el entorno. Se usará un comportamiento seguro de respaldo.`);
  }
});

// Configurar cabeceras seguras (Helmet) y Sanitizar MongoDB con replaceWith (Problema 6 y 7)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      // 'unsafe-inline' requerido por los onclick= inline de la app; bloquea scripts externos
      scriptSrc: ["'self'", "'unsafe-inline'"],
      // helmet pone script-src-attr 'none' por defecto, lo que bloquea los onclick= inline
      // (la directiva script-src-attr tiene precedencia sobre script-src)
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      frameSrc: ["'self'", "https://www.youtube.com", "https://www.youtube-nocookie.com"],
      objectSrc: ["'none'"],
      formAction: ["'self'"],
      baseUri: ["'self'"],
      frameAncestors: ["'none'"]
    }
  }
}));
app.use(mongoSanitize({ replaceWith: '_' }));

// Middleware de Protección contra Parameter Pollution (HPP) (Problema 2)
app.use((req, res, next) => {
  if (req.query) {
    for (const k in req.query) {
      if (Array.isArray(req.query[k])) req.query[k] = req.query[k][0];
    }
  }
  if (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) {
    for (const k in req.body) {
      if (Array.isArray(req.body[k])) req.body[k] = req.body[k][0];
    }
  }
  next();
});

// Configurar CORS seguro restringido al dominio de producción, desarrollo local y pasarelas de pago
const allowedOrigins = [
  'https://zonaswitchchile.com',
  'https://www.zonaswitchchile.com',
  'https://flow.cl',
  'https://www.flow.cl',
  'https://sandbox.flow.cl',
  'https://mercadopago.cl',
  'https://www.mercadopago.cl',
  'https://www.mercadopago.com'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1') || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Manejar felizmente cualquier SyntaxError en JSON malformado (de pasarelas o bots) sin ensuciar logs
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: "Formato JSON no válido en la petición." });
  }
  next(err);
});

// Rechazar peticiones de archivos sensibles estáticos
app.use((req, res, next) => {
  const fileExt = path.extname(req.path).toLowerCase();
  if (['.json', '.env', '.pem', '.backup', '.bak', '.git', '.yml', '.yaml'].includes(fileExt)) {
    return res.status(403).json({ error: "Acceso denegado a archivos del sistema." });
  }
  next();
});

// Middleware para redirigir URLs con .html a URLs limpias (SEO & Clean URLs)
app.use((req, res, next) => {
  if (req.path.endsWith('.html')) {
    const cleanPath = req.path.slice(0, -5);
    const queryString = req.url.includes('?') ? req.url.slice(req.path.length) : '';
    if (cleanPath === '/index') {
      return res.redirect(301, '/' + queryString);
    }
    return res.redirect(301, cleanPath + queryString);
  }
  next();
});

// Servir archivos estáticos con cabeceras anti-caché seguras y extensión html transparente
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }
}));

// Rutas explícitas de URLs limpias
app.get('/faq', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'faq.html')));
app.get('/terminos', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'terminos.html')));
app.get('/juego', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'juego.html')));

// Servir juego.html para cualquier ruta limpia SEO de producto (ej: /Mario-Kart-8-Deluxe)
app.get('/:slug', (req, res, next) => {
  const slug = req.params.slug;
  if (!slug || slug.startsWith('api') || slug.includes('.') || ['faq', 'terminos', 'juego', 'favicon', 'logo', 'data', 'auth', 'user', 'admin'].some(x => slug.toLowerCase() === x.toLowerCase())) {
    return next();
  }

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const juegoFile = path.resolve(__dirname, 'public', 'juego.html');
  res.sendFile(juegoFile, (err) => {
    if (err) next();
  });
});

// Limitadores de peticiones (Rate Limiters)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { error: "Demasiados intentos desde esta IP. Por favor, intenta en 15 minutos." },
  standardHeaders: true,
  legacyHeaders: false
});

const userApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Demasiadas solicitudes a tu cuenta. Por favor, espera unos minutos." },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter general para APIs públicas (prevenir abuso/scraping)
const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Demasiadas solicitudes. Por favor, espera unos minutos." },
  standardHeaders: true,
  legacyHeaders: false
});

const checkoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Límite de compras excedido. Por favor, espera unos minutos." },
  standardHeaders: true,
  legacyHeaders: false
});

const emailOtpLimiter = new Map(); // Mapa en memoria para rate limit por dirección de correo (60s)

// Esquema de Usuario seguro
const userSchema = new mongoose.Schema({
  id: String,
  username: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: String,
  role: { type: String, default: 'user' },
  tokenVersion: { type: Number, default: 0 },
  deletedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

const gameSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  titulo: String,
  categoria: String,
  precioSecundaria: Number,
  precioPrimaria: Number,
  precioOriginal: Number,
  rating: Number,
  peso: String,
  imagen: String,
  imagenDetalle: String,
  descripcion: String,
  resumenExtenso: String,
  visible: { type: Boolean, default: true },
  stockPrimaria: { type: Number, default: null },
  stockSecundaria: { type: Number, default: null },
  soldPrimaria: { type: Number, default: 0 },
  soldSecundaria: { type: Number, default: 0 }
}, { strict: false });

const gallerySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  user: String,
  stars: String,
  comment: String,
  imagen: String
}, { strict: false });

const orderSchema = new mongoose.Schema({
  codigoOrden: { type: String, required: true, unique: true },
  flowOrder: String,
  usuario: String,
  email: String,
  juegos: Array,
  tipoLicencia: String,
  monto: Number,
  moneda: { type: String, default: 'CLP' },
  estado: String,
  fecha: { type: mongoose.Schema.Types.Mixed, default: Date.now },
  detallesPago: Object
}, { strict: false });

const UserModel = mongoose.model('User', userSchema);
const GameModel = mongoose.model('Game', gameSchema);
const GalleryModel = mongoose.model('Gallery', gallerySchema);
const OrderModel = mongoose.model('Order', orderSchema);

// Asegurar directorio de datos de forma segura (Directory Traversal Protection)
const DATA_DIR = path.resolve(__dirname, 'data');
const USERS_FILE = path.resolve(DATA_DIR, 'users.json');
const ORDERS_FILE = path.resolve(DATA_DIR, 'orders.json');
const GAMES_FILE = path.resolve(DATA_DIR, 'games.json');
const GALLERY_FILE = path.resolve(DATA_DIR, 'gallery.json');
const SETTINGS_FILE = path.resolve(DATA_DIR, 'settings.json');

// Helpers de validación de tipos y escritura atómica segura de JSON (Problemas 2 y 6)
function safeString(val) {
  return typeof val === 'string' ? val : '';
}

function isString(val) {
  return typeof val === 'string';
}

function safeWriteJsonSync(filePath, data) {
  const tmpPath = `${filePath}.${Date.now()}.${Math.random().toString(36).substring(2, 8)}.tmp`;
  try {
    const jsonStr = JSON.stringify(data, null, 2);
    fs.writeFileSync(tmpPath, jsonStr, 'utf8');
    fs.renameSync(tmpPath, filePath);
  } catch (err) {
    console.error(`❌ Error escribiendo de forma atómica en ${filePath}:`, err.message);
    if (fs.existsSync(tmpPath)) {
      try { fs.unlinkSync(tmpPath); } catch (e) {}
    }
  }
}

function safeReadJsonSync(filePath, fallback = []) {
  if (!fs.existsSync(filePath)) return fallback;
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content || !content.trim()) return fallback;
    return JSON.parse(content);
  } catch (err) {
    console.error(`❌ Error parseando JSON en ${filePath}:`, err.message);
    return fallback;
  }
}

// ============================================================
// Helpers de seguridad (audit 2026)
// ============================================================

// --- Campos NO públicos de juegos: credenciales y contadores internos ---
// stockPrimaria/stockSecundaria SÍ se exponen (la tienda muestra disponibilidad).
const PUBLIC_GAME_STRIPPED_FIELDS = [
  'cuentas',               // credenciales reales (cuenta / password / OTP)
  'siguienteVarianteIndex', // puntero round-robin interno
  'soldPrimaria',
  'soldSecundaria',
  'deletedAt'
];

function sanitizeGameForPublic(game) {
  if (!game || typeof game !== 'object') return game;
  const g = { ...game };
  PUBLIC_GAME_STRIPPED_FIELDS.forEach(f => delete g[f]);
  return g;
}

// --- Comparación de OTP en tiempo constante (anti timing attack) ---
function verifyOtpCode(storedCode, providedCode) {
  if (typeof storedCode !== 'string' || typeof providedCode !== 'string') return false;
  const a = Buffer.from(storedCode, 'utf8');
  const b = Buffer.from(providedCode, 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// --- Escape para contenido HTML (emails y respuestas) ---
function escapeHtmlEmail(str) {
  return String(str == null ? '' : str).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

// --- Validación de URLs de imágenes/videos: solo http(s), sin comillas ni espacios ---
function isSafeHttpUrl(url) {
  return isString(url) && /^https?:\/\/[^\s"'<>]+$/i.test(url.trim());
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Bloqueo de fuerza bruta por identidad de login (5 fallos → 15 min) ---
const LOGIN_LOCKOUT_MS = 15 * 60 * 1000;
const loginAttempts = new Map();

function recordLoginFailure(key) {
  const cur = loginAttempts.get(key) || { count: 0, lockedUntil: 0 };
  // Si el bloqueo ya expiró, reiniciar el contador (evita relockear con un solo fallo)
  if (cur.lockedUntil && Date.now() >= cur.lockedUntil) {
    cur.count = 0;
    cur.lockedUntil = 0;
  }
  cur.count += 1;
  cur.lockedUntil = cur.count >= 5 ? Date.now() + LOGIN_LOCKOUT_MS : cur.lockedUntil;
  loginAttempts.set(key, cur);
}

function loginLockedUntil(key) {
  const cur = loginAttempts.get(key);
  return cur && cur.lockedUntil && Date.now() < cur.lockedUntil ? cur.lockedUntil : 0;
}

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(USERS_FILE)) {
  safeWriteJsonSync(USERS_FILE, []);
}
if (!fs.existsSync(ORDERS_FILE)) {
  safeWriteJsonSync(ORDERS_FILE, []);
}

// Middlewares de Autenticación
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Token de acceso no proporcionado. Debes iniciar sesión." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido o expirado. Por favor, inicia sesión de nuevo." });
    }
    
    // Verificar tokenVersion para invalidar sesiones al cambiar la contraseña (soporta fallback local si no hay MongoDB)
    const findUser = async () => {
      if (isMongoConnected) {
        try {
          const mongoUser = await UserModel.findOne({ id: decoded.id });
          if (mongoUser) return mongoUser;
        } catch (e) {}
        // Si Mongo no tiene al usuario (desync), no rechazar el token: fallback local
      }
      const users = getUsers();
      return users.find(u => u.id === decoded.id);
    };

    findUser().then(user => {
      if (!user || (user.tokenVersion !== undefined && user.tokenVersion !== decoded.tokenVersion)) {
        return res.status(403).json({ error: "Sesión revocada o expirada. Por favor, inicia sesión nuevamente." });
      }
      req.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role || 'user'
      };
      next();
    }).catch(err => {
      console.error("Error en verifyToken:", err);
      res.status(500).json({ error: "Error interno en la autenticación." });
    });
  });
}

function verifyAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: "Acceso denegado. Se requieren permisos de administrador." });
    }
    next();
  });
}

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI.trim())
    .then(async () => {
      isMongoConnected = true;
      mongoLastError = null;
      console.log('🍃 Conectado exitosamente a MongoDB Atlas (Base de Datos en Tiempo Real)');
      
      // Sincronizar usuarios desde MongoDB Atlas
      try {
        const mongoUsers = await UserModel.find({});
        if (mongoUsers.length > 0) {
          const formatted = mongoUsers.map(u => ({
            id: u.id || u._id.toString(),
            username: u.username,
            email: u.email,
            passwordHash: u.passwordHash,
            password: u.password,
            role: u.role || 'user',
            tokenVersion: u.tokenVersion || 0
          }));
          safeWriteJsonSync(USERS_FILE, formatted);
          console.log(`📥 Sincronizados ${formatted.length} usuarios desde MongoDB Atlas.`);
        }
      } catch (e) { console.error('Error cargando usuarios MongoDB:', e); }

      // Verificar órdenes en MongoDB Atlas sin cargar todas en la RAM (Problema 3)
      try {
        const mongoOrdersCount = await OrderModel.countDocuments({});
        console.log(`📥 Conectado a MongoDB Atlas. ${mongoOrdersCount} órdenes registradas (consultadas bajo demanda).`);
      } catch (e) { console.error('Error verificando órdenes MongoDB:', e); }

      // Sincronizar catálogo de juegos desde MongoDB Atlas
      try {
        const mongoGames = await GameModel.find({});
        if (mongoGames && mongoGames.length > 0) {
          GAMES_STORE = mongoGames.map(g => g.toObject());
          safeWriteJsonSync(GAMES_FILE, GAMES_STORE);
          console.log(`📥 Sincronizados ${GAMES_STORE.length} juegos desde MongoDB Atlas.`);
        } else if (Array.isArray(GAMES_STORE) && GAMES_STORE.length > 0) {
          GAMES_STORE.forEach(async (g) => {
            await GameModel.findOneAndUpdate({ id: g.id }, g, { upsert: true, returnDocument: 'after' });
          });
        }
      } catch (e) { console.error('Error cargando juegos MongoDB:', e); }

      // Sincronizar galería de clientes desde MongoDB Atlas
      try {
        const mongoGallery = await GalleryModel.find({});
        if (mongoGallery.length > 0) {
          GALLERY_STORE = mongoGallery.map(g => g.toObject());
          safeWriteJsonSync(GALLERY_FILE, GALLERY_STORE);
          console.log(`📥 Sincronizadas ${GALLERY_STORE.length} fotos de galería desde MongoDB Atlas.`);
        } else {
          GALLERY_STORE.forEach(async (g) => {
            await GalleryModel.findOneAndUpdate({ id: g.id }, g, { upsert: true, returnDocument: 'after' });
          });
        }
      } catch (e) { console.error('Error cargando galería MongoDB:', e); }
    })
    .catch(err => {
      mongoLastError = err.message;
      console.error('❌ Error de conexión a MongoDB Atlas:', err.message);
    });
}

// Endpoint de diagnóstico de MongoDB (PROTEGIDO — solo administradores)
app.get('/api/debug/mongo', verifyAdmin, (req, res) => {
  res.json({
    connected: isMongoConnected,
    hasUri: !!process.env.MONGODB_URI,
    uriLength: process.env.MONGODB_URI ? process.env.MONGODB_URI.trim().length : 0,
    lastError: mongoLastError
  });
});


// Gestión de usuarios (PROTEGIDO — solo administradores)
app.get('/api/admin/users', verifyAdmin, (req, res) => {
  res.json(getUsers().map(u => ({
    id: u.id,
    username: u.username,
    email: u.email,
    role: u.role || 'user',
    createdAt: u.createdAt
  })));
});

app.post('/api/admin/users/:id/role', verifyAdmin, async (req, res) => {
  const role = isString(req.body?.role) ? req.body.role.trim().toLowerCase() : '';
  if (role !== 'admin' && role !== 'user') {
    return res.status(400).json({ error: 'Rol inválido. Solo se permite "admin" o "user".' });
  }
  const users = getUsers();
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });
  if (user.id === req.user.id) return res.status(400).json({ error: 'No puedes cambiar tu propio rol.' });
  user.role = role;
  saveUsers(users);
  res.json({ exito: true, usuario: { id: user.id, username: user.username, role: user.role } });
});

// Detalle de una orden del usuario autenticado
app.get('/api/user/orders/:code', verifyToken, async (req, res) => {
  const order = await getOrderByCode(req.params.code);
  if (!order) return res.status(404).json({ error: 'Orden no encontrada.' });
  const sameUser = (normalizeEmail(order.email) && normalizeEmail(order.email) === normalizeEmail(req.user.email)) ||
                   (isString(order.usuario) && order.usuario.toLowerCase() === req.user.username.toLowerCase());
  if (!sameUser) return res.status(403).json({ error: 'No tienes acceso a esta orden.' });
  res.json(sanitizeOrderForUser(order));
});

// Eliminación de cuenta con confirmación de contraseña
app.delete('/api/user/account', verifyToken, userApiLimiter, async (req, res) => {
  const currentPassword = isString(req.body?.currentPassword) ? req.body.currentPassword : '';
  if (!currentPassword) return res.status(400).json({ error: 'Ingresa tu contraseña actual.' });
  const users = getUsers();
  const idx = users.findIndex(u => u.id === req.user.id);
  if (idx === -1) return res.status(404).json({ error: 'Usuario no encontrado.' });
  const ok = await verifyPassword(currentPassword, users[idx]);
  if (!ok) return res.status(400).json({ error: 'La contraseña actual es incorrecta.' });
  if (users[idx].role === 'admin') return res.status(400).json({ error: 'Una cuenta administradora no puede eliminarse desde aquí.' });
  const deletedId = users[idx].id;
  users.splice(idx, 1);
  saveUsers(users);
  if (isMongoConnected) await UserModel.deleteOne({ id: deletedId });

  const anonymize = (o) => {
    if (!o) return o;
    if (o.email && normalizeEmail(o.email) === normalizeEmail(req.user.email)) {
      o.email = `eliminado_${deletedId}@privado.invalid`;
      o.usuario = 'Cuenta eliminada';
      o.cliente = 'Cliente eliminado';
      addOrderEvent(o, 'account_deleted', 'La cuenta del cliente fue eliminada.', 'system');
    }
    return o;
  };
  const orders = safeReadJsonSync(ORDERS_FILE, []).map(anonymize);
  safeWriteJsonSync(ORDERS_FILE, orders);
  if (isMongoConnected) {
    await OrderModel.updateMany({ email: req.user.email }, { $set: { email: `eliminado_${deletedId}@privado.invalid`, usuario: 'Cuenta eliminada', cliente: 'Cliente eliminado' } });
  }
  res.json({ exito: true, mensaje: 'Cuenta eliminada correctamente.' });
});

// --- CONFIGURACIÓN E INTEGRACIÓN DE PASARELAS (FLOW Y MERCADO PAGO CHILE) ---
// IMPORTANTE: Las llaves API DEBEN estar configuradas en variables de entorno (.env)
// NO se proporcionan fallbacks hardcodeados por seguridad
const FLOW_API_KEY = (process.env.FLOW_API_KEY || '').trim().replace(/^["']|["']$/g, '');
const FLOW_SECRET_KEY = (process.env.FLOW_SECRET_KEY || '').trim().replace(/^["']|["']$/g, '');

if (!FLOW_API_KEY || !FLOW_SECRET_KEY) {
  console.warn('⚠️ ADVERTENCIA: FLOW_API_KEY y/o FLOW_SECRET_KEY no están configuradas. Los pagos con Flow NO funcionarán.');
}

let targetFlowUrl = (process.env.FLOW_API_URL || 'https://www.flow.cl/api').trim().replace(/^["']|["']$/g, '');
if (targetFlowUrl.includes('sandbox')) {
  targetFlowUrl = 'https://sandbox.flow.cl/api';
} else {
  targetFlowUrl = 'https://www.flow.cl/api';
}
const FLOW_API_URL = targetFlowUrl;

const MP_PUBLIC_KEY = (process.env.MP_PUBLIC_KEY || '').trim().replace(/^["']|["']$/g, '');
const MP_ACCESS_TOKEN = (process.env.MP_ACCESS_TOKEN || '').trim().replace(/^["']|["']$/g, '');

if (!MP_ACCESS_TOKEN) {
  console.warn('⚠️ ADVERTENCIA: MP_ACCESS_TOKEN no está configurada. Los pagos con Mercado Pago NO funcionarán.');
}

// Cache temporal en RAM de tamaño limitado para órdenes recientes (Problema 3)
const ORDERS_MEM_CACHE = new Map();

function cacheOrderInMemory(order) {
  if (!order || !order.codigoOrden) return;
  ORDERS_MEM_CACHE.set(order.codigoOrden, order);
  if (ORDERS_MEM_CACHE.size > 100) {
    const oldestKey = ORDERS_MEM_CACHE.keys().next().value;
    ORDERS_MEM_CACHE.delete(oldestKey);
  }
}

async function getOrdersByUser(username, email) {
  const cleanUser = isString(username) ? username.toLowerCase().trim() : '';
  const cleanEmail = isString(email) ? email.toLowerCase().trim() : '';

  if (isMongoConnected) {
    try {
      const query = [];
      if (cleanUser) query.push({ usuario: { $regex: new RegExp(`^${cleanUser}$`, 'i') } });
      if (cleanEmail) query.push({ email: { $regex: new RegExp(`^${cleanEmail}$`, 'i') } });
      if (query.length === 0) return [];
      const mongoOrders = await OrderModel.find({ $or: query }).lean();
      return mongoOrders;
    } catch (e) {
      console.error('Error al consultar órdenes en Mongo:', e);
    }
  }

  const orders = safeReadJsonSync(ORDERS_FILE, []);
  return orders.filter(o =>
    (cleanUser && o.usuario && o.usuario.toLowerCase() === cleanUser) ||
    (cleanEmail && o.email && o.email.toLowerCase() === cleanEmail)
  );
}

async function getOrderByCode(codigoOrden) {
  if (!codigoOrden || !isString(codigoOrden)) return null;
  const cleanCode = codigoOrden.trim();

  if (ORDERS_MEM_CACHE.has(cleanCode)) {
    return ORDERS_MEM_CACHE.get(cleanCode);
  }

  if (isMongoConnected) {
    try {
      const mongoOrder = await OrderModel.findOne({
        $or: [
          { codigoOrden: cleanCode },
          { token: cleanCode },
          { mpPreferenceId: cleanCode }
        ]
      }).lean();
      if (mongoOrder) {
        cacheOrderInMemory(mongoOrder);
        return mongoOrder;
      }
    } catch (e) {
      console.error('Error buscando orden por código en Mongo:', e);
    }
  }

  const orders = safeReadJsonSync(ORDERS_FILE, []);
  const found = orders.find(o => o.codigoOrden === cleanCode || o.token === cleanCode || o.mpPreferenceId === cleanCode);
  if (found) cacheOrderInMemory(found);
  return found || null;
}

async function saveSingleOrder(orderData) {
  if (!orderData || !orderData.codigoOrden) return;
  cacheOrderInMemory(orderData);

  if (isMongoConnected) {
    try {
      await OrderModel.findOneAndUpdate({ codigoOrden: orderData.codigoOrden }, orderData, { upsert: true, returnDocument: 'after' });
      console.log(`🍃 Orden ${orderData.codigoOrden} guardada/actualizada en MongoDB Atlas.`);
    } catch (err) {
      console.error('❌ Error guardando orden en Mongo:', err.message);
    }
  }

  try {
    const orders = safeReadJsonSync(ORDERS_FILE, []);
    const idx = orders.findIndex(o => o.codigoOrden === orderData.codigoOrden);
    if (idx !== -1) {
      orders[idx] = orderData;
    } else {
      orders.push(orderData);
    }
    safeWriteJsonSync(ORDERS_FILE, orders);
  } catch (e) {
    console.error('Error guardando orden localmente:', e);
  }
}



function addOrderEvent(order, type, detail = '', actor = 'system') {
  if (!order) return;
  if (!Array.isArray(order.history)) order.history = [];
  order.history.push({
    type,
    detail: isString(detail) ? detail.slice(0, 500) : '',
    actor: isString(actor) ? actor.slice(0, 120) : 'system',
    at: new Date().toISOString()
  });
}

function sanitizeOrderForUser(order) {
  if (!order) return null;
  return {
    codigoOrden: order.codigoOrden,
    cliente: order.cliente,
    usuario: order.usuario,
    email: order.email ? order.email.replace(/(.{2}).+(@.+)/, '$1***$2') : '',
    carrito: Array.isArray(order.carrito) ? order.carrito.map(item => ({
      id: item.id,
      titulo: item.titulo,
      cantidad: item.cantidad,
      licencia: item.licencia,
      precio: item.precio,
      entregado: !!item.varianteAsignada
    })) : [],
    articulos: order.articulos,
    total: order.total,
    totalFormatted: order.totalFormatted,
    fecha: order.fecha,
    estado: order.estado,
    metodoPago: order.metodoPago,
    deliveryStatus: order.deliveryStatus || (order.estado === 'pagada' ? 'pending' : 'not_ready'),
    history: Array.isArray(order.history) ? order.history : [],
    retryCount: Number(order.retryCount || 0)
  };
}

function getOrderForAdmin(order) {
  if (!order) return null;
  return {
    ...sanitizeOrderForUser(order),
    clienteCompleto: order.cliente,
    emailCompleto: order.email,
    carrito: Array.isArray(order.carrito) ? order.carrito.map(item => ({
      id: item.id,
      titulo: item.titulo,
      cantidad: item.cantidad,
      licencia: item.licencia,
      precio: item.precio,
      varianteAsignada: item.varianteAsignada || null
    })) : []
  };
}

function normalizeEmail(email) {
  return isString(email) ? email.trim().toLowerCase() : '';
}

function generateOtpCode() {
  return crypto.randomInt(100000, 1000000).toString();
}

let USERS_CACHE = [];

function loadUsersCache() {
  USERS_CACHE = safeReadJsonSync(USERS_FILE, []);
}

function saveUsers(users) {
  if (!Array.isArray(users)) return;
  USERS_CACHE = users;
  safeWriteJsonSync(USERS_FILE, users);

  if (isMongoConnected) {
    users.forEach(async (u) => {
      try {
        const cleanUser = {
          id: u.id,
          username: u.username,
          email: u.email,
          passwordHash: u.passwordHash,
          role: u.role || 'user',
          tokenVersion: u.tokenVersion || 0
        };
        await UserModel.findOneAndUpdate({ id: u.id }, cleanUser, { upsert: true, returnDocument: 'after' });
        console.log(`🍃 Usuario ${u.username} sincronizado en MongoDB Atlas.`);
      } catch (err) {
        console.error(`❌ Error guardando usuario ${u.username} en Mongo:`, err.message);
      }
    });
  }
}

async function verifyPassword(inputPassword, storedUser) {
  try {
    if (storedUser.passwordHash && storedUser.passwordHash.startsWith('$2')) {
      return await bcrypt.compare(inputPassword, storedUser.passwordHash);
    }
  } catch (e) {}

  // Auto-migración de hashes SHA-256 heredados a bcrypt (sin aceptar plaintext)
  const sha256Hash = crypto.createHash('sha256').update(inputPassword).digest('hex');
  if (storedUser.passwordHash === sha256Hash) {
    console.warn(`⚠️ [SEGURIDAD] Auto-migrando hash SHA-256 a bcrypt para usuario: ${storedUser.username}`);
    storedUser.passwordHash = await bcrypt.hash(inputPassword, 10);
    if (storedUser.password) delete storedUser.password;
    saveUsers(getUsers());
    return true;
  }
  return false;
}

function safeCompareSignatures(sigA, sigB) {
  if (typeof sigA !== 'string' || typeof sigB !== 'string') return false;
  const bufA = Buffer.from(sigA, 'utf8');
  const bufB = Buffer.from(sigB, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function signFlowParams(params) {
  const keys = Object.keys(params)
    .filter(k => k !== 's' && params[k] !== undefined && params[k] !== null)
    .sort();
  let toSign = '';
  keys.forEach(k => {
    toSign += k + params[k];
  });
  return crypto.createHmac('sha256', FLOW_SECRET_KEY).update(toSign).digest('hex');
}

function getValidatedBaseUrl(req) {
  const allowedHosts = ['zonaswitchchile.com', 'www.zonaswitchchile.com'];
  const rawHost = (req.get('x-forwarded-host') || req.get('host') || '').toLowerCase().trim();
  const hostName = rawHost.split(':')[0];
  if (hostName === 'localhost' || hostName === '127.0.0.1') {
    return `http://${rawHost || 'localhost:' + PORT}`;
  }
  if (allowedHosts.includes(hostName)) {
    return `https://${hostName}`;
  }
  return process.env.PUBLIC_URL || 'https://zonaswitchchile.com';
}

function formatFlowErrorMessage(flowData) {
  if (!flowData) return "No se pudo iniciar la transacción con Flow.";
  if (flowData.code === 1620) {
    return "El correo electrónico ingresado no es válido o su servidor de correo no fue verificado por Flow. Por favor usa un email válido (ej: tuusuario@gmail.com).";
  }
  if (flowData.code === 101 || flowData.code === 501 || flowData.code === 108) {
    return "Error de autenticación con la pasarela Flow (las llaves API ingresadas no son válidas o no corresponden al entorno Sandbox/Producción configurado).";
  }
  return flowData.message ? `Error Flow: ${flowData.message}` : "No se pudo procesar la transacción con la pasarela Flow.";
}

// [ELIMINADO] hashPassword SHA-256 — código muerto, todas las nuevas contraseñas usan bcrypt

// Función de asignación de cuentas en rotación (Round-Robin 🔄)
// Se ejecuta SOLO cuando el pago está verificado/confirmado, NO al crear la orden
function assignAccountsToOrder(orderData) {
  if (!orderData || !Array.isArray(orderData.carrito)) return;
  let anyAssigned = false;

  orderData.carrito = orderData.carrito.map(item => {
    if (item.varianteAsignada) return item;
    const gameInStore = GAMES_STORE.find(g => g.id === Number(item.id));
    if (!gameInStore || !Array.isArray(gameInStore.cuentas) || gameInStore.cuentas.length === 0) {
      return { ...item, varianteAsignada: `Licencia Oficial ${item.licencia} - ZonaSwitchChile` };
    }

    const quantity = Math.max(1, Number(item.cantidad) || 1);
    if (typeof gameInStore.siguienteVarianteIndex !== 'number') gameInStore.siguienteVarianteIndex = 0;
    const assigned = [];

    for (let n = 0; n < quantity; n += 1) {
      const varIdx = gameInStore.siguienteVarianteIndex % gameInStore.cuentas.length;
      const rawVariant = String(gameInStore.cuentas[varIdx] || '').trim();
      if (!rawVariant) continue;

      const parts = rawVariant.includes('/') ? rawVariant.split('/') : rawVariant.split('|');
      const cuentaVal = (parts[0] || '').trim();
      const passVal = (parts[1] || '').trim();
      const rawCodigos = (parts[2] || parts.slice(2).join('/')).trim();
      let codigoConsumido = '';
      if (rawCodigos) {
        const codigosList = rawCodigos.split(/[\n,]+/).map(c => c.trim()).filter(Boolean);
        if (codigosList.length > 0) {
          codigoConsumido = codigosList.shift();
          const codigosRestantes = codigosList.join(', ');
          let updatedVariantStr = cuentaVal;
          if (passVal || codigosRestantes) updatedVariantStr += ` / ${passVal}`;
          if (codigosRestantes) updatedVariantStr += ` / ${codigosRestantes}`;
          gameInStore.cuentas[varIdx] = updatedVariantStr;
        }
      }

      let finalAssigned = cuentaVal;
      if (passVal) finalAssigned += ` / ${passVal}`;
      if (codigoConsumido) finalAssigned += ` / Código OTP: ${codigoConsumido}`;
      assigned.push(finalAssigned);
      gameInStore.siguienteVarianteIndex = (gameInStore.siguienteVarianteIndex + 1) % gameInStore.cuentas.length;
      anyAssigned = true;
    }

    const assignedText = assigned.map((value, idx) => quantity > 1 ? `Cuenta ${idx + 1}: ${value}` : value).join('\n');
    if (item.licencia === 'Primaria' && Number.isInteger(gameInStore.stockPrimaria)) {
      gameInStore.stockPrimaria = Math.max(0, gameInStore.stockPrimaria - assigned.length);
      gameInStore.soldPrimaria = Number(gameInStore.soldPrimaria || 0) + assigned.length;
    }
    if (item.licencia === 'Secundaria' && Number.isInteger(gameInStore.stockSecundaria)) {
      gameInStore.stockSecundaria = Math.max(0, gameInStore.stockSecundaria - assigned.length);
      gameInStore.soldSecundaria = Number(gameInStore.soldSecundaria || 0) + assigned.length;
    }

    return {
      ...item,
      varianteAsignada: assignedText || `Licencia Oficial ${item.licencia} - ZonaSwitchChile`,
      correoTexto: gameInStore.correoTexto || item.correoTexto || '',
      correoImagen: gameInStore.correoImagen || item.correoImagen || ''
    };
  });

  if (anyAssigned) {
    orderData.deliveryStatus = 'assigned';
    addOrderEvent(orderData, 'account_assigned', 'Cuenta(s) asignada(s) automáticamente.', 'system');
    saveGamesLocal(GAMES_STORE);
    saveSingleOrder(orderData).catch(err => console.error('Error guardando orden con cuentas:', err));
    console.log(`🔑 [CUENTAS] Cuentas asignadas para orden ${orderData.codigoOrden}`);
  }
}

// Helpers para usuarios seguros
function getUsers() {
  return safeReadJsonSync(USERS_FILE, []);
}


// Catálogo de Juegos ZonaSwitchChile en CLP (Pesos Chilenos)
const JUEGOS = [
  {
    id: 1,
    titulo: "The Legend of Zelda: Tears of the Kingdom",
    categoria: "Acción / Aventura",
    precioSecundaria: 20000,
    precioPrimaria: 30000,
    precioOriginal: 64990,
    rating: 4.9,
    peso: "18.2 GB",
    imagen: "https://img-eshop.cdn.nintendo.net/i/9222b2b244072d28af4586c4e33663e2c65527b593edff956367361ec1263989.jpg",
    imagenDetalle: "https://c4.wallpaperflare.com/wallpaper/751/820/2/the-legend-of-zelda-the-legend-of-zelda-tears-of-the-kingdom-hd-wallpaper-preview.jpg",
    descripcion: "Explora las vastas tierras y los cielos de Hyrule en una aventura sin precedentes.",
    resumenExtenso: "En esta secuela de The Legend of Zelda: Breath of the Wild, te embarcarás en una épica travesía a través de la tierra y los cielos de Hyrule. Crea tus propias armas fantásticas con la habilidad Combinación y surca las alturas con la habilidad Ultramano."
  },
  {
    id: 2,
    titulo: "Super Mario Bros. Wonder",
    categoria: "Plataformas",
    precioSecundaria: 20000,
    precioPrimaria: 30000,
    precioOriginal: 54990,
    rating: 4.8,
    peso: "3.6 GB",
    imagen: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/2x1_NSwitch_SuperMarioBrosWonder.jpg",
    imagenDetalle: "https://m.media-amazon.com/images/M/MV5BMDBkYmVjZGItOTY3ZS00OThhLThkMTktYTA0ZjMzMWEwY2RlXkEyXkFqcGc@._V1_.jpg",
    descripcion: "¡La evolución clásica de Mario! Descubre transformaciones asombrosas y efectos Maravilla.",
    resumenExtenso: "¡Encuentra sorpresas en cada esquina con las Flores Maravilla! Transfórmate en Mario Elefante, utiliza nuevas habilidades de tubería y juega en modo cooperativo con tus personajes favoritos del Reino Champiñón."
  },
  {
    id: 3,
    titulo: "Hollow Knight",
    categoria: "Indie",
    precioSecundaria: 6000,
    precioPrimaria: 12000,
    precioOriginal: 13500,
    rating: 4.9,
    peso: "5.2 GB",
    imagen: "https://images.squarespace-cdn.com/content/v1/606d4deb4db8c15ea53b3624/1619052791039-U5P66XF1HX6OHSPMRHP0/banner_real.jpg",
    imagenDetalle: "https://i.pinimg.com/736x/30/bf/aa/30bfaa32ddcc5f3452e10f8a5eaa7739.jpg",
    descripcion: "Desciende al oscuro mundo de Hallownest en una obra maestra de acción 2D.",
    resumenExtenso: "Forge tu propio camino en Hollow Knight. Una aventura de acción épica a través de un vasto reino en ruinas repleto de insectos y héroes. Explora cavernas interconectadas, combate criaturas corrompidas y traba amistad con extraños bichos."
  },
  {
    id: 4,
    titulo: "Mario Kart 8 Deluxe",
    categoria: "Multijugador",
    precioSecundaria: 20000,
    precioPrimaria: 30000,
    precioOriginal: 54990,
    rating: 4.9,
    peso: "6.8 GB",
    imagen: "https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000000153/de697f487a36d802dd9a5ff0341f717c8486221f2f1219b675af37aca63bc453",
    imagenDetalle: "https://i.pinimg.com/736x/03/7d/50/037d508510a5d10684d5c0a567256b07.jpg",
    descripcion: "La versión definitiva de Mario Kart. ¡Compite con amigos en docenas de pistas épicas!",
    resumenExtenso: "Compite con tus amigos o enfréntate a corredores de todo el mundo en la versión definitiva de Mario Kart 8. Incluye todos los circuitos y personajes de la versión de Wii U, además de nuevos pilotos e ítems estratégicos."
  },
  {
    id: 5,
    titulo: "Metroid Dread",
    categoria: "Acción / Aventura",
    precioSecundaria: 20000,
    precioPrimaria: 30000,
    precioOriginal: 54990,
    rating: 4.7,
    peso: "4.1 GB",
    imagen: "https://assets.nintendo.com/image/upload/c_limit,f_auto,h_300,q_auto,w_500/v1/store/software/switch/70010000042924/Video/posters/108eba74975cb5b86a704357b65e925f0ee88d2f1d06fb6981beebbec42c4c9f",
    imagenDetalle: "https://nindigible.com/wp-content/uploads/2021/10/Metroid-Dread-Resena-Cover-1.jpg",
    descripcion: "Acompaña a Samus Aran en su escape de un peligroso mundo alienígena infestado de robots E.M.M.I.",
    resumenExtenso: "Únete a la cazarrecompensas intergaláctica Samus Aran en su primera historia en 2D de Metroid en 19 años. Escape del planeta ZDR mientras eres perseguido por letales robots de investigación E.M.M.I."
  },
  {
    id: 6,
    titulo: "Celeste",
    categoria: "Indie",
    precioSecundaria: 6000,
    precioPrimaria: 9000,
    precioOriginal: 10000,
    rating: 4.9,
    peso: "1.2 GB",
    imagen: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000006442/691ba3e0801180a9864cc8a7694b6f98097f9d9799bc7e3dc6db92f086759252",
    imagenDetalle: "https://s.pacn.ws/1/p/104/celeste-650491.10.jpg?v=smiu1n",
    descripcion: "Ayuda a Madeline a superar sus demonios internos y escalar la exigente Montaña Celeste.",
    resumenExtenso: "Un juego de plataformas sobre la superación personal creado por los creadores de TowerFall. Supera cientos de desafíos hechos a mano, descubre secretos perturbadores y desentraña el misterio de la montaña."
  },
  {
    id: 7,
    titulo: "Pokémon Leyendas: Arceus",
    categoria: "Acción / Aventura",
    precioSecundaria: 20000,
    precioPrimaria: 30000,
    precioOriginal: 54990,
    rating: 4.6,
    peso: "6.1 GB",
    imagen: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000039945/dcb496d7cf954c7eb51ab2e5d0c27918fb7f055e50f4e902135bd4a70a44b491",
    imagenDetalle: "https://i.pinimg.com/736x/56/30/ea/5630ea6eafa61e329aac53ff68ca91db.jpg",
    descripcion: "Explora la antigua región de Hisui y crea la primera Pokédex de la historia.",
    resumenExtenso: "Prepárate para una nueva gran aventura Pokémon en Hisui, la región de Sinnoh en tiempos remotos. Atrapa, explora e investiga Pokémon salvajes en un vasto mundo abierto lleno de misterios ancestrales."
  },
  {
    id: 8,
    titulo: "Super Smash Bros. Ultimate",
    categoria: "Multijugador",
    precioSecundaria: 15000,
    precioPrimaria: 20000,
    precioOriginal: 54990,
    rating: 4.9,
    peso: "16.0 GB",
    imagen: "https://assets.nintendo.com/image/upload/c_fill,w_1200/v1/ncom/en_US/games/switch/s/super-smash-bros-ultimate-switch/hero",
    imagenDetalle: "https://assets.nintendo.com/image/upload/c_fill,w_1200/v1/ncom/en_US/games/switch/s/super-smash-bros-ultimate-switch/hero",
    descripcion: "¡Todos están aquí! El mayor crossover de la historia del videojuego con más de 80 luchadores.",
    resumenExtenso: "Luchadores legendarios e íconos de los videojuegos chocan en el enfrentamiento definitivo. Combates más rápidos, nuevos objetos, nuevos ataques y nuevos escenarios te esperan en la entrega más ambiciosa de Smash Bros."
  },
  {
    id: 9,
    titulo: "Pokémon Leyendas: Z-A",
    categoria: "Acción / Aventura",
    precioSecundaria: 22000,
    precioPrimaria: 32000,
    precioOriginal: 64990,
    rating: 4.9,
    peso: "10.0 GB",
    imagen: "https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch2/70010000099365/175f93b38bcbfd5a51071e7eb0e8f388a9ef3ffa25f21cb6c6b940b387cae3fc",
    imagenDetalle: "https://pbs.twimg.com/media/Gv-1DCqXwAAGIwe.jpg",
    descripcion: "Regresa a Ciudad Luminalia en una nueva e impactante aventura Pokémon.",
    resumenExtenso: "Una nueva historia se desarrolla dentro de Ciudad Luminalia, donde un plan de reurbanización urbana está en marcha para hacer de la ciudad un lugar que pertenezca tanto a las personas como a los Pokémon."
  },
  {
    id: 10,
    titulo: "Hades",
    categoria: "Indie",
    precioSecundaria: 8000,
    precioPrimaria: 14000,
    precioOriginal: 24990,
    rating: 4.9,
    peso: "5.8 GB",
    imagen: "https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000033131/dbc8c55a21688b446a5c57711b726956483a14ef8c5ddb861f897c0595ccb6b5",
    imagenDetalle: "https://store-images.s-microsoft.com/image/apps.48496.14093828725404571.e8c4fd85-da7e-4c33-9a85-c97c9f3eeb38.fde6f3ed-4a08-4bb8-8240-9cd19e049803",
    descripcion: "Desafía al dios de los muertos mientras luchas para escapar del Inframundo.",
    resumenExtenso: "En este galardonado roguelike de Supergiant Games, usarás los poderes y las armas místicas del Olimpo para liberarte de las garras del dios de los muertos mientras te haces más fuerte con cada intento."
  },
  {
    id: 11,
    titulo: "Pokémon Pokopia",
    categoria: "Acción / Aventura",
    precioSecundaria: 18000,
    precioPrimaria: 28000,
    precioOriginal: 54990,
    rating: 4.7,
    peso: "4.5 GB",
    imagen: "https://gaming-cdn.com/images/news/articles/15986/cover/1000x563/pokemon-pokopia-tendra-un-nuevo-trailer-este-13-de-noviembre-y-saldra-el-5-de-marzo-cover691346737364a.jpg",
    imagenDetalle: "https://pbs.twimg.com/media/G0pysolXwAE47uT.jpg",
    descripcion: "Embárcate en un colorido y relajante mundo Pokémon lleno de diversión y aventuras.",
    resumenExtenso: "Disfruta de una maravillosa aventura junto a tus Pokémon favoritos en un mundo vibrante donde la construcción, la amistad y los misterios se unen para ofrecer una experiencia inolvidable."
  },
  {
    id: 12,
    titulo: "Super Mario Galaxy",
    categoria: "Plataformas",
    precioSecundaria: 15000,
    precioPrimaria: 22000,
    precioOriginal: 44990,
    rating: 4.9,
    peso: "5.3 GB",
    imagen: "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/store/software/switch/70010000104187/7ccc1c07ba3995da1dbd7320e726e063eaba9445a5741281d19c3b8fb1c144df",
    imagenDetalle: "https://i.pinimg.com/736x/65/14/cd/6514cd94d27946ac3553b2db5f02260c.jpg",
    descripcion: "¡Viaja por el cosmos con Mario para rescatar a la Princesa Peach entre las estrellas!",
    resumenExtenso: "Una aventura espacial sin igual. Desafía la gravedad viajando de planeta en planeta, recolecta Maxiestrellas y aprovecha los extraordinarios trajes de Mario para derrotar a Bowser y salvar la Galaxia."
  },
  {
    id: 13,
    titulo: "Mega Man 11",
    categoria: "Plataformas",
    precioSecundaria: 8000,
    precioPrimaria: 14000,
    precioOriginal: 29990,
    rating: 4.6,
    peso: "3.2 GB",
    imagen: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000002166/3bb5db305b41050e8bcbbcfbf35c5c0c9aaef9eddfb9d4dfbc82ed7f62c64dbd",
    imagenDetalle: "bttps://c4.wallpaperflare.com/wallpaper/326/974/846/mega-man-mega-man-11-video-games-capcom-wallpaper-preview.jpg",
    descripcion: "¡El icónico Robot Blue Bomber regresa en una nueva y trepidante aventura 2.5D!",
    resumenExtenso: "Mega Man vuelve a la acción con gráficos 2.5D modernizados, el innovador sistema Double Gear para ralentizar el tiempo o potenciar disparos, y desafiantes Robot Masters para derrotar."
  },
  {
    id: 14,
    titulo: "Tomodachi Life",
    categoria: "Simulación",
    precioSecundaria: 12000,
    precioPrimaria: 18000,
    precioOriginal: 39990,
    rating: 4.7,
    peso: "2.8 GB",
    imagen: "https://www.nintendo.com/eu/media/images/assets/nintendo_switch_games/tomodachilifelivingthedream/16x9_NSwitch_TomodachiLiveLTD_BASE_UK.jpg",
    imagenDetalle: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSutlU0rnkNEAPmld0CvjaJwJsAdqJuqh-Xq4-wWXmFh9KGeUZB_UWsLdQx&s=10",
    descripcion: "Crea tu propia isla habitada por tus Mii, donde situaciones hilarantes ocurren a diario.",
    resumenExtenso: "Puebla tu isla tropical con los personajes Mii de tus amigos, familiares o famosos. Observa cómo interactúan, se enamoran, cantan y viven disparatadas aventuras en esta fantástica experiencia de simulación de vida."
  },
  {
    id: 15,
    titulo: "Mario + Rabbids Sparks of Hope",
    categoria: "Acción / Aventura",
    precioSecundaria: 18000,
    precioPrimaria: 26000,
    precioOriginal: 59990,
    rating: 4.8,
    peso: "14.5 GB",
    imagen: "https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3MN69tPhVvfQzmLFJqRlTx/2049f84c25cc4aea843892f7ddd34a31/RKB2_UCS21580_KEYART_wide_RGB-LOGO-V1.jpg",
    imagenDetalle: "https://i.pinimg.com/736x/4b/4b/58/4b4b584e89f8b219b8aecc6391049f83.jpg",
    descripcion: "Únete a Mario y los Rabbids para salvar la galaxia de una malévola entidad cósmica.",
    resumenExtenso: "Forma el equipo de tus sueños con héroes de una variada plantilla. Derrota a nuevos jefes y a enemigos conocidos en combates tácticos innovadores que mezclan estrategia por turnos y acción en tiempo real."
  },
  {
    id: 16,
    titulo: "Super Mario Galaxy 2",
    categoria: "Plataformas",
    precioSecundaria: 20000,
    precioPrimaria: 30000,
    precioOriginal: 49990,
    rating: 4.9,
    peso: "5.6 GB",
    imagen: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000104192/5731782c9e89d2f492b44f1445f5df3d65660cdf75fe4f47a17e2bed7f82f99e",
    imagenDetalle: "https://i.pinimg.com/736x/8f/07/d2/8f07d2bad7b763191fad524e320540a2.jpg",
    descripcion: "¡Acompaña a Mario y Yoshi a explorar mundos de gravedad cero en la secuela estelar!",
    resumenExtenso: "Nuevas galaxias, el regreso de Yoshi y desafíos intergalácticos aún más ingeniosos te esperan en esta aclamada obra maestra de plataformas espacial."
  },
  {
    id: 17,
    titulo: "Super Mario Party Jamboree",
    categoria: "Multijugador",
    precioSecundaria: 20000,
    precioPrimaria: 30000,
    precioOriginal: 59990,
    rating: 4.8,
    peso: "6.5 GB",
    imagen: "https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000084608/ba0572bf9d840b03bf9958809943fb3c76c3adfd6d8f2704b0f1b766f8aa4027",
    imagenDetalle: "https://www.locosxlosjuegos.com/wp-content/uploads/2024/10/super-mario-party-jamboree-wallpaper-7.jpg",
    descripcion: "¡La fiesta Mario Party más grande de la historia con más de 110 minijuegos y 7 tableros!",
    resumenExtenso: "Reúne a amigos y familiares en una fiesta insuperable. Explora tableros clásicos y nuevos, compite en carreras masivas de 20 jugadores en línea y disfruta de más de 110 minijuegos llenos de risas y rivalidad."
  },
  {
    id: 18,
    titulo: "PACK DE JUEGOS",
    categoria: "Packs / Bundles",
    precioSecundaria: 25000,
    precioPrimaria: 50000,
    precioOriginal: 180000,
    rating: 5.0,
    peso: "68.5 GB",
    imagen: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    imagenDetalle: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    imagenesDetalle: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000057039/2e90fbb6efbceb83e6027ab54a85c21f7c8b09335ef6578e9ed3d49e19cdd9ad",
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000028243/2e86b09bd711fa7a4e4d6a1ddacabf9ebaa435607db756f70ad22d19f4a0c8cb",
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000001026/aa53e77f0a7114b308be73faee9e0e5a95cb82f3efce3970b92ebcae021a8d05",
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000000676/061bf2fbabdfab9a9c687e148e658bb2ec907aaedfb01a0840b0db37b2d2f78a",
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000000964/000244ce2f0366bc0f507b5a837c768e82efefb60882e30f14fa762142fa955f",
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000018598/c068ceca9955ea52d5caefaa2efb58cfcfcb74a3f3606fbf4ed1d0e12ca0ca0e",
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000002347/b78bf018caeaad07d3bb5d81b376d5e1b93f18e95690cb6e60b13cf1eb6ce4eb",
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000083161/805fa5f9aa9eb1ef23277712bfbdc3f2d22d2508bd94e1e0a2dfca5e1145f5c8"
    ],
    descripcion: "¡Pack de 8 juegos! Hogwarts Legacy, MK11 Ultimate, Overcooked!, Minecraft, LEGO Worlds y más.",
    resumenExtenso: "Aprovecha esta gran oferta de 8 juegos en 1 sola cuenta digital: Hogwarts Legacy, Mortal Kombat 11 Ultimate, Overcooked! Special Edition, LEGO Worlds, Minecraft, Unravel Two, Human: Fall Flat y Harry Potter: Quidditch Champions."
  },
  {
    id: 19,
    titulo: "PACK DE JUEGOS 2",
    categoria: "Packs / Bundles",
    precioSecundaria: 25000,
    precioPrimaria: 50000,
    precioOriginal: 160000,
    rating: 5.0,
    peso: "32.0 GB",
    imagen: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1200&auto=format&fit=crop",
    imagenDetalle: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1200&auto=format&fit=crop",
    imagenesDetalle: [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1200&auto=format&fit=crop",
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000000126/660cdd274384ef7c0500742f360e6e7379659b8a36d93e1176b6d216f4e1f728"
    ],
    descripcion: "¡Mega Pack Nintendo! Super Mario Odyssey, Mario Kart World, Dragon Ball FighterZ y Celeste.",
    resumenExtenso: "Disfruta de 4 juegazos indispensables en un solo paquete digital: Super Mario Odyssey, Mario Kart World, Dragon Ball FighterZ y Celeste. ¡Ahorro máximo garantizado!"
  }
];

// --- INTEGRACIÓN RESEND API Y CÓDIGOS DE VERIFICACIÓN (OTP) ---
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY.trim()) : null;
const OTP_STORE = new Map();

async function sendVerificationEmail(toEmail, code, subjectTitle = 'Código de Verificación - ZonaSwitchChile') {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #070a12; color: #f8fafc; padding: 28px; border-radius: 12px; border: 1px solid #1e293b; max-width: 500px; margin: 0 auto;">
      <h2 style="color: #ff003c; margin: 0 0 10px; font-size: 24px;">🎮 ZonaSwitchChile</h2>
      <p style="font-size: 15px; color: #cbd5e1; margin-bottom: 20px;">${subjectTitle}:</p>
      <div style="background: #0f1624; border: 2px solid #00f0ff; color: #00f0ff; font-size: 34px; font-weight: 900; letter-spacing: 8px; padding: 18px; text-align: center; border-radius: 8px; margin: 20px 0; text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);">
        ${code}
      </div>
      <p style="color: #94a3b8; font-size: 13px; margin-top: 20px;">Este código de 6 dígitos expira en 10 minutos.</p>
    </div>
  `;

  // 1. Enviar usando Brevo API REST (si BREVO_API_KEY está presente)
  if (process.env.BREVO_API_KEY) {
    try {
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': process.env.BREVO_API_KEY.trim(),
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: "ZonaSwitchChile", email: process.env.BREVO_SENDER_EMAIL || "zx.andereacc@gmail.com" },
          to: [{ email: toEmail }],
          subject: `🔐 ${subjectTitle}`,
          htmlContent: htmlContent
        })
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`📩 Correo enviado REALMENTE con Brevo (ID: ${data.messageId}) a ${toEmail}`);
        return true;
      } else {
        console.warn('📌 Brevo API Warning:', data.message || data);
      }
    } catch (err) {
      console.error('Error enviando con Brevo:', err);
    }
  }

  // 2. Enviar usando Gmail SMTP (si GMAIL_USER y GMAIL_PASS están presentes)
  if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER.trim(),
          pass: process.env.GMAIL_PASS.trim()
        }
      });
      await transporter.sendMail({
        from: `"ZonaSwitchChile" <${process.env.GMAIL_USER.trim()}>`,
        to: toEmail,
        subject: `🔐 ${subjectTitle}`,
        html: htmlContent
      });
      console.log(`📩 Correo enviado REALMENTE con Gmail SMTP a ${toEmail}`);
      return true;
    } catch (err) {
      console.error('Error enviando con Gmail SMTP:', err);
    }
  }

  // 2. Intento por Resend (Fallback)
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_SENDER_EMAIL || 'ZonaSwitchChile <no-reply@zonaswitchchile.com>',
      to: [toEmail],
      subject: `🔐 ${subjectTitle}`,
      html: htmlContent
    });

    if (error) {
      console.warn('📌 Resend (Modo Pruebas / Restricción de Dominio):', error.message || error);
      console.log(`🔑 [CÓDIGO DE VERIFICACIÓN GENERADO PARA ${toEmail}]: ${code}`);
    } else {
      console.log(`📩 Correo de verificación enviado con éxito (ID: ${data?.id}) a ${toEmail}`);
    }
    return true;
    } catch (err) {
    console.warn('📌 Excepción en envío Resend:', err.message || err);
    console.log(`🔑 [CÓDIGO DE VERIFICACIÓN GENERADO PARA ${toEmail}]: ${code}`);
    return true;
  }
}

async function sendOrderConfirmationEmail(order) {
  if (!order || !order.email) return;

  const itemsHtml = Array.isArray(order.carrito)
    ? order.carrito.map(item => {
        let content = `
          <div style="background-color: #0f1624; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; margin-bottom: 16px; color: #f8fafc;">
            <div style="font-size: 16px; font-weight: 800; color: #ffffff; margin-bottom: 8px;">🎮 ${escapeHtmlEmail(item.titulo)} (${escapeHtmlEmail(item.licencia)})</div>
        `;
        if (item.correoTexto) {
          content += `<p style="font-size: 14px; color: #cbd5e1; margin: 4px 0 12px 0; line-height: 1.5;">${escapeHtmlEmail(item.correoTexto)}</p>`;
        }
        content += `
            <div style="background-color: rgba(0, 240, 255, 0.08); border: 1px solid rgba(0, 240, 255, 0.3); padding: 12px; border-radius: 6px; font-family: monospace; font-size: 14px; color: #00f0ff; word-break: break-all; margin-top: 8px;">
              🔑 ${escapeHtmlEmail(item.varianteAsignada || 'Asignación de cuenta en proceso')}
            </div>
        `;
        if (item.correoImagen && isSafeHttpUrl(item.correoImagen)) {
          content += `<img src="${escapeHtmlEmail(item.correoImagen)}" alt="Banner del juego" style="width: 100%; max-width: 440px; height: auto; border-radius: 6px; margin-top: 12px; display: block;">`;
        }
        content += `</div>`;
        return content;
      }).join('')
    : '';

  console.log(`✉️ Intentando enviar correo de confirmación de orden ${order.codigoOrden} a ${order.email}...`);

  const clienteName = (order.cliente && typeof order.cliente === 'string')
    ? escapeHtmlEmail(order.cliente.split(' ')[0])
    : 'Cliente';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #070a12; color: #cbd5e1; padding: 0; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden;">
      <div style="position: relative; background-color: #ff003c; text-align: center; padding: 24px 16px;">
        <img src="https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=800&auto=format&fit=crop" alt="Nintendo Switch" style="width: 100%; max-width: 500px; height: auto; border-radius: 8px; display: block; margin: 0 auto 12px auto;">
        <span style="background-color: #ffffff; color: #ff003c; font-size: 11px; font-weight: 900; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">🎮 Pedido Completado</span>
        <h2 style="color: #ffffff; margin: 6px 0 0 0; font-size: 22px; font-weight: 900;">ZonaSwitchChile</h2>
      </div>

      <div style="padding: 24px;">
        <p style="font-size: 15px; color: #ffffff; margin-top: 0;">¡Hola, <strong>${clienteName}</strong>!</p>
        <p style="font-size: 14px; color: #cbd5e1; line-height: 1.5; margin-bottom: 20px;">
          Tu compra ha sido procesada con éxito. A continuación te entregamos los datos de acceso e instrucciones para que comiences a jugar en tu consola Nintendo Switch:
        </p>

        <div style="background-color: #0f1624; border-left: 4px solid #ff003c; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
          <div style="font-size: 13px; color: #94a3b8;">Código de Orden:</div>
          <div style="font-size: 18px; font-weight: 800; color: #ffffff; font-family: monospace; letter-spacing: 0.5px;">${escapeHtmlEmail(order.codigoOrden)}</div>
        </div>

        ${itemsHtml}

        <div style="text-align: center; margin: 28px 0 10px 0;">
          <a href="${process.env.PUBLIC_URL || 'https://zonaswitchchile.com'}/faq.html#install-guide" style="background: linear-gradient(135deg, #ff003c, #d60033); color: #ffffff; font-weight: 800; text-decoration: none; padding: 12px 24px; border-radius: 24px; display: inline-block; box-shadow: 0 4px 15px rgba(255, 0, 60, 0.4);">
            ❓ Ver Guía Interactiva Completa
          </a>
        </div>
      </div>

      <div style="background-color: #0c0f17; padding: 16px; text-align: center; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b;">
        &copy; 2026 ZonaSwitchChile. Entrega digital inmediata.
      </div>
    </div>
  `;

  const subject = `🎮 Pedido Completado (${order.codigoOrden}) - ZonaSwitchChile`;

  // Helper local para imprimir credenciales de emergencia si falla el correo por restricción de sandbox
  const logBackupCredentials = () => {
    console.log(`\n🔑 [DATOS DE ACCESO DE RESPALDO (Orden: ${order.codigoOrden}) - CLIENTE: ${order.email}]:`);
    if (Array.isArray(order.carrito)) {
      order.carrito.forEach(item => {
        console.log(`   🎮 Juego: ${item.titulo} (${item.licencia})`);
        console.log(`   🔑 Acceso: ${item.varianteAsignada}`);
      });
    }
    console.log('');
  };

  // 1. Enviar usando Brevo API REST (si BREVO_API_KEY está presente)
  if (process.env.BREVO_API_KEY) {
    try {
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': process.env.BREVO_API_KEY.trim(),
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: "ZonaSwitchChile", email: process.env.BREVO_SENDER_EMAIL || "zx.andereacc@gmail.com" },
          to: [{ email: order.email }],
          subject: subject,
          htmlContent: htmlContent
        })
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`📩 Correo de entrega enviado con Brevo a ${order.email} (Orden: ${order.codigoOrden})`);
        return true;
      } else {
        console.warn('📌 Brevo API Warning:', data.message || data);
      }
    } catch (err) {
      console.error('Error enviando correo de entrega con Brevo:', err);
    }
  }

  // 2. Enviar usando Gmail SMTP (si GMAIL_USER y GMAIL_PASS están presentes)
  if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER.trim(),
          pass: process.env.GMAIL_PASS.trim()
        }
      });
      await transporter.sendMail({
        from: `"ZonaSwitchChile" <${process.env.GMAIL_USER.trim()}>`,
        to: order.email,
        subject: subject,
        html: htmlContent
      });
      console.log(`📩 Correo de entrega enviado con Gmail SMTP a ${order.email} (Orden: ${order.codigoOrden})`);
      return true;
    } catch (err) {
      console.error('Error enviando correo de entrega con Gmail SMTP:', err);
    }
  }

  // 3. Intento por Resend (Fallback)
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESENDER_EMAIL || process.env.RESEND_SENDER_EMAIL || 'ZonaSwitchChile <no-reply@zonaswitchchile.com>',
      to: [order.email],
      subject: subject,
      html: htmlContent
    });

    if (error) {
      console.warn('📌 Resend (Modo Pruebas / Restricción de Dominio):', error.message || error);
      logBackupCredentials();
    } else {
      console.log(`📩 Correo de entrega enviado con Resend a ${order.email} (ID: ${data?.id})`);
    }
    return true;
  } catch (err) {
    console.warn('📌 Excepción en envío Resend de entrega:', err.message || err);
    logBackupCredentials();
    return true;
  }
}

// --- ENDPOINTS DE AUTENTICACIÓN Y REGISTRO CON VERIFICACIÓN ---

// Validación activa de sesión: retorna los datos del usuario si el token es válido
app.get('/api/auth/me', verifyToken, (req, res) => {
  res.json({ exito: true, usuario: req.user });
});

// Step 1: Solicitar registro y enviar código de 6 dígitos por correo
app.post('/api/auth/send-register-code', authLimiter, async (req, res) => {
  const { username, email, password } = req.body;

  if (!isString(username) || !isString(email) || !isString(password)) {
    return res.status(400).json({ error: "Los datos ingresados deben ser cadenas de texto válidas." });
  }

  if (username.trim().length < 3) {
    return res.status(400).json({ error: "El usuario debe tener al menos 3 caracteres." });
  }

  // Sanitizar nombre de usuario de caracteres invisibles y validar con regex alfanumérica
  const cleanUsername = username.trim().replace(/[\u200B-\u200D\uFEFF]/g, '');
  if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
    return res.status(400).json({ error: "El usuario solo puede contener caracteres alfanuméricos y guiones bajos." });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ error: "Por favor ingresa un correo electrónico válido." });
  }
  if (!EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: "Por favor ingresa un correo electrónico válido." });
  }
  if (password.length < 6 || !/\d/.test(password)) {
    return res.status(400).json({ error: "La contraseña debe tener mínimo 6 caracteres y al menos 1 número." });
  }

  const cleanEmail = email.trim().toLowerCase();
  
  // Rate-Limit de 60 segundos por correo electrónico para evitar abusos
  const lastRequestTime = emailOtpLimiter.get(cleanEmail);
  if (lastRequestTime && (Date.now() - lastRequestTime < 60000)) {
    return res.status(429).json({ error: "Por favor espera 60 segundos antes de solicitar otro código de verificación." });
  }
  // Poda del mapa anti-spam (evita crecimiento ilimitado en memoria)
  if (emailOtpLimiter.size > 5000) {
    const cutoff = Date.now() - 60000;
    for (const [k, t] of emailOtpLimiter) {
      if (t < cutoff) emailOtpLimiter.delete(k);
    }
  }
  emailOtpLimiter.set(cleanEmail, Date.now());

  const users = getUsers();
  if (users.some(u => u.username && u.username.toLowerCase() === cleanUsername.toLowerCase())) {
    return res.status(400).json({ error: "Ya existe una cuenta con ese usuario o correo." });
  }
  if (users.some(u => u.email && u.email.toLowerCase() === cleanEmail)) {
    return res.status(400).json({ error: "Ya existe una cuenta con ese usuario o correo." });
  }

  const code = crypto.randomInt(100000, 1000000).toString();
  const passwordHash = await bcrypt.hash(password, 10);

  OTP_STORE.set(`reg_${cleanEmail}`, {
    code,
    username: cleanUsername,
    email: cleanEmail,
    passwordHash,
    attempts: 0,
    expiresAt: Date.now() + 600000
  });

  const sent = await sendVerificationEmail(cleanEmail, code, "Código de Verificación para Crear Cuenta");
  if (sent) {
    res.json({ exito: true, mensaje: "Código enviado a tu correo electrónico.", email: cleanEmail });
  } else {
    res.status(500).json({ error: "No se pudo enviar el correo de verificación. Verifica que el correo esté correcto." });
  }
});

// Step 2: Confirmar código de 6 dígitos y crear usuario
app.post('/api/auth/verify-register-code', authLimiter, async (req, res) => {
  const { email, code } = req.body;
  if (!isString(email) || !isString(code)) {
    return res.status(400).json({ error: "El correo y el código deben ser cadenas de texto válidas." });
  }

  const cleanEmail = email.trim().toLowerCase();
  const otpData = OTP_STORE.get(`reg_${cleanEmail}`);

  if (!otpData) {
    return res.status(400).json({ error: "Código no encontrado o expirado. Por favor solicita uno nuevo." });
  }
  if (Date.now() > otpData.expiresAt) {
    OTP_STORE.delete(`reg_${cleanEmail}`);
    return res.status(400).json({ error: "El código ha expirado. Por favor solicita uno nuevo." });
  }
  otpData.attempts = Number(otpData.attempts || 0) + 1;
  if (otpData.attempts > 5) {
    OTP_STORE.delete(`reg_${cleanEmail}`);
    return res.status(429).json({ error: "Demasiados intentos. Por favor solicita un nuevo código." });
  }
  if (!verifyOtpCode(otpData.code, code.trim())) {
    OTP_STORE.set(`reg_${cleanEmail}`, otpData);
    return res.status(400).json({ error: "El código de 6 dígitos es incorrecto." });
  }

  const users = getUsers();
  const newUser = {
    id: `USR-${Date.now()}`,
    username: otpData.username,
    email: otpData.email,
    passwordHash: otpData.passwordHash,
    role: 'user', // Rol strictly user por defecto
    tokenVersion: 0,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  // Invalidación inmediata del código OTP una vez verificado
  OTP_STORE.delete(`reg_${cleanEmail}`);

  // Emitir token JWT firmado para la sesión automática
  const token = jwt.sign(
    { id: newUser.id, username: newUser.username, role: newUser.role, tokenVersion: newUser.tokenVersion },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({
    exito: true,
    mensaje: "¡Registro completado con éxito!",
    token,
    usuario: { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role }
  });
});

app.post('/api/auth/login', authLimiter, async (req, res) => {
  const { username, password } = req.body;

  if (!isString(username) || !isString(password)) {
    return res.status(400).json({ error: "Por favor ingresa tu usuario y contraseña en formato de texto." });
  }

  // Bloqueo por identidad (anti fuerza bruta distribuida)
  const loginKey = 'login_' + username.trim().toLowerCase();
  const lockedUntil = loginLockedUntil(loginKey);
  if (lockedUntil) {
    return res.status(429).json({ error: 'Demasiados intentos fallidos. Espera 15 minutos antes de intentar de nuevo.' });
  }

  const users = getUsers();
  const user = users.find(u =>
    u.username && (u.username.toLowerCase() === username.trim().toLowerCase() || (u.email && u.email.toLowerCase() === username.trim().toLowerCase()))
  );

  if (!user) {
    recordLoginFailure(loginKey);
    return res.status(401).json({ error: "Usuario/correo o contraseña incorrectos." });
  }

  // Verificar contraseña de forma segura usando bcrypt y auto-migración
  const isMatch = await verifyPassword(password, user);
  if (!isMatch) {
    recordLoginFailure(loginKey);
    return res.status(401).json({ error: "Usuario/correo o contraseña incorrectos." });
  }

  loginAttempts.delete(loginKey);

  const role = user.role || 'user';

  // Emitir token JWT firmado
  const token = jwt.sign(
    { id: user.id, username: user.username, role: role, tokenVersion: user.tokenVersion || 0 },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({
    exito: true,
    mensaje: `¡Bienvenido de nuevo, ${user.username}!`,
    token,
    usuario: { id: user.id, username: user.username, email: user.email, role }
  });
});


// Recuperación pública de contraseña
app.post('/api/auth/forgot-password', authLimiter, async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Ingresa un correo válido.' });
  }
  const users = getUsers();
  const user = users.find(u => normalizeEmail(u.email) === email);
  // Respuesta neutra para no revelar si existe la cuenta
  if (!user) return res.json({ exito: true, mensaje: 'Si el correo está registrado, recibirás un código de recuperación.' });
  const key = `forgot_${email}`;
  const existing = OTP_STORE.get(key);
  if (existing && existing.expiresAt > Date.now() && existing.lastSentAt && Date.now() - existing.lastSentAt < 60000) {
    return res.status(429).json({ error: 'Espera 60 segundos antes de solicitar otro código.' });
  }
  const code = generateOtpCode();
  OTP_STORE.set(key, { code, email, userId: user.id, attempts: 0, expiresAt: Date.now() + 600000, lastSentAt: Date.now() });
  const sent = await sendVerificationEmail(email, code, 'Código para Recuperar tu Contraseña');
  if (!sent) {
    OTP_STORE.delete(key);
    return res.status(500).json({ error: 'No se pudo enviar el código de recuperación.' });
  }
  res.json({ exito: true, mensaje: 'Si el correo está registrado, recibirás un código de recuperación.', email });
});

app.post('/api/auth/reset-password', authLimiter, async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const code = isString(req.body?.code) ? req.body.code.trim() : '';
  const newPassword = isString(req.body?.newPassword) ? req.body.newPassword : '';
  if (!email || !/^\d{6}$/.test(code) || newPassword.length < 6 || !/\d/.test(newPassword)) {
    return res.status(400).json({ error: 'Correo, código o nueva contraseña inválidos.' });
  }
  const key = `forgot_${email}`;
  const otp = OTP_STORE.get(key);
  if (!otp || Date.now() > otp.expiresAt) {
    OTP_STORE.delete(key);
    return res.status(400).json({ error: 'Código expirado o no encontrado.' });
  }
  otp.attempts = Number(otp.attempts || 0) + 1;
  if (otp.attempts > 5) {
    OTP_STORE.delete(key);
    return res.status(429).json({ error: 'Demasiados intentos. Solicita un nuevo código.' });
  }
  if (!verifyOtpCode(otp.code, code)) {
    OTP_STORE.set(key, otp);
    return res.status(400).json({ error: 'Código incorrecto.' });
  }
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === otp.userId);
  if (userIndex === -1) {
    OTP_STORE.delete(key);
    return res.status(400).json({ error: 'Cuenta no encontrada.' });
  }
  users[userIndex].passwordHash = await bcrypt.hash(newPassword, 12);
  users[userIndex].tokenVersion = Number(users[userIndex].tokenVersion || 0) + 1;
  delete users[userIndex].password;
  saveUsers(users);
  if (isMongoConnected) {
    await UserModel.findOneAndUpdate({ id: users[userIndex].id }, {
      passwordHash: users[userIndex].passwordHash,
      tokenVersion: users[userIndex].tokenVersion
    });
  }
  OTP_STORE.delete(key);
  res.json({ exito: true, mensaje: 'Contraseña restablecida. Ahora puedes iniciar sesión.' });
});

// Logout real: invalida el token actual y todos los anteriores
app.post('/api/auth/logout', verifyToken, async (req, res) => {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === req.user.id);
  if (idx === -1) return res.status(404).json({ error: 'Usuario no encontrado.' });
  users[idx].tokenVersion = Number(users[idx].tokenVersion || 0) + 1;
  saveUsers(users);
  if (isMongoConnected) await UserModel.findOneAndUpdate({ id: req.user.id }, { tokenVersion: users[idx].tokenVersion });
  res.json({ exito: true, mensaje: 'Sesión cerrada correctamente.' });
});

// --- OPCIONES DE CUENTA Y ÓRDENES DE USUARIOS ---

// Consultar compras del usuario logueado (Protegido por token)
app.get('/api/user/orders', verifyToken, async (req, res) => {
  const userOrders = await getOrdersByUser(req.user.username, req.user.email);
  res.json(userOrders);
});

// Cambiar nombre de usuario (Requiere contraseña actual)
app.post('/api/user/update-username', verifyToken, async (req, res) => {
  const { newUsername, currentPassword } = req.body;
  const userId = req.user.id;

  if (!isString(newUsername) || !isString(currentPassword)) {
    return res.status(400).json({ error: "Por favor completa todos los campos con texto válido." });
  }

  const cleanUser = newUsername.trim();
  if (cleanUser.length < 3) {
    return res.status(400).json({ error: "El nuevo usuario debe tener al menos 3 caracteres." });
  }
  if (!/^[a-zA-Z0-9_]+$/.test(cleanUser)) {
    return res.status(400).json({ error: "El usuario solo puede contener caracteres alfanuméricos y guiones bajos." });
  }

  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) return res.status(404).json({ error: "Usuario no encontrado." });

  const user = users[userIndex];
  
  // Validar contraseña
  const isMatch = await verifyPassword(currentPassword, user);
  if (!isMatch) {
    return res.status(400).json({ error: "La contraseña actual es incorrecta." });
  }

  const exists = users.some(u => u.id !== user.id && u.username && u.username.toLowerCase() === cleanUser.toLowerCase());
  if (exists) return res.status(400).json({ error: "Este nombre de usuario ya está tomado." });

  users[userIndex].username = cleanUser;
  saveUsers(users);

  // Emitir un nuevo token JWT actualizado con el nuevo username
  const token = jwt.sign(
    { id: user.id, username: cleanUser, role: user.role || 'user', tokenVersion: user.tokenVersion || 0 },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({
    exito: true,
    mensaje: "Nombre de usuario actualizado con éxito.",
    token,
    usuario: { id: user.id, username: cleanUser, email: user.email }
  });
});

// Cambiar Correo (Paso 1: Enviar código al nuevo correo)
app.post('/api/user/send-email-code', verifyToken, userApiLimiter, async (req, res) => {
  const { newEmail, currentPassword } = req.body;
  const userId = req.user.id;

  if (!isString(newEmail) || !isString(currentPassword) || !EMAIL_RE.test(newEmail.trim())) {
    return res.status(400).json({ error: "Ingresa el nuevo correo y tu contraseña actual." });
  }

  const users = getUsers();
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "Usuario no encontrado." });

  const isMatch = await verifyPassword(currentPassword, user);
  if (!isMatch) {
    return res.status(400).json({ error: "La contraseña actual es incorrecta." });
  }

  const cleanEmail = newEmail.trim().toLowerCase();
  if (users.some(u => u.id !== user.id && u.email && u.email.toLowerCase() === cleanEmail)) {
    return res.status(400).json({ error: "Este correo ya está registrado por otra cuenta." });
  }

  const code = crypto.randomInt(100000, 1000000).toString();
  OTP_STORE.set(`email_${userId}`, { newEmail: cleanEmail, code, expiresAt: Date.now() + 600000 });

  const sent = await sendVerificationEmail(cleanEmail, code, "Código para Cambiar Correo Electrónico");
  if (sent) {
    res.json({ exito: true, mensaje: `Código enviado a ${cleanEmail}.` });
  } else {
    res.status(500).json({ error: "No se pudo enviar el correo de verificación." });
  }
});

// Cambiar Correo (Paso 2: Verificar código y actualizar)
app.post('/api/user/confirm-email-update', verifyToken, userApiLimiter, (req, res) => {
  const { code } = req.body;
  const userId = req.user.id;

  if (!isString(code)) return res.status(400).json({ error: "El código debe ser texto." });
  
  const otpData = OTP_STORE.get(`email_${userId}`);
  if (!otpData) return res.status(400).json({ error: "Código no encontrado o expirado." });
  otpData.attempts = Number(otpData.attempts || 0) + 1;
  if (otpData.attempts > 5) {
    OTP_STORE.delete(`email_${userId}`);
    return res.status(429).json({ error: "Demasiados intentos. Por favor solicita un nuevo código." });
  }
  if (!verifyOtpCode(otpData.code, code.trim())) {
    OTP_STORE.set(`email_${userId}`, otpData);
    return res.status(400).json({ error: "Código de 6 dígitos incorrecto." });
  }

  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) return res.status(404).json({ error: "Usuario no encontrado." });

  users[userIndex].email = otpData.newEmail;
  saveUsers(users);
  
  // Invalidador inmediato del OTP
  OTP_STORE.delete(`email_${userId}`);

  res.json({ exito: true, mensaje: "Correo actualizado correctamente.", usuario: { id: users[userIndex].id, username: users[userIndex].username, email: otpData.newEmail } });
});

// Cambiar Contraseña (Paso 1: Enviar código al correo actual del usuario)
app.post('/api/user/send-password-code', verifyToken, userApiLimiter, async (req, res) => {
  const { newPassword } = req.body;
  const userId = req.user.id;

  if (!isString(newPassword) || newPassword.length < 6 || !/\d/.test(newPassword)) {
    return res.status(400).json({ error: "La nueva contraseña debe tener al menos 6 caracteres y 1 número." });
  }

  const users = getUsers();
  const user = users.find(u => u.id === userId);
  if (!user || !user.email) return res.status(400).json({ error: "No se encontró un correo asociado a tu cuenta." });

  const code = crypto.randomInt(100000, 1000000).toString();
  
  // Hash con bcrypt de la nueva contraseña propuesta
  const newPasswordHash = await bcrypt.hash(newPassword, 10);
  OTP_STORE.set(`pwd_${userId}`, { newPasswordHash, code, attempts: 0, expiresAt: Date.now() + 600000 });

  const sent = await sendVerificationEmail(user.email, code, "Código para Cambiar Contraseña");
  if (sent) {
    res.json({ exito: true, mensaje: `Código enviado a ${user.email}.` });
  } else {
    res.status(500).json({ error: "No se pudo enviar el correo de verificación." });
  }
});

// Cambiar Contraseña (Paso 2: Verificar código y actualizar + rotación de tokenVersion)
app.post('/api/user/confirm-password-update', verifyToken, userApiLimiter, (req, res) => {
  const { code } = req.body;
  const userId = req.user.id;

  if (!isString(code)) return res.status(400).json({ error: "El código debe ser texto." });
  
  const otpData = OTP_STORE.get(`pwd_${userId}`);
  if (!otpData) return res.status(400).json({ error: "Código no encontrado o expirado." });
  otpData.attempts = Number(otpData.attempts || 0) + 1;
  if (otpData.attempts > 5) {
    OTP_STORE.delete(`pwd_${userId}`);
    return res.status(429).json({ error: "Demasiados intentos. Por favor solicita un nuevo código." });
  }
  if (!verifyOtpCode(otpData.code, code.trim())) {
    OTP_STORE.set(`pwd_${userId}`, otpData);
    return res.status(400).json({ error: "Código de 6 dígitos incorrecto." });
  }

  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) return res.status(404).json({ error: "Usuario no encontrado." });

  users[userIndex].passwordHash = otpData.newPasswordHash;
  
  // Incrementar tokenVersion para invalidar todas las sesiones JWT activas en circulación
  users[userIndex].tokenVersion = (users[userIndex].tokenVersion || 0) + 1;
  
  saveUsers(users);
  
  // Invalidador inmediato del OTP
  OTP_STORE.delete(`pwd_${userId}`);

  res.json({ exito: true, mensaje: "Contraseña actualizada correctamente. Por seguridad, debes iniciar sesión de nuevo." });
});

// Catálogo de Juegos por Defecto
const DEFAULT_GAMES = [
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

let GAMES_STORE = [];
function loadInitialGames() {
  GAMES_STORE = safeReadJsonSync(GAMES_FILE, []);
  if (!Array.isArray(GAMES_STORE) || GAMES_STORE.length === 0) {
    GAMES_STORE = [...JUEGOS];
    saveGamesLocal(GAMES_STORE);
  }
}

function saveGamesLocal(games) {
  if (!Array.isArray(games)) return;
  GAMES_STORE = games;
  safeWriteJsonSync(GAMES_FILE, games);

  if (isMongoConnected) {
    games.forEach(async (g) => {
      try {
        await GameModel.findOneAndUpdate({ id: g.id }, g, { upsert: true, returnDocument: 'after' });
      } catch (e) {}
    });
  }

  // Notificar a todos los clientes conectados a través de Server-Sent Events (SSE)
  broadcastCatalogUpdate();
}

// Server-Sent Events (SSE) para sincronización a tiempo real sin refrescar página
const sseClients = new Set();

app.get('/api/juegos/stream', generalApiLimiter, (req, res) => {
  // Límite de clientes SSE conectados (anti DoS)
  if (sseClients.size >= 200) {
    return res.status(503).end();
  }
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  if (res.flushHeaders) res.flushHeaders();

  sseClients.add(res);

  const removeClient = () => {
    sseClients.delete(res);
  };

  req.on('close', removeClient);
  req.on('error', removeClient);
  res.on('error', removeClient);
  res.on('finish', removeClient);
});

// Temporizador keep-alive SSE (ping cada 30 segundos) para limpiar clientes desconectados (Problema 4)
setInterval(() => {
  sseClients.forEach(client => {
    try {
      client.write(': keep-alive ping\n\n');
    } catch (e) {
      sseClients.delete(client);
      try { client.end(); } catch (err) {}
    }
  });
}, 30000);

function broadcastCatalogUpdate() {
  if (!Array.isArray(GAMES_STORE) || GAMES_STORE.length === 0) {
    GAMES_STORE = [...JUEGOS];
  }
  let visibleGames = GAMES_STORE.filter(g => g.visible !== false);
  if (visibleGames.length === 0) {
    GAMES_STORE = JUEGOS.map(g => ({ ...g, visible: true }));
    visibleGames = GAMES_STORE;
  }
  const payload = `data: ${JSON.stringify({ type: 'CATALOG_UPDATED', games: visibleGames.map(sanitizeGameForPublic) })}\n\n`;
  sseClients.forEach(client => {
    try {
      client.write(payload);
    } catch (e) {
      sseClients.delete(client);
    }
  });
}

loadInitialGames();

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



// Endpoint Público: Retorna solo juegos visibles para los clientes
app.get('/api/juegos', generalApiLimiter, (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (!Array.isArray(GAMES_STORE) || GAMES_STORE.length === 0) {
    GAMES_STORE = safeReadJsonSync(GAMES_FILE, []);
    if (!Array.isArray(GAMES_STORE) || GAMES_STORE.length === 0) {
      GAMES_STORE = [...JUEGOS];
      saveGamesLocal(GAMES_STORE);
    }
  }
  let visibleGames = GAMES_STORE.filter(g => g.visible !== false);
  if (visibleGames.length === 0) {
    GAMES_STORE = JUEGOS.map(g => ({ ...g, visible: true }));
    saveGamesLocal(GAMES_STORE);
    visibleGames = GAMES_STORE;
  }
  // NUNCA exponer cuentas/stock interno al público
  res.json(visibleGames.map(sanitizeGameForPublic));
});

// Endpoint Público: Retorna un juego específico por ID o por Slug (título normalizado)
app.get('/api/juegos/:identifier', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const param = req.params.identifier;
  if (!param) return res.status(400).json({ error: "Identificador no proporcionado." });

  if (!Array.isArray(GAMES_STORE) || GAMES_STORE.length === 0) {
    GAMES_STORE = safeReadJsonSync(GAMES_FILE, []);
    if (!Array.isArray(GAMES_STORE) || GAMES_STORE.length === 0) {
      GAMES_STORE = [...JUEGOS];
      saveGamesLocal(GAMES_STORE);
    }
  }

  const rawClean = param.toLowerCase().trim();
  const cleanSlug = slugify(param).toLowerCase().trim();

  // 1. Buscar por ID exacto
  let game = GAMES_STORE.find(g => String(g.id) === rawClean || String(g.id) === cleanSlug);

  // 2. Buscar por coincidencia exacta de Slug o Título
  if (!game) {
    game = GAMES_STORE.find(g =>
      slugify(g.titulo).toLowerCase() === cleanSlug ||
      g.titulo.toLowerCase().trim() === rawClean
    );
  }

  // 3. Buscar coincidencia parcial de Slug o Título
  if (!game) {
    game = GAMES_STORE.find(g => {
      const gSlug = slugify(g.titulo).toLowerCase();
      return gSlug.includes(cleanSlug) || cleanSlug.includes(gSlug) || g.titulo.toLowerCase().includes(rawClean);
    });
  }

  // 4. Fallback al primer juego visible para evitar pantalla bloqueada
  if (!game) {
    game = GAMES_STORE.find(g => g.visible !== false) || GAMES_STORE[0];
  }

  res.json(sanitizeGameForPublic(game));
});

// Endpoint Admin: Retorna TODOS los juegos (visibles y ocultos) para el panel de administración
app.get('/api/admin/juegos', verifyAdmin, (req, res) => {
  res.json(GAMES_STORE);
});

// Endpoint Admin: Crear un juego nuevo y persistirlo en MongoDB + respaldo local
app.post('/api/admin/juegos/create', verifyAdmin, async (req, res) => {
  try {
    const {
      titulo,
      categoria,
      precioSecundaria,
      precioPrimaria,
      precioOriginal,
      rating,
      peso,
      imagen,
      imagenDetalle,
      imagenesDetalle,
      descripcion,
      resumenExtenso,
      youtubeUrl,
      correoTexto,
      correoImagen,
      cuentas,
      visible,
      stockPrimaria,
      stockSecundaria
    } = req.body || {};

    if (!isString(titulo) || !titulo.trim()) {
      return res.status(400).json({ error: 'El título del juego es obligatorio.' });
    }
    if (!isString(categoria) || !categoria.trim()) {
      return res.status(400).json({ error: 'La categoría del juego es obligatoria.' });
    }
    if (!isString(imagen) || !imagen.trim()) {
      return res.status(400).json({ error: 'La URL de la imagen principal es obligatoria.' });
    }
    if (!isString(imagenDetalle) || !imagenDetalle.trim()) {
      return res.status(400).json({ error: 'La URL de la imagen de detalle es obligatoria.' });
    }
    if (!isSafeHttpUrl(imagen.trim()) || !isSafeHttpUrl(imagenDetalle.trim())) {
      return res.status(400).json({ error: 'Las URLs de imagen deben ser http(s).' });
    }
    if (!isString(descripcion) || !descripcion.trim()) {
      return res.status(400).json({ error: 'La descripción corta es obligatoria.' });
    }

    const sec = Number(precioSecundaria);
    const prim = Number(precioPrimaria);
    const original = precioOriginal === undefined || precioOriginal === '' ? 0 : Number(precioOriginal);
    const gameRating = rating === undefined || rating === '' ? 5 : Number(rating);
    const stockPrim = stockPrimaria === undefined || stockPrimaria === '' ? null : Number(stockPrimaria);
    const stockSec = stockSecundaria === undefined || stockSecundaria === '' ? null : Number(stockSecundaria);

    if (!Number.isSafeInteger(sec) || sec < 0) {
      return res.status(400).json({ error: 'El precio de licencia secundaria no es válido.' });
    }
    if (!Number.isSafeInteger(prim) || prim < 0) {
      return res.status(400).json({ error: 'El precio de licencia primaria no es válido.' });
    }
    if (!Number.isSafeInteger(original) || original < 0) {
      return res.status(400).json({ error: 'El precio original no es válido.' });
    }
    if (!Number.isFinite(gameRating) || gameRating < 0 || gameRating > 5) {
      return res.status(400).json({ error: 'La valoración debe estar entre 0 y 5.' });
    }
    if (stockPrim !== null && (!Number.isSafeInteger(stockPrim) || stockPrim < 0)) return res.status(400).json({ error: 'Stock primaria inválido.' });
    if (stockSec !== null && (!Number.isSafeInteger(stockSec) || stockSec < 0)) return res.status(400).json({ error: 'Stock secundaria inválido.' });

    let nextId = GAMES_STORE.reduce((max, g) => Math.max(max, Number(g.id) || 0), 0) + 1;

    // Evitar colisiones si Mongo ya contiene un juego con ese ID.
    if (isMongoConnected) {
      while (await GameModel.exists({ id: nextId })) nextId += 1;
    }

    const cleanImages = Array.isArray(imagenesDetalle)
      ? imagenesDetalle.filter(img => isString(img) && img.trim()).map(img => img.trim())
      : (isString(imagenesDetalle) ? imagenesDetalle.split('\n').map(i => i.trim()).filter(Boolean) : []);

    const cleanAccounts = Array.isArray(cuentas)
      ? cuentas.filter(c => isString(c) && c.trim()).map(c => c.trim())
      : (isString(cuentas) ? cuentas.split('\n').map(c => c.trim()).filter(Boolean) : []);

    const newGame = {
      id: nextId,
      titulo: titulo.trim(),
      categoria: categoria.trim(),
      precioSecundaria: sec,
      precioPrimaria: prim,
      precioOriginal: original,
      rating: gameRating,
      peso: isString(peso) ? peso.trim() : '',
      imagen: imagen.trim(),
      imagenDetalle: imagenDetalle.trim(),
      imagenesDetalle: cleanImages,
      descripcion: descripcion.trim(),
      resumenExtenso: isString(resumenExtenso) ? resumenExtenso.trim() : descripcion.trim(),
      youtubeUrl: isString(youtubeUrl) ? youtubeUrl.trim() : '',
      correoTexto: isString(correoTexto) ? correoTexto.trim() : '',
      correoImagen: isString(correoImagen) ? correoImagen.trim() : '',
      cuentas: cleanAccounts,
      siguienteVarianteIndex: 0,
      stockPrimaria: stockPrim,
      stockSecundaria: stockSec,
      soldPrimaria: 0,
      soldSecundaria: 0,
      visible: visible !== false
    };

    // Persistir primero en Mongo cuando está disponible.
    if (isMongoConnected) {
      await GameModel.create(newGame);
    }

    GAMES_STORE.push(newGame);
    saveGamesLocal(GAMES_STORE);
    broadcastCatalogUpdate();

    console.log(`🛠️ [ADMIN] Juego creado: "${newGame.titulo}" (ID ${newGame.id})`);

    return res.status(201).json({
      exito: true,
      mensaje: `Juego "${newGame.titulo}" creado exitosamente.`,
      juego: newGame,
      juegos: GAMES_STORE
    });
  } catch (err) {
    console.error('❌ Error creando juego:', err);
    if (err && err.code === 11000) {
      return res.status(409).json({ error: 'Ya existe un juego con ese ID. Intenta nuevamente.' });
    }
    return res.status(500).json({ error: 'No se pudo crear el juego.' });
  }
});

// Endpoint Admin: Cambiar visibilidad (Mostrar / Ocultar) en tiempo real
app.post('/api/admin/juegos/toggle', verifyAdmin, (req, res) => {
  const { gameId, visible } = req.body;

  const game = GAMES_STORE.find(g => g.id === Number(gameId));
  if (!game) return res.status(404).json({ error: "Juego no encontrado." });

  game.visible = !!visible;
  saveGamesLocal(GAMES_STORE);

  console.log(`🛠️ [ADMIN] Visibilidad de "${game.titulo}" cambiada a: ${game.visible ? 'VISIBLE' : 'OCULTO'}`);
  res.json({ exito: true, mensaje: `Visibilidad de ${game.titulo} actualizada.`, juegos: GAMES_STORE });
});


// Endpoint Admin: Desactivar/eliminar juego del catálogo
app.post('/api/admin/juegos/delete', verifyAdmin, (req, res) => {
  const gameId = Number(req.body?.gameId);
  const gameIndex = GAMES_STORE.findIndex(g => g.id === gameId);
  if (gameIndex === -1) return res.status(404).json({ error: 'Juego no encontrado.' });
  const game = GAMES_STORE[gameIndex];
  game.visible = false;
  game.deletedAt = new Date().toISOString();
  saveGamesLocal(GAMES_STORE);
  if (isMongoConnected) GameModel.findOneAndUpdate({ id: gameId }, { visible: false, deletedAt: game.deletedAt }).catch(e => console.error('Error desactivando juego en Mongo:', e.message));
  res.json({ exito: true, mensaje: `Juego "${game.titulo}" desactivado.`, juegos: GAMES_STORE });
});

// Endpoint Admin: Editar datos del juego (Nombre, Precio, Descripción, Fotos, YouTube URL, etc.) en tiempo real
app.post('/api/admin/juegos/update', verifyAdmin, (req, res) => {
  const { gameId, titulo, categoria, precioSecundaria, precioPrimaria, precioOriginal, descripcion, imagen, imagenDetalle, imagenesDetalle, youtubeUrl, videoTrailerUrl, correoTexto, correoImagen, cuentas, stockPrimaria, stockSecundaria } = req.body;

  const gameIndex = GAMES_STORE.findIndex(g => g.id === Number(gameId));
  if (gameIndex === -1) return res.status(404).json({ error: "Juego no encontrado." });

  const game = GAMES_STORE[gameIndex];
  if (isString(titulo) && titulo.trim()) game.titulo = titulo.trim();
  if (isString(categoria) && categoria.trim()) game.categoria = categoria.trim();
  if (precioSecundaria !== undefined && precioSecundaria !== '') {
    const n = Number(precioSecundaria);
    if (!Number.isFinite(n) || n < 0) return res.status(400).json({ error: 'Precio secundaria inválido.' });
    game.precioSecundaria = n;
  }
  if (precioPrimaria !== undefined && precioPrimaria !== '') {
    const n = Number(precioPrimaria);
    if (!Number.isFinite(n) || n < 0) return res.status(400).json({ error: 'Precio primaria inválido.' });
    game.precioPrimaria = n;
  }
  if (precioOriginal !== undefined && precioOriginal !== '') {
    const n = Number(precioOriginal);
    if (!Number.isFinite(n) || n < 0) return res.status(400).json({ error: 'Precio original inválido.' });
    game.precioOriginal = n;
  }
  if (stockPrimaria !== undefined && stockPrimaria !== '') { const n = Number(stockPrimaria); if (!Number.isSafeInteger(n) || n < 0) return res.status(400).json({ error: 'Stock primaria inválido.' }); game.stockPrimaria = n; }
  if (stockSecundaria !== undefined && stockSecundaria !== '') { const n = Number(stockSecundaria); if (!Number.isSafeInteger(n) || n < 0) return res.status(400).json({ error: 'Stock secundaria inválido.' }); game.stockSecundaria = n; }
  if (isString(descripcion)) game.descripcion = descripcion.trim();
  if (isString(imagen) && imagen.trim() && !isSafeHttpUrl(imagen)) return res.status(400).json({ error: 'URL de imagen inválida. Solo se permiten http/https.' });
  if (isString(imagen)) game.imagen = imagen.trim();
  if (isString(imagenDetalle) && imagenDetalle.trim() && !isSafeHttpUrl(imagenDetalle)) return res.status(400).json({ error: 'URL de imagen inválida. Solo se permiten http/https.' });
  if (isString(imagenDetalle)) game.imagenDetalle = imagenDetalle.trim();

  // Guardar arreglo de imágenes adicionales (ej: para packs o galerías)
  if (Array.isArray(imagenesDetalle)) {
    game.imagenesDetalle = imagenesDetalle.filter(img => isString(img) && img.trim().length > 0).map(img => img.trim());
  } else if (typeof imagenesDetalle === 'string') {
    game.imagenesDetalle = imagenesDetalle.split('\n').map(i => i.trim()).filter(i => i.length > 0);
  }

  // Guardar link del video de youtube
  const ytLink = youtubeUrl || videoTrailerUrl;
  if (isString(ytLink) && ytLink.trim() && !isSafeHttpUrl(ytLink)) return res.status(400).json({ error: 'URL de YouTube inválida. Solo se permiten http/https.' });
  if (isString(ytLink)) game.youtubeUrl = ytLink.trim();

  if (correoTexto !== undefined && isString(correoTexto)) game.correoTexto = correoTexto.trim();
  if (correoImagen !== undefined && isString(correoImagen) && correoImagen.trim() && !isSafeHttpUrl(correoImagen)) return res.status(400).json({ error: 'URL de imagen inválida. Solo se permiten http/https.' });
  if (correoImagen !== undefined && isString(correoImagen)) game.correoImagen = correoImagen.trim();

  if (typeof cuentas === 'string') {
    game.cuentas = cuentas.split('\n').map(c => c.trim()).filter(c => c.length > 0);
  } else if (Array.isArray(cuentas)) {
    game.cuentas = cuentas.filter(c => isString(c) && c.trim().length > 0);
  }

  if (typeof game.siguienteVarianteIndex !== 'number') {
    game.siguienteVarianteIndex = 0;
  }

  saveGamesLocal(GAMES_STORE);
  broadcastCatalogUpdate();

  console.log(`🛠️ [ADMIN] Juego "${game.titulo}" actualizado. Fotos: ${game.imagenesDetalle ? game.imagenesDetalle.length : 0}, YouTube: ${game.youtubeUrl || 'no'}`);
  res.json({ exito: true, mensaje: `Juego ${game.titulo} actualizado exitosamente.`, juegos: GAMES_STORE, juego: game });
});


// --- SISTEMA DE GALERÍA DE CLIENTES Y RESEÑAS ---
const DEFAULT_GALLERY = [
  {
    id: 1,
    user: "@matias_switch",
    stars: "⭐ ⭐ ⭐ ⭐ ⭐",
    comment: "Zelda TOTK descargado en 15 min. Licencia primaria 100% funcional. ¡Gracias ZonaSwitchChile!",
    imagen: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    user: "@camila_gimer",
    stars: "⭐ ⭐ ⭐ ⭐ ⭐",
    comment: "Compré Mario Wonder y entregaron la cuenta al tiro al correo. Atención rápida por WhatsApp.",
    imagen: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    user: "@nicolas.gamer.cl",
    stars: "⭐ ⭐ ⭐ ⭐ ⭐",
    comment: "Excelente servicio. Pagué con Webpay y los pasos de instalación son súper claros. Recomendado 100%.",
    imagen: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    user: "@benja_switch_cl",
    stars: "⭐ ⭐ ⭐ ⭐ ⭐",
    comment: "Hollow Knight y Mario Kart funcionando impecable en mi OLED. Precios accesibles y garantizados.",
    imagen: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop"
  }
];

let GALLERY_STORE = [];
function loadInitialGallery() {
  GALLERY_STORE = safeReadJsonSync(GALLERY_FILE, []);
  if (!Array.isArray(GALLERY_STORE) || GALLERY_STORE.length === 0) {
    GALLERY_STORE = [...DEFAULT_GALLERY];
    saveGalleryLocal(GALLERY_STORE);
  }
}

function saveGalleryLocal(gallery) {
  if (!Array.isArray(gallery)) return;
  GALLERY_STORE = gallery;
  safeWriteJsonSync(GALLERY_FILE, gallery);

  if (isMongoConnected) {
    gallery.forEach(async (item) => {
      try {
        await GalleryModel.findOneAndUpdate({ id: item.id }, item, { upsert: true, returnDocument: 'after' });
      } catch (e) {}
    });
  }
}

// --- GESTIÓN PERMANENTE DE CUPONES DE DESCUENTO ---
const COUPONS_FILE = path.join(__dirname, 'data', 'coupons.json');
let COUPONS_STORE = [];

const DEFAULT_COUPONS = [
  // Sin cupones hardcodeados: los códigos en el código fuente son públicos (repo público).
  // Crear cupones reales desde el panel de administración.
];

function loadCoupons() {
  COUPONS_STORE = safeReadJsonSync(COUPONS_FILE, []);
  if (!Array.isArray(COUPONS_STORE) || COUPONS_STORE.length === 0) {
    if (DEFAULT_COUPONS.length > 0) {
      COUPONS_STORE = [...DEFAULT_COUPONS];
      saveCouponsLocal(COUPONS_STORE);
    }
    console.warn('⚠️ [CUPONES] Sin cupones configurados. Créalos desde el panel de administración.');
  }
}

function saveCouponsLocal(coupons) {
  if (!Array.isArray(coupons)) return;
  COUPONS_STORE = coupons;
  safeWriteJsonSync(COUPONS_FILE, coupons);
}

loadCoupons();

// Endpoint Admin: Retorna todos los cupones de descuento (PROTEGIDO)
app.get('/api/coupons', verifyAdmin, (req, res) => {
  res.json(COUPONS_STORE);
});

// Endpoint Público: Validar un cupón específico sin revelar la lista completa
app.post('/api/coupons/validate', generalApiLimiter, (req, res) => {
  const { code } = req.body;
  if (!isString(code) || !code.trim()) {
    return res.status(400).json({ error: "Código de cupón requerido." });
  }

  const cleanCode = code.trim().toUpperCase();

  // Bloquear cupón de pruebas en producción
  if (cleanCode === 'PRUEBAXD') {
    const rawHost = (req.get('x-forwarded-host') || req.get('host') || '').toLowerCase();
    const isLocal = rawHost.includes('localhost') || rawHost.includes('127.0.0.1');
    if (process.env.NODE_ENV === 'production' || !isLocal) {
      return res.json({ valid: false, error: "Cupón no válido." });
    }
    return res.json({ valid: true, coupon: { code: 'PRUEBAXD', type: 'percent', value: 100, desc: '100% de descuento (Modo Prueba)' } });
  }

  const coupon = COUPONS_STORE.find(c => c.code === cleanCode);
  if (coupon) {
    res.json({ valid: true, coupon: { code: coupon.code, type: coupon.type, value: coupon.value, desc: coupon.desc } });
  } else {
    res.json({ valid: false, error: "Cupón no encontrado o expirado." });
  }
});

// Endpoint Admin: Crear / Guardar Cupón Permanente
app.post('/api/admin/coupons/create', verifyAdmin, (req, res) => {
  const { code, type, value, desc } = req.body;

  if (!isString(code) || value === undefined || value === '') {
    return res.status(400).json({ error: "El código y el valor del descuento son obligatorios y deben ser válidos." });
  }

  const cleanCode = code.trim().toUpperCase();
  const numValue = Number(value);
  const couponType = type === 'fixed' ? 'fixed' : 'percent';

  // Validar valor del descuento (anti cupones que regalan stock o inflan montos)
  if (!Number.isSafeInteger(numValue) || numValue < 1 || (couponType === 'percent' && numValue > 100)) {
    return res.status(400).json({ error: 'Valor de descuento inválido. Porcentaje: 1–100 · Monto fijo: ≥ 1.' });
  }

  const existingIdx = COUPONS_STORE.findIndex(c => c.code === cleanCode);
  const newCoupon = {
    code: cleanCode,
    type: couponType,
    value: numValue,
    desc: isString(desc) && desc.trim() ? desc.trim() : (couponType === 'percent' ? `${numValue}% de descuento` : `$${numValue.toLocaleString('es-CL')} CLP de descuento`)
  };

  if (existingIdx !== -1) {
    COUPONS_STORE[existingIdx] = newCoupon;
  } else {
    COUPONS_STORE.push(newCoupon);
  }

  saveCouponsLocal(COUPONS_STORE);
  console.log(`🎟️ [ADMIN] Cupón permanente guardado: ${cleanCode} (${newCoupon.desc})`);
  res.json({ exito: true, mensaje: `Cupón "${cleanCode}" guardado exitosamente.`, cupones: COUPONS_STORE });
});

// Endpoint Admin: Borrar Cupón Permanente
app.post('/api/admin/coupons/delete', verifyAdmin, (req, res) => {
  const { code } = req.body;

  if (!isString(code)) return res.status(400).json({ error: "El código debe ser una cadena de texto." });

  const cleanCode = code.trim().toUpperCase();
  COUPONS_STORE = COUPONS_STORE.filter(c => c.code !== cleanCode);
  saveCouponsLocal(COUPONS_STORE);

  console.log(`🎟️ [ADMIN] Cupón eliminado: ${cleanCode}`);
  res.json({ exito: true, mensaje: `Cupón "${cleanCode}" eliminado.`, cupones: COUPONS_STORE });
});
let STORED_SETTINGS = {
  galleryEnabled: false
};

function loadSettings() {
  STORED_SETTINGS = safeReadJsonSync(SETTINGS_FILE, { galleryEnabled: false });
}

function saveSettings(settings) {
  STORED_SETTINGS = settings;
  safeWriteJsonSync(SETTINGS_FILE, settings);
}

loadSettings();

app.get('/api/settings', (req, res) => {
  res.json(STORED_SETTINGS);
});

// --- FREECURRENCY API INTEGRATION (12 MONEDAS) ---
const DEFAULT_CURRENCY_RATES = {
  CLP: { symbol: '$', code: 'CLP', rate: 1, decimals: 0, name: 'Chile (Peso chileno)' },
  USD: { symbol: 'US$', code: 'USD', rate: 0.00106, decimals: 2, name: 'Estados Unidos (Dólar estadounidense)' },
  CAD: { symbol: 'CA$', code: 'CAD', rate: 0.00145, decimals: 2, name: 'Canadá (Dólar canadiense)' },
  MXN: { symbol: '$', code: 'MXN', rate: 0.0185, decimals: 2, name: 'México (Peso mexicano)' },
  BRL: { symbol: 'R$ ', code: 'BRL', rate: 0.0055, decimals: 2, name: 'Brasil (Real brasileño)' },
  ARS: { symbol: '$', code: 'ARS', rate: 1.63, decimals: 0, name: 'Argentina (Peso argentino)' },
  COP: { symbol: '$', code: 'COP', rate: 4.25, decimals: 0, name: 'Colombia (Peso colombiano)' },
  PEN: { symbol: 'S/. ', code: 'PEN', rate: 0.0037, decimals: 2, name: 'Perú (Sol peruano)' },
  UYU: { symbol: '$U ', code: 'UYU', rate: 0.043, decimals: 2, name: 'Uruguay (Peso uruguayo)' },
  CRC: { symbol: '₡', code: 'CRC', rate: 0.54, decimals: 2, name: 'Costa Rica (Colón costarricense)' },
  EUR: { symbol: '€', code: 'EUR', rate: 0.00098, decimals: 2, name: 'España (Euro)' },
  HNL: { symbol: 'L ', code: 'HNL', rate: 0.026, decimals: 2, name: 'Honduras (Lempira hondureño)' }
};

let cachedCurrencyRates = JSON.parse(JSON.stringify(DEFAULT_CURRENCY_RATES));
let lastCurrencyFetchTime = 0;
const CURRENCY_CACHE_TTL = 6 * 60 * 60 * 1000; // 6 horas

async function fetchFreeCurrencyRates() {
  const apiKey = process.env.FREECURRENCY_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    return cachedCurrencyRates;
  }

  const now = Date.now();
  if (lastCurrencyFetchTime && (now - lastCurrencyFetchTime < CURRENCY_CACHE_TTL)) {
    return cachedCurrencyRates;
  }

  try {
    const targetCurrencies = ['CLP', 'USD', 'CAD', 'MXN', 'BRL', 'ARS', 'COP', 'PEN', 'UYU', 'CRC', 'EUR', 'HNL'];
    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${encodeURIComponent(apiKey.trim())}&currencies=${targetCurrencies.join(',')}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`FreeCurrencyAPI HTTP status ${response.status}`);
    }

    const json = await response.json();
    if (json && json.data && json.data.CLP) {
      const clpRate = json.data.CLP;

      targetCurrencies.forEach(code => {
        if (cachedCurrencyRates[code] && json.data[code] !== undefined) {
          cachedCurrencyRates[code].rate = json.data[code] / clpRate;
        }
      });

      lastCurrencyFetchTime = now;
      console.log('✅ [CURRENCY] Tasas de cambio actualizadas con éxito desde FreeCurrencyAPI');
    }
  } catch (err) {
    console.warn('⚠️ Error al consultar FreeCurrencyAPI, utilizando tasas de respaldo:', err.message);
  }

  return cachedCurrencyRates;
}

app.get('/api/exchange-rates', async (req, res) => {
  try {
    const rates = await fetchFreeCurrencyRates();
    res.json({ success: true, rates, updatedAt: lastCurrencyFetchTime });
  } catch (err) {
    res.json({ success: true, rates: cachedCurrencyRates, updatedAt: lastCurrencyFetchTime });
  }
});

app.post('/api/admin/settings/toggle-gallery', verifyAdmin, (req, res) => {
  const { enabled } = req.body;

  STORED_SETTINGS.galleryEnabled = !!enabled;
  saveSettings(STORED_SETTINGS);

  console.log(`🛠️ [ADMIN] Galería cambiada a: ${STORED_SETTINGS.galleryEnabled ? 'HABILITADA' : 'DESHABILITADA'}`);
  res.json({ exito: true, mensaje: `Galería de clientes ${STORED_SETTINGS.galleryEnabled ? 'habilitada' : 'deshabilitada'} en la tienda.`, settings: STORED_SETTINGS });
});

// Endpoint público: obtener ítems de la galería
app.get('/api/gallery', (req, res) => {
  res.json(GALLERY_STORE);
});

// Helper de sanitización contra XSS en Galería
function sanitizeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}

// Endpoint Admin: Agregar nueva foto/reseña a la galería (XSS Protected)
app.post('/api/admin/gallery/add', verifyAdmin, (req, res) => {
  const { user, stars, comment, imagen } = req.body;

  if (!user || !comment || !imagen) {
    return res.status(400).json({ error: "Por favor completa el usuario, comentario y la URL de la foto." });
  }

  const cleanUser = sanitizeHtml(user.trim());
  const cleanComment = sanitizeHtml(comment.trim());

  if (!isSafeHttpUrl(imagen)) {
    return res.status(400).json({ error: "La URL de la foto debe ser http(s)." });
  }

  const newItem = {
    id: Date.now(),
    user: cleanUser,
    stars: stars || "⭐ ⭐ ⭐ ⭐ ⭐",
    comment: cleanComment,
    imagen: imagen.trim()
  };

  GALLERY_STORE.unshift(newItem);
  saveGalleryLocal(GALLERY_STORE);

  console.log(`🛠️ [ADMIN] Nueva foto agregada a la galería por "${cleanUser}"`);
  res.json({ exito: true, mensaje: "Reseña / Foto agregada a la galería exitosamente.", galeria: GALLERY_STORE });
});

// Endpoint Admin: Eliminar foto/reseña de la galería
app.post('/api/admin/gallery/delete', verifyAdmin, (req, res) => {
  const { id } = req.body;

  GALLERY_STORE = GALLERY_STORE.filter(item => item.id !== Number(id));
  saveGalleryLocal(GALLERY_STORE);

  res.json({ exito: true, mensaje: "Foto removida de la galería.", galeria: GALLERY_STORE });
});

app.post('/api/checkout', checkoutLimiter, async (req, res) => {
  const { nombre, apellido, email, carrito, username, metodoPago, couponCode } = req.body;

  // Validación de tipos de datos en body
  if (!isString(nombre) || !isString(apellido) || !isString(email) || !Array.isArray(carrito) || carrito.length === 0) {
    return res.status(400).json({ error: "Datos incompletos o en formato incorrecto para procesar la orden." });
  }

  // Límites de longitud (anti abuso de campos, anti inyección HTML en correos)
  if (nombre.trim().length > 80 || apellido.trim().length > 80 || email.trim().length > 200 || (isString(username) && username.length > 60)) {
    return res.status(400).json({ error: "Alguno de tus datos excede el largo máximo permitido." });
  }
  if (!EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: "Por favor ingresa un correo electrónico válido." });
  }

  // Validación de tamaño del carrito
  if (carrito.length > 20) {
    return res.status(400).json({ error: "El carrito no puede tener más de 20 artículos." });
  }

  const cleanEmail = email.trim();

  // 1. Recalcular subtotal desde precios del SERVIDOR y validar stock
  let calculatedSubtotal = 0;
  for (const item of carrito) {
    if (!item || item.id === undefined) {
      return res.status(400).json({ error: "Artículo inválido en el carrito." });
    }

    // Validar que el ID sea un número válido
    const itemId = Number(item.id);
    if (isNaN(itemId) || itemId <= 0) {
      return res.status(400).json({ error: `ID de juego inválido: ${item.id}` });
    }

    // Validar cantidad: entero entre 1 y 10
    const cantidad = Number(item.cantidad || 1);
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 10) {
      return res.status(400).json({ error: `Cantidad inválida para el artículo ${item.id}. Debe ser entre 1 y 10.` });
    }

    // Validar tipo de licencia
    if (item.licencia !== 'Primaria' && item.licencia !== 'Secundaria') {
      return res.status(400).json({ error: `Tipo de licencia inválido para el artículo ${item.id}. Debe ser 'Primaria' o 'Secundaria'.` });
    }

    const gameInStore = GAMES_STORE.find(g => g.id === itemId);
    if (!gameInStore) {
      return res.status(400).json({ error: `El juego con ID ${item.id} no existe en el catálogo.` });
    }

    const configuredStock = item.licencia === 'Primaria' ? gameInStore.stockPrimaria : gameInStore.stockSecundaria;
    if (Number.isInteger(configuredStock) && configuredStock < cantidad) {
      return res.status(409).json({ error: `La licencia ${item.licencia} de "${gameInStore.titulo}" no tiene stock suficiente. Disponibles: ${configuredStock}.` });
    }

    // Validación de stock de cuentas disponibles
    if (!gameInStore.cuentas || !Array.isArray(gameInStore.cuentas) || gameInStore.cuentas.length === 0) {
      return res.status(400).json({
        error: `El juego "${gameInStore.titulo}" no cuenta con cuentas de stock disponibles en este momento. Por favor contacta a soporte.`
      });
    }

    const availableCuentas = gameInStore.cuentas.filter(c => typeof c === 'string' && c.trim().length > 0);
    if (availableCuentas.length === 0) {
      return res.status(400).json({
        error: `El juego "${gameInStore.titulo}" no cuenta con cuentas de stock disponibles en este momento. Por favor contacta a soporte.`
      });
    }

    // PRECIO SIEMPRE del servidor, NUNCA del cliente
    const basePrice = item.licencia === 'Primaria' ? gameInStore.precioPrimaria : gameInStore.precioSecundaria;
    calculatedSubtotal += basePrice * cantidad;
  }

  // 2. Validar y aplicar cupones de descuento en el servidor
  let discountAmount = 0;
  let appliedCoupon = null;
  const rawCouponCode = isString(couponCode) ? couponCode.trim().toUpperCase() : '';

  if (rawCouponCode) {
    if (rawCouponCode === 'PRUEBAXD') {
      const rawHost = (req.get('x-forwarded-host') || req.get('host') || '').toLowerCase();
      const isLocal = rawHost.includes('localhost') || rawHost.includes('127.0.0.1');
      if (process.env.NODE_ENV === 'production' || !isLocal) {
        return res.status(400).json({ error: "El cupón de pruebas PRUEBAXD está desactivado en producción." });
      }
      appliedCoupon = { code: 'PRUEBAXD', type: 'percent', value: 100 };
    } else {
      appliedCoupon = COUPONS_STORE.find(c => c.code === rawCouponCode);
    }

    if (appliedCoupon) {
      if (appliedCoupon.type === 'percent') {
        discountAmount = Math.round(calculatedSubtotal * (appliedCoupon.value / 100));
      } else if (appliedCoupon.type === 'fixed') {
        discountAmount = appliedCoupon.value;
      }
    }
  }

  const total = Math.max(0, calculatedSubtotal - discountAmount);
  const codigoOrden = `ZSC-${crypto.randomInt(100000000, 1000000000)}`;

  // Preparar carrito con precios del SERVIDOR (sin asignar cuentas aún — se asignan al confirmar pago)
  const carritoConPreciosServidor = carrito.map(item => {
    const gameInStore = GAMES_STORE.find(g => g.id === Number(item.id));
    return {
      id: Number(item.id),
      titulo: gameInStore ? gameInStore.titulo : item.titulo,
      cantidad: Number(item.cantidad || 1),
      licencia: item.licencia,
      precio: item.licencia === 'Primaria' ? gameInStore.precioPrimaria : gameInStore.precioSecundaria,
      correoTexto: gameInStore ? (gameInStore.correoTexto || '') : '',
      correoImagen: gameInStore ? (gameInStore.correoImagen || '') : ''
    };
  });

  let checkoutUserId = null;
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    if (token) checkoutUserId = jwt.verify(token, JWT_SECRET)?.id || null;
  } catch (e) {}

  const orderData = {
    codigoOrden,
    userId: checkoutUserId,
    cliente: `${nombre.trim()} ${apellido.trim()}`,
    usuario: isString(username) && username.trim() ? username.trim() : 'Invitado',
    email: cleanEmail,
    carrito: carritoConPreciosServidor,
    articulos: carritoConPreciosServidor.reduce((acc, item) => acc + (Number(item.cantidad) || 1), 0),
    total,
    totalFormatted: `$${total.toLocaleString('es-CL')} CLP`,
    fecha: new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    estado: total === 0 ? 'pagada' : 'pendiente',
    metodoPago: isString(metodoPago) ? metodoPago : 'flow',
    deliveryStatus: total === 0 ? 'pending' : 'not_ready',
    history: []
  };
  addOrderEvent(orderData, 'created', 'Orden creada.', checkoutUserId || 'guest');

  // Guardar orden de forma segura en Mongo / Local sin agotar RAM (Problema 3)
  await saveSingleOrder(orderData);

  // Si el total es 0 CLP (Cupón del 100% como PRUEBAXD), finalizar orden inmediatamente sin cobrar
  if (total === 0) {
    // Para órdenes gratis, asignar cuentas inmediatamente y enviar correo
    assignAccountsToOrder(orderData);
    sendOrderConfirmationEmail(orderData).catch(err => console.error('Error enviando correo:', err));

    return res.json({
      exito: true,
      redirectUrl: `/?flow_order=${codigoOrden}&status=2`,
      codigoOrden,
      detalles: orderData
    });
  }

  // Determinar protocolo y host para retorno seguro de pasarelas (Problema 3: Anti Open-Redirect)
  const baseUrl = getValidatedBaseUrl(req);

  // Si el cliente eligió Mercado Pago
  if (metodoPago === 'mercadopago') {
    try {
      const mpBody = {
        items: carritoConPreciosServidor.map(item => ({
          title: `${item.titulo}`,
          quantity: item.cantidad,
          currency_id: 'CLP',
          unit_price: item.precio  // Precio recalculado del SERVIDOR, no del cliente
        })),
        payer: {
          name: nombre.trim(),
          surname: apellido.trim(),
          email: cleanEmail
        },
        back_urls: {
          success: `${baseUrl}/api/mp/return`,
          failure: `${baseUrl}/api/mp/return`,
          pending: `${baseUrl}/api/mp/return`
        },
        auto_return: 'approved',
        external_reference: codigoOrden
      };

      const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mpBody)
      });

      const mpData = await mpRes.json();

      if (mpData && (mpData.init_point || mpData.sandbox_init_point)) {
        const redirectUrl = mpData.init_point || mpData.sandbox_init_point;
        orderData.mpPreferenceId = mpData.id;
        await saveSingleOrder(orderData);

        return res.json({
          exito: true,
          redirectUrl,
          codigoOrden,
          detalles: orderData
        });
      } else {
        console.error('Error al crear preferencia Mercado Pago:', mpData);
        return res.status(400).json({ error: mpData.message || "No se pudo iniciar la transacción con Mercado Pago." });
      }
    } catch (err) {
      console.error('Error de conexión con Mercado Pago:', err);
      return res.status(500).json({ error: "Error de comunicación con la pasarela Mercado Pago." });
    }
  }

  // Por defecto: Flow Chile
  const labelJuegos = orderData.articulos === 1 ? 'juego' : 'juegos';

  const FLOW_DEFAULT_EMAIL = process.env.FLOW_DEFAULT_EMAIL || 'zx.andereacc@gmail.com';
  let flowEmail = (cleanEmail && cleanEmail.includes('@')) ? cleanEmail : FLOW_DEFAULT_EMAIL;

  const buildFlowParams = (emailToUse) => {
    const params = {
      apiKey: FLOW_API_KEY,
      commerceOrder: codigoOrden,
      subject: `Compra ZonaSwitchChile (${orderData.articulos} ${labelJuegos})`,
      currency: 'CLP',
      amount: total,
      email: emailToUse,
      urlConfirmation: `${baseUrl}/api/flow/confirm`,
      urlReturn: `${baseUrl}/api/flow/return`
    };
    params.s = signFlowParams(params);
    return params;
  };

  let flowParams = buildFlowParams(flowEmail);

  const flowHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'es-CL,es;q=0.9,en-US;q=0.8,en;q=0.7'
  };

  try {
    let flowRes = await fetch(`${FLOW_API_URL}/payment/create`, {
      method: 'POST',
      headers: flowHeaders,
      body: new URLSearchParams(flowParams).toString()
    });

    let responseText = await flowRes.text();
    let flowData;
    try {
      flowData = JSON.parse(responseText);
    } catch (e) {
      console.error('❌ Respuesta no-JSON recibida de Flow API:', responseText);
      return res.status(502).json({
        error: `Error de la pasarela Flow (${flowRes.status}): Inténtalo de nuevo o contacta soporte.`
      });
    }

    // Si Flow rechaza el correo por error 1620 (sin MX / no válido), reintentar de inmediato con el email seguro del comercio
    if (!flowRes.ok && flowData && flowData.code === 1620 && flowEmail !== FLOW_DEFAULT_EMAIL) {
      console.warn(`⚠️ Flow rechazó email cliente (${flowEmail}). Reintentando automáticamente con email de contingencia (${FLOW_DEFAULT_EMAIL})...`);
      flowEmail = FLOW_DEFAULT_EMAIL;
      flowParams = buildFlowParams(flowEmail);

      flowRes = await fetch(`${FLOW_API_URL}/payment/create`, {
        method: 'POST',
        headers: flowHeaders,
        body: new URLSearchParams(flowParams).toString()
      });

      responseText = await flowRes.text();
      try { flowData = JSON.parse(responseText); } catch (e) {}
    }

    if (flowRes.ok && flowData && flowData.url && flowData.token) {
      orderData.flowOrder = flowData.flowOrder;
      orderData.token = flowData.token;
      await saveSingleOrder(orderData);

      return res.json({
        exito: true,
        redirectUrl: `${flowData.url}?token=${flowData.token}`,
        codigoOrden,
        detalles: orderData
      });
    } else {
      console.error('❌ Error al crear pago en Flow:', flowData);
      const friendlyError = formatFlowErrorMessage(flowData);
      return res.status(400).json({ error: friendlyError });
    }
  } catch (err) {
    console.error('❌ Error de conexión de red con Flow:', err);
    return res.status(500).json({ error: "Error de comunicación con la pasarela de pago Flow. Revisa tu conexión de red." });
  }
});

// Retorno del usuario desde la pasarela Flow (Webpay, etc.)
app.all('/api/flow/return', async (req, res) => {
  const token = req.query?.token || req.body?.token;
  if (!token) {
    return res.redirect('/?status=cancelled');
  }

  // Validar firma del callback recibida de Flow usando tiempo constante (Anti Timing Attack)
  const incomingParams = req.method === 'POST' ? { ...req.body } : { ...req.query };
  const incomingSign = incomingParams.s;
  if (!incomingSign) {
    return res.status(403).send('Firma requerida.');
  }
  if (incomingSign) {
    delete incomingParams.s;
    const computedSign = signFlowParams(incomingParams);
    if (!safeCompareSignatures(computedSign, incomingSign)) {
      console.warn("⚠️ Advertencia: Firma de callback de Flow no válida.");
      return res.redirect('/?status=cancelled');
    }
  }

  try {
    const params = { apiKey: FLOW_API_KEY, token };
    params.s = signFlowParams(params);

    const flowRes = await fetch(`${FLOW_API_URL}/payment/getStatus?${new URLSearchParams(params).toString()}`, {
      headers: flowHeaders
    });
    const responseText = await flowRes.text();
    let statusData;
    try {
      statusData = JSON.parse(responseText);
    } catch (e) {
      console.error('❌ Error parseando estado de Flow:', responseText);
      return res.redirect('/?status=cancelled');
    }

    const order = (await getOrderByCode(token)) || (statusData.commerceOrder ? await getOrderByCode(statusData.commerceOrder) : null);

    let orderCode = statusData.commerceOrder || (order ? order.codigoOrden : '');
    let status = statusData.status !== undefined ? statusData.status : 4; // 2 = Pagada, 3 = Rechazada, 4 = Anulada, 1 = Pendiente

    if (order) {
      const oldStatus = order.estado;
      order.flowStatus = status;
      order.estado = status === 2 ? 'pagada' : (status === 3 ? 'rechazada' : 'cancelada');
      if (order.estado === 'pagada' && !order.deliveryStatus) order.deliveryStatus = 'pending';
      await saveSingleOrder(order);
      orderCode = order.codigoOrden;

      // Asignar cuentas y enviar correo de entrega si el pedido acaba de ser pagado 📩
      if (order.estado === 'pagada' && oldStatus !== 'pagada') {
        assignAccountsToOrder(order);
        sendOrderConfirmationEmail(order).then(() => { order.deliveryStatus = 'sent'; addOrderEvent(order, 'delivery_email_sent', 'Correo de entrega enviado.', 'system'); return saveSingleOrder(order); }).catch(err => console.error('Error enviando correo:', err));
      }
    }

    res.redirect(`/?flow_order=${encodeURIComponent(orderCode)}&status=${encodeURIComponent(status)}`);
  } catch (err) {
    console.error('❌ Error en callback de retorno Flow:', err);
    res.redirect('/?status=cancelled');
  }
});

// Confirmación asíncrona de Flow (Webhook servidor a servidor)
app.post('/api/flow/confirm', async (req, res) => {
  const token = req.body?.token || req.query?.token;
  if (!token) return res.status(400).send('Token no proporcionado.');

  // Validar firma del callback recibida de Flow usando tiempo constante (Problema 1: Anti Timing Attack)
  const incomingParams = req.method === 'POST' ? { ...req.body } : { ...req.query };
  const incomingSign = incomingParams.s;
  if (!incomingSign) {
    return res.status(403).send('Firma requerida.');
  }
  if (incomingSign) {
    delete incomingParams.s;
    const computedSign = signFlowParams(incomingParams);
    if (!safeCompareSignatures(computedSign, incomingSign)) {
      console.warn("⚠️ Advertencia: Firma de webhook de Flow no válida.");
      return res.status(403).send("Firma inválida.");
    }
  }

  try {
    const params = { apiKey: FLOW_API_KEY, token };
    params.s = signFlowParams(params);

    const flowRes = await fetch(`${FLOW_API_URL}/payment/getStatus?${new URLSearchParams(params).toString()}`, {
      headers: flowHeaders
    });
    const responseText = await flowRes.text();
    let statusData;
    try {
      statusData = JSON.parse(responseText);
    } catch (e) {
      return res.status(500).send('Error');
    }

    const order = (await getOrderByCode(token)) || (await getOrderByCode(statusData.commerceOrder));

    if (order) {
      const oldStatus = order.estado;
      order.flowStatus = statusData.status;
      order.estado = statusData.status === 2 ? 'pagada' : 'rechazada';
      if (order.estado === 'pagada' && !order.deliveryStatus) order.deliveryStatus = 'pending';
      await saveSingleOrder(order);

      // Asignar cuentas y enviar correo de entrega si el pedido acaba de ser pagado 📩
      if (order.estado === 'pagada' && oldStatus !== 'pagada') {
        assignAccountsToOrder(order);
        sendOrderConfirmationEmail(order).then(() => { order.deliveryStatus = 'sent'; addOrderEvent(order, 'delivery_email_sent', 'Correo de entrega enviado.', 'system'); return saveSingleOrder(order); }).catch(err => console.error('Error enviando correo:', err));
      }
    }

    res.send('OK');
  } catch (err) {
    res.status(500).send('Error');
  }
});

// Retorno del usuario desde la pasarela Mercado Pago
// NOTA: No confiar en los query params — verificar server-to-server con la API de MP
app.all('/api/mp/return', async (req, res) => {
  const externalRef = req.query.external_reference || req.query.preference_id;
  const paymentId = req.query.payment_id;
  let verifiedStatus = 'pending';

  // Verificar el pago server-to-server con la API de Mercado Pago
  if (paymentId && MP_ACCESS_TOKEN) {
    try {
      const mpVerifyRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { 'Authorization': `Bearer ${MP_ACCESS_TOKEN}` }
      });
      if (mpVerifyRes.ok) {
        const mpPayment = await mpVerifyRes.json();
        const orderToCheck = externalRef && isString(externalRef) ? await getOrderByCode(externalRef) : null;
        const amountMatches = !!orderToCheck && Number(mpPayment.transaction_amount) === Number(orderToCheck.total);
        const currencyMatches = !mpPayment.currency_id || mpPayment.currency_id === 'CLP';
        const referenceMatches = !!orderToCheck && mpPayment.external_reference === orderToCheck.codigoOrden;
        verifiedStatus = (mpPayment.status === 'approved' && amountMatches && currencyMatches && referenceMatches) ? 'approved' : (mpPayment.status || 'pending');
        console.log(`✅ [MP] Pago ${paymentId} verificado server-to-server. Estado: ${verifiedStatus}`);
      } else {
        console.warn(`⚠️ [MP] No se pudo verificar pago ${paymentId}: HTTP ${mpVerifyRes.status}`);
      }
    } catch (err) {
      console.error('❌ Error verificando pago con MP API:', err.message);
    }
  } else {
    // Sin payment_id o sin token, no se puede verificar → NO marcar como pagada
    console.warn('⚠️ [MP] Retorno sin payment_id o sin MP_ACCESS_TOKEN. No se verificará el pago.');
  }

  if (externalRef && isString(externalRef)) {
    const order = await getOrderByCode(externalRef);
    if (order) {
      const oldStatus = order.estado;
      order.mpPaymentId = paymentId;
      order.mpStatus = verifiedStatus;
      order.estado = verifiedStatus === 'approved' ? 'pagada' : (verifiedStatus === 'rejected' ? 'rechazada' : 'pendiente');
      await saveSingleOrder(order);

      // Asignar cuentas y enviar correo SOLO si el pago fue verificado como aprobado
      if (order.estado === 'pagada' && oldStatus !== 'pagada') {
        assignAccountsToOrder(order);
        sendOrderConfirmationEmail(order).then(() => { order.deliveryStatus = 'sent'; addOrderEvent(order, 'delivery_email_sent', 'Correo de entrega enviado.', 'system'); return saveSingleOrder(order); }).catch(err => console.error('Error enviando correo:', err));
      }
    }
  }

  res.redirect(`/?mp_order=${encodeURIComponent(externalRef || '')}&status=${encodeURIComponent(verifiedStatus)}`);
});

// Webhook IPN de Mercado Pago — verificación asíncrona server-to-server
app.post('/api/mp/confirm', async (req, res) => {
  const { type, data } = req.body || {};

  if (type === 'payment' && data && data.id && MP_ACCESS_TOKEN) {
    try {
      const mpVerifyRes = await fetch(`https://api.mercadopago.com/v1/payments/${data.id}`, {
        headers: { 'Authorization': `Bearer ${MP_ACCESS_TOKEN}` }
      });

      if (mpVerifyRes.ok) {
        const mpPayment = await mpVerifyRes.json();
        const externalRef = mpPayment.external_reference;
        const verifiedStatus = mpPayment.status;

        console.log(`🔔 [MP Webhook] Pago ${data.id} notificado. Estado: ${verifiedStatus}, Ref: ${externalRef}`);

        if (externalRef) {
          const order = await getOrderByCode(externalRef);
          if (order) {
            const oldStatus = order.estado;
            order.mpPaymentId = data.id;
            order.mpStatus = verifiedStatus;
            order.estado = verifiedStatus === 'approved' ? 'pagada' : (verifiedStatus === 'rejected' ? 'rechazada' : order.estado);
            await saveSingleOrder(order);

            if (order.estado === 'pagada' && oldStatus !== 'pagada') {
              assignAccountsToOrder(order);
              sendOrderConfirmationEmail(order).then(() => { order.deliveryStatus = 'sent'; addOrderEvent(order, 'delivery_email_sent', 'Correo de entrega enviado.', 'system'); return saveSingleOrder(order); }).catch(err => console.error('Error enviando correo:', err));
            }
          }
        }
      }
    } catch (err) {
      console.error('❌ Error en webhook IPN de Mercado Pago:', err.message);
    }
  }

  res.send('OK');
});


// --- ADMINISTRACIÓN DE ÓRDENES ---
app.get('/api/admin/orders', verifyAdmin, async (req, res) => {
  let orders = [];
  if (isMongoConnected) {
    try { orders = await OrderModel.find({}).sort({ _id: -1 }).lean(); } catch (e) { console.error('Error cargando órdenes admin:', e.message); }
  }
  if (!orders.length) orders = safeReadJsonSync(ORDERS_FILE, []);
  const q = isString(req.query.q) ? req.query.q.trim().toLowerCase() : '';
  const status = isString(req.query.status) ? req.query.status.trim().toLowerCase() : '';
  orders = orders.filter(o => (!q || [o.codigoOrden, o.email, o.usuario, o.cliente].some(v => isString(v) && v.toLowerCase().includes(q))) && (!status || String(o.estado || '').toLowerCase() === status));
  res.json(orders.map(getOrderForAdmin));
});

app.get('/api/admin/orders/:code', verifyAdmin, async (req, res) => {
  const order = await getOrderByCode(req.params.code);
  if (!order) return res.status(404).json({ error: 'Orden no encontrada.' });
  res.json(getOrderForAdmin(order));
});

app.post('/api/admin/orders/:code/cancel', verifyAdmin, async (req, res) => {
  const order = await getOrderByCode(req.params.code);
  if (!order) return res.status(404).json({ error: 'Orden no encontrada.' });
  if (order.estado === 'pagada' && order.deliveryStatus === 'delivered') return res.status(400).json({ error: 'La orden ya fue entregada. Gestiona el reembolso por separado.' });
  const reason = isString(req.body?.reason) ? req.body.reason.trim() : 'Cancelada por administración';
  order.estado = 'cancelada';
  order.deliveryStatus = 'cancelled';
  order.cancelReason = reason;
  addOrderEvent(order, 'cancelled', reason, req.user.username);
  await saveSingleOrder(order);
  res.json({ exito: true, order: getOrderForAdmin(order) });
});

app.post('/api/admin/orders/:code/refund', verifyAdmin, async (req, res) => {
  const order = await getOrderByCode(req.params.code);
  if (!order) return res.status(404).json({ error: 'Orden no encontrada.' });
  const reason = isString(req.body?.reason) ? req.body.reason.trim() : 'Reembolso registrado por administración';
  order.estado = 'reembolsada';
  order.deliveryStatus = order.deliveryStatus === 'delivered' ? 'refunded' : (order.deliveryStatus || 'refunded');
  order.refundReason = reason;
  addOrderEvent(order, 'refunded', reason, req.user.username);
  await saveSingleOrder(order);
  res.json({ exito: true, order: getOrderForAdmin(order), aviso: 'El reembolso monetario debe ejecutarse también en la pasarela si corresponde.' });
});

app.post('/api/admin/orders/:code/resend-delivery', verifyAdmin, async (req, res) => {
  const order = await getOrderByCode(req.params.code);
  if (!order) return res.status(404).json({ error: 'Orden no encontrada.' });
  if (!Array.isArray(order.carrito) || !order.carrito.some(i => i.varianteAsignada)) return res.status(400).json({ error: 'La orden todavía no tiene credenciales asignadas.' });
  if (order.estado !== 'pagada') return res.status(400).json({ error: 'Solo se puede reenviar una entrega pagada.' });
  await sendOrderConfirmationEmail(order);
  order.deliveryStatus = 'sent';
  addOrderEvent(order, 'delivery_email_resent', 'Correo de entrega reenviado por administración.', req.user.username);
  await saveSingleOrder(order);
  res.json({ exito: true, order: getOrderForAdmin(order) });
});

app.post('/api/admin/orders/:code/status', verifyAdmin, async (req, res) => {
  const order = await getOrderByCode(req.params.code);
  if (!order) return res.status(404).json({ error: 'Orden no encontrada.' });
  const nextStatus = isString(req.body?.status) ? req.body.status.trim().toLowerCase() : '';
  const allowed = ['pendiente', 'pagada', 'rechazada', 'cancelada', 'reembolsada'];
  if (!allowed.includes(nextStatus)) return res.status(400).json({ error: 'Estado no válido.' });
  const old = order.estado;
  order.estado = nextStatus;
  addOrderEvent(order, 'status_changed', `${old} → ${nextStatus}`, req.user.username);
  await saveSingleOrder(order);
  res.json({ exito: true, order: getOrderForAdmin(order) });
});

app.post('/api/orders/:code/retry-payment', checkoutLimiter, async (req, res) => {
  const order = await getOrderByCode(req.params.code);
  if (!order) return res.status(404).json({ error: 'Orden no encontrada.' });
  if (!['pendiente', 'rechazada', 'cancelada'].includes(order.estado)) return res.status(400).json({ error: 'Esta orden no puede reintentarse.' });
  if (!Array.isArray(order.carrito) || !order.carrito.length) return res.status(400).json({ error: 'La orden no tiene productos.' });

  // Validar que quien reintenta es el dueño: token JWT del usuario O correo de la orden
  let ownerId = null;
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    if (token) ownerId = jwt.verify(token, JWT_SECRET)?.id || null;
  } catch (e) {}
  const providedEmail = normalizeEmail(req.body?.email);
  const isOwner = (order.userId && ownerId && String(order.userId) === String(ownerId)) ||
                  (providedEmail && normalizeEmail(order.email) === providedEmail);
  if (!isOwner) {
    return res.status(403).json({ error: 'Solo el titular de la orden puede reintentar el pago.' });
  }

  const baseUrl = getValidatedBaseUrl(req);
  order.retryCount = Number(order.retryCount || 0) + 1;
  order.estado = 'pendiente';
  addOrderEvent(order, 'payment_retry', `Reintento de pago #${order.retryCount}`, 'customer');

  try {
    if (order.metodoPago === 'mercadopago') {
      if (!MP_ACCESS_TOKEN) return res.status(503).json({ error: 'Mercado Pago no está configurado.' });
      const mpBody = {
        items: order.carrito.map(item => ({ title: item.titulo, quantity: item.cantidad, currency_id: 'CLP', unit_price: item.precio })),
        payer: { email: order.email },
        back_urls: { success: `${baseUrl}/api/mp/return`, failure: `${baseUrl}/api/mp/return`, pending: `${baseUrl}/api/mp/return` },
        auto_return: 'approved',
        external_reference: order.codigoOrden
      };
      const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', { method: 'POST', headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify(mpBody) });
      const mpData = await mpRes.json();
      if (!mpRes.ok || !mpData.init_point) return res.status(400).json({ error: mpData.message || 'No se pudo crear un nuevo pago.' });
      order.mpPreferenceId = mpData.id;
      await saveSingleOrder(order);
      return res.json({ exito: true, redirectUrl: mpData.init_point, order: sanitizeOrderForUser(order) });
    }

    const FLOW_DEFAULT_EMAIL = process.env.FLOW_DEFAULT_EMAIL || order.email;
    const params = { apiKey: FLOW_API_KEY, commerceOrder: order.codigoOrden, subject: `Reintento ${order.codigoOrden}`, currency: 'CLP', amount: order.total, email: order.email || FLOW_DEFAULT_EMAIL, urlConfirmation: `${baseUrl}/api/flow/confirm`, urlReturn: `${baseUrl}/api/flow/return` };
    params.s = signFlowParams(params);
    const flowRes = await fetch(`${FLOW_API_URL}/payment/create`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(params).toString() });
    const flowData = await flowRes.json();
    if (!flowRes.ok || !flowData.url || !flowData.token) return res.status(400).json({ error: formatFlowErrorMessage(flowData) });
    order.flowOrder = flowData.flowOrder;
    order.token = flowData.token;
    await saveSingleOrder(order);
    res.json({ exito: true, redirectUrl: `${flowData.url}?token=${flowData.token}`, order: sanitizeOrderForUser(order) });
  } catch (err) {
    console.error('Error reintentando pago:', err);
    res.status(500).json({ error: 'No se pudo reintentar el pago.' });
  }
});

// Consultar orden por código (datos sensibles sanitizados para seguridad)
app.get('/api/orders/:code', generalApiLimiter, async (req, res) => {
  if (!isString(req.params.code)) return res.status(400).json({ error: "Código inválido." });
  const order = await getOrderByCode(req.params.code);
  if (!order) return res.status(404).json({ error: "Orden no encontrada." });

  // Sanitizar datos sensibles: no exponer credenciales de cuentas asignadas
  const emailMasked = order.email && order.email.includes('@')
    ? order.email.replace(/^(.)[^@]*@/, '$1***@')
    : '***';
  const sanitizedOrder = {
    codigoOrden: order.codigoOrden,
    cliente: order.cliente,
    usuario: order.usuario,
    email: emailMasked,
    carrito: Array.isArray(order.carrito) ? order.carrito.map(item => ({
      titulo: item.titulo,
      cantidad: item.cantidad,
      licencia: item.licencia,
      precio: item.precio
      // varianteAsignada deliberadamente EXCLUIDA
    })) : [],
    articulos: order.articulos,
    total: order.total,
    totalFormatted: order.totalFormatted,
    fecha: order.fecha,
    estado: order.estado,
    metodoPago: order.metodoPago
  };

  res.json(sanitizedOrder);
});

// Captura global de promesas no manejadas y excepciones para evitar caídas del proceso
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promesa no manejada rechazada en:', promise, 'razón:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Excepción no capturada globalmente:', error);
});

// Middleware global de manejo de errores de Express
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: "Formato JSON no válido en la petición." });
  }

  console.error('❌ Error capturado por Express:', err.stack || err.message || err);
  
  // Ocultar stack trace y detalles técnicos en producción
  const isProduction = process.env.NODE_ENV === 'production' || 
                       (req.get('host') && !req.get('host').includes('localhost') && !req.get('host').includes('127.0.0.1'));
                       
  const message = isProduction
    ? "Ocurrió un error interno en el servidor. Intenta de nuevo más tarde."
    : err.message || "Error interno del servidor.";
    
  res.status(err.status || 500).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ZonaSwitchChile activo en https://zonaswitchchile.com (Puerto ${PORT})`);
});
