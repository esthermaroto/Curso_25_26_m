/*
#Gestión bancaria revolut

Se pretende crear un pequeño sistema bancario en js
-[x] 1.crear cuentas con titular y saldo
-[] 2.depositar dinero en una cuenta
-[] 3.retirar dinero de una cuentaI(cuando tenga saldo positivo)
-[] 4.consultar el saldo de una cuenta
-[] 5.transferir dinero de una cuenta a otra(validando que la cuenta origen tenga saldo positivo)
-[] 6.mantener un listado de cuentas y buscar una cuenta por su titular

-[x] Cuando creemos una cuenta se debe de generar un número de cuenta aleatorio de longitud de un IBAN
-[] Crear una función para los test de las funciones
*/

//-----------declarar las variables----------------

const cuentas = [];
const letras = "ES";
const ibanDigControl = "07";
const ibanEntidad = "2100";
const ibanOficina = "0418";
const ibanDC = "45";
const numeros = "0123456789";
const longitudIBAN = 10;
const saldoInicial = 0;
let numeroCuentaGenerado = "";
let titularCuenta = "";
let numeroCuenta = "";
let saldoCuenta = 0;
let cantidad = 0;
let cuentaOrigen = null;
let cuentaDestino = null;

//-----------declarar la funcion----------------

//Generar número de cuenta aleatorio
/**
 * Genera un número de cuenta aleatorio de longitud 24 caracteres (IBAN)
 * @returns {string} - número de cuenta aleatorio con los campos del IBAN prestablecidos
 */
function generarNumeroCuenta() {
    for (let i = 0; i < longitudIBAN; i++) {
        numeroCuenta += numeros.charAt(Math.floor(Math.random() * numeros.length));
    }
    return letras + ibanDigControl + ibanEntidad + ibanOficina + ibanDC + numeroCuenta;
}

//Crear cuenta
/**
 * Crea una cuenta bancaria con un titular y un saldo inicial de 0, generando un número de cuenta aleatorio
 * @param {string} titular - nombre del titular de la cuenta
 */
function crearCuenta(titular) {
    numeroCuentaGenerado = generarNumeroCuenta();
    const nuevaCuenta = {
        titular: titular,
        numeroCuenta: numeroCuentaGenerado,
        saldo: saldoInicial
    };
    cuentas.push(nuevaCuenta);
}








//-----------inicializar la funcion----------------
//test de la funcion generarNumeroCuenta
console.log(generarNumeroCuenta());
//test de la funcion crearCuenta
crearCuenta("Juan");
console.log(cuentas);