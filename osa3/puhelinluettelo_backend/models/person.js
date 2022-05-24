const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI;

console.log('Connecting to database...');
mongoose.connect(url)
  .then(() => {
    console.log('Successfully connected to the database.');
  })
  .catch((error) => {
    console.log('Failed to connect to the database:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name must be atleast 3 characters long.'],
    required: [true, 'A name is required.']
  },
  number: {
    type: String,
    minlength: [8, 'Number must be atleast 8 characters long.'],
    validate: {
      validator: function(x) {
        return /^\d{2,3}-\d+$/.test(x);
      },
      message: err => `${err.value} is not a valid phone number.`
    },
    required: [true, 'A number is required.']
  }
});
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);