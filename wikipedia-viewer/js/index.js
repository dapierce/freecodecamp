$(document).ready(function() {

  // animate button click
  $("#submit").on('click', function(){
    $(this).toggleClass('active');
    setTimeout(function () {
      $("#submit").toggleClass('active');
    }, 300);
  });

  // takes search parameter and returns a url to search Wikipedia
  function getWikipediaApiUrl(search) {
    var apiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&namespace=0&format=json&origin=*&format=json&search=";
    search = encodeURIComponent(search);
    return apiUrl + search;
  }

  // searches wikipedia through a url, returns the results as json
  function searchWikipedia(apiUrl) {
    var json = {};
    $.getJSON(apiUrl, function(json) {
      // extract the wikipedia search data
      for (var i = 0; i < json[1].length; i++) {
        $('.results-box').append("<div class='article-item'>\r\n<a href='" + json[3][i] + "'><h2 class='article-head'>" + json[1][i] + "</h2>\r\n<p class='article-description'>" + json[2][i] + "</p>\r\n</a></div>");
      }
    });
  }

  // do a cool transition animation when random page is clicked
  
  // when search button is pressed:
  // change the page to show wikipedia search results
  $("#search-form").on("submit", function(event) {
    event.preventDefault();
    var searchInput = $("#search-input").val();

    if (searchInput === "") {
      return 0;
    }

    // clear current results before new search
    $('.results-box').css('opacity', '0');
    $('.results-box').css('margin', '200px 0 0 0');
    $('.results-box').empty();

    // load search results on hidden div
    var results = searchWikipedia(getWikipediaApiUrl(searchInput));

    // when results finish loading, div fades in
    $('.results-box').css('opacity', '1');
    $('.results-box').css('margin', '20px 0 0 0');
  });

});
