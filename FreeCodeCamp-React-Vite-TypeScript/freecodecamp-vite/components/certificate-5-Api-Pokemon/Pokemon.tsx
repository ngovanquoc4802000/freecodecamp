import React from "react";
import { ChangeEvent, useEffect, useState } from "react";

interface PokemonData {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  weight: number;
}

function Pokemon() {
  const [inputValue, setInputValue] = useState<string>("");

  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  
  const [error, setError] = useState<string | null>(null);

  const getApiPokemon = async () => {
    try {
      setError(null);
      const response = await fetch(
        `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputValue.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("Pokemon not found");
      }

      const data: PokemonData = await response.json();
      setPokemonData(data);
    } catch (err) {
      console.log(err);
      setError(error);
      setPokemonData(null);
    }
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue) {
      getApiPokemon();
    }
  }, [inputValue]);

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
          <input
            onChange={handleChange}
            value={inputValue}
            name="Pokemon"
            id="search-input"
            type="text"
            required
          />
          <button onClick={getApiPokemon} id="search-button" type="button">
            Search
          </button>
        </form>
        <div className="output">
          {error && <p style={{ color: "red" }}>{error}</p>}
          {pokemonData && (
            <>
              <div className="top-container">
                <div className="name-and-id">
                  <span id="pokemon-name">
                    {pokemonData.name.toUpperCase()}
                  </span>
                  <span id="pokemon-id">ID: {pokemonData.id}</span>
                </div>
                <div className="size">
                  <span id="weight">Weight: {pokemonData.weight}</span>
                </div>
                <div id="sprite-container" className="sprite-container">
                  <img
                    src={pokemonData.sprites.front_default}
                    alt={pokemonData.name}
                  />
                </div>
                <div id="types">
                  Types:{" "}
                  {pokemonData.types.map((type) => type.type.name).join(", ")}
                </div>
              </div>
              <div className="bottom-container">
                <table>
                  <tbody>
                    <tr>
                      <th>Base</th>
                      <th>Stats</th>
                    </tr>
                    {pokemonData.stats.map((stat) => (
                      <tr key={stat.stat.name}>
                        <td>{stat.stat.name.toUpperCase()}:</td>
                        <td id={stat.stat.name}>{stat.base_stat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Pokemon;
