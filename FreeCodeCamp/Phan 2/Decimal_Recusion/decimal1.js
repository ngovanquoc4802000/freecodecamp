const result = document.getElementById("result");
const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");

const decimal = (input) => {
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    return decimal(Math.floor(input / 2)) + (input % 2);
  }
};

const checkUserInput = () => {
  const numberParseInt = parseInt(numberInput.value);
  if (!numberParseInt || isNaN(numberParseInt) || numberParseInt < 0) {
    alert("phải lớn hơn hoặc bằng 0");
    return;
  }
  result.innerText = decimal(numberParseInt);
  numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
