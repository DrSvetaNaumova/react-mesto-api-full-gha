import React from 'react';

function PopupWithForm({ title, name, buttonText, children, isOpen, onClose, onSubmit }) {
  return (
    <section
      className={`pop-up ${isOpen ? 'pop-up_opened' : ''} pop-up_type_${name}`}
      onClick={onClose}
    >
      <div
        className={`pop-up__container pop-up__container_type_${name}`}
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          className="pop-up__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="pop-up__heading">{title}</h2>
        <form
          name={`form-type-${name}`}
          className={`pop-up__form pop-up__form_type_${name}`}
          // noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`pop-up__save-button pop-up__save-button_type_${name}`}
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
