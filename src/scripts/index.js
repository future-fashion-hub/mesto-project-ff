import '../pages/index.css';
import { createCard, likeCard, removeCard } from './card.js';
import { openPopup, closePopup, closeOverlay } from './modal.js'; 
import { enableValidation, clearValidation } from './validation.js';
import { getCardList, getUserInformation, uploadUserInformation, uploadCardList, uploadUserAvatar } from './api.js'

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
const formNewPlace = document.querySelector('form[name="new-place"]');
const cardNameInput = formNewPlace.querySelector('.popup__input_type_card-name');
const cardLinkInput = formNewPlace.querySelector('.popup__input_type_url');
const captionPopup = document.querySelector('.popup__caption');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const avatar = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_new-avatar');
const avatarCloseButton = avatarPopup.querySelector('.popup__close');
const formNewAvatar = document.querySelector('form[name="new-avatar"]');
const avatarLinkInput = formNewAvatar.querySelector('.popup__input_type_url');

let currentUserID = null;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault(); 
  renderLoading(formEditProfile, true);
  uploadUserInformation(nameInput.value, jobInput.value)
    .then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      closePopup(editPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(formEditProfile, false)
    })
}

function handleFormEditAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(formNewAvatar, true);
  uploadUserAvatar(avatarLinkInput.value)
    .then((profileAvatar) => {
      avatar.style.backgroundImage = `url(${profileAvatar.avatar})`;
      formNewAvatar.reset();
      closePopup(avatarPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(formNewAvatar, false)
    })
}

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(formNewPlace, true);
  uploadCardList(cardNameInput.value, cardLinkInput.value)
    .then((cardData) => {
      const newCardData = {_id: cardData._id,
                            name: cardData.name,
                            link: cardData.link,
                            likes: cardData.likes,
                            owner: cardData.owner};
      const newPlaceCard = createCard(newCardData, removeCard, likeCard, openImage, currentUserID);
      cardList.prepend(newPlaceCard);
      closePopup(addPopup);
      formNewPlace.reset();
    })
    .catch(err => console.log(err))
    .finally(() => {
      renderLoading(formNewPlace, false)
    })
}

function openImage (evt) {
  openPopup(imageTypePopup)
  imagePopup.src = evt.target.src;
  imagePopup.alt = evt.target.alt;
  captionPopup.textContent = evt.target.alt;
}

editButton.addEventListener('click', () => {
  clearValidation(editPopup, validationConfig);
  openPopup(editPopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
})
addButton.addEventListener('click', () => {
  formNewPlace.reset();
  clearValidation(addPopup, validationConfig);
  openPopup(addPopup);
})
avatar.addEventListener('click', () => {
  formNewAvatar.reset()
  clearValidation(addPopup, validationConfig);
  openPopup(avatarPopup);
})

editCloseButton.addEventListener('click', () => {
  closePopup(editPopup)
})
addCloseButton.addEventListener('click', () => {
  closePopup(addPopup)
})
imageCloseButton.addEventListener('click', () => {
  closePopup(imageTypePopup)
})
avatarCloseButton.addEventListener('click', () => {
  closePopup(avatarPopup);
})

editPopup.addEventListener('click', closeOverlay);
addPopup.addEventListener('click', closeOverlay);
imageTypePopup.addEventListener('click', closeOverlay);
avatarPopup.addEventListener('click', closeOverlay);

Promise.all([getUserInformation(), getCardList()])
  .then(([userData, cardsData]) => {
    currentUserID = userData._id
    document.querySelector('.profile__title').textContent = userData.name;
    document.querySelector('.profile__description').textContent = userData.about;
    avatar.style.backgroundImage = `url(${userData.avatar})`;

    cardsData.forEach(item => { 
      const newCard = createCard(item, removeCard, likeCard, openImage, currentUserID);
      cardList.appendChild(newCard); 
    })
  })
  .catch((err) => console.log(err))

const renderLoading = (formElement, isLoading) => {
  const buttonElement = formElement.querySelector('.popup__button')
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить';
  }
}

formNewPlace.addEventListener('submit', handleFormAddCardSubmit);
formEditProfile.addEventListener('submit', handleFormEditProfileSubmit); 
formNewAvatar.addEventListener('submit', handleFormEditAvatarSubmit);
enableValidation(validationConfig);