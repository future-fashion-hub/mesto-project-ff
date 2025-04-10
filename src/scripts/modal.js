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

export function closeOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget)
  }
}