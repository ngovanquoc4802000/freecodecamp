import "./styles.css";
function Palindrome() {
  return (
    <main className="container">
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
          type="text"
          value=""
          className="palindrome-input"
          id="text-input"
        />
        <button id="check-btn">Check</button>
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
