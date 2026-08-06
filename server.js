const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Catálogo enriquecido de juegos
const JUEGOS = [
  {
    id: 1,
    titulo: "The Legend of Zelda: Tears of the Kingdom",
    categoria: "Acción / Aventura",
    precio: 20,
    precioOriginal: 69.99,
    rating: 4.9,
    imagen: "https://img-eshop.cdn.nintendo.net/i/9222b2b244072d28af4586c4e33663e2c65527b593edff956367361ec1263989.jpg",
    descripcion: "Explora las vastas tierras y los cielos de Hyrule en una aventura sin precedentes."
  },
  {
    id: 2,
    titulo: "Super Mario Bros. Wonder",
    categoria: "Plataformas",
    precio: 20,
    precioOriginal: 59.99,
    rating: 4.8,
    imagen: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/2x1_NSwitch_SuperMarioBrosWonder.jpg",
    descripcion: "¡La evolución clásica de Mario! Descubre transformaciones asombrosas y efectos Maravilla."
  },
  {
    id: 3,
    titulo: "Hollow Knight",
    categoria: "Indie",
    precio: 8,
    precioOriginal: 14.99,
    rating: 4.9,
    imagen: "https://images.squarespace-cdn.com/content/v1/606d4deb4db8c15ea53b3624/1619052791039-U5P66XF1HX6OHSPMRHP0/banner_real.jpg",
    descripcion: "Desciende al oscuro mundo de Hallownest en una obra maestra de acción 2D."
  },
  {
    id: 4,
    titulo: "Mario Kart 8 Deluxe",
    categoria: "Multijugador",
    precio: 20,
    precioOriginal: 59.99,
    rating: 4.9,
    imagen: "https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000000153/de697f487a36d802dd9a5ff0341f717c8486221f2f1219b675af37aca63bc453",
    descripcion: "La versión definitiva de Mario Kart. ¡Compite con amigos en docenas de pistas épicas!"
  },
  {
    id: 5,
    titulo: "Metroid Dread",
    categoria: "Acción / Aventura",
    precio: 18,
    precioOriginal: 59.99,
    rating: 4.7,
    imagen: "https://media.vandal.net/ivandal/12/63/1200x630/10/102441/metroid-dread-20216151935543_22.jpg",
    descripcion: "Acompaña a Samus Aran en su escape de un peligroso mundo alienígena infestado de robots E.M.M.I."
  },
  {
    id: 6,
    titulo: "Celeste",
    categoria: "Indie",
    precio: 6,
    precioOriginal: 19.99,
    rating: 4.9,
    imagen: "https://assets.games.gg/celeste_banner_banner_76600851ba.webp",
    descripcion: "Ayuda a Madeline a superar sus demonios internos y escalar la exigente Montaña Celeste."
  },
  {
    id: 7,
    titulo: "Pokémon Leyendas: Arceus",
    categoria: "Acción / Aventura",
    precio: 22,
    precioOriginal: 59.99,
    rating: 4.6,
    imagen: "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1200/b_white/f_auto/q_auto/ncom/software/switch/70010000039945/4d70889ec1b739fb5ecf91196ed5e381",
    descripcion: "Explora la antigua región de Hisui y crea la primera Pokédex de la historia."
  },
  {
    id: 8,
    titulo: "Super Smash Bros. Ultimate",
    categoria: "Multijugador",
    precio: 22,
    precioOriginal: 59.99,
    rating: 4.9,
    imagen: "https://assets.nintendo.com/image/upload/c_fill,w_1200/v1/ncom/en_US/games/switch/s/super-smash-bros-ultimate-switch/hero",
    descripcion: "¡Todos están aquí! El mayor crossover de la historia del videojuego con más de 80 luchadores."
  }
];

// Endpoint para obtener catálogo
app.get('/api/juegos', (req, res) => {
  res.json(JUEGOS);
});

// Endpoint de pago simulado
app.post('/api/checkout', (req, res) => {
  const { nombre, apellido, email, carrito } = req.body;

  if (!nombre || !apellido || !carrito || carrito.length === 0) {
    return res.status(400).json({ error: "Datos incompletos para procesar la orden." });
  }

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const totalOriginal = carrito.reduce((acc, item) => acc + (item.precioOriginal || item.precio * 2) * item.cantidad, 0);
  const ahorro = totalOriginal - total;

  const codigoOrden = `NSW-${Math.floor(100000 + Math.random() * 900000)}`;

  res.json({
    exito: true,
    mensaje: `¡Gracias por tu compra, ${nombre}!`,
    detalles: {
      codigoOrden,
      cliente: `${nombre} ${apellido}`,
      email: email || 'No especificado',
      articulos: carrito.reduce((acc, item) => acc + item.cantidad, 0),
      total: total.toFixed(2),
      ahorro: ahorro.toFixed(2),
      fecha: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor SwitchAccesible activo en http://localhost:${PORT}`);
});
