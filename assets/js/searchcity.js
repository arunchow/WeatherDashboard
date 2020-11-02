// <!-- Bootcamp Project Module 6 -->
// <!--Version 1.0-->
// <!--Author:AC-->
// <!--Date: 11-01-2020 -->

//variables
var userFormEl = document.querySelector("#form-city");
var cityInputEl = document.querySelector("#city-input");
var currentEl = document.querySelector("#current");
var UVIndexEl = document.querySelector("#UVIndex");
var forecastEl = document.querySelector("#forecast");

//search City call
var searchCity = function(city) {
    // format the openweathermap api url
    var apiUrl =  "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=8046ffe3bd5d7dc40f86e859f5434eb5";
    fetch(apiUrl)
    .then(function(response) {
        // request was successful
        
        if (response.ok) {
        response.json().then(function(data) {
            //displayRepos(data, city);
            displayWeather(data);
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            getUV(lat, lon);
            get5DayForecast(city);
            //console.log(data);
        });
        } else {
        alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to API");
    });
  };
//--------------------------------------------- getUV call ---------------------------------------//
var getUV = function(lat, lon) 
{
  // format the openweathermap api url
    var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=8046ffe3bd5d7dc40f86e859f5434eb5&lat=" + lat  + "&lon=" + lon;
    
    fetch(queryURLUV).then(function(response){
       
           // request was successful
           if (response.ok){
               response.json().then(function(data){
                displayUV(data);
                });
           } 
           else 
           {
               alert("Error: " + response.statusText);
           }
       })
       .catch(function(error) 
       {
           // Notice this `.catch()` getting chained onto the end of the `.then()` method
           alert("Unable to connect to API");
       });
};
 
//5 day forecast
var get5DayForecast = function(city) 
{
       // format the openweathermap api url
       var apiUrl =  "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=8046ffe3bd5d7dc40f86e859f5434eb5";
     
       // make a request to the url
       //debugger;
       fetch(apiUrl)
       .then(function(response) 
       {
           // request was successful
           if (response.ok) 
           {
               response.json().then(function(data) 
                {
               //displayRepos(data, city);
                    display5DayForecast(data)
               //console.log(data);
                });
           } 
           else 
           {
               alert("Error: " + response.statusText);
           }
       })
       .catch(function(error) 
       {
           // Notice this `.catch()` getting chained onto the end of the `.then()` method
           alert("Unable to connect to API");
       });
    };



 // Submit Handler
  var formSubmitHandler = function(event) 
  {
    event.preventDefault();
    // get value from input element
    var city = cityInputEl.value.trim();
    //debugger;
    if (city) {
    searchCity(city);
    

    cityInputEl.value = "";
    } else {
    alert("Please enter a city");
    }
    console.log(event);
  };

//Make a change here
userFormEl.addEventListener("submit", formSubmitHandler);

//make a change here
 var displayWeather = function(data) 
 {
    var mainDate = moment().format('L');
    //create HTML for city information......
    currentEl.innerHTML = "";
 
    currentEl.setAttribute = ("style","width: auto; height: 11rem");
    var currentDiv = document.createElement('div');
        currentDiv.setAttribute = ("style","width: auto; height: 11rem");
    var cityNameEl = document.createElement("h2");
        cityNameEl.textContent = data.name;
 
    var displayMainDate = cityNameEl.append(" " + mainDate);
    var tempEL = document.createElement("p");
        tempEL.innerText = "Temperature: " + data.main.temp;   
    var humEl = document.createElement("p");
        humEl.innerText = "Humidity: " + data.main.humidity;
    var windEl = document.createElement("p");
        windEl.innerText = "Wind Speed: " + data.wind.speed;
    var currentweather = data.weather[0].main;
    //
    var currentIcon = document.createElement('img');
    if (currentweather === "Rain") 
    {
        currentIcon.src = 'http://openweathermap.org/img/wn/09d.png';
        //currentIcon.attr("style", "height: 60px; width: 60px");
    } 
    else if (currentweather=== "Clouds") 
    {
        currentIcon.src = 'http://openweathermap.org/img/wn/03d.png';
        //currentIcon.attr("style", "height: 60px; width: 60px");
    } 
    else if (currentweather === "Clear") 
    {
        currentIcon.src = 'http://openweathermap.org/img/wn/01d.png';
        //currentIcon.attr("style", "height: 60px; width: 60px");
    }
     else if (currentweather === "Drizzle") 
    {
        currentIcon.src = 'http://openweathermap.org/img/wn/10d.png';
        //currentIcon.attr("style", "height: 60px; width: 60px");
    }
    else if (currentweather === "Snow") 
    {
        currentIcon.src = 'http://openweathermap.org/img/wn/13d.png';
        //currentIcon.attr("style", "height: 60px; width: 60px");
    }
    currentDiv.append(cityNameEl);
    currentDiv.append(currentIcon);
    currentDiv.append(tempEL);
    currentDiv.append(humEl);
    currentDiv.append(windEl);
    currentEl.appendChild(currentDiv);
    
}

//--------------------------------------------- display UV call ---------------------------------------//
var displayUV = function(data)
 {
    UVIndexEl.innerHTML = "";
    UVResult = data.value;
    var uvEL = document.createElement('td');
        uvEL.innerText = "UV Index: " + data.value; 
    if (UVResult < 3) 
    {
        UVIndexEl.style.backgroundColor = "#00FF00" ;
    }
    else if (UVResult > 2 && UVResult < 8) 
    {
        UVIndexEl.style.backgroundColor = "#FFFF00";
    }
    else if (UVResult > 7)
    {
        UVIndexEl.style.backgroundColor = "#FF0000";
    }
    UVIndexEl.appendChild(uvEL);
 }

//display 5 day forecast
var display5DayForecast = function(data)
 {
    var results = data.list;
 
    forecastEl.innerHTML = "";
    var h2Header = document.createElement('h2');
                   h2Header.innerText = "5 Day Forecast";
    forecastEl.appendChild(h2Header);
        //create HTML for 5day forcast................
        for (var i = 0; i < results.length; i += 8) {
            // Creating a div
            var fiveDayDiv = document.createElement('div');
                fiveDayDiv.classList.add("col-sm");
                fiveDayDiv.setAttribute = ("style","width: auto; height: 11rem");
            
            //Storing the responses date temp and humidity.......
            var date = results[i].dt_txt;
            var setD = date.substr(0,10)
            var temp = results[i].main.temp;
            var hum = results[i].main.humidity;
            var forecastIcon = document.createElement('img');
 
            
            var h5date = document.createElement('H5');
                h5date.classList.add("card-title");
                 h5date.innerText = setD;

 
            var pTemp = document.createElement('p');
                pTemp.classList.add("card-text")
                pTemp.innerText = "Temp: " + temp;
            var pHum = document.createElement('p');
                pHum.classList.add("card-text");
                pHum.innerText = "Humidity: " + temp;

            var weather = results[i].weather[0].main

            if (weather === "Rain") {
                forecastIcon.src = 'http://openweathermap.org/img/wn/09d.png';
                //icon.attr("style", "height: 40px; width: 40px");
            } else if (weather === "Clouds") {
                forecastIcon.src = 'http://openweathermap.org/img/wn/03d.png';
                //icon.attr("style", "height: 40px; width: 40px");
            } 
             else if (weather === "Clear") {
                forecastIcon.src = 'http://openweathermap.org/img/wn/01d.png';
                //icon.attr("style", "height: 40px; width: 40px");
            }
             else if (weather === "Drizzle") {
                forecastIcon.src = 'http://openweathermap.org/img/wn/10d.png';
                //icon.attr("style", "height: 40px; width: 40px");
            }
             else if (weather === "Snow") {
                forecastIcon.src = 'http://openweathermap.org/img/wn/13d.png';
                //icon.attr("style", "height: 40px; width: 40px");
            }
 
            fiveDayDiv.append(h5date);
            fiveDayDiv.append(forecastIcon);
            fiveDayDiv.append(pTemp);
            fiveDayDiv.append(pHum);
            forecastEl.appendChild(fiveDayDiv);
        }
 }

 