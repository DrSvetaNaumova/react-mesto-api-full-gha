import React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Register from './Register';
import Login from './Login';
import * as auth from '../utils/auth.js';
import Infotooltip from './Infotooltip';

import CurrentUserContext from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import api from '../utils/Api';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [serverCards, setServerCards] = useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwt'));

  const [infoToolTipPopupData, setInfoToolTipPopupData] = useState(null);

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setLoggedIn(true)
          }
        })
        .catch((error) => setLoggedIn(false));
    }
  };

  useEffect(() => {
    handleTokenCheck();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
   loggedIn && Promise.all([api.getUserInfo(jwt), api.getServerCards(jwt)])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setServerCards(cards);
        setUserEmail(user);
      })
      .catch((error) => console.log('ошибка загрузки профиля и карточек'));
  }, [loggedIn]);


  function handleUpdateUser(data) {
    const jwt = localStorage.getItem('jwt');
    api
      .replaceUserInfo(data.name, data.about, jwt)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((error) => console.log('ошибка редактирования профиля'));
  }

  function handleUpdateAvatar(data) {
    const jwt = localStorage.getItem('jwt');
    return api
      .replaceAvatar(data.avatar, jwt)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((error) => console.log('ошибка редактирования аватара'));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const jwt = localStorage.getItem('jwt');
    if (isLiked) {
      api
        .deleteLike(card._id, jwt)
        .then((newCard) => {
          setServerCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
          return Promise.reject('ошибка удаления лайка карточки');
        });
    } else {
      api
        .addLike(card._id, jwt)
        .then((newCard) => {
          setServerCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
          return Promise.reject('ошибка добавления лайка карточки');
        });
    }
  }

  function handleDeleteClick(card) {
    const jwt = localStorage.getItem('jwt');
    api
      .deleteCard(card._id, jwt)
      .then(() => {
        setServerCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject('ошибка удаления карточки');
      });
  }

  function handleAddPlaceSubmit(place, link) {
    const jwt = localStorage.getItem('jwt');
    return api
      .addNewCard(place, link, jwt)
      .then((newCard) => setServerCards([newCard, ...serverCards]))
      .catch((err) => {
        console.log(err);
        return Promise.reject('ошибка добавления карточки');
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  <Header
                    route="/signup"
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                  />
                  <Register setInfoToolTipPopupData={setInfoToolTipPopupData} />
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <>
                  <Header
                    route="/signin"
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                  />
                  <Login
                    setInfoToolTipPopupData={setInfoToolTipPopupData}
                    handleLogin={() => {
                      setLoggedIn(true);
                    }}
                  />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Header
                    route="/"
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    setLoggedIn={setLoggedIn}
                  />
                  <ProtectedRoute
                    element={Main}
                    onEditProfile={() => setIsEditProfilePopupOpen(true)}
                    onAddPlace={() => setIsAddPlacePopupOpen(true)}
                    onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                    onCardClick={setSelectedCard}
                    cards={serverCards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteClick}
                    loggedIn={loggedIn}
                  />
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <Header
                    route="/signin"
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                  />
                  <Login
                    setInfoToolTipPopupData={setInfoToolTipPopupData}
                    handleLogin={() => setLoggedIn(true)}
                  />
                </>
              }
            />
          </Routes>

          <Footer />
          <Infotooltip
            infoToolTipPopupData={infoToolTipPopupData}
            setInfoToolTipPopupData={setInfoToolTipPopupData}
          />
          <ImagePopup
            card={selectedCard}
            onClose={() => {
              setSelectedCard(null);
            }}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
