import { SetStateAction, useState } from "react";
import ResultProps from "./resultProps";
import React from "react";

function Telephone() {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const handleOnchange = (e: { target: { value: SetStateAction<string> } }) => {
    setValue(e.target.value);
  };
  const checkInput = (value: string) => {
    if (value === "") {
      alert("Please Provide a phone number");
      return;
    }

    const countryCode:string = "^(1\\s?)?"; // prefix
    const areaCode:string = "(\\([0-9]{3}\\)|[0-9]{3})";
    const spacesDashes:string = "[\\s\\-]?";
    const phoneNumber:string = "[0-9]{3}[\\s\\-]?[0-9]{4}$"; // $ là câu kết thúc cuối
    const phoneRegex: RegExp = new RegExp(
      `${countryCode}${areaCode}${spacesDashes}${phoneNumber}`
    );
    const isValid : boolean = phoneRegex.test(value);
    setIsValid(isValid);
    setInputValue(value);
  };
  const handleCheckBtn = () => {
    checkInput(value);
  };
const handleReset = () => {
    setValue("");
    setInputValue("");
  };
  return (
    <main className="telephone">
      <img
        className="freecodecamp-logo"
        src="https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg"
        alt="freecodecamp"
      />
      <h1>Telephone</h1>
      <div className="phone-container">
        <div className="phone-background">
          <div className="phone-camera"></div>
        </div>
        <label htmlFor="user-input">Enter a Phone Number: </label>
        <input
          onChange={handleOnchange}
          value={value}
          maxLength={20}
          type="text"
          id="user-input"
        />
        <div id="results-div">
          <ResultProps isValid={isValid} inputValue={inputValue} />
        </div>
        <div className="phone-footer">
          <button
            onClick={handleCheckBtn}
            id="check-btn"
            className="btn-styles"
          >
            Check
          </button>
          <button onClick={handleReset} id="clear-btn" className="btn-styles">
            Clear
          </button>
          <div className="text"></div>
        </div>
      </div>
    </main>
  );
}
export default Telephone;
