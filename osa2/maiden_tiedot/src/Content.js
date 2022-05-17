import CountryList from './CountryList';
import CountryInfo from './CountryInfo';

const Content = (props) => {
  return (
    <>
      {props.matchfound ?
        <CountryInfo country={props.countries} />
        :
        <CountryList 
          showlist={props.showlist} 
          countries={props.countries}
          helptext={props.helptext}
          listbutton={props.listbutton}
        />
      }     
    </>
  );
}

export default Content;