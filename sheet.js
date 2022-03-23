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

  // Attributes

  $(".attributePoints").each((index, element) => {
    localStorage.setItem(element.id, $("#" + element.id).html());
  });

  $(".attributeModifier").each((index, element) => {
    localStorage.setItem(element.id, $("#" + element.id).html());
  });

  // Skills

  $(".skillContainer").each((index, element) => {
    localStorage.setItem(element.id, $("#" + element.id).attr("active"));
  });

  // Inventory

  const inventory = [];

  $(".itemRow").each((index, element) => {
    const item = {};

    item.name = $("." + element.className)
      .find(".itemName")
      .eq(index)
      .val();
    item.category = $("." + element.className)
      .find(".itemCategory")
      .eq(index)
      .val();
    item.accuracy = $("." + element.className)
      .find(".itemAccuracy")
      .eq(index)
      .val();
    item.attack = $("." + element.className)
      .find(".itemAttack")
      .eq(index)
      .val();
    item.defense = $("." + element.className)
      .find(".itemDefense")
      .eq(index)
      .val();
    item.value = $("." + element.className)
      .find(".itemValue")
      .eq(index)
      .val();

    inventory.push(item);
  });

  localStorage.setItem("inventory", JSON.stringify(inventory));

  // Notes

  localStorage.setItem("notes", $("#notesInput").val());

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

  $(".skillContainer").each((index, element) => {
    if (localStorage.getItem(element.id) === "true") {
      $("#" + element.id).toggleClass("active");
      $("#" + element.id).attr("active", true);
    }
  });

  updateSkillModifiers();

  // Inventory

  const inventory = JSON.parse(localStorage.getItem("inventory"));

  inventory.forEach((item) => {
    $("#inventoryTable tr:last").after(
      `<tr class='itemRow'>
        <td height='12'><input class='itemName' placeholder='Name' value="${item.name}" /></td>
        <td height='12'><input class='itemCategory' placeholder='Category' value="${item.category}" /></td>
        <td height='12'><input class='itemAccuracy' placeholder='Accuracy' value="${item.accuracy}" /></td>
        <td height='12'><input class='itemAttack' placeholder='Attack' value="${item.attack}" /></td>
        <td height='12'><input class='itemDefense' placeholder='Defense' value="${item.defense}" /></td>
        <td height='12'><input class='itemValue' placeholder='Value' value="${item.value}" /></td>
        <td height='12'>
          <div class='optionsContainer'>
            <div class='button'>Equip</div>
            <div class='button' onclick='removeItem(this)'>Remove</div>
          </div>
        </td>
      </tr>`
    );
  });

  // Notes

  $("#notesInput").val(localStorage.getItem("notes"));

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

// Functionality

function toggleDisplay(section) {
  $(section).toggle("slow");
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

function addItem() {
  $("#inventoryTable tr:last").after(
    "<tr class='itemRow'>" +
      "<td height='12'><input class='itemName' placeholder='Name' /></td>" +
      "<td height='12'><input class='itemCategory' placeholder='Category' /></td>" +
      "<td height='12'><input class='itemAccuracy' placeholder='Accuracy' /></td>" +
      "<td height='12'><input class='itemAttack' placeholder='Attack'/></td>" +
      "<td height='12'><input class='itemDefense' placeholder='Defense' /></td>" +
      "<td height='12'><input class='itemValue' placeholder='Value' /></td>" +
      "<td height='12'>" +
      "<div class='optionsContainer'>" +
      "<div class='button'>Equip</div>" +
      "<div class='button' onclick='removeItem(this)'>Remove</div>" +
      "</div>" +
      "</td>" +
      "</tr>"
  );
}

function removeItem(button) {
  const row = button.parentNode.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function roll(die) {
  let rolls = 0;
  let time = 100;

  while (rolls <= 20) {
    let number = Math.floor(Math.random() * die) + 1;
    setTimeout(() => {
      $("#d" + die).html(number);
    }, time);
    rolls++;
    time += 100;
  }
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

$(".button").click(() => {
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

$("textarea").change(() => {
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
