// Functions

async function save() {
  // Player Information

  localStorage.setItem("name", $("#name").val());
  localStorage.setItem("age", $("#age").val());
  localStorage.setItem("gender", $("#gender").val());
  localStorage.setItem("race", $("#race").val());
  localStorage.setItem("class", $("#class").val());
  localStorage.setItem("background", $("#background").val());
  localStorage.setItem("level", $("#level").html());
  localStorage.setItem("currentExperience", $("#currentExperience").html());
  localStorage.setItem("requiredExperience", $("#requiredExperience").html());

  // Display Message

  setTimeout(() => {
    $("#message").html("Saving.");
  }, 500);
  setTimeout(() => {
    $("#message").html("Saving..");
  }, 1000);
  setTimeout(() => {
    $("#message").html("Saving...");
  }, 1500);
}

async function load() {
  // Player Information

  $("#name").val(localStorage.getItem("name"));
  $("#age").val(localStorage.getItem("age"));
  $("#gender").val(localStorage.getItem("gender"));
  $("#race").val(localStorage.getItem("race"));
  $("#class").val(localStorage.getItem("class"));
  $("#background").val(localStorage.getItem("background"));
  $("#level").val(localStorage.getItem("level"));
  $("#currentExperience").val(localStorage.getItem("currentExperience"));
  $("#requiredExperience").val(localStorage.getItem("requiredExperience"));

  // Display Message

  setTimeout(() => {
    $("#message").html("Loading.");
  }, 500);
  setTimeout(() => {
    $("#message").html("Loading..");
  }, 1000);
  setTimeout(() => {
    $("#message").html("Loading...");
  }, 1500);
}

function decrement(id) {
  if (+$(id).html() > 0) {
    $(id).html(+$(id).html() - 1);
  }
}

function increment(id) {
  $(id).html(+$(id).html() + 1);
}

// Event Listeners

$(document).ready(() => {
  load()
    .then(() => {
      setTimeout(() => {
        $("#message").html("");
      }, 2000);
    })
    .catch(() => {
      setTimeout(() => {
        $("#message").html("Unable To Load");
      }, 2000);
      setTimeout(() => {
        $("#message").html("");
      }, 3000);
    });
});

$("input").change(() => {
  save()
    .then(() => {
      setTimeout(() => {
        $("#message").html("");
      }, 2000);
    })
    .catch(() => {
      setTimeout(() => {
        $("#message").html("Unable To Save");
      }, 2000);
      setTimeout(() => {
        $("#message").html("");
      }, 3000);
    });
});
