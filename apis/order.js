import request from '@/utils/request.js'

export const _API_ReComputeOrder2 = (data) => request.get('/apps.order.create', data) // 重新计算运费

export const _API_BuyNow = data => request.post('/apps.order.create.main', data) // 购物车/商品详情结算
export const _API_ReComputeOrder = data => request.post('/apps.order.create.caculate', data) // 重新计算运费

export const _API_ComfirmOrderSubmit = data => request.post('/apps.order.create.submit', data) // 确认订单立即支付





