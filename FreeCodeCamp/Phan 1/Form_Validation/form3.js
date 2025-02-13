const budgetCalories = document.getElementById("budget");
const entryDropDown = document.getElementById("entry-dropdown");
const addEntryInput = document.getElementById("add-entry");
const clear = document.getElementById("clear");
const output = document.querySelector("output");
const formCalorie = document.getElementById("calorie-counter");
let isError = false;

function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

const addEntry = () => {
  const targetInputContainer = document.querySelector(
    `#${entryDropDown.value} .input-container`
  );
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="number"]').length + 1;

  const HTMLString = `
  <label for="${entryDropDown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input id="${entryDropDown.value}-${entryNumber}-name" type="text"/>
  <label for="${entryDropDown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input id="${entryDropDown.value}-${entryNumber}-calories" type="number" min="0"/>
  `;
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
};

const getCaloriesFromInputs = (list) => {
  let calories = 0;
  for (const item of list) {
    const currVal = cleanInputString(item.value);

    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      isError = false;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
};

const calculateCalories = (e) => {
  e.preventDefault();
  if (isError) {
    return;
  }
  const breakfastCalories = getCaloriesFromInputs(
    document.querySelectorAll("#breakfast input[type='number']")
  );
  const lunchCalories = getCaloriesFromInputs(
    document.querySelectorAll("#breakfast input[type='number']")
  );
  const dinnerCalories = getCaloriesFromInputs(
    document.querySelectorAll("#dinner input[type='number']")
  );
  const snacksCalories = getCaloriesFromInputs(
    document.querySelectorAll("#snacks input[type='number']")
  );
  const exerciseCalories = getCaloriesFromInputs(
    document.querySelectorAll("#exercise input[type='number']")
  );
  const budgetCalorie = getCaloriesFromInputs([budgetCalories]);

  const consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;

  const remainingCalories = budgetCalorie - consumedCalories + exerciseCalories;

  const surplusOrDeficit = remainingCalories < 0 ? "surplus" : "deficit";

  output.innerHTML = `
  <span class="${surplusOrDeficit}">${Math.abs(
    remainingCalories
  )} Calorie ${surplusOrDeficit}</span>
  <hr/>
  <p>${budgetCalorie} calories Budgeted</p>
  <p>${consumedCalories} calories Consumed</p>
  <p>${exerciseCalories} calories Burned</p>
  `;

  output.classList.remove("hide");
};

addEntryInput.addEventListener("click", addEntry);
formCalorie.addEventListener("submit", calculateCalories);
