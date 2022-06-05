import { MockMethod } from 'vite-plugin-mock'
import { Response } from './helper'

export default [
  {
    url: '/login',
    timeout: 200,
    method: 'post',
    response: () => {
      return Response({
        token: 'eca4bb1529bb5b4dcd3c9aa68e9e185d',
        expire: 1200,
        onLine: true
      })
    }
  }
] as MockMethod[]
