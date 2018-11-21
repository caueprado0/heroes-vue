import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import Jwt from '../services/jwt-token'
import Personagens from '../services/personagens'

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
  },
  personagens(state, data) {
    state.personagens.personagens = data
  },

  personagensOffset(state, data) {
    state.personagens.offset = data
  },

  personagensLimit(state, data) {
    state.personagens.limit = data
  },

  personagensTotal(state, data) {
    state.personagens.total = data
  }
}

const state = {
  auth: {
    logged: !_.isNull(Jwt.token)
  },
  personagens: {
    personagens: [],
    offset: 0,
    limit: null,
    total: null
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
  },
  personagens(context, params = {}) {
    Personagens.all(params)
      .then((response) => {
        const data = _.has(response, 'results') && _.isArray(response.results) ? response.results : []
        context.commit('personagens', data)
        return response
      })
      .then((response) => {
        const data = _.has(response, 'offset') && _.isNumber(response.offset) ? response.offset : null
        context.commit('personagensOffset', data)
        return response
      })
      .then((response) => {
        const data = _.has(response, 'limit') && _.isNumber(response.limit) ? response.limit : null
        context.commit('personagensLimit', data)
        return response
      })
      .then((response) => {
        const data = _.has(response, 'total') && _.isNumber(response.total) ? response.total : null
        context.commit('personagensTotal', data)
        return response
      })
  },

  personagensShow(context, {
    id
  }) {
    Personagens.id(id)
      .then((response) => {
        context.commit('personagens', response)
      })
  }

}



export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
