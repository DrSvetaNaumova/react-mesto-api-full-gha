import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';

const Login = ({ handleLogin, setInfoToolTipPopupData }) => {
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
    if (!email || !password) {
      return;
    }
    auth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
       localStorage.setItem('jwt', data.token);// token - из ответа сервера
          setFormValue({ email: '', password: '' });
          // handleLogin(formValue.email);
          handleLogin();
          navigate('/', { replace: true });
      })
      .catch((err) => {setInfoToolTipPopupData({state: "error", message: "Что-то пошло не так! Попробуйте еще раз."})});
  };

  return (
    <form onSubmit={handleSubmit} className="login__form">
      <div className="login__container">
      <h2 className="login__heading">Вход</h2>
        <input
          className="login__input"
          required
          id="email"
          name="email"
          type="text"
          placeholder='Email'
          value={formValue.email}
          onChange={handleChange}
        />
        <input
        className="login__input"
          required
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
        />
        <button type="submit" className="login__button">
          Войти
        </button>
        </div>
      </form>
    
  );
};

export default Login;
