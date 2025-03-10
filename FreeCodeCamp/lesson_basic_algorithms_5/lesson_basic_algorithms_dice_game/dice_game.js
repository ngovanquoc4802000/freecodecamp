const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let round = 1;
let rolls = 0;

const rollDice = () => {
  diceValuesArr = [];
  for (let i = 0; i < 5; i++) {
    /* phần này để gáng 5 con số nguyên */
    diceValuesArr[i] = Math.floor(Math.random() * 6 + 1);
  }
  listOfAllDice.forEach((index, item) => {
    index.textContent = diceValuesArr[item];
  });
};


const updateStats = () => {
  rollsElement.textContent = rolls;
  roundElement.textContent = round
}

const updateRadioOption = (index,score) => {
  /* làm input bật lên */
 scoreInputs[index].disabled = false;
 /* giá trị có điểm */
 scoreInputs[index].value = score;
 /* nơi in ra số điểm */
 scoreSpans.textContent  = ", score = "+`${score}`
}

/* calculate */
const getHighestDuplicates = (dice_values = []) => {
   /* Nếu 1 số tìm thấy 4 lần trở lên bạn sẽ cập nhật Four of a kind */
   // Nếu bạn lăn xuất xắc và nhận được 3 loại hoặc 4 loại, thì bạn có thể nhận được số điểm tổng của tất cả năm giá trị xúc xắc
   /* ----------- */
   // vòng lặp for dice_values sẽ duyệt qua 
   // nếu giá trị đã có trong duplicates số đếm của nó tăng lên 1
   // nếu giá trị chưa có , nó được thêm vào duplicates với số đếm là 1
   // vd: dice_values[1,1,1,2,3] thì duplicate{1:3,2:1,3:1}
}

rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    alert("đã đủ 3 vòng");
  } else {
    rollDice();
    rolls++;
    updateStats()
  }
});

rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;
  if (isModalShowing) {
    rulesBtn.textContent = "Hide rules";
    rulesContainer.style.display = "block";
  } else {
    rulesBtn.textContent = "Show rules";
    rulesContainer.style.display = "none";
  }
});
