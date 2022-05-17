const Search = ({ search, handlesearch }) => {
  return (
    <div>
      Find country: <input value={search} onChange={handlesearch} />
    </div>
  );
}

export default Search;