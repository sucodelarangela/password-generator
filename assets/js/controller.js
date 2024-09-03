import * as m from "./models.js";
import * as v from "./views.js";

/*
  Inicializador do gerador de senhas: mapeia as propriedades selecionadas, gera/mostra a senha e calcula a força desta
*/
export function init() {
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

/*
  Gerencia valor e aparência do input range. A reatividade é garantida com a execução de `init()`
*/
export function handleSliderChange() {
  const length = parseInt(v.elements.lengthSlider.value);
  m.properties.length = length;
  v.updateSlider(length);
  init();
}

/*
  Captura a senha e chama a função de cópia para a área de transferência
*/
function copyPassword() {
  const password = v.elements.passwordInput.textContent;
  m.copyPasswordToClipboard(password);
}

/*
  Adiciona os eventListeners aos elementos
*/
export function addEventListeners() {
  v.elements.refreshBtn.addEventListener("click", init);
  v.elements.lengthSlider.addEventListener("input", handleSliderChange);
  v.elements.checkboxes.forEach((box) => box.addEventListener("change", init));
  v.elements.copyBtns.forEach((btn) =>
    btn.addEventListener("click", copyPassword)
  );
}

/*
  Verifica as propriedades selecionadas e calcula a força da senha, atribuindo os estilos apropriados
*/
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

  if (!fieldsSelected || fieldsSelected === 1) return v.setStrength("weaker");

  if (fieldsSelected <= 2 && (onlyLetters || onlyNumbersOrsymbols)) {
    return v.setStrength(length < 12 ? "weaker" : "weak");
  }

  if (fieldsSelected === 3 && onlyLetters && numberOrSymbol) {
    return v.setStrength(length < 12 ? "mediumLow" : "mediumHigh");
  }

  if (fieldsSelected === 3 && !onlyLetters && onlyNumbersOrsymbols) {
    return v.setStrength(length < 12 ? "weak" : "mediumLow");
  }

  if (fieldsSelected === 4) {
    return v.setStrength(length < 12 ? "strong" : "stronger");
  }
}
