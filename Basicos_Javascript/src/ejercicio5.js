/*
//****.at <---acceso con índices negativos
const frutas = ["🍎","🍌","🍊","🍇"];
console.log(frutas.at(-2)); // 🍊
console.log(frutas.slice(-2)); //🍊,🍇

//splice ---> corta del array los elementos selecionados y los devuelve 
console.log(frutas.splice(1,2)) //🍌 🍊
console.log(frutas.splice(1,2,"pera")) // frutas = ["🍎","pera","🍇"]

//***concat <--- concatenar dos arrays
frutas.concat([1,2,3,4,5,6]);

//*************
const edades = [1,2,3,4,5,6]
const ArrayConcat = [...frutas,...edades];  ///ESTA ES LA QUE HAY Q USAR spread operator

//SET <---- OTRO YIPO DE DATOS (datos únicos)
const pesos = [4,6,5,4,8,1,54,88,6,41,4,8,8,4];
const sinDuplicados = [...new Set(pesos)]; //<---***********

// .reduce (reducir un array a un único valor)
//pesos.reduce((acumulador,elemento,indice,array)=>aquí va la lógica, valorInicial)
//                                 | opcionales |                    |tipo de dato| 
//NO MUTA EL ARRAY

pesos.reduce((suma,peso)=> suma+peso, 0)

//const usuarios = [
    {id: 1, nombre: "Ana", edad: 25, data:{books:100}}
    {id: 2, nombre: "Juan", edad: 30, data:{books:50}}
    {id: 3, nombre: "María", edad: 28, data:{books:20}}
];

//dame la información del usuario cuyo nombre es JUAN

usuarios.find(usuario => usuario.nombre.toLowerCase() === "juan"); //NO MUTA EL OBJETO OG
let resultado = usuarios.find(usuario => Number(usuario.edad) >= 28) ?? 0;
                |si la condición de la izquierda es "null" o "undifined" salta a la derecha |

//devolver un array con solo los nombres de los usuarios que tienen en su biblioteca más de 20 libros
//obtener el valor promedio total de todos los libros si suponemos un precio medio de 28€ 

------Tarea----
-Realizar la multiplicación de todos los pesos
-Encontrar el máximo y el mínimo
-["manzana", "plátano", "naranja", "manzana", "manzana", "plátano", "pera", "pera"] devolver un objeto "clave:valor" que diga el nombre de la "fruta:cuantas veces aparece esa fruta"
-Dado el siguiente array 2D [[1,2],[3,4],[5,6]] aplanarlo en un array 1D -----> [1,2,3,4,5,6]
*/

const pesos = [4,6,5,4,8,1,54,88,6,41,4,8,8,4];
const frutas = ["manzana", "platano", "naranja", "manzana", "manzana", "platano", "pera", "pera"];
const array2D = [[1,2],[3,4],[5,6]]; 
//1.
pesos.reduce((suma,peso)=> suma*peso,1)

//2.
pesos.reduce((max,peso)=>

    peso > max ? peso : max

  ,pesos[0]);

//3.
//{manzana : 3,  plátano : 2, naranja : 1, pera : 2}
frutas.reduce((acc, fruta)=>{

    acc[fruta]= (acc[fruta] || 0) + 1;
    return acc;

},{});

//4.
array2D.reduce(()=> {



    },[])

//---------------------------------
const usuarios = [
    {id: 1, nombre: "Ana", edad: 25, data:{books:100}},
    {id: 2, nombre: "Juan", edad: 30, data:{books:50}},
    {id: 3, nombre: "María", edad: 28, data:{books:20}},
    {id: 4, nombre: "Sara", edad: 28, data:{books:20}},
    {id: 5, nombre: "Carlos", edad: 20, data:{books:10}},
    {id: 6, nombre: "Mario", edad: 38, data:{books:0}}
];

//dame la información del usuario cuyo nombre es JUAN

usuarios.find(usuario => usuario.nombre.toLowerCase() === "juan"); //NO MUTA EL OBJETO OG
let resultado = usuarios.find(usuario => Number(usuario.edad) >= 28) ?? 0;
//              |si la condición de la izquierda es "null" o "undifined" salta a la derecha |

//devolver un array con solo los nombres de los usuarios que tienen en su biblioteca más de 20 libros
let result1 = usuarios.find(usuario => usuario.data.books > 20);

//obtener el valor promedio total de todos los libros si suponemos un precio medio de 28€ 

//decidme que usuarios no tienen libros 

//-----------------------------------
const productos = [
    {id: 1, nombre: 'Laptop', precio: 1200, stock: 5, categoria: 'Tecnología'},
    {id: 2, nombre: 'Camiseta', precio: 35, stock: 15, categoria: 'Ropa'},
    {id: 3, nombre: 'Monitor', precio: 300, stock: 0, categoria: 'Tecnología'},
    {id: 4, nombre: 'Libro', precio: 20, stock: 50, categoria: 'Literatura'},
    {id: 5, nombre: 'Móvil', precio: 800, stock: 10, categoria: 'Tecnología'},
    {id: 6, nombre: 'Pantalón', precio: 60, stock: 5, categoria: 'Ropa'}    
];

// Se pide:
// 1.-Obtener un array con los nombres de todos los productos que están agotados.
// 2.-Calcular el valor total del inventario (precio * stock) de todos los productos.
// 3.-Filtar los productos que pertenecen a la categoría 'Tecnología' y tienen un precio mayor a 500.
// 4.-Crear un nuevo array de productos aplicando un descuento del 10% a todos los productos de la categoría 'Ropa'.

// 1. Array con los nombres de productos agotados (stock === 0)
const productosAgotados = productos
    .filter(producto => producto.stock === 0)
    .map(producto => producto.nombre);

// 2. Valor total del inventario (precio * stock de todos los productos)
const valorTotalInventario = productos
    .reduce((total, producto) => total + (producto.precio * producto.stock), 0);

// 3. Productos de 'Tecnología' con precio > 500
const tecnologiaCaros = productos
    .filter(producto => producto.categoria === 'Tecnología' && producto.precio > 500);

// 4. Nuevo array de productos con 10% de descuento en 'Ropa'
// const productosConDescuento = productos
//     .map(producto => 
//         producto.categoria === 'Ropa' ? {...producto, precio: +(producto.precio * 0.9).toFixed(2)} : producto
//     );


