import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';

const Register = ({setInfoToolTipPopupData}) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {email, password} = formValue;

    auth.register(email, password)
    .then((res) => {
      navigate('/signin', { replace: true });
      setInfoToolTipPopupData({state: "success", message: "Вы успешно зарегистрировались!"})
    })
    .catch((err) => {setInfoToolTipPopupData({state: "error", message: "Что-то пошло не так! Попробуйте еще раз."})});
  };

  return (
    <form onSubmit={handleSubmit} className="register__form">
      <div className="register__container">
        <h2 className="register__heading">Регистрация</h2>
        <input
          className="register__input"
          required
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
        />
        <input
          className="register__input"
          required
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
        />
        <button type="submit" className="register__button">
          Зарегистрироваться
        </button>
        
          <Link to="/signin" className="register__login-link">
          Уже зарегистрированы? Войти
          </Link>
        
      </div>
    </form>
  );
};

export default Register;
