let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');

function popupOpening() {
    popup.classList.add('popup__opened');
}

editButton.addEventListener('click', popupOpening);
