import request from '@/utils/response'

export function getRolePages (data) {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

export function deleteRole (id) {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}

export function saveOrUpdate (data) {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

export function getRole (id) {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}

export function getRoleall () {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

export function setAllocateUserRoles (data) {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}

export function getUserRoles (id) {
  return request({
    method: 'GET',
    url: `/boss/role/user/${id}`
  })
}
