require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

app.use(express.static('build'));
app.use(cors());
app.use(express.json());

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

/*
* ENDPOINTS
*/

app.get('/info', (req, res, next) => {
  Person.estimatedDocumentCount()
    .then(result => {
      console.log(result);
      const listLength = result;
      const timestamp = new Date();
      res.send(
        `<p>Phonebook has info for ${listLength} people.</p>
        <p>${timestamp}</p>`
      );
    }).catch(err => next(err));
});

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(result => {
    res.json(result);
  }).catch(err => next(err));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(result => {
    res.json(result);
  }).catch(err => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  const person = new Person({
    name: name,
    number: number
  });

  person.save().then(result => {
    res.json(result);
  }).catch(err => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(result => {
      if (!result) {
        res.status(404).end();
      } else {
        res.json(result);
      }
    }).catch(err => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id).then(() => {
    res.status(204).end();
  }).catch(err => next(err));
});

/*
* /ENDPOINTS
*/

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' });
  } else if (err.name === 'ValidationError') {
    if (err.errors.number) {
      return res.status(400).send({ error: err.errors.number.message });
    } else if (err.errors.name) {
      return res.status(400).send({ error: err.errors.name.message });
    }
  }
  next(err);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
