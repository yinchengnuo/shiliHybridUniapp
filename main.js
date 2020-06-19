import Vue from 'vue'
import App from './App'
import $store from '@/store'
import $storage from '@/utils/uni_storage'
import { baseURL } from '@/utils/request.js'
import * as filters from '@/utils/filters.js'
import router, { route } from '@/utils/uni_router.js'
import GoodItem from '@/components/good-item.vue'

Object.keys(filters).forEach(e => {
	Vue.filter(e, filters[e])
})

Vue.prototype.uni = uni

// #ifdef APP-PLUS
Vue.prototype.plus = plus
// #endif

Vue.prototype.console = console

Vue.prototype.$store = $store
Vue.prototype.$iRoute = route
Vue.prototype.$iRouter = router
Vue.prototype.$storage = $storage

Vue.prototype.$live = () => { // 打开微信小程序
	uni.loading()
	Vue.prototype.plus ?
	plus.share.getServices(list => {
		list.find(e => e.id === 'weixin').launchMiniProgram({ id:'gh_b8530fca1b0d' })
		uni.uloading()
	}) :
	uni.compressImage({
		src: '/static/icon/live.jpg',
		quality: 100,
	}).then(([, { tempFilePath }]) => uni.previewImage({ urls: [tempFilePath] }))
	uni.uloading()
}

Vue.prototype.$kefu = () => { // 跳转到客服页面
	Vue.prototype.plus ?
	Vue.prototype.$iRouter.push('/webview', {
		title: '在线客服',
		src: 'https://dami.jinjiwu.cn/kefu'
	}) :
	location.href = 'https://dami.jinjiwu.cn/kefu'
}

Vue.prototype.$shili = (path, title, query = {}) => { // 跳转到拾鲤的某个页面
	let queryString = ''
	path = path.replace('/', '')
	Object.entries(query).forEach(e => queryString += `&${e[0]}=${e[1]}`)
	const src = `${baseURL}${path}&mid=${Vue.prototype.$store.state.user.userinfo.id}${queryString}`
	Vue.prototype.plus ?
	Vue.prototype.$iRouter.push('/webview', { title, src }) :
	location.href = `${baseURL}${path}&mid=${Vue.prototype.$store.state.user.userinfo.id}${queryString}`
}

// $storage.openid = 'o4xrj0-x0axe_SYC9vC-mosUERFE' // 模拟 openID
// delete $storage.openid
// console.log('$storage', $storage)

Vue.prototype.$offset = function (selector) { // 获取元素宽高位置信息
	return new Promise((resolve, reject) => {
		uni.createSelectorQuery().in(this).select(selector).boundingClientRect(data => {
			data ? resolve(data) : reject('元素不存在')
		}).exec()
	})
}

Vue.prototype.$request = (req, cb) => {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => uni.loading(), 246)
		req.then(res => {
			// console.log(res)
			if (res.code != 200) {
				reject(res)
				setTimeout(() => uni.toast(res.msg))
			} else {
				cb(res.data)
				resolve(res)
			}
		}).catch(e => reject(e)).finally(() => {
			clearTimeout(timer)
			setTimeout(() => uni.uloading())
		})
	})
}

Vue.prototype.$clone = obj => typeof obj === 'string' ? JSON.parse(obj) : JSON.parse(JSON.stringify(obj))

Vue.component('good-item', GoodItem)

Vue.prototype.$serializeMap = (obj, name) => { // 序列化 post 传参
	const res = {}
	Object.entries(obj).forEach(e => res[`${name}[${e[0]}]`] = e[1])
	return res
}

Vue.prototype.$serializeArr = (arr, name) => {
	const res = {}
	arr.forEach((item, index) => {
		Object.entries(item).forEach(e => res[`${name}[${index}][${e[0]}]`] = e[1])
	})
	return res
}

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
