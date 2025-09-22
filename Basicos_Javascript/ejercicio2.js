/*
Crear un juego de un dado que utilizando una funcion llamda tirar dado permita tirar un dado y devuelva un valor del 1 al 6.
Además crear una función llamada simular que le pase como parámetro el número de tiradas y me diga que número se ha repetido más veces.
*/
//-----------declarar las variables----------------


//-----------declarar la funcion----------------

//Tirada de dado
/**
 * Devuelve un numero aleatorio entre 1 y 6, simulando la tirada de un dado
 * @returns {number} - un numero aleatorio entre 1 y 6
 */
function tirarDado() {
    return Math.floor(Math.random() * 7);
}

//Simulación de tirada de dado
/**
 * Simula un número de tiradas de un dado y devuelve el número que más se ha repetido
 * @param {number} numTiradas - número de tiradas a simular
 * @returns - el numero que más se ha repetido en las tiradas
 */
function simular(numTiradas) {
    let resultados = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < numTiradas; i++) {
        let resultado = tirarDado();
        let tirada = resultado;
        resultados[tirada - 1]++;
    }
    return resultados.indexOf(Math.max(...resultados)) + 1;
} 


//-----------inicializar la funcion----------------
//test de la funcion tirarDado
console.log(tirarDado());
//test de la funcion simular
console.log(simular(7));