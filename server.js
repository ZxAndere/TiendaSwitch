const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Catálogo de juegos en oferta
const JUEGOS = [
  { id: 1, titulo: "The Legend of Zelda: Tears of the Kingdom", precio: 24.99, imagen: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=600&q=80" },
  { id: 2, titulo: "Super Mario Bros. Wonder", precio: 19.99, imagen: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80" },
  { id: 3, titulo: "Hollow Knight", precio: 4.99, imagen: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80" },
  { id: 4, titulo: "Mario Kart 8 Deluxe", precio: 22.50, imagen: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80" },
  { id: 5, titulo: "Metroid Dread", precio: 18.00, imagen: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=600&q=80" },
  { id: 6, titulo: "Celeste", precio: 3.99, imagen: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" }
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