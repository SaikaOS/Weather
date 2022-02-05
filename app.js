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


let cityInput = "Manchester"

cities.forEach(city => {
    city.addEventListener('click', (e) => {
       cityInput = e.target.innerHTML

     fetchWeatherData()
    })
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
        const hourr = data.timezone

        name.textContent = namee
        temp.textContent = tempp + "°"
        humidity.textContent = humidityy + "%"
        desc.textContent = descriptionn
        wind.textContent = Math.floor(windd) + " km/h"
        cloudy.textContent = Math.floor(cloudyy) + "%"
        
       // icon.src = "./icons/" + iconn
     //  let curDate = new Date()
     //  curDate.toLocaleString('en-GB')

      //let curHour = hourr / 3600
      /*  let curMin = curDate.getMinutes()

        if(curHour < 10) {
            curHour = "0" + curHour
        }

        let cityHour = data.timezone / 3600 - curHour
      //  let cityMin = (cityHour - Math.floor(cityHour)) * 60

        let cityMin = curMin - Math.abs(data.timezone / 3600) */

       // hour.textContent = Math.floor(cityHour) + ":" + Math.floor(cityMin)

        
        //calcTime(namee, hourr)



    let d = new Date()
    d.toLocaleString('en-GB')
    let localTime = d.getTime()
    let localOffset = d.getTimezoneOffset() * 60000
    let utc = localTime + localOffset
    let atlanta = utc + (1000 * hourr)
    let nd = new Date(atlanta)
    let ndd = nd.getHours()
    let nddMin = nd.getMinutes()

    if(ndd < 10) {
        ndd = '0' + ndd
    }

    if(nddMin < 10) {
        nddMin = '0' + nddMin
    }
    
    hour.textContent = ndd + ":" + nddMin

// Mon Jun 15 2020 17:07:59 GMT-0700
    })
}

    
    fetchWeatherData()


















/*

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

*/



/*
function calcTime(city, offset) {
    var d = new Date();
    var utc = d.getTime() + (offset * 60000);
    var nd = new Date(utc + (3600000*offset));

    let ndd = nd.getHours()
    let ndd2 = nd.getMinutes()
    
    return ndd + ":" + ndd2
} */