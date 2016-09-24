$(document).ready(function() {
  // global variables
  var TWEET_CHAR_LIMIT = 140;
  var NUM_OF_QUOTES = 20000;
  var currentQuote = -1;
  var quoteText = "";
  var quoteAuthor = "";

  // grabs a new quote from a JSON file, compares to avoid current quote
  function newQuote() {
    var quoteId = currentQuote;
    while (quoteId === currentQuote) {
      quoteId = Math.floor(Math.random() * (NUM_OF_QUOTES + 1));
    }
    currentQuote = quoteId;
    var json = [];
    $.getJSON("https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&key=" + currentQuote + "&format=json&lang=en", function(json) {
      // remove all Donald quotes--probably actually by his ghostwriter anyway
      if (json.quoteAuthor == "Donald Trump") {
        newQuote();
      }
      // make it elegant if no one is attributted
      if (json.quoteAuthor === "") {
        json.quoteAuthor = "Unattributted";
      }
      quoteText = json.quoteText;
      quoteAuthor = json.quoteAuthor;
      $(".quote").html(json.quoteText);
      $(".name").html("- " + json.quoteAuthor);
    });
  }

  function tweetQuote() {
    var tweet = quoteText + " - " + quoteAuthor;
    // truncate if quote is bigger than twitter's limit
    if(tweet.length >= TWEET_CHAR_LIMIT) {
      var truncate = "... -"
      tweet = tweet.slice(0, (TWEET_CHAR_LIMIT - quoteAuthor.length - truncate.length));
      tweet = tweet + truncate + quoteAuthor;
    }
    var tweetUrl = "http://twitter.com/home?status=" + tweet;
    window.open(tweetUrl, '_blank');
  }

  // after page load, change the quote
  newQuote();

  // get a new quote when the button is pressed
  $("#getQuote").on("click", function() {
    newQuote();
  });
  $("#tweet").on("click", function() {
    tweetQuote();
  });
});
