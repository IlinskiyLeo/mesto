export default class FormValidator {
  constructor(validationSettings, formElement) {
    this._settings = validationSettings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  _setEventListeners = () => {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };

  _showInputError(inputElement) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._settings.errorClass);
  };

  _hideInputError (inputElement) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._settings.errorClass);
  };


  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this.disableSubmitButton(buttonElement);
    } else {
      this._enableSubmitButton(buttonElement);
    }
  };

  _enableSubmitButton(buttonElement) {
    buttonElement.classList.remove(this._settings.inactiveButtonClass),
    buttonElement.removeAttribute('disabled');
  };

  disableSubmitButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass),
    this._buttonElement.setAttribute('disabled', true);
  };

  enableValidation() {
    this._formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  resetValidation() {
    this._inputList.forEach((inputElement) => {
        this._toggleButtonState(this._inputList, this._buttonElement);
        this._hideInputError(inputElement);
    });
  };
};
  