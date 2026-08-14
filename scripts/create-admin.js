const readline = require('readline');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Cargar variables de entorno
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const DATA_DIR = path.join(__dirname, '..', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const userSchema = new mongoose.Schema({
  id: String,
  username: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: String,
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

async function main() {
  if (!MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI no está definido en las variables de entorno (.env).');
    process.exit(1);
  }

  console.log('--- Creador de Administrador ZonaSwitchChile ---');
  
  rl.question('Nombre de usuario (admin): ', (username) => {
    username = username.trim().replace(/[\u200B-\u200D\uFEFF]/g, '');
    if (!username || !/^[a-zA-Z0-9_]+$/.test(username)) {
      console.error('❌ Error: Nombre de usuario inválido. Solo se permiten letras, números y guiones bajos.');
      rl.close();
      process.exit(1);
    }

    rl.question('Correo electrónico: ', (email) => {
      email = email.trim().toLowerCase();
      if (!email || !email.includes('@')) {
        console.error('❌ Error: Correo electrónico inválido.');
        rl.close();
        process.exit(1);
      }

      rl.question('Contraseña segura: ', async (password) => {
        password = password.trim();
        if (password.length < 6) {
          console.error('❌ Error: La contraseña debe tener al menos 6 caracteres.');
          rl.close();
          process.exit(1);
        }

        console.log('\n🍃 Conectando a MongoDB Atlas...');
        try {
          await mongoose.connect(MONGODB_URI);
          console.log('✅ Conectado exitosamente.');

          // Verificar si el usuario ya existe
          const existingUser = await UserModel.findOne({
            $or: [
              { username: { $regex: new RegExp(`^${username}$`, 'i') } },
              { email: { $regex: new RegExp(`^${email}$`, 'i') } }
            ]
          });

          if (existingUser) {
            console.error('❌ Error: El usuario o correo electrónico ya están registrados.');
            await mongoose.disconnect();
            rl.close();
            process.exit(1);
          }

          // Cifrar contraseña con bcrypt
          const passwordHash = await bcrypt.hash(password, 10);
          const userId = Date.now().toString();

          const adminUser = new UserModel({
            id: userId,
            username,
            email,
            passwordHash,
            role: 'admin'
          });

          await adminUser.save();
          console.log(`\n🎉 ¡Administrador "${username}" guardado en MongoDB Atlas con éxito!`);

          // Sincronizar localmente en users.json
          let localUsers = [];
          if (fs.existsSync(USERS_FILE)) {
            try {
              localUsers = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
            } catch (e) {
              localUsers = [];
            }
          }

          localUsers.push({
            id: userId,
            username,
            email,
            passwordHash,
            role: 'admin'
          });

          fs.writeFileSync(USERS_FILE, JSON.stringify(localUsers, null, 2));
          console.log('📥 Sincronizado localmente en data/users.json.');

          await mongoose.disconnect();
          console.log('🍃 Desconectado de MongoDB. Proceso terminado.');
        } catch (err) {
          console.error('❌ Error en el proceso:', err.message);
        } finally {
          rl.close();
        }
      });
    });
  });
}

main();
