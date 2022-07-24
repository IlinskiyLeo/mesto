const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit-button");
const saveButton = document.querySelector(".popup__save-button");
const addButton = document.querySelector(".profile__add-button");
const textName = profile.querySelector(".profile__name");
const textAbout = profile.querySelector(".profile__about");
const inputAbout = document.getElementById("edit__about");
const inputName = document.getElementById("edit__name");
const popups = document.querySelectorAll(".popup");

let initialCards = [
  {
  name: 'Архыз',
  link: 'https:pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
  name: 'Челябинская область',
  link: 'https:pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
  name: 'Иваново',
  link: 'https:pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
  name: 'Камчатка',
  link: 'https:pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
  name: 'Холмогорский район',
  link: 'https:pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
  name: 'Байкал',
  link: 'https:pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const createCard = (Element, prepend=false) => {
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
  if(prepend){
    cards.prepend(cardsElement);
  } else {
    cards.append(cardsElement);
  }

  cardsImage.setAttribute('src', Element.link);
  cardsDescription.textContent = Element.name;

  addDeleteButtonListener();
  addPhotoListener();
}

function addDeleteButtonListener() {
  const deleteButton = document.querySelectorAll('.cards__delete-button');

  deleteButton.forEach(item => {
    item.addEventListener('click', function(evt) {
      let btn = evt.target.closest('.cards__element');
      btn.remove();
    });
  });
}

const popupEdit = document.querySelector(".popup-edit");
const popupAdd = document.querySelector(".popup-add");
const popupPhoto = document.querySelector(".popup-photo");

initialCards.forEach(Element => {
  createCard(Element);
});

const likeButton = document.querySelectorAll('.cards__like-button');

likeButton.forEach(item => {
  item.addEventListener('click', (evt) => {
    evt.target.classList.add('cards__like-button_active');
  })
});

function openPopup(popup) {
  popup.classList.add("popup__opened");
}

function addPhotoListener () {
  const photoElement = document.querySelectorAll('.cards__image');

  photoElement.forEach(item => {
    item.addEventListener("click", (evt) => {
      openPopup(popupPhoto)
      getPopupImage(evt.target.getAttribute('src'))
    });
  })
}

function closeAllPopups() {
  popups.forEach((popup) => {
    popup.classList.remove("popup__opened");
  });
}

function getPopupImage (link) {
  console.log(link);
  const popupPhotoImage = document.querySelector('.popup-photo__image');
  popupPhotoImage.setAttribute('src', link);
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

const editForm = document.getElementById("edit");

editForm.addEventListener("submit", (evt) => {
  saveInputs(evt);
  closeAllPopups();
});

const addForm = document.getElementById("add");
const addName = document.getElementById("add__name");
const addLink = document.getElementById("add__link");

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  createCard({name:addName.value, link:addLink.value}, true)
  addName.value = '';
  addLink.value = '';
    closeAllPopups();
});

const closeButton = document.querySelectorAll(".popup__close-button");

closeButton.forEach((button) => {
  button.addEventListener("click", () => closeAllPopups());
});


