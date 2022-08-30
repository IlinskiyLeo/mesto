import { checkKeydownEvent } from "./index.js";

const popupPhoto = document.querySelector(".popup-photo");
const popupPhotoImage = document.querySelector('.popup-photo__image');
const popupPhotoDescription = document.querySelector('.popup-photo__description');

export default class Card {
constructor(data, templateSelector) {
    this._text = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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

        this._element.querySelector('.cards__image').src = this._link;
        this._element.querySelector('.cards__description').textContent = this._text;

        this._setEventListeners();

        return this._element; 
    } 

    _handleOpenPopup() {
        popupPhotoImage.src = this._link;
        popupPhoto.classList.add('popup__opened');
        document.addEventListener("keydown", checkKeydownEvent);
        popupPhotoDescription.textContent = this._text;
    }
    
    _handleClosePopup() {
        popupPhotoImage.src = '';
        popupPhoto.classList.remove('popup__opened');
        popupPhotoDescription.textContent = '';
    }

    _handleDeleteCard() {
        this._element.remove();
    }

    _like() {
        this._element.querySelector('.cards__like-button').classList.toggle('cards__like-button_active');
    }
    
    _setEventListeners() {
        this._element.querySelector('.cards__image').addEventListener('click', ()=> {this._handleOpenPopup()});
        this._element.querySelector('.cards__delete-button').addEventListener('click', ()=> {this._handleDeleteCard()});
        this._element.querySelector('.cards__like-button').addEventListener('click', ()=> {this._like()});
    }    
}