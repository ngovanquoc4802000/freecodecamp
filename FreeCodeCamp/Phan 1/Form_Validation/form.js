/* /* 1 calories  = 1kcal = 1 calo = 1000 calorie */

// 1 người trưởng thành chỉ nên nạp tối đa 25% lượng calo từ chất béo trong ngày

// công thức tính calo : TDEE = BMR x R

// BMR : tỷ lệ trao đổi cơ bản đổi chất cơ bản trong cơ thể con người dựa vào trọng lượng và chiều cao cơ thể
// TDEE : lượng calo mà cơ thể mỗi người cần thiết nạp vào trong ngày.
// R:

// Người ít vận động (làm việc văn phòng, chỉ ăn và ngủ): R = 1,2
// Người vận động nhẹ (luyện tập thể dục 1 – 3 lần/tuần): R = 1,375
// Người vận động vừa (tập luyện 3 – 5 lần/tuần, vận động mỗi ngày): R = 1,55
// Người vận động nặng (thường xuyên vận động , chơi thể dục thể thao và tập luyện 6 – 7 lần/tuần): R = 1,725
// Người vận động rất nặng (tập luyện thể dục 2 lần/ngày, lao động phổ thông): R = 1,9

//Regular Expressions
//Để khớp với các kí tự trong 1 chuỗi const regex = /hello/
// \s : kí tự khoảng trắng
// \d : số bất kì , viết ngắn gọn cho [0-9]
const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");
/* tất cả đều trả về phần tử element chứ không phải nodeList  */
let isError = false;

/* onclick function */

function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

/* click addEntryButton */
addEntryButton.addEventListener("click", addEntry);

/* submit form */
calorieCounter.addEventListener("submit", calculateCalories);

const targetInputcontainer = document.querySelector(
  `#${entryDropdown.value} .input-container`
);

function addEntry() {
  /* lấy id và class */
  const targetInputcontainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );
  /* add toàn bộ input vào 1 class đó đồng thời gắn length */
  /* lưu ý: cộng thêm 1 sau length vì bug entryNumber k phải là 0 đầu tiên */
  const entryNumber =
    targetInputcontainer.querySelectorAll('input[type="text"]').length + 1;

  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input type="number" min="0" id="${entryDropdown.value}-${entryNumber}-calories" placeholder="Calories" />
  `;
  /* Lỗi khác của bạn xảy ra nếu bạn thêm mục Bữa sáng,
   điền vào rồi thêm mục Bữa sáng thứ hai. Bạn sẽ thấy các giá trị bạn thêm vào đã biến mất. */

  //insertAdjacentHTML nhận 2 đối số
  //đối số đầu tiên là một chuỗi xác định vị trí của phần tử được chèn vào.
  //Đối số thứ hai là một chuỗi chứa HTML cần chèn.

  targetInputcontainer.insertAdjacentHTML("beforeend", HTMLString);
}

function getCaloriesFromInputs(list) {
  let calories = 0;
  for (const item of list) {
    // const currVal = item.value;
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);
    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      /* phải đặt isError = true trả về null cho biết hàm này bị lỗi */
      isError = true;
      return null;
    }
    /* để chuyển đổi currVal thành số thì:  */
    calories += Number(currVal);
  }
  return calories;
}

function calculateCalories(e) {
  isError = false;
  e.preventDefault();
  /* Hàm của bạn cần lấy các giá trị từ các mục mà người dùng đã thêm. */
  const breakfastNumberInputs = document.querySelectorAll(
    `#breakfast input[type="number"]`
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
  /* callblack paramt */
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  /* nếu budgetNumber là 1 element thì phải truyền nó là 1 mảng */
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);
  /* thử kiểm tra biến isError toàn cầu nếu nó đúng việc thực thi sẽ dừng lại */
  if (isError) {
    return;
  }
  /* tổng lượng calo tiêu thụ */
  const consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  /* lượng calo còn lại */
  const remainingCalories =
    budgetCalories - consumedCalories + exerciseCalories;
  /* remaingCalories nếu calo dư và thâm hụt tuỳ vào mục tiêu của user */
  const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";

  /* khi người dùng dư calo , giá trị calo còn lại sẽ âm , bạn không mún hiển thị số âm trong chuỗi kết quả  */
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${remainingCalories} Calorie ${surplusOrDeficit}</span>
  <hr/>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;
  output.classList.remove("hide");
}

/* chức năng clear */
function clearForm() {
  /*  Array.from(document.querySelectorAll('li')); là lấy toàn bộ element con */
  const inputContainers = Array.from(
    document.querySelectorAll(".input-container")
  );
  for (const container of inputContainers) {
    container.innerHTML = "";
  }
  budgetNumberInput.value = "";
}

/* sự khác biệt giữ innerHTML , innerText, textContent */

//innerHTML là hiển thị bao gồm các thẻ và nội dung văn bản
/* Lưu ý: khi sử dụng innerHTML là phải khử trùng nó bằng regex coi chừng có kẻ tấn công */

//innerText là hiển thị toàn bộ văn bản

//textContent là hiển thị toàn bộ văn bản nó sẽ k ngắt dòng và xuống dòng

/* Tóm tắt đã học  */

//biết được regex
// biết được addEventListener('click' or 'submit', function)
// biết được innerHTML
// biết được Number chuyển đổi số để tính toán
// biết được Classlist.remove('hide')
// biết được  targetInputcontainer.insertAdjacentHTML("beforeend", HTMLString);
//* khi user nhập và mún add thì k mất đi cái input mà ng ta mới nhập
// biết được có nhiều thứ lặp qua lặp lại thì chúng ta dùng for
// biêt được gán querySelector và querySelectorAll để tăng số lượng input */
