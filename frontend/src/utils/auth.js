const { NODE_ENV } = process.env;

export let BASE_URL;
if (NODE_ENV === 'production') {
  BASE_URL = 'https://api.drsvetanaumova.nomoreparties.co';
} else {
  BASE_URL = 'http://localhost:3000';
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((response) =>
    response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`)
  );
};
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((response) =>
    response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`)
  );
};
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) =>
    response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`)
  );
};
