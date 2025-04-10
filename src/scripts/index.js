import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, likeCard, removeCard } from './card.js';
import { openPopup, closePopup, closeOverlay} from './modal.js';


const cardList = document.querySelector('.places__list'); 
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const editCloseButton = editPopup.querySelector('.popup__close');
const addPopup = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const addCloseButton = addPopup.querySelector('.popup__close');
const imageTypePopup = document.querySelector('.popup_type_image');
const imageCloseButton = imageTypePopup.querySelector('.popup__close');
const imagePopup = document.querySelector('.popup__image');
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const formNewPlace = document.querySelector('form[name="new-place"]')
const cardNameInput = formNewPlace.querySelector('.popup__input_type_card-name');
const cardLinkInput = formNewPlace.querySelector('.popup__input_type_url');
const captionPopup = document.querySelector('.popup__caption');
const newCardsArray = [];

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault(); 
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closePopup(editPopup);
}

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit); 

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  newCardsArray.unshift({name: cardNameInput.value, link: cardLinkInput.value});
  const newPlaceCard = createCard(newCardsArray[0], removeCard, likeCard, openImage);
  cardList.prepend(newPlaceCard);
  closePopup(addPopup);
  formNewPlace.reset();
}

function openImage (evt) {
  openPopup(imageTypePopup)
  imagePopup.src = evt.target.src;
  imagePopup.alt = evt.target.alt;
  captionPopup.textContent = evt.target.alt;
}

formNewPlace.addEventListener('submit', handleFormAddCardSubmit)

initialCards.forEach(item => { 
  const newCard = createCard(item, removeCard, likeCard, openImage); 
  cardList.appendChild(newCard); 
}); 

editButton.addEventListener('click', () => {
  openPopup(editPopup);
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
})

editCloseButton.addEventListener('click', () => {
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

editPopup.addEventListener('click', closeOverlay)

addPopup.addEventListener('click', closeOverlay)

imageTypePopup.addEventListener('click', closeOverlay)
