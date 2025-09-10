const searchCity = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');

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

function getFetchData() {
    
}

function updateWeatherInfo(city) {
    const weatherData = getFetchData()
}