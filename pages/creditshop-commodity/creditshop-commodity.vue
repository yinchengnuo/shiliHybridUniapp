<template>
	<view class="creditshop-commodity">
		<image class="banner-bg" src="../../static/credit/jfMbanner.png" mode=""></image>
		<view class="nav">
			<text class="back" @click="goBack"></text>
			<text class="title">商品管理</text>
			<view class="set">管理</view>
		</view>
		<view class="log-item">
			<view class="external" :class="{ 'active': active == 0 }" @click="active = 0">
				<view>上架商品</view>
				<view class="line"></view>
			</view>
			<view class="external" :class="{ 'active': active == 1 }" @click="active = 1">
				<view>下架商品</view>
				<view class="line"></view>
			</view>
			<view class="external" :class="{ 'active': active == 3 }" @click="active = 3">
				<view>兑换订单</view>
				<view class="line"></view>
			</view>
		</view>
		<view class="list-con">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:0,
				list:[],
				data:[{
					thumb:'https://dami.jinjiwu.cn/attachment/images/13/2020/05/L90ejy9QcZ00nrcngc0CgCTGJKCE0Q.jpg',
					title:"【包邮】超级太太智能扫地机器人",
					total:'100',
					sales:'222',
					marketprice:'1700.00',
					discounts_one:'123.00',
					discounts_two:89.00
				}]
			};
		}
	}
</script>

<style lang="scss">
.creditshop-commodity{
	min-height: 100vh;
	background: #f3f3f3;
	border-top: 200rpx solid #FFFFFF;
	.banner-bg{
		width: 750rpx;
		height: 200rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 0;
	}
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
		.set{
			font-size: 28rpx;
			position: absolute;
			right: 30rpx;
		}
	}
	.log-item{
		display: flex;
		justify-content: space-around;
		position: fixed;
		top: 123rpx;
		color: #FFFFFF;
		width: 100%;
		.active{
			color: #FFFFFF;
			font-weight: 600;
			@include flex(column);
			.line{
				display: inline-block;
				width: 30rpx;
				height: 6rpx;
				border-radius: 6rpx;
				background-color: #FFFFFF;
				margin-top: 15rpx;
			}
		}
	}
}
</style>
