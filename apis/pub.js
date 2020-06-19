import request from '@/utils/request.js'

export const _API_UploadImg = data => request.uploadFile('/apps.util.uploader', data) // 上传图片

