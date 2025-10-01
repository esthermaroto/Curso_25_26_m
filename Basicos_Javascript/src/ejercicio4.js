/*//Uso de los arrays

//declaración:

const edades = [];
const frutas = ["manzana", "pera", "naranja"];

// usando el constructor Array

const cp = new Array();
const cc = new Array("mskfncsjnf","kncfksnfs","cjsjfsjf");

// Añadir:

edades.push(10); // añadiendo al final
edades.unshift(100); // añadiendo al principio


// Eliminar:

edades.pop(); // elimina al final y devuelve lo eliminado 
edades.shift(); // elimina al principio y devuelve lo eliminado

// ***** slice extraer partes de un array *****

edades.slice(); // devuelve una copia de un trozo concreto del array

//******* map **********
edades.map( (edad)=> edad*2 );

// ************ filter ***********
edades.filter( (edad, i)=> {
    console.log(i);
    return edad>=18;
} );
*/

/*
# TAREA

-Crear una función llamada "mayúsculas" que ponga en mayúsculas todos los elementos de ese array que paso como parámetro
-Crear una función llamada "precios con iva" que al pasar un array de precios me los devuelva con el iva 21 incluido 
-Crear una función llamada "impares cuadrado" que le pase una array de números y me devuelva un array solo con los impares elevados al cuadrado
-Crear una función llamada "normalizar email" que le pase un array de emails que puede llevar espacios al principio o al final y que los devuelva sin espacios
-Crear una función llamada "filtrar longitud" que le pase como parametro nombres y un tamaño y devuelva solo un array con los nombres que sean >= que el parámetro de tamaño 
-Crear una función llamada "normalizar nombres propios" que le pase unn array de nombres y me los devuelva con la letra capital mayúscula (nombre y apellidos)

*/

// ...existing code...

// 1.
const nombres = ["esther", "pepe", "ana", "lucas"];
/**
 * Pone en mayúsculas todos los elementos de un array de nombres
 * @param {array} nombres -Array de nombres en miníscula
 * @returns - Un array con todos los elementos en mayúscula 
 */
function mayusculas(nombres) {
    return nombres
    .map(nombre => nombre.toUpperCase());
}

// 2.
const precios = [100, 200, 300, 400];
/**
 * Convierte los elementos del array a su valor más el iva del 21%
 * @param {array} precios -Array de precios 
 * @returns -Un array con todos los elementos más el 21%
 */
function preciosConIva(precios) {
    return precios
    .map(precio => +(precio * 1.21)
    .toFixed(2));
}

// 3.
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
/**
 * Convierte los números impares de un array a su cuadrado
 * @param {array} numeros - Array de números
 * @returns -Un array con los números impares al cuadrado
 */
function imparesCuadrado(numeros) {
    return numeros
    .filter(n => n % 2 !== 0)
    .map(n => n * n);
}

// 4. 
const emails = [' esther.maroto@gmail.com'];
/**
 * Normaliza emails (quitar espacios al principio y final)
 * @param {array} emails -Array de emails
 * @returns -Cada elemento normalizado dentro del array
 */
function normalizarEmail(emails) {
    return emails
    .map(email => email.trim());
}

// 5. 
/**
 * Filtra por longitud mínima
 * @param {array} names -Array de nombres
 * @param {number} size -Tamaño para filtrar
 * @returns -Un array con los nombres de determinado tamaño
 */
function filtrarLongitud(names, size) {
    return names.filter(name => name.length >= size);
}

// 6. 
const nombresM = ["eSthEr", "PepE JoSe", "Ana", "lucAs"];
/**
 * Normaliza nombres propios (primera letra de cada palabra en mayúscula)
 * @param {array} namesM 
 * @returns -Un array de nombres con letra capital en mayúscula
 */
function normalizarNombresPropios(namesM) {
    return namesM.map(name =>
        name
            .trim()
            .split(' ')
            .filter((word)=> word.trim()!=="")
            //.filter((word)=> word !=="")
            .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
    );
}

