/*
#Gestión bancaria revolut

Se pretende crear un pequeño sistema bancario en js
-[x] 1.crear cuentas con titular y saldo
-[x] 2.depositar dinero en una cuenta
-[x] 3.retirar dinero de una cuenta(cuando tenga saldo positivo)
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
    if (numeroCuentaGenerado.length != 24) {
        for (let i = 0; i < longitudIBAN; i++) {
            numeroCuenta += numeros.charAt(Math.floor(Math.random() * numeros.length));
        }
    return IBAN = letras + ibanDigControl + ibanEntidad + ibanOficina + ibanDC + numeroCuenta;
    } else {
        return numeroCuentaGenerado;
    }
}

//Crear cuenta
/**
 * Crea una cuenta bancaria con un titular y un saldo inicial de 0, generando un número de cuenta aleatorio
 * @param {string} titular - nombre del titular de la cuenta
 */
function crearCuenta(titular) {
    numeroCuentaGenerado = IBAN;
    const nuevaCuenta = {
        titular: titular,
        numeroCuenta: numeroCuentaGenerado,
        saldo: saldoInicial
    };
    cuentas.push(nuevaCuenta);
}

//Depositar dinero
/**
 * Añade una cantidad de dinero a una cuenta bancaria
 * @param {string} numeroCuenta - número de cuenta donde se va a depositar el dinero
 * @param {number} cantidad - cantidad de dinero a depositar
 */
function depositarDinero(numeroCuenta, cantidad) {
    cuenta = cuentas.find(cuenta => cuenta.numeroCuenta === numeroCuenta);
    if (cuenta) {
        if (cantidad > 0) {
        cuenta.saldo += cantidad;
        console.log(`Se han depositado ${cantidad} en la cuenta ${numeroCuenta}. Nuevo saldo: ${cuenta.saldo}`);
        } else {
            console.log("La cantidad a depositar debe ser mayor que 0");
        }
    } else {
        console.log("Cuenta no encontrada");
    }
}

//Retirar dinero
/**
 * Retira una cantidad de dinero de una cuenta bancaria, siempre que tenga saldo suficiente
 * @param {string} numeroCuenta - número de cuenta de la que se va a retirar el dinero
 * @param {number} cantidad - cantidad de dinero a retirar
 */
function retirarDinero(numeroCuenta, cantidad) {
    cuenta = cuentas.find(cuenta => cuenta.numeroCuenta === numeroCuenta);
    if (cuenta) {
        if (cantidad > 0 && cuenta.saldo >= cantidad) {
        cuenta.saldo -= cantidad;
        console.log(`Se han retirado ${cantidad} de la cuenta ${numeroCuenta}. Nuevo saldo: ${cuenta.saldo}`);
        } else {
            console.log("La cantidad a retirar debe ser mayor que 0 y menor o igual que el saldo disponible");
        }
    } else {
        console.log("Cuenta no encontrada");
    }
}














//-----------inicializar la funcion----------------
//test de la funcion generarNumeroCuenta
console.log(generarNumeroCuenta());
//test de la funcion crearCuenta
crearCuenta("Juan");
console.log(cuentas);
//test de la funcion depositarDinero
depositarDinero(cuentas[0].numeroCuenta, 100);
console.log(cuentas);
