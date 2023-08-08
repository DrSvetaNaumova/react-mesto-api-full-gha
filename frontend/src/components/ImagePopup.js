import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`pop-up ${card ? 'pop-up_opened' : ''} pop-up_type_image`}
      onClick={onClose}
    >
      <div
        className="pop-up__container pop-up__container_type_image"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          className="pop-up__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="pop-up__image"
          src={card ? card.link : ''}
          alt={card ? card.name : ''}
        />
        <h2 className="pop-up__description">{card ? card.name : ''}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
