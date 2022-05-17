const Search = ({ search, handlesearch }) => {
  return (
    <div>
      Search by name: <input value={search} onChange={handlesearch}/>
    </div>
  );
}

export default Search;