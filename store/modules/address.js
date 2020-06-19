import Vue from 'vue'
import $storage from '@/utils/uni_storage'
import { _API_GetAddress } from '@/apis/address.js'

export default {
	namespaced: true,
	state: {
		address: []
	},
	mutations: {
		GET_ADDRESS(state, payload) {
			state.address = payload
		}
	},
	actions: {
		getAddress({ commit }) {
			return new Promise(resolve => {
				_API_GetAddress().then(({ data }) => {
					commit('GET_ADDRESS', data)
					resolve(data)
				}).catch(e => console.log(e))
			})
		}
	}
}
