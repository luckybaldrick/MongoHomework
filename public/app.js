$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<p data-id='" + data[i]._id + "'><strong>" + data[i].title + "</strong><br />" + data[i].link + "</p>");
  }
});

$(document).on("click", "p", function() {
  $("#notes").empty();
  $("#savedNotes").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .done(function(data) {
      console.log(data);
      $("#notes").hide();
      $("#bodyinput").hide();
      $("#notes").append("<h5>" + data.title + " Notes" + "</h5>");
      $("#notes").append("<input id='bodyinput' class='col s9' name='body'>");
      $("#notes").append("<button data-id='" + data._id + "' id='savenote' class='waves-effect waves-light btn col s2 offset-s1''>Save Note</button>");
      $("#bodyinput").attr("placeholder", "Enter another note or click another article to add more notes!");
      $("#bodyinput").fadeIn(500);
      $("#notes").fadeIn(500);

      if (data.note) {
        $("#savedNotes").hide();
        $("#savedNotes").append(data.note.body + "<a data-id='" + data._id + "' class='deleteBtn'>X</a>");
        $("#savedNotes").fadeIn(1000);
      }
    });
});

$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");
  var newNote = $("#bodyinput").val();

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: newNote
    }
  })
    .done(function(data) {
      console.log(data);
      $("#savedNotes").empty();
      $("#savedNotes").hide();
      $("#savedNotes").append(newNote + "<a class='deleteBtn'>X</a>");
      $("#savedNotes").fadeIn(500);
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
  $("#bodyinput").attr("placeholder", "Enter another note or click another article to add more notes!");
});

$(document).on('click', '.deleteBtn', function (e) {
  e.preventDefault();
  var thisId = $(this).attr("data-id");
  var newNote = '';

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: newNote
    }
  })
      .done(function(data) {
        console.log("deletion complete");
        $("#savedNotes").empty();
      });
});