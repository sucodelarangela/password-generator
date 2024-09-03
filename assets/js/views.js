export const elements = {
  passwordInput: document.querySelector("[data-password]"),
  copyBtns: document.querySelectorAll("[data-copy]"),
  refreshBtn: document.querySelector("[data-refresh]"),
  lengthSlider: document.querySelector("[data-char='slider']"),
  lengthInput: document.querySelector("[data-char='input']"),
  upperCheck: document.querySelector("[data-check='upper']"),
  lowerCheck: document.querySelector("[data-check='lower']"),
  numberCheck: document.querySelector("[data-check='number']"),
  symbolCheck: document.querySelector("[data-check='symbol']"),
  strengthBar: document.querySelector("[data-strength"),
  checkboxes: document.querySelectorAll("[data-check]"),
};

/*
  Determina a largura e cor do input range customizado de acordo com o valor selecionado
*/
export function updateSlider(length) {
  elements.lengthInput.value = length;

  const progress = ((length - 6) / (elements.lengthSlider.max - 6)) * 100;

  elements.lengthSlider.style.background = `linear-gradient(to right, #fff ${progress}%, #2C1746 ${progress}%)`;
}

/*
  Mostra a senha no elemento apropriado
*/
export function displayPassword(password) {
  elements.passwordInput.textContent = password;
}

/*
  Mapeia cor e largura da força de senha e atribui tais valores ao elemento correspondente
*/
export function setStrength(strength) {
  const data = {
    weaker: { color: "#E71B32", width: "15%" },
    weak: { color: "#E71B32", width: "30%" },
    mediumLow: { color: "#FAF408", width: "50%" },
    mediumHigh: { color: "#FAF408", width: "70%" },
    strong: { color: "#00FF85", width: "80%" },
    stronger: { color: "#00FF85", width: "100%" },
  };

  elements.strengthBar.style.setProperty("--width", data[strength].width);
  elements.strengthBar.style.setProperty("--bgColor", data[strength].color);
}
