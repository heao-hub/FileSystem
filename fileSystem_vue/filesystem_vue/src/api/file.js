import request from './request'

// 查询文件列表
export function getFileList(params) {
  return request({
    url: '/file',
    method: 'get',
    params
  })
}

// 上传文件
export function uploadFile(formData) {
  return request({
    url: '/file',
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// 下载文件
export function downloadFile(formData) {
  return request({
    url: '/download',
    method: 'get',
    formData
    //headers: { 'Content-Type': 'multipart/form-data' }
  })
}
