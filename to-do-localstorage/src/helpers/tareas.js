import { dbTareas } from "../db/db"
import { uid } from 'uid';
const TEXT_KEY = import.meta.env.VITE_TEXT_KEY;

// aquí van las funcones helper para las tareas 

export const rellenarLocalStorage = (arrayTareas,tareas= TEXT_KEY) =>{
    //guardar en el localStorage en la clave
    localStorage.setItem(tareas,JSON.stringify(arrayTareas))
}

//funcion llamada "mostarTareas" que le pase como parámetro una clave y me muestre a través de la consola la clave, utilizar console.table()
const mostrarTareas = (clave=TEXT_KEY)=>{
    console.table(JSON.parse(localStorage.getItem(clave)))
}

//getTareas()
/**
 * Devuelve un array con todas las tareas almacenadas.
 * @param {Array} clave -Array de tareas
 * @returns -Si en el array no hay tareas devuelve un array vacio
 */
export const getTareas = ()=>{
    //traigo la data
    const dataNoParse = localStorage.getItem(TEXT_KEY);
    const dataParse = saveJSONParse(dataNoParse);
    if(!Array.isArray(dataParse)){
        console.error("Error en la data")
        return [];
    }
    return dataParse;
}

//saveTareas(Tareas)
/**
 * Recibe un array de tareas y lo guarda en localStorage bajo la clave "tareas"
 * @param {Array} tareas -Array de tareas
 * @param {*} clave -Clave predefinida como "tareas"
 */
export const saveTareas = (tareas = [], clave = "tareas") => {
    try {
        if(!Array.isArray(tareas)){
            throw new Error("Error, el array de tareas no es válido")
        }
        // serializar --> convierto a string
        const json = JSON.stringify(tareas);
        // guardo en localStorage 
        localStorage.setItem(TEXT_KEY, json);
        console.log("Array guardado correctamente 💾")
    } catch (error) {
        console.error("Error, al realizar el almacenamiento en localStorage ❌")
    }
}

//addTarea(nombre) yo
/**
 * Crea una tarea con id generado, nombre proporcionado, fecha generada y completadada a false
 * @param {string} nombre -Nombre de la tarea
 */
export const addTarea = (nombre)=>{
    const nombre = String(nombre ?? "").trim();
    try{
       const nuevaTarea = {
        id: uid(3), 
        nombre,
        fechaCreacion: new Date().toISOString(),
        completada: false
        }; 

        dbTareas.push(nuevaTarea);
        rellenarLocalStorage(dbTareas,TEXT_KEY);

    }catch (error){}
   
}

//deleteTarea(id)
export const deleteTarea = (id)=>{
    dbTareas.find(localStorage.getItem(clave, id))
}
//completarTarea(id)
//descompletarTarea(id)
//buscarCompletadas()
//buscarNoCompletadas()
//buscarPorNombre(nombre)
//borrarTodasLasTareas()
//Elimina completamente la clave "tareas" del localStorage, dejándolo vacio.

const saveJSONParse = (text)=>{
    try{    
        if(typeof text ===! "string"){
            throw new Error(`Error, la data ${text} no es un string`);
        };
        return JSON.parse(text);
    }catch (error){
        throw new Error("Error al parsear la data")
    }
}

export default mostrarTareas;