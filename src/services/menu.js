import requset from '@/utils/response'

export function getAllMenu () {
  return requset({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export function getParentMenu (id = -1) {
  return requset({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

export function createOrEditMenu (data) {
  return requset({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export function deleteMenu (id) {
  return requset({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}

export function editMenuPage (id) {
  return requset({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}
