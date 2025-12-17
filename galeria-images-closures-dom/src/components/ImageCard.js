import { imagesData } from "../data/images";

export function createImageCard(image, onImageClick, onFavoriteToggle){

    //contenedor principal
    const card = document.createElement('div');
    card.className = "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group relative"
    card.dataset.imageId = image.id;
    
    const img = document.createElement('img');
    img.src = image.url
    img.alt = image.title
    img.className = 'w-full h-64 object-cover group-hover:opcity-90 transition-opacity'
    //img.onerror=()=>img.src="aquí iría la url de una imagen que simbolice no disponible"

    //gestionar el corazón de favorito 

    //información de la imagen
    const infoContainer = document.createElement('div');
    infoContainer.className = 'p-4 bg-white'
    
    const title = document.createElement('h3');
    title.className = 'font-bold text-lg text-gray-800 mb-2'
    title.textContent = image.title

    const author = document.createElement('p');
    author.className = 'font-semibold text-sm text-gray-600'
    author.textContent = `Realizado por: ${image.author}`
    
    infoContainer.appendChild(author)
    infoContainer.appendChild(title)
    card.appendChild(img)
    card.appendChild(infoContainer);

    // evento de la tarjeta 

    card.onclick = ()=>{
        alert(image.id);    //sustituir por onImageClick
    }

    // retornar el componente:
    return{
        element : card,
        //xxxxx aquí iran las funciones
        // isfavorite <----- es favorita la imagen
        // setFavorite <----- convertir en favorita esta imagen
    }
}

export default function createImageGrid(images, onImageClick, onFavoriteToggle){
    // creamos un map privado que guarde todas las tarjetas 
    const cards = new Map();
    const grid = document.createElement('div')
    grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'

    // crear cada tarjeta con createImageCard
    images.forEach((image) =>{
        const cardComponent = createImageCard(
            image,
            onImageClick,
            onFavoriteToggle 
        );
        cards.set(image.id, cardComponent);
        grid.appendChild(cardComponent.element)
    })

    return{
        element : grid,
    }
}