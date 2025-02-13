const budgetNumber = document.getElementById("budget");
const entryDropDown = document.getElementById("entry-dropdown");
const addEntryInput = document.getElementById("add-entry");
const clear = document.getElementById("clear");
const output = document.getElementById("output");
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
    targetInputContainer.querySelectorAll("input[type='text']").length + 1;
  const HTMLString = `
   <label for="${entryDropDown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input id="${entryDropDown.value}-${entryNumber}-name" type="text"/>
  <label for="${entryDropDown.value}-${entryNumber}-value">Entry ${entryNumber} Calories</label>
  <input  id="${entryDropDown.value}-${entryNumber}-calorie" type="number" min="0"/>
  `;
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
};


const getCaloriesFromInputs = (list) => {
  let calorie = 0;
  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const Invalid = isInvalidInput(currVal);
    if (Invalid) {
      isError = true;
      return null;
    }
    calorie += Number(currVal);
  }
  return calorie;
};

const calculateCalories = (e) => {
  e.preventDefault();
  isError = false;
  const breakfastNumberInputs = document.querySelectorAll(
    "#breakfast input[type='number']"
  );
  const lunchNumberInputs = document.querySelectorAll(
    "#lunch input[type='number']"
  );
  const dinnerNumberInputs = document.querySelectorAll(
    "#dinner input[type='number']"
  );
  const snacksNumberInputs = document.querySelectorAll(
    "#snacks input[type='number']"
  );
  const exerciseNumberInputs = document.querySelectorAll(
    "#exercise input[type='number']"
  );

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumber]);
   
  if(isError) {
    return
  }
  const sumCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;

  const remainingCalories = budgetCalories - sumCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? "surplus" : "deficit";

  const HTMLSCalculate = `
     <span>${remainingCalories} calorie ${surplusOrDeficit}</span>
     <span>${budgetCalories}</span>
     <span>${sumCalories}</span>
     <span>${exerciseCalories}</span>
   `;
  output.classList.toggle("hide");
  output.innerHTML = HTMLSCalculate;
};
addEntryInput.addEventListener("click", addEntry);

formCalorie.addEventListener("submit", calculateCalories);
