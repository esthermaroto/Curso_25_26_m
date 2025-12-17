//crear una funcion utilizando promise y otra utilizando async/await que se traiga 

// de jsonplaceholder.typicode.com/photos el title y la imagen (thumbnailURL). HAY QUE PROBARLO
const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_API_TIEMPO = import.meta.env.VITE_API_TIEMPO;
// export function dataJSONPromise() {
//     console.log("------- dataJSONPromise --------")

//     // hacer una función que se traiga la data xxxx usando Promise
//     fetch(VITE_API_URL)      //fetch retorna una promesa es asincrono
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return rsponse.json()
//         })    //cuando la promesa se resuelve, se obtiene la respuesta y se convierte a json
//         .then((data) => {
//             console.log(`Data obtenida dede ${VITE_API_URL}`)
//             console.log(data);
//         })        
//         .catch((error) => console.error("Error....", error))
//         .finally(message => createLogger("Cerrado JSON Promise"));        
// }



export const dataJSONAsync = async () => {
    console.log("------- dataJSONAsyncAwait --------");
    try {
        const response = await fetch(VITE_API_URL);
        if (!response.ok) {
            throw new Error(`Error al traer la data`);
        }
        const data = await response.json();
        const dataParseada = data.map((infoFoto) => {
            return {
            title: infoFoto.title,
            thumbnailUrl: infoFoto.thumbnailUrl,
            }
        });

        console.log("-------------- Data parseada ---------------");
        console.log(dataParseada);
        
    } catch (error) {
        console.log("Error....", error);
    }
};

