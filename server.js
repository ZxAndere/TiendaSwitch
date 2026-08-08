require('dotenv').config();
const { Resend } = require('resend');
const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Asegurar directorio de datos
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
}

// --- CONFIGURACIÓN E INTEGRACIÓN DE PASARELAS (FLOW Y MERCADO PAGO CHILE) ---
const FLOW_API_KEY = '6D23C8FB-F6B1-49C0-BBF9-81A16271LED8';
const FLOW_SECRET_KEY = '7a2084f985ae7624c8b42bbf9e3bdd5ec9e2c963';
const FLOW_API_URL = 'https://www.flow.cl/api';

const MP_PUBLIC_KEY = 'APP_USR-9c7069d0-f429-41de-9bd0-d662e78f97ad';
const MP_ACCESS_TOKEN = 'APP_USR-1438717078182417-080719-1f0fd11d06606b6064b7bc44b59e5000-3600552626';

const ORDERS_STORE = new Map();

function getOrders() {
  return Array.from(ORDERS_STORE.values());
}

function saveOrders(ordersList) {
  if (Array.isArray(ordersList)) {
    ordersList.forEach(o => {
      if (o && o.codigoOrden) ORDERS_STORE.set(o.codigoOrden, o);
    });
  }
}

function signFlowParams(params) {
  const keys = Object.keys(params).sort();
  let toSign = '';
  keys.forEach(k => {
    toSign += k + params[k];
  });
  return crypto.createHmac('sha256', FLOW_SECRET_KEY).update(toSign).digest('hex');
}

