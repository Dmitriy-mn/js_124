import axios from "axios";

import './style.css'

/**
 * Використовуємо https://pokeapi.co/ та створимо сторінку перегляду покемонів
 *
 */

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

const container = document.querySelector(".card-container");
const loader = document.querySelector(".loader");
const searchForm = document.querySelector(".search-form");

searchForm.addEventListener("submit", onSubmit);

async function fetchPokemon(pokemonName) {
    const response = await axios(`${BASE_URL}${pokemonName}`);
    return response.data;
}

async function onSubmit(event) {
    event.preventDefault();
    const searchQuery = event.target.elements.query.value.trim();

    if(!searchQuery.length) {
        alert("Рядок повинен існувати");
        return;
    }

    loader.classList.remove("hidden");

    try {
        const data = await fetchPokemon(searchQuery);
        container.innerHTML = renderCard(data);
    } catch(error) {
        console.log(error);
        onFetchError(error);
    } finally {
        loader.classList.add("hidden");
        event.target.reset();
    }
}

function renderCard({ name, height, weight, sprites, abilities }) {
    const abilitiesList = abilities.map(({ ability }) => `
        <li class="list-group-item">${ability.name}</li>
    `).join("")

    return `
        <div class="card">
            <div class="card-img-top">
                <img src="${sprites.front_default}" alt="${name}"/>
            </div>
            <div class="card-body">
                <h3 class="card-title">Ім'я: ${name}</h3>
                <p class="card-text">Ваша: ${weight}</p>
                <p class="card-text">Зріст: ${height}</p>
            </div>

            <p class="card-text">
                <h4>Вміння:</h4>
                <ul>
                    ${abilitiesList}
                </ul>
            </p>
        </div>
    `
}

function onFetchError(error) {
    alert("Спробуйте інше ім'я");
}








