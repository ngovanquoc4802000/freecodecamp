import React, { ChangeEvent, useEffect, useState } from "react";
interface Character {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  deletedAt: null | string;
}

type ApiResponse = {
  items: Character[];
};
function SongoKu() {
  const [inputValue, setInputValue] = useState<string>("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://dragonball-api.com/api/characters/${inputValue.toLocaleLowerCase()}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: ApiResponse = await response.json();
        setCharacters(data.items);
        console.log(data.items);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="Songoku">
      <div className="header">
        <img
          src="https://web.dragonball-api.com/images-compress/android-icon-192x192.webp"
          alt="Dragon Ball API Logo"
          className="logo"
        />
      </div>

      <div className="content">
        <div className="logo-container">
          <img
            src="https://web.dragonball-api.com/images-compress/logo_dragonballapi.webp"
            alt="Dragon Ball Logo"
            className="main-logo"
          />
          <p className="api-text">The Dragon Ball API</p>
        </div>
        <div className="search-bar">
          <input
            value={inputValue}
            onChange={handleOnchange}
            className="text"
            type="text"
            placeholder="Enter ID to search"
          />
          <button className="search-btn">Search</button>
        </div>
      </div>
      <div className="output">
        <div className="top-container">
          <div className="name-and-id">
            <span id="pokemon-name"></span>
            <span id="pokemon-id">ID:</span>
          </div>
          <div className="size">
            <span id="weight">Weight: </span>
          </div>
          <div id="sprite-container" className="sprite-container">
            <img src="" alt="" />
          </div>
          <div id="types">Types: </div>
        </div>
        <div className="bottom-container">
          <table>
            <tbody>
              <tr>
                <th>Base</th>
                <th>Stats</th>
              </tr>
              {/*    {pokemonData.stats.map((stat) => (
                      <tr key={stat.stat.name}>
                        <td>{stat.stat.name.toUpperCase()}:</td>
                        <td id={stat.stat.name}>{stat.base_stat}</td>
                      </tr>
                    ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default SongoKu;
