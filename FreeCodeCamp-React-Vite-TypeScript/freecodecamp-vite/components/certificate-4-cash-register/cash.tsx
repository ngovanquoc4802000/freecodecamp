/* eslint-disable prefer-const */
import { useState } from "react";
type CurrencyUnit = [string, number];

const initialCid: CurrencyUnit[] = [
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
/* Trong typescript có kiểu dữ liệu Record<keys,value> 
vd: currencyMap[0] => 1000 (chú ý không cho phép sửa và thay đổi array)
*/
const currencyMap: Record<string, number> = {
  "ONE HUNDRED": 10000,
  TWENTY: 2000,
  TEN: 1000,
  FIVE: 500,
  ONE: 100,
  QUARTER: 25,
  DIME: 10,
  NICKEL: 5,
  PENNY: 1,
};

const price: number = 3.26;
function CashRegister() {
  const [value, setValue] = useState<string>("");
  const [cid, setCid] = useState<CurrencyUnit[]>(initialCid);
  const [changeMessage, setChangeMessage] = useState<string>("");

  const handlePurchase = () => {
    const cashInCents: number = Math.round(Number(value) * 100);
    const priceInCents: number = Math.round(price * 100);
    if (cashInCents < priceInCents) {
      setChangeMessage(
        "Customer does not have enough money to purchase the item"
      );
      return;
    }
    if (cashInCents === priceInCents) {
      setChangeMessage("No change due - customer paid with exact cash");
      return;
    }
    let changeDueAmount: number = cashInCents - priceInCents;
    const totalCid: number = cid.reduce(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (sum, [_, amount]) => sum + Math.round(amount * 100),
      0
    );
    if (totalCid < changeDueAmount) {
      setChangeMessage("Status: INSUFFICIENT_FUNDS");
      return;
    }

    const change: [string, number][] = [];

    const newCid: CurrencyUnit[] = [...cid].reverse();
    newCid.map(([denomination, amount]) => {
      const amountInCents: number = Math.round(amount * 100);
      const denomValue: number = currencyMap[denomination];

      const count: number = Math.min(
        Math.floor(changeDueAmount / denomValue),
        amountInCents / denomValue
      );
      const givenAmount: number = count * denomValue;
      console.log(givenAmount)
      changeDueAmount -= givenAmount;
      if(changeDueAmount > 0) change.push([denomination,givenAmount / 100]);
      return [denomination,(amountInCents - givenAmount) / 100] as [string, number];
    });
        
    if(changeDueAmount > 0) {
      setChangeMessage("Status: INSUFFICIENT_FUNDS");
      return;
    }
   
    setCid(newCid.reverse());
    setChangeMessage(`Status: OPEN
      ${change.map(([denom, amount]) => `${denom} : $${amount}`).join("\n")}`);
    setValue("")
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
        <div>
          <p>{changeMessage}</p>
        </div>
      </div>
      <div className="input-div">
        <label htmlFor="cash">Enter cash from customer:</label>
        <input
          type="number"
          onChange={(e) => setValue(e.target.value)}
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
                {denomationName} :<strong>${amount.toFixed(2)}</strong>
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
