let name = document.querySelector('.name') // +
let temp = document.querySelector('.temp') // +
let hour = document.querySelector('.hour')
let date = document.querySelector('.date')  
let icon = document.querySelector('.any img') // +
let desc = document.querySelector('.vars') // +
const form = document.querySelector('form')
const btn = document.querySelector('.search_btn')
let searchInput = document.querySelector('.search_input')
let cities = document.querySelectorAll('.cities')
let cloudy = document.querySelector('.cloudy span') // +
let humidity = document.querySelector('.humidity span') // +
let wind = document.querySelector('.wind span') // +


let cityInput = "London"

cities.forEach(city => {
    city.addEventListener('click', (e) => {
       cityInput = e.target.innerHTML

     fetchWeatherData()
    })
})

form.addEventListener('submit', (e) => {
    if(searchInput.value == 0) {
        alert("Please type in a city name")
    } else {
        cityInput = searchInput.value

    fetchWeatherData()

        searchInput.value = ""

    }
})

function fetchWeatherData() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=08d1d136cf7b6a2075738941b8063f26`)
    .then(response => response.json())
    .then(data => {
        const namee = data.name
        const tempp = Math.floor(data.main.temp - 273.15)
        const descriptionn = data.weather[0].description 
      //  const iconn = data.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length)
        const humidityy = data.main.humidity
        const cloudyy = data.clouds.all
        const windd = data.wind.speed

        name.textContent = namee
        temp.textContent = tempp + "°"
        humidity.textContent = humidityy + "%"
        desc.textContent = descriptionn
        wind.textContent = Math.floor(windd) + " km/h"
        cloudy.textContent = Math.floor(cloudyy) + "%"
       // icon.src = "./icons/" + iconn

       let curDate = new Date()
       curDate.toLocaleString('en-GB')

       let curHour = curDate.getHours()
       let curMin = curDate.getMinutes()

        if(curHour < 10) {
            curHour = "0" + curHour
        }

        if(curHour == 0 || curHour > 19) {
            document.body.style.backgroundImage = "url(/images/night/rainy.jpg)"
        }

        hour.textContent = curHour + ":" + curMin

        if(desc.includes("rain")) {
            if(curHour > 4) {
                document.body.style.backgroundImage = "url(/images/day/rainy.jpg)"
            }
        }
    })
}

fetchWeatherData()

/*



*/