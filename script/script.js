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

const createCard = (item, prepend = false) => {
  const cards = document.querySelector('.cards');

  const cardsTemplate = document.querySelector('.cards__element-template').content;

  const cardsElement = cardsTemplate.cloneNode(true);

  const cardsImage = cardsElement.querySelector('.cards__image');
  cardsImage.setAttribute('src', item.link);

  const cardsDescription = cardsElement.querySelector('.cards__description');
  cardsDescription.textContent = item.name;

  const likeButton = cardsElement.querySelector('.cards__like-button');

  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('cards__like-button_active');
  });

  cardsImage.addEventListener("click", (evt) => {
      openPopup(popupPhoto)
      getPopupImage(evt.target.getAttribute('src'))
  });

  const deleteButton = cardsElement.querySelector('.cards__delete-button');

  deleteButton.addEventListener('click', function(evt) {
    let btn = evt.target.closest('.cards__element');
    btn.remove();
  });

  if(prepend){
    cards.prepend(cardsElement);
  } else {
    cards.append(cardsElement);
  }
}

const popupEdit = document.querySelector(".popup-edit");
const popupAdd = document.querySelector(".popup-add");
const popupPhoto = document.querySelector(".popup-photo");

initialCards.forEach(item => {
  createCard(item);
});



const body = document.querySelector('body');

function openPopup(popup) {
  popup.classList.add("popup__opened");
  body.classList.add('page_no-scroll');
}



function closeAllPopups() {
  body.classList.remove('page_no-scroll');
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


