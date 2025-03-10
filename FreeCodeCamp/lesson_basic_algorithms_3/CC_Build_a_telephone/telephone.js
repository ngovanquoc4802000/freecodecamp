const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const userInput = document.getElementById("user-input");
const resultsDiv = document.getElementById('results-div');

const checkValidTelephone = input => {
  if(input === "") {
    alert("Please provide a phone number");
    return;
  }
  const countryCode = '^(1\\s?)?'; // prefix
  const areaCode = '(\\([0-9]{3}\\)|[0-9]{3})';
  const spacesDashes = '[\\s\\-]?';
  const phoneNumber = '[0-9]{3}[\\s\\-]?[0-9]{4}$'; // $ là câu kết thúc cuối
  const phoneRegex = new RegExp(
    `${countryCode}${areaCode}${spacesDashes}${phoneNumber}`
  );
  const isValid = phoneRegex.test(input);
  
  const pTag = document.createElement("p");
  pTag.className = 'results-text';
  phoneRegex.test(input)
    ? (pTag.style.color = '#00471b')
    : (pTag.style.color = '#4d3800');
  pTag.appendChild(
    document.createTextNode(
      `${isValid ? 'Valid' : 'Invalid'} US number: ${input}`
    )
  );
  resultsDiv.appendChild(pTag);
}

checkBtn.addEventListener("click",() => {
  const input = userInput.value;
  checkValidTelephone(input);
})

clearBtn.addEventListener('click', () => {
   userInput.value = "";
  resultsDiv.textContent = '';
});
