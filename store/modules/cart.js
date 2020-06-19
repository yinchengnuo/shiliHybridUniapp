import Vue from 'vue'
import { _API_CartList } from '@/apis/cart.js'

export default {
	namespaced: true,
	state: {
		ischeckall: false,
		list: [],
		merch: [],
		total: 0,
		merch_user: [],
		totalprice: 0
	},
	mutations: {
		GET_CART(state, payload) {
			Object.assign(state, payload)
			state.total ? uni.setTabBarBadge({ index: 2, text: state.total.toString() }) : uni.removeTabBarBadge({ index: 2 })
			
		}
	},
	actions: {
		getCart({ commit }) {
			return new Promise(resolve => {
				_API_CartList().then(({ data }) => {
					commit('GET_CART', data)
					resolve(data)
				})
			})
		}
	}
}
