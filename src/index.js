import './style.scss';
import { debounce } from './utils'
import axios from 'axios';

const fetchData = async (searchTerm) => {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: 'a36d9753',
            s: searchTerm
        }
    });

    if (response.data.Error) {
        return [];
    }

    return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;


const search = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async event => {
    const movies = await fetchData(event.target.value);
    resultsWrapper.innerHTML = '';
    console.log(movies);
    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const option = document.createElement('a');
        const srcImg = movie.Poster === 'N/A' ? '' : movie.Poster;
        option.classList.add('dropdown-item');
        option.innerHTML = `
            <img src="${srcImg}" alt=""/>
            ${movie.Title}
        `;
        resultsWrapper.appendChild(option);
    }

}
search.addEventListener('input', debounce(onInput));