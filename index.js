document.addEventListener("DOMContentLoaded", () => {
    //GET THE REFRENCE OF ALL THE FIELD WHEN WE WANT TO ADD DYNAMIC DATA
    let w_city = document.querySelector(".weather-city");
    let w_date_time = document.querySelector(".weather-date-time");
    let w_forecast = document.querySelector(".weather-forecast");
    let w_icon = document.querySelector(".weather-icon");
    let w_temprature = document.querySelector(".weather-temprature");
    let w_min = document.querySelector(".weather-min");
    let w_max = document.querySelector(".weather-max");
    let w_feelslike = document.querySelector(".weather-feelslike");
    let w_humidity = document.querySelector(".weather-humidity");
    let w_wind = document.querySelector(".weather-wind");
    let w_pressure = document.querySelector(".weather-pressure");
    let city_search = document.querySelector(".weather-search");

    //GET COUNTRY NAME
    const getCountryName = (code) => {
        return new Intl.DisplayNames([code], { type: 'region' }).of(code);
    }

    //GET DATE AND TIME IN SPECIFIC FORMAT
    const getDateTime = (dt) => {
        const curDate = new Date(dt * 1000);
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        }
        const formatter = new Intl.DateTimeFormat('en-US', options);
        return formatter.format(curDate);
    }

    //FOR GIVE DEFAULT CITY NAME 
    let city = "surat";

    //FOR SEARCH CITY AND GET THE DATA
    city_search.addEventListener("submit", (e) => {
        e.preventDefault();
        let cityName = document.querySelector(".city-name");
        city = cityName.value;

        //CALL THE FUNCTION AGAIN WHEN WE SEARCH THE PARTICULAR CITY AND ADD DYNAMIC VALUE IN THE API INSTEAD OF CITY VARIABLE
        fetchWeatherData();
        cityName.value = "";
    })

    //FOR GET THE DATA AT THE TIME OF PAGE LOAD
    let fetchWeatherData = async () => {
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a9c058c9e3189882dafed321f05066a5`;
        try {
            //FETCH THE API WITH THE HELP OF ASYNC AWAIT
            let fetchapi = await fetch(api);
            let data = await fetchapi.json();

            //FOR DESTRUCTRUCTOR THE DESIRABLE DATA FROM THE API
            let { main, name, weather, wind, sys, dt } = data;
            //FOR FILL THE DATA ACCORDING THE API SEARCH
            w_city.innerText = `${name}, ${getCountryName(sys.country)}`;
            w_date_time.innerText = getDateTime(dt);
            w_forecast.innerText = `${weather[0].main}`;
            w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="image not found" style="width:70%; aspect-ratio:1"/>`;
            w_temprature.innerHTML = `${main.temp}&#176`;
            w_min.innerHTML = `Min : ${main.temp_min.toFixed(2)}&#176`;
            w_max.innerHTML = `Max : ${main.temp_max.toFixed(2)}&#176`;
            w_feelslike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
            w_humidity.innerHTML = `${main.humidity}%`;
            w_wind.innerHTML = `${wind.speed} m/s`;
            w_pressure.innerHTML = `${main.pressure} hpa`;
        } catch (error) {
            console.log("Error fetching weather data:", error);
        }
    }
    //CALL THE FUNCTION AT THE TIME OF PAGE LOAD BY DEFAULT
    fetchWeatherData();
});

