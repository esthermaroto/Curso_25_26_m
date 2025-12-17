const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Simulación de localStorage en Node.js
let usuariosMap = new Map(JSON.parse(localStorage.getItem('usuarios_map')) || []);

function guardar() {
  localStorage.setItem('usuarios_map', JSON.stringify(Array.from(usuariosMap)));
}

function registrarUsuario(username, password, tipo) {
  if (usuariosMap.has(username)) {
    console.log(`❌ Error: El usuario '${username}' ya existe`);
    return;
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const nuevoUsuario = {
    id: uuidv4(),
    username,
    passwordHash
  };

  usuariosMap.set(username, nuevoUsuario);
  guardar();
  console.log(`✅ Usuario '${username}' registrado correctamente`);
}

function loginUsuario(username, password, tipo) {
  if (!usuariosMap.has(username)) {
    console.log(`❌ Usuario '${username}' no encontrado`);
    return;
  }

  const usuario = usuariosMap.get(username);
  const esCorrecta = bcrypt.compareSync(password, usuario.passwordHash);

  if (!esCorrecta) {
    console.log(`❌ Contraseña incorrecta`);
    return;
  }

  console.log(`✅ Bienvenido, ${username}`);
}

function cambiarPassword(username, passwordActual, passwordNueva, tipo) {
  if (!usuariosMap.has(username)) {
    console.log(`❌ Usuario '${username}' no encontrado`);
    return;
  }

  const usuario = usuariosMap.get(username);
  const esCorrecta = bcrypt.compareSync(passwordActual, usuario.passwordHash);

  if (!esCorrecta) {
    console.log(`❌ Contraseña actual incorrecta`);
    return;
  }

  usuario.passwordHash = bcrypt.hashSync(passwordNueva, 10);
  usuariosMap.set(username, usuario);
  guardar();
  console.log(`✅ Contraseña cambiada exitosamente`);
}

module.exports = {
  registrarUsuario,
  loginUsuario,
  cambiarPassword
};