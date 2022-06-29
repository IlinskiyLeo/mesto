let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');

function popupClosing() {
    popup.classList.remove('popup__opened');
}

closeButton.addEventListener('click', popupClosing);