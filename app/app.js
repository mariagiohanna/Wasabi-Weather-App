function showCurrentTime(event) {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentTime = document.querySelector("#currentTime");
  let currentDate = document.querySelector("#currentDate");
  currentDate.innerHTML = `${days[now.getDay()]}, ${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;
  if (now.getMinutes() < 10) {
    currentTime.innerHTML = `${now.getHours()}:0${now.getMinutes()} hs`;
  } else {
    currentTime.innerHTML = `${now.getHours()}:${now.getMinutes()} hs`;
  }
}

function getCurrentLocationData(event) {
  navigator.geolocation.getCurrentPosition(getData2CurrentLocation);
}

function getData2CurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "d54f597e2ee8a9abfe6d0edcf1727b8d";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(UpdateData2Location);
}

function getData4city(event) {
  event.preventDefault();
  let city = document.querySelector("#city-to-search");
  if (city.value.length > 0) {
    let apiKey = "d54f597e2ee8a9abfe6d0edcf1727b8d";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;
    axios.get(url).then(UpdateData2Location);
  } else {
    alert("Please type a city");
  }
}

function UpdateData2Location(response) {
  console.log(response);
  let currentLocation = document.querySelector("#currentLocation");
  let currentTemperature = document.querySelector("#currentTemperature");
  let minTemp = document.querySelector("#minTemp");
  let maxTemp = document.querySelector("#maxTemp");
  let weatherDescription = document.querySelector("#weatherDescription");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let feels_like = document.querySelector("#feels_like");
  let weatherImage = document.querySelector("#weatherImage");
  let fahr = document.querySelector("#fahr");
  let celsius = document.querySelector("#celsius");

  fahr.innerHTML = `°F`;
  celsius.innerHTML = `<strong>°C<strong/>`;

  currentLocation.innerHTML = `📍${response.data.name}, ${response.data.sys.country}`;
  celsiusTemperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  minTemp.innerHTML = `Min temp ${Math.round(response.data.main.temp_min)}°C`;
  maxTemp.innerHTML = `Max temp ${Math.round(response.data.main.temp_max)}°C`;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  feels_like.innerHTML = `Feels like: ${response.data.main.feels_like}°C`;
  //``
  weatherImage.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function update2celsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#currentTemperature");
  currentTemp.innerHTML = celsiusTemperature;
  let celsius = document.querySelector("#celsius");
  let fahr = document.querySelector("#fahr");
  fahr.innerHTML = `°F`;
  celsius.innerHTML = `<strong>°C<strong/>`;
}

function update2fahr(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#currentTemperature");
  currentTemp.innerHTML = Math.round(
    (parseFloat(celsiusTemperature) * 9) / 5 + 32
  );
  let fahr = document.querySelector("#fahr");
  let celsius = document.querySelector("#celsius");
  fahr.innerHTML = `<strong>°F<strong/>`;
  celsius.innerHTML = `°C`;
}

showCurrentTime();
let searchForm = document.querySelector("#search-form");
let celsius = document.querySelector("#celsius");
let fahr = document.querySelector("#fahr");
let currentButton = document.querySelector("#currentButton");
let celsiusTemperature = 23;
celsius.addEventListener("click", update2celsius);
fahr.addEventListener("click", update2fahr);
searchForm.addEventListener("submit", getData4city);
currentButton.addEventListener("click", getCurrentLocationData);
