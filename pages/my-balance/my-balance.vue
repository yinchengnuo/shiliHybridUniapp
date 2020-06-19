<template>
	<view class="my-balance">
		<view class="balance-top">
			<image class="top-bg" src="../../static/addrss/yue.png"></image>
			<view class="money-wrap">
				<text class="money-text">总资产(元)</text>
				<text class="money-unm">{{ $store.state.user.userinfo.credit2 }}</text>
				<view class="mag-show">
					<view class="show-balance">
						<text class="name">充值余额</text><text class="number">
							{{ $store.state.user.userinfo.credit2 - $store.state.user.userinfo.commission_total }}
						</text>
					</view>
					<view class="show-balance">
						<text class="name">我的补贴</text><text class="number">{{ $store.state.user.userinfo.commission_total }}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 提现 -->
		<view class="item">
			<view class="recharge" @click="$iRouter.push('/recharge')">
				<image class="img1" src="../../static/addrss/chongzhi.png"></image>
				<text>充值</text>
			</view>
			<view class="recharge withdraw" @click="$iRouter.push('/withdraw')">
				<image class="img2" src="../../static/addrss/tixian.png"></image>
				<text>提现</text>
			</view>
		</view>
		<!-- 记录 -->
		<view class="list-log">
			<view class="log-item">
				<view class="external" :class="{ 'active': active == 0 }" @click="active = 0">
					<view>充值记录</view>
					<view class="line"></view>
				</view>
				<view class="external" :class="{ 'active': active == 1 }" @click="active = 1">
					<view>已提记录</view>
					<view class="line"></view>
				</view>
				<view class="external" :class="{ 'active': active == 3 }" @click="active = 3">
					<view>业务返佣</view>
					<view class="line"></view>
				</view>
			</view>
			<view class="log-con">
				<view class="list-wrap" v-if="list.length > 0">
					<view class="list-item" v-for="item in list" :key="item.state">
						<view class="item-mage">
							<text class="title">充值金额: {{item.money}}元</text>
							<text class="time">{{item.createtime}}</text>
						</view>
						<view class="item-stated" v-if="item.status == 1">
							<text v-if="active == 0">成功</text>
							<text v-if="active == 1">已提现</text>
							<text v-if="active == 3">已发放</text>
						</view>
						<view class="item-state" v-if="item.status == 0">
							<text v-if="active == 0">未充值</text>
							<text v-if="active == 1">未提现</text>
							<text v-if="active == 3">未发放</text>
						</view>
					</view>
					<view class="list-item" style="justify-content: center;">{{ page ? '加载中' : '没有更多了' }}</view>
				</view>
				<view class="list-img" v-else>
					<image class="img" src="../../static/addrss/nobg.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { _API_GetUserBalance } from '@/apis/user.js'
	export default {
		data() {
			return {
				list:'',
				page: 1,
				active: 0,
				requesting: false
			}
		},
		watch: {
			active: {
				handler(n)  {
					this.page = 1
					this.request()
				},
				immediate:true
			}
		},
		onReachBottom() {
			this.request()
		},
		methods: {
			request() {
				if (!this.requesting && this.page) {
					this.requesting = true
					this.$request(_API_GetUserBalance({ page: this.page, type: this.active }), ({ list, pagesize }) => {
						this.page == 1 ? this.list = list : this.list = [...this.list, ...list]
						list.length < pagesize ? this.page = 0 : this.page ++
					}).finally(() => this.requesting = false)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-balance {
		height: 100%;
		.balance-top{
			position: relative;
			background-color: #FFFFFF;
			width: 100%;
			.top-bg{
				width: 690rpx;
				height: 396rpx;
				position: absolute;
				top: 0;
				left: 30rpx;
				z-index: 0;
			}
			.money-wrap{
				position: relative;
				z-index: 1;
				color: #FFFFFF;
				padding: 20rpx 70rpx;
				display: flex;
				flex-flow: column;
				.money-text{
					font-size: 28rpx;
					margin-top: 74rpx;
				}
				.money-unm{
					font-size: 60rpx;
					margin-top: 10rpx;
					margin-bottom: 98rpx;
				}
				.mag-show{
					display: flex;
					flex-flow: row;
					justify-content: space-between;
					.show-balance{
						.name{
							padding-right: 10rpx;
						}
					}
				}
			}
		}
		.item{
			@include flex();
			margin-top: 80rpx;
			margin-bottom: 50rpx;
			.recharge{
				width: 270rpx;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				border-radius: 80rpx;
				color: #FFFFFF;
				@include flex();
				margin-right: 50rpx;
				background: -webkit-linear-gradient(to left, #FCA080, #FD524D);
				background: -o-linear-gradient(to left, #FCA080, #FD524D);
				background: -moz-linear-gradient(to left, #FCA080, #FD524D);
				background: linear-gradient(to left, #FCA080, #FD524D);
				.img1{
					width: 30rpx;
					height: 34rpx;
				}
				.img2{
					width: 34rpx;
					height: 34rpx;
				}
			}
			.withdraw{
				margin: 0;
				background: -webkit-linear-gradient(to left, #88A1FF, #6283FD);
				background: -o-linear-gradient(to left, #88A1FF, #6283FD);
				background: -moz-linear-gradient(to left, #88A1FF, #6283FD);
				background: linear-gradient(to left, #88A1FF, #6283FD);
			}
		}
		.list-log{
			.log-item{
				display: flex;
				justify-content: space-around;
				.active{
					color: #FF593D;
					@include flex(column);
					.line{
						display: inline-block;
						width: 30rpx;
						height: 6rpx;
						border-radius: 6rpx;
						background-color: #FF593D;
						margin-top: 10rpx;
					}
				}
			}
			.log-con{
				margin-top: 20rpx;
				padding: 10rpx 30rpx;
				.list-wrap{
					.list-item{
						padding: 10rpx 0;
						border-bottom: 1px solid #F5F5F5;
						display: flex;
						justify-content: space-between;
						align-items: center;
						flex-flow: row;
						.item-mage{
							display: flex;
							flex-flow: column;
							align-items: flex-start;
							line-height: 1.5;
							.title{
								font-size: 28rpx;
								color: #333333;
							}
							.time{
								font-size: 26rpx;
								color: #666666;
							}
						}
						.item-state{
							display: inline-block;
							padding: 0 8rpx;
							background: #d9d9d9;
							color: #333;
							font-size: 24rpx;
							border-radius: 4rpx;
						}
						.item-stated{
							display: inline-block;
							padding: 0 8rpx;
							background: #04ab02;
							color: #FFFFFF;
							font-size: 24rpx;
							border-radius: 4rpx;
						}
					}
				}
				.list-img{
					@include flex();
					margin-top: 30rpx;
					.img{
						width: 330rpx;
						height: 430rpx;
					}
				}
			}
		}
	}
</style>
