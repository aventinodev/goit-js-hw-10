const URL = 'https://restcountries.com/v3.1';

function fetchCountries(name) {
  // https://restcountries.com/v2/{service}?fields={field},{field},{field}

  const urlCountry = `${URL}/name/${name}?fields=name,capital,population,flags,languages`;

  return fetch(urlCountry)
    .then(response => response.json())
    .catch(error => console.log(error));
}
export { fetchCountries };
