const profile = document.querySelector(".profile");
const popupForm = document.querySelector(".popup__form");
const editButton = profile.querySelector(".profile__edit-button");
const saveButton = popupForm.querySelector(".popup__save-button");
const closeButton = document.querySelectorAll(".popup__close-button");
const deleteButton = document.querySelector('.cards__delete-button');
const addButton = document.querySelector(".profile__add-button");
const textName = profile.querySelector(".profile__name");
const textAbout = profile.querySelector(".profile__about");
const popupEdit = document.querySelector(".popup-edit");
const popupAdd = document.querySelector(".popup-add");
const popupPhoto = document.querySelector(".popup-photo");
const inputAbout = document.querySelector(".popup__input-about");
const inputName = document.querySelector(".popup__input-name");
const popups = document.querySelectorAll(".popup");

const initialCards = [
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


initialCards.forEach(Element => {
  const cards = document.querySelector('.cards');
  const cardsElement = document.createElement('div');
    cardsElement.classList.add('cards__element');
  const cardsImage = document.createElement('img');
    cardsImage.classList.add('cards__image');
  const cardsDeleteButton = document.createElement('button');
    cardsDeleteButton.classList.add('cards__delete-button');
  const cardsDescription = document.createElement('h4');
    cardsDescription.classList.add('cards__description');
  const cardsLikeButton = document.createElement('button');
    cardsLikeButton.classList.add('cards__like-button');
  cardsElement.append(cardsImage, cardsDeleteButton, cardsDescription,cardsLikeButton);
  cards.append(cardsElement);

  cardsImage.setAttribute('src', Element.link);
  cardsDescription.textContent = Element.name;
});

//const deleteCard = (evt) => {
//  const btn = evt.target.closest('.cards__delete-button');
//  const card = document.querySelector('.cards__element');
//  const deleteButton = document.querySelector('.cards__delete-button');
//
//  btn.parentElement.remove(card);
//};


function openPopup(popup) {
  popup.classList.add("popup__opened");
}

function closeAllPopups() {
  popups.forEach((popup) => {
    popup.classList.remove("popup__opened");
  });
}

function saveInputs(evt) {
  evt.preventDefault();

  textAbout.textContent = inputAbout.value;
  textName.textContent = inputName.value;
}

editButton.addEventListener("click", () => {
  openPopup(popupEdit);
  inputName.value = textName.textContent;
  inputAbout.value = textAbout.textContent;
});

addButton.addEventListener("click", () => openPopup(popupAdd));

popupForm.addEventListener("submit", (evt) => {
  saveInputs(evt);
  closeAllPopups();
});

closeButton.forEach((button) => {
  button.addEventListener("click", () => closeAllPopups());
});

//deleteButton.addEventListener("click", deleteCard);
//document.querySelector('.cards__element').onclick = function(e) {
//  const btn = e.target.closest('.cards__delete-button');
//  if (!btn) {
//    return;
//  }
//  
//  btn.parentElement.remove();
//};

deleteButton.addEventListener('click', function(evt) {
  let btn = evt.target.closest('.cards__delete-button');
  btn.parentElement.remove();
});