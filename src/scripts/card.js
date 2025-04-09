export const templateCard = document.querySelector('#card-template').content; 

export function createCard(cardData, deleteCard, likeCard, openImage) { 
    const card = templateCard.cloneNode(true); 
    const cardImage = card.querySelector('.card__image'); 
    const cardTitle = card.querySelector('.card__title'); 
    const cardDeleteButton = card.querySelector('.card__delete-button'); 
    const cardLikeButton = card.querySelector('.card__like-button');
   
    cardImage.src = cardData.link; 
    cardImage.alt = cardData.name; 
    cardTitle.textContent = cardData.name; 
  
    cardImage.addEventListener('click', openImage);
    cardLikeButton.addEventListener('click', likeCard)
    cardDeleteButton.addEventListener('click', () => deleteCard(cardDeleteButton)); 
    
    return card; 
}; 


export function likeCard (evt) {
    evt.target.classList.toggle('card__like-button_is-active')
}

export function removeCard(item) { 
    const listItem = item.closest('.places__item'); 
    listItem.remove(); 
}; 