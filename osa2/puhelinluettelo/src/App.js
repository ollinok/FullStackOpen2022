import { useEffect, useState } from 'react';

import personService from './services/persons';

import Numbers from './Numbers';
import Search from './Search';
import AddForm from './AddForm';
import Notification from './Notification';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState({message:null,success:true});

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response);
      });
  }, []);

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  }
  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  }
  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  }

  // Lowercase & Trim util
  const lowTrim = (str) => (str.toLowerCase().trim());

  const addNewPerson = (e) => {
    e.preventDefault();
    const personExists = persons.some(p => lowTrim(p.name) === lowTrim(newName));
    if (!personExists) {
      const personObj = { 
        name: newName.trim(),
        number: newNumber.trim()
      };
      personService
        .addNew(personObj)
        .then(response => {
          setPersons(persons.concat(response));
          notificationHandler(`Added ${personObj.name}`, true);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          notificationHandler('Failed to make a request to the server', false);
        });
    } else {
      const person = persons.find(p => lowTrim(p.name) === lowTrim(newName));
      const promptText = `${person.name} already exists in the phonebook. Replace the old number with a new one?`;
      if (window.confirm(promptText)) {
        updateNumber(person);
      }
    }
  }

  const updateNumber = (person) => {
    const updatedPerson = { ...person, number: newNumber};

    personService
      .update(person.id, updatedPerson)
      .then(response => {
        setPersons(persons.map(p => p.id !== person.id ? p : response));
        notificationHandler(`Updated number for ${updatedPerson.name}`, true);
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        if (error.response.status === 404) {
          notificationHandler('Entry has been already deleted from the server', false);
          setPersons(persons.filter(p => p.id !== person.id));
        } else {
          notificationHandler('Failed to make a request to the server', false);
        }
      });
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id));
          notificationHandler(`Removed ${name}`, true);
        })
        .catch(error => {
          if (error.response.status === 404) {
            notificationHandler('Entry has been already deleted from the server', false);
            setPersons(persons.filter(p => p.id !== id));
          } else {
            notificationHandler('Failed to make a request to the server', false);
          }
        });
    }
  }

  const notificationHandler = (msg, success) => {
    setNotification({message:msg, success:success});
    setTimeout(() => {
      setNotification({...notification, message:null});
    }, 3000);
  }
  
  const namesToShow = persons.filter(person =>
      lowTrim(person.name).includes(lowTrim(search))
    );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification 
        message={notification.message}
        success={notification.success} 
      />
      <Search search={search} handlesearch={handleSearchInput}/>
      <h2>Add new contact</h2>
      <AddForm 
        addnew={addNewPerson}
        namevalue={newName}
        handlename={handleNameInput}
        numbervalue={newNumber}
        handlenumber={handleNumberInput}
      />
      <h2>Numbers</h2>
      <Numbers 
        persons={namesToShow}
        removePerson={(id, name) => removePerson(id, name)}
      />
    </div>
  );
}

export default App;