// Helper de Hashing seguro para contraseñas
function hashPassword(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('hex');
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
const resend = new Resend(process.env.RESEND_API_KEY);
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

  // 1. Enviar usando Brevo API REST (si BREVO_API_KEY está presente en el servidor o Railway)
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
          sender: { name: "ZonaSwitchChile", email: process.env.BREVO_SENDER_EMAIL || "tiendaswitchchile@gmail.com" },
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
        console.warn('📌 Brevo API Error:', data);
      }
    } catch (err) {
      console.error('Error enviando con Brevo:', err);
    }
  }

  // 2. Intento por Resend (Fallback)
  try {
    const { data, error } = await resend.emails.send({
      from: 'ZonaSwitchChile <onboarding@resend.dev>',
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

// --- ENDPOINTS DE AUTENTICACIÓN Y REGISTRO CON VERIFICACIÓN ---

// Step 1: Solicitar registro y enviar código de 6 dígitos por correo
app.post('/api/auth/send-register-code', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || typeof username !== 'string' || username.trim().length < 3) {
    return res.status(400).json({ error: "El usuario debe tener al menos 3 caracteres." });
  }
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: "Por favor ingresa un correo electrónico válido." });
  }
  if (!password || password.length < 6 || !/\d/.test(password)) {
    return res.status(400).json({ error: "La contraseña debe tener mínimo 6 caracteres y al menos 1 número." });
  }

  const cleanUsername = username.trim();
  const cleanEmail = email.trim().toLowerCase();
  const users = getUsers();

  if (users.some(u => u.username.toLowerCase() === cleanUsername.toLowerCase())) {
    return res.status(400).json({ error: "Este nombre de usuario ya está registrado." });
  }
  if (users.some(u => u.email && u.email.toLowerCase() === cleanEmail)) {
    return res.status(400).json({ error: "Este correo electrónico ya está registrado." });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  OTP_STORE.set(`reg_${cleanEmail}`, {
    code,
    username: cleanUsername,
    email: cleanEmail,
    passwordHash: hashPassword(password),
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
app.post('/api/auth/verify-register-code', (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: "Datos incompletos." });

  const cleanEmail = email.trim().toLowerCase();
  const otpData = OTP_STORE.get(`reg_${cleanEmail}`);

  if (!otpData) {
    return res.status(400).json({ error: "Código no encontrado o expirado. Por favor solicita uno nuevo." });
  }
  if (Date.now() > otpData.expiresAt) {
    OTP_STORE.delete(`reg_${cleanEmail}`);
    return res.status(400).json({ error: "El código ha expirado. Por favor solicita uno nuevo." });
  }
  if (otpData.code !== code.trim()) {
    return res.status(400).json({ error: "El código de 6 dígitos es incorrecto." });
  }

  const users = getUsers();
  const newUser = {
    id: `USR-${Date.now()}`,
    username: otpData.username,
    email: otpData.email,
    passwordHash: otpData.passwordHash,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);
  OTP_STORE.delete(`reg_${cleanEmail}`);

  res.json({
    exito: true,
    mensaje: "¡Registro completado con éxito!",
    usuario: { id: newUser.id, username: newUser.username, email: newUser.email }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Por favor ingresa tu usuario y contraseña." });
  }

  const users = getUsers();
  const inputHash = hashPassword(password);
  const user = users.find(u =>
    (u.username.toLowerCase() === username.trim().toLowerCase() || (u.email && u.email.toLowerCase() === username.trim().toLowerCase())) &&
    (u.passwordHash === inputHash || u.password === password)
  );

  if (!user) {
    return res.status(401).json({ error: "Usuario/correo o contraseña incorrectos." });
  }

  res.json({
    exito: true,
    mensaje: `¡Bienvenido de nuevo, ${user.username}!`,
    usuario: { id: user.id, username: user.username, email: user.email }
  });
});

// --- OPCIONES DE CUENTA Y ÓRDENES DE USUARIOS ---

// Consultar compras del usuario logueado
app.get('/api/user/orders', (req, res) => {
  const username = req.query.user;
  if (!username) return res.status(400).json({ error: "Usuario no especificado." });

  const orders = getOrders();
  const userOrders = orders.filter(o =>
    (o.usuario && o.usuario.toLowerCase() === username.toLowerCase()) ||
    (o.email && o.email.toLowerCase() === username.toLowerCase())
  );

  res.json(userOrders);
});

// Cambiar nombre de usuario (Requiere contraseña actual)
app.post('/api/user/update-username', (req, res) => {
  const { userId, newUsername, currentPassword } = req.body;

  if (!userId || !newUsername || !currentPassword) {
    return res.status(400).json({ error: "Por favor completa todos los campos." });
  }

  const cleanUser = newUsername.trim();
  if (cleanUser.length < 3) {
    return res.status(400).json({ error: "El nuevo usuario debe tener al menos 3 caracteres." });
  }

  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId || u.username === userId);
  if (userIndex === -1) return res.status(404).json({ error: "Usuario no encontrado." });

  const user = users[userIndex];
  if (user.passwordHash !== hashPassword(currentPassword) && user.password !== currentPassword) {
    return res.status(400).json({ error: "La contraseña actual es incorrecta." });
  }

  const exists = users.some(u => u.id !== user.id && u.username.toLowerCase() === cleanUser.toLowerCase());
  if (exists) return res.status(400).json({ error: "Este nombre de usuario ya está tomado." });

  users[userIndex].username = cleanUser;
  saveUsers(users);

  res.json({ exito: true, mensaje: "Nombre de usuario actualizado con éxito.", usuario: { id: user.id, username: cleanUser, email: user.email } });
});

// Cambiar Correo (Paso 1: Enviar código al nuevo correo)
app.post('/api/user/send-email-code', async (req, res) => {
  const { userId, newEmail, currentPassword } = req.body;

  if (!userId || !newEmail || !currentPassword || !newEmail.includes('@')) {
    return res.status(400).json({ error: "Ingresa el nuevo correo y tu contraseña actual." });
  }

  const users = getUsers();
  const user = users.find(u => u.id === userId || u.username === userId);
  if (!user) return res.status(404).json({ error: "Usuario no encontrado." });

  if (user.passwordHash !== hashPassword(currentPassword) && user.password !== currentPassword) {
    return res.status(400).json({ error: "La contraseña actual es incorrecta." });
  }

  const cleanEmail = newEmail.trim().toLowerCase();
  if (users.some(u => u.id !== user.id && u.email && u.email.toLowerCase() === cleanEmail)) {
    return res.status(400).json({ error: "Este correo ya está registrado por otra cuenta." });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  OTP_STORE.set(`email_${userId}`, { newEmail: cleanEmail, code, expiresAt: Date.now() + 600000 });

  const sent = await sendVerificationEmail(cleanEmail, code, "Código para Cambiar Correo Electrónico");
  if (sent) {
    res.json({ exito: true, mensaje: `Código enviado a ${cleanEmail}.` });
  } else {
    res.status(500).json({ error: "No se pudo enviar el correo de verificación." });
  }
});

// Cambiar Correo (Paso 2: Verificar código y actualizar)
app.post('/api/user/confirm-email-update', (req, res) => {
  const { userId, code } = req.body;
  const otpData = OTP_STORE.get(`email_${userId}`);

  if (!otpData) return res.status(400).json({ error: "Código no encontrado o expirado." });
  if (otpData.code !== code.trim()) return res.status(400).json({ error: "Código de 6 dígitos incorrecto." });

  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId || u.username === userId);
  if (userIndex === -1) return res.status(404).json({ error: "Usuario no encontrado." });

  users[userIndex].email = otpData.newEmail;
  saveUsers(users);
  OTP_STORE.delete(`email_${userId}`);

  res.json({ exito: true, mensaje: "Correo actualizado correctamente.", usuario: { id: users[userIndex].id, username: users[userIndex].username, email: otpData.newEmail } });
});

// Cambiar Contraseña (Paso 1: Enviar código al correo actual del usuario)
app.post('/api/user/send-password-code', async (req, res) => {
  const { userId, newPassword } = req.body;

  if (!userId || !newPassword || newPassword.length < 6 || !/\d/.test(newPassword)) {
    return res.status(400).json({ error: "La nueva contraseña debe tener al menos 6 caracteres y 1 número." });
  }

  const users = getUsers();
  const user = users.find(u => u.id === userId || u.username === userId);
  if (!user || !user.email) return res.status(400).json({ error: "No se encontró un correo asociado a tu cuenta." });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  OTP_STORE.set(`pwd_${userId}`, { newPasswordHash: hashPassword(newPassword), code, expiresAt: Date.now() + 600000 });

  const sent = await sendVerificationEmail(user.email, code, "Código para Cambiar Contraseña");
  if (sent) {
    res.json({ exito: true, mensaje: `Código enviado a ${user.email}.` });
  } else {
    res.status(500).json({ error: "No se pudo enviar el correo de verificación." });
  }
});

// Cambiar Contraseña (Paso 2: Verificar código y actualizar)
app.post('/api/user/confirm-password-update', (req, res) => {
  const { userId, code } = req.body;
  const otpData = OTP_STORE.get(`pwd_${userId}`);

  if (!otpData) return res.status(400).json({ error: "Código no encontrado o expirado." });
  if (otpData.code !== code.trim()) return res.status(400).json({ error: "Código de 6 dígitos incorrecto." });

  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId || u.username === userId);
  if (userIndex === -1) return res.status(404).json({ error: "Usuario no encontrado." });

  users[userIndex].passwordHash = otpData.newPasswordHash;
  saveUsers(users);
  OTP_STORE.delete(`pwd_${userId}`);

  res.json({ exito: true, mensaje: "Contraseña actualizada correctamente." });
});

