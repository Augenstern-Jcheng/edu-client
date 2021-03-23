// 用户接口请求
import request from '@/utils/response'
import qs from 'qs'

export function userLogin (data) {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}

export function getUserInfo () {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}
