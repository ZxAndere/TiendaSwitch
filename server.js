const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Asegurar directorio de datos
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

// Helpers para usuarios
function getUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Catálogo de Juegos ZonaSwitchChile con especificidades
const JUEGOS = [
  {
    id: 1,
    titulo: "The Legend of Zelda: Tears of the Kingdom",
    categoria: "Acción / Aventura",
    precio: 20,
    precioSecundaria: 16.99,
    precioPrimaria: 24.99,
    precioOriginal: 69.99,
    rating: 4.9,
    peso: "18.2 GB",
    imagen: "https://img-eshop.cdn.nintendo.net/i/9222b2b244072d28af4586c4e33663e2c65527b593edff956367361ec1263989.jpg",
    descripcion: "Explora las vastas tierras y los cielos de Hyrule en una aventura sin precedentes.",
    resumenExtenso: "En esta secuela de The Legend of Zelda: Breath of the Wild, te embarcarás en una épica travesía a través de la tierra y los cielos de Hyrule. Crea tus propias armas fantásticas con la habilidad Combinación y surca las alturas con la habilidad Ultramano."
  },
  {
    id: 2,
    titulo: "Super Mario Bros. Wonder",
    categoria: "Plataformas",
    precio: 20,
    precioSecundaria: 15.99,
    precioPrimaria: 22.99,
    precioOriginal: 59.99,
    rating: 4.8,
    peso: "3.6 GB",
    imagen: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/2x1_NSwitch_SuperMarioBrosWonder.jpg",
    descripcion: "¡La evolución clásica de Mario! Descubre transformaciones asombrosas y efectos Maravilla.",
    resumenExtenso: "¡Encuentra sorpresas en cada esquina con las Flores Maravilla! Transfórmate en Mario Elefante, utiliza nuevas habilidades de tubería y juega en modo cooperativo con tus personajes favoritos del Reino Champiñón."
  },
  {
    id: 3,
    titulo: "Hollow Knight",
    categoria: "Indie",
    precio: 8,
    precioSecundaria: 6.99,
    precioPrimaria: 10.99,
    precioOriginal: 14.99,
    rating: 4.9,
    peso: "5.2 GB",
    imagen: "https://images.squarespace-cdn.com/content/v1/606d4deb4db8c15ea53b3624/1619052791039-U5P66XF1HX6OHSPMRHP0/banner_real.jpg",
    descripcion: "Desciende al oscuro mundo de Hallownest en una obra maestra de acción 2D.",
    resumenExtenso: "Forge tu propio camino en Hollow Knight. Una aventura de acción épica a través de un vasto reino en ruinas repleto de insectos y héroes. Explora cavernas interconectadas, combate criaturas corrompidas y traba amistad con extraños bichos."
  },
  {
    id: 4,
    titulo: "Mario Kart 8 Deluxe",
    categoria: "Multijugador",
    precio: 20,
    precioSecundaria: 15.99,
    precioPrimaria: 23.99,
    precioOriginal: 59.99,
    rating: 4.9,
    peso: "6.8 GB",
    imagen: "https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000000153/de697f487a36d802dd9a5ff0341f717c8486221f2f1219b675af37aca63bc453",
    descripcion: "La versión definitiva de Mario Kart. ¡Compite con amigos en docenas de pistas épicas!",
    resumenExtenso: "Compite con tus amigos o enfréntate a corredores de todo el mundo en la versión definitiva de Mario Kart 8. Incluye todos los circuitos y personajes de la versión de Wii U, además de nuevos pilotos e ítems estratégicos."
  },
  {
    id: 5,
    titulo: "Metroid Dread",
    categoria: "Acción / Aventura",
    precio: 18,
    precioSecundaria: 14.99,
    precioPrimaria: 21.99,
    precioOriginal: 59.99,
    rating: 4.7,
    peso: "4.1 GB",
    imagen: "https://media.vandal.net/ivandal/12/63/1200x630/10/102441/metroid-dread-20216151935543_22.jpg",
    descripcion: "Acompaña a Samus Aran en su escape de un peligroso mundo alienígena infestado de robots E.M.M.I.",
    resumenExtenso: "Únete a la cazarrecompensas intergaláctica Samus Aran en su primera historia en 2D de Metroid en 19 años. Escape del planeta ZDR mientras eres perseguido por letales robots de investigación E.M.M.I."
  },
  {
    id: 6,
    titulo: "Celeste",
    categoria: "Indie",
    precio: 6,
    precioSecundaria: 4.99,
    precioPrimaria: 7.99,
    precioOriginal: 19.99,
    rating: 4.9,
    peso: "1.2 GB",
    imagen: "https://assets.games.gg/celeste_banner_banner_76600851ba.webp",
    descripcion: "Ayuda a Madeline a superar sus demonios internos y escalar la exigente Montaña Celeste.",
    resumenExtenso: "Un juego de plataformas sobre la superación personal creado por los creadores de TowerFall. Supera cientos de desafíos hechos a mano, descubre secretos perturbadores y desentraña el misterio de la montaña."
  },
  {
    id: 7,
    titulo: "Pokémon Leyendas: Arceus",
    categoria: "Acción / Aventura",
    precio: 22,
    precioSecundaria: 17.99,
    precioPrimaria: 25.99,
    precioOriginal: 59.99,
    rating: 4.6,
    peso: "6.1 GB",
    imagen: "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1200/b_white/f_auto/q_auto/ncom/software/switch/70010000039945/4d70889ec1b739fb5ecf91196ed5e381",
    descripcion: "Explora la antigua región de Hisui y crea la primera Pokédex de la historia.",
    resumenExtenso: "Prepárate para una nueva gran aventura Pokémon en Hisui, la región de Sinnoh en tiempos remotos. Atrapa, explora e investiga Pokémon salvajes en un vasto mundo abierto lleno de misterios ancestrales."
  },
  {
    id: 8,
    titulo: "Super Smash Bros. Ultimate",
    categoria: "Multijugador",
    precio: 22,
    precioSecundaria: 17.99,
    precioPrimaria: 25.99,
    precioOriginal: 59.99,
    rating: 4.9,
    peso: "16.0 GB",
    imagen: "https://assets.nintendo.com/image/upload/c_fill,w_1200/v1/ncom/en_US/games/switch/s/super-smash-bros-ultimate-switch/hero",
    descripcion: "¡Todos están aquí! El mayor crossover de la historia del videojuego con más de 80 luchadores.",
    resumenExtenso: "Luchadores legendarios e íconos de los videojuegos chocan en el enfrentamiento definitivo. Combates más rápidos, nuevos objetos, nuevos ataques y nuevos escenarios te esperan en la entrega más ambiciosa de Smash Bros."
  }
];

