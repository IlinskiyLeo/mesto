import Card from './Card.js'
import FormValidator from './FormValidator.js';

const profile = document.querySelector('.profile');
const buttonEdit = profile.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const textName = profile.querySelector('.profile__name');
const textAbout = profile.querySelector('.profile__about');
const inputAbout = document.querySelector('#popup__input-about');
const inputName = document.querySelector('#popup__input-name');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupPhoto = document.querySelector('.popup-photo');
const popupPhotoImage = document.querySelector('.popup-photo__image');
const popupPhotoDescription = document.querySelector('.popup-photo__description');
const popups = document.querySelectorAll('.popup');
const cards = document.querySelector('.cards');
let activePopup = document.querySelector('.popup__opened');

const cardsInitial = [ // каждый ревьюер по разному говорит называть эту константу, я устал переименовывать ее, раньше она называлась initialCards.
  {
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationSettings = {
  formSelector: '.popup__form',
  fieldsetSelector: '.popup__fieldset',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__span-error_active',
};

const formAddValidation = new FormValidator (validationSettings, popupAdd.querySelector('.popup__form'));
const formEditValidation = new FormValidator (validationSettings, popupEdit.querySelector('.popup__form'));


const validateForms = () => {
    formAddValidation.enableValidation();
    formEditValidation.enableValidation();
}

validateForms();

const validateFormsDisable = (popup) => {
  if (popup === popupAdd) {
    formAddValidation.resetValidation();
  } else {
    formEditValidation.resetValidation();
  }
}

const body = document.querySelector('body');

function removePopupClass(evt) {
  evt.target.classList.remove('popup__opened');
}



const checkKeydownEvent = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
}

const openPopup = (popup) => {
  activePopup = popup;
  document.addEventListener('keydown', checkKeydownEvent);
  popup.addEventListener('click', removePopupClass);
  popup.classList.add('popup__opened');
  body.classList.add('page_no-scroll');
}

const closePopup = (popup) => {
  document.removeEventListener('keydown', checkKeydownEvent);
  document.removeEventListener('click', removePopupClass);
  popup.classList.remove('popup__opened');
  body.classList.remove('page_no-scroll');
  validateFormsDisable(popup);
}

const disableAddButton = () => {
  formEditValidation.disableSubmitButton();
  formAddValidation.disableSubmitButton();
};

function setPopupPhotoContent (data) {
    popupPhotoImage.setAttribute('src', data.link);
    popupPhotoImage.setAttribute('alt', data.name);
    popupPhotoDescription.textContent = data.name;
}

const createPhotoPopup = (data) => {
  setPopupPhotoContent(data);
  openPopup(popupPhoto);
};

function saveProfileFields(evt) {
  evt.preventDefault();

  textAbout.textContent = inputAbout.value;
  textName.textContent = inputName.value;
}

const formEdit = document.querySelector('#edit');
const formAdd = document.querySelector('#add');
const nameAddInput = document.querySelector('#popup__input-title');
const linkAddInput = document.querySelector('#popup__input-link');

buttonEdit.addEventListener('click', () => {
  formEdit.reset();
  disableAddButton();
  inputName.value = textName.textContent;
  inputAbout.value = textAbout.textContent;
  openPopup(popupEdit);
});

buttonAdd.addEventListener('click', () => {
  formAdd.reset();
  disableAddButton();
  openPopup(popupAdd);
})

cardsInitial.forEach(item => {
  const card = new Card(item, '.cards__element-template', createPhotoPopup);
  const cardElement = card.generateCard();
  
  document.querySelector('.cards').append(cardElement);
});


formEdit.addEventListener('submit', (evt) => {
  saveProfileFields(evt);
  closePopup(activePopup);
  disableAddButton();
});

formAdd.addEventListener('submit', () => {
  const card = new Card ({name:nameAddInput.value, link:linkAddInput.value}, '.cards__element-template', createPhotoPopup);
  cards.prepend(card.generateCard());
    closePopup(popupAdd);
    formAdd.reset();
});    

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  })
});

