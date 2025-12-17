// primitivos en typescript 

//1.- Sting
let nombre:string  = "Esther MT";
let cp : string = "28023";
let mensaje : string = `Hola mi nombre es ${nombre} y mi cp es ${cp}`;

function procesarTexto (texto:string):string{
    return texto.trim().toUpperCase();
}

procesarTexto(mensaje);

//2.- Number
//calcularPrecioFinal(precio,impuesto,descuento)
let precio:number = 100;
let impuesto:number = 0.16;
let descuento:number = 0.1;
function calcularPrecioFinal(precio:number,impuesto:number,descuento:number):number{
    let precioConImpuesto = precio + (precio * impuesto);
    let precioFinal = precioConImpuesto - (precioConImpuesto * descuento);
    return precioFinal;
}
calcularPrecioFinal(precio,impuesto,descuento);

//cualquier tipo any (No usar salvo)
// funcion que verifique que lo que pase como parametro es un numero.
//NO es infinito, !isNaN

function esNumero(valor:any):boolean{
    return typeof valor === 'number' && !isNaN(valor);
}
esNumero(precio);

//calcular la suma de total de los elementos de un array de numeros
function sumarElementos (elementos:number[]):number{
    if(elementos.length === 0){
        throw new Error("El array no puede estar vacio");
    }
    const suma : number = elementos.reduce((acumulador,valorActual) => acumulador + valorActual,0);
    return suma/ elementos.length;
}

function calcularExtremos (elementos:number[]):{minimo:number;maximo:number}{
    if(elementos.length === 0){
        throw new Error("El array no puede estar vacio");
    }      
    const minimo : number = Math.min(...elementos);
    const maximo : number = Math.max(...elementos);
    return {minimo,maximo};
}

