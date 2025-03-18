function Pokemon() {
  return (
    <main className="pokemon">
      <img
        className="freecodecamp-logo"
        src="https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg"
        alt="freecodecamp-logo"
      />
      <h1>Pokémon Search App</h1>
      <div className="container">
        <form id="search-form" role="search" action="">
          <label htmlFor="search-input">Search for Pokémon Name or ID:</label>
          <input name="Pokemon" id="search-input" type="text" required />
          <button id="search-button">Search</button>
        </form>
        <div className="output">
          <div className="top-container">
            <div className="name-and-id">
              <span id="pokemon-name"></span>
              <span id="pokemon-id"></span>
            </div>
            <div className="size">
              <span id="weight"></span>
              <span id="height"></span>
            </div>
            <div id="sprite-container" className="sprite-container"></div>
            <div id="types"></div>
          </div>
          <div className="bottom-container">
            <table>
              <tbody>
                <tr>
                  <th>Base</th>
                  <th>Stats</th>
                </tr>
                <tr>
                  <td>HP: </td>
                  <td id="hp"></td>
                </tr>
                <tr>
                  <td>Attack:</td>
                  <td id="attack"></td>
                </tr>
                <tr>
                  <td>Defense:</td>
                  <td id="defense"></td>
                </tr>
                <tr>
                  <td>Sp. Attack:</td>
                  <td id="special-attack"></td>
                </tr>
                <tr>
                  <td>Sp. Defense:</td>
                  <td id="special-defense"></td>
                </tr>
                <tr>
                  <td>Speed:</td>
                  <td id="speed" className="speed"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
export default Pokemon;
