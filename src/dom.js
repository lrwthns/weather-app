import createNewElement from './dom-manipulation-helper';
import { userModule as User, getWeather } from './logic';

function cleanContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function createWeatherElem(container, obj) {
  cleanContainer(container);
  const leftContainer = createNewElement(container, 'div', '', 'left-container');
  const rightContainer = createNewElement(container, 'div', '', 'right-container');
  const nameElem = createNewElement(leftContainer, 'div', '', 'name', obj.name);
  const descElem = createNewElement(leftContainer, 'div', '', 'desc', obj.weatherDesc);
  const tempElem = createNewElement(leftContainer, 'div', '', 'temp', obj.temp);
  const feelsLikeElem = createNewElement(leftContainer, 'div', '', 'feels-like', `feels like ${obj.feelsLike}`);
  const unitElem = createNewElement(leftContainer, 'div', '', 'unit');
  const humidityLabel = createNewElement(rightContainer, 'div', '', 'humidity-label', 'humidity');
  const humidityElem = createNewElement(rightContainer, 'div', '', 'humidity', obj.humidity);
  const windSpeedLabel = createNewElement(rightContainer, 'div', '', 'wind-speed-label', 'wind speed');
  const windSpeedElem = createNewElement(rightContainer, 'div', '', 'wind-speed', obj.windSpeed);
  const chanceOfRainLabel = createNewElement(rightContainer, 'div', '', 'chance-of-rain-label', 'chance of rain');
  const chanceOfRainElem = createNewElement(rightContainer, 'div', '', 'chance-of-rain', obj.chanceOfRain);
  const sunriseLabel = createNewElement(rightContainer, 'div', '', 'sunrise-label', 'sunrise');
  const sunriseElem = createNewElement(rightContainer, 'div', '', 'sunrise', obj.sunrise);
  const sunsetLabel = createNewElement(rightContainer, 'div', '', 'sunset-label', 'sunset');
  const sunsetElem = createNewElement(rightContainer, 'div', '', 'sunrset', obj.sunset);
  function changeUnitDisplay() {
    if (User.isUnitMetric === false) {
      unitElem.textContent = 'display in °C';
    } else {
      unitElem.textContent = 'display in °F';
    }
  }
  changeUnitDisplay();
  unitElem.addEventListener('click', () => {
    if (User.isUnitMetric === false) {
      User.isUnitMetric = true;
    } else {
      User.isUnitMetric = false;
    }
    changeUnitDisplay();
    getWeather(obj.name, User.isUnitMetric, container, createWeatherElem);
  });
}

function createFormElem(container, weatherElemContainer) {
  const formContainer = createNewElement(container, 'form', '', 'form-container');
  const formLabel = createNewElement(formContainer, 'label', '', 'form-label');
  const formInput = createNewElement(formContainer, 'input', '', 'form-input');
  const submitBtn = createNewElement(formContainer, 'button', '', 'submit-btn', 'Submit');
  const alert = createNewElement(formContainer, 'div', '', 'alert-none', 'Please enter a valid name.');
  const regex = '^[a-zA-Z ]*$';
  function showAlert(bool) {
    if (bool === true) {
      alert.setAttribute('id', 'alert-block');
    } else {
      alert.setAttribute('id', 'alert-none');
    }
  }
  formInput.setAttribute('pattern', regex);
  formInput.addEventListener('input', () => {
    if (formInput.validity.patternMismatch) {
      formInput.setCustomValidity('Entered value should only be letters or spaces.');
    } else {
      formInput.setCustomValidity('');
    }
  });
  formContainer.addEventListener('submit', (e) => {
    e.preventDefault();
    showAlert(false);
    getWeather(
      formInput.value,
      User.isUnitMetric,
      weatherElemContainer,
      createWeatherElem,
      showAlert,
    );
  });
}

export default function createDOM() {
  const body = document.querySelector('body');
  const mainContainer = createNewElement(body, 'div', '', 'main-container');
  const weatherContainer = createNewElement(mainContainer, 'div', '', 'weather-container');
  createFormElem(mainContainer, weatherContainer);
  getWeather('Bandung', User.isUnitMetric, weatherContainer, createWeatherElem);
}
