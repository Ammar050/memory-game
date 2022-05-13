import { useEffect, useState } from 'react'
import './App.css'

// componenets 
import SingleCard from './components/SingleCard'

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
    const [ choiceOne, setChoiceOne ] = useState(null)
    const [ choiceTwo, setChoiceTwo ] = useState(null)

  // shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] 
    .sort(() => Math.random() - 0.5)
    .map(card => ({...card, id: Math.random()}))

    setCards(shuffledCards)
    setTurn(0)
  }

  // handle the choice 
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // shuffle the cards on first render
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      
      <div className="cards">
        { cards.map( card => (
          <SingleCard 
            card={card} 
            handleChoice={handleChoice} 
            key={card.id} 
          />
        )) }
      </div>
    </div>
  );
}

export default App;
