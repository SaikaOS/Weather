let name = document.querySelector('.name') 
let temp = document.querySelector('.temp') 
let hour = document.querySelector('.hour') 
let date = document.querySelector('.date')  
let day = document.querySelector('.day')  
let month = document.querySelector('.month')  
let year = document.querySelector('.year')  
let icon = document.querySelector('.icon') 
let desc = document.querySelector('.vars') 
let form = document.querySelector('form')
let btn = document.querySelector('.search_btn')
let searchInput = document.querySelector('.search_input')
let cities = document.querySelectorAll('.cities')
let cloudy = document.querySelector('.cloudy span') 
let humidity = document.querySelector('.humidity span') 
let wind = document.querySelector('.wind span') 

let cityInput = "London"

cities.forEach(city => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML
        fetchWeatherData()
        document.body.style.opacity = '0'
    })
})

form.addEventListener('submit', e => {
    if(searchInput.value.length == 0) {
        alert("Please type in a city name")
    } else {
        cityInput = searchInput.value
        fetchWeatherData()
        searchInput.value = ''
        document.body.style.opacity = '0'
    }
    e.preventDefault()
})

function fetchWeatherData() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=08d1d136cf7b6a2075738941b8063f26`)
    .then(response => response.json())
    .then(data => {
        const namee = data.name
        const tempp = Math.floor(data.main.temp - 273.15)
        const descriptionn = data.weather[0].description 
        const iconn = data.weather[0].icon
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
        icon.src = `http://openweathermap.org/img/wn/${iconn}@2x.png`
        
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

        if (ndd < 5 || ndd > 19) {
            if (iconn == '02n' || iconn == '03n' || iconn == '04n') {
                document.body.style.color = "white"
                document.body.style.backgroundImage = "url(/images/night/cloudy.jpg)"
            }
            else if (iconn == '01n'){
                document.body.style.color = "white"
                document.body.style.backgroundImage = "url(/images/night/clear.jpg)"
            }
            else if (iconn == '09n' || iconn == '10n' || iconn == '11n') {
                document.body.style.color = "white"
                document.body.style.backgroundImage = "url(/images/night/rainy.jpg)"
            }
            else if (iconn == '13n' || iconn == '50n') {
                document.body.style.color = "white"
                document.body.style.backgroundImage = "url(/images/night/snowy.jpg)"
            }
        }
        else{
            if (iconn == '02d' || iconn == '03d' || iconn == '04d') {
                document.body.style.backgroundImage = "url(/images/day/cloudy.jpg)"
                document.body.style.color = "white"
            }
            else if (iconn == '01d'){
                document.body.style.backgroundImage = "url(/images/day/clear.jpg)"
                document.body.style.color = "black"
            }
            else if (iconn == '09d' || iconn == '10d' || iconn == '11d') {
                document.body.style.backgroundImage = "url(/images/day/rainy.jpg)"
                document.body.style.color = "white"
            }
            else if (iconn == '13d' || iconn == '50d') {
                document.body.style.backgroundImage = "url(/images/day/snowy.jpg)"
                document.body.style.color = "white"
            }        }


        if(nddMin < 10) {
        nddMin = '0' + nddMin
        }
    
        hour.textContent = ndd + ":" + nddMin

        const dt = data.dt
        
        let dtObj = new Date(dt * 1000)

    function getDayy() {
        if(dtObj.getDay() == 0) {
            day.textContent = "Sunday"
        } else if(dtObj.getDay() == 1) {
            day.textContent = "Monday"
        } else if(dtObj.getDay() == 2) {
            day.textContent = "Tuesday"
        } else if(dtObj.getDay() == 3) {
            day.textContent = "Wednesday"
        } else if(dtObj.getDay() == 4) {
            day.textContent = "Thursday"
        } else if(dtObj.getDay() == 5) {
            day.textContent = "Friday"
        } else if(dtObj.getDay() == 6) {
            day.textContent = "Saturday"
        }
    }

    function getDatee() {
        date.textContent = dtObj.getDate()
    }

    function getMonthh() {
        if(dtObj.getMonth() == 0) {
            month.textContent = "January"
        } else if(dtObj.getMonth() == 1) {
            month.textContent = "February"
        } else if(dtObj.getMonth() == 2) {
            month.textContent = "March"
        } else if(dtObj.getMonth() == 3) {
            month.textContent = "April"
        } else if(dtObj.getMonth() == 4) {
            month.textContent = "May"
        } else if(dtObj.getMonth() == 5) {
            month.textContent = "June"
        } else if(dtObj.getMonth() == 6) {
            month.textContent = "July"
        } else if(dtObj.getMonth() == 7) {
            month.textContent = "August"
        } else if(dtObj.getMonth() == 8) {
            month.textContent = "September"
        } else if(dtObj.getMonth() == 9) {
            month.textContent = "Octuber"
        } else if(dtObj.getMonth() == 10) {
            month.textContent = "November"
        } else if(dtObj.getMonth() == 11) {
            month.textContent = "December"
        } 
    }

    function getYearr() {
       const y1 = dtObj.getFullYear().toString()
       const y2 = y1.slice(2)
       year.textContent = y2
    }
        getDayy()
        getDatee()
        getMonthh()
        getYearr()

        document.body.style.opacity = '1'
    })
}

fetchWeatherData()