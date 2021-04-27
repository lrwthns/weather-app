import moment from 'moment';

// const userModule = (() => {
//   const weatherObj = {};
//   return {
//     weatherObj,
//   };
// })();

function objFactory(obj) {
  const { id } = obj;
  const weatherCategory = obj.weather[0].main;
  const { name } = obj;
  const weatherDesc = obj.weather[0].description;
  const temp = `${obj.main.temp}°`;
  const feelsLike = `${obj.main.feels_like}°`;
  const humidity = `${obj.main.humidity} %`;
  const windSpeedNum = (obj.wind.speed * 18) / 5;
  const windSpeed = `${windSpeedNum.toFixed(1)} km/h`;
  const chanceOfRain = `${obj.clouds.all} %`;
  const sunriseTime = new Date(obj.sys.sunrise * 1000);
  const sunrise = moment(sunriseTime).format('hh:mm a');
  const sunsetTime = new Date(obj.sys.sunset * 1000);
  const sunset = moment(sunsetTime).format('hh:mm a');

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

function getWeather(city, callback, container) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=736e359c524cb08a4b1e7c7d0a31ecd0`;
  fetch(url, { mode: 'cors' })
    .then((response) => response.json())
    .then((result) => {
      const newObj = objFactory(result);
      console.log(result);
      console.log(newObj);
      callback(container, newObj);
    })
    .catch(() => {
      document.querySelector('#alert').style.display = 'block';
    });
}

export {
  objFactory,
  getWeather,
};
