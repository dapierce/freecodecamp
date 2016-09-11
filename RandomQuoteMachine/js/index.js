$(document).ready(function() {

  var currentQuote = -1;
  var numOfQuotes = 2;

  // grabs a new quote from a JSON file, avoid current quote
  function newQuote() {
    var quoteId = currentQuote;
    while (quoteId === currentQuote) {
      quoteId = Math.floor(Math.random() * (numOfQuotes + 1));
    }
    console.log(quoteId);
    var json = [];
    // do fancy JSON stuff here
    $.getJSON("https://dapierce.github.io/freecodecamp/RandomQuoteMachine/quotes.json", function(json) {
      // find the quote at quoteId
      json = JSON.parse(json).filter(val) {
        return val.id === quoteId;
        // edit HTML with quote data
        json.forEach(function(val) {
          $(".quote").html(val.text);
          $(".person").html(val.author);
        });
      });
    });

  // after page load, change the quote
  newQuote();

  // get a new quote when the button is pressed
  $("#getQuote").on("click", function() {
    newQuote();
  });
});