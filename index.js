// selectors
const weather = document.getElementsByClassName("weather");
const city = document.getElementById("country");
const country = document.getElementById("city");
const buttonWeather = document.getElementById("weatherButton");
const alert = document.getElementById("alert");
const textAlert = document.getElementById("text--Alert");
const phrasesWelcome = document.getElementsByClassName("weather__title");

//variables
const apiId = '194286018666bdc1aa1040bb8c019914';
let randonPhrases = ["rains", "sunny", "freezing"];

//functions
const searchWeather = (city, country) => {
  return new Promise((resolve, reject) => {
    resolve(axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`));
    reject(`We're sorry. cant find the country and city`); 
  })
};

const findWeather = (response) => {
  const name = response.data.name;
  const temperature = gradesKelvinToCentigrades(response.data.main.temp);
  const temperaturaMax = gradesKelvinToCentigrades(response.data.main.temp_max);
  const temperatureMin = gradesKelvinToCentigrades(response.data.main.temp_min);
  const status = response.data.weather[0].description;
  const wind = response.data.wind.speed;
  const icon = response.data.weather[0].icon;
  weather[0].innerHTML = 
    `<h3>${name} </h3>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
    <h2>${temperature}°C</h2>
    <div class="weather__temperature">
      <div class="weather__digit">
        <p>Max:${temperaturaMax}°C</p>
        <p>Min:${temperatureMin}°C</p>
      </div>
      <div class="weather__digit">
        <img src="img/viento.png" alt="">
        <p>${wind} Km/Hr</p>
      </div>
    </div>
    <h4>It's <span>${status}</span></h2>
    <button class="weather__button" onclick="location.reload()">
    Consult another city
    </button>`
};

const cantFindWeather = (error) => {
  console.log(`We're sorry. cant find the country and city`);
  if (error.response.data.cod === '404') {
    alert.classList.add("weather__alert--visible");
    textAlert.innerHTML = "No found city, Try again";
    setTimeout(function () {
      alert.classList.remove("weather__alert--visible");
    }, 2000)
  }
};

//function kelvin
function gradesKelvinToCentigrades(temperature) {
  return parseInt(temperature - 273.15);
};

function showWeather(button, nameCountry, nameCity) {
  button.addEventListener('click', () => {
    searchWeather(nameCountry.value, nameCity.value)
    .then(findWeather)
    .catch(cantFindWeather);
    validateFields(nameCity,nameCountry);
  })
};

function validateFields (city, country) {
  if (city.value === '' || country.value === '') {
    alert.classList.add("weather__alert--visible");
    textAlert.innerHTML = "Required fields";
    setTimeout(function () {
    alert.classList.remove("weather__alert--visible");
    }, 2000);
  }
};

function phrasesRandom(array) {
  let random = Math.floor(Math.random() * array.length);
  let phrases = array[random];
  switch (phrases) {
    case 'rains':
      phrasesWelcome[0].innerHTML = `<h2>If it <br>${phrases},<br> umbrella</h2>`
      break;
    case 'sunny':
      phrasesWelcome[0].innerHTML = `<h2>If it <br>${phrases},<br> sunscreen</h2>`
      break;
    case 'freezing':
      phrasesWelcome[0].innerHTML = `<h2>If it <br>${phrases},<br> Jacket</h2>`
      break;
    default:
    console.log('nothing here')
  }	
};

//call functions
showWeather(buttonWeather, country, city);
phrasesRandom(randonPhrases);
