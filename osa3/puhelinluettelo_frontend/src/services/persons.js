import axios from "axios";
const baseUrl = '/api/persons';

const getAll = () => (
  axios
    .get(baseUrl)
    .then(response => {
      return response.data})
)

const addNew = (personObj) => (
  axios
    .post(baseUrl, personObj)
    .then(response => response.data)
)

const remove = (id) => (
  axios
    .delete(`${baseUrl}/${id}`)
    .then(response => response)
)

const update = (id, personObj) => (
  axios
    .put(`${baseUrl}/${id}`, personObj)
    .then(response => response.data)
)

const objects = { getAll, addNew, remove, update }

export default objects;