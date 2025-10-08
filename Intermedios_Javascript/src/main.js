// EJERCICIO : Destructuring profundo
import { productos } from "../src/data/data";
import { extraerData, obtenerProductoConMasRam } from "../src/helpers/myFuctions";

/// ------------ INICIO DE LA APLICACIÓN ------------------

const newDataArray = (arrayProducts) => arrayProducts
    .map(product => extraerData(product))

console.log(newDataArray(productos));
console.log(obtenerProductoConMasRam(productos))