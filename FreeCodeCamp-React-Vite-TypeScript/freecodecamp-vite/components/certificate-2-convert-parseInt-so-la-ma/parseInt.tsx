function ParseInt() {
  return (
    <main className="convert">
      <img
        className="freecodecamp-logo"
        src="https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg"
        alt="freecodecamp logo"
      />
      <h1>Roman Numeral Converter</h1>
      <form action="">
        <fieldset>
          <label htmlFor="number">Enter a Number</label>
          <br />
          <input type="number" id="number" value="" />
          <button type="button" id="convert-btn">
            Convert
          </button>
        </fieldset>
      </form>
      <div id="output" className="output"></div>
    </main>
  );
}
export default ParseInt;
