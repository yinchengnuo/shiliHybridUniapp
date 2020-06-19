import Vue from 'vue'
import $store from '@/store'
import $storage from '@/utils/uni_storage'
import { _API_GetUserInfo } from '@/apis/user.js'

export default {
	namespaced: true,
	state: {
		webview: null,
		userinfo: {}
	},
	mutations: {
		GET_USERINFO(state, payload) {
			state.userinfo = { ...payload, ...payload.commission }
		},
		LOGOUT(state) {
			state.userinfo = {}
			Object.keys($storage).forEach(key => delete $storage[key])
		}
	},
	actions: {
		getUserInfo({ state, commit }) {
			return new Promise(resolve => {
				_API_GetUserInfo({ uniacid: 13, mid: $storage.id, parent_id: $storage.agentid }).then(({ data }) => {
					commit('GET_USERINFO', data)
					$store.dispatch('address/getAddress')
					resolve(data)
					// #ifdef APP-PLUS
						plus.webview.prefetchURL(`https://dami.jinjiwu.cn/app/index.php?i=13&c=entry&m=ewei_shopv2&do=mobile&r=membercard.index&mid=${state.userinfo.id}&t=1`)
					// #endif
					
				}).catch(e => console.log(e))
			})
		}
	}
}
