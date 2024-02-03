const input = document.getElementById("search-input");
const form = document.getElementById("pokeSearch");
const card = document.querySelector(".card");
const picture = document.getElementById("sprite");
const pokeName = document.getElementById("pokemon-name");
const id = document.getElementById("pokemon-id");
const type = document.getElementById("types");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const updateUI = (data) => {
  type.innerHTML = ``;
  picture.setAttribute("src", data.sprites.front_default);
  pokeName.textContent = data.name;
  id.textContent = `#${data.id}`;
  weight.textContent = `weight: ${data.weight}`;
  height.textContent = `height: ${data.height}`;
  for (let i = 0; i < data.types.length; i++) {
    type.innerHTML += `
    <p class="type ${data.types[i].type.name}">${data.types[i].type.name}</p>`;
  }
  hp.textContent = data.stats[0].base_stat;
  attack.textContent = data.stats[1].base_stat;
  defense.textContent = data.stats[2].base_stat;
  specialAttack.textContent = data.stats[3].base_stat;
  specialDefense.textContent = data.stats[4].base_stat;
  speed.textContent = data.stats[5].base_stat;

  card.classList.remove("d-none");
};

const getData = async () => {
  const base = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
  const query = `${input.value.toLowerCase()}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getData()
    .then((data) => {
      updateUI(data);
    })
    .catch((error) => {
      card.classList.add("d-none");
      form.reset();
      alert("Pokémon not found");
    });
});
