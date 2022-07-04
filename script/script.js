let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let textName = profile.querySelector('.profile__name');
let textAbout = profile.querySelector('.profile__about');
let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let inputAbout = popup.querySelector('.popup__input-about');
let inputName = popup.querySelector('.popup__input-name');
let saveButton = popupForm.querySelector('.popup__save-button');
let closeButton = popup.querySelector('.popup__close-button');



function popupOpening() {
    popup.classList.add('popup__opened');
    inputName.value = textName.textContent;
    inputAbout.value = textAbout.textContent;
}

function popupClosing() {
    popup.classList.remove('popup__opened');
}

function saveInputs (evt) {
    evt.preventDefault();

    textAbout.textContent = inputAbout.value;
    textName.textContent = inputName.value; 
    
    popupClosing();
}

editButton.addEventListener('click', popupOpening);
popupForm.addEventListener('submit', saveInputs);
closeButton.addEventListener('click', popupClosing);







