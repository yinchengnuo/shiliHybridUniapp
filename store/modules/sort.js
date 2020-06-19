import Vue from 'vue'
import { _API_SortList } from '@/apis/index.js'

export default {
	namespaced: true,
	state: {
		list: []
	},
	mutations: {
		GET_SORTLIST(state, payload) {
			state.list = payload
		}
	},
	actions: {
		getSortList({ commit }) {
			return new Promise(resolve => {
				_API_SortList().then(({ data: { category }}) => {
					commit('GET_SORTLIST', category)
					resolve(category)
				})
			})
		}
	}
}
