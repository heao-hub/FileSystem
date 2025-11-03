import request from './request'

// 分页查询用户
export function getUserList(params) {
  return request({
    url: '/users',
    method: 'get',
    params
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/users',
    method: 'put',
    data
  })
}

// 删除用户（支持批量）
export function deleteUser(ids) {
  return request({
    url: `/users/${ids}`,
    method: 'delete'
  })
}
