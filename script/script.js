const profile = document.querySelector(".profile");
const buttonEdit = profile.querySelector(".profile__edit-button");
const buttonSubmit = document.querySelectorAll(".popup__save-button");
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

const addPhotoListener = (evt) => {
  getPopupPhotoContent(evt.target);
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

  cardsImage.addEventListener("click", (evt) => addPhotoListener(evt));

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

const removePopupClass = (evt) => {evt.target.classList.remove("popup__opened");}
const checkKeydownEvent = (evt) => {
  if (evt.key === 'Escape') {
    const main = evt.target.children[1];
    const blocks = Array.from(main.children)
    blocks.forEach(Element => {
      if (Element.classList.contains('popup')) {
        closePopupByEsc(Element);
      }
    })
  }
}

const openPopup = (popup) => {
  document.addEventListener("keydown", (evt) => checkKeydownEvent(evt));//я реально 2 часа потратил на попытки выполнить твоё исправление, но это какой-то костыль
  popup.addEventListener('click', (evt) => removePopupClass(evt));// тут было попроще и то хз правильно ли я сделал
  popup.classList.add("popup__opened");
  body.classList.add('page_no-scroll');
}

const closePopup = (popup) => {
  popup.classList.remove("popup__opened");
  body.classList.remove('page_no-scroll');
  resetFormAdd(popup);
}

const resetFormAdd = (popup) => {
  if (document.querySelector('#add')) {
    formAdd.reset();
  }
};

const closePopupByEsc = (popup) => {
  popup.classList.remove("popup__opened");` `
  body.classList.remove('page_no-scroll');
  resetFormAdd(popup);
}



function getPopupPhotoContent (eventTarget) {
    popupPhotoImage.setAttribute('src', eventTarget.getAttribute('src'));
    popupPhotoImage.setAttribute('alt', eventTarget.offsetParent.querySelector('h4').textContent);
    popupPhotoDescription.textContent = eventTarget.offsetParent.querySelector('h4').textContent;
}

function saveInputs(evt) {
  evt.preventDefault();

  textAbout.textContent = inputAbout.value;
  textName.textContent = inputName.value;
}

buttonEdit.addEventListener("click", () => {
  inputName.value = textName.textContent;
  inputAbout.value = textAbout.textContent;
  openPopup(popupEdit);
});

buttonAdd.addEventListener("click", () => openPopup(popupAdd));

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
    closePopup(popup);
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