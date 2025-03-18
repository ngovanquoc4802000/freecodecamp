function Telephone() {
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
        <input maxLength={20} type="text" id="user-input" />
        <div id="results-div"></div>
        <div className="phone-footer">
          <button id="check-btn" className="btn-styles">
            Check
          </button>
          <button id="clear-btn" className="btn-styles">
            Clear
          </button>
        </div>
      </div>
    </main>
  );
}
export default Telephone;
