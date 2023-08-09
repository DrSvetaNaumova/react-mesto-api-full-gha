class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //проверка ответа сервера
  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    }
    return res;
  }

  // получить данные пользователя (GET)
  getUserInfo(token) {
    const promise = fetch(this._baseUrl + '/users/me', {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      }
    })
      .then(this._checkResponse)
      .then((res) => res.json());
    return promise;
  }

  // заменить текстовые данные пользователя (PATCH)
  replaceUserInfo(name, about, token) {
    const promise = fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then(this._checkResponse)
      .then((res) => res.json());
    return promise;
  }

  // заменить аватар пользователя (PATCH)
  replaceAvatar(avatar, token) {
    const promise = fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar,
      }),
    })
      .then(this._checkResponse)
      .then((res) => res.json());
    return promise;
  }

  //получить массив карточек с сервера
  getServerCards(token) {
    const promise = fetch(this._baseUrl + '/cards', {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      }
    })
      .then(this._checkResponse)
      .then((res) => res.json())
      .then((data) => data.data)
      
    return promise;
  }
  //добавить новую карточку
  addNewCard(name, link, token) {
    const promise = fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._checkResponse)
      .then((res) => res.json())
      .then((data) => data.data)
    return promise;
  }
  // удалить карточку (DELETE)
  deleteCard(cardID, token) {
    const promise = fetch(this._baseUrl + '/cards/' + cardID, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      }
    }).then(this._checkResponse);
    return promise;
  }

  // “залайкать” карточку (PUT)
  addLike(cardID, token) {
    const promise = fetch(this._baseUrl + '/cards/' + cardID + '/likes', {
      method: 'PUT',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      }
    })
      .then(this._checkResponse)
      .then((res) => res.json());
    return promise;
  }

  // удалить лайк карточки (DELETE)
  deleteLike(cardID, token) {
    const promise = fetch(this._baseUrl + '/cards/' + cardID + '/likes', {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      }
    })
      .then(this._checkResponse)
      .then((res) => res.json());
    return promise;
  }
}

const api = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  // baseUrl: 'http://localhost:3000',
  baseUrl: 'https://drsvetanaumova.nomoreparties.co',
  headers: {
    // authorization: 'e5c7629d-174e-499d-9501-41f48afec7e6',
    'Content-Type': 'application/json',
  },
});

export default api;
