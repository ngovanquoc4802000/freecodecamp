const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");

const checkUserInput = () => {
  if (
    !numberInput.value ||
    isNaN(parseInt(numberInput.value)) ||
    parseInt(numberInput.value) < 0
  ) {
    alert("please provide a decimal number greater than or equal to 0");
    return;
  }
  decimal(parseInt(numberInput.value));
  numberInput.value = "";
};

const decimal = (input) => {
  const quotients = [];
  const inputs = [];
  const remainders = [];
  
  if (input === 0) {
    result.innerText = "0";
    return;
  }
  
  while (input > 0) {
    const quotient = Math.floor(input / 2);

    const remainder = input % 2;

    input = quotient;
    
    inputs.push(input);
    
    quotients.push(quotient);
    
    remainders.push(remainder);
  }
  if (!numberInput.value) {
    return "";
  } else {
    result.innerText = remainders.reverse().join("");
  }
};

console.log(decimal())
convertBtn.addEventListener("click", checkUserInput);
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});