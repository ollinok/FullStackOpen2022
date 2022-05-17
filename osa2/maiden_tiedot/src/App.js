import { useEffect, useState } from 'react';
import axios from 'axios';

import Search from './Search';
import Content from './Content';

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const helpText = () => {
    let text = 'Enter your search criteria above.'
    if (filterCountries.length === 0 && search !== ''){
      text = 'No matches.'
    } 
    else if ( filterCountries.length > 10 && search !== '') {
      text = 'Too many matches. Please specify your search.';
    } 
    return text;
  }

  const filterCountries = allCountries.filter(country =>
    country.name.common.toLowerCase().trim()
      .includes(search.toLowerCase().trim())
  );

  const showList = filterCountries.length <= 10 && filterCountries.length > 1 ? true : false;
  const matchFound = filterCountries.length === 1 ? true : false;

  return (
    <div>
      <Search search={search} handlesearch={handleSearch} />
      <Content 
        countries={filterCountries}
        showlist={showList}
        matchfound={matchFound}
        helptext={helpText()}
        listbutton={(country) => setSearch(country)}
      />
    </div>
  );
}

export default App;
