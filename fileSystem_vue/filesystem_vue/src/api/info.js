import request from './request'
// 查询个人信息
export function getInfo() {
  return request({
    url: '/info',
    method: 'get'
  })
}

// 修改个人信息
export function updateInfo(data) {
  return request({
    url: '/info',
    method: 'put',
    data
  })
}
