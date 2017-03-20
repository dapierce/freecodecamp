//TODO: Show last played game!
//TODO: Make an icon for channels with no icon

$(document).ready(function() {

  var channels = ["freecodecamp", "waypoint", "testing-an-invalid-account", "twitchplayspokemon", "gaminup"];
  var online = [];
  var offline = [];

  function apiCall(channelName, request) {
    console.log(channelName);
    var apiURL = "https://api.twitch.tv/kraken/";
    var clientID = "56a8fifsjr7cukqeli0mv57wric893";
    return apiURL + encodeURIComponent(request) + "/" + encodeURIComponent(channelName) + "?client_id=" + encodeURIComponent(clientID);
  }

  // gets both channel and stream data on a channel, and put it in a div!
  function getChannel(channelName) {
    // api call for channel data
    $.getJSON(apiCall(channelName, "channels"), function(results) {
      console.log(results);
    }).done(function(results) {
      // handle null description/images
      var description = results.status;
      var logo = results.logo;
      if(description == null) {
        description = "";
      }
      if(logo == null) {
        logo = "https://dapierce.github.io/my-freecodecamp/twitch-time/img/twitch-icon.png";
      }
      $('#streamer-list').append("<a href='" + results.url + "' target='" + channelName + "'><div id='" + channelName + "' class='streamer-entry slide'>\r\n<img class='channel-logo' src='" + logo + "'>\r\n<h2 class='channel-head'>" + results.display_name + "</h2>\r\n<p class='channel-description'>" + description + "</p>\r\n</div></a>");
    }).fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ", failed to load channel " + channelName;
      console.log("Request Failed: " + err );
      $('#streamer-list').append("<div id='" + channelName + "' class='streamer-entry unavailable'>\r\n<h2 class='channel-head'>" + channelName + "</h2>\r\n<p class='channel-description'>This Twitch account does not currently exist.</p>\r</div>");
      offline.push(channelName);
    });

    // api call for stream data
    $.getJSON(apiCall(channelName, "streams"), function(results) {
      console.log(results);
    }).done(function(results) {
      // handle null stream
      var status = "<span class='status-off'>⭕</span> Off air";
      if(results.stream != undefined) {
        status = "<span class='status-on'>⬤</span> Live: " + results.stream.game;
        offline.push(channelName);
      }
      $('#' + channelName).append("\r\n<p class='channel-status'>" + status + "</p>\r\n</div>");
    }).fail(function(jqxhr, textStatus, error) {
      // if not currently streaming, add this channel to offline array
      offline.push(channelName);
    });
  }

  function getChannelData(channels) {
    for (var i = 0; i < channels.length; i++) {
      // iterate and get data for every channel
      getChannel(channels[i]);
    }
  }
  
  // load all the channels specified in the array
  getChannelData(channels);

});
