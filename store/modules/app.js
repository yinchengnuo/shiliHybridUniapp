import { _API_AppUpdata } from '@/apis/index.js'
import { updatePopup, getDownload } from '@/utils/APPUPDATA.js'

export default {
	namespaced: true,
	state: {
		version: ''
	},
	mutations: {
		GET_VERSION(state, payload) {
			state.version = payload
		}
	},
	actions: {
		getNowVersion({ state, commit }) {
			plus.runtime.getProperty(plus.runtime.appid, ({ version }) => commit('GET_VERSION', version))
			_API_AppUpdata().then(({ data }) => {
				// console.log(data)
				if (data.version != state.version) {
					updatePopup({ versionName: data.version, versionInfo: data.inf0 }, () => {
						if (uni.getSystemInfoSync().platform == "android") {
							getDownload({ downloadUrl: data.down_url.android })
						} else {
							plus.runtime.openURL(data.down_url.ios);
						}
					})
				} else {
					// updatePopup({ versionName: data.version, versionInfo: data.inf0 }, () => {})
				}
			})
		}
	}
}
