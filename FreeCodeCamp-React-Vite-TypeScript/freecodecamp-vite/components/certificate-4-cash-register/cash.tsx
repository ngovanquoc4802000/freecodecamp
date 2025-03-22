
import React from 'react';


function CashRegister() {
  return (
    <main className="cash">
      <img
        className="freecodecamp-logo"
        src="https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg"
        alt=""
      />
      <h1>Cash Register Project</h1>
      <div id="change-due"></div>
      <div className="input-div">
        <label htmlFor="cash">Enter cash from customer:</label>
        <input type="number" value="" className="user-input" id="cash" />
        <button className="check-btn-styles" id="purchase-btn">
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
