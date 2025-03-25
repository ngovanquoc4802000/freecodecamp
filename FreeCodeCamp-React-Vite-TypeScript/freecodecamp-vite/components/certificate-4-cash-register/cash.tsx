import React, { ChangeEvent, useState } from "react";
type CurrencyUnit = [string, number];

const cid: CurrencyUnit[] = [
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

interface Result {
  status?: "OPEN" | "CLOSED" | "INSUFFICIENT_FUNDS";
  change?: CurrencyUnit[];
}

const price: number = 3.26;
function CashRegister() {
  const [value, setValue] = useState<number>(0);
  const [change, setChange] = useState<string>("");
  const [changeMessage, setChangeMessage] = useState<string>("");
  const [showResult, setShowResult] = useState<Result>({
    status: "OPEN",
    change: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numeric: number = inputValue === "" ? 0 : parseFloat(inputValue);
    if (!isNaN(numeric)) {
      setValue(numeric);
      return;
    }
  };

  const handlePurchase = () => {
    const cashInCents: number = isNaN(Number(value))
      ? 0
      : Math.round(Number(value) * 100);
    const priceInCents: number = Math.round(price * 100);
    const changeDue = cashInCents - priceInCents;

    if (cashInCents < priceInCents) {
      alert("Customer does not have enough money to purchase the item");
      return;
    } else {
      setValue(0);
    }
    if (cashInCents === priceInCents) {
      setChange("No change due - customer paid with exact cash");
      return;
    } else {
      setValue(0);
    }

    const reversedCid: [string, number][] = [...cid]
      .reverse()
      .map(([item, amount]) => [item, Math.round(amount * 100)]);
    /* chia tiền thối thành các mệnh giá */
    const denominations: number[] = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
    /*  */
    const totalCid: number = reversedCid.reduce(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (prev: number, [_, amount]: [string, number]) => prev + amount,
      0
    );
    if (totalCid < changeDue) {
      setShowResult({
        status: "INSUFFICIENT_FUNDS",
        change: [],
      });
      return;
    } else {
      setValue(0);
    }
    for (let i: number = 0; i < reversedCid.length; i++) {
      /* Nếu tiền thối còn lại lớn hơn mệnh giá hiện tại */
      if (changeDue >= denominations[i] && changeDue > 0) {
        const [denomationName, amount]: [string, number] = reversedCid[i];
        /* xác định số tiền tối đa có thể thối */
        const possibleChange: number = Math.min(amount, changeDue);
        /* tính số lượng tờ tiền cần thối */
        const count: number = Math.floor(possibleChange / denominations[i]);
        /* tính tổng số tiền thối của mệnh giá này */
        const sumInchangeDue: number = count * denominations[i];
        const updateChange: [string, number][] = [];
        if (count > 0) {
          updateChange.push([denomationName, sumInchangeDue / 100]);
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          changeDue - sumInchangeDue;
        }
        setShowResult({
          ...showResult,
          change: updateChange,
        });
      }
    }

    formatResult(showResult.status, showResult.change);
  };
  const formatResult = (
    status: string | undefined,
    change: CurrencyUnit[] | undefined
  ) => {
    const formattedChange = change
      ?.map(
        ([denominationName, amount]) =>
          `${denominationName}: ${amount.toFixed(2)}`
      )
      .join(", ");
    setChangeMessage(`Status : ${status}. Change: ${formattedChange}`);
  };
  console.log(showResult);
  return (
    <main className="cash">
      <img
        className="freecodecamp-logo"
        src="https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg"
        alt=""
      />
      <h1>Cash Register Project</h1>
      <div id="change-due">
          <div>
            <p> {changeMessage}</p>
            {showResult.change?.map(([name, amount]) => (
              <p key={name}>
                {name} : ${amount}
              </p>
            ))}
          </div>
        <p style={{ color: "red" }}>{change}</p>
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
            {cid.map(([denomationName, amount]) => (
              <p key={denomationName}>
                {denomationName} : {amount.toFixed(2)}
              </p>
            ))}
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
