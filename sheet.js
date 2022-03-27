// Functions

async function save() {
  // Player Information

  localStorage.setItem("name", $("#name").val());
  localStorage.setItem("age", $("#age").val());
  localStorage.setItem("gender", $("#gender").val());
  localStorage.setItem("race", $("#race").val());
  localStorage.setItem("class", $("#class").val());
  localStorage.setItem("background", $("#background").val());
  localStorage.setItem("level", $("#level").val());
  localStorage.setItem("experience", $("#experience").val());

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

  // Equipment

  // Weapons

  const weapons = [];

  $("#weaponsTable .weapon").each((index, element) => {
    const weapon = {};

    weapon.name = $("." + element.className)
      .find(".name")
      .eq(index)
      .val();
    weapon.damage = $("." + element.className)
      .find(".damage")
      .eq(index)
      .val();
    weapon.scaling = $("." + element.className)
      .find(".scaling")
      .eq(index)
      .val();
    weapon.properties = $("." + element.className)
      .find(".properties")
      .eq(index)
      .val();
    weapon.value = $("." + element.className)
      .find(".value")
      .eq(index)
      .val();

    weapons.push(weapon);
  });

  localStorage.setItem("weapons", JSON.stringify(weapons));

  // Armor

  const armor = [];

  $("#armorTable .armorPiece").each((index, element) => {
    const armorPiece = {};

    armorPiece.name = $("." + element.className)
      .find(".name")
      .eq(index)
      .val();
    armorPiece.slot = $("." + element.className)
      .find(".slot")
      .eq(index)
      .val();
    armorPiece.defense = $("." + element.className)
      .find(".defense")
      .eq(index)
      .val();
    armorPiece.scaling = $("." + element.className)
      .find(".scaling")
      .eq(index)
      .val();
    armorPiece.properties = $("." + element.className)
      .find(".properties")
      .eq(index)
      .val();
    armorPiece.value = $("." + element.className)
      .find(".value")
      .eq(index)
      .val();

    armor.push(armorPiece);
  });

  localStorage.setItem("armor", JSON.stringify(armor));

  // Items

  const items = [];

  $("#itemsTable .item").each((index, element) => {
    const item = {};

    item.name = $("." + element.className)
      .find(".name")
      .eq(index)
      .val();
    item.description = $("." + element.className)
      .find(".description")
      .eq(index)
      .val();
    item.value = $("." + element.className)
      .find(".value")
      .eq(index)
      .val();

    items.push(item);
  });

  localStorage.setItem("items", JSON.stringify(items));

  // Combat

  localStorage.setItem("armorClass", $("#armorClass").val());
  localStorage.setItem("initiative", $("#initiative").val());
  localStorage.setItem("speed", $("#speed").val());
  localStorage.setItem("currentHitPoints", $("#currentHitPoints").val());
  localStorage.setItem("maxHitPoints", $("#maxHitPoints").val());
  localStorage.setItem("hitDice", $("#hitDice").val());

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
  $("#experience").val(localStorage.getItem("experience"));

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

  // Weapons

  const weapons = JSON.parse(localStorage.getItem("weapons"));

  weapons.forEach((weapon) => {
    $("#weaponsTable tr:last").after(
      `<tr class='weapon'>
        <td height='12'><input class='name' placeholder='Name' value="${weapon.name}" /></td>
        <td height='12'><input class='damage' placeholder='Damage' value="${weapon.damage}" /></td>
        <td height='12'><input class='scaling' placeholder='Scaling' value="${weapon.scaling}" /></td>
        <td height='12'><input class='properties' placeholder='Properties' value="${weapon.properties}" /></td>
        <td height='12'><input class='value' placeholder='Value' value="${weapon.value}" /></td>
        <td height='12'>
          <div class='optionsContainer'>
            <div class='button' onclick='equip(this)'>Equip</div>
            <div class='button' onclick='remove(this)'>Remove</div>
          </div>
        </td>
      </tr>`
    );
  });

  // Weapons

  const armor = JSON.parse(localStorage.getItem("armor"));

  armor.forEach((armorPiece) => {
    $("#armorTable tr:last").after(
      `<tr class='armorPiece'>
        <td height='12'><input class='name' placeholder='Name' value="${armorPiece.name}" /></td>
        <td height='12'><input class='slot' placeholder='Slot' value="${armorPiece.slot}" /></td>
        <td height='12'><input class='defense' placeholder='Defense' value="${armorPiece.defense}" /></td>
        <td height='12'><input class='scaling' placeholder='Scaling' value="${armorPiece.scaling}" /></td>
        <td height='12'><input class='properties' placeholder='Properties' value="${armorPiece.properties}" /></td>
        <td height='12'><input class='value' placeholder='Value' value="${armorPiece.value}" /></td>
        <td height='12'>
          <div class='optionsContainer'>
            <div class='button' onclick='equip(this)'>Equip</div>
            <div class='button' onclick='remove(this)'>Remove</div>
          </div>
        </td>
      </tr>`
    );
  });

  // Items

  const items = JSON.parse(localStorage.getItem("items"));

  items.forEach((item) => {
    $("#itemsTable tr:last").after(
      `<tr class='item'>
        <td height='12'><input class='name' placeholder='Name' value="${item.name}" /></td>
        <td height='12'><input class='description' placeholder='Description' value="${item.description}" /></td>
        <td height='12'><input class='value' placeholder='Value' value="${item.value}" /></td>
        <td height='12'>
          <div class='optionsContainer'>
            <div class='button' onclick='equip(this)'>Equip</div>
            <div class='button' onclick='remove(this)'>Remove</div>
          </div>
        </td>
      </tr>`
    );
  });

  // Combat

  $("#armorClass").val(localStorage.getItem("armorClass"));
  $("#initiative").val(localStorage.getItem("initiative"));
  $("#speed").val(localStorage.getItem("speed"));
  $("#currentHitPoints").val(localStorage.getItem("currentHitPoints"));
  $("#maxHitPoints").val(localStorage.getItem("maxHitPoints"));
  $("#hitDice").val(localStorage.getItem("hitDice"));

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

function addItem(table) {
  switch (table) {
    case "weapons":
      $("#weaponsTable tr:last").after(
        "<tr class='weapon'>" +
          "<td height='12'><input class='name' placeholder='Name' /></td>" +
          "<td height='12'><input class='damage' placeholder='Damage' /></td>" +
          "<td height='12'><input class='scaling' placeholder='Scaling' /></td>" +
          "<td height='12'><input class='properties' placeholder='Properties'/></td>" +
          "<td height='12'><input class='value' placeholder='Value' /></td>" +
          "<td height='12'>" +
          "<div class='optionsContainer'>" +
          "<div class='button' onclick='equip(this)'>Equip</div>" +
          "<div class='button' onclick='remove(this)'>Remove</div>" +
          "</div>" +
          "</td>" +
          "</tr>"
      );
      break;

    case "armor":
      $("#armorTable tr:last").after(
        "<tr class='armorPiece'>" +
          "<td height='12'><input class='name' placeholder='Name' /></td>" +
          "<td height='12'><input class='slot' placeholder='Slot' /></td>" +
          "<td height='12'><input class='defense' placeholder='Defense' /></td>" +
          "<td height='12'><input class='scaling' placeholder='Scaling' /></td>" +
          "<td height='12'><input class='properties' placeholder='Properties'/></td>" +
          "<td height='12'><input class='value' placeholder='Value' /></td>" +
          "<td height='12'>" +
          "<div class='optionsContainer'>" +
          "<div class='button' onclick='equip(this)'>Equip</div>" +
          "<div class='button' onclick='remove(this)'>Remove</div>" +
          "</div>" +
          "</td>" +
          "</tr>"
      );
      break;

    case "items":
      $("#itemsTable tr:last").after(
        "<tr class='item'>" +
          "<td height='12'><input class='name' placeholder='Name' /></td>" +
          "<td height='12'><input class='description' placeholder='Description' /></td>" +
          "<td height='12'><input class='value' placeholder='Value' /></td>" +
          "<td height='12'>" +
          "<div class='optionsContainer'>" +
          "<div class='button' onclick='equip(this)'>Equip</div>" +
          "<div class='button' onclick='remove(this)'>Remove</div>" +
          "</div>" +
          "</td>" +
          "</tr>"
      );
      break;
  }
}

function remove(button) {
  const row = button.parentNode.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function equip(button) {
  const equipment = button.parentNode.parentNode.parentNode;

  if (equipment.className === "weapon") {
    let slot = document.getElementById("rightHand").id;

    if (
      !$("#leftHand").hasClass("active") &&
      $("#rightHand").hasClass("active")
    ) {
      slot = "leftHand";
    } else {
      slot = "rightHand";
    }

    if (!$("#" + slot).hasClass("active")) {
      $("#" + slot).toggleClass("active");
    }

    $("#" + slot + " .name").html($(equipment).find(".name").val());
    $("#" + slot + " .damage").html($(equipment).find(".damage").val());
    $("#" + slot + " .scaling").html($(equipment).find(".scaling").val());
    $("#" + slot + " .properties").html($(equipment).find(".properties").val());
  } else if (equipment.className === "armorPiece") {
    const slot = $(equipment).find(".slot").val();

    if (!$("#" + slot.toLowerCase()).hasClass("active")) {
      $("#" + slot.toLowerCase()).toggleClass("active");
    }

    $("#" + slot.toLowerCase() + " .name").html(
      $(equipment).find(".name").val()
    );
    $("#" + slot.toLowerCase() + " .defense").html(
      $(equipment).find(".defense").val()
    );
    $("#" + slot.toLowerCase() + " .scaling").html(
      $(equipment).find(".scaling").val()
    );
    $("#" + slot.toLowerCase() + " .properties").html(
      $(equipment).find(".properties").val()
    );
  }
}

function addSpell(event) {
  console.log(event.target);
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

$("input[type=checkbox]").click((event) => {
  $(event.target).toggleClass("active");
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
