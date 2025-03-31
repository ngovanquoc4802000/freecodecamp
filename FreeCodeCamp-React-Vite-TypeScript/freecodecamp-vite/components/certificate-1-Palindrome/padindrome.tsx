import React, { useState } from "react";
/* begin
- input : value;
- logic: xử lý regex làm sao cho những string , nếu nó reverse bằng nhau thì ngược lại;
 + nếu click bằng palindrome thì is valid và ngược lại
- hiển thị kết quả;
end
*/

function Palindrome() {
  const [value, setValue] = useState<string>("");
  const [showResult, setShowResult] = useState<string>("");
  const [isPalindrome, setIsPalindrome] = useState<boolean | null>(null); // lưu trữ kết quả boolean của kiểm tra 

  const cleanInputString = (str: string) => {
    const regex = /[^a-zA-z0-9]/g;
    return str.replace(regex, "");
  };

  const handleOnchange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(e.target.value);
    setIsPalindrome(null);
  };

  const handleClick = () => {
    if (value === "") {
      alert("Please input");
      return;
    }

    const inputValue: string = cleanInputString(value).toLocaleLowerCase();
    const upstream: string = inputValue.split("").reverse().join("");
    const check: boolean = inputValue === upstream;
    setIsPalindrome(check);
    setShowResult(
      check ? `${value} is a palindrome` : `${value} is not a palindrome`
    );
    return check;
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
          onChange={handleOnchange}
          type="text"
          value={value}
          className="palindrome-input"
          id="text-input"
        />
        <button onClick={handleClick} id="check-btn">
          Check
        </button>
        <div
          style={
            isPalindrome === null
              ? { color: "black" }
              : isPalindrome
              ? { color: "green" }
              : { color: "red" }
          }
          className="results-div"
          id="result"
        >
          {showResult}
        </div>
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
