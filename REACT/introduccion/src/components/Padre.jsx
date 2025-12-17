import React from 'react'

const Padre = ({ saludo, datos }) => {
  return (
    <div>Padre {saludo}
    <p>Nombre: {datos.nombre}, Edad: {datos.edad}</p>
    </div>
  )
}

export default Padre