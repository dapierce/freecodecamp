$(document).ready(function() {

  var currentQuote = -1;
  var numOfQuotes = 457653;

  // grabs a new quote from a JSON file, avoid current quote
  function newQuote() {
    var quoteId = currentQuote;
    while (quoteId === currentQuote) {
      quoteId = Math.floor(Math.random() * (numOfQuotes + 1));
    }
    currentQuote = quoteId;
    var json = [];
    // do fancy JSON stuff here
    //$.getJSON("https://dapierce.github.io/my-freecodecamp/RandomQuoteMachine/quotes.json", function(json) {
    //// find the quote at quoteId
      // json = json.filter(function(val) {
      //   return val.id === quoteId;
      // });
     $.getJSON("https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&key=" + currentQuote + "&format=json&lang=en", function(json) {
        $(".quote").html(json.quoteText);
        $(".name").html(json.quoteAuthor);
    });
  }

  // after page load, change the quote
  newQuote();

  // get a new quote when the button is pressed
  $("#getQuote").on("click", function() {
    newQuote();
  });
});
