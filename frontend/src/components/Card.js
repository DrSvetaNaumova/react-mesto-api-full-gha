import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext'; 

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext); 
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);

  return (
    <article className="elements__element">
      <img
        className="elements__image"
        src={card.link}
        alt={card.name}
        onClick={() => {
          onCardClick(card);
        }} //={setSelectedCard(card)}
      />
      {isOwn && (
        <button
          className="elements__trash-button"
          type="button"
          onClick={() => onCardDelete(card)}
        />
      )}
      <div className="elements__description-like">
        <h2 className="elements__description">{card.name}</h2>
        <div className="elements__like-counter-container">
          <button
            className={`elements__like ${isLiked && 'elements__like_checked'}`}
            type="button"
            onClick={() => onCardLike(card)}
          />
          <span className="elements__likes-counter" id="counter">
            {card.likes.length}
          </span>
        </div>
      </div>
    </article>
  );
}

export default Card;
