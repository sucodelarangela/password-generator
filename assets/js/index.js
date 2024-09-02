import * as m from "./models.js";
import * as v from "./views.js";

function init() {
  const hasChecked = [...v.elements.checkboxes].some((box) => box.checked);

  m.properties.length = v.elements.lengthSlider.value;
  m.properties.hasUpper = v.elements.upperCheck.checked;
  m.properties.hasLower = v.elements.lowerCheck.checked || !hasChecked;
  m.properties.hasNumber = v.elements.numberCheck.checked;
  m.properties.hasSymbol = v.elements.symbolCheck.checked;

  const password = m.generatePassword(m.properties);

  v.displayPassword(password);
  getPasswordStrength(password);
}

function handleSliderChange() {
  const length = parseInt(v.elements.lengthSlider.value);
  m.properties.length = length;
  v.updateSlider(length);
  init();
}

function copyPassword() {
  const password = v.elements.passwordInput.textContent;
  m.copyPasswordToClipboard(password);
}

function addEventListeners() {
  v.elements.refreshBtn.addEventListener("click", init);
  v.elements.lengthSlider.addEventListener("input", handleSliderChange);
  v.elements.checkboxes.forEach((box) => box.addEventListener("change", init));
  v.elements.copyBtns.forEach((btn) =>
    btn.addEventListener("click", copyPassword)
  );
}

export function getPasswordStrength(password) {
  const fieldsArr = [...v.elements.checkboxes];
  const fieldsSelected = fieldsArr.filter((box) => box.checked).length;
  const onlyLetters =
    v.elements.lowerCheck.checked && v.elements.upperCheck.checked;
  const onlyNumbersOrsymbols =
    v.elements.numberCheck.checked && v.elements.symbolCheck.checked;
  const numberOrSymbol =
    v.elements.symbolCheck.checked || v.elements.numberCheck.checked;
  const length = password.length;

  if (!fieldsSelected) return v.setStrength("weaker");

  if (fieldsSelected <= 2 && (onlyLetters || onlyNumbersOrsymbols)) {
    return v.setStrength(length < 12 ? "weaker" : "weak");
  }

  if (fieldsSelected === 3 && onlyLetters && numberOrSymbol) {
    return v.setStrength(length < 12 ? "mediumLow" : "mediumHigh");
  }

  if (fieldsSelected === 4) {
    return v.setStrength(length < 12 ? "strong" : "stronger");
  }
}

addEventListeners();
handleSliderChange();
init();
