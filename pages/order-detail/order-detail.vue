<template>
	<view class="order-detail">
		<view class="order_detail_header">
			<view class="order_detail_ststus">
				<view style="font-size: 34rpx;">
					等待付款
				</view>
				<view>订单金额：¥ 4138.00</view>
			</view>
		</view>
		<view class="fui-list-group noborder">
			<view class="fui-list">
				<view class="fui-list-icon">
					<image src="../../static/index/userOrdersIcon3.png" mode=""></image>
				</view>
				<view class="fui-list-inner" style="font-size: 28rpx;height: auto;" @click="$iRouter.push('/address-list')">
					<view class="title has-address">刘祥凤 18336093227</view>
					<view class="text"><span class="address">河南省郑州市管城回族区 南顺城区与西大街中实小区</span></view>
				</view>
			</view>
		</view>
		<view class="fui-list-group">
			<view class="fui-list_title">
				<image src="../../static/goodsDetail/dianpu.png" mode=""></image>拾鲤助销平台
			</view>
			<view class="fui-list">
				<view class="fui-list-media">
					<image src="https://dami.jinjiwu.cn/attachment/images/13/2020/06/Me80Zreg8KFre9x0WFg2t2mh08mN7e.jpeg"></image>
				</view>
				<view class="fui-list-inner">
					<view class="title">某猫同款 洛克兰夏威夷拉杆箱20英寸RLX-1012</view>
					<view class="subtitle">银色</view>
				</view>
				<view class="fui-list-angle" style="margin-right: 0">
					<view style="color: #000">￥1,158.00</view>
					<view class="num">x1</view>
					<view class="text">运费：<span>￥19.00</span></view>
				</view>
			</view>
		</view>
		<view class="fui-cell-group noborder">
			<view class="fui-cell">
				<view class="fui-cell-label">商品小计</view>
				<view class="fui-cell-remark noremark">
					¥ 1158.00 </view>
			</view>
			<view class="fui-cell">
				<view class="fui-cell-label">运费</view>
				<view class="fui-cell-remark noremark">
					¥ 19.00 </view>
			</view>
			<view class="fui-cell">
				<view class="fui-cell-label">会员优惠</view>
				<view class="fui-cell-remark noremark">
					-¥ 958.10 </view>
			</view>
			<view class="fui-cell">
				<view class="fui-cell-label" style="width: 6rem;">实付费</view>
				<view class="fui-cell-remark noremark text-danger">
					<span style="font-size:.75rem">¥218.90 </span></view>
			</view>
		</view>
		<view class="fui-cell-group noborder order-info">
			<view class="fui-cell">
				<view class="fui-cell-info" style="font-size: 26rpx;color: #999999;">
					<span style="margin-right: 28rpx;">订单编号</span>SH20200615155310565284 
				</view>
				<view class="fui-cell-remark noremark"></view>
			</view>
			<view class="fui-cell">
				<view class="fui-cell-info" style="font-size: 26rpx;color: #999999;">
					<span style="margin-right:28rpx;">创建时间</span>2020-06-15 15:53:10 
				</view>
				<view class="fui-cell-remark noremark"></view>
			</view>
		</view>
		<view class="order-status">
			<view class="status pay">支付订单</view>
			<view class="status">取消订单</view>
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
	.order-detail {
		min-height: 100%;
		background-color: #f3f3f3;
		padding-bottom: 150rpx;

		.order_detail_header {
			height: 160rpx;
			width: 100%;
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			color: #fff;

			.order_detail_ststus {
				background: -moz-linear-gradient(left, #ffb43e 0%, #fd9526 100%);
				background: -webkit-linear-gradient(left, #ffb43e 0%, #fd9526 100%);
				background: -o-linear-gradient(left, #ffb43e 0%, #fd9526 100%);
				background: -ms-linear-gradient(left, #ffb43e 0%, #fd9526 100%);
				background: linear-gradient(to right, #ffb43e 0%, #fd9526 100%);
				filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#ffffb43e, endColorstr=#fffd9526, gradientType='1');
				-webkit-box-flex: 1;
				-webkit-flex: 1;
				-ms-flex: 1;
				flex: 1;
				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				flex-direction: column;
				align-items: center;
				-webkit-align-items: center;
				justify-content: center;
				padding: 0 24rpx;
				font-size: 26rpx;
				line-height: 48rpx;
			}
		}

		.fui-list-group {
			background-color: #fff;
			position: relative;
			margin-top: 20rpx;

			.fui-list_title {
				position: relative;
				display: flex;
				align-items: center;
				line-height: normal;
				height: 84rpx;
				font-size: 28rpx;
				color: #000;
				padding: 0 24rpx;

				image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 10rpx;
				}
			}

			.fui-list {
				position: relative;
				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				padding: 16rpx 24rpx;
				-moz-transition-duration: 300ms;
				-webkit-transition-duration: 300ms;
				transition-duration: 300ms;
				-webkit-box-align: center;
				-webkit-align-items: center;
				-ms-flex-align: center;
				align-items: center;
				overflow: hidden;
				background: #fff;
				padding-top: 32rpx;
				padding-bottom: 34rpx;

				.fui-list-media {
					display: -webkit-box;
					display: -webkit-flex;
					display: flex;
					-webkit-flex-shrink: 0;
					-ms-flex: 0 0 auto;
					-webkit-flex-shrink: 0;
					flex-shrink: 0;
					-webkit-box-lines: single;
					-moz-box-lines: single;
					-webkit-flex-wrap: nowrap;
					flex-wrap: nowrap;
					box-sizing: border-box;
					-webkit-box-align: center;
					-webkit-align-items: center;
					align-items: center;
					margin-right: 24rpx;
					color: #aaa;
					position: relative;

					image {
						width: 160rpx;
						height: 160rpx;
					}
				}

				.fui-list-icon {
					width: 32rpx;
					margin-right: 24rpx;

					image {
						width: 32rpx;
						height: 32rpx;
					}
				}

				.fui-list-angle {
					height: 140rpx;
					font-size: 26rpx;
					text-align: right;
					position: relative;
					vertical-align: middle;
					margin-right: 0;
					margin-left: 20rpx;

					.num {
						color: #999999;
					}

					.text {
						margin-top: 32rpx;
						font-size: 22rpx;
						color: #999;
					}
				}

				.fui-list-inner {
					position: relative;
					width: 100%;
					overflow: hidden;
					box-sizing: border-box;
					display: -webkit-box;
					display: -webkit-flex;
					display: flex;
					-webkit-box-flex: 1;
					-webkit-flex: 1;
					-ms-flex: 1;
					flex: 1;
					display: block;

					.title {
						color: #000;
						font-size: 28rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						white-space: normal;
						height: auto;
						line-height: 40rpx;
						position: relative;
					}

					.subtitle {
						position: relative;
						font-size: 26rpx;
						color: #999;
						display: -webkit-box;
						display: -webkit-flex;
						display: -ms-flexbox;
						display: flex;
						-ms-flex-align: start;
						-webkit-align-items: flex-start;
						align-items: flex-start;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}

					.title.has-address {
						color: #333;
						font-size: 28rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						white-space: normal;
						line-height: 48rpx;
						height: 48rpx;
					}

					.text {
						position: relative;
						font-size: 26rpx;
						color: #666;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
				}
			}
		}

		.fui-cell-group {
			margin-top: 20rpx;
			background-color: #fff;
			line-height: 1.4;
			font-size: 32rpx;
			overflow: hidden;
			position: relative;
			display: block;
			padding: 14rpx 0;

			.fui-cell {
				position: relative;
				padding: 24rpx 24rpx;
				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-align: center;
				-webkit-align-items: center;
				-ms-flex-align: center;
				align-items: center;
				justify-content: space-between;
				line-height: 1.2;

				.fui-cell-label {
					position: relative;
					display: block;
					width: 154rpx;
					padding: 0;
					font-size: 28rpx;
					color: #666;
				}

				.fui-cell-remark {
					color: #333;
					text-align: right;
					font-size: 26rpx;
					margin-right: 8rpx;
					line-height: 28rpx;
				}
			}

			.fui-cell:before {
				content: " ";
				position: absolute;
				left: 20rpx;
				right: 20rpx;
				bottom: -1px;
				height: 1px;
				border-top: 1px solid #ebebeb;
				-webkit-transform-origin: 0 0;
				-ms-transform-origin: 0 0;
				transform-origin: 0 0;
				-webkit-transform: scaleY(0.5);
				-ms-transform: scaleY(0.5);
				transform: scaleY(0.5);
			}
		}
		.order-status{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			padding: 0 20rpx;
			font-size: 28rpx;
			color: #333;
			height: 96rpx;
			line-height: 96rpx;
			overflow: hidden;
			background: #FFFFFF;
			.status{
				float: right;
				margin: 20rpx 0 20rpx 20rpx;
				height: 56rpx;
				line-height: 54rpx;
				font-size: 26rpx;
				background: transparent;
				color: #666;
				border: 1px solid #666;
				border-radius: 1rem;
				display: flex;
				-moz-appearance: none;
				box-sizing: border-box;
				font-family: inherit;
				padding: 0 0.6rem;
				position: relative;
				text-align: center;
				text-decoration: none;
				text-overflow: ellipsis;
				white-space: nowrap;
				-webkit-user-select: none;
				-moz-user-select: none;
				-moz-transition-duration: 300ms;
				-webkit-transition-duration: 300ms;
				transition-duration: 300ms;
				-webkit-transition-property: background-color;
				transition-property: background-color;
				display: inline-block;
			}
			.pay{
				color: #ff5555;
				border: 1px solid #ff5555;
			}
		}

	}
</style>
