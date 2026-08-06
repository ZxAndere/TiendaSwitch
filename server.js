const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Catálogo de juegos en oferta
const JUEGOS = [
  { id: 1, titulo: "The Legend of Zelda: Tears of the Kingdom", precio: 20.000, imagen: "https://img-eshop.cdn.nintendo.net/i/9222b2b244072d28af4586c4e33663e2c65527b593edff956367361ec1263989.jpg" },
  { id: 2, titulo: "Super Mario Bros. Wonder", precio: 20.000, imagen: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/2x1_NSwitch_SuperMarioBrosWonder.jpg" },
  { id: 3, titulo: "Hollow Knight", precio: 8.000, imagen: "https://images.squarespace-cdn.com/content/v1/606d4deb4db8c15ea53b3624/1619052791039-U5P66XF1HX6OHSPMRHP0/banner_real.jpg" },
  { id: 4, titulo: "Mario Kart 8 Deluxe", precio: 20.000, imagen: "https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000000153/de697f487a36d802dd9a5ff0341f717c8486221f2f1219b675af37aca63bc453" },
  { id: 5, titulo: "Metroid Dread", precio: 18.00, imagen: "https://media.vandal.net/ivandal/12/63/1200x630/10/102441/metroid-dread-20216151935543_22.jpg" },
  { id: 6, titulo: "Celeste", precio: 6.000, imagen: "https://assets.games.gg/celeste_banner_banner_76600851ba.webp" }
];

// Endpoint para obtener catálogo
app.get('/api/juegos', (req, res) => {
  res.json(JUEGOS);
});

// Endpoint de pago simulado (Verificación de prueba)
app.post('/api/checkout', (req, res) => {
  const { nombre, apellido, carrito } = req.body;

  if (!nombre || !apellido || !carrito || carrito.length === 0) {
    return res.status(400).json({ error: "Datos incompletos para procesar la orden." });
  }

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  // Simulación de respuesta exitosa de compra
  res.json({
    exito: true,
    mensaje: `¡Gracias por tu compra, ${nombre} ${apellido}!`,
    detalles: {
      total: total.toFixed(2),
      articulos: carrito.length,
      codigoOrden: `NIN-${Math.floor(100000 + Math.random() * 900000)}`
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
