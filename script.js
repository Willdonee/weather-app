const searchCity = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');

const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');
const weatherInfoSection = document.querySelector('.weather-info');

const countryTxt = document.querySelector('.country-txt');
const dateTxt = document.querySelector('.date-txt');
const tempTxt = document.querySelector('.temp-txt');
const conditionTxt = document.querySelector('.condition-txt');
const humidityTxt = document.querySelector('.humidity-value-txt');
const windTxt = document.querySelector('.wind-value-txt');
const weatherSummaryImg = document.querySelector('.weather-summary-img');


const apiKey = '1227298e6ecb4ff1b193cb85dc7a252b';

searchBtn.addEventListener('click', () => {
    if (searchCity.value !== '') {
        updateWeatherInfo(searchCity.value);
        searchCity.value = '';
        searchCity.blur();
    }
})

searchCity.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && searchCity.value !== '') {
        updateWeatherInfo(searchCity.value);
        searchCity.value = '';
        searchCity.blur();
    }
})

async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);

    return response.json();
}

function getWeatherIcon(id) {
    console.log(id);
    if (id <= 232) return `assets/weather/thunderstorm.svg`;
    if (id <= 321) return `assets/weather/drizzle.svg`;
    if (id <= 531) return `assets/weather/rain.svg`;
    if (id <= 622) return `assets/weather/snow.svg`;
    if (id <= 781) return `assets/weather/atmosphere.svg`;
    if (id <= 800) return `assets/weather/clear.svg`;
    if (id <= 804) return `assets/weather/clouds.svg`;
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city);

    if (weatherData.cod !== 200) {
        showDisplaySection(notFoundSection);
        return;
    }
    
    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed }
    } = weatherData;

    countryTxt.textContent = country;
    tempTxt.textContent = `${Math.round(temp)} °C`;
    conditionTxt.textContent = main;
    humidityTxt.textContent = `${humidity} %`;
    windTxt.textContent = `${speed} m/s`;
    dateTxt.textContent = new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    weatherSummaryImg.src = `${getWeatherIcon(id)}`;


    console.log(weatherData);

    showDisplaySection(weatherInfoSection);
}

function showDisplaySection(section) {
    [notFoundSection, searchCitySection, weatherInfoSection].forEach(section => {
        section.style.display = 'none';
    })

    section.style.display = 'flex';
}