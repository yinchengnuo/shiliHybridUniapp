<template>
	<view class="membercard">
		<view class="content-wrap">
			<image class="img" src="../../static/member/marketing.png" mode="" @click="tomDetail"></image>
			<view class="pay-now" @click="buyNow"></view>
		</view>
		<view class="content-wrap">
			<image class="img" src="../../static/member/golden.png" mode="" @click="togDetail"></image>
			<view class="pay-now" @click="buyNow1"></view>
		</view>
		<view class="bottom">
			—— 没有更多了 ——
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			buyNow(){
				uni.toast('购买营销中心');
				uni.navigateTo({
					url:'../pay/pay?type=1'
				})
				return
			},
			buyNow1(){
				uni.toast('购买金鲤领袖');
				uni.navigateTo({
					url:'../pay/pay?type=2'
				})
				return
			},
			tomDetail(){
				uni.navigateTo({
					url:'../member-card-detail/member-card-detail?state=1'
				})
			},
			togDetail(){
				uni.navigateTo({
					url:'../member-card-detail/member-card-detail?state=2'
				})
			},
		}
	}
</script>

<style lang="scss">
.membercard{
	height: 100%;
	display: flex;
	flex-flow: column;
	align-items: center;
	padding-top: 30rpx;
	.content-wrap{
		position: relative;
		display: flex;
		justify-content: center;
		padding-bottom: 50rpx;
		.img{
			width: 652rpx;
			height: 388rpx;
		}
		.pay-now{
			width: 130rpx;
			height: 54rpx;
			border-radius: 54rpx;
			position: absolute;
			top: 60rpx;
			right: 60rpx;
			z-index: 99;
		}
	}
	.bottom{
		width: 100%;
		text-align: center;
		position: fixed;
		left: 0;
		bottom: 5%;
		color: #999999;
	}
}
</style>
