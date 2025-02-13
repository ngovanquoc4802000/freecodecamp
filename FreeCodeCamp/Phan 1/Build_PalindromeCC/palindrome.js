const input = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");
const isError = false;

const cleanInputString = (str) => {
  const regex =/[^a-zA-Z0-9]/g;
  return str.replace(regex, "");
}

const checkButton = () => {
  const textInput = input.value;
  const cleanedInput = cleanInputString(textInput).toLowerCase();

  const upstream = cleanedInput.split('').reverse().join('');

  if (textInput === "") {
    alert("Please input a value");
  } else if(cleanedInput === upstream) {
    result.innerHTML = `<p id="value" >${textInput} is a palindrome </p>`;
  } else {
    result.innerHTML = `<p id="value" >${textInput} is not a palindrome </p>`;
  }
};
checkBtn.addEventListener("click", checkButton);
