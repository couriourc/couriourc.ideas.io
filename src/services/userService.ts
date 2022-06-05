import http from './index'

/**
 * @description - User Service
 * @author couriourc
 * */
export function postLogin() {
  return http.post('/login', {})
}
