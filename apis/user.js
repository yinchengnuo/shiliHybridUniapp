import request from '@/utils/request.js'

export const _API_GetUserInfo = data => request.get('/apps.member.info.getMyInfo', data) // 获取用户信息

export const _API_GetUserBalance = data => request.post('/apps.member.log.get_list', data) // 获取用户充值记录列表

export const _API_UserRecharge = data => request.post('/apps.member.recharge.submit', data) // 用户充值
export const _API_UserWithDraw = data => request.post('/apps.member.withdraw.submit', data) // 用户提现

export const _API_GetUserQrCode = data => request.post('/apps.member.getQrCode', data) // 获取邀请二维码

export const _API_UserSetInfo = data => request.post('/apps.member.info.setInfo', data) // 用户修改信息

