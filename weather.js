// selectors
const weather = document.getElementsByClassName("weather");
const city = document.getElementById("country");
const country = document.getElementById("city");
const buttonWeather = document.getElementById("weatherButton");
const alert = document.getElementById("alert");
const textAlert = document.getElementById("text--Alert");
const phrasesWelcom = document.getElementsByClassName("weather__title");

// random phrases
let randonPhrases = ["rains", "sunny", "freezing"]
function phrasesRandom (array) {
	let random = Math.floor(Math.random()*array.length);
	let phrases = array[random];
	console.log(phrases);
	if(phrases ==='rains'){
		phrasesWelcom[0].innerHTML= `<h2>If it <br>${phrases},<br> umbrella</h2>`
	} else if (phrases ==='sunny'){
		phrasesWelcom[0].innerHTML= `<h2>If it <br>${phrases},<br> sunscreen</h2>`
	}else if (phrases ==='freezing'){
		phrasesWelcom[0].innerHTML= `<h2>If it <br>${phrases},<br> Jacket</h2>`
	}
}
//api ID
const apiId = '194286018666bdc1aa1040bb8c019914'

//api function
const api = (country, city) => {
	axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country},${city}&appid=${apiId}`)

		.then(response => {
			console.log(response.data)
			const name = response.data.name;
			const temperature = gradesKelvinToCentigrades(response.data.main.temp);
			const temperaturaMax = gradesKelvinToCentigrades(response.data.main.temp_max);
			const TemperatureMin = gradesKelvinToCentigrades(response.data.main.temp_min);
			const status = response.data.weather[0].description;
			const wind = response.data.wind.speed;
			const icon = response.data.weather[0].icon;
			console.log(icon);
			weather[0].innerHTML = `
    <h3>${name} </h3>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
    <h2>${temperature}°C</h2>
    <div class="weather__temperature">
      <div class="weather__digit">
        <p>Max:${temperaturaMax}°C</p>
        <p>Min:${TemperatureMin}°C</p>
      </div>
      <div class="weather__digit">
        <img src="img/viento.png" alt="">
        <p>${wind} Km/Hr</p>
      </div>
    </div>
    <h4>It's <span>${status}</span></h2>
    <button class="weather__button" onclick="location.reload()">Consult another city</button>
    `
		})

		.catch(error => {
			console.log('estamos en el catch', error)
			if (error.response.data.cod === '404') {
				alert.classList.add("weather__alert--visible")
				textAlert.innerHTML = "No found city, Try again"
				setTimeout(function () {
					alert.classList.remove("weather__alert--visible")
				}, 2000)
			}
		})
}

//function show weather
function showWeather(button, nameCountry, nameCity) {
	button.addEventListener('click', () => {
		api(nameCountry.value, nameCity.value);
		if (city.value === '' || country.value === '') {
			alert.classList.add("weather__alert--visible")
			textAlert.innerHTML = "Required fields"
			setTimeout(function () {
				alert.classList.remove("weather__alert--visible")
			}, 2000);
		}
	})
}

//function kelvin
function gradesKelvinToCentigrades(temperature) {
	return parseInt(temperature - 273.15);
}

//call fuctions
showWeather(buttonWeather, country, city);
phrasesRandom(randonPhrases);
