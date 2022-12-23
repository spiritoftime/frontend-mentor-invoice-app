function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
export default function generateID() {
  const numAlphabets = Math.floor(Math.random() * 5);
  const nums = 5 - numAlphabets;

  let generatedID = "";
  for (let i = 0; i < numAlphabets; i += 1) {
    generatedID += getRandomUpper();
  }
  for (let i = 0; i < nums; i += 1) {
    generatedID += getRandomNumber();
  }

  return generatedID;
}
