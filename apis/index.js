import request from '@/utils/request.js'

export const _API_AppUpdata = data => request.get('/apps.index.version', data) // APP检查更新

export const _API_IndexBanner = data => request.get('/apps.goods.index.getIndex', data) // 首页Banner图
export const _API_IndexGoodList = data => request.get('/apps.goods.get_list', data) // 首页商品列表

export const _API_SortList = data => request.get('/apps.shop.category', data) // 分类列表
