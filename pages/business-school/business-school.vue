<template>
	<view class="business-school">
		<image
			v-if="data.picture"
			class="more"
			:src="Object.values(data.picture)[0].imgurl"
			@click="uni.previewImage({ urls: [Object.values(data.picture)[0].imgurl] })"
		></image>
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
		}
	}
</script>

<style lang="scss" scoped>
	.business-school {
		image {
			width: 100%;
			height: 1334rpx;
		}
	}
</style>
