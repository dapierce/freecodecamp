$(document).ready(function() {

  var cityName, tempF, tempC, condition, icon; // capture current conditions once
  var currentUnits = "C"; // default to Celsius, change if needed
  var day = true; // default to no moon for weather icons

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
      icon = json.current_observation.icon;
      condition = json.current_observation.weather;
      var country = json.current_observation.display_location.country;
      if (country === "US") {
        currentUnits = "F";
      }
      console.log(json);
      displayWeather();
      displayButton();
      // fade in page now that everything's loaded
      $(function() {
        $('body').removeClass('fade-out');
      });
    });
  }

  // show the current weather
  function displayWeather() {
    $(".city").html(cityName);
    $("#icon").attr("class", getIcon(icon));
    $("#icon").attr("title", condition);
    $(".condition").html(condition);
    $(".temp").html(getTemp(currentUnits));
    $(".unit").html("° " + currentUnits);
  }

  function getTemp(unit) {
    switch (unit) {
      case "F":
      return tempF;
      default:
      return tempC;
    }
  }

  function displayButton() {
    if (currentUnits == "C") {
      $("#units").html("Use Fahrenheit");
    } else {
      $("#units").html("Use Celsius");
    }
  }

  // gets the correct icon for the current weather and time conditions
  function getIcon(icon) {
    // check between clear, partial/mostly or cloudy
    if (icon === "clear") {
      if (day) {
        // return sun!
        return "wi wi-day-sunny";
      } else {
        // return moon!
        return "wi wi-night-clear";
      }
    } else {
      // if its all clouds or rain/etc, don't show any sun/moon
      switch (icon) {
        case "cloudy":
          return "wi wi-cloudy";
      }
      if (!day) {
        // for partial clouds at night, show the moon!
        switch (icon) {
          case "partlysunny":
          case "mostlysunny":
            return "wi wi-night-alt-partly-cloudy";
          case "partlycloudy":
          case "mostlycloudy":
            return "wi wi-night-alt-cloudy";
          case "fog":
            return "wi wi-night-fog";
        }
      } else {
        // use wi-wu api mappings otherwise
        return "wi wi-wu-" + icon;
      }
    }

  }

  // set the time of day at start and fade in hour appropriate colors (mask the time it takes to poll weather)
  function getTimeOfDay() {

    // time and color variables
    var timeOfDay = {
      "dawn": {
        "hour": 6,
        "colorLight": "#00EDC4",
        "colorDark": "#317873"
      },
      "day": {
        "hour": 9,
        "colorLight": "#0085FF",
        "colorDark": "#005CFF"
      },
      "afternoon": {
        "hour": 15,
        "colorLight": "#FFA330",
        "colorDark": "#FF5224"
      },
      "dusk": {
        "hour": 18,
        "colorLight": "#00025C",
        "colorDark": "#000029"
      }
    };

    // get the current time
    var time = new Date();
    var hour = time.getHours();

    var light, dark;

    // based on local hour, change the colors
    if (hour >= timeOfDay.day.hour && hour <= timeOfDay.afternoon.hour) {
      // day: rich blue colors
      light = timeOfDay.day.colorLight;
      dark = timeOfDay.day.colorDark;
    } else {
      if (hour < timeOfDay.dawn.hour || hour >= timeOfDay.dusk.hour) {
        // dusk: do moon icons and night colors
        light = timeOfDay.dusk.colorLight;
        dark = timeOfDay.dusk.colorDark;
        day = false;
      } else {
        if (hour >= timeOfDay.dawn.hour) {
          // dawn: light green/blue morning colors
          light = timeOfDay.dawn.colorLight;
          dark = timeOfDay.dawn.colorDark;
        }
        if (hour >= timeOfDay.afternoon.hour) {
          // afternoon: yellow afternoon colors
          light = timeOfDay.afternoon.colorLight;
          dark = timeOfDay.afternoon.colorDark;
        }
      }
    }
    // animate color fades via css?
    $("body").css("background", "linear-gradient(" + light + ", " + dark + ")");
  }

  // start by getting the time and setting the colors
  getTimeOfDay();

  // get user's current location, and load weather at that location
  navigator.geolocation.getCurrentPosition(function(position) {
    updateWeather(getWeatherApiUrl(position.coords.latitude, position.coords.longitude));
  });

  // change the unit of measurement when unit button is pressed
  $("#units").on("click", function() {
    if (currentUnits == "C") {
      currentUnits = "F";
    } else {
      currentUnits = "C";
    }
    displayWeather();
    displayButton();
  });
});
