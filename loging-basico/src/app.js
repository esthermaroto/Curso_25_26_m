import { initialStorage } from "./helpers/storage.js";
import { DB } from "./db/db.js";
import { renderLoginForm } from "./views/loginView.js";
import validarCredenciales from "./services/authServices.js";



export function initialApp(){
    //iniciamos guardado los usuarios en localStorage
    initialStorage(DB);

    //Pintamos/renderizamos mi formulario en app
    const app = document.getElementById("app");
    console.log(app);
    app.innerHTML = renderLoginForm();
    const form = document.querySelector(" #logingForm ");
    const message = document.querySelector(" #message ");
    
    //pongo un escuchador de eventos al formulario 
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        //comprobar si username y password son correctos 
        const formData = new FormData(form);
        const username = formData.get("username")?.trim(); 
        const password = formData.get("password")?.trim();
        
        //crear función que valide que username y password son correctos usando las siguientes restricciones.
        //-no vacias 
        //-password > 3 caracteres
        //-username y password están en localStorage 

        const ok = validarCredenciales(username, password);
        message.innerHTML = ok 
        ? `<span style="green"> Bienvenido ${username} </span> ` 
        : `<span style="red"> Credenciales Erróneas </span> `;
        form.reset();
    });

}