import './SingleCard.css'

const SingleCard = ({ card, handleChoice, flipped }) => {
    return ( 
        <div className="card"> 
            <div className={ flipped && 'flipped'}>
              <img src={card.src} alt="card front" className="image-front" />
              <img 
                src="/img/cover.png" 
                alt="card back" 
                className="image-back"
                onClick={() => handleChoice(card)} 
              />
            </div>
          </div>
     )
}
 
export default SingleCard;