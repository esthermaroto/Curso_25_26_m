// src/app.js
const arrayHandler = require('./arrayHandler');
const objectHandler = require('./objectHandler');
const mapHandler = require('./mapHandler');

const pruebas = [
  {
    tipo: 'array',
    handler: arrayHandler,
    usuario: 'ana',
    pass: 'clave123',
    nuevaPass: 'claveNueva'
  },
  {
    tipo: 'object',
    handler: objectHandler,
    usuario: 'bruno',
    pass: 'secreta456',
    nuevaPass: 'secretaNueva'
  },
  {
    tipo: 'map',
    handler: mapHandler,
    usuario: 'carla',
    pass: 'pass789',
    nuevaPass: 'passNueva'
  }
];

for (const prueba of pruebas) {
  const { tipo, handler, usuario, pass, nuevaPass } = prueba;

  console.log(`\n🔧 Probando estructura: ${tipo.toUpperCase()}`);

  // Registro
  console.log(`➡️ Registrando usuario '${usuario}'`);
  handler.registrarUsuario(usuario, pass, tipo);

  // Intento de duplicado
  console.log(`➡️ Intentando registrar duplicado '${usuario}'`);
  handler.registrarUsuario(usuario, pass, tipo);

  // Login correcto
  console.log(`➡️ Login correcto de '${usuario}'`);
  handler.loginUsuario(usuario, pass, tipo);

  // Login con contraseña incorrecta
  console.log(`➡️ Login con contraseña incorrecta`);
  handler.loginUsuario(usuario, 'incorrecta', tipo);

  // Login con usuario inexistente
  console.log(`➡️ Login con usuario inexistente`);
  handler.loginUsuario('noExiste', 'algo', tipo);

  // Cambio de contraseña correcto
  console.log(`➡️ Cambio de contraseña correcto`);
  handler.cambiarPassword(usuario, pass, nuevaPass, tipo);

  // Cambio con contraseña actual incorrecta
  console.log(`➡️ Cambio con contraseña actual incorrecta`);
  handler.cambiarPassword(usuario, 'malPass', 'otraPass', tipo);

  // Cambio de usuario inexistente
  console.log(`➡️ Cambio de usuario inexistente`);
  handler.cambiarPassword('fantasma', 'algo', 'nuevo', tipo);
}