<template>
	<view class="brand-area">
		<view class="tabbar" style="height: 88rpx;">
			<view
				class="tabbar-item"
				v-for="(item, key, index) in tabbar"
				:key="index"
				:class="{ active: active == index }"
				@click="active = index"
			>{{ item.text }}</view>
		</view>
		<scroll-view scroll-y style="height: calc(100vh - 88rpx); background: #f9f9f9;">
			<good-item v-for="(item, index) in list" :key="index" :item="item" :index="index" />
		</scroll-view>
	</view>
</template>

<script>
	import { _API_IndexBanner } from '@/apis/index.js'
	import { _API_GetBrandGoodList } from '@/apis/good.js'
	export default {
		data() {
			return {
				list: [],
				active: 0,
				tabbar: {}
			}
		},
		watch: {
			active(n) {
				this.getList()
			}
		},
		onLoad({ id }) {
			this.$request(_API_IndexBanner({ id }), data => {
				this.tabbar = data.tabbar
				this.getList()
			})
		},
		methods: {
			getList() {
				this.$request(_API_GetBrandGoodList({
					url: `category=${Object.values(this.tabbar)[this.active].linkurl}`
				})).catch(({ result: { list }}) => this.list = list)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.brand-area {
		.tabbar {
			overflow: scroll;
			white-space: nowrap;
			.tabbar-item {
				height: 100%;
				width: 200rpx;
				@include flex();
				position: relative;
				display: inline-flex;
				&.active {
					color: #FF5555;
				}
				&.active::after {
					left: 0;
					bottom: 0;
					content: "";
					width: 100%;
					height: 4rpx;
					position: absolute;
					background: #FF5555;
				}
			}
		}
	}
</style>
