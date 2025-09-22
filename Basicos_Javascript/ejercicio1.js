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


//-----------inicializar la funcion----------------

//test de la funcion suma
console.log(suma(5, 3));
console.log(suma(5));
console.log(suma());

suma(5, 3);