import request from '@/utils/request.js'

export const _API_GetGoodList = data => request.get('/apps.goods.get_list', data) // 获取商品列表
export const _API_GetBrandGoodList = data => request.get('/diypage.getInfo', data) // 获取品牌商品列表

export const _API_GetGoodDetail = data => request.get('/apps.goods.detail', data) // 获取商品详情

export const _API_GetGoodExpress = data => request.get('/apps.index.deppon_freight_new_new', data) // 获取商品物流信息

export const _API_GetGoodSelect = data => request.get('/apps.goods.picker', data) // 挑选商品
