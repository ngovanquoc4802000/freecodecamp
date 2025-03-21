import { ChangeEvent, useState } from "react";

interface Roman {
  [key: number]: string;
}

const romanNumerals: Roman = {
  1: "I",
  4: "IV",
  5: "V",
  9: "IX",
  10: "X",
  40: "XL",
  50: "L",
  90: "XC",
  100: "C",
  400: "CD",
  500: "D",
  900: "CM",
  1000: "M",
};
function ParseInt() {
  const [value, setValue] = useState<number>(0);
  const [showResult, setShowResult] = useState("");
  const [showInput, setShowInput] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue === "" ? 0 : parseFloat(inputValue);
    if (!isNaN(numericValue)) {
      setValue(numericValue);
    }
  };

  const checkInput = () => {
    const check = value;
    numeric(value);
    if (!check || isNaN(check)) {
      numeric(value);
      setShowInput("Please enter a valid number");
    } else if(check === 0 || check < 0) {
      setShowInput("Please enter a number greater than or equal to 1")
    } else if(check >= 4000) {
       setShowInput("Please enter a number less than or equal to 3999")
    }
  };

  const numeric = (value: number) => {
    const keys = Object.keys(romanNumerals).reverse();
    let result = "";
    for (let i = 0; i < keys.length; i++) {
      const parse = parseInt(keys[i]);
      const keyFonts = romanNumerals[parse];

      while (value >= parse) {
        result += keyFonts;
        value -= parse;
      }
    }
    setShowResult(result);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    checkInput();
  };
  return (
    <main className="convert">
      <img
        className="freecodecamp-logo"
        src="https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg"
        alt="freecodecamp logo"
      />
      <h1>Roman Numeral Converter</h1>
      <form onSubmit={handleSubmit} action="">
        <fieldset>
          <label htmlFor="number">Enter a Number</label>
          <br />
          <input
            onChange={handleOnChange}
            value={value}
            type="number"
            id="number"
          />
          <button type="submit" id="convert-btn">
            Convert
          </button>
        </fieldset>
      </form>
      <div id="output" className="output">
        {showResult}
      </div>
      <div style={{ color: "red" }} className="text">
        {showInput}
      </div>
    </main>
  );
}
export default ParseInt;
