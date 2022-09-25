export default class Card {
constructor(data, templateSelector, imageHandler) {
    this._data = data;
    this._text = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._imageHandler = imageHandler;
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
        this._likeButton = this._element.querySelector('.cards__like-button');

        this._image.src = this._link;
        this._image.alt = this._text;
        this._element.querySelector('.cards__description').textContent = this._text;

        this._setEventListeners();

        return this._element; 
    } 

    _handleDeleteCard() {
        this._element.remove();
    }

    _like() {
        this._likeButton.classList.toggle('cards__like-button_active');
    }
    
    _setEventListeners() {
        this._image.addEventListener('click', ()=> {this._imageHandler(this._data)});
        this._element.querySelector('.cards__delete-button').addEventListener('click', ()=> {this._handleDeleteCard()});
        this._likeButton.addEventListener('click', ()=> {this._like()});
    }    
}