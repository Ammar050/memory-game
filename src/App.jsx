import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import './App.css'

// componenets 
import SingleCard from './components/SingleCard'

const cardImages = [
    {src: './img/helmet-1.png', matched: false }, 
    {src: './img/potion-1.png', matched: false }, 
    {src: './img/ring-1.png', matched: false }, 
    {src: './img/scroll-1.png', matched: false }, 
    {src: './img/shield-1.png', matched: false }, 
    {src: './img/sword-1.png', matched: false }
]

function App() {

    const [ cards, setCards ] = useState([])
    const [ turns, setTurns ] = useState(0)
    const [ choiceOne, setChoiceOne ] = useState(null)
    const [ choiceTwo, setChoiceTwo ] = useState(null)
    const [ canClick, setCanclick ] = useState(true)
    const [ celebration, setCelebration ] = useState(false)
    const [ height, setHeight ] = useState(null)
    const [ width, setWidth ] = useState(null)
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
    setCelebration(false)
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
    checkIfAllMatched(newCards)
  }

  // reset choices
  const resetChoices = () => { 
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(turns + 1)
    setCanclick(true)
  }

  // check if all cards are matched
  const checkIfAllMatched = (newCards) => { 
    const allMatched = newCards.every(card => card.matched)
    if(allMatched) {
      let realTurns = turns + 1
      if(realTurns === 6 || realTurns === 7 || realTurns === 8) {
        setWidth(document.body.clientWidth)
        setHeight(window.screen.height)
        setCelebration(true)
      }
    }
   }

  // shuffle the cards on first render
  useEffect(() => {
    shuffleCards()
  }, [])

  // compare 2 selected cards
  useEffect(() => {
    compareSelectedChoices()
  }, [choiceTwo])


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
      { celebration && 
        <Confetti
        width={width}
        height={height}
        numberOfPieces={500}
        />
      }
    </div>
  );
}

export default App;
