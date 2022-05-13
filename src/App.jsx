import { useEffect, useState } from 'react'
import './App.css'

const cardImages = [
    {src: '/img/helmet-1.png' }, 
    {src: '/img/potion-1.png' }, 
    {src: '/img/ring-1.png' }, 
    {src: '/img/scroll-1.png' }, 
    {src: '/img/shield-1.png' }, 
    {src: '/img/sword-1.png' }
]

function App() {

    const [ cards, setCards ] = useState([])
    const [ turn, setTurn ] = useState(0)

  // shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] 
    .sort(() => Math.random() - 0.5)
    .map(card => ({...card, id: Math.random()}))

    setCards(shuffledCards)
    setTurn(0)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      
      <div className="cards">
        { cards.map( card => (
          <div className="card" key={card.id}> 
            <div>
              <img src={card.src} alt="card front" className="image-front" />
              <img src="/img/cover.png" alt="card back" className="image-back" />
            </div>
          </div>
        )) }
      </div>
    </div>
  );
}

export default App;
