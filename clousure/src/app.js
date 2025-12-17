import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose();
const db = new sqlite.Database("./carrito.db", (err) => {
    if (err) console.error("Error abriendo DB:", err.message);
    else console.log("DB abierta correctamente.");
});

const app = () => {

    const crearClousure = () => {
        let mensajeSecreto = "Yos soy tu clousure";

        return ()=>{
            console.log("Mensaje: ", mensajeSecreto);
        };
    };

    const miClousure = crearClousure();
    miClousure();



//---------------- scope léxico ------------------//

    let nivelGlobal = "Soy Global";

    const funcionExterna = () => {
        let nivelExterno = "Soy del scope externo";
        const funcionInterna = () => {
            let nivelInterno = "Soy del scope interno";

            //demostremos...
            console.log("Accadiendo a: ",nivelGlobal);
            console.log("Accadiendo a: ",nivelExterno);
            console.log("Accadiendo a: ",nivelInterno);
        };
        funcionInterna();
    };
    funcionExterna();



    const objetoPublico ={
            saldo: 1000,
            retirarDinero: function(cantidad){
                this.saldo -= cantidad;
            },
    };

    objetoPublico.retirarDinero(100);
    console.log("Saldo restante: ",objetoPublico.saldo);

    objetoPublico.saldo = 5000; // Modificación directa no controlada
    console.log("Saldo modificado directamente: ",objetoPublico.saldo);

    const cuentaBancaria = (saldoInicial= 0) => {
        let saldo = saldoInicial || 0;
        return {
            obtenerSaldo: () => saldo,
            depositar: (cantidad) => {
                if(cantidad > 0){
                    saldo += cantidad;
                    console.log(`Cantidad ${cantidad} añadida. El nuevo saldo es: ${saldo}`)
                }
            },
            retirar: (cantidad=0) => {
                if(cantidad > saldo){
                    console.log(`Error no hay saldo suficiente...`);
                }
                saldo-= cantidad;
                console.log(`Cantidad ${cantidad} retirada. El nuevo saldo es: ${saldo}`)
            },
        };
    };

    const miCuenta1 = cuentaBancaria(500);
    miCuenta1.depositar(300);
    console.log("Saldo de miCuenta1: ",miCuenta1.obtenerSaldo())
    miCuenta1.retirar(50);
    const miCuenta2 = cuentaBancaria(1000);
    console.log("Saldo de miCuenta2: ",miCuenta2.obtenerSaldo())

    // crear un contador que pueda incrementar, dequementar y obtener el valor actual
    // se pide crear los contadores uno que empiece en 10 y vaya a 0 y al contrario
    // mostrar utilizando un temporizador de 1 segundo como los contadores van cambiando
    // utilizando los métodos del contador

    
    const crearContador = (valorInicial=0) => {
        let valor = valorInicial;
        return {
            incrementar: (cantidad) =>{
            valor += cantidad || 1;
            return valor;
            },

            decrementar: (cantidad) => {
            valor -= cantidad || 1;
            return valor;
            },
            obtener: ()=>valor,
            reiniciar: () => {
                valor = valorInicial;
                return valor;
            },
        };
    };

    let contadorDesc = crearContador(10); // De 10 a 0
    let contadorAsc = crearContador();   // De 0 a 10

    // setInterval(()=> {
    //     if(contadorDesc.decrementar() <= 10 ){
    //         console.log(contadorDesc.obtener())
    //         clearInterval()
    //     }
    // },1000);
    // console.log(contadorDesc.obtener());


    /*
     Ejemplificar un carrito de la compra persistente utilizando closure y estableciendo la persistencia con una base de datos sqlite3,
     que permita insesrtar productos, insertar cantidad de productos, eliminar productos y calcular total.
    */
    
    const crearCarrito = () => {

    // Insertar producto
    const insertarProducto = (nombre, precio, cantidad = 1) => {
        db.run(
            `INSERT INTO carrito (nombre, precio, cantidad) VALUES (?, ?, ?)`,
            [nombre, precio, cantidad],
            function(err) {
                if (err) console.error("Error insertando producto:", err.message);
                else console.log(`Producto insertado: ${nombre} x${cantidad}`);
            }
        );
    };

    // Sumar cantidad
    const sumarCantidad = (nombre, cantidad = 1) => {
        db.run(
            `UPDATE carrito SET cantidad = cantidad + ? WHERE nombre = ?`,
            [cantidad, nombre],
            function(err) {
                if (err) console.error(err.message);
                else console.log(`Se sumaron ${cantidad} unidades a ${nombre}`);
            }
        );
    };

    // Eliminar producto
    const eliminarProducto = (nombre) => {
        db.run(
            `DELETE FROM carrito WHERE nombre = ?`,
            [nombre],
            function(err) {
                if (err) console.error(err.message);
                else console.log(`Producto eliminado: ${nombre}`);
            }
        );
    };

    // Calcular total
    const calcularTotal = () => {
        db.all(`SELECT precio, cantidad FROM carrito`, [], (err, rows) => {
            if (err) console.error(err.message);
            else {
                const total = rows.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
                console.log("Total del carrito: $", total.toFixed(2));
            }
        });
    };

    return {
        insertarProducto,
        sumarCantidad,
        eliminarProducto,
        calcularTotal
    };
};

// Cerrar la DB al terminar (opcional)
process.on("exit", () => {
    db.close();
});

    

};




























export default app;