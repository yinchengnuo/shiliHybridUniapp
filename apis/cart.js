import request from '@/utils/request.js'

export const _API_CartList = data => request.get('/apps.member.cart.get_list', data) // 获取购物车列表

export const _API_CartDel = data => request.get('/apps.member.cart.remove', data) // 删除购物车

export const _API_CartSel = data => request.get('/apps.member.cart.select', data) // 选中购物车

export const _API_CartAdd = data => request.post('/apps.member.cart.add', data) // 加入购物车

export const _API_CartUpdata = data => request.get('/apps.member.cart.update', data) // 修改购物车

export const _API_FavGoods = data => request.get('/apps.member.cart.tofavorite', data) // 收藏商品
