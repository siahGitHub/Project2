// Get references to page elements
var $genreSel1 = $("#genreSel1");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var $stories = $("#stories");
var $startBtn = $("#start-btn");
console.log("page loaded");
// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/stories/genre/"+example
      //data: JSON.stringify(example)
    });
  },
  getExamples: function(example) {
    return $.ajax({
      //url: "api/examples",
      url: "/api/stories/genre/"+example,
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-success float-right")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  console.log("checkpoint");
  var example = {
    text: $genreSel1.val().trim()
    //description: $exampleDescription.val().trim()
  };
 var genre =  $genreSel1.val().trim();

  if (!(example.text)) {
    alert("You must select a genre!");
    return;
  }
/*
  API.saveExample(example).then(function() {
    refreshExamples();
  });
*/
console.log(genre);
  API.getExamples(genre).then(function (data) {
    console.log(data);
    var $h2 = $("<h2>")
      .text(data.title);
    $stories.append($h2);
    var $button = $("<button>")
        .addClass("btn btn-success float-right delete")
        .text("Start Game");

      $startBtn.append($button);
  });
    //refreshExamples();
  
  //$exampleText.val("");
  //$exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
