import _ from 'lodash'
import SessionStorage from './session-storage'
import Login from './login'

export default {
  get token() {
    const tokenObject = SessionStorage.getObject('token')
    if (_.has(tokenObject, 'access_token') && !_.isEmpty(tokenObject.access_token)) {
      return tokenObject.access_token
    }
    return null
  },

  set token(value) {
    return SessionStorage.setObject('token', value)
  },

  get tokenType() {
    const tokenObject = SessionStorage.getObject('token')
    if (_.has(tokenObject, 'token_type') && !_.isEmpty(tokenObject.token_type)) {
      return tokenObject.token_type
    }
    return 'Bearer'
  },

  login(email, password) {
    return Login(email, password)
      .then((response) => {
        if (_.has(response, 'data.data') && _.isObject(response.data.data)) {
          this.token = response.data.data
          return this.getAuthorizationHeader()
        }
        return null
      })
  },

  logout() {
    return new Promise((resolve) => {
      resolve(() => {
        SessionStorage.remove('token')
        this.token = null
      })
    })
  },

  getAuthorizationHeader() {
    return `${this.tokenType} ${this.token}`
  }
}
