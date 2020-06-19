<template>
	<view class="withdraw">
		<view class="fui-content ">
			<view class="fui-cell-title">
				<view class="fui-cell-info">可提金额:
					￥<span id="current">{{ $store.state.user.userinfo.credit2 }}</span> 
					<a id="btn-all" class="text-danger external" @click="all" href="#" style="position: absolute;right: 0;text-decoration: underline">全部金额</a></view>
			</view>
			<view class="fui-cell-group" style="margin-top: 0">
				<view class="fui-cell-title" >金额
				</view>
				<view class="fui-cell" style="padding-top: 0" >
					<view class="fui-cell-label big">￥</view>
					<view class="fui-cell-info"><input focus type="number" v-model="money" class="fui-input" placeholder="请输入您要提现的金额"></view>
				</view>
			</view>
			<view class="fui-cell-group">
				<view class="fui-cell">
					<view class="fui-cell-label" style="width: 120px;"><span class="re-g">方式</span></view>
				</view>
				<view class="fui-cell applyradio">
					<view class="fui-cell-icon">
						<image src="https://dami.jinjiwu.cn/addons/ewei_shopv2/static/images/wx.png" alt="">
					</view>
					<view class="fui-cell-info">提到微信钱包</view>
					<view class="fui-cell-remark noremark"></view>
				</view>
			</view>

			<view class="btn-wrap">
				<text class="btn" @click="toShow" v-if="show">提交申请</text>
				<text class="btn blue" @click="toShow" v-else >提交申请</text>
			</view>
			<view class="fui-cell-group" style="background: transparent;padding: 16rpx 0;margin: 0;  ">
				<view class="fui-cell no-border">
					<view class="fui-cell-info" >详细说明</view>
				</view>
				<view class="fui-cell no-border charge-group">
					<view class="fui-cell-info">手续费为 6.5%</view>
				</view>
				<view class="fui-cell no-border charge-group">
					<view class="fui-cell-info">本次将扣除手续费 ￥<span class="text-danger" id="deductionmoney">7.22</span></view>
				</view>
				<view class="fui-cell no-border charge-group">
					<view class="fui-cell-info"> 本次实际到账金额 ￥<span class="text-danger" id="realmoney">103.78</span></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { _API_UserWithDraw } from '../../apis/user.js'
	export default {
		data() {
			return {
				show: true,
				money: '',
			};
		},
		watch: {
			money(m) {
				if (100 <= m && m <= parseInt(this.$store.state.user.userinfo.credit2)) {
					this.show = false
				} else {
					this.show = true
				}
			}
		},
		methods: {
			all() {
				this.money = +this.$store.state.user.userinfo.credit2
			},
			toShow(){
				if (this.money >= 100 && this.money <= this.$store.state.user.userinfo.credit2) {
					this.$request(_API_UserWithDraw({
						advance: '',
						applytype: '0',
						realname: '',
						alipay: '',
						alipay1: '',
						bankname: '',
						bankcard: '',
						kaihuhang: '',
						bankcard1: '',
						money: this.money
					}), data => {
						uni.toast('提现成功')
						this.$iRouter.pop()
					})
				} else {
					uni.toast('金额不符合要求')
				}
			}
		}
	}
</script>

<style lang="scss">
	.withdraw {
		height: 100%;
		background-color: #f7f7f7;
		// padding: 0 30rpx;
		.fui-content{
			.fui-cell-title{
				color: #333;
				font-size: 30rpx;
				padding: 20rpx 28rpx;
				height: 98rpx;
				.fui-cell-info{
					font-size: 28rpx;
					color: #666;
					position: relative;
					height: 100%;
					line-height: 57rpx;
				}
				.text-danger{
					color: #ff5555;
				}
			}
			.fui-cell-group{
				background-color: #fff;
				line-height: 1.4;
				font-size: 32rpx;
				overflow: hidden;
				position: relative;
				display: block;
				margin-top: 20rpx;
				.fui-cell-title{
					height: 98rpx;
					font-size:28rpx;
					color:#666;
					line-height: 57rpx;
				}
				.fui-cell{
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
					.big{
						width: auto;
						font-size: 40rpx;
						color: #000;
						padding: 0 8rpx;
					}
					.fui-cell-label {
						color: #666;
					}

					.fui-cell-info{
						-webkit-box-flex: 1;
						-webkit-flex: 1;
						-ms-flex: 1;
						flex: 1;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						font-size: 28rpx;
						color: #000;
						.fui-input{
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
				}
				.applyradio{
					.fui-cell-icon{
						color: #333;
						margin-right: 12rpx;
						width: auto;
						text-align: center;
						line-height: 28rpx;
						image{
							width: 52rpx;
							height: 52rpx;
						}
					}
					.fui-cell-remark{
						width: 38rpx;
						height: 38rpx;
						border-radius: 50%;
						font-size: 26rpx;
						margin-right: 8rpx;
						line-height: 26rpx;
						background-color: #F43F3B;
						border: 1px solid #F43F3B;
					}
				}
				.no-border{
					padding-top: 0;
					.fui-cell-info{
						font-size: 24rpx;
						color: #999;
						.text-danger{
							color: #ff5555;
						}
					}
				}
				.fui-cell:before{
					content: " ";
					position: absolute;
					left: 20rpx;
					right: 20rpx;
					bottom: -1px;
					height: 1rpx;
					border-top: 2rpx solid #f7f7f7;
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
					margin: 50rpx auto 30rpx;
					text-align: center;
					background: #CCCCCC;
					color: #FFFFFF;
					border-radius: 10rpx;
				}
				.submit{
					background-color: #ff5555;
				}
			
				.blue {
					background-color: #ff5555;
				}
			}
		}
	}
</style>
