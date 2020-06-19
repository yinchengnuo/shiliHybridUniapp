import request from '@/utils/request.js'

export const _API_GetPayOrder = data => request.post('/apps.order.pay', data) // 收银台获取订单号

export const _API_Pay = data => request.post('/apps.order.pay.complete', data) // 余额支付
export const _API_AliPay = data => request.post('/apps.order.pay.paybyali', data) // 支付宝支付
export const _API_WxPay = data => request.post('/apps.order.pay.paybyali', data) // 微信支付

export const _API_PayCheck = data => request.post('/apps.order.pay.check', data) // 支付检查

// apps.order.pay.complete