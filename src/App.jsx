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
    const [ turns, setTurns ] = useState(0)
    const [ choiceOne, setChoiceOne ] = useState(null)
    const [ choiceTwo, setChoiceTwo ] = useState(null)

  // shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] 
    .sort(() => Math.random() - 0.5)
    .map(card => ({...card, id: Math.random()}))

    setCards(shuffledCards)
    setTurns(0)
  }

  // handle the choice 
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare the choices
  const compareSelectedChoices = () => { 
    if(choiceOne && choiceTwo) {
      choiceOne.src === choiceTwo.src ? console.log('match') : console.log('no match')
      resetChoices()
    }
  }

  // reset choices
  const resetChoices = () => { 
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(turns + 1)
  }

  // call the compareSelectedChoicesfunction to check if the cards match
  useEffect(() => {
    compareSelectedChoices()
  }, [choiceOne, choiceTwo])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <h3>{turns}</h3>
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
