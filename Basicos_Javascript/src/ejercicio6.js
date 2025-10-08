const numeros = [1,2,3,4,5];
/*
//generar un objeto resumen de mi array que tenga los siguientes campos

{
    valor: numero_correspondiente
    posicion: posición_dentro_del_array
    esUltimo: array_que_me_diga_si_es_el_último (true|false)
}
*/
const resumenNumeros = numeros.map((numero, indice, miArray)=>{
    return{
        valor: numero,
        posicion: indice,
        esUltimo: indice === miArray.length - 1
    }
});

console.log(resumenNumeros); //array de objetos mapeados a una estructura dada.


const products =[
    {name:"laptop", price: 1000, stock:5, active:true},
    {name: "mouse logitech", price: 28.56, stock:0, active:false}
]
/*
Mapeado:

nombre
precioOriginal
precioConIva
hayStock
*/

const productsWithVat = products.map((product)=>{
    return{
        name: product.name,
        originalPrice: product.price,
        priceWithVat: product.price * 1.21,
        aviable: product.stock > 0,
    }
})

/*
filtrame los productos que tienen stock y están activos 
*/

const productsStockActive = products.filter((product)=> {
    return product.stock > 0 && product.activefilter;
})

//busca todos los datos de laptop de tipo case sensitive

const findProducts = products
    .filter((product)=> product.name.toLowerCase().includes("laptop"))
    .map((product) => {
        return{
            name: product.name,
            price: product.price,
            stock: product.stock,
            active: product.active
        }
    })

//una función que busque la información de un producto por el nombre
/**
 * Busca los productos con el nombre introducido para buscar 
 * @param {array} products 
 * @param {string} wordToFind 
 * @returns array de productos que contengan el parámetro a buscar
 */
const searchProduct = (products, wordToFind) => products
    .filter((product)=> product.name.toLowerCase()
        .includes(wordToFind.toLowerCase())
    )


//crear una función que le pase como parámetro un array de productos, precio_inicial, precio_final 
//y devuelva productos cuyo precio está en ese rango de valor (sin incluirlos)
/**
 * Busca productos del array que tengan su precio entre el rango introducido 
 * @param {array} products 
 * @param {number} inicialPrice 
 * @param {number} endPrice 
 * @returns array de productos cuyo precio se encuentra en el rango introducido
 */
const filterPrice = (products, inicialPrice, endPrice) => products
    .filter((product)=> product.price > inicialPrice && product.price < endPrice)

    //typeof inicialPrice === "number" ? typeof endPrice === "number"
    //modificar el find products para que además me muestre solo los que están activados

//función que le pase un carrito de la compra y devuelva el precio a pagar 
const carrito = [
    {name: "laptop", price: 1000, count:5, category: "Electronica"},
    {name: "mouse logitech", price: 28.56, count:1, category: "Electronica"},
    {name: "monitor msi 24", price: 210.6, count:10, category: "Electronica"},
    {name: "teclado mecánico", price: 150, count:2, category: "Electronica"},
    {name: "Polo Scalper", price: 150, count:2, category: "Ropa"},
    {name: "Pantalón Stradivarius", price: 45, count:5, category: "Ropa"},
]
/**
 * @author Esther Maroto Torres
 * @param {Object[]} cart -Carrito de objetos
 * @param {Number} vat -IVA
 * @return {Number} -Total del carrito IVA incluido
 */
const totalCart = (cart = [], vat = 1.21) => cart
    .reduce((total, product)=>
        //return total+product.price*vat;
        product.count>5 
        ? (total+product.price*vat)*(1-0,5) 
        : total+product.price*vat 
    ,0)

//Atgrupar el carrito por categorías
/*
{
Electrónica:[
    {
    },
    {
    },
],
Ropa:[
    {
    },
    {
    },
]
}
*/

const groupedCart = (cart = [])=> cart
    .reduce((groups, product)=> {
        const categoryFilter = product.category;
        if(!groups[categoryFilter]){
            groups[categoryFilter] = [];
        }
        groups[categoryFilter].push(product);
        return groups;
    },{});

//función que cuente los votos de cada usuario 
// {Ana: 2, Carlos: 3, Beatriz: 1}

const votes = [ "Ana", "Carlos", "Ana", "Beatriz", "Carlos", "Ana"]

const countVotes = (votes = []) => {
    return votes.reduce((total, vote)=>{
        total[vote] = (total[vote] || 0) + 1;
        return total;
    },{});
}


const users = [
    {id: 1, name: "Ana", rol: "admin"},
    {id: 2, name: "Carlos", rol: "user"},
    {id: 3, name: "Beatriz", rol: "admin"},
]

//función (arrayUsers, idBusqueda)---> devuelve el rol que tiene 
//buscar el usuario cuyo id = 2 y obtener el rol que tiene 

const userSearch = (users = [], id = 1) => {
   return users.find(user => Number(user.id) === Number(id)) ?? user.rol;

}

//buscar el indice del array donde se encuentra al usuario con id buscanto
const findUserIndex = (users = [], id = 1) => {
    return users.findIndex(user => Number(user.id) === Number(id));
}

//devuelve -1 si fininfrx devuelve errot o no encurtra la avciòn requerida
const numerosPares = [4,5,6,7,8];
const hayPares = numerosPares.some(numero => numero % 2 === 0); //devuelve true o false si hay algún número par 


//---------------------------------------------------03/10/2025-------------------------------------------------------
const usuario ={
    name: "Esther",
    email: "emartor@g.educaand.es",
    active: true,
}


