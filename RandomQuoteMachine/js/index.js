$(document).ready(function() {
  // global variables
  var TWEET_CHAR_LIMIT = 140;
  var quote = {
    "author": "Carl Sagan",
    "text": "Somewhere, something incredible is waiting to be known."
  };

  // api call for quote data
  function getQuote() {
    $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(json) {

      // make it elegant if no one is attributed
      if (json.quoteAuthor === "") {
        json.quoteAuthor = "Unattributed";
      }

      quote.text = json.quoteText;
      quote.author = json.quoteAuthor;
    });
    return quote;
  }

  // grabs a new quote from a JSON file, compares to avoid current quote
  function newQuote() {
    var freshQuote = getQuote();

    // remove all Donald quotes
    if (freshQuote.author.indexOf("Donald Trump") != -1) {
      console.log("***This is not normal***");
      return -1;
    }

    showQuote(freshQuote);
  }

  function showQuote(quote) {
    $(".quote").html(quote.text);
    $(".attributed").html("- " + quote.author);
  }

  function tweetQuote() {
    var quoteText = $(".quote").text();
    var quoteAuthor = $(".attributed").text();
    var tweet = quoteText + " " + quoteAuthor;
    // truncate if quote is bigger than twitter's limit
    if (tweet.length >= TWEET_CHAR_LIMIT) {
      var truncate = "... "
      tweet = tweet.slice(0, (TWEET_CHAR_LIMIT - quoteAuthor.length - truncate.length));
      tweet = tweet + truncate + quoteAuthor;
    }
    var tweetUrl = "http://twitter.com/home?status=" + encodeURIComponent(tweet);
    window.open(tweetUrl, '_blank');
  }

  // at load, show the first quote
  newQuote();

  // get a new quote when the button is pressed
  $("#getQuote").on("click", function() {
    function filterQuotes() {
      if (newQuote() !== -1) {

      } else {
        setTimeout(function() {
          newQuote();
        }, 200);
      }
    }
    filterQuotes();
  });
  $("#tweet").on("click", function() {
    tweetQuote();
  });
});
