import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Padre from './components/Padre'
import Hijo from './components/Hijo'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)
  const [like, setLike] = useState("🤍")

  const handleToggleLike = () => {
    like === "🤍" ? setLike("❤️") : setLike("🤍")
  }

  const countStars = (num) => {
    let stars = ""
    for (let i = 0; i < num; i++) {
      stars += "⭐"
    }
    if (count.length +1 === 5) {
      stars = "All stars collected! 🌟🌟🌟🌟🌟"
    }
    return stars
  }

  

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(countStars(count.length + 1))}>
          {count || "Click to add stars!"}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <button onClick={handleToggleLike}>{like}
      </button>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Padre saludo="Hola que tal" datos={{nombre: "Esther", edad: 30}}> 
        <Hijo />
      </Padre>

      <Card datos={{src: "public/foto_rata.JPG" , texto: "Imagen 1"}} />
      

    </>
  )
}

export default App
