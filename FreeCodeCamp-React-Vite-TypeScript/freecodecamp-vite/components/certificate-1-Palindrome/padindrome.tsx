import React from "react";
import { SetStateAction, useState } from "react";

function Palindrome() {
  const [value, setValue] = useState("");
  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setValue(e.target.value);
  };
  const handleCheck = () => {
    const regex = /[^a-zA-Z0-9]/g;
    const textInput = value.replace(regex, "");
    const cleanInput = textInput.toLocaleLowerCase();
    const upstream = cleanInput.split("").reverse().join("");
    if (textInput === "") {
      alert("Please input a value");
    } else if (cleanInput === upstream) {
      return   <div className="results-div" id="result">{value}</div>;
    } else {
      return <div>{value} is not a palindrome</div>;
    }
  };
  return (
    <main className="container-palindrome">
      <img
        src="https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg"
        className="freecodecamp-logo"
        alt="freecodecamp-logo"
      />
      <h1>Is it a Palindrome?</h1>
      <div className="palindrome-div">
        <label htmlFor="text-input">
          Enter in text to check for a palindrome:{" "}
        </label>
        <input
          onChange={handleChange}
          type="text"
          value={value}
          className="palindrome-input"
          id="text-input"
        />
        <button onClick={handleCheck} id="check-btn">
          Check
        </button>
        <div className="results-div" id="result"></div>
      </div>
      <div className="palindrome-definition-div">
        <p className="palindrome-definition">
          <span role="img" aria-label="light-bulb">
            💡 " A "<dfn>palindrome</dfn>
            "is a word or sentence that's spelled the same way both forward and
            backward, ignoring punctuation, case, and spacing."
          </span>
        </p>
      </div>
    </main>
  );
}
export default Palindrome;
