<template>
	<view class="subsidy">
		<view class="sub-title">
			<text class="title">可提现补贴（元）</text>
			<text class="num">￥0.00</text>
		</view>
		<view class="content">
			<view class="item" @click="$iRouter.push('/subsidy-expected')">
				<view class="item-icon">
					<image class="iconImg" src="../../static/addrss/cashdetail.png" mode=""></image>
					<text class="num">0</text>
				</view>
				<view class="text">
					预计补贴
				</view>
			</view>
			<view class="item" @click="$iRouter.push('/withdraw-show')">
				<view class="item-icon">
					<image class="iconImg" src="../../static/addrss/finance.png" mode=""></image>
				</view>
				<view class="text">
					补贴提现
				</view>
			</view>
			<view class="item" @click="$iRouter.push('/withdraw-detail')">
				<view class="item-icon">
					<image class="iconImg" src="../../static/addrss/detail.png" mode=""></image>
					<text class="num">12</text>
				</view>
				<view class="text">
					提现明细
				</view>
			</view>
		</view>
		<view class="erweima">
			<image src="../../static/addrss/erweima.png" mode=""></image>
			<text class="text">推广二维码</text>
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
.subsidy{
	min-height: 100vh;
	background-color: #f3f3f3;
	padding-top: 1px;
	.sub-title{
		width: 94%;
		margin: 20rpx auto 20rpx;
		height: 320rpx;
		position: relative;
		text-align: center;
		color: #ffffff;
		background: -webkit-linear-gradient(to bottom, #f57669, #e60907);
		background: -o-linear-gradient(to bottom, #f57669, #e60907);
		background: -moz-linear-gradient(to bottom, #f57669, #e60907);
		background: linear-gradient(to bottom, #f57669, #e60907);
		border-radius: 20rpx;
		display: flex;
		flex-flow: column;
		align-items: center;
		.title{
			display: block;
			font-size: 28rpx;
			padding: 72rpx 0 16rpx;
		}
		.num{
			font-weight: bold;
			font-size: 72rpx !important;
			color: #F1F1F1 !important;
		}
	}
	.content{
		display: flex;
		flex-flow: row;
		width: 94%;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		margin: 20rpx auto;
		.item{
			width: 33.3%;
			@include flex(column);
			padding: 20rpx 0;
			.item-icon{
				position: relative;
				font-size: 0;
				margin-bottom: 10rpx;
				.iconImg{
					width: 64rpx;
					height: 64rpx;
				}
				.num{
					display: block;
					min-width: 24rpx;
					height: auto;
					padding: 4rpx 6rpx;
					border-radius: 24rpx;
					color: #FFFFFF;
					font-size: 24rpx;
					text-align: center;
					background-color: #68c6f7;
					position: absolute;
					top: -25%;
					right: -25%;
					z-index: 99;
				}
			}
		}
	}
	.erweima{
		background-color: #FFFFFF;
		padding: 20rpx 30rpx;
		display: flex;
		flex-flow: row;
		align-items: center;
		width: 94%;
		margin: 0 auto;
		border-radius: 10rpx;
		image{
			width: 32rpx;
			height: 32rpx;
			margin-right: 20rpx;
		}
	}
}
</style>
