const fetchUsers = () => {
  return fetch(`https://baby-names-backend.herokuapp.com/api/v1/users`) 
    .then((response) => response.json())
}

const fetchUserByID = (userID) => {
  return fetch(`https://baby-names-backend.herokuapp.com/api/v1/users/${userID}`) 
    .then((response) => response.json())
}

const updateUserData = (userID, userObject) => {
  return fetch(`https://baby-names-backend.herokuapp.com/api/v1/users/${userID}`,
  {
    headers: {'content-type': 'application/json'},
    method: "PATCH",
    mode: "cors",
    body: JSON.stringify(userObject)
  })
  .then((response) => response.json())
}

export default {
  fetchUsers: fetchUsers,
  fetchUserByID: fetchUserByID,
  updateUserData: updateUserData
}