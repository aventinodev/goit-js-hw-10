import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
  searchCountry: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};

refs.searchCountry.addEventListener(
  'input',
  debounce(onGetCountry, DEBOUNCE_DELAY)
);

function onGetCountry(e) {
  let countryName = e.target.value.trim();
  if (countryName === '') {
    return (refs.list.innerHTML = ''), (refs.div.innerHTML = '');
  }
  fetchCountries(countryName)
    .then(data => {
      refs.div.innerHTML = '';
      refs.list.innerHTML = '';
      if (data.length > 10) {
        onWorn();
      } else if (data.length === 1) {
        getCountriesListMarkup(data);
        getCountryInfoMarkup(data);
      } else {
        getCountriesListMarkup(data);
      }
    })
    .catch(error => {
      onError();
    });
}

function getCountryTemplate(countries) {
  return `<li class="country-item">
        <img src="${countries.flags.svg}" alt="Flag of ${countries.name.official}" width="40" height ="40"/>
        <p class = "country-name">${countries.name.official}</p>
      </li>`;
}
function getCountriesListMarkup(countries) {
  const list = countries.map(getCountryTemplate).join('');
  refs.list.insertAdjacentHTML('beforeend', list);
}
function getCountryInfoTemplate(countries) {
  return `<p class="country-capital"><b>Capital:</b> ${countries.capital}</p>
      <p class="country-population"><b>Population:</b> ${
        countries.population
      }</p>
      <p class="country-languages"><b>Languages:</b> ${Object.values(
        countries.languages
      ).join(', ')}</p>`;
}
function getCountryInfoMarkup(countries) {
  const info = countries.map(getCountryInfoTemplate).join('');
  refs.div.insertAdjacentHTML('beforeend', info);
}
function onWorn() {
  Notify.info('Too many matches found. Please enter a more specific name');
}
function onError() {
  Notify.failure('Oops, there is no country with that name');
}
