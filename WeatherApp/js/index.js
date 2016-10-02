$(document).ready(function() {

  var cityName, tempF, tempC, condition; // capture current conditions once
  var currentUnits = "C";   // default to Celsius

  // takes latitude and longitude parameters
  // returns an api url formated with user's location
  function getWeatherApiUrl(latitude, longitude) {

    var apiUrl = "https://api.wunderground.com/api/1bc2b90471cb41bd/conditions/q/";

    return apiUrl + latitude + "," + longitude + ".json";

  }

  // check the weather
  function updateWeather(apiUrl) {

    $.getJSON(apiUrl, function(json) {
      cityName = json.current_observation.display_location.city;
      tempF = json.current_observation.temp_f;
      tempC = json.current_observation.temp_c;
      condition = json.current_observation.weather;
      var country = json.current_observation.display_location.country;
      if(country == "US") {
        currentUnits = "F";
      }
      displayWeather();
      changeButton();
    });
  }
  
  function displayWeather() {
    $(".city").html(cityName);
    $(".condition").html(condition);
    $(".temp").html(getTemp(currentUnits));
    $(".unit").html("° " + currentUnits);
  }
  
  function getTemp(unit) {
    switch(unit) {
      case "F":
        return tempF;
      default:
        return tempC;
    }
  }
  
  function changeButton() {
    if(currentUnits == "C") {
      $("#units").html("Use Fahrenheit");
    } else {
      $("#units").html("Use Celsius");
    }
  }

  // get user's current location at the start, and load weather at that location
  var getWeatherAtLocation = navigator.geolocation.getCurrentPosition(function(position) {
    updateWeather(getWeatherApiUrl(position.coords.latitude, position.coords.longitude));
  });

  // change the unit of measurement when unit button is pressed
  $("#units").on("click", function() {
    if(currentUnits == "C") {
      currentUnits = "F";
    } else {
      currentUnits = "C";
    }
    displayWeather();
    changeButton();
  });
});