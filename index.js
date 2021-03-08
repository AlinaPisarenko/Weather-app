//currentTime
function currentDate(date) {
  let hours = date.getHours();
  let AmOrPm = hours >= 12 ? `pm` : `am`;
  hours = hours % 12 || 12;
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let finalTime = hours + `:` + minutes + ` ` + AmOrPm;
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

  return `${day} ${finalTime}`;
}
let currentTime = new Date();
let timeElement = document.querySelector(`h2`);
timeElement.innerHTML = currentDate(currentTime);
//Searching for a City

function searchCity(city) {
  let apiKey = `c9af21311efae38764da31570e4feab2`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector(`#type-city`).value;
  searchCity(city);
}
let form = document.querySelector(`#search-text`);
form.addEventListener(`submit`, search);

//Celcius to Fahrenheit

function tempF(event) {
  event.preventDefault();
  let mainTemp = document.querySelector(`#main-temperature`);
  mainTemp.innerHTML = `66°F`;
}
let buttonFar = document.querySelector(`#change-fahrenheit`);
buttonFar.addEventListener(`click`, tempF);

function tempC(event) {
  event.preventDefault();
  let mainTemp = document.querySelector(`#main-temperature`);
  mainTemp.innerHTML = `19°C`;
}
let buttonCel = document.querySelector(`#change-celcius`);
buttonCel.addEventListener(`click`, tempC);

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `c9af21311efae38764da31570e4feab2`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function showTemp(response) {
  console.log(response.data);

  document.querySelector(`#main-temperature`).innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector(
    `#description-sign`
  ).innerHTML = `${response.data.weather[0].description}`;
  document.querySelector(`#max-temp`).innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°C`;
  document.querySelector(`#min-temp`).innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°C`;
  document.querySelector(`#main-location`).innerHTML = `${response.data.name}`;
  document.querySelector(
    `#feels-like-temp`
  ).innerHTML = `Feels like: ${Math.round(response.data.main.feels_like)}°C`;

  document.querySelector(
    `#humidity-now`
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(`#wind-speed-now`).innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} min/sec`;
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
searchCity(`New York`);