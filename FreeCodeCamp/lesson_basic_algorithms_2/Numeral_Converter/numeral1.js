const output = document.getElementById("output");
const numberInput = document.getElementById("number");
const form = document.getElementById("form");
const convertButton = document.getElementById("convert-btn");

const romanNumerals = {
  1: "I",
  4: "IV",
  5: "V",
  9: "IX",
  10: "X",
  40: "XL",
  50: "L",
  90: "XC",
  100: "C",
  400: "CD",
  500: "D",
  900: "CM",
  1000: "M",
};

const checkUserInput = () => {
  const numberInputParseInt = parseInt(numberInput.value);
  numeralsConvert(numberInputParseInt);
  output.classList.remove("alert");
  if (!numberInputParseInt || isNaN(numberInputParseInt)) {
    numeralsConvert(numberInputParseInt);
    output.classList.add("alert");
    output.innerText = "Please enter a valid number. ";
  }
  if (numberInputParseInt === 0 || numberInputParseInt < 0) {
    output.classList.add("alert");
    output.innerText = "Please enter a number greater than or equal to 1.";
  }
  if (numberInputParseInt > 3999) {
    numeralsConvert(numberInputParseInt);
    output.classList.add("alert");
    output.innerText = "Please enter a number less than or equal to 3999";
  } else {
    return;
  }
};

const numeralsConvert = (input) => {
  const keys = Object.keys(romanNumerals).reverse();
  let result = "";
  for (let i = 0; i < keys.length; i++) {
    const parse = parseInt(keys[i]);
    const string = romanNumerals[keys[i]];
    while (input >= parse) {
      result += string;
      input -= parse;
    }
  }
  output.textContent = result;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

convertButton.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
    return;
  }
});
