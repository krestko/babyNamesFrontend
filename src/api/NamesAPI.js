const fetchNamesByListID = (listID) => {
  // return fetch(`http://localhost:3001/api/v1/lists/${listID}/names`) 
  return fetch(`https://baby-names-backend.herokuapp.com/api/v1/lists/${listID}/names`) 
    .then((response) => response.json())
    .catch(error => console.log(error))
}

const addListName = (listID, nameObject) => {
  // return fetch(`http://localhost:3001/api/v1/lists/${listID}/names`, {
  return fetch(`https://baby-names-backend.herokuapp.com/api/v1/lists/${listID}/names`, {
    headers: {'content-type': 'application/json'},
    method: "POST",
    mode: "cors",
    body: JSON.stringify(nameObject)
  })
  .then((response) => response.json())
  .catch(error => console.log(error))
}

const updateName = (listID, nameID, nameObject) => {
  // return fetch(`http://localhost:3001/api/v1/lists/${listID}/names/${nameID}`, {
  return fetch(`https://baby-names-backend.herokuapp.com/api/v1/lists/${listID}/names/${nameID}`, {
    headers: {'content-type': 'application/json'},
    method: "PATCH",
    mode: "cors",
    body: JSON.stringify(nameObject)
  })
  .then((response) => response.json())
  .catch(error => console.log(error))
}

export default {
  fetchNamesByListID: fetchNamesByListID,
  addListName: addListName,
  updateName: updateName
}