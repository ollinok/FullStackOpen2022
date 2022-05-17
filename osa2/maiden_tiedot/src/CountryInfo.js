import Weather from "./Weather";

const CountryInfo = ({ country }) => {
  const c = country[0];
  return (
    <div>
      <h1>{c.name.common}</h1>
      <p>
        Capital: {c.capital}<br />
        Area: {c.area}
      </p>
      <h2>Languages:</h2>
      <ul>
        {Object.values(c.languages).map(lang =>
            <li key={lang}>{lang}</li>
          )
        }
      </ul>
      <img src={c.flags.png} alt={c.name.common}/>
      <Weather
        capital={c.capital} 
        latlng={c.capitalInfo.latlng}
      />
    </div>
  );
}

export default CountryInfo;