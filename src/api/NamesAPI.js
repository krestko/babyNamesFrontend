const fetchNamesByListID = (listID) => {
  return fetch(`http://localhost:3001/api/v1/lists/${listID}/names`) 
    .then((response) => response.json())
}

const addListName = (listID, nameObject) => {
  return fetch(`http://localhost:3001/api/v1/lists/${listID}/names`, {
    headers: {'content-type': 'application/json'},
    method: "POST",
    mode: "cors",
    body: JSON.stringify(nameObject)
  })
  .then((response) => response.json())
}

export default {
  fetchNamesByListID: fetchNamesByListID,
  addListName: addListName
}