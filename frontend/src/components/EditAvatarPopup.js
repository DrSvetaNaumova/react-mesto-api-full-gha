import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    }).then(()=> {avatarRef.current.value=''});  //очищение формы только при положительном ответе сервера
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={() => {onClose(); avatarRef.current.value=''}}
      onSubmit={(data) => {handleSubmit(data)}}
    >
      <input
        id="avatar"
        className="pop-up__input pop-up__input_type_avatar"
        type="url"
        name="avatar"
        placeholder="https://somewebsite.com/someimage.jpg"
        required
        ref={avatarRef}
      />
      <span className="pop-up__error avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
