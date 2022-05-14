import './SingleCard.css'

const SingleCard = ({ card, handleChoice, flipped, canClick }) => {
    
    const handleClick = () => {
        if(canClick) {
            handleChoice(card)
        }
    }

    return ( 
        <div className="card"> 
            <div className={ flipped && 'flipped'}>
              <img src={card.src} alt="card front" className="image-front" />
              <img 
                src="/img/cover.png" 
                alt="card back" 
                className={`image-back ${!canClick && 'unclickable'}`}
                onClick={handleClick} 
              />
            </div>
          </div>
     )
}
 
export default SingleCard;