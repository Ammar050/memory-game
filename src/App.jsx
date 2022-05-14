import { useEffect, useState } from 'react'
import './App.css'

// componenets 
import SingleCard from './components/SingleCard'

const cardImages = [
    {src: '/img/helmet-1.png', matched: false }, 
    {src: '/img/potion-1.png', matched: false }, 
    {src: '/img/ring-1.png', matched: false }, 
    {src: '/img/scroll-1.png', matched: false }, 
    {src: '/img/shield-1.png', matched: false }, 
    {src: '/img/sword-1.png', matched: false }
]

function App() {

    const [ cards, setCards ] = useState([])
    const [ turns, setTurns ] = useState(0)
    const [ choiceOne, setChoiceOne ] = useState(null)
    const [ choiceTwo, setChoiceTwo ] = useState(null)
    const [ canClick, setCanclick ] = useState(true)

  // shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] 
    .sort(() => Math.random() - 0.5)
    .map(card => ({...card, id: Math.random()}))

    setCards(shuffledCards)
    setTurns(0)
    setChoiceOne(null)
    setChoiceTwo(null)
    setCanclick(true)
  }

  // handle the choice 
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare the choices
  const compareSelectedChoices = () => { 
    if(choiceOne && choiceTwo) {
      setCanclick(false)
      if( choiceOne.src === choiceTwo.src ) {
        makeMatched()
        resetChoices()
      } else {
        setTimeout(() => resetChoices(), 1000)
      }
    }
  }

  // make the matched property true
  const makeMatched = () => {
    const newCards = cards.map(card => {
      if(card.src === choiceOne.src || card.src === choiceTwo.src) {
        return {...card, matched: true}
      }
      return card
    })
    setCards(newCards)
  }

  // reset choices
  const resetChoices = () => { 
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(turns + 1)
    setCanclick(true)
  }

  // shuffle the cards on first render
  useEffect(() => {
    shuffleCards()
  }, [])

  // compare 2 selected cards
  useEffect(() => {
    compareSelectedChoices()
  }, [choiceOne, choiceTwo])


  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button> 
      <div className="cards">
        { cards.map( card => (
          <SingleCard 
            card={card} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched }
            canClick={canClick} 
            key={card.id} 
          />
        )) }
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
