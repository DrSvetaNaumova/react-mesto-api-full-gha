import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function onUpdateUserName(e) {
    setName(e.target.value);
  }

  function onUpdateUserDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="login"
        className="pop-up__input pop-up__input_type_name"
        type="text"
        name="login"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={name || ''}
        onChange={onUpdateUserName}
      />
      <span className="pop-up__error login-error"></span>
      <input
        id="profession"
        className="pop-up__input pop-up__input_type_profession"
        type="text"
        name="profession"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        value={description || ''}
        onChange={onUpdateUserDescription}
      />
      <span className="pop-up__error profession-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;