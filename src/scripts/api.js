const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
	headers: {
		authorization: 'a8aa3816-5f2c-4212-b240-0f7e0bd2dc86',
  }
}

export const getUserInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  })
}

export const getCardList = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
}

export const uploadUserInformation = (profileName, profileAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profileName,
      about: profileAbout
    })
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
}

export const uploadCardList = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
}

export const deleteCardApi = (cardID) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
    }
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
}

export const setLikeApi = (cardID, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: {
      authorization: config.headers.authorization,
    }
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
}

export const uploadUserAvatar = (profileAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: profileAvatar
    })
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
}