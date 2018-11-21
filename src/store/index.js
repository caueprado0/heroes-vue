import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import Jwt from '../services/jwt-token'


Vue.use(Vuex)

const getters = {

}

const mutations = {
  authenticated(state) {
    state.auth.logged = true
  },
  unauthenticated(state) {
    Jwt.logout()
      .then(() => {
        state.auth.logged = false
      })
      .catch(() => {
        state.auth.logged = false
      })
  }
}

const state = {
  auth: {
    logged: !_.isNull(Jwt.token)
  }
}

const actions = {
  login(context, {
    email,
    password
  }) {
    return Jwt.login(email, password)
      .then((response) => {
        if (!_.isNull(response) && !_.isUndefined(response)) {
          context.commit('authenticated')
        }
        return response
      })
  }
}



export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
