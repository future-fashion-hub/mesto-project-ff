// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
  const card = templateCard.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardDeleteButton = card.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;


  cardDeleteButton.addEventListener('click', () => deleteCard(cardDeleteButton));
  return card;
};
// @todo: Функция удаления карточки
function removeCard(item) {
  const listItem = item.closest('.places__item');
  listItem.remove();
};
// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
  const newCard = createCard(item, removeCard);
  cardList.appendChild(newCard);
});

