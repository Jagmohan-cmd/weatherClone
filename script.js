const apiKey = "83aeeba20458fca2cb911ab89a6b7c33";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Array to store cities
let cities = [];

// Function to add a city
async function addCity() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();

    if (cityName === "") {
        alert("Please enter a city name");
        return;
    }

    // Check for duplicate cities
    if (cities.find(city => city.name.toLowerCase() === cityName.toLowerCase())) {
        alert("City already added");
        return;
    }

    // Fetch weather data
    try {
        const response = await fetch(`${BASE_URL}?q=${cityName}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            cities.push(data);
            // Sort cities by temperature
            cities.sort((a, b) => a.main.temp - b.main.temp);
            renderWeatherCards();
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }

    // Clear the input field
    cityInput.value = "";
}

// Function to render weather cards
function renderWeatherCards() {
    const weatherCardsContainer = document.getElementById('weatherCards');
    weatherCardsContainer.innerHTML = "";

    cities.forEach(city => {
        const card = document.createElement('div');
        card.classList.add('weather-card');
        card.innerHTML = `
            <h3>${city.name}</h3>
            <img src="icons/${city.weather[0].icon}.png" alt="Weather Icon">
            <p>Temperature: ${city.main.temp}&deg;C</p>
            <p>Weather: ${city.weather[0].main}</p>
            <p>Humidity: ${city.main.humidity}%</p>
            <p>Pressure: ${city.main.pressure} hPa</p>
            <p>Wind Speed: ${city.wind.speed} m/s</p>
        `;

        weatherCardsContainer.appendChild(card);
    });
}
