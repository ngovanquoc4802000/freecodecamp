const form = document.getElementById("form");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");
const numberInput = document.getElementById("number");

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
  const Int = parseInt(numberInput.value);
  numeric(Int);
  if (!Int || isNaN(Int)) {
    numeric(Int);
    
    output.classList.add("alert");
    
    output.innerHTML = `<p> Please enter a valid number </p>`;
  } else if (Int === 0 || Int < 0) {
    output.classList.add("alert");

    output.innerHTML = `<p> Please enter a number greater than or equal to 1</p>`;

  } else if (Int >= 4000) {

    numeric(Int);

    output.classList.add("alert");

    output.innerHTML = `<p>Please enter a number less than or equal to 3999.</p>`;
  } else {

    return;
  }
};
const numeric = (input) => {
  let keys = Object.keys(romanNumerals).reverse();
  let result = "";
  for (let i = 0; i < keys.length; i++) {
    const parse = parseInt(keys[i]);
    console.log(parse)
    const key = romanNumerals[keys[i]];
    console.log(key)
    while (input >= parse) {
      result += key;
      input -= parse;
    }
  }
  output.classList.remove("alert");
  output.textContent = result;
};


form.addEventListener("submit", (e) => {
  e.preventDefault();
});

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "enter") {
    checkUserInput();
  }
});

convertBtn.addEventListener("click", checkUserInput);