app.get('/api/juegos', (req, res) => {
  res.json(JUEGOS);
});

app.post('/api/checkout', async (req, res) => {
  const { nombre, apellido, email, carrito, username, metodoPago } = req.body;

  if (!nombre || !apellido || !email || !carrito || carrito.length === 0) {
    return res.status(400).json({ error: "Datos incompletos para procesar la orden." });
  }

  const cleanEmail = email.trim();
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const codigoOrden = `ZSC-${Math.floor(100000 + Math.random() * 900000)}`;

  const orderData = {
    codigoOrden,
    cliente: `${nombre.trim()} ${apellido.trim()}`,
    usuario: username || 'Invitado',
    email: cleanEmail,
    carrito,
    articulos: carrito.reduce((acc, item) => acc + item.cantidad, 0),
    total,
    totalFormatted: `$${total.toLocaleString('es-CL')} CLP`,
    fecha: new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    estado: 'pendiente',
    metodoPago: metodoPago || 'flow'
  };

  // Guardar orden localmente
  const orders = getOrders();
  orders.push(orderData);
  saveOrders(orders);

  // Determinar protocolo y host para retorno de pasarelas
  const host = req.get('host') || `localhost:${PORT}`;
  const isLocal = host.includes('localhost') || host.includes('127.0.0.1');
  const baseUrl = isLocal
    ? `http://${host}`
    : 'https://tiendaswitch-production-3bd0.up.railway.app';

  // Si el cliente eligió Mercado Pago
  if (metodoPago === 'mercadopago') {
    try {
      const mpBody = {
        items: carrito.map(item => ({
          title: `${item.titulo}`,
          quantity: item.cantidad,
          currency_id: 'CLP',
          unit_price: item.precio
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
        saveOrders(orders);

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

  const flowParams = {
    apiKey: FLOW_API_KEY,
    commerceOrder: codigoOrden,
    subject: `Compra ZonaSwitchChile (${orderData.articulos} ${labelJuegos})`,
    currency: 'CLP',
    amount: total,
    email: cleanEmail,
    urlConfirmation: `${baseUrl}/api/flow/confirm`,
    urlReturn: `${baseUrl}/api/flow/return`
  };

  flowParams.s = signFlowParams(flowParams);

  try {
    const flowRes = await fetch(`${FLOW_API_URL}/payment/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(flowParams).toString()
    });

    const flowData = await flowRes.json();

    if (flowData && flowData.url && flowData.token) {
      orderData.flowOrder = flowData.flowOrder;
      orderData.token = flowData.token;
      saveOrders(orders);

      return res.json({
        exito: true,
        redirectUrl: `${flowData.url}?token=${flowData.token}`,
        codigoOrden,
        detalles: orderData
      });
    } else {
      console.error('Error al crear pago en Flow:', flowData);
      return res.status(400).json({
        error: flowData.message ? `Flow Error: ${flowData.message}` : "No se pudo iniciar la transacción con Flow."
      });
    }
  } catch (err) {
    console.error('Error de conexión con Flow:', err);
    return res.status(500).json({ error: "Error de comunicación con la pasarela de pago Flow." });
  }
});

// Retorno del usuario desde la pasarela Flow (Webpay, etc.)
app.all('/api/flow/return', async (req, res) => {
  const token = req.query.token || req.body?.token;
  if (!token) {
    return res.redirect('/');
  }

  try {
    const params = { apiKey: FLOW_API_KEY, token };
    params.s = signFlowParams(params);

    const flowRes = await fetch(`${FLOW_API_URL}/payment/getStatus?${new URLSearchParams(params).toString()}`);
    const statusData = await flowRes.json();

    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.token === token || o.codigoOrden === statusData.commerceOrder);

    let orderCode = statusData.commerceOrder || '';
    let status = statusData.status; // 2 = Pagada, 3 = Rechazada, 4 = Anulada, 1 = Pendiente

    if (orderIndex !== -1) {
      orders[orderIndex].flowStatus = status;
      orders[orderIndex].estado = status === 2 ? 'pagada' : (status === 3 ? 'rechazada' : 'cancelada');
      saveOrders(orders);
      orderCode = orders[orderIndex].codigoOrden;
    }

    res.redirect(`/?flow_order=${orderCode}&status=${status}`);
  } catch (err) {
    console.error('Error en callback de retorno Flow:', err);
    res.redirect('/');
  }
});

// Confirmación asíncrona de Flow (Webhook servidor a servidor)
app.post('/api/flow/confirm', async (req, res) => {
  const token = req.body?.token;
  if (!token) return res.status(400).send('Token no proporcionado.');

  try {
    const params = { apiKey: FLOW_API_KEY, token };
    params.s = signFlowParams(params);

    const flowRes = await fetch(`${FLOW_API_URL}/payment/getStatus?${new URLSearchParams(params).toString()}`);
    const statusData = await flowRes.json();

    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.token === token || o.codigoOrden === statusData.commerceOrder);

    if (orderIndex !== -1) {
      orders[orderIndex].flowStatus = statusData.status;
      orders[orderIndex].estado = statusData.status === 2 ? 'pagada' : 'rechazada';
      saveOrders(orders);
    }

    res.send('OK');
  } catch (err) {
    res.status(500).send('Error');
  }
});

// Retorno del usuario desde la pasarela Mercado Pago
app.all('/api/mp/return', async (req, res) => {
  const externalRef = req.query.external_reference || req.query.preference_id;
  const status = req.query.status || req.query.collection_status || 'approved';

  if (externalRef) {
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.codigoOrden === externalRef || o.mpPreferenceId === externalRef);
    if (orderIndex !== -1) {
      orders[orderIndex].mpStatus = status;
      orders[orderIndex].estado = (status === 'approved' || status === '2') ? 'pagada' : 'rechazada';
      saveOrders(orders);
    }
  }

  res.redirect(`/?mp_order=${externalRef}&status=${status}`);
});

app.post('/api/mp/confirm', (req, res) => {
  res.send('OK');
});

// Consultar orden por código
app.get('/api/orders/:code', (req, res) => {
  const orders = getOrders();
  const order = orders.find(o => o.codigoOrden === req.params.code);
  if (!order) return res.status(404).json({ error: "Orden no encontrada." });
  res.json(order);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ZonaSwitchChile activo en http://localhost:${PORT}`);
});
