import React from 'react';
import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [place, setPlace] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
      setPlace('');
      setUrl('');
    },
    [isOpen]);

  function onUpdateCardPlace(e) {
    setPlace(e.target.value);
  }

  function onUpdateCardUrl(e) {
    setUrl(e.target.value);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => {
        e.preventDefault();
        onAddPlace(place, url).then(()=> onClose()) 
      }}
    >
      <input
        id="place"
        className="pop-up__input pop-up__input_type_place"
        type="text"
        name="place"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={place}
        onChange={onUpdateCardPlace}
      />
      <span className="pop-up__error place-error"></span>
      <input
        id="url"
        className="pop-up__input pop-up__input_type_url"
        type="url"
        name="url"
        placeholder="Ссылка на картинку"
        required
        value={url}
        onChange={onUpdateCardUrl}
      />
      <span className="pop-up__error url-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
