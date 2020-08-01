var pageTitle = document.title.toLowerCase();

if (pageTitle.includes("graylog")) {
  setInterval(async function () {
    let matchersObject = await browser.storage.sync.get("matchers");
    var matchers = matchersObject.matchers;
    var wrappers = document.getElementsByClassName("message-wrapper");
    for (var i = 0; i < wrappers.length; i++) {
      for (var y = 0; y < matchers.length; y++) {
        if (wrappers[i].textContent.includes(matchers[y].text)) {
          wrappers[i].style.backgroundColor = matchers[y].background_color;
          wrappers[i].style.color = matchers[y].text_color;
        }
      }
    }
  }, 250);
}
