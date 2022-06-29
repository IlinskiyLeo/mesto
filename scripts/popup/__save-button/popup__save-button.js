let popupForm = popup.querySelector('.popup__form');
let saveButton = popupForm.querySelector('.popup__save-button');

function saveInputs (evt) {
    evt.preventDefault();

    textAbout.textContent = inputAbout.value;
    textName.textContent = inputName.value; 
    
    popupClosing();
}

popupForm.addEventListener('submit', saveInputs);