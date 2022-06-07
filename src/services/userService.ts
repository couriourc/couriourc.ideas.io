import http from './index'

/**
 * @description - User Service
 * @author couriourc
 * */

/**
 * @param { string } name - username
 *
 *
 * */
export function postLogin({ name }) {
  return http.post('/login', {
    name
  })
}
