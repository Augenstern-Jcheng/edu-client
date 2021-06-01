import requset from '@/utils/response'

export function getResourceCategory () {
  return requset({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

export function getResourcePages (data) {
  return requset({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export function deleteResourcePages (id) {
  return requset({
    method: 'Delete',
    url: `/boss/resource/${id}`
  })
}

export function saveOrUpdate (data) {
  return requset({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}
// 根据资源id获取资源信息
export function getResourceById (id) {
  return requset({
    method: 'GET',
    url: `/boss/resource/${id}`
  })
}
// 获取所有资源
export function getAllResource () {
  return requset({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}
// 获取资源分类
export function getAllcategory () {
  return requset({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
// 根据roleId获取资源信息
export function getRoleResources (roleId) {
  return requset({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId
    }
  })
}
// 根据roleId分配资源
export function setAllocateRoleResources (data) {
  return requset({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}