//para las claves
const claves = Object.keys(usuario);

//Utilidad verificar si las claves están todas siguiendo un objeto de partidda 

//1.-¿como compruebo que todas las claves existen?
function validarCamposRequeridos (objeto,camposRequeridos){
    const clavesObjeto = Object.keys(objeto);
    //retorno verdadero o falso 
    return camposRequeridos.every(campo => clavesObjeto.includes(campo));
}


//data:
const datosFormulario = {name: "Carla", active: false};

const esValido = validarCamposRequeridos(datosFormulario, ["name", "email", "active"])


//para los valores: values
const producto = {
    nombre: "laptop",
    stock: 100,
    precio: 1100,
    destacado: true,
}

//array de valores:
const valores = Object.values(producto);
//["laptop",100,1100,true]

//verificar si algún valor cumple una condición:


const precipitaciones = {
    enero: 110,
    febrero: 98,
    marzo: 120,
    abril: 50,
}

//algún mes la precipitación fue superior a 100 litros???

const mesSuperiorCien = Object.values(precipitaciones)
    .some(precipitacion => precipitacion > 100);

//cuantos litros han caido los meses enero-abril
const totalLitros = Object.values(precipitaciones)
    .reduce((total, precipitacion)=> total + Number(precipitacion),0);

//calcular la precipitacion máxima
const maxPrecipitaciones = Object.values(precipitaciones)
    .reduce((max, precipitacion)=> {
        return Number(precipitacion) > max ? Number(precipitacion) : max;
    },0);
//const maxPrecipitaciones= Math.max(...Object.values(precipitaciones));

//obtener pares [clave:valor] <---entries()
const configuracion = {
    tema: "oscuro",
    idioma: "es",
    notificaciones: true,
    volumen: 75,
}

//Obtener array de pares clave,valor:
const entradas = Object.entries(configuracion);
/*
    [
        ["tema","oscuro"],
        ["idioma","es"],
        ["notificaciones", true]
        ["volumen",75]
    ]
*/

//+++++
const usuarioBD ={
    name: "Esther",
    password: "xfst20012",
    email: "emartor@g.educaand.es",
    active: true,
}
//filtrar. Eliminar los campos sensibles de este objet usuarioBD ("password")


Object.entries(usuarioBD).filter([])


// destructuring

const {nombre, email} = usuarioBD;  //---> const nombre = usuarioBD.nombre
                                    //---> const email = usuarioBD.email

                                
const data =[1,2,3,4,5];
const [a,b,,c] = data;



function vData (array){
    const [v1,v2] = array;
    console.log("v1:",v1)
    console.log("v2:",v2);
}
vData([1,2,3,4,5])  // <---- 
//     _ _______
//     v1   v2

//crear función llamada mostrarPersona. Obtener el username, y las 2 primeras redes sociales que el usuario tenga:

const usuario3 = {
    id:1,
    info: {
        username: "esther",
        redes: ["twitter","instagram","facebook"],
        edad: 77,
    }
}

const {info:{username, redes:[r1,r2]}} = usuario3;
/*
username ---> esther
r1 ----> twitter
r2 ----> instagram
*/

//obtener el nombre y la edad del siguiente objeto. Si no existe edad que guarde el valor 0
const data4 = {
    id: 101,
    usuario: {
        perfil:{
            nombre2: "Lucía",
            edad: 28,
            direccion: {
                ciuedad: "Granada",
                pais: "España",
            },
        },
        activo: true,
    },
};

console.log(data4?.idd)     //comprueba si está 

const { usuario:{ perfil:{ nombre2,edad=0 } } }= data4;
/*
 nombre2 ----> "Lucía"
 edad -----> 28
*/


const productos =[
{
    id:1,
    nombre: "Laptop",
    precio: 1000,
    fabricante: {
        nombre: "HP",
        pais: "USA",
        constacto: {
            email: "info@hp.com",
            telefono: "+1-555-0123",
        },
    },
    epecificaciones:{
        ram: "16GB",
        cpu: "Intel i7",
    },
},
{
    id:2,
    nombre: "Monitor",
    precio: 500,
    fabricante: {
        nombre: "Samsung",
        pais: "Corea",
        constacto: {
            email: "info@samsung.com",
            telefono: "+1-555-0123",
        },
    },
    epecificaciones:{
        ram: "8GB",
        cpu: "Intel i5",
    },
},
{
    id:3,
    nombre: "Teclado",
    precio: 200,
    fabricante: {
        nombre: "Logitech",
        pais: "USA",
        constacto: {
            email: "info@logitech.com",
            telefono: "+1-555-0123",
        },
    },
    epecificaciones:{
        ram: "4GB",
        cpu: "Intel i3",
    },
},
]

//crear una función que extraiga los datos del objeto y me devuelva la siguiente estructura

//nombre, fabricante {nombre, contacto}, especificaciones(solo la ram)
//Imaginemos un ARRAY DE PRODUCTOS.
//USANDO LA NUEVA ESPECIFICACIÓN OBTENER el nombre del producto con más ram

const extraerData = (products)=>{
    const {
        nombre,
        fabricante:{ nombre:nombreFabricante, contacto },
        especificaciones:{ ram }
    }= arrayProducts
    return{
        nombre,
        fabricante,
        especificaciones
    }
};

const newDataArray = (arrayProducts) => arrayProducts
    .map(product => extraerData(product))



