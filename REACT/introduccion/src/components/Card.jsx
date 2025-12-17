import React from 'react'

const Card = ({ datos }) => {


  return (
    <div>
        <img src={datos.src} alt="foto" />
        <p>{datos.texto}</p>
    </div>
  )
}

export default Card