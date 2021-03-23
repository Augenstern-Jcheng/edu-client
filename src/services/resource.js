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
