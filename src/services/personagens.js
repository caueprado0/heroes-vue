import axios from 'axios'
import _ from 'lodash'
import interceptorsSetup from './interceptors'

interceptorsSetup()

export default class Personagens {
  static all(queryParams) {
    return axios({
      method: 'GET',
      url: `http://localhost:8006/api/v1/personagem${this.getQueryParams(queryParams)}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.data.data)
  }

  static id(id, queryParams) {
    return axios({
      method: 'GET',
      url: `http://localhost:8006/api/v1/personagem/${id}${this.getQueryParams(queryParams)}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response.data.data)
        return response.data
      })
  }

  static getQueryParams(queryParams) {
    if (_.isObject(queryParams) && _.size(_.keys(queryParams)) > 0) {
      const query = '?'
      _.forEach(queryParams, (value, key) => {
        query.concat(`${key}=${value}&`)
      })
      return query.slice(0, -1)
    }
    return ''
  }
}
