//---------------------------IMPORTACIONES--------------------

import { dbTareas } from "./db/db";
import mostrarTareas, { addTarea, rellenarLocalStorage } from "./helpers/tareas";

const TEXT_KEY = import.meta.env.VITE_TEXT_KEY;

//------------------INICIO DE LA APLICACION------------------

rellenarLocalStorage(dbTareas,TEXT_KEY);
mostrarTareas();
addTarea("Limpiar");
addTarea();
addTarea("       shfnvavnv ajvfanvanvv anva");
mostrarTareas();