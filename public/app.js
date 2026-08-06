let carrito = JSON.parse(localStorage.getItem('cart_switch')) || [];

document.addEventListener('DOMContentLoaded', () => {
  cargarJuegos();
  actualizarContadorCarrito();

  document.getElementById('cart-btn').addEventListener('click', abrirModal);
  document.getElementById('close-cart').addEventListener('click', cerrarModal);
  document.getElementById('checkout-form').addEventListener('submit', procesarPago);
});

async function cargarJuegos() {
  try {
    const res = await fetch('/api/juegos');
    const juegos = await res.json();
    const grid = document.getElementById('games-grid');

    grid.innerHTML = juegos.map(juego => `
      <div class="card">
        <img src="${juego.imagen}" alt="${juego.titulo}">
        <div class="card-content">
          <div class="card-title">${juego.titulo}</div>
          <div class="card-price">$${juego.precio.toFixed(2)}</div>
          <button class="btn-primary" onclick="agregarAlCarrito(${juego.id}, '${juego.titulo}', ${juego.precio})">
            Añadir al Carrito
          </button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error("Error al cargar juegos:", err);
  }
}

function agregarAlCarrito(id, titulo, precio) {
  const existe = carrito.find(item => item.id === id);
  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ id, titulo, precio, cantidad: 1 });
  }
  guardarCarrito();
  actualizarContadorCarrito();
}

function guardarCarrito() {
  localStorage.setItem('cart_switch', JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
  const count = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById('cart-count').innerText = count;
}

function abrirModal() {
  renderizarCarrito();
  document.getElementById('cart-modal').classList.add('active');
}

function cerrarModal() {
  document.getElementById('cart-modal').classList.remove('active');
}

function renderizarCarrito() {
  const contenedor = document.getElementById('cart-items');
  const totalElem = document.getElementById('cart-total');

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p style="color: var(--text-muted);">El carrito está vacío.</p>';
    totalElem.innerText = '0.00';
    return;
  }

  let total = 0;
  contenedor.innerHTML = carrito.map(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    return `
      <div class="cart-item">
        <div>
          <strong>${item.titulo}</strong><br>
          <small>$${item.precio} x ${item.cantidad}</small>
        </div>
        <div>$${subtotal.toFixed(2)}</div>
      </div>
    `;
  }).join('');

  totalElem.innerText = total.toFixed(2);
}

async function procesarPago(e) {
  e.preventDefault();

  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;

  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, carrito })
    });

    const data = await res.json();

    if (data.exito) {
      alert(`${data.mensaje}\nCódigo de orden: ${data.detalles.codigoOrden}\nTotal procesado: $${data.detalles.total}`);
      carrito = [];
      guardarCarrito();
      actualizarContadorCarrito();
      cerrarModal();
      document.getElementById('checkout-form').reset();
    }
  } catch (err) {
    alert("Ocurrió un error al procesar el pedido.");
  }
}