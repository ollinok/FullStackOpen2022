const mongoose = require('mongoose');

const arglength = process.argv.length;
if (arglength !== 3 && arglength !== 5) {
  console.log('Acceptable commands:');
  console.log('- node mongo PASSWORD "FIRSTNAME LASTNAME" NUMBER');
  console.log('- node mongo PASSWORD');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3] ? process.argv[3] : '';
const number = process.argv[4] ? process.argv[4] : '';

const url = `mongodb+srv://ollinok:${password}@cluster0.3rd5h.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`;
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});
const Person = mongoose.model('Person', personSchema);

if (name && number) {
  const person = new Person({
    name: name,
    number: number
  });

  person.save().then(() => {
    console.log(`Added "${name}" with number "${number}" to phonebook.`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then(result => {
    console.log('Phonebook:');
    result.forEach(p => {
      console.log(`${p.name} ${p.number}`);
    });
    console.log('closing...');
    mongoose.connection.close();
  });
}