const CountryItem = ({ name, listbutton }) => (
    <p>{name} <button onClick={() => listbutton(name)}>Show</button></p>
);

const CountryList = ({ showlist, countries, helptext, listbutton }) => {
  return (
    <div>
      {showlist ?
        countries.map(country =>
          <CountryItem 
            key={country.name.common}
            name={country.name.common}
            listbutton={listbutton}
          />
        )
        : 
        <p>{helptext}</p>
      }
    </div>
  );
}

export default CountryList;