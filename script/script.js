const profile = document.querySelector(".profile");
const buttonEdit = profile.querySelector(".profile__edit-button");
const buttonsSubmit = document.querySelectorAll(".popup__save-button");
const buttonAdd = document.querySelector(".profile__add-button");
const textName = profile.querySelector(".profile__name");
const textAbout = profile.querySelector(".profile__about");
const inputAbout = document.querySelector("#popup__input-about");
const inputName = document.querySelector("#popup__input-name");
const popupPhotoImage = document.querySelector('.popup-photo__image');
const popupPhotoDescription = document.querySelector('.popup-photo__description');
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

const addLikeListener = (evt) => {
  evt.target.classList.toggle('cards__like-button_active');
};

const addPhotoListener = (item) => {
  getPopupPhotoContent(item.src, item.alt);
  openPopup(popupPhoto);
};

const addDeleteListener = (evt) => {
  const card = evt.target.closest('.cards__element');
  card.remove();
}

const createCard = (item) => {
  const cardsTemplate = document.querySelector('.cards__element-template').content;
  const cardsElement = cardsTemplate.querySelector('.cards__element').cloneNode(true);
  
  const cardsImage = cardsElement.querySelector('.cards__image');
  cardsImage.setAttribute('src', item.link);

  const cardsDescription = cardsElement.querySelector('.cards__description');
  cardsDescription.textContent = item.name;

  const likeButton = cardsElement.querySelector('.cards__like-button');
  likeButton.addEventListener('click', (evt) =>  addLikeListener(evt));

  cardsImage.addEventListener("click", (evt) => addPhotoListener(evt.target));
  cardsImage.setAttribute('alt', cardsDescription.textContent);

  const deleteButton = cardsElement.querySelector('.cards__delete-button');
  deleteButton.addEventListener('click', (evt) => addDeleteListener(evt));

  return cardsElement;
}

const popupEdit = document.querySelector(".popup-edit");
const popupAdd = document.querySelector(".popup-add");
const popupPhoto = document.querySelector(".popup-photo");
const popups = document.querySelectorAll('.popup');

cardsInitial.forEach(item => {
  cards.append(createCard(item));
});

const body = document.querySelector('body');

function removePopupClass(evt) {
  evt.target.classList.remove("popup__opened");
} 
const checkKeydownEvent = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup__opened'); //вот я тупица, спасибо!
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

const closeButtons = document.querySelectorAll(".popup__close-button");



popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) { // спасибо почитал
      closePopup(popup);
    }
    return
  })
});