<template>
	<view class="withdraw-show">
		<div class="fui-cell-group">
			<div class="fui-cell">
				<div class="fui-cell-info">
					<image src="../../static/withdraw/cash.png" mode=""></image>
					<div class="fui-cell-label" style="width:auto">提现补贴</div>
				</div>
				<div class="fui-cell-remark noremark"><span class="text-orange">0.00 元</span></div>
			</div>
		</div>
		<div class="fui-cell-group">
			<div class="fui-cell">
				<div class="fui-cell-info">
					<image src="../../static/withdraw/fenqishijian1.png" mode=""></image>
					<div class="fui-cell-label" style="width:auto">已申请补贴</div>
				</div>
				<div class="fui-cell-remark noremark">0.00 元</div>
			</div>
			<div class="fui-cell">
				<div class="fui-cell-info">
					<image src="../../static/withdraw/liucheng-shoudaochengguohoudakuan.png" mode=""></image>
					<div class="fui-cell-label" style="width:auto">待打款补贴</div>
				</div>
				<div class="fui-cell-remark noremark">0.00 元</div>
			</div>
			<div class="fui-cell">
				<div class="fui-cell-info">
					<image src="../../static/withdraw/butielei.png" mode=""></image>
					<div class="fui-cell-label" style="width:auto">无效补贴</div>
				</div>
				<div class="fui-cell-remark noremark">0.00 元</div>
			</div>
			<div class="fui-cell">
				<div class="fui-cell-info">
					<image src="../../static/withdraw/wuxiao-2.png" mode=""></image>
					<div class="fui-cell-label" style="width:auto">成功提现补贴</div>
				</div>
				<div class="fui-cell-remark noremark">53.39 元</div>
			</div>
		</div>
		<div class="fui-cell-group">
			<div class="fui-cell">
				<div class="fui-cell-info">
					<image src="../../static/withdraw/daishouhuo-2.png" mode=""></image>
					<div class="fui-cell-label" style="width:auto">待收货补贴</div>
				</div>
				<div class="fui-cell-remark noremark">0.00 元</div>
			</div>
			<div class="fui-cell">
				<div class="fui-cell-info">
					<image src="../../static/withdraw/jiesuan.png" mode=""></image>
					<div class="fui-cell-label" style="width:auto">未结算补贴</div>
				</div>
				<div class="fui-cell-remark noremark">0.00 元</div>
			</div>
		</div>
		<div class="fui-according-group">
			<div class="fui-according expanded">
				<div class="fui-according-header">
					<div class="text">用户须知</div>
					<div class="remark"></div>
				</div>
				<div class="fui-according-content">
					<div class="content-block">
						<text>买家确认收货后，立即获得补贴提现</text>
						<text>注意：可用提现满 <span class="text-orange">100元</span> 后才能申请提现</text>
					</div>
				</div>
			</div>
		</div>
		<view class="submit">我要提到钱包</view>
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

<style lang="scss">
.withdraw-show{
	min-height: 100vh;
	background-color: #f3f3f3;
	position: relative;
	padding-bottom: 120rpx;
	padding-top: 1rpx;
	.fui-cell-group{
		margin-top: 0.5rem;
		background-color: #fff;
		line-height: 1.4;
		font-size: 32rpx;
		overflow: hidden;
		position: relative;
		display: block;
		.fui-cell{
			position: relative;
			padding: 30rpx 24rpx 26rpx;
			display: flex;
			align-items: center;
			line-height: 1.2;
			justify-content: space-between;
			.fui-cell-info{
				display: flex;
				flex-flow: row;
				font-size: 28rpx;
				color: #666;
				image{
					width: 32rpx;
					height: 32rpx;
					margin-right: 10rpx;
				}
			}
			.fui-cell-remark{
				margin-right: 8rpx;
				line-height: 26rpx;
				font-size: 26rpx;
				color: 333;
			}
		}
		.fui-cell:before{
			content: " ";
			position: absolute;
			left: 20rpx;
			right: 20rpx;
			bottom: -1px;
			height: 1px;
			border-top: 1px solid #ebebeb;
			color: #D9D9D9;
			-webkit-transform-origin: 0 0;
			-ms-transform-origin: 0 0;
			transform-origin: 0 0;
			-webkit-transform: scaleY(0.5);
			-ms-transform: scaleY(0.5);
			transform: scaleY(0.5);
		}
	}
	.fui-according-group{
		margin-top: 20rpx;
		background-color: #fff;
		line-height: 1.4;
		font-size: 32rpx;
		overflow: hidden;
		position: relative;
		.fui-according{
			.fui-according-header{
				position: relative;
				display: flex;
				width: 100%;
				padding: 24rpx 24rpx 20rpx;
				.text{
					-webkit-box-flex: 1;
					-webkit-flex: 1;
					-ms-flex: 1;
					flex: 1;
					color: #000;
					font-size: 28rpx;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			}
			.fui-according-content{
				position: relative;
				.content-block{
					display: flex;
					flex-flow: column;
					padding: 20rpx;
					font-size: 26rpx;
					color: #666;
					box-sizing: border-box;
					line-height: 1.5;
				}
				.content-block:after{
					content: " ";
					position: absolute;
					left: 20rpx;
					right: 20rpx;
					top: 0;
					height: 1px;
					border-top: 1px solid #ebebeb;
					color: #D9D9D9;
					-webkit-transform-origin: 0 0;
					-ms-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scaleY(0.5);
					-ms-transform: scaleY(0.5);
					transform: scaleY(0.5);
				}
			}
		}
	}
	.submit{
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		line-height: 90rpx;
		text-align: center;
		background-color: #CCCCCC;
		color: #FFFFFF;
	}
}
</style>