// --- ENDPOINTS DE AUTENTICACIÓN ---

// Registro de usuario
app.post('/api/auth/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || typeof username !== 'string' || username.trim().length < 3) {
    return res.status(400).json({ error: "El nombre de usuario debe tener al menos 3 caracteres." });
  }

  const cleanUsername = username.trim();

  // Validaciones de contraseña: mínimo 6 caracteres y al menos 1 número
  if (!password || password.length < 6) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres." });
  }
  if (!/\d/.test(password)) {
    return res.status(400).json({ error: "La contraseña debe contener al menos 1 número." });
  }

  const users = getUsers();

  // Verificar si el usuario ya existe (insensible a mayúsculas)
  const exists = users.some(u => u.username.toLowerCase() === cleanUsername.toLowerCase());
  if (exists) {
    return res.status(400).json({ error: "Este nombre de usuario ya está registrado en ZonaSwitchChile. Por favor elige otro." });
  }

  const newUser = {
    id: `USR-${Date.now()}`,
    username: cleanUsername,
    password, // En producción se usaría bcrypt, para la tienda local se almacena de forma persistente
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  res.json({
    exito: true,
    mensaje: "¡Registro completado con éxito!",
    usuario: { id: newUser.id, username: newUser.username }
  });
});

// Inicio de Sesión
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Por favor ingresa tu usuario y contraseña." });
  }

  const users = getUsers();
  const user = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Usuario o contraseña incorrectos." });
  }

  res.json({
    exito: true,
    mensaje: `¡Bienvenido de nuevo, ${user.username}!`,
    usuario: { id: user.id, username: user.username }
  });
});

// Catálogo
app.get('/api/juegos', (req, res) => {
  res.json(JUEGOS);
});

// Checkout
app.post('/api/checkout', (req, res) => {
  const { nombre, apellido, email, carrito, username } = req.body;

  if (!nombre || !apellido || !carrito || carrito.length === 0) {
    return res.status(400).json({ error: "Datos incompletos para procesar la orden." });
  }

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const totalOriginal = carrito.reduce((acc, item) => acc + (item.precioOriginal || item.precio * 2) * item.cantidad, 0);
  const ahorro = totalOriginal - total;

  const codigoOrden = `ZSC-${Math.floor(100000 + Math.random() * 900000)}`;

  res.json({
    exito: true,
    mensaje: `¡Gracias por tu compra en ZonaSwitchChile, ${nombre}!`,
    detalles: {
      codigoOrden,
      cliente: `${nombre} ${apellido}`,
      usuario: username || 'Invitado',
      email: email || 'No especificado',
      articulos: carrito.reduce((acc, item) => acc + item.cantidad, 0),
      total: total.toFixed(2),
      ahorro: ahorro.toFixed(2),
      fecha: new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ZonaSwitchChile activo en http://localhost:${PORT}`);
});
