import { ChangeEvent, useState } from "react";

type CurrencyName =
  | "PENNY"
  | "NICKEL"
  | "DIME"
  | "QUARTER"
  | "ONE"
  | "FIVE"
  | "TEN"
  | "TWENTY"
  | "ONE HUNDRED";
type CurrencyTuple = [CurrencyName, number];
type cidCash = CurrencyTuple[];

const cid: cidCash = [
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

interface resultCash {
  status: string;
  change: never[];
}
const result: resultCash = {
  status: "OPEN",
  change: [],
};

const price: number = 3.26;
function CashRegister() {
  const [value, setValue] = useState<number>(0);
  const [change, setChange] = useState<string>("");
  const [showResult, setShowResult] = useState<object>(result);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numeric = inputValue === "" ? 0 : parseFloat(inputValue);
    if (!isNaN(numeric)) {
      setValue(numeric);
    }
  };

  const handlePurchase = () => {
    /* để giá tiền khách hàng và giá trong két về tròn số 100 */
    const cashInCents = Math.round(Number(value) * 100);
    const priceInCents = Math.round(price * 100);
    console.log(cashInCents);
    /* Điều kiện nếu số tiền khacsh khách hàng đưa ít hơn giá tiền thối */
    console.log(priceInCents);
    if (cashInCents < priceInCents) {
      alert("Customer does not have enough money to purchase the item");
      return;
    } else {
      setValue(value);
    }
    /* điều kiện nếu số tiền khách hàng bằng số tiền trong két */
    if (cashInCents === priceInCents) {
      setChange("No change due - customer paid with exact cash");
    } else {
      setValue(value);
    }
    /* tiền khách - trừ tiền thối */
    const changeDue = cashInCents - priceInCents;
    const revesedCid: CurrencyTuple[] = [...cid]
      .reverse()
      .map(([item, amount]) => [item, Math.round(amount * 100)]);
    const denominations: number[] = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
    if (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      changeDue > revesedCid.reduce((prev, [_, amount]) => prev + amount, 0)
    ) {
      setShowResult({ status: "INSUFFICIENT_FUNDS", change: [] });
      return;
    }
    for(let i = 0; i < revesedCid.length; i++) {
      if(changeDue >= denominations[i] && changeDue >0) {
        const [denominations,amount] = revesedCid[i];
        const possibleChange = Math.min(amount, changeDue);
        const count = Math.floor(possibleChange / denominations[i]);
            const amountInChange = count * denominations[i];
      }
    }
  };

  return (
    <main className="cash">
      <img
        className="freecodecamp-logo"
        src="https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg"
        alt=""
      />
      <h1>Cash Register Project</h1>
      <div id="change-due">
        <p>{change}</p>
      </div>
      <div className="input-div">
        <label htmlFor="cash">Enter cash from customer:</label>
        <input
          type="number"
          onChange={handleChange}
          value={value}
          className="user-input"
          id="cash"
        />
        <button
          onClick={handlePurchase}
          className="check-btn-styles"
          id="purchase-btn"
        >
          Purchase
        </button>
      </div>
      <div className="container">
        <div className="top-display-screen-container">
          <p id="price-screen" className="price-screen">
            Total: $3.26
          </p>
          <div className="connector"></div>
        </div>
        <div className="top-register">
          <div className="btns-container">
            <button className="btn"></button>
            <button className="btn"></button>
            <button className="btn"></button>
            <button className="btn"></button>
            <button className="btn"></button>
            <button className="btn"></button>
            <button className="btn"></button>
            <button className="btn"></button>
            <button className="btn"></button>
          </div>
          <div id="cash-drawer-display">
            <p>
              <strong>Change in drawer:</strong>
            </p>
            <p>Pennies: $1.01</p>
            <p>Nickels: $2.05</p>
            <p>Dimes: $3.1</p>
            <p>Quarters $</p>
            <p>Ones: $55</p>
            <p>Fives: $20</p>
            <p>Twenties: $60</p>
            <p>Hundreds: $100</p>
          </div>
        </div>
        <div className="bottom-register">
          <div className="circle"></div>
        </div>
      </div>
    </main>
  );
}

export default CashRegister;
