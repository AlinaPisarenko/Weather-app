//currentTime
function currentDate(timestamp) {
  date = new Date(timestamp);
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[date.getDay()];

  return `${day} ${formatHours(timestamp)}`;
}
let currentTime = new Date();
let timeElement = document.querySelector(`h2`);
timeElement.innerHTML = currentDate(currentTime);

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let AmOrPm = hours >= 12 ? `pm` : `am`;
  hours = hours % 12 || 12;
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let finalTime = hours + `:` + minutes + ` ` + AmOrPm;
  return finalTime;
}
function showForecast(response) {
  console.log(response);
  forecastElement = document.querySelector(`#forecast`);
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `  <div class="col forecast-hours border-right border-left">
            ${formatHours(forecast.dt * 1000)} <br />
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" class="fas fa-cloud-sun"></img>
           <div class="row row-cols-2">
              <div class="col" id="low-temp-forecast">${Math.round(
                forecast.main.temp_min
              )}°</div>

              <div class="col" id="max-temp-forecast">${Math.round(
                forecast.main.temp_max
              )}°</div>
            </div>
          </div>
          `;
  }
}

function searchCity(city) {
  let apiKey = `c9af21311efae38764da31570e4feab2`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showForecast);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector(`#type-city`).value;
  searchCity(city);
}
let form = document.querySelector(`#search-text`);
form.addEventListener(`submit`, search);

function tempF(event) {
  event.preventDefault();
  buttonCel.classList.remove("active");
  buttonCel.classList.add("inactive");
  buttonFar.classList.remove("inactive");
  buttonFar.classList.add("active");
  let FahrenheitTemp = (celciusTemperature * 9) / 5 + 32;
  let mainTemp = document.querySelector(`#main-temperature`);
  let fahrenheitTempMin = (celciusTemperatureMin * 9) / 5 + 32;
  let minTemp = document.querySelector(`#min-temp`);
  let fahrenheitTempMax = (celciusTemperatureMax * 9) / 5 + 32;
  let maxTemp = document.querySelector(`#max-temp`);
  let fahrenheitTempFeelsLike = (celciusTemperatureFeelsLike * 9) / 5 + 32;
  let feelsLIkeTemp = document.querySelector(`#feels-like-temp`);

  mainTemp.innerHTML = Math.round(FahrenheitTemp) + `°`;
  minTemp.innerHTML = Math.round(fahrenheitTempMin) + `°`;
  maxTemp.innerHTML = Math.round(fahrenheitTempMax) + `°`;
  feelsLIkeTemp.innerHTML =
    `Feels like: ` + Math.round(fahrenheitTempFeelsLike) + `°`;
}

let buttonFar = document.querySelector(`#change-fahrenheit`);
buttonFar.addEventListener(`click`, tempF);

function tempC(event) {
  event.preventDefault();
  buttonFar.classList.add("inactive");
  buttonFar.classList.remove("active");
  buttonCel.classList.remove("inactive");
  buttonCel.classList.add("active");
  let mainTemp = document.querySelector(`#main-temperature`);
  let minTemp = document.querySelector(`#min-temp`);
  let maxTemp = document.querySelector(`#max-temp`);
  let feelsLIkeTemp = document.querySelector(`#feels-like-temp`);
  mainTemp.innerHTML = Math.round(celciusTemperature) + `°`;
  minTemp.innerHTML = Math.round(celciusTemperatureMin) + `°`;
  maxTemp.innerHTML = Math.round(celciusTemperatureMax) + `°`;
  feelsLIkeTemp.innerHTML =
    `Feels like: ` + Math.round(celciusTemperatureFeelsLike) + `°`;
}
let buttonCel = document.querySelector(`#change-celcius`);
buttonCel.addEventListener(`click`, tempC);

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `c9af21311efae38764da31570e4feab2`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp).then(showForecast);
  posForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&`;
  axios.get(`${posForecastUrl}&appid=${apiKey}`).then(showForecast);
}

function showTemp(response) {
  celciusTemperature = response.data.main.temp;
  celciusTemperatureMin = response.data.main.temp_min;
  celciusTemperatureMax = response.data.main.temp_max;
  celciusTemperatureFeelsLike = response.data.main.feels_like;
  let iconElement = document.querySelector(`#icon`);
  iconElement.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector(`#main-temperature`).innerHTML =
    Math.round(celciusTemperature) + `°`;
  document.querySelector(
    `#description-sign`
  ).innerHTML = `${response.data.weather[0].description}`;
  document.querySelector(`#max-temp`).innerHTML =
    Math.round(celciusTemperatureMax) + `°`;
  document.querySelector(`#min-temp`).innerHTML =
    Math.round(celciusTemperatureMin) + `°`;
  document.querySelector(`#main-location`).innerHTML = `${response.data.name}`;
  document.querySelector(`#feels-like-temp`).innerHTML =
    `Feels like: ` + Math.round(celciusTemperatureFeelsLike) + `°`;
  document.querySelector(
    `#humidity-now`
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(`#wind-speed-now`).innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} m/s`;
  document.querySelector(
    `#pressure-now`
  ).innerHTML = `Pressure: ${response.data.main.pressure} hPa`;
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let currentLocationButton = document.querySelector(`#current-location-button`);
currentLocationButton.addEventListener(`click`, getLocation);

let celciusTemperature = null;
let celciusTemperatureMin = null;
let celciusTemperatureMax = null;
let celciusTemperatureFeelsLike = null;
searchCity(`New York`);
