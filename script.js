const input = document.querySelector('input')
const check = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const correctCity = document.querySelector('.correct-city')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const dateTime = document.querySelector('.date-time')
const felsLike = document.querySelector('.feels-like')
const visibility = document.querySelector('.visibility')
const feelsLike = document.querySelector('.feels-like')
const windSpeed = document.querySelector('.wind')

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=0008a1203bc97bddbd582b995891c656'
const API_UNITS = '&units=metric'

const hours = (new Date()).getHours();
const minutes = (new Date()).getMinutes();
const seconds = (new Date()).getSeconds();
const isDay = (hours >= 6 && hours < 18);
const allP = document.querySelectorAll('.info-wrap div p')

const getWeather = () => {
    const city = input.value
    const URL = API_URL + city + API_KEY + API_UNITS
    axios.get(URL).then(res => {
            const temperatureAPI = res.data.main.temp
            const humidityAPI = res.data.main.humidity
            const weatherStatusAPI = res.data.weather[0].main
            const photoStatusAPI = res.data.weather[0].id
            const feelsLikeAPI = res.data.main.feels_like
            const visibilityAPI = res.data.visibility
            const windSpeedAPI = res.data.wind.speed * 3.6
            const thunderstormStatus = photoStatusAPI >= 200 && photoStatusAPI <= 232
            const drizzleStatus = photoStatusAPI >= 200 && photoStatusAPI <= 232
            const rainStatus = photoStatusAPI >= 500 && photoStatusAPI <= 531
            const snowStatus = photoStatusAPI >= 600 && photoStatusAPI <= 622
            const atmoshpereStatus = photoStatusAPI >= 701 && photoStatusAPI <= 781
            const clearStatus = photoStatusAPI == 800
            const cloudsStatus = photoStatusAPI >= 801 && photoStatusAPI <= 804
            warning.textContent = ''
            cityName.textContent = res.data.name
            temperature.textContent = `${Math.floor(temperatureAPI)}°C`
            humidity.textContent = `${humidityAPI}%`
            weather.textContent = `${weatherStatusAPI}`
            feelsLike.textContent = `${Math.floor(feelsLikeAPI)}°C`
            windSpeed.textContent = `${Math.floor(windSpeedAPI)}km/h`
            visibilityAPI > 5000 ? visibility.textContent = 'Good' : visibility.textContent = 'Bad'
            photo.classList.add('wobble')
            cityName.classList.add('anim')
            allP.forEach(p => {
                p.classList.add('anim')
            })
            if (thunderstormStatus)
                photo.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/2204/2204356.png')
            else if (drizzleStatus)
                photo.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/2204/2204463.png')
            else if (rainStatus) {
                if (isDay)
                    photo.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/2204/2204350.png')
                else
                    photo.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/2204/2204386.png')
            } else if (snowStatus)
                photo.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/2204/2204360.png')
            else if (atmoshpereStatus)
                photo.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/2204/2204364.png')
            else if (clearStatus) {
                if (isDay)
                    photo.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/2204/2204346.png')
                else
                    photo.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/2204/2204373.png')
            } else if (cloudsStatus) {
                if (isDay) {
                    photo.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/3750/3750206.png')
                } else
                    photo.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/2204/2204383.png')
            } else {
                if (isDay) {
                    photo.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/2204/2204457.png')
                } else
                    photo.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/2204/2204459.png')
            }
        })
        .catch(() => {
            if (city == '')
                warning.textContent = 'Type city name'
            else
                warning.textContent = 'There is no such a place'
        })
    setTimeout(() => {
        allP.forEach(p => {
            p.classList.remove('anim')
        })
    }, 600)
    input.value = ''
    photo.classList.remove('wobble')
    cityName.classList.remove('anim')

}

const enter = (e) => {
    if (e.key == 'Enter') getWeather()
}

input.addEventListener('keydown', enter)
check.addEventListener('click', getWeather)