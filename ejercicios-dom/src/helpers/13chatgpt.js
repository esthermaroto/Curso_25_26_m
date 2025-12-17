import fetching from "../utils/feching";

export default function crearEjercicio132() {
  let carrito = [];

  //------------------------------------------------------------------------
  // Header
  const createHeader = () => {
    const header = document.createElement("header");
    const titulo = document.createElement("h1");
    const subtitulo = document.createElement("h3");

    titulo.textContent = "BOOKING - SISTEMA DE RESERVAS";
    subtitulo.textContent = "Web de booking para tus vacaciones";

    header.appendChild(titulo);
    header.appendChild(subtitulo);
    return header;
  };

  //------------------------------------------------------------------------
  // Footer
  const createFooter = () => {
    const footer = document.createElement("footer");
    const author = document.createElement("p");

    author.textContent = "© Esther Maroto Torres";

    footer.appendChild(author);
    return footer;
  };

  //------------------------------------------------------------------------
  // Formulario de búsqueda
  const createSearchCard = () => {
    const formularioContainer = document.createElement("div");

    const selectCiudades = document.createElement("select");
    selectCiudades.id = "ciudades";

    const inputCheckIn = document.createElement("input");
    inputCheckIn.type = "date";

    const inputCheckOut = document.createElement("input");
    inputCheckOut.type = "date";

    const inputHuespedes = document.createElement("input");
    inputHuespedes.type = "number";
    inputHuespedes.min = 1;

    const btnBuscar = document.createElement("button");
    btnBuscar.textContent = "Buscar";

    formularioContainer.append(
      selectCiudades,
      inputCheckIn,
      inputCheckOut,
      inputHuespedes,
      btnBuscar
    );

    return {
      formularioContainer,
      selectCiudades,
      inputCheckIn,
      inputCheckOut,
      inputHuespedes,
      btnBuscar,
    };
  };

  //------------------------------------------------------------------------
  // Sección de resultados
  const createResultsSection = () => {
    const resultsContainer = document.createElement("div");
    resultsContainer.classList.add('hotels-container')
    return { resultsContainer };
  };

  //------------------------------------------------------------------------
  // Carrito
  const createCartSection = () => {
    const cartSection = document.createElement("div");
    const tituloCarrito = document.createElement("h2");
    tituloCarrito.textContent = "Carrito de Reservas";
    const listadoReservas = document.createElement("ul");
    const totalPrecio = document.createElement("p");
    totalPrecio.textContent = "Total: 0 €";
    const botonFinalizar = document.createElement("button");
    botonFinalizar.textContent = "Finalizar Reserva";

    cartSection.append(
      tituloCarrito,
      listadoReservas,
      totalPrecio,
      botonFinalizar
    );

    return {
      cartSection,
      listadoReservas,
      totalPrecio,
      botonFinalizar,
    };
  };

  //------------------------------------------------------------------------
  const getStars = (rating) => "⭐".repeat(Math.floor(rating));

  const loadCities = async (select) => {
    const hoteles = await fetching("http://localhost:1493/hoteles");
    const ciudades = [...new Set(hoteles.map((h) => h.city))];

    ciudades.forEach((c) => {
      const option = document.createElement("option");
      option.value = c;
      option.textContent = c;
      select.append(option);
    });
  };

  //------------------------------------------------------------------------
  const addToCart = (hotel, cart, personas) => {
    const total = hotel.price_per_night * personas;
    carrito.push({ hotel, personas, total });
    updateCart(cart);
  };

  const updateCart = (cart) => {
    let totalCarrito = 0;
    cart.listadoReservas.textContent = "";

    carrito.forEach((item) => {
      totalCarrito += item.total;
      const li = document.createElement("li");
      li.textContent = `${item.hotel.name} - ${item.personas} personas - ${item.total} €`;
      cart.listadoReservas.appendChild(li);
    });

    cart.totalPrecio.textContent = `Total: ${totalCarrito.toFixed(2)} €`;

    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  //------------------------------------------------------------------------
  const hotelCards = (hoteles, results, search, cart) => {
    results.resultsContainer.textContent = "";

    hoteles.forEach((hotel) => {
      const card = document.createElement("div");
      card.classList.add('hotel-card')

      const name = document.createElement("h5");
      name.classList.add('hotel-name')
      name.textContent = hotel.name;

      const city = document.createElement("p");
      city.classList.add('hotel-city')
      city.textContent = hotel.city;

      const rating = document.createElement("p");
      rating.classList.add('hotel-rating')
      rating.textContent = `${getStars(hotel.rating)} ${hotel.rating}/5`;

      const price = document.createElement("p");
      price.classList.add('hotel.price')
      price.textContent = `${hotel.price_per_night} € / noche`;

      const amenities = document.createElement("ul");
      amenities.classList.add('hotel-amenities')
      hotel.amenities.forEach((amenity) => {
        const li = document.createElement("li");
        li.textContent = amenity;
        amenities.appendChild(li);
      });

      const btnAdd = document.createElement("button");
      btnAdd.classList.add('btn-book')
      btnAdd.textContent = "Agregar al carrito";

      btnAdd.addEventListener("click", () => {
        addToCart(hotel, cart, Number(search.inputHuespedes.value));
      });

      card.append(name, city, rating, price, amenities, btnAdd);
      results.resultsContainer.appendChild(card);
    });
  };

  //------------------------------------------------------------------------
  const performSearch = async (search, results, cart) => {
    const ciudadSeleccionada = search.selectCiudades.value;
    const numeroHuespedes = Number(search.inputHuespedes.value);
    const fechaCheckIn = search.inputCheckIn.value;
    const fechaCheckOut = search.inputCheckOut.value;

    const hoteles = await fetching("http://localhost:1493/hoteles");

    const hotelesFiltrados = hoteles.filter(
      (h) =>
        h.city === ciudadSeleccionada &&
        h.available_rooms >= numeroHuespedes &&
        h.available_from <= fechaCheckIn &&
        h.available_to >= fechaCheckOut
    );

    hotelCards(hotelesFiltrados, results, search, cart);
  };

  //------------------------------------------------------------------------
  const finishBooking = (cart) => {
    carrito = [];
    localStorage.removeItem("carrito");
    updateCart(cart);
    
  };

  //------------------------------------------------------------------------
  const render = () => {
    const container = document.createElement("div");
    const main = document.createElement("main");

    const header = createHeader();
    const search = createSearchCard();
    const results = createResultsSection();
    const cart = createCartSection();
    const footer = createFooter();

    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
      updateCart(cart);
    }

    search.btnBuscar.addEventListener("click", () =>
      performSearch(search, results, cart)
    );
    cart.botonFinalizar.addEventListener("click", () => finishBooking(cart));

    loadCities(search.selectCiudades);

    main.append(
      search.formularioContainer,
      results.resultsContainer,
      cart.cartSection
    );
    container.append(header, main, footer);
    return container
  };

  return { render };
}
