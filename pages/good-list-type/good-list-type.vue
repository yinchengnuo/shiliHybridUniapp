<template>
	<view class="good-list-type"
		:style="{
			backgroundImage: data.picture ? 'url(' + Object.values(data.picture)[0].imgurl + ')' : ''
		}"
	>
		<image v-if="data.goods" class="header" :src="Object.values(data.picture)[0].imgurl"></image>
		<good-item v-for="(item, index) in data.goods" :type="title.includes('上新') ? '新品' : '推荐'" :key="index" :item="item" :index="index" />
		<image v-if="data.banner" class="footer" @click="$iRouter.pop()" :src="Object.values(data.banner)[0].imgurl"></image>
	</view>
</template>

<script>
	import { _API_IndexBanner } from '@/apis/index.js'
	export default {
		data() {
			return {
				id: '',
				data: {},
				title: '',
				bgColor: [
					{ id: '', color: '' },
					{ id: '', color: '' },
					{ id: '', color: '' },
					{ id: '', color: '' },
					{ id: '', color: '' },
					{ id: '', color: '' },
				]
			}
		},
		onLoad({ id, title }) {
			// console.log(id, title)
			this.id = id
			this.title = title
			setTimeout(() => uni.setNavigationBarTitle({ title }), 123)
			this.$request(_API_IndexBanner({ id }), data => {
				this.data = data
				console.log(data)
			})
		}
	}
</script>

<style lang="scss" scoped>
	.good-list-type {
		overflow: hidden;
		background-size: 10000%;
		background-position: bottom center;
		.header {
			width: 750rpx;
			height: 740rpx;
		}
		.footer {
			width: 750rpx;
			height: 116rpx;
		}
	}
</style>
