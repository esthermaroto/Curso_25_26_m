import crearEjercicio132 from "./helpers/13chatgpt";
import crearEjercicio12 from "./helpers/ejercicio12";
import crearEjercicio13 from "./helpers/ejercicio13";
import crearEjercicio14 from "./helpers/ejercicio14";
import createEjercicio3 from "./helpers/ejercicio3"
import createEjercicio4 from "./helpers/ejercicio4"
import createEjercicioRickMorty from "./helpers/ejercicioRickMorty"


export default function createApp() {
  const appDiv = document.getElementById('app')
  //appDiv.appendChild(createEjercicio3().render())
  // appDiv.appendChild(createEjercicio4().render())
  //appDiv.appendChild(createEjercicioRickMorty().render())
  // appDiv.appendChild(crearEjercicio13().render());
  // appDiv.appendChild(crearEjercicio132().render())
  appDiv.appendChild(crearEjercicio14().render())
}