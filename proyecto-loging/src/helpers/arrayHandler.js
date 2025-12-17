const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

let usuarios = JSON.parse(localStorage.getItem('usuarios_array')) || [];

function guardar() {
  localStorage.setItem('usuarios_array', JSON.stringify(usuarios));
}

function registrarUsuario(username, password, tipo) {
  if (usuarios.some(u => u.username === username)) {
    console.log(`❌ Error: El usuario '${username}' ya existe`);
    return;
  }
  const passwordHash = bcrypt.hashSync(password, 10);
  const nuevoUsuario = { id: uuidv4(), username, passwordHash };
  usuarios.push(nuevoUsuario);
  guardar();
  console.log(`✅ Usuario '${username}' registrado correctamente`);
}

function loginUsuario(username, password, tipo) {
  const usuario = usuarios.find(u => u.username === username);
  if (!usuario) {
    console.log(`❌ Usuario '${username}' no encontrado`);
    return;
  }
  if (!bcrypt.compareSync(password, usuario.passwordHash)) {
    console.log(`❌ Contraseña incorrecta`);
    return;
  }
  console.log(`✅ Bienvenido, ${username}`);
}

function cambiarPassword(username, passwordActual, passwordNueva, tipo) {
  const usuario = usuarios.find(u => u.username === username);
  if (!usuario) {
    console.log(`❌ Usuario '${username}' no encontrado`);
    return;
  }
  if (!bcrypt.compareSync(passwordActual, usuario.passwordHash)) {
    console.log(`❌ Contraseña actual incorrecta`);
    return;
  }
  usuario.passwordHash = bcrypt.hashSync(passwordNueva, 10);
  guardar();
  console.log(`✅ Contraseña cambiada exitosamente`);
}

module.exports = { registrarUsuario, loginUsuario, cambiarPassword };