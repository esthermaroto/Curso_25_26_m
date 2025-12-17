import fetching from "../utils/feching";

export default function crearEjercicio13() {
  let carrito = [];
  // DOM
  //------------------------------------------------------------------------
  // header
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
  // footer
  const createFooter = () => {
    const footer = document.createElement("footer");
    const author = document.createElement("p");

    author.textContent = "© Esther Maroto Torres";

    footer.appendChild(author);
    return footer;
  };
  //-----------------------------------------------------------------------

  // formulario de búsqueda
  const createSearchCard = async () => {
    const formularioContainer = document.createElement("div");

    // selección de ciudad
    const selectCiudades = document.createElement("select");
    selectCiudades.id = "ciudades";
    //   check-in
    const inputCheckIn = document.createElement("input");
    inputCheckIn.type = "date";
    //    check-out
    const inputCheckOut = document.createElement("input");
    inputCheckOut.type = "date";
    //    número de huespedes
    const inputHuespedes = document.createElement("input");
    inputHuespedes.type = "number";
    inputHuespedes.min = 1;
    //    Botón buscar
    const btnBuscar = document.createElement("button");
    btnBuscar.textContent = "Buscar";

    formularioContainer.appendChild(selectCiudades);
    formularioContainer.appendChild(inputCheckIn);
    formularioContainer.appendChild(inputCheckOut);
    formularioContainer.appendChild(inputHuespedes);
    formularioContainer.appendChild(btnBuscar);
    return {
      formularioContainer,
    };
  };

  const createCartSection = () => {
    const cartSection = document.createElement("div");
    const tituloCarrito = document.createElement("h2");
    tituloCarrito.textContent = "Carrito de Reservas";
    const listadoReservas = document.createElement("ul");
    const totalPrecio = document.createElement("p");
    totalPrecio.textContent = "Total: 0 €";
    const botonFinalizar = document.createElement("button");
    botonFinalizar.textContent = "Finalizar Reserva";

    cartSection.appendChild(tituloCarrito);
    cartSection.appendChild(listadoReservas);
    cartSection.appendChild(totalPrecio);
    cartSection.appendChild(botonFinalizar);

    return {
      cartSection,
    };
  };

  const getStars = (rating) => {
    const numStars = Math.floor(rating);
    return "⭐".repeat(numStars);
  };

  const loadCities = async (select) => {
    const hoteles = await fetching("http://localhost:3001/hoteles");
    const ciudades = [...new Set(hoteles.map((h) => h.city))];

    ciudades.forEach((c) => {
      const option = document.createElement("option");
      option.value = c;
      option.textContent = c;
      select.append(option);
    });
  };

  const hotelCards = (hoteles, results, search, cart) => {
    results.textContent = "";

    hoteles.forEach((hotel) => {
      const card = document.createElement("div");

      const name = document.createElement("h5");
      name.textContent = hotel.name;

      const city = document.createElement("p");
      city.textContent = hotel.city;

      const rating = document.createElement("p");
      rating.textContent = `${getStars(hotel.rating)} ${hotel.rating}/5`;

      const price = document.createElement("p");
      price.textContent = `${hotel.price_per_night} € / noche`;

      const amenities = document.createElement("ul");
      hotel.amenities.forEach((amenity) => {
        const li = document.createElement("li");
        li.textContent = amenity;
        amenities.appendChild(li);
      });

      card.appendChild(name);
      card.appendChild(city);
      card.appendChild(rating);
      card.appendChild(price);
      card.appendChild(amenities);

      card.addEventListener("click", () => {
        const reserva = document.createElement("li");
        reserva.textContent = `${hotel.name} - ${hotel.price_per_night} €`;
        cart.listadoReservas.appendChild(reserva);
      });

      results.appendChild(card);
    });
    return {
      results,
    };
  };

  const addToCart = (hotel, cart, search) => {
    const personas = Number(inputHuespedes.value);
    const total = hotel.price_per_night * personas;
    const base = (total / 1.21).toFixed(2);
    const iva = (total - base).toFixed(2);

    carrito.push({
      hotel: hotel.name,
      personas,
      total,
      base,
      iva,
    });

    updateCart(cart);
  };

  const updateCart = (cart) => {
    let totalCarrito = 0;
    cart.totalPrecio.textContent = `Total: ${totalCarrito.toFixed(2)} €`;

    carrito.forEach((item) => {
      totalCarrito += item.total;
      const li = document.createElement("li");
      li.textContent = `${item.hotel} - ${item.personas} personas - ${item.total} €`;
      cart.listadoReservas.appendChild(li);
    });

    cart.totalPrecio.textContent = `Total: ${totalCarrito.toFixed(2)} €`;
  };

  const performSearch = async (search, results, cart) => {
    try {
      const hoteles = await fetching("http://localhost:3001/hoteles");
      const hotelesFiltrados = hoteles.filter((hotel) => {
        return (
          hotel.city === ciudadSeleccionada &&
          hotel.available_rooms >= numeroHuespedes &&
          hotel.aviable_from <= fechaCheckIn &&
          hotel.aviable_to >= fechaCheckOut
        );
      });
      hotelCards(hotelesFiltrados, results, search, cart);
    } catch (error) {
      throw new Error("Error: ", error.message);
    }
  };

  const finishBooking = (cart) => {
    carrito = [];
    localStorage.removeItem("carrito");
    upfdateCart(cart);
  };

  const render = () => {
    const container = document.createElement("div");
    const main = document.createElement("main");
    const header = createHeader();
    const search = createSearchCard();
    const results = createResultsSection();
    const cart = createCartSection();

    // Eventos
    search.btnBuscar.addEventListener("click", () =>
      performSearch(search, results, cart)
    );
    cart.btnFinalizar.addEventListener("click", () => finishBooking(cart));

    loadCities(search.selectCiudades);

    main.append(search.section, results, cart.section);
    container.append(header, main);

    document.body.append(container);
  };
  return {
    render,
  };
}
