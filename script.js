function GetInfo() {
  //query selector by id
  var newCity = document.getElementById("cityInput");
  var cityName = document.getElementById("cityName");
  //get the input value
  cityName.innerHTML = newCity.value;
  //fetch data from sever
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      newCity.value +
      "&appid=9b51a8928e13fdff581d6c2946615e27"
  )
    .then((response) => response.json())
    .then((data) => {
      //Using for loop to get 5 days temperature
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Temp").innerHTML =
          "Temp: " +
          Number(data.list[i].main.temp_min - 273.15).toFixed(1) +
          "°";
      }
      //Using for loop to get 5 days humidity
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Humidity").innerHTML =
          "Humidity: " + Number(data.list[i].main.humidity).toFixed(1) + "%";
      }
      //Using for loop to get 5 days windspeed
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Windspeed").innerHTML =
          "Windspeed: " + Number(data.list[i].wind.speed).toFixed(1) + "mph";
      }

      //Using for loop to get 5 days icon
      for (i = 0; i < 5; i++) {
        document.getElementById("img" + (i + 1)).src =
          "http://openweathermap.org/img/wn/" +
          data.list[i].weather[0].icon +
          ".png";
      }
    });
}

//Function to set default as Santa Ana city
function DefaultScreen() {
  document.getElementById("cityInput").defaultValue = "Santa Ana";
  GetInfo();
}

//Display the next 5 days
var d = new Date();
var weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//corect index days in array
function CheckDay(day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}

//Loop and display the next 5 days
for (i = 0; i < 5; i++) {
  document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}
