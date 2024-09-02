export const properties = {
  length: 12,
  hasUpper: true,
  hasLower: true,
  hasNumber: true,
  hasSymbol: true,
};

export function getRandomLowerCase() {
  // letras lowercase de 97 a 122
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

export function getRandomUpperCase() {
  // letras uppercase de 65 a 90
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

export function getRandomNumbers() {
  // números de 48 a 57
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

export function getRandomSymbols() {
  // símbolos fáceis de acessar pelo teclado
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

export function generatePassword(properties) {
  const { length, hasUpper, hasLower, hasNumber, hasSymbol } = properties;

  let password = "";

  const typeCount = hasUpper + hasLower + hasNumber + hasSymbol;

  const typesArr = [
    { upper: hasUpper },
    { lower: hasLower },
    { number: hasNumber },
    { symbol: hasSymbol },
  ].filter((type) => Object.values(type)[0]);

  if (typeCount === 0) return "";

  const randomFns = {
    lower: getRandomLowerCase,
    upper: getRandomUpperCase,
    number: getRandomNumbers,
    symbol: getRandomSymbols,
  };

  for (let i = 0; i < length; i += typeCount) {
    typesArr.forEach((type) => {
      const fnName = Object.keys(type)[0];
      password += randomFns[fnName]();
    });
  }

  return password.slice(0, length);
}

export async function copyPasswordToClipboard(password) {
  await navigator.clipboard.writeText(password);
  Toastify({
    text: "Senha copiada para a área de transferência.",
    style: { background: "#2C1746" },
  }).showToast();
}
