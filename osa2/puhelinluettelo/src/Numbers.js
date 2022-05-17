const Entry = ({ person, removePerson }) => {
  return (
    <>
      <p>
        {person.name} {person.number}
        <button onClick={removePerson}>Delete</button>
      </p>
      
    </>
  );
}

const Numbers = (props) => {
  return (
      <div>
        {props.persons.map((person) =>
          <Entry 
            key={person.id}
            person={person}
            removePerson={() => props.removePerson(person.id, person.name)}
          />
        )}
      </div>
  );
}

export default Numbers;