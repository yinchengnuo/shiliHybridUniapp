<template>
	<view class="recharge">
		<view class="fui-cell-group">
			<view class="fui-cell">
				<view class="fui-cell-label">当前余额</view>
				<view class="fui-cell-info">￥{{ $store.state.user.userinfo.credit2 }}</view>
			</view>
			<view class="fui-cell">
				<view class="fui-cell-label">充值金额</view>
				<view class="fui-cell-info c000">￥
					<input type="number" focus="" class="fui-input" v-model="money" value="" placeholder="最低充值1000元">
				</view>
			</view>
		</view>
		<!-- <view class="btn-wrap" v-if="showNext">
			<text class="btn" v-if="show">下一步</text>
			<text class="btn blue" @click="toShow" v-else>下一步</text>
		</view> -->
		<view class="fui-cell-group">
			<view class="fui-cell applyradio " @click="this.state = 2">
				<view class="fui-cell-icon">
					<image class="iconImg" src="https://dami.jinjiwu.cn/addons/ewei_shopv2/static/images/zfb.png"></image>
				</view>
				<view class="fui-cell-info" >
					<view class="title">支付宝充值</view>
					<view class="subtitle" style="color: #999999;font-size: 26rpx">支付宝安全支付</view>
				</view>
				<view class="fui-cell-remark noremark" :class="{ 'active': state == 1 }"></view>
			</view>
			<!-- <view class="fui-cell applyradio" @click="this.state = 1">
				<view class="fui-cell-icon">
					<image class="iconImg" src="https://dami.jinjiwu.cn/addons/ewei_shopv2/static/images/wxcz.png"></image>
				</view>
				<view class="fui-cell-info" >
					<view class="title">微信充值</view>
					<view class="subtitle" style="color: #999999;font-size: 26rpx">微信安全支付</view>
				</view>
				<view class="fui-cell-remark noremark" :class="{ 'active': state== 2 }"></view>
			</view> -->
		</view>
		<view class="btn-wrap" @click="pay">
			<text class="btn submit" :class="{ blue: money < 1000 }">立即支付</text>
		</view>
	</view>
</template>

<script>
	import { _API_UserRecharge } from '@/apis/user.js'
	export default {
		data() {
			return {
				money: '',
				state: 1
			};
		},
		methods: {
			pay(){
				if (this.money < 1000) {
					uni.toast('最低充值1000元')
					return
				} else {
					if (this.state == 1) {
						this.$request(_API_UserRecharge({ type: 'alipay', money:this.money, advance: '', couponid: '' }), data => {
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: data,
								success: () => this.payed = true,
								complete: () => {
									if (this.payed) {
										this.$iRouter.pop()
										this.$store.dispatch('user/getUserInfo')
									} else {
										uni.toast('支付失败')
									}
								}
							})
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.recharge {
		height: 100%;
		background: #F5F5F5;
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

				.fui-cell-info {
					-webkit-box-flex: 1;
					-webkit-flex: 1;
					-ms-flex: 1;
					flex: 1;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					font-size: 28rpx;
					color: #000;

					.fui-input {
						width: 100%;
						border: 0;
						outline: 0;
						-webkit-appearance: none;
						background-color: transparent;
						font-size: inherit;
						color: inherit;
						height: 1.41176471em;
						line-height: 1.41176471;
					}
				}

				.c000 {
					display: -webkit-box;
					display: -webkit-flex;
					display: -ms-flexbox;
					display: flex;
					-webkit-box-align: center;
					-webkit-align-items: center;
					-ms-flex-align: center;
					align-items: center;
				}
			}
			.applyradio{
				height: 130rpx;
				padding: 16rpx 24rpx;
				.fui-cell-icon{
					margin-right: 30rpx;
					.iconImg{
						width: 68rpx;
						height: 68rpx;
					}
				}
				.fui-cell-info{
					display: -webkit-box;
					display: -webkit-flex;
					display: -ms-flexbox;
					display: flex;
					height: 100%;
					-webkit-box-orient: vertical;
					-webkit-flex-direction: column;
					-ms-flex-direction: column;
					flex-direction: column;
					-webkit-box-pack: justify;
					-ms-flex-pack: justify;
					-webkit-justify-content: space-around;
					justify-content: space-around;
				}
				.fui-cell-remark{
					width: 38rpx;
					height: 38rpx;
					border-radius: 50%;
					font-size: 26rpx;
					margin-right: 8rpx;
					line-height: 26rpx;
					border: 1px solid #F43F3B;
				}
				.active{
					background-color: #F43F3B;
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
				color: #D9D9D9;
				-webkit-transform-origin: 0 0;
				-ms-transform-origin: 0 0;
				transform-origin: 0 0;
				-webkit-transform: scaleY(0.5);
				-ms-transform: scaleY(0.5);
				transform: scaleY(0.5);
			}
		}

		.btn-wrap {
			.btn {
				display: block;
				width: 690rpx;
				height: 80rpx;
				line-height: 80rpx;
				margin: 50rpx auto 0;
				text-align: center;
				color: #FFFFFF;
				border-radius: 10rpx;
			}
			.submit{
				background-color: #ff5555;
			}
			
			.blue {
				background: #CCCCCC;
			}
		}
	}
</style>
