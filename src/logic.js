import moment from 'moment';

const userModule = (() => {
  const isUnitMetric = true;
  return {
    isUnitMetric,
  };
})();

function objFactory(obj, units) {
  const { id } = obj;
  const weatherCategory = obj.weather[0].main;
  const { name } = obj;
  const weatherDesc = obj.weather[0].description;
  let temp = `${Math.round(obj.main.temp)}°C`;
  let feelsLike = `${Math.round(obj.main.feels_like)}°C`;
  const windSpeedNum = (obj.wind.speed * 18) / 5;
  let windSpeed = `${windSpeedNum.toFixed(1)} km/h`;
  const humidity = `${obj.main.humidity} %`;
  const chanceOfRain = `${obj.clouds.all} %`;
  const sunriseTime = new Date(obj.sys.sunrise * 1000);
  const sunrise = moment(sunriseTime).format('hh:mm a');
  const sunsetTime = new Date(obj.sys.sunset * 1000);
  const sunset = moment(sunsetTime).format('hh:mm a');

  if (units === false) {
    temp = `${Math.round(obj.main.temp)}°F`;
    feelsLike = `${Math.round(obj.main.feels_like)}°F`;
    windSpeed = `${obj.wind.speed} mph`;
  }

  return {
    id,
    weatherCategory,
    name,
    weatherDesc,
    temp,
    feelsLike,
    humidity,
    windSpeed,
    chanceOfRain,
    sunrise,
    sunset,
  };
}

function getWeather(city, isUnitMetric, container, callback, alertCallback = '') {
  let unit = 'metric';
  if (isUnitMetric === false) {
    unit = 'imperial';
  }
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=736e359c524cb08a4b1e7c7d0a31ecd0`;
  fetch(url, { mode: 'cors' })
    .then((response) => response.json())
    .then((result) => {
      const newObj = objFactory(result, isUnitMetric);
      console.log(result);
      console.log(newObj);
      callback(container, newObj);
    })
    .catch(() => {
      alertCallback(true);
    });
}

export {
  userModule,
  getWeather,
};
