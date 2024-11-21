const searchInput = document.getElementById("pokemonSearch");
const searchButton = document.getElementById("searchButton");
const pokemonCard = document.getElementById("pokemonCard");
const warningMessage = document.getElementById("warningMessage");

// Function to fetch Pokémon data
const fetchPokemon = (query) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      return response.json();
    })
    .then((data) => {
      displayPokemon(data);
      warningMessage.textContent = ""; // Clear any previous warnings
    })
    .catch((error) => {
      pokemonCard.style.display = "none";
      warningMessage.textContent = error.message; // Display the error message
    });
};

// Function to display Pokémon data
const displayPokemon = (pokemon) => {
  pokemonCard.style.display = "block";
  pokemonCard.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <h2>${pokemon.name.toUpperCase()}</h2>
    <h3>Stats:</h3>
    <ul>
      ${pokemon.stats
        .map(
          (stat) =>
            `<li>${stat.stat.name}: ${stat.base_stat}</li>`
        )
        .join("")}
    </ul>
    <h3>Abilities:</h3>
    <ul>
      ${pokemon.abilities
        .map(
          (ability) =>
            `<li>${ability.ability.name}</li>`
        )
        .join("")}
    </ul>
  `;
};

// Event listener for the search button
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) {
    warningMessage.textContent = "Please enter a Pokémon name or ID!";
    pokemonCard.style.display = "none";
    return;
  }
  fetchPokemon(query);
});
