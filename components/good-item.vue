<template>
	<view class="good-item" :style="{ marginTop: (index == 0 || index == 1) ? '16rpx' : 0 }" @click="$iRouter.push('/good-detail', { id: item.id || item.gid })">
		<view v-if="type" class="type">{{ type }}</view>
		<image class="good-item-img" :src="item.thumb" mode=""></image>
		<view class="good-item-name">{{ item.title }}</view>
		<view class="good-item-price1">
			<view class="price-num">
				<image class="price-logo" src="../static/index/gold.png"></image>
				<view>￥</view>
				<view class="price" style="font-size: 28rpx;">{{ item.discounts_one}}</view>
			</view>
			<view class="num-grey p">￥{{ item.marketprice  }}</view>
		</view>
		<view class="good-item-price2">
			<view class="price-num">
				<image class="price-logo" src="../static/index/red.png"></image>
				<view>￥</view>
				<view style="font-size: 28rpx;">{{ item.discounts_two }}</view>
			</view>
			<view class="num-grey">销量{{ item.sales }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['item', 'index', 'type']
	}
</script>

<style lang="scss" scoped>
	.good-item {
		float: left;
		width: 350rpx;
		height: 560rpx;
		overflow: hidden;
		position: relative;
		border-radius: 22rpx;
		@include flex(column);
		margin: 0rpx 2rpx 16rpx 16rpx;
		justify-content: space-between;
		background: rgba(255,255,255,1);
		.type {
			top: 0;
			left: 0;
			z-index: 1;
			width: 130rpx;
			height: 96rpx;
			color: #FFFFFF;
			@include flex();
			font-size: 24rpx;
			position: absolute;
			background: #ff5555;
			align-items: flex-end;
			transform: rotate(-45deg);
			transform-origin: left bottom;
		}
		.good-item-img {
			width: 350rpx;
			height: 350rpx;
		}
		.good-item-name {
			width: 316rpx;
			font-size: 28rpx;
			margin: 16rpx 0 22rpx;
			overflow : hidden;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			word-break: break-all;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
		}
		.good-item-price1, .good-item-price2{
			width: 316rpx;
			@include flex();
			font-size: 20rpx;
			margin-bottom: 18rpx;
			justify-content: space-between;
			&.good-item-price1 {
				margin-bottom: 8rpx;
			}
			.price-logo {
				width: 28rpx;
				height: 28rpx;
			}
			.price-num {
				@include flex();
				// > image {
				// 	width: 102rpx;
				// 	height: 30rpx;
				// }
			}
			.num-grey {
				color: #999999;
				&.p {
					text-decoration: line-through;
				}
			}
		}
	}
</style>
