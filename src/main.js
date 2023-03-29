import { filterData, sortData } from "./data.js";
import data from "./data/pokemon/pokemon.js";

const { pokemon } = data;
let memory = pokemon;

const sortBySelect = document.getElementById("sortBy");
const sortOrderSelect = document.getElementById("sortOrder");

const pokemonsContainer = document.getElementById("pokemons");
const pokemonFilter = document.getElementById("pokemon-filter");

const sortBySelectCallback = () => {
  const sortedPokemons = sortData(
    memory,
    sortBySelect.value,
    sortOrderSelect.value
  );
  pokemonsContainer.replaceChildren(...injectPokemons(sortedPokemons));
};

const sortOrderSelectCallback = () => {
  const reversedPokemons = memory.reverse();
  pokemonsContainer.replaceChildren(...injectPokemons(reversedPokemons));
};

sortBySelect.addEventListener("change", () => sortBySelectCallback());
sortOrderSelect.addEventListener("change", () => sortOrderSelectCallback());

pokemonFilter.addEventListener("input", (e) => {
  memory = filterData(pokemon, (p) =>
    p.name.startsWith(e.target.value)
  );

  pokemonsContainer.replaceChildren(...injectPokemons(memory));

  sortOrderSelectCallback();
  sortBySelectCallback();
});

const injectPokemons = (pokemons) => {
  return pokemons.map((obj) => {
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");
    const pokemonData = document.createElement("div");
    pokemonData.classList.add("pokemon-data");
    const pokemonImage = document.createElement("img");
    pokemonImage.src = obj.img;
    pokemonImage.classList.add("pokemon-image");
    const pokemonNum = document.createElement("div");
    pokemonNum.innerText = obj.num;
    const pokemonName = document.createElement("div");
    pokemonName.innerText = obj.name;
    
    pokemonData.append(pokemonImage, pokemonNum, pokemonName);
    pokemonCard.appendChild(pokemonData);
    return pokemonCard;
  });
};

pokemonsContainer.replaceChildren(...injectPokemons(pokemon));