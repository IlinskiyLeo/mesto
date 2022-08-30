import Card from './Card.js'
import FormValidator from './FormValidator.js';

const popupPhotoImage = document.querySelector('.popup-photo__image');
const popupPhotoDescription = document.querySelector('.popup-photo__description');
const profile = document.querySelector(".profile");
const buttonEdit = profile.querySelector(".profile__edit-button");
const buttonsSubmit = document.querySelectorAll(".popup__save-button");
const buttonAdd = document.querySelector(".profile__add-button");
const textName = profile.querySelector(".profile__name");
const textAbout = profile.querySelector(".profile__about");
const inputAbout = document.querySelector("#popup__input-about");
const inputName = document.querySelector("#popup__input-name");
const popupEdit = document.querySelector(".popup-edit");
const popupAdd = document.querySelector(".popup-add");
const popups = document.querySelectorAll('.popup');
const cards = document.querySelector('.cards');

const cardsInitial = [
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

  
cardsInitial.forEach(item => {
  const card = new Card(item, '.cards__element-template');
  const cardElement = card.generateCard();
  
  document.querySelector('.cards').append(cardElement);
})

const body = document.querySelector('body');

function removePopupClass(evt) {
  evt.target.classList.remove("popup__opened");
} 
export const checkKeydownEvent = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup__opened');
    closePopup(activePopup);
  }
}

const openPopup = (popup) => {
  document.addEventListener("keydown", checkKeydownEvent);
  popup.addEventListener('click', removePopupClass);
  popup.classList.add("popup__opened");
  body.classList.add('page_no-scroll');
}

const closePopup = (popup) => {
  document.removeEventListener("keydown", checkKeydownEvent);
  document.removeEventListener('click', removePopupClass);
  popup.classList.remove("popup__opened");
  body.classList.remove('page_no-scroll');
}

const buttonSubmitAddForm = popupAdd.querySelector(".popup__save-button");

const disableAddButton = (popupAdd) => {
  buttonSubmitAddForm.classList.add('popup__save-button_inactive');
  buttonSubmitAddForm.setAttribute('disabled', true);
};

function getPopupPhotoContent (cardsImageSrc, cardsDescriptionText) {
    popupPhotoImage.setAttribute('src', cardsImageSrc);
    popupPhotoImage.setAttribute('alt', cardsDescriptionText);
    popupPhotoDescription.textContent = cardsDescriptionText;
}

function saveInputs(evt) {
  evt.preventDefault();

  textAbout.textContent = inputAbout.value;
  textName.textContent = inputName.value;
}

buttonEdit.addEventListener("click", () => {
  popupEdit.querySelector('.popup__form').reset();
  openPopup(popupEdit);
  inputName.value = textName.textContent;
  inputAbout.value = textAbout.textContent;
});

buttonAdd.addEventListener("click", () => {
  openPopup(popupAdd);
  disableAddButton(popupAdd);
  popupAdd.querySelector('.popup__form').reset();
})

const formEdit = document.querySelector("#edit");

formEdit.addEventListener("submit", (evt) => {
  saveInputs(evt);
  closePopup(evt.target.parentElement.parentElement);
});

const formAdd = document.querySelector("#add");
const nameAdd = document.querySelector("#popup__input-title");
const linkAdd = document.querySelector("#popup__input-link");

formAdd.addEventListener("submit", (evt) => {
  cards.prepend(createCard({name:nameAdd.value, link:linkAdd.value}));
    closePopup(popupAdd);
    formAdd.reset();
});    

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
    return
  })
});