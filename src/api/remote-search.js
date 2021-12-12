import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/user/name',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/vue-element-admin/transaction/list',
    method: 'get',
    params: query
  })
}
