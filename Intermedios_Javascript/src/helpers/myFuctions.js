/**
 * 
 * @param {Object} products -Objeto Data
 * @returns {Object} Object Products -Objeto con información extraida
 */
export const extraerData = (products)=>{
    
    const {
        nombre,
        fabricante:{ nombre:nombreFabricante, contacto },
        especificaciones:{ ram },
    }= products;

    return{
        nombre,
        nombreFabricante,
        contacto,
        ram,
    };
};

//OBTENER el nombre del producto con más ram
export const obtenerProductoConMasRam = (arrayProducts) => {
    arrayProducts.map(extraerData(product)
        .reduce((max, actual)=>{
            ram.splice()
        },0));

}