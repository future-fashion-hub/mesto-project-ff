import { deleteCardApi, setLikeApi } from "./api";

export const templateCard = document.querySelector('#card-template').content; 

export function createCard(cardData, deleteCard, likeCard, openImage, currentUserID) { 
    const card = templateCard.cloneNode(true); 
    const cardImage = card.querySelector('.card__image'); 
    const cardTitle = card.querySelector('.card__title');  
    const cardDeleteButton = card.querySelector('.card__delete-button');
    const cardLikeButton = card.querySelector('.card__like-button');
    const cardLikeContent = card.querySelector('.card__like-content');
   
    cardImage.src = cardData.link; 
    cardImage.alt = cardData.name; 
    cardTitle.textContent = cardData.name;
    cardLikeContent.textContent = String(cardData.likes.length);
    cardImage.addEventListener('click', openImage);
    cardLikeButton.addEventListener('click', () => {
        likeCard(cardLikeButton, cardData._id, cardLikeContent);
    })

    const userHasLiked = cardData.likes.some(like => like._id === currentUserID)
	if (userHasLiked) {
		cardLikeButton.classList.add('card__like-button_is-active')
	}

    if (currentUserID === cardData.owner._id) {
        cardDeleteButton.addEventListener('click', () => deleteCard(cardDeleteButton, cardData._id)); 
    } else {
        cardDeleteButton.remove()
    }
    
    return card; 
}; 


export function likeCard (likeButton, cardID, likeCounter) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    
    setLikeApi(cardID, isLiked)
    .then((res) => {
        likeButton.classList.toggle('card__like-button_is-active')
        likeCounter.textContent = res.likes.length
    }) 
    .catch((err) => console.log(err))
}

export function removeCard(item, cardID) { 
    deleteCardApi(cardID)
    .then(() => {
        const listItem = item.closest('.places__item'); 
        listItem.remove();
    })
    .catch(err => console.log(err))
}; 