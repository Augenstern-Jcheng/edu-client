import requset from '@/utils/response'

// 获取所有广告
export function getAlldList () {
  return requset({
    method: 'GET',
    url: '/front/ad/getAdList'
  })
}
// 更新广告状态/front/ad/updateStatus
export function updateStatus (params) {
  return requset({
    method: 'GET',
    url: '/front/ad/updateStatus',
    params
  })
}
// 获取所有广告位
export function getAllSpaces () {
  return requset({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces'
  })
}
// 保存/更新广告
export function saveOrUpdateAdvert (data) {
  return requset({
    method: 'POST',
    url: '/front/ad/saveOrUpdate',
    data
  })
}
// 保存/更新广告位
export function saveOrUpdateAdvertSpace (data) {
  return requset({
    method: 'POST',
    url: '/front/ad/space/saveOrUpdate',
    data
  })
}

// 根据id获取广告位
export function getSpaceById (id) {
  return requset({
    method: 'GET',
    url: '/front/ad/space/getSpaceById',
    params: {
      id
    }
  })
}
// 根据id获取广告
export function getAdById (id) {
  return requset({
    method: 'GET',
    url: '/front/ad/getAdById',
    params: {
      id
    }
  })
}
