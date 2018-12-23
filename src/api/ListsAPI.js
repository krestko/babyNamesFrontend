const fetchLists = () => {
  // return fetch(`http://localhost:3001/api/v1/lists`) 
  return fetch(`https://baby-names-backend.herokuapp.com/api/v1/lists`) 
    .then((response) => response.json())
    .catch(error => console.log(error))
}

const fetchListByID = (listID) => {
  // return fetch(`http://localhost:3001/api/v1/lists/${listID}`) 
  return fetch(`https://baby-names-backend.herokuapp.com/api/v1/lists/${listID}`) 
    .then((response) => response.json())
    .catch(error => console.log(error))
}

const addList = (listObject) => {
  // return fetch(`http://localhost:3001/api/v1/lists`, {
  return fetch(`https://baby-names-backend.herokuapp.com/api/v1/lists`, {
    headers: {'content-type': 'application/json'},
    method: "POST",
    mode: "cors",
    body: JSON.stringify(listObject)
  })
  .then((response) => response.json())
  .catch(error => console.log(error))
}

export default {
  fetchLists: fetchLists,
  fetchListByID: fetchListByID,
  addList: addList
}