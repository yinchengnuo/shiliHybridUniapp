<template>
	<view class="creditshop">
		<view class="nav">
			<text class="back" @click="goBack"></text>
			<text class="title">积分商城</text>
		</view>
		<view class="heard-info">
			<view class="info-wrap">
				<text class="name">预付款(元)</text>
				<view class="credit">
					38683.85
				</view>
			</view>
			<view class="paynow">
				<image src="../../static/credit/chongzhi.png" mode=""></image>
				<text class="text">立即充值</text>
			</view>
		</view>
		<view class="shop">
			<view class="shop-name">累计兑换商品(件)：<text class="num">50</text></view>
			<view class="more">查看明细<image src="../../static/credit/8.png" mode=""></image></view>
		</view>
		<view class="list">
			<view class="item-title">
				<view class="line"></view><view class="text">积分商城</view>
			</view>
			<view class="item-con">
				<view class="item">
					<image src="../../static/credit/7.png" mode=""></image>
					<text class="name">商品管理</text>
				</view>
				<view class="item">
					<image src="../../static/credit/1.png" mode=""></image>
					<text class="name">兑换订单</text>
				</view>
				<view class="item">
					<image src="../../static/credit/2.png" mode=""></image>
					<text class="name">待处理问题</text>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item-title">
				<view class="line"></view><view class="text">会员管理</view>
			</view>
			<view class="item-con">
				<view class="item">
					<image src="../../static/credit/3.png" mode=""></image>
					<text class="name">会员管理</text>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item-title">
				<view class="line"></view><view class="text">其他</view>
			</view>
			<view class="item-con">
				<view class="item">
					<image src="../../static/credit/4.png" mode=""></image>
					<text class="name">设置</text>
				</view>
				<view class="item">
					<image src="../../static/credit/5.png" mode=""></image>
					<text class="name">商城推广</text>
				</view>
				<view class="item">
					<image src="../../static/credit/6.png" mode=""></image>
					<text class="name">商城预览</text>
				</view>
			</view>
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
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
.creditshop{
	min-height: 100vh;
	background: #f3f3f3;
	border-top: 120rpx solid #FFFFFF;
	padding-bottom: 50rpx;
	.nav{
		width: 100%;
		height: 120rpx;
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		font-size: 36rpx;
		justify-content: center;
		padding: 0 30rpx 30rpx;
		align-items: flex-end;
		background: #4D77FE;
		color: #FFFFFF;
		.back{
			position: absolute;
			left: 30rpx;
		}
		.back:after{
			content: " ";
			display: inline-block;
			-webkit-transform: rotate(-135deg);
			-ms-transform: rotate(-135deg);
			transform: rotate(-135deg);
			height: 18rpx;
			width: 18rpx;
			border-width: 4rpx 4rpx 0 0;
			border-color: #FFFFFF;
			border-style: solid;
			position: relative;
			top: 0px;
			margin-left: .1em;
		}
	}
	.heard-info{
		padding: 30rpx 60rpx;
		background-color: #4D77FE;
		color: #FFFFFF;
		position: relative;
		border-bottom: 2rpx solid #6489FF;
		.info-wrap{
			font-family: PingFangSC-Regular, sans-serif;
			.name{
				display: block;
				font-size: 28rpx;
				line-height: 40rpx;
				margin: 20rpx 0;
			}
			.credit{
				font-size: 60rpx;
				line-height: 84rpx;
			}
		}
		.paynow{
			width: 200rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #6B8FF9;
			border-top-left-radius: 60rpx;
			border-bottom-left-radius: 60rpx;
			position: absolute;
			right: 0;
			top: 50%;
			margin-top: -30rpx;
			image{
				width: 30rpx;
				height: 30rpx;
				margin-right: 6rpx;
			}
		}
	}
	.shop{
		padding: 32rpx 46rpx;
		display: flex;
		flex-flow: row;
		align-items: center;
		justify-content: space-between;
		background-color: #4D77FE;
		color: #FFFFFF;
		.shop-name{
			font-size: 28rpx;
			.num{
				font-size: 36rpx;
			}
		}
		.more{
			font-size: 24rpx;
			image{
				width: 12rpx;
				height: 20rpx;
				margin-left: 28rpx;
			}
		}
	}
	.list{
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		padding: 40rpx 30rpx;
		.item-title{
			font-family: PingFangSC-Medium, sans-serif;
			position: relative;
			.line{
				width: 10rpx;
				height: 30rpx;
				background-color: #4D77FE;
				border-radius: 10rpx;
				position: absolute;
				left: 0rpx;
				top: 10rpx;
			}
			.text{
				font-size:32rpx;
				padding-left: 30rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
				line-height:44rpx;
			}
		}
		.item-con{
			display: flex;
			flex-flow: row;
			align-items: center;
			justify-content: flex-start;
			padding: 38rpx 30rpx 0;
			.item{
				display: flex;
				flex-flow: column;
				align-items: center;
				flex-grow: 0;
				margin-right: 90rpx;
				image{
					width: 84rpx;
					height: 84rpx;
				}
				.name{
					display: block;
					height:34rpx;
					font-size:24rpx;
					margin-top: 18rpx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height:34rpx;

				}
			}
		}
	}
}
</style>
