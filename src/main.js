import { filterData, sortData } from "./data.js";
import data from "./data/pokemon/pokemon.js";

const { pokemon } = data;
let memory = pokemon;

const sortBySelect = document.getElementById("sortBy");
const sortOrderSelect = document.getElementById("sortOrder");

const pokemonsContainer = document.getElementById("pokemons");
const pokemonFilter = document.getElementById("pokemon-filter");

const typeClasses = {
  grass: "grass-type",
  poison: "poison-type",
  fire: "fire-type",
  flying: "flying-type",
  water: "water-type",
  bug: "bug-type",
  normal: "normal-type",
  electric: "electric-type",
  ground: "ground-type",
  fairy: "fairy-type",
  fighting: "fighting-type",
  psychic: "psychic-type",
  rock: "rock-type",
  steel: "steel-type",
  ice: "ice-type",
  ghost: "ghost-type",
  dragon: "dragon-type",
  dark: "dark-type"
};

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

const resetButton =document.getElementById("show-all-btn");
resetButton.addEventListener('click', function() {
  pokemonsContainer.replaceChildren(...injectPokemons(memory));
});

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
    pokemonNum.innerText = "N ° " + obj.num;
    pokemonNum.classList.add("pokemon-num");

    const pokemonName = document.createElement("div");
    pokemonName.innerText = obj.name.charAt(0).toUpperCase() + obj.name.slice(1);
    pokemonName.classList.add("pokemon-name");
    
    const pokemonType = document.createElement("div");
    obj.type.forEach((type) => {
      const typeSpan = document.createElement("span");
      typeSpan.innerText = type;
      typeSpan.classList.add("pokemon-type");
      if (type in typeClasses) {
        typeSpan.classList.add(typeClasses[type]);
      }
      pokemonType.appendChild(typeSpan);
    });
    pokemonType.classList.add("pokemon-types");
    
    // Agregar evento de clic a la tarjeta
    pokemonCard.addEventListener('click', function() {
      // Ocultar otras tarjetas
      pokemonsContainer.childNodes.forEach(card => {
        if (card !== pokemonCard) {
          card.style.display = 'none';
        }
      });
      if(pokemonCard.children.length < 2){
        const pokemonTmp = document.createElement("div");
        pokemonTmp.classList.add("pokemon-tmp");
      
        const pokemonDescription = document.createElement("div");
        pokemonDescription.innerText = obj.about;

        const pokemonSize = document.createElement("div");
        const formattedHeight = obj.size.height.replace(" m", "") + "m";
        const formattedWeight = obj.size.weight.replace(" kg", "") + "kg";
        pokemonSize.innerText = "height: " + formattedHeight + "\nweight: " + formattedWeight;
        pokemonSize.classList.add("pokemon-size");


        const pokemonResistant = document.createElement("div");
        pokemonResistant.classList.add("pokemon-resistant");

        const resistantLabel = document.createElement("span");
        resistantLabel.innerText = "Resistente: ";
        pokemonResistant.appendChild(resistantLabel);

        obj.resistant.forEach((type) => {
          const resistantSpan = document.createElement("span");
          resistantSpan.innerText = type;
          resistantSpan.classList.add("resistant-type");
          if (type in typeClasses) {
            resistantSpan.classList.add(typeClasses[type]);
          }
          pokemonResistant.appendChild(resistantSpan);
        });

        const pokemonWeaknesses = document.createElement("div");
        pokemonWeaknesses.classList.add("pokemon-weaknesses");
        
        const weaknessesLabel = document.createElement("span");
        weaknessesLabel.innerText = "Debilidad: ";
        pokemonWeaknesses.appendChild(weaknessesLabel);
        
        obj.weaknesses.forEach((type) => {
          const weaknessesSpan = document.createElement("span");
          weaknessesSpan.innerText = type;
          weaknessesSpan.classList.add("weaknesses-type");
          if (type in typeClasses) {
            weaknessesSpan.classList.add(typeClasses[type]);
          }
          pokemonWeaknesses.appendChild(weaknessesSpan);
        });
        
   
        resetButton.style.display ="block"
        
        pokemonTmp.append(pokemonDescription, pokemonSize, pokemonResistant, pokemonWeaknesses);
        pokemonCard.appendChild(pokemonTmp)  
      }
      
    });
    
    pokemonData.append(pokemonImage, pokemonNum, pokemonName, pokemonType);
    pokemonCard.appendChild(pokemonData)
    return pokemonCard;
  });

};



pokemonsContainer.replaceChildren(...injectPokemons(pokemon));
