// tại đây bạn sẽ xây dựng một ứng dụng máy tính tiền
// sẽ trả lại thay đổi cho khách hàng dựa trên giá của mặt hàng
// Lượng tiền mặt được cung cấp bởi khách hàng và số tiền mặt trong ngăn kéo tiền mặt

// input : số nguyên (tiền mỹ)
// logic:
//   + xử lý trường hợp:
//     - Nếu số tiền khách hàng đưa bằng giá trị cần thanh toán thì báo "Insufficent"
//     - Nếu số tiền khách hàng đưa ít hơn giá tiền "Customer does not have enough money to purchase the item"
//   + tính tiền thối (tiền khách - trừ đi tiền thối)
//   + Tạo mảng và map,reverse nó từ lớn về nhỏ
//   + chia tiền thối thành các mệnh giá ()
//   + xử lý trường hợp tiền có trong két:
//      - nếu tổng số tiền trong két nhỏ hơn số tiền thối lại thì "không có tiền thối lại"
//      - nếu tổng số tiền trong két bằng số tiền thối lại thì "CLOSED"
//

// $3.26 USD bằng 81.500 VND
// $1.01 pennies bằng 252.5VND
// Nickels $2.05  bằng 2.562.5 VND
// Dimes: $3.1 bằng 7.750 VND

const purchaseBtn = document.getElementById("purchase-btn");
const cash = document.getElementById("cash");
const changeDueDisplay = document.getElementById("change-due");
const priceScreen = document.getElementById("price-screen");
const cashDrawerDisplay = document.getElementById("cash-drawer-display");
let price = 3.26;

let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const formatResult = (status, change) => {
  changeDueDisplay.innerHTML = `<p>Status: ${status}</p>`;
  changeDueDisplay.innerHTML += change
    .map(
      ([denominationName, amount]) => `<p>${denominationName} : $${amount}</p>`
    )
    .join("");
};

const checkCashRegister = () => {
  const cashInCents = Math.round(Number(cash.value) * 100);
  const priceInCents = Math.round(price * 100);
  console.log(cashInCents);
  console.log(priceInCents);
  /* số tiền khách hàng đưa ít hơn giá tiền */
  cashInCents < priceInCents
    ? alert("Customer does not have enough money to purchase the item")
    : (cash.value = "");

  cashInCents === priceInCents
    ? (changeDueDisplay.innerHTML = `<p>No change due - customer paid with exact cash</p>`)
    : (cash.value = "");
  /* tiền khách hàng - giá sản phẩm */
  let changeDue = cashInCents - priceInCents;
  console.log(changeDue);
  const reversedCid = [...cid]
    .reverse()
    .map(([item, amount]) => [item, Math.round(amount * 100)]);
  /* chia tiền thối thành các mệnh giá */
  const denominations = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
  /* tạo result */
  const result = {
    status: "OPEN",
    change: [],
  };

  const totalCid = reversedCid.reduce((prev, [_, amount]) => prev + amount, 0);
  totalCid < changeDue
    ? (changeDueDisplay.innerHTML = `<p>Status: INSUFFICIENT_FUND</p>`)
    : "";
  for (let i = 0; i < reversedCid.length; i++) {
    /* Nếu tiền thối còn lại lớn hơn mệnh giá hiện tại */
    if (changeDue >= denominations[i] && changeDue > 0) {
      const [denominationName, amount] = reversedCid[i];
      /* Xác định số tiền tối đa có thể thối */
      const possibleChange = Math.min(amount, changeDue);
      /* tính số lượng tờ tiền cần thối */
      const count = Math.floor(possibleChange / denominations[i]);
      /* tính tổng số tiền thối của mệnh giá này */
      const amountInChange = count * denominations[i];
      /* cập nhật số tiền thối còn lại */
      changeDue -= amountInChange;
      if (count > 0) {
        result.change.push([denominationName, amountInChange / 100]); // chuyển đổi tiền thối từ cent sang đô la
      }
    }
  }
  if (changeDue > 0) {
    displayChangeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }
  formatResult(result.status, result.change);
  updateUI(result.change);
};
const updateUI = (change) => {
  const currencyNameMap = {
    PENNY: "Pennies",
    NICKEL: "Nickels",
    DIME: "Dimes",
    QUARTER: "Quarters",
    ONE: "Ones",
    FIVE: "Fives",
    TEN: "Tens",
    TWENTY: "Twenties",
    "ONE HUNDRED": "Hundreds",
  };
  if (change) {
    change.forEach(([changeDenomination, changeAmount]) => {
      /* changeDenomination : là chuỗi  */
      /* changeAmount : là kết quả sổ  */
      const targetArr = cid.find(
        ([denominationName]) => denominationName === changeDenomination
      );
      /* thay thế số ở vị trí số 1 */
      targetArr[1] =
        (Math.round(targetArr[1] * 100) - Math.round(changeAmount * 100)) / 100;
    });
  }
  cash.value = "";
  priceScreen.innerText = `Total: $${price}`;
  cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
  ${cid.map(([denominationName, amount]) =>
    `<p>${currencyNameMap[denominationName]}: $${amount}</p>`
  ).join('')}
`;
};

const checkInput = () => {
  if (!cash.value) {
    return;
  }
  checkCashRegister();
};
purchaseBtn.addEventListener("click", () => {
  checkCashRegister();
});
cash.addEventListener("keydown", (e) => {
  if (e.key === "enter") {
    checkInput();
  }
});
