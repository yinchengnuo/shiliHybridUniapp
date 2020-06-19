<script>
	import '@/utils/uni'
	import { _API_GetUserInfo } from '@/apis/user.js'
	export default {
		onLaunch: function() {
			this.$store.dispatch('sort/getSortList') // 获取分类列表
			if (this.$storage.openid) { // 如果用户已登陆，请求用户信息
				this.$store.dispatch('user/getUserInfo')
			}
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	@import '@/styles/main.css';  //引入 ColorUI 组件库主样式
	@import '@/styles/icon.css';  //引入 ColorUI 组件库图标样式
	@import '@/styles/animation.css';  //引入 ColorUI 组件库动画样式
	page {  //uniapp 中的 page 标签相当于 html 中的 body, 默认高度为 auto, 但是高度为 100% 更利于 app 布局,你也可以在 page 中设置一些全局样式,比如全局背景色
		height: 100%;
		color: #333333;
		background: #FFFFFF;
		color: $app-main-text-color;
	}
</style>
