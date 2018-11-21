import axios from 'axios'
import _ from 'lodash'
import interceptorsSetup from './interceptors'

interceptorsSetup()

export default class Favoritos {
  static create(id) {
    return axios({
      method: 'POST',
      url: `http://localhost:8006/api/v1/favoritos/${id}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  static all(queryParams) {
    return axios({
      method: 'GET',
      url: `http://localhost:8006/api/v1/favoritos${this.getQueryParams(queryParams)}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.data.data)
  }

  static delete(id) {
    return axios({
      method: 'DELETE',
      url: `http://localhost:8006/api/v1/favoritos/${id}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  static getQueryParams(queryParams) {
    if (_.isObject(queryParams) && _.size(_.keys(queryParams)) > 0) {
      let query = '?'
      _.forEach(queryParams, (value, key) => {
        query = query.concat(`${key}=${value}&`)
      })
      return query.slice(0, -1)
    }
    return ''
  }
}
