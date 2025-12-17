//-------------------------------
// OpenWeatherMap Helper Functions
//-------------------------------

const API_KEY_TIEMPO = import.meta.env.VITE_API_KEY_TIEMPO;
const VITE_API_URLTIEMPO = import.meta.env.VITE_API_URLTIEMPO;

//----------- VERSION 1 USANDO PROMISE ------------------

export function getWeatherDataPromise(city = "Granada") {
    const url = `${VITE_API_URLTIEMPO}?q=${city}&units=metric&lang=es&appid=${API_KEY_TIEMPO}`;
    // petición a una api de openweather
    return fetch(URL)
        .then(response => {
            if(!response.ok) throw new Error(`Error al traer los datos del tiempo: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log(`----------------- Clima de la ciudad ${city}-----------------`)
            console.log(`   -- Temperatura: ${data.main.temp} °C`);
            console.log(`   -- Humedad: ${data.main.humidity} %`);
            console.log(`   -- Viento: ${data.wind.speed} m/s`);
            const arrayImg = ['☀️', '⛅', '☁️', '🌦️'];
            const weather = data.weather[0].main;
            switch(weather) {
                case 'Clear':
                    console.log(`   -- Estado del cielo: ${arrayImg[0]} `);
                    break;
                case 'Clouds':
                    console.log(`   -- Estado del cielo: ${arrayImg[1]} `);
                    break;
                case 'Rain':
                    console.log(`   -- Estado del cielo: ${arrayImg[3]} `);
                    break;
                case 'Drizzle':
                    console.log(`   -- Estado del cielo: ${arrayImg[2]} `);
                    break;
                default:
                    console.log(`   -- Estado del cielo: 🌈 `);
            }
            return data;
        })
        .catch(error => console.error("Error....", error))
        .finally(()=> console.log("Cerrando getWeatherDataPromise"));
};