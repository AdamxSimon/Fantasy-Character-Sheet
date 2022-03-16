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

  //Attributes

  $(".attributePoints").each((index, element) => {
    localStorage.setItem(element.id, $("#" + element.id).html());
  });

  $(".attributeModifier").each((index, element) => {
    localStorage.setItem(element.id, $("#" + element.id).html());
  });

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

  // Attributes

  $(".attributePoints").each((index, element) => {
    if (localStorage.getItem(element.id)) {
      $("#" + element.id).html(localStorage.getItem(element.id));
    } else {
      $("#" + element.id).html("8");
    }
  });

  $(".attributeModifier").each((index, element) => {
    if (localStorage.getItem(element.id)) {
      $("#" + element.id).html(localStorage.getItem(element.id));
    } else {
      $("#" + element.id).html("-1");
    }
  });

  // Skills

  updateSkillModifiers();

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
    updateAttributeModifier(id, id + "Modifier");
  }
}

function increment(id) {
  $(id).html(+$(id).html() + 1);
  updateAttributeModifier(id, id + "Modifier");
}

function updateAttributeModifier(attributeID, modID) {
  const newValue = Math.floor((+$(attributeID).html() - 10) / 2);

  if (newValue >= 0) {
    $(modID).html("+" + newValue);
  } else {
    $(modID).html(newValue);
  }
}

function updateSkillModifiers() {
  const proficiencyBonus = +$(".proficiencyBonus").html();
  let newValue;

  $(".skillContainer").each((index, element) => {
    if ($("#" + element.id).attr("active") === "true") {
      newValue =
        +$(
          "#" +
            $("#" + element.id)
              .find(".relevantAttribute")
              .html() +
            "Modifier"
        ).html() + proficiencyBonus;
      if (newValue >= 0) {
        $("#" + element.id + "Modifier").html("+" + newValue);
      } else {
        $("#" + element.id + "Modifier").html(newValue);
      }
    } else {
      $("#" + element.id + "Modifier").html(
        $(
          "#" +
            $("#" + element.id)
              .find(".relevantAttribute")
              .html() +
            "Modifier"
        ).html()
      );
    }
  });
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

$("button").click(() => {
  updateSkillModifiers();
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

$(".skillContainer").click((event) => {
  $(event.target).toggleClass("active");
  $(event.target).attr(
    "active",
    $(event.target).attr("active") === "true" ? "false" : "true"
  );
  updateSkillModifiers();
});
