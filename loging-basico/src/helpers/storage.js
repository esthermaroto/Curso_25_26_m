import { ENV } from "../config/env.js";


//crear función "initialStorage" que reciba un array de usuarios y los guarde en el LocalStorage
/**
 * 
 * @param {*} arrayUsers 
 */
export const initialStorage = (arrayUsers) => {
   localStorage.setItem(ENV.VITE_STOREGE_KEY, JSON.stringify(arrayUsers));
   console.info(`${ENV.VITE_STOREGE_KEY}: Usuarios guardados correctamente`);
};

//crear función llamada "getUsuarios()" que se traiga todos los usuarios
/**
 * 
 * @returns 
 */
export const getUsers = () => {
    return JSON.parse(localStorage.getItem(ENV.VITE_STOREGE_KEY)) || [];
};

//crear una función llamada "setUsuarios(usuario)" y lo guarde en el LocalStorage en la key del .env
/**
 * 
 * @param {*} user 
 */
export const setUsuarios = (user) => {
    initialStorage([...getUsers(), user]);
};





