import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const notify = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p =>
              p.id !== existingPerson.id ? p : returnedPerson
            ));
            notify(`Updated ${returnedPerson.name}`);
            setNewName("");
            setNewNumber("");
          })
          .catch(error => {
            notify(
              `Information of ${existingPerson.name} has already been removed from server`,
              "error"
            );
            setPersons(persons.filter(p => p.id !== existingPerson.id));
          });
      }
      return;
    }

    const newPersonObj = { name: newName, number: newNumber };
    personService
      .create(newPersonObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        notify(`Added ${returnedPerson.name}`);
        setNewName("");
        setNewNumber("");
      })
      .catch(error => {
        notify("Failed to add person", "error");
      });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          notify(`Deleted ${name}`);
        })
        .catch(error => {
          notify(
            `Information of ${name} has already been removed from server`,
            "error"
          );
          setPersons(persons.filter(p => p.id !== id));
        });
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const personsToShow = filter
    ? persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />

      <Footer />
    </div>
  );
};

export default App;
