const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Simulación de localStorage en Node.js
let usuariosObject = JSON.parse(localStorage.getItem('usuarios_object')) || {};

function guardar() {
  localStorage.setItem('usuarios_object', JSON.stringify(usuariosObject));
}

function registrarUsuario(username, password, tipo) {
  if (usuariosObject[username]) {
    console.log(`❌ Error: El usuario '${username}' ya existe`);
    return;
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const nuevoUsuario = {
    id: uuidv4(),
    username,
    passwordHash
  };

  usuariosObject[username] = nuevoUsuario;
  guardar();
  console.log(`✅ Usuario '${username}' registrado correctamente`);
}

function loginUsuario(username, password, tipo) {
  const usuario = usuariosObject[username];
  if (!usuario) {
    console.log(`❌ Usuario '${username}' no encontrado`);
    return;
  }

  const esCorrecta = bcrypt.compareSync(password, usuario.passwordHash);
  if (!esCorrecta) {
    console.log(`❌ Contraseña incorrecta`);
    return;
  }

  console.log(`✅ Bienvenido, ${username}`);
}

function cambiarPassword(username, passwordActual, passwordNueva, tipo) {
  const usuario = usuariosObject[username];
  if (!usuario) {
    console.log(`❌ Usuario '${username}' no encontrado`);
    return;
  }

  const esCorrecta = bcrypt.compareSync(passwordActual, usuario.passwordHash);
  if (!esCorrecta) {
    console.log(`❌ Contraseña actual incorrecta`);
    return;
  }

  usuario.passwordHash = bcrypt.hashSync(passwordNueva, 10);
  guardar();
  console.log(`✅ Contraseña cambiada exitosamente`);
}

module.exports = {
  registrarUsuario,
  loginUsuario,
  cambiarPassword
};