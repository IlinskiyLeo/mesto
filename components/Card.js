function getPopupPhotoContent (cardsImageSrc, cardsDescriptionText) {
    popupPhotoImage.setAttribute('src', cardsImageSrc);
    popupPhotoImage.setAttribute('alt', cardsDescriptionText);
    popupPhotoDescription.textContent = cardsDescriptionText;
}
export default class Card {
constructor(data, templateSelector, imageHandler, cardData) {
    this._text = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._imageHandler = imageHandler;
    this._cardData = cardData;
    }

    _getTemplate () {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.cards__element')
        .cloneNode(true);

        return cardElement;
    }

    generateCard () {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.cards__image');

        this._image.src = this._link;
        this._element.querySelector('.cards__description').textContent = this._text;

        this._setEventListeners();

        return this._element; 
    } 

    _handleDeleteCard() {
        this._element.remove();
    }

    _like() {
        this._element.querySelector('.cards__like-button').classList.toggle('cards__like-button_active');
    }
    
    _setEventListeners() {
        this._image.addEventListener('click', ()=> {this._imageHandler(this._cardData)});
        this._element.querySelector('.cards__delete-button').addEventListener('click', ()=> {this._handleDeleteCard()});
        this._element.querySelector('.cards__like-button').addEventListener('click', ()=> {this._like()});
    }    
}