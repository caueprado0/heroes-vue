import axios from 'axios'
import Jwt from './jwt-token'

export default function setup() {
  axios.interceptors.request.use((config) => {
    if (Jwt.token != null) {
      config.headers.Authorization = Jwt.getAuthorizationHeader()
    }
    return config
  }, (err) => Promise.reject(err))
}
