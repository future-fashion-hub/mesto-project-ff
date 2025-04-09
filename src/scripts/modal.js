export const imagePopup = document.querySelector('.popup__image');
export const captionPopup = document.querySelector('.popup__caption');
import { imageTypePopup } from "./index.js";

export function openImage (evt) {
    openPopup(imageTypePopup)
    if (evt.target.classList.contains('card__image')) {
      imagePopup.src = evt.target.src;
      captionPopup.textContent = evt.target.alt;
    }
}

export function openPopup(item) {
    item.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc)
}
  
export function closePopupEsc(evt) {
    if (evt.key === "Escape") {
      closePopup(document.querySelector('.popup_is-opened'))
    }
}
  
export function closePopup(item) {
    item.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc)
}
  
export function closeOverlay(item, evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(item)
    }
}