const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit-button");
const submitButton = document.querySelectorAll(".popup__save-button");
const addButton = document.querySelector(".profile__add-button");
const textName = profile.querySelector(".profile__name");
const textAbout = profile.querySelector(".profile__about");
const inputAbout = document.querySelector("#popup__input-about");
const inputName = document.querySelector("#popup__input-name");
const popupPhotoImage = document.querySelector('.popup-photo__image');
const popupPhotoDescription = document.querySelector('.popup-photo__description');
const cards = document.querySelector('.cards');

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

const addLikeListener = (evt) => {
  evt.target.classList.toggle('cards__like-button_active');
};

const addPhotoListener = (evt) => {
  getPopupPhotoContent(evt.target);
  openPopup(popupPhoto);
};

const addDeleteListener = (evt) => {
  const card = evt.target.closest('.cards__element');
  card.remove();
}

// document.addEventListener('click', evt => {
//   if (evt.target.classList.contains('popup__submit')) {
//     evt.target.parentElement.parentElement.submit();
//   }
// });

const createCard = (item) => {
  const cardsTemplate = document.querySelector('.cards__element-template').content;
  const cardsElement = cardsTemplate.querySelector('.cards__element').cloneNode(true);
  
  const cardsImage = cardsElement.querySelector('.cards__image');
  cardsImage.setAttribute('src', item.link);

  const cardsDescription = cardsElement.querySelector('.cards__description');
  cardsDescription.textContent = item.name;

  const likeButton = cardsElement.querySelector('.cards__like-button');
  likeButton.addEventListener('click', (evt) =>  addLikeListener(evt));

  cardsImage.addEventListener("click", (evt) => addPhotoListener(evt));

  const deleteButton = cardsElement.querySelector('.cards__delete-button');
  deleteButton.addEventListener('click', (evt) => addDeleteListener(evt));

  return cardsElement;
}

const popupEdit = document.querySelector(".popup-edit");
const popupAdd = document.querySelector(".popup-add");
const popupPhoto = document.querySelector(".popup-photo");

initialCards.forEach(item => {
  cards.append(createCard(item));
});

const body = document.querySelector('body');

function openPopup(popup) {
  document.addEventListener("keydown", (evt) => {
    if (evt.key === 'Escape') {
      closePopupByEsc(popup);
    }
});
  popup.addEventListener('click', evt => {
    evt.target.classList.remove("popup__opened");
  });
  popup.classList.add("popup__opened");
  body.classList.add('page_no-scroll');
}

const closePopup = (evt) => {
  const selectPopup = evt.target.closest('.popup');
  selectPopup.classList.remove("popup__opened");
  body.classList.remove('page_no-scroll');
  if (selectPopup.querySelector('#add')) {
    addForm.reset();
  }
}

const closePopupByEsc = (evt) => {
  evt.classList.remove("popup__opened");
  body.classList.remove('page_no-scroll');
  if (document.querySelector('#add')) {
    addForm.reset();
  }
}

function getPopupPhotoContent (eventTarget) {
    popupPhotoImage.setAttribute('src', eventTarget.getAttribute('src'));
    popupPhotoDescription.textContent = eventTarget.parentElement.querySelector('h4').textContent;
}

function saveInputs(evt) {
  evt.preventDefault();

  textAbout.textContent = inputAbout.value;
  textName.textContent = inputName.value;
}

editButton.addEventListener("click", () => {
  inputName.value = textName.textContent;
  inputAbout.value = textAbout.textContent;
  openPopup(popupEdit);
});

addButton.addEventListener("click", () => openPopup(popupAdd));

const editForm = document.getElementById("edit");

editForm.addEventListener("submit", (evt) => {
  saveInputs(evt);
  closePopup(evt);
});

const addForm = document.getElementById("add");
const addName = document.getElementById("popup__input-title");
const addLink = document.getElementById("popup__input-link");

addForm.addEventListener("submit", (evt) => {
  cards.prepend(createCard({name:addName.value, link:addLink.value}));
    closePopup(evt);
    addForm.reset();
});    

const closeButtons = document.querySelectorAll(".popup__close-button");

closeButtons.forEach((button) => {
  button.addEventListener("click", (evt) => closePopup(evt));
});


  document.addEventListener
