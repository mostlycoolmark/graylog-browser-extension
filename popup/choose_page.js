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
    // let newDivText =
    //   "<div class='flex-container'><button class='remove_button' id='removeEntry_" +
    //   i +
    //   "'>remove</button>" + matchers[i].text + " = " +
    //   matchers[i].text_color +
    //   ":" + matchers[i].background_color + "</div>";

    let newDivText = `
    <div style='text-align: left'>
            <label class='input_label'>Match: ${matchers[i].text} </label>
        </div>
        <div class='flex-container'>
            <button class='remove_button' id='removeEntry_${i}'>Delete</button>
            <div style='width: 50%; display: flex; justify-content: start'>
                <div style='display: flex; align-items: baseline; padding-right: 10px;'>
                    <label class='match_label'>Color: ${
      matchers[i].text_color
    } </label>
                    <div class='box' style='background-color: ${
      matchers[i].text_color
    }'></div>
                </div>
                <div style='display: flex; align-items: baseline;'>
                    <label class='match_label'>Back: ${
      matchers[i].background_color
    }</label>
                    <div class='box' style='background-color: ${
      matchers[i].background_color
    }'></div>
                </div>
            </div>
        </div>
        <hr style='border-top: 1px; color: #CBD5E0;' />`;

    matchers_list.innerHTML = matchers_list.innerHTML + newDivText;
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

let matchers = [];
document.addEventListener("DOMContentLoaded", init);
