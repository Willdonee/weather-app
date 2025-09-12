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

const forecastContainer = document.querySelector('.forecast-items-container');


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
    if (id <= 232) return `assets/weather/thunder.svg`;
    if (id <= 321) return `assets/weather/rainy-4.svg`;
    if (id <= 531) return `assets/weather/rainy-7.svg`;
    if (id <= 622) return `assets/weather/snowy-5.svg`;
    if (id <= 781) return `assets/weather/atmosphere.svg`;
    if (id <= 800) return `assets/weather/day.svg`;
    if (id <= 804) return `assets/weather/cloudy-day-2.svg`;
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

    await updateForecastInfo(city);

    showDisplaySection(weatherInfoSection);
}

async function updateForecastInfo(city) {
    const forecastData = await getFetchData('forecast', city);

    const timeTaken = '12:00:00';
    const todayDate = new Date().toISOString().split('T')[0];
    
    console.log(todayDate);
    forecastContainer.innerHTML = '';
    forecastData.list.forEach(forecastWeather => {
        if (forecastWeather.dt_txt.includes(timeTaken) && forecastWeather.dt_txt.split(' ')[0] !== todayDate) {
            console.log(forecastWeather);
            updateForecastItem(forecastWeather);
        }
    })

    console.log(forecastData);
}

function updateForecastItem(weatherData) {
    const {
        dt_txt: date,
        main: { temp },
        weather: [{ id }]
    } = weatherData;

    const dateTaken = new Date(date);
    const timeOptions = { day: 'numeric', month: 'short'};
    const dateResult = dateTaken.toLocaleDateString('en-US', timeOptions);

    const forecastItem = `
        <div class="forecast-item">
            <h5 class="forecast-item-date">${dateResult}</h5>
            <img src="${getWeatherIcon(id)}" alt="" class="forecast-item-img">
            <h5 class="forecast-item-temp">${Math.round(temp)} °C</h5>
        </div>
    `
    
    forecastContainer.insertAdjacentHTML('beforeend', forecastItem);
}

function showDisplaySection(section) {
    [notFoundSection, searchCitySection, weatherInfoSection].forEach(section => {
        section.style.display = 'none';
    })

    section.style.display = 'flex';
}