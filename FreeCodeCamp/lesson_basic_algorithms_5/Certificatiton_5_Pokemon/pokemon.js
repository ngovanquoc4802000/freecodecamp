const pokemonName = document.getElementById("pokemon-name")
const pokemonId = document.getElementById("pokemon-id");
const weightSize = document.getElementById("weight");
const heightSize = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const input = document.getElementById("search-input")
const searchButton = document.getElementById("search-button");
const searchForm = document.getElementById("search-form")
const spriteContainer = document.getElementById("sprite-container")


const getApiPokemon = async() => {
  try {
     const inputValue = input.value;
     fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputValue}`)
     .then((res) => res.json())
     .then((data) => updateUI(data)/* console.log(data) */);
  } catch(err) {
    console.log(err + "không tìm thấy")
  }
}
const updateUI = ( data) => {
  pokemonName.innerText = `${data.name}`;
  pokemonId.innerText = `#${data.id}`;
  weightSize.innerText = `Weight: ${data.weight}`;
  heightSize.innerText = `Height: ${data.height}`;
  spriteContainer.innerHTML = `
   <img id="sprite" src="${data.sprites.front_default}" alt="${data.name}" />
  `
    hp.innerText = data.stats[0].base_stat
    attack.innerText = data.stats[1].base_stat
    defense.innerText = data.stats[2].base_stat
    specialAttack.innerText = data.stats[3].base_stat
    specialDefense.innerText = data.stats[4].base_stat
    speed.innerText = data.stats[5].base_stat
}

searchForm.addEventListener('submit',(e) => {
  e.preventDefault();
  getApiPokemon();
})