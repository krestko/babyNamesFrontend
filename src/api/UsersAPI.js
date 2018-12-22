const fetchUsers = () => {
  return fetch(`http://localhost:3001/api/v1/users`)
  // return fetch(`https://baby-names-backend.herokuapp.com/api/v1/users`) 
    .then((response) => response.json())
    .catch(error => console.log(error))
}

const fetchUserByID = (userID) => {
  return fetch(`http://localhost:3001/api/v1/users/${userID}`)
  // return fetch(`https://baby-names-backend.herokuapp.com/api/v1/users/${userID}`) 
    .then((response) => response.json())
    .catch(error => console.log(error))
}

const updateUserData = (userID, userObject) => {
  return fetch(`http://localhost:3001/api/v1/users/${userID}`,
  // return fetch(`https://baby-names-backend.herokuapp.com/api/v1/users/${userID}`,
  {
    headers: {'content-type': 'application/json'},
    method: "PATCH",
    mode: "cors",
    body: JSON.stringify(userObject)
  })
  .then((response) => response.json())
  .catch(error => console.log(error))
}

export default {
  fetchUsers: fetchUsers,
  fetchUserByID: fetchUserByID,
  updateUserData: updateUserData
}