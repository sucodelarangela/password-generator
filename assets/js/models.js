export const properties = {
  length: 12,
  hasUpper: true,
  hasLower: true,
  hasNumber: true,
  hasSymbol: true,
};

/*
  Funções para gerar caracteres aleatórios
*/
export function getRandomLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

export function getRandomUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

export function getRandomNumbers() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

export function getRandomSymbols() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

/*
  Geração de senha
*/
export function generatePassword(properties) {
  const { length, hasUpper, hasLower, hasNumber, hasSymbol } = properties;

  let password = "";

  // Definindo a quantidade de características que a senha deve ter
  const propertyCount = hasUpper + hasLower + hasNumber + hasSymbol;

  // Filtra as propriedades, mantendo apenas as que forem `true`
  const propertiesArr = [
    { upper: hasUpper },
    { lower: hasLower },
    { number: hasNumber },
    { symbol: hasSymbol },
  ].filter((property) => Object.values(property)[0]);

  // Object map para as funções de geração de caracteres
  const randomFns = {
    lower: getRandomLowerCase,
    upper: getRandomUpperCase,
    number: getRandomNumbers,
    symbol: getRandomSymbols,
  };

  // Para cada iteração, verifica cada propriedade de senha e gera um caractere aleatório para a senha
  for (let i = 0; i < length; i += propertyCount) {
    propertiesArr.forEach((property) => {
      const fnName = Object.keys(property)[0];
      password += randomFns[fnName]();
    });
  }

  // Retorna a senha gerada limitada ao número de caracteres selecionado pelo usuário
  return password.slice(0, length);
}

/*
  Copia a senha para a área de transferência e mostra um toast de confirmação
*/
export async function copyPasswordToClipboard(password) {
  await navigator.clipboard.writeText(password);
  Toastify({
    text: "Senha copiada para a área de transferência.",
    style: { background: "#2C1746" },
  }).showToast();
}
