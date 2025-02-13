const calorieCounter = document.getElementById("calorie-counter");
const budgetNumber = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");
const addEntryButton = document.getElementById("add-entry");

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener('click',clearForm);
/* check */
function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

function addEntry() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" name="${entryDropdown.value}" placeholder="Name"/>
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input type="number" min="0" id="${entryDropdown.value}-${entryNumber}-calories" name="${entryDropdown.value}" placeholder="Calories"/>
  `;
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

function getCaloriesFromInputs(list) {
  let calories = 0;
  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const isInvalidInputMatch = isInvalidInput(currVal);

    if (isInvalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);

      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

function calculateCalories(e) {
  isError = false;
  e.preventDefault();
  const breakfastNumberInputs = document.querySelectorAll(
    `#breakfast input[type="number"]`
  );
  const lunchNumberInputs = document.querySelectorAll(
    `#lunch input[type="number"]`
  );
  const dinnerNumberInputs = document.querySelectorAll(
    `#dinner input[type="number"]`
  );
  const snacksNumberInputs = document.querySelectorAll(
    `#snacks input[type="number"]`
  );
  const exerciseNumberInputs = document.querySelectorAll(
    `#exercise input[type="number"]`
  );
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumber]);

  const consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;

  const remainingCalories =
    budgetCalories - consumedCalories + exerciseCalories;

  const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";
  output.innerHTML = `
   <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
   <hr/>
   <p>${budgetCalories} Calories Budgeted</p>
   <p>${consumedCalories} Calories Consumed</p>
   <p>${exerciseCalories} Calories Burned</p>
   `;
  output.classList.remove("hide");
  if (isError) {
    return;
  }
}

function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll(".input-container"));
  for(const container of inputContainers) {
    container.innerHTML = "";
  }
  budgetNumber.value = ""
}