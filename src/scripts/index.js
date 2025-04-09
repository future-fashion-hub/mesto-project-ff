import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, likeCard, removeCard } from './card.js';
import { openImage, openPopup, closePopup, closeOverlay} from './modal.js';


const cardList = document.querySelector('.places__list'); 
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const editCloseButton = editPopup.querySelector('.popup__close');
const addPopup = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const addCloseButton = addPopup.querySelector('.popup__close');
export const imageTypePopup = document.querySelector('.popup_type_image');
const imageCloseButton = imageTypePopup.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const formNewPlace = document.querySelector('form[name="new-place"]')
const cardNameInput = formNewPlace.querySelector('.popup__input_type_card-name');
const cardLinkInput = formNewPlace.querySelector('.popup__input_type_url');

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closePopup(editPopup);
}

formElement.addEventListener('submit', handleFormSubmit); 

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  initialCards.unshift({name: cardNameInput.value, link: cardLinkInput.value});
  const newPlaceCard = createCard(initialCards[0], removeCard, likeCard, openImage);
  cardList.prepend(newPlaceCard);
  closePopup(addPopup);
  cardNameInput.value = '';
  cardLinkInput.value = '';
}

formNewPlace.addEventListener('submit', handleFormAddCardSubmit)

initialCards.forEach(item => { 
  const newCard = createCard(item, removeCard, likeCard, openImage); 
  cardList.appendChild(newCard); 
}); 

editButton.addEventListener('click', () => {
  openPopup(editPopup)
})

editCloseButton.addEventListener('click', () => {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  closePopup(editPopup)
})

addButton.addEventListener('click', () => {
  openPopup(addPopup)
})

addCloseButton.addEventListener('click', () => {
  closePopup(addPopup)
})

imageCloseButton.addEventListener('click', () => {
  closePopup(imageTypePopup)
})

editPopup.addEventListener('click', (evt) => {
  closeOverlay(editPopup, evt)
})

addPopup.addEventListener('click', (evt) => {
  closeOverlay(addPopup, evt)
})

imageTypePopup.addEventListener('click', (evt) => {
  closeOverlay(imageTypePopup, evt)
})

nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;