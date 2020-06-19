<template>
	<view class="pay">
		<view class="fui-cell-group">
			<view class="fui-cell">
				<view class="fui-cell-label">订单编号：</view>
				<view class="fui-cell-remark noremark">{{ order_num }}</view>
			</view>
			<view class="fui-cell">
				<view class="fui-cell-label">订单金额：</view>
				<view class="fui-cell-remark noremark"><span class="text-danger">{{ price }}</span></view>
			</view>
		</view>
		<view class="fui-list-group" style="margin-top:20rpx;">
			<!-- <view class="fui-list pay-btn" data-type="wechat">
				<view class="fui-list-media">
					<image src="https://dami.jinjiwu.cn/addons/ewei_shopv2/static/images/wxcz.png" mode=""></image>
				</view>
				<view class="fui-list-inner">
					<view class="title">微信支付</view>
					<view class="subtitle">微信安全支付</view>
				</view>
				<view class="fui-list-angle"><span class="angle"></span></view>
			</view> -->
			<view class="fui-list pay-btn"  type="default" @click="alipay">
				<view class="fui-list-media">
					<image src="https://dami.jinjiwu.cn/addons/ewei_shopv2/static/images/zfb.png"></image>
				</view>
				<view class="fui-list-inner">
					<view class="title">支付宝支付</view>
					<view class="subtitle c999 f24">
						<image src="https://dami.jinjiwu.cn/addons/ewei_shopv2/static/images/safe.png"></image>支付宝安全支付
					</view>
				</view>
				<view class="fui-list-angle"><span class="angle"></span></view>
			</view>
			<view class="fui-list pay-btn" data-type="credit" @click="pay">
				<view class="fui-list-media">
					<image src="../../static/member/yue.png"></image>
				</view>
				<view class="fui-list-inner">
					<view class="title">余额支付</view>
					<view class="subtitle">当前余额: <span class="text-danger">¥ {{ $store.state.user.userinfo.credit2 }}</span></view>
				</view>
				<view class="fui-list-angle"><span class="angle"></span></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { _API_GetPayOrder, _API_PayCheck, _API_Pay, _API_AliPay, _API_WxPay } from '@/apis/pay.js'
	export default {
		data() {
			return {
				id: '',
				price: '',
				order_num: '',
				could: false
			}
		},
		onLoad({ orderid: id }) { // 根据订单ID获取订单编号
			this.id = id
			console.log(id)
			this.$request(_API_GetPayOrder({ id }), ({ ordersin, price }) => {
				this.price = price
				this.order_num = ordersin
			})
			this.$request(_API_PayCheck({ id }), data => this.could = true) // 检查订单是否可支付
		},
		methods: {
			alipay() { // 支付宝支付
				if (!this.could) { uni.toast('订单不可支付'); return }
				this.$request(_API_AliPay({ price: this.price, order_sn: this.order_num }), data => {
					uni.requestPayment({
						provider: 'alipay',
						orderInfo: data,
						success: () => this.payed = true,
						complete: () => {
							if (this.payed) {
								uni.toast('支付成功')
								this.$iRouter.pop(2)
							} else {
								uni.toast('支付失败')
							}
						}
					})
				})
			},
			pay() { // 余额支付
				if (!this.could) { uni.toast('订单不可支付'); return }
				this.$request(_API_Pay({ 
					id: this.id,
					type: 'credit',
					price: this.price,
					order_sn: this.order_num,
				}), data => {
					uni.toast('支付成功')
					this.$iRouter.pop(2)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pay {
		height: 100vh;
		background-color: #f7f7f7;
		padding-top: 1rpx;
		.fui-cell-group {
			margin-top: 20rpx;
			background-color: #fff;
			line-height: 1.4;
			font-size: 32rpx;
			overflow: hidden;
			position: relative;
			display: block;

			.fui-cell {
				position: relative;
				padding: 30rpx 24rpx 26rpx;
				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-align: center;
				-webkit-align-items: center;
				-ms-flex-align: center;
				align-items: center;
				-moz-transition-duration: 300ms;
				-webkit-transition-duration: 300ms;
				transition-duration: 300ms;
				-webkit-transition-property: background-color;
				transition-property: background-color;
				line-height: 1.2;

				.fui-cell-label {
					position: relative;
					display: block;
					width: 154rpx;
					font-size: 28rpx;
					color: #666;
				}

				.fui-cell-remark {
					color: #333;
					text-align: right;
					font-size: 26rpx;
					margin-right: 8rpx;
					line-height: 26rpx;

					.text-danger {
						color: #ff5555;
					}
				}
			}

			.fui-cell:before {
				content: " ";
				position: absolute;
				left: 20rpx;
				right: 20rpx;
				bottom: -1px;
				height: 1px;
				border-top: 1px solid #f3f3f3;
				-webkit-transform-origin: 0 0;
				-ms-transform-origin: 0 0;
				transform-origin: 0 0;
				-webkit-transform: scaleY(0.5);
				-ms-transform: scaleY(0.5);
				transform: scaleY(0.5);
			}
		}
		.fui-list-group{
			background-color: #fff;
			position: relative;
			.fui-list{
				position: relative;
				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				height: 130rpx;
				padding: 16rpx 24rpx;
				-moz-transition-duration: 300ms;
				-webkit-transition-duration: 300ms;
				transition-duration: 300ms;
				-webkit-box-align: center;
				-webkit-align-items: center;
				-ms-flex-align: center;
				align-items: center;
				overflow: hidden;
				.fui-list-media{
					width: 92rpx;
					height: 68rpx;
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
					padding-right: 24rpx;
					color: #aaa;
					position: relative;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.fui-list-media:after{
					content: "";
					display: inline-block;
					position: absolute;
					width: 1px;
					top: 4rpx;
					bottom: 4rpx;
					right: 0;
					border-right: 1px solid #f3f3f3;
					-webkit-transform-origin: 0 0;
					-ms-transform-origin: 0 0;
					transform-origin: 0 0;
				}
				.fui-list-inner{
					position: relative;
					width: 100%;
					height: 100%;
					overflow: hidden;
					box-sizing: border-box;
					display: -webkit-box;
					display: -webkit-flex;
					display: flex;
					-webkit-box-flex: 1;
					-webkit-flex: 1;
					-ms-flex: 1;
					flex: 1;
					-webkit-box-orient: vertical;
					-webkit-flex-direction: column;
					-ms-flex-direction: column;
					flex-direction: column;
					-webkit-box-pack: justify;
					-ms-flex-pack: justify;
					-webkit-justify-content: space-around;
					justify-content: space-around;
					.title{
						position: relative;
						font-size: 28rpx;
						color: #000;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						height: 1rem;
						line-height: 1rem;
					}
					.subtitle{
						position: relative;
						font-size: 26rpx;
						color: #666;
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
						image{
							width: 32rpx;
							height: 32rpx;
							vertical-align: text-bottom;
						}
						
					}
				}
				.fui-list-angle{
					position: relative;
					vertical-align: middle;
					margin-right: 24rpx;
					margin-left: 20rpx;
					.angle:after{
						content: " ";
						display: inline-block;
						-webkit-transform: rotate(45deg);
						-ms-transform: rotate(45deg);
						transform: rotate(45deg);
						height: 16rpx;
						width: 16rpx;
						border-width: 1px 1px 0 0;
						border-color: #b2b2b2;
						border-style: solid;
						position: relative;
						top: 0px;
						margin-left: .1em;
					}
				}
			}
		}
	}
</style>
