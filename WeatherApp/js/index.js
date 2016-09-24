$(document).ready(function() {

  // takes latitude and longitude parameters
  // returns an api url formated with user's location
  function getWeatherApiUrl(latitude, longitude) {

    var apiUrl = "https://api.wunderground.com/api/1bc2b90471cb41bd/conditions/q/";

    return apiUrl + latitude + "," + longitude + ".json";

  }

  // updates the weather if enough time has elapsed since prior update
  function updateWeather(apiUrl) {

    $.getJSON(apiUrl, function(json) {
      console.log(json);
      var cityName = json.current_observation.display_location.city;
      var temp = json.current_observation.temp_f;
      $(".conditions").html(cityName + ": " + temp + " °F");

    });

  }

  // get user's current location at the start
  var getWeather = navigator.geolocation.getCurrentPosition(function(position) {
    // store coords and weather, use if not enough unix time has elapsed
    var TIME_ELAPSE_TO_UPDATE = 30000;  // 30 secs must elapse to update
    var timeUpdated = new Date(0);
    var timeCurrent = Date.now();

    // only update weather if enough time elapsed
    if(timeCurrent > (timeUpdated - TIME_ELAPSE_TO_UPDATE)) {
      updateWeather(getWeatherApiUrl(position.coords.latitude, position.coords.longitude));
      timeUpdated = timeCurrent;
    }
    else {
      console.log("Please wait " +
      (TIME_ELAPSE_TO_UPDATE - (timeCurrent - timeUpdated)) / 1000 +
      "secs to update weather.");
    }

  });

  // get a new quote when the button is pressed
  $("#update").on("click", function() {
    
  });
});
