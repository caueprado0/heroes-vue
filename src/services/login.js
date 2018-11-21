import axios from 'axios'

const login = (email, password) => {
  const payload = JSON.stringify({
    email,
    password
  })

  return axios({
    method: 'POST',
    url: 'http://localhost:8006/api/v1/auth/login',
    data: payload,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}



export default login
