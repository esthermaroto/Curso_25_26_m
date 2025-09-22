/*
#Gestión bancaria revolut

Se pretende crear un pequeño sistema bancario en js
-[x] 1.crear cuentas con titular y saldo
-[x] 2.depositar dinero en una cuenta
-[x] 3.retirar dinero de una cuenta(cuando tenga saldo positivo)
-[x] 4.consultar el saldo de una cuenta
-[x] 5.transferir dinero de una cuenta a otra(validando que la cuenta origen tenga saldo positivo)
-[x] 6.mantener un listado de cuentas y buscar una cuenta por su titular

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
    numeroCuenta = "";
        for (let i = 0; i < 10; i++) {
            numeroCuenta += Math.floor(Math.random() * 10);
   
}
 return  letras + ibanDigControl + ibanEntidad + ibanOficina + ibanDC + numeroCuenta;
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

//Consultar saldo
/**
 * Devuelve el saldo actual de una cuenta bancaria
 * @param {string} numeroCuenta - número de cuenta de la que se quiere consultar el saldo
 */
function consultarSaldo(numeroCuenta) {
    cuenta = cuentas.find(cuenta => cuenta.numeroCuenta === numeroCuenta);
    if (cuenta) {
        console.log(`El saldo de la cuenta ${numeroCuenta} es: ${cuenta.saldo}`);
    } else {
        console.log("Cuenta no encontrada");
    }
}

//Transferir dinero
/**
 * Transfiere una cantidad de dinero de una cuenta bancaria a otra, siempre que la cuenta origen tenga saldo suficiente
 * @param {string} numeroCuentaOrigen - número de cuenta desde la que se va a transferir el dinero
 * @param {string} numeroCuentaDestino - número de cuenta a la que se va a transferir el dinero
 * @param {number} cantidad - cantidad de dinero a transferir
 */
function transferirDinero(numeroCuentaOrigen, numeroCuentaDestino, cantidad) {
    cuentaOrigen = cuentas.find(cuenta => cuenta.numeroCuenta === numeroCuentaOrigen);
    cuentaDestino = cuentas.find(cuenta => cuenta.numeroCuenta === numeroCuentaDestino);
    if (cuentaOrigen && cuentaDestino) {
        if (cantidad > 0 && cuentaOrigen.saldo >= cantidad) {
            cuentaOrigen.saldo -= cantidad;
            cuentaDestino.saldo += cantidad;
            console.log(`Se han transferido ${cantidad} de la cuenta ${numeroCuentaOrigen} a la cuenta ${numeroCuentaDestino}. \nNuevo saldo de la cuenta ${numeroCuentaOrigen}: ${cuentaOrigen.saldo}. \nNuevo saldo de la cuenta ${numeroCuentaDestino}: ${cuentaDestino.saldo}`);
        } else {
            console.log("La cantidad a transferir debe ser mayor que 0 y menor o igual que el saldo disponible en la cuenta origen");
        }
    } else {
        console.log("Cuenta no encontrada");
    }
}

//Buscar cuenta por titular
/**
 * Busca una cuenta bancaria por el nombre del titular
 * @param {string} titular - nombre del titular de la cuenta a buscar
 */
function buscarCuentaPorTitular(titular) {
    const cuenta = cuentas.find(cuenta => cuenta.titular === titular);
    if (cuenta) {
        return cuenta;
    } else {
        console.log("Cuenta no encontrada");
        return null;
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
//test de la funcion retirarDinero
retirarDinero(cuentas[0].numeroCuenta, 50);
console.log(cuentas);
//test de la funcion consultarSaldo
consultarSaldo(cuentas[0].numeroCuenta);
//test de la funcion transferirDinero
crearCuenta("Maria");
console.log(cuentas);
depositarDinero(cuentas[1].numeroCuenta, 200);
console.log(cuentas);
transferirDinero(cuentas[0].numeroCuenta, cuentas[1].numeroCuenta, 30);
console.log(cuentas);
//test de la funcion buscarCuentaPorTitular
console.log(buscarCuentaPorTitular("Juan"));
console.log(buscarCuentaPorTitular("Maria"));