//comprobar si un email es correcto o no 
function emailValido (email:string): boolean{
    //el puento y el espacio son carateres especiales que hay que escapar con \. \s
    const emailRegex : RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
emailValido("aaaa@.com");

//interface Tipo de dato generado por el usuario para una determinada situación
interface permisosUsuario {
    puedeLeer: boolean;
    puedeEscribir: boolean;
    puedeBorrar: boolean;
}

//crear una funcion llamada obtenerPermisos que dependiendo del rol del usuario (administrador, usuario, invitado) cambien los permisos de la interfaz 
type rolUsuario = "administrador" | "usuario" | "invitado";

function obtenerPermisos(rol:rolUsuario): permisosUsuario {
    switch(rol){
        case "administrador":
            return {puedeLeer:true,puedeEscribir:true,puedeBorrar:true}; 
        case "usuario":
            return {puedeLeer:true,puedeEscribir:true,puedeBorrar:false};
        case "invitado":
            return {puedeLeer:true,puedeEscribir:false,puedeBorrar:false};
        default:
            throw new Error("Rol no reconocido");
    }
}

obtenerPermisos("administrador");

// NULL y UNDEFINED
let posibleNombre : string | null = "invitado";
let posibleNombreIndefinido : string | undefined = undefined;

//arrow function
const duplicar = (numero:number): number =>{
    return numero * 2;
};

//crear una función que le pase como parametró un array de objetos y me devuelva los usuarios que son mayores de edad 
const usuarios = [
    {nombre:"Ana", edad:34},
    {nombre:"Sara", edad: 14},
    {nombre: "Mario", edad: 24},
    {nombre: "Carlos", edad: 18}
]

const mayorEdad = (usuarios:({nombre:string;edad:number}[])) => {
    return usuarios.filter(usuario => usuario.edad >= 18);
};

mayorEdad(usuarios);

// funcion procesarNumeros que cree devuelva un array de números sólo positivos, multiplicados por 2 y ordenados de menor a mayor
const procesarNumeros = (numeros:number[]):number[] => {
    return numeros
        .filter(numero => numero > 0)
        .map(numero => numero * 2)
        .sort((a,b) => a - b);
}
procesarNumeros([-5,3,-1,2,0,4,-2,1]);


//ejercicio:
interface Cliente {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
}

const Cliente:Cliente[] = [
    {id:1,nombre:"Ana",email:"ana@gmail.com",telefono:"123456789"},
    {id:2,nombre:"Luis",email:"luis@gmail.com",telefono:"987654321"},
    {id:3,nombre:"Marta",email:"marta@gmail.com",telefono:"555555555"},
    {id:4,nombre:"Carlos",email:"carlos@gmail.com",telefono:"111111111"},
    {id:5,nombre:"Sofia",email:"sofia@gmail.com",telefono:"222222222"},
    {id:6,nombre:"Pedro",email:"pedro@gmail.com",telefono:"333333333"}, 
    {id:7,nombre:"Laura",email:"laura@gmail.com",telefono:"444444444"},
    {id:8,nombre:"David",email:"david@gmail.com",telefono:"666666666"},
];

//se pide crear una función que genere un map con la siguiente estructura:
/*
{
    idUsuario:{
        nombre: string,
        email: string,
        telefono: string,
    }
}
*/
export const ejercicioMapaClientes = () => {
const generarMapaClientes = (clientes:Cliente[]):Map<number,{nombre:string;email:string;telefono:string}> => {
    const mapaClientes = new Map<number,{nombre:string;email:string;telefono:string}>();
    clientes.forEach(cliente => {
        mapaClientes.set(cliente.id,{nombre:cliente.nombre,email:cliente.email,telefono:cliente.telefono});
    });
    return mapaClientes;
}   

console.log(generarMapaClientes(Cliente));
};

/*
calculadora simple
crear una calculadora tipada que realice operaciones básicas
partimos de una interfaz llamada operación, formada por tipo: con 4 opciones (suma, resta, multiplicación y división), operando 1 y oprerando 2 (números).

función llamada calculadora que le pasaremos como parámetro una operación y nos devolverá el resultado de la operación indicada.
probarlo con 5, 10 y 0
¿Se podría ampliar a otra operaciones?
*/
export const calculadoraSimple = () => {
interface Operacion {
    tipo: "suma" | "resta" | "multiplicacion" | "division";
    operando1: number;
    operando2: number;
}  
const calculadora = (operacion:Operacion): number => {
    switch(operacion.tipo){
        case "suma":
            return operacion.operando1 + operacion.operando2;
        case "resta":
            return operacion.operando1 - operacion.operando2;
        case "multiplicacion":
            return operacion.operando1 * operacion.operando2;       
        case "division":
            if(operacion.operando2 === 0){
                throw new Error("No se puede dividir entre cero");
            }       
            return operacion.operando1 / operacion.operando2;
        default:
            throw new Error("Operación no reconocida");
    }
};
console.log(calculadora({tipo:"suma",operando1:5,operando2:10}));   
console.log(calculadora({tipo:"resta",operando1:10,operando2:5}));
console.log(calculadora({tipo:"multiplicacion",operando1:5,operando2:10}));
console.log(calculadora({tipo:"division",operando1:10,operando2:5}));
};

//map 
const edades = new Map<string,number>();
edades.set("Ana",34);

interface Datos {
    nombre: string;
    email: string;
    cp: number; 
}

const usuarios2 = new Map<number,Datos>();
usuarios2.set(1,{nombre:"Ana",email:"ana@gmail.com",cp:28023});

//set
const mySet = new Set<number>();
mySet.add(1);
mySet.add(2);

/*
crear una variable llamadad catálogo con un map donde cada categoría (string) tenga un set de productos (string)
crear las siguientes funciones:
-agregarProducto que devuelve true si se ha agregado el producto correctamente y false si ya existía
-mostrarCatalogo que muestre todo el catálogo 
adicionalmente, crear una función buscarProducto que le paso un string con el nombre del producto o que busque por el nombre del producto 
*NOTA* cuidado con el get que aveces devuelve undefined
*/
export const ejercicioCatalogo = () => {
const catalogo = new Map<string,Set<string>>();

const addProduct = (category:string,product:string):boolean => {
    if(!catalogo.has(category)){
        //lo creamos nosotros 
        catalogo.set(category,new Set<string>());
    }

    //añadimos ya el producto a la categoría
    catalogo.get(category)?.add(product);
    return true;
}

addProduct("Frutas","Manzana");
addProduct("Frutas","Plátano");
addProduct("Verduras","Lechuga");
addProduct("Verduras","Tomate");
addProduct("Lácteos","Leche");
addProduct("Lácteos","Yogur");

//mostrar catálogo de productos 
function showCatalog():void {

    console.log("----------- Catálogo de productos --------------")

    for(const [category,products] of catalogo){
        console.log(`🔶 Categoría: ${category} --- Núemro de productos: ${products.size}`);
        for (const product of products){
            console.log(`   🔸  ${product}`);
        }
    }
}

showCatalog();

//buscar producto por nombre
function searchProduct(nameProduct:string):string[] {
    console.log(`------- Búsqueda de producto: ${nameProduct} -------`);
    const categoriasEncontradas: string[] = [];
    for(const [category,products] of catalogo){
        if(products.has(nameProduct)){
            categoriasEncontradas.push(category);
        }
    }
    return categoriasEncontradas;
}

console.log(`Está en la categoría: ${searchProduct("Manzana")}`);
};

/*
crear un sistema de reservas de un restaurante, que tenga un map con clave "la fecha de la reserva" en formato americano y valor es un set con los nombres(DNI).
-agregarReserva(fecha:string,nombre:string):boolean
-borrarReserva(fecha:string,nombre:string):boolean
-mostrarReservas():void
-estdísticas reservas por días, reservas totales, media reservas
*/
export const sistemaReservas = () => {
const reservas = new Map<string,Set<string>>();

const agregarReserva = (date:string,nombre:string):boolean => {
    if(!reservas.has(date)){
        reservas.set(date,new Set<string>());
    }
    reservas.get(date)?.add(nombre);
    return true;
};

const borrarReserva = (date:string,nombre:string):boolean => {
    if(reservas.has(date)){
        reservas.get(date)?.delete(nombre);
        return true;
    }
    return false;
}; 
const mostrarReservas = ():void => {
    console.log("------- Reservas -------");
    for(const [date,names] of reservas){
        console.log(`📅 Fecha: ${date} --- Número de reservas: ${names.size}`);
        for(const name of names){
            console.log(`   🔸 ${name}`);
        }
    }
};

agregarReserva("2023-10-01","12345678A");
agregarReserva("2023-10-01","87654321B");
agregarReserva("2023-10-02","11223344C");
agregarReserva("2023-10-02","44332211D");
agregarReserva("2023-10-02","55667788E");

borrarReserva("2023-10-01","12345678A");
mostrarReservas();

//estadísticas
const estadisticasReservas = ():void => {
    let totalReservas = 0;
    let reservasPorDia = new Map<string,number>();
    for(const [date,names] of reservas){
        const numeroReservas = names.size;
        reservasPorDia.set(date,numeroReservas);
        totalReservas += numeroReservas;
    }
    console.log(`Total reservas: ${totalReservas}`);
    console.log("Reservas por día:");
    for(const [date,numero] of reservasPorDia){
        console.log(`   📅 ${date}: ${numero} reservas`);
    }   
    const mediaReservas = totalReservas / reservasPorDia.size;
    console.log(`Media de reservas por día: ${mediaReservas.toFixed(2)}`);
};

estadisticasReservas();
};
