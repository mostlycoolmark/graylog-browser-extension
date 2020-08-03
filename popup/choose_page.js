async function setMatchers(value) {
  await browser.storage.sync.set({ matchers: value });
}

document.getElementById("add_new_matcher").addEventListener("click", () => {
  document.getElementById("add_new_matcher").className = "hidden";
  document.getElementById("new_matcher_input").className =
    "add_fields_container";
});

document.getElementById("cancel_addition").addEventListener("click", () => {
  document.getElementById("add_new_matcher").className = "add_button";
  document.getElementById("new_matcher_input").className = "hidden";
});

document.getElementById("save_new_addition").addEventListener("click", () => {
  const newValue = {
    "text": document.getElementById("new_matcher_text").value,
    "text_color": document.getElementById("new_matcher_text_color").value,
    "background_color":
      document.getElementById("new_matcher_background_color").value,
  };

  matchers.push(newValue);

  setMatchers(matchers);

  document.getElementById("add_new_matcher").className = "add_button";
  document.getElementById("new_matcher_input").className = "hidden";
  init();
});

async function init() {
  let matchersObject = await browser.storage.sync.get("matchers");
  matchers = matchersObject.matchers;
  var matchers_list = document.getElementById("matchers_list");
  matchers_list.innerHTML = "";
  if (!matchers) {
    matchers = [];
    setMatchers([]);
  }

  for (var i = 0; i < matchers.length; i++) {
    addMatch(
      i,
      matchers[i].text,
      matchers[i].text_color,
      matchers[i].background_color,
    );
  }
  var removeIds = document.querySelectorAll('[id^="removeEntry_"]');
  for (let removeButton of removeIds) {
    document.getElementById(removeButton.id).addEventListener("click", () => {
      var id = removeButton.id.split("_")[1];
      matchers.splice(parseInt(id), 1);
      setMatchers(matchers);
      init();
    });
  }
}

function addMatch(id, text, text_color, background_color) {
  var matchers_list = document.getElementById("matchers_list");
  var parentDiv = document.createElement("div");
  var labelDiv = document.createElement("div");
  labelDiv.style.textAlign = "left";
  var labelInDiv = document.createElement("label");
  labelInDiv.classList.add("input_label");
  labelInDiv.textContent = text;
  labelDiv.appendChild(labelInDiv);

  var flexDiv = document.createElement("div");
  flexDiv.classList.add("flex-container");
  var deleteButton = document.createElement("button");

  deleteButton.classList.add("remove_button");
  deleteButton.id = "removeEntry_" + id;
  deleteButton.textContent = "Delete";
  flexDiv.appendChild(deleteButton);

  var colorsDiv = document.createElement("div");
  colorsDiv.style.width = "50%";
  colorsDiv.style.display = "flex";
  colorsDiv.style.justifyContent = "start";

  var textColorDiv = document.createElement("div");
  textColorDiv.style.display = "flex";
  textColorDiv.style.alignItems = "baseline";
  textColorDiv.style.paddingRight = "10px";

  var textLabel = document.createElement("label");
  textLabel.classList.add("match_label");
  textLabel.textContent = "Color: " + text_color;

  var textColorDisplayBox = document.createElement("div");
  textColorDisplayBox.classList.add("box");
  textColorDisplayBox.style.backGroundColor = text_color;

  textColorDiv.appendChild(textLabel);
  textColorDiv.appendChild(textColorDisplayBox);

  var bgColorDiv = document.createElement("div");
  bgColorDiv.style.display = "flex";
  bgColorDiv.style.alignItems = "baseline";
  bgColorDiv.style.paddingRight = "10px";

  var bgLabel = document.createElement("label");
  bgLabel.classList.add("match_label");
  bgLabel.textContent = "Color: " + background_color;

  var bgColorDisplayBox = document.createElement("div");
  bgColorDisplayBox.classList.add("box");
  bgColorDisplayBox.style.backGroundColor = background_color;

  bgColorDiv.appendChild(bgLabel);
  bgColorDiv.appendChild(bgColorDisplayBox);

  colorsDiv.appendChild(textColorDiv);
  colorsDiv.appendChild(bgColorDiv);

  flexDiv.appendChild(colorsDiv);

  var horizontalBar = document.createElement("hr");
  horizontalBar.style.borderTop = "1px";
  horizontalBar.style.color = "#CBD5E0";

  parentDiv.appendChild(labelDiv);
  parentDiv.appendChild(flexDiv);
  parentDiv.appendChild(horizontalBar);

  matchers_list.appendChild(parentDiv);
}

let matchers = [];
document.addEventListener("DOMContentLoaded", init);
