import { filterData, sortData } from "./data.js";
import data from "./data/pokemon/pokemon.js";

let { pokemon } = data;

const sortBySelect = document.getElementById("sortBy");
const sortOrderSelect = document.getElementById("sortOrder");

const pokemonsContainer = document.getElementById("pokemons");
const pokemonFilter = document.getElementById("pokemon-filter");

sortBySelect.addEventListener("change", () => {
  let sortedPokemons = sortData(
    pokemon,
    sortBySelect.value,
    sortOrderSelect.value
  );
  pokemon = sortedPokemons;
  sortedPokemons = filterData(pokemon, (pokemon) =>
    pokemon.name.startsWith(pokemonFilter.value)
  );
  pokemonsContainer.replaceChildren(...injectPokemons(sortedPokemons));
});

sortOrderSelect.addEventListener("change", () => {
  let reversedPokemons = pokemon.reverse();
  pokemon = reversedPokemons;
  reversedPokemons = filterData(pokemon, (pokemon) =>
    pokemon.name.startsWith(pokemonFilter.value)
  );
  pokemonsContainer.replaceChildren(...injectPokemons(reversedPokemons));
});

pokemonFilter.addEventListener("input", () => {
  const filteredPokemons = filterData(pokemon, (pokemon) =>
    pokemon.name.startsWith(pokemonFilter.value)
  );

  pokemonsContainer.replaceChildren(...injectPokemons(filteredPokemons));
});

const injectPokemons = (pokemons) => {
  return pokemons.map((obj) => {
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");
    const pokemonData = document.createElement("div");
    pokemonData.classList.add("pokemon-data");
    const pokemonNum = document.createElement("div");
    pokemonNum.innerText = obj.num;
    const pokemonName = document.createElement("div");
    pokemonName.innerText = obj.name;
    pokemonData.append(pokemonNum, pokemonName);
    pokemonCard.appendChild(pokemonData);
    return pokemonCard;
  });
};

pokemonsContainer.replaceChildren(...injectPokemons(pokemon));