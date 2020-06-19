import qs from 'qs'
import $store from '@/store'
import $storage from '@/utils/uni_storage'
import uni_request from './uni_request.js'

export const baseURL = 'https://dami.jinjiwu.cn/app/index.php?i=13&c=entry&m=ewei_shopv2&do=mobile&r='

const request = uni_request({ baseURL })

request.interceptors.request.use((config, method) => {
	config.body.openid = $storage.openid
	if (method == 'POST') {
		config.header['Content-Type'] = 'application/x-www-form-urlencoded'
	}
	return config
})

request.interceptors.response.use(async (response, ...args) => {
	// console.log(response, args)
	if (response.statusCode === 200) {
		// ...
	} else if (response.statusCode === 401) {
		// ...
	} else {
		// ...
	}
	return response
})

request.onerror = e => console.log(e)

export default request