import * as m from "./models.js";
import * as v from "./views.js";

function init() {
  m.properties.length = v.elements.lengthSlider.value;
  m.properties.hasUpper = v.elements.upperCheck.checked;
  m.properties.hasLower = v.elements.lowerCheck.checked;
  m.properties.hasNumber = v.elements.numberCheck.checked;
  m.properties.hasSymbol = v.elements.symbolCheck.checked;

  const password = m.generatePassword(m.properties);

  v.displayPassword(password);
}

function handleSliderChange() {
  const length = parseInt(v.elements.lengthSlider.value);
  m.properties.length = length;
  v.updateSlider(length);
  init();
}

function handleCheckboxChange() {
  const hasChecked = [...v.elements.checkboxes].some((box) => box.checked);
  v.disableRefreshBtn(!hasChecked);
  init();
}

function addEventListeners() {
  v.elements.refreshBtn.addEventListener("click", init);
  v.elements.lengthSlider.addEventListener("input", handleSliderChange);
  v.elements.checkboxes.forEach((box) => {
    box.addEventListener("change", handleCheckboxChange);
  });
}

addEventListeners();
handleSliderChange();
handleCheckboxChange();
init();
