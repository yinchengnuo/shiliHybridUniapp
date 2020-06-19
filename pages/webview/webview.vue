<template>
	<web-view class="webview" :webview-styles="webviewStyles" :src="src"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onLoad({ src, title }) {
			if (this.$iRoute.query.title != '超级业务员' && this.$iRoute.query.title != '抢乐购') {
				!uni.__HIDEBACK ? uni.__HIDEBACK = new plus.nativeObj.View('test',
					{ bottom:'0px', left:'0px', height:'60px', width:'100%'},
					[{tag:'img',id:'img',src:'/static/tabbar/tabbar.png',position:{top:'0px',left:'0px',width:'100%',height:'100%'}}]
				) : ''
				uni.__HIDEBACK.addEventListener('click', () => this.$iRoute.pop())
				setTimeout(() => uni.__HIDEBACK.show(), 456)
			}
			this.src = this.$iRoute.query.src
			setTimeout(() => uni.setNavigationBarTitle({ title: this.$iRoute.query.title }), 456)
		},
		beforeDestroy() {
			uni.__HIDEBACK.hide()
		}
	}
</script>
