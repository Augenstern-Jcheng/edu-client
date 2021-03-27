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

export function getUserPages (data) {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}
// 启用用户
export function setEnableUser (userId) {
  return request({
    method: 'GET',
    url: '/boss/user/enableUser',
    params: {
      userId
    }
  })
}

// 禁用用户
export function setForbidUser (data) {
  return request({
    method: 'POST',
    url: '/boss/user/forbidUser',
    data
  })
}
