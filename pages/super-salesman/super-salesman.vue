<template>
	<view class="super-salesman">
		<image v-if="data.pictures" class="header" :src="Object.values(data.pictures)[0].imgurl"></image>
		<view class="text">程序员正在挖煤中,可关注拾鲤公众号优先体验...</view>
		<image
			v-if="data.picture"
			class="more"
			:src="Object.values(data.picture)[0].imgurl"
			 @click="$iRouter.push('/good-list', { cate: 330 })"
		></image>
		<good-item v-for="(item, key, index) in data.goods" :key="index" :item="item" :index="index" />
	</view>
</template>

<script>
	import { _API_IndexBanner } from '@/apis/index.js'
	export default {
		data() {
			return {
				data: {}
			}
		},
		onLoad({ id }) {
			this.$request(_API_IndexBanner({ id }), data => this.data = data)
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.super-salesman {
		overflow: hidden;
		background: #f5f5f5;
		.header {
			width: 100%;
			height: 600rpx;
		}
		.text {
			height: 60rpx;
			@include flex();
			color: rgb(230, 115, 0);
		}
		.more {
			width: 100%;
			height: 80rpx;
		}
	}
</style>
