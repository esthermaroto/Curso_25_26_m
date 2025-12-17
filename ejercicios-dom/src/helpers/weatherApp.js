/*
1) crear una función getWeatherByCity(cityName){
    que devuelva data en json
}

2) crear una función llamada parseWeatherData(data){
    que devuelva:
    city,pais,temperatura,humedad,viento,descripción
}

 */

import fetching from "../utils/feching"

const URL_WEATHER = import.meta.env.VITE_URL_WEATHER
const API_WEATHER = import.meta.env.VITE_API_WEATHER

const getWeatherByCity = async (cityName)=>{
    try{
    const data = await fetching(`${URL_WEATHER}?q=${cityName}&appid=${API_WEATHER}&lang=es`)
    return data
    }catch(error){
        return console.error("Error fetching:", error.message);
    }
}

const parseWeatherData = (data) => {
    if (!data) return null;
    return {
        city: data.name,
        country: data.sys?.country,
        temperature: Math.round(data.main?.temp - 273.15),
        humidity: data.main?.humidity,
        wind: data.wind?.speed,
        description: data.weather?.[0]?.description
    }

}
