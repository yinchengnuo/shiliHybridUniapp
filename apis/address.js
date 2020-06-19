import request from '@/utils/request.js'

export const _API_GetAddress = data => request.get('/apps.member.address', data) // 获取地址列表

export const _API_SetAddressDefault = data => request.post('/apps.member.address', data) // 设置默认地址

export const _API_DelAddress = data => request.get('/apps.member.address.delete', data) // 地址删除

export const _API_AddAddress = data => request.post('/apps.member.address.submit', data) // 地址的添加/修改
