const formulario = document.formu;
const apiKey = "69f5bbff846025e6194376abed069775";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const citiesByCountry = {
    "ES": ["Madrid", "Barcelona", "Sevilla"],
    "US": ["New York", "Los Angeles", "Chicago"],
    "GB": ["Londres", "Manchester", "Birmingham"],
    "DE": ["Berlín", "Múnich", "Hamburgo"],
    "IT": ["Roma", "Milan", "Florencia"],
    "FR": ["París", "Marsella", "Lyon"]
};

function updateCityOptions() {
    const countrySelect = formulario.pais;
    const citySelect = formulario.ciudad;
    const selectedCountry = countrySelect.value;

    citySelect.innerHTML = '<option disabled selected>Selecciona ciudad</option>';

    citiesByCountry[selectedCountry].forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

formulario.pais.addEventListener('change', updateCityOptions);

updateCityOptions();

function validateForm() {
    const city = formulario.ciudad.value;
    const country = formulario.pais.value;

    if (city === "Selecciona ciudad" || country === "Selecciona país") {
        printError("Selecciona un país y una ciudad válidos");
        return false;
    }

    return true;
}

function buscaTiempo(e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const city = formulario.ciudad.value;
    const country = formulario.pais.value;
    const url = `${baseUrl}?q=${city},${country}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            document.getElementById("loading").style.display = "none";
            document.getElementById("weather-info").style.display = "block";
        })
        .catch(error => {
            console.error("Error al obtener datos meteorológicos:", error);
            document.getElementById("loading").style.display = "none";
        });
}


function displayWeather(weatherData) {
    const weatherDescriptionElement = document.getElementById("weather-description");
    const temperatureElement = document.getElementById("temperature");
    const humidityElement = document.getElementById("humidity");
    const windSpeedElement = document.getElementById("wind-speed");
    const pressureElement = document.getElementById("pressure");

    if (weatherData.cod === 200) {
        const weatherDescription = weatherData.weather[0].description;
        const temperature = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
        const pressure = weatherData.main.pressure;

        weatherDescriptionElement.textContent = `Clima: ${weatherDescription}`;
        temperatureElement.textContent = `Temperatura: ${temperature} °C`;
        humidityElement.textContent = `Humedad: ${humidity}%`;
        windSpeedElement.textContent = `Velocidad del viento: ${windSpeed} m/s`;
        pressureElement.textContent = `Presión: ${pressure} hPa`;
    } else {
        printError("Error al obtener datos meteorológicos");
    }
}

function printError(message) {
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = `<p style="color: red">${message}</p>`;
    document.getElementById("loading").style.display = "none";
}

