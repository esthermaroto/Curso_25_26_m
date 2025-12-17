import { imagesData } from "../data/images";
import createImageGrid from "./ImageCard";

export function createGalleryApp() {
    //contenedor principal
    const container = document.createElement("div");
    container.className="min-h-screen bg-linear-to-br from-pink-300 via-orange-200 to-yellow-600";

    // ---------- header -----------
    const header = document.createElement("header");
    header.className = "bg-white shadow-lg sticky top-0 z-40";

    const headerContentDiv = document.createElement("div");
    headerContentDiv.className = "max-w-7xl mx-auto px-6 py-6"

    const headerTitle = document.createElement("h1");
    headerTitle.className = "text-3xl font-bold text-yellow-800 mb-2"
    headerTitle.textContent = "🎨 Galeria de imágenes";

    const headerSubTitle = document.createElement("p");
    headerSubTitle.className = "text-gray-600";
    headerSubTitle.textContent = "Aprende Clousures, funciones Fábrica y manipulación del DOM"

    headerContentDiv.appendChild(headerTitle);
    headerContentDiv.appendChild(headerSubTitle);
    header.appendChild(headerContentDiv);

    //----------- main -------------
    const main = document.createElement('main');
    main.className = "max-w-7xl mx-auto px-6 py-8"

    const counterComponent = document.createElement('h2')
    counterComponent.textContent = '<------------- aquí irá el contador de favoritos'

        //modal de imagen
    const imageModal = document.createElement('h2');
    imageModal.textContent = '<------------- aquí irá el componente ImageModal'

        //grid imagenes
    const gridComponent = document.createElement('h2');
    gridComponent.textContent='<------------- aquí irá el componente de grid con las imágenes'
    const imageGrid = createImageGrid(imagesData);
    main.appendChild(imageGrid.element)



    main.appendChild(counterComponent);
    main.appendChild(imageModal);
    main.appendChild(gridComponent);

    //----------- footer -----------
    const footer = document.createElement("footer");
    footer.className = "bg-white text-white py-8 mt-15 text-center";

    const footerContentDiv = document.createElement('div');
    footerContentDiv.className = "max-w-7xl mx-auto px-6 text center"

    const footerText = document.createElement('h3');
    footerText.textContent = "Ejecicio DOM by Esther Maroto Torres";
    footerText.className = "text-gray-600 text-center ";

    footerContentDiv.appendChild(footerText);
    footer.appendChild(footerContentDiv);



    // añadimos todo al container
    container.appendChild(header);
    container.appendChild(main);
    container.appendChild(footer);
    
  return {
    element : container,

  }
}
