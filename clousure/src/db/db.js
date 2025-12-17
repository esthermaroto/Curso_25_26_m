import sqlite3 from "sqlite3";

// Activas verbose
const sqlite = sqlite3.verbose();

// Ahora sí puedes crear la base de datos
const db = new sqlite.Database("./carrito.db", (err) => {
    if (err) {
        console.error("Error al abrir la DB:", err.message);
    } else {
        console.log("Base de datos abierta correctamente.");
    }
});

// Crear tabla
db.run(`
    CREATE TABLE IF NOT EXISTS carrito (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        precio REAL,
        cantidad INTEGER
    )
`, (err) => {
    if (err) console.error("Error creando tabla:", err.message);
    else console.log("Tabla creada correctamente.");
});

// Cerrar DB
db.close((err) => {
    if (err) console.error(err.message);
    else console.log("Base de datos cerrada.");
});
