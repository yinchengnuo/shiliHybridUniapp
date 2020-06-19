<template>
	<view class="freight-regular">
		<view class="top-bg">
			<image class="bg-img" src="../../static/index/indexTopBg.png" mode=""></image>
			<view class="top-magess">
				运费规则
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.freight-regular{
	min-height: 100%;
	position: relative;
	.top-bg{
		width: 100%;
		padding: 0 30rpx;
		.bg-img{
			width: 100%;
			height: 400rpx;
			position: absolute;
			top: 0;
			left: 0;
		}
		.top-magess{
			position: relative;
			top: 60rpx;
			width: 100%;
			height: 200rpx;
			text-align: center;
			background-color: #FFFFFF;
			// background-image: linear-gradient(180deg, #66ccff 0%, #41b5f0 100%);
			border-bottom-left-radius: 60% 15%;
			border-bottom-right-radius: 60% 15%;
			box-shadow: 1px 3px 10px #f5f5f5;
		}
	}
}
</style>
