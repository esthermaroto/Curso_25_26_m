//console.log("Hola Mundo");
//-----------declarar las variables----------------


//-----------declarar la funcion----------------

/*
Descripcion: Funcion que suma dos numeros
Parametros:
    -a: numero 1
    -b: numero 2
Retorno: la suma de a y b
*/
/**
 * Suma dos numeros y devuelve el resultado
 * @param {number} [a=0] - primer numero a sumar con valor por defecto 0
 * @param {number} [b=0] - segundo numero a sumar con valor por defecto 0
 * @returns {number} - la suma de a y b
 */

function suma(a=0, b=0) {
    return a + b;    
}

function saludar(nombreUsuario){
    //return `Bienvenid@ ${nombreUsuario}`
    let mensaje = nombreUsuario ?? "Usuario";
    return `Bienvenid@ ${nombreUsuario ?? "Usuario"}`;
}

   



//-----------inicializar la funcion----------------

//test de la funcion suma
/*
console.log(suma(5, 3));
console.log(suma(5));
console.log(suma());

console.log(`La suma de 5+3 es ${suma(5, 3)}`);

let edad = 18;
//condición ? se realiza si es true : se realiza si es false;
edad=>18? alert("Eres mayor de edad"): alert("Eres menor de edad");

//arrow function
// const aprobados = (nota=0) => {
//     return nota>=5 ? "Aprobado" : "Suspenso";
// }

const aprobados = (nota=0) => nota>=5 ? "Aprobado" : "Suspenso";
*/

//función aprobados con parámetro un number y me diga si estoy aprobado o no. Crear una versión 2.0 que si le paso un nº >= 9 me diga sb, si está entre 5-9 diga aprobado y si 4-0 suspenso
let nombre = "Esther";
console.log(saludar(nombre));

const aprobados = (nota=0) => nota>=5 ? "Aprobado" : "Suspenso";
const aprobadosV2 = (nota=0) => (nota>=9) ? "Sobresaliente" : (nota>=5) ? "Aprobado" : "Suspenso";

console.log(aprobados(5));
console.log(aprobadosV2(5));
console.log(aprobadosV2(10));
console.log(aprobadosV2(2));
