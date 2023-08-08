import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ route, userEmail, setUserEmail, setLoggedIn }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <div className="userData">
        {route === '/signin' ? (
          <Link to="/signup" className="register__login-link">
            Регистрация
          </Link>
        ) : route === '/signup' ? (
          <Link to="/signin" className="register__login-link">
            Войти
          </Link>
        ) : (
          userEmail && (
            <div className="header__email-sign-out-button-container">
              <div className="header__email">{userEmail.email}</div>
              <button
                className="header__sign-out-button"
                onClick={() => {setLoggedIn(false); localStorage.removeItem('jwt'); setUserEmail(null)}}
              >
                Выйти
              </button>
            </div>
          )
        )}
      </div>
    </header>
  );
}

export default Header;
