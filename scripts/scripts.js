import {niceDate, niceTime, windDirection} from './utils.js';

document.getElementById('getWeather').addEventListener('click', getWeather);

function getWeather() {
    let weatherList = document.getElementById('weatherList');        
    let city        = document.getElementById('city');               

    if (city.value.length === 0) {
        weatherList.innerHTML = 'Please Enter the City name';
        return;
    }
    let key = 'ac62c32e0537fc708a489b00c343f912'
    let url =`https://api.openweathermap.org/data/2.5/forecast?appid=${key}&q=${city.value}&units=imperial`;

    console.log(url);
    fetch(url)
        .then(resp => resp.json())          //  wait for the response and convert it to JSON
        .then(weather => {                  //  with the resulting JSON data do something

            //  If the city was entered extract weather based on the API
            //  extract the interesting data from the JSON object and show it to the user
            //  We will build the HTML to be inserted later.
            //  The variable innerHTML will hold our work in progress
            let innerHTML = "";
            //  City API (forecast)
            let color = 0;
            for (let day of weather.list) {
                color++;
                //  let's build a nice card for each day of the weather data
                //  this is a GREAT opportunity to Reactify this code. But for now I will keep it simple
                innerHTML +=`
                <div class="grid-item w3-theme-${(color%2)>0 ? 'l2':'d2'}">
                    <h4>Date: ${niceDate(day.dt, 0)} ${niceTime(day.dt, 0)}</h4>
                    <p>Forecast: ${day.weather[0].description} <img src='http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png' alt="" height="70%"></p>
                    <p>Wind at ${day.wind.speed.toFixed(0)} mph out of the ${windDirection(day.wind.deg, false)}</p>
                    <p>Sunrise: ${niceTime(weather.city.sunrise, 0)} / Sunset: ${niceTime(weather.city.sunset, 0)}</p>
                    <p>Temp: ${day.main.temp.toFixed(0)}˚ F</p>
                </div>`;
            }
            //  and finally take the finished URL and stuff it into the web page
            weatherList.innerHTML = innerHTML;
            city.value = weather.city.name;
        });
}