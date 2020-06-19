<template>
	<view class="user">
		<view v-if="!$storage.openid" class="mask" @click="$iRouter.push('/login-psw')"></view>
		<view class="header">
			<image class="icon header-setting" src="../../static/index/userSettingIcon.png" @click="$iRouter.push('/member-info')"></image>
			<image class="icon header-erweiam" src="../../static/index/userErweimaIcon.png" @click="qrCode"></image>
			<view class="header-userinfo">
				<image class="header-userinfo-avatar" :src="userinfo.avatar"></image>
				<view class="header-userinfo-detail">
					<view class="header-userinfo-names">
						<view class="header-userinfo-nickname ellipsis">{{ userinfo.nickname }}</view>
						<view class="header-userinfo-levelname">{{ $storage.level_name }}</view>
					</view>
					<view class="header-userinfo-invite">
						<view class="header-userinfo-invitename">
							<image src="../../static/index/invitePeopleIcon.png"></image>
							<text class="ellipsis">邀请人:{{ userinfo.parent_name }}</text>
						</view>
						<view class="header-userinfo-invitecode">邀请码:{{ userinfo.id }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="money-card">
			<view class="money-card-item" @click="$shili('/commission.order', '预计补贴')">
				<text class="money-card-num">{{ userinfo.commission_ok }}</text>
				<text class="money-card-text">预计补贴(元)</text>
			</view>
			<text class="money-card-line"></text>
			<view class="money-card-item" @click="$iRouter.push('/my-balance')">
				<text class="money-card-num">{{ userinfo.credit2 }}</text>
				<text class="money-card-text">我的钱包(元)</text>
			</view>
			<text class="money-card-line"></text>
			<view class="money-card-item" @click="$iRouter.push('/creditshop')">
				<text class="money-card-num">{{ userinfo.credit1 }}</text>
				<text class="money-card-text">我的积分</text>
			</view>
		</view>
		<image v-if="+userinfo.level > 25" class="updataLevel" src="../../static/index/userUpdataLevel.png" @click="$shili('/membercard.index', { t: 1 })"></image>
		<!-- <image v-if="+userinfo.level > 25" class="updataLevel" src="../../static/index/userUpdataLevel.png" @click="$iRouter.push('/member-card')"></image> -->
		<view v-if="+userinfo.level > 25" class="money-running">
			<view class="money-running-title" @click="$shili('/commission.subsidy', '我的补贴')">
				<view class="money-running-title-text">我的补贴</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="money-running-line"></view>
			<view class="money-running-detail" @click="$shili('/commission.order', '预计补贴')">
				<image src="../../static/index/userCaiwuIcon.png"></image>
				<view class="money-running-detail-text">
					<text style="font-size: 28rpx; line-height: 1.4; font-weight: bold;">预计补贴(元)</text>
					<text style="font-size: 24rpx; color: #999999; margin-top: 6rpx;">满100.00元可提现</text>
				</view>
				<text>{{ userinfo.commission }}</text>
			</view>
			<view class="money-running-line"></view>
			<view class="money-running-detail" @click="$shili('/commission.log', '提现明细')">
				<image src="../../static/index/userTixianIcon.png"></image>
				<view class="money-running-detail-text">
					<text style="font-size: 28rpx; line-height: 1.4; font-weight: bold;">累计结算补贴(元)</text>
					<text style="font-size: 24rpx; color: #999999; margin-top: 6rpx;">提现明细</text>
				</view>
				<text>{{ userinfo.commission_total }}</text>
			</view>
		</view>
		<view class="orders">
			<view class="orders-title" @click="$shili('/order', '我的订单')">
				<view class="orders-title-text">我的采购</view>
				<view class="orders-title-more">查看全部订单 <text class="cuIcon-right"></text></view>
			</view>
			<view class="orders-line"></view>
			<view class="orders-type">
				<view class="orders-type-item" @click="$shili('/order', '我的订单', { status: 0 })">
					<image class="orders-type-item-img" src="../../static/index/userOrdersIcon1.png"></image>
					<text  class="orders-type-item-text">待付款</text>
				</view>
				<view class="orders-type-item" @click="$shili('/order', '我的订单', { status: 1 })">
					<image class="orders-type-item-img" src="../../static/index/userOrdersIcon2.png"></image>
					<text  class="orders-type-item-text">待发货</text>
				</view>
				<view class="orders-type-item" @click="$shili('/order', '我的订单', { status: 2 })">
					<image class="orders-type-item-img" src="../../static/index/userOrdersIcon3.png"></image>
					<text  class="orders-type-item-text">待收货</text>
				</view>
				<view class="orders-type-item" @click="$shili('/order', '我的订单', { status: 4 })">
					<image class="orders-type-item-img" src="../../static/index/userOrdersIcon4.png"></image>
					<text  class="orders-type-item-text">退换货</text>
				</view>
			</view>
		</view>
		<view class="customer">
			<view class="customer-title" @click="$shili('/member.my_memberlist', '我的会员')">
				<view class="customer-title-text">我的客户</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="customer-line"></view>
			<view class="customer-type">
				<view class="customer-type-item">
					<view style="color: #FFB4C2;">{{ userinfo.child_normal }}</view>
					<text>普通用户</text>
				</view>
				<view class="customer-type-item">
					<view style="color: #F4413A;">{{ userinfo.child_vip }}</view>
					<text>红鲤会员</text>
				</view>
				<view class="customer-type-item">
					<view style="color: #FFC600;">{{ userinfo.child_hehuo }}</view>
					<text>金鲤会员</text>
				</view>
				<view class="customer-type-item">
					<view style="color: #74DAFE;">{{ userinfo.child_svip }}</view>
					<text>营销中心</text>
				</view>
			</view>
		</view>
		<view class="my-tools">
			<view class="my-tools-title">
				<view class="my-tools-title-text">营销工具</view>
			</view>
			<view class="my-tools-line"></view>
			<view class="my-tools-type">
				<view class="my-tools-type-item" @click="uni.toast('敬请期待')">
					<image src="../../static/index/userToolsIcon1.png"></image>
					<text>普通用户</text>
				</view>
				<view class="my-tools-type-item" @click="uni.toast('敬请期待')">
					<image src="../../static/index/userToolsIcon2.png"></image>
					<text>积分商城</text>
				</view>
				<view class="my-tools-type-item" @click="$shili('/group', '抢乐购')">
					<image src="../../static/index/userToolsIcon3.png"></image>
					<text>抢乐购</text>
				</view>
				<view class="my-tools-type-item" @click="uni.toast('敬请期待')">
					<image src="../../static/index/userToolsIcon4.png"></image>
					<text>爆文拓客</text>
				</view>
				<view class="my-tools-type-item" @click="uni.toast('敬请期待')">
					<image src="../../static/index/userToolsIcon5.png"></image>
					<text>引流飞轮</text>
				</view>
				<view class="my-tools-type-item" @click="uni.toast('敬请期待')">
					<image src="../../static/index/userToolsIcon6.png"></image>
					<text>好友拼团</text>
				</view>
				<view class="my-tools-type-item" @click="uni.toast('敬请期待')">
					<image src="../../static/index/userToolsIcon7.png"></image>
					<text>砍价砍价</text>
				</view>
				<view class="my-tools-type-item" @click="$live">
					<image src="../../static/index/userToolsIcon8.png"></image>
					<text>拾鲤直播</text>
				</view>
			</view>
		</view>
		<view class="bottom-tools">
			<view class="bottom-tools-item" @click="$iRouter.push('/address-list')">
				<image src="../../static/index/userBottomToolsIcon1.png"></image>
				<text>收货地址</text>
			</view>
			<view class="bottom-tools-item" @click="$kefu">
				<image src="../../static/index/userBottomToolsIcon2.png"></image>
				<text>在线客服</text>
			</view>
			<view class="bottom-tools-item" @click="$shili('/diypage', '帮助中心', { id: 56 })">
				<image src="../../static/index/userBottomToolsIcon3.png"></image>
				<text>帮助中心</text>
			</view>
			<view class="bottom-tools-item" @click="$shili('/order', '我的订单', { status: 4 })">
				<image src="../../static/index/userBottomToolsIcon4.png"></image>
				<text>售后退款</text>
			</view>
		</view>
		<!-- <view class="others">
			<view class="others-item">
				<view class="others-item-left">
					<image src="../../static/index/userOthersIcon1.png"></image>
					<text>商家信息</text>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="others-line"></view>
			<view class="others-item">
				<view class="others-item-left">
					<image src="../../static/index/userOthersIcon2.png"></image>
					<text>店铺会员管理</text>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="others-line"></view>
			<view class="others-item">
				<view class="others-item-left">
					<image src="../../static/index/userOthersIcon3.png"></image>
					<text>实体商品管理</text>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="others-line"></view>
			<view class="others-item">
				<view class="others-item-left">
					<image src="../../static/index/userOthersIcon4.png"></image>
					<text>我的广告</text>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="others-line"></view>
			<view class="others-item">
				<view class="others-item-left">
					<image src="../../static/index/userOthersIcon5.png"></image>
					<text>售后处理</text>
				</view>
				<text class="cuIcon-right"></text>
			</view>
		</view> -->
		<view class="logout" @click="$store.commit('user/LOGOUT');$iRouter.switchTab('/index');uni.LOGCHANGED = true;">退出登录</view>
	</view>
</template>

<script>
	import { _API_GetUserQrCode } from '../../apis/user.js'
	export default {
		computed: {
			userinfo() {
				return this.$store.state.user.userinfo
			}
		},
		created() {
			uni.loading()
		},
		onReady() {
			uni.uloading()
		},
		onPullDownRefresh() { // 下拉刷新
			this.$store.dispatch('user/getUserInfo').then(() => uni.stopPullDownRefresh()).finally(() => console.log(this.userinfo))
		},
		onShow() {
			if (!this.$storage.openid) {
				if (!uni.FROMLOGIN) { // 如果用户未登录，跳转到登录页面
					this.$iRouter.push('/login-psw')
				}
			} else {
				this.$store.dispatch('cart/getCart') // 更新购物车
			}
		},
		methods: {
			qrCode() {
				this.$request(_API_GetUserQrCode(), ({ img }) => uni.previewImage({ urls: [img] }))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user {
		position: relative;
		background: #F9F9FA;
		padding-bottom: 20rpx;
		.mask {
			top: 0;
			left: 0;
			z-index: 666;
			width: 100vw;
			height: 100vh;
			position: fixed;
		}
		.header {
			height: 400rpx;
			position: relative;
			margin-bottom: 70rpx;
			box-sizing: border-box;
			padding: 120rpx 40rpx 160rpx;
			background:linear-gradient(270deg,rgba(236,92,61,1) 0%,rgba(241,71,61,1) 100%);
			> image {
				position: absolute;
				&.header-bg {
					top: 0;
					left: 0;
					width: 100%;
					// z-index: 0;
					height: 100%;
					position: absolute;
				}
				&.icon {
					top: 70rpx;
					width: 40rpx;
					height: 40rpx;
					right: 40rpx;
					&.header-erweiam {
						right: 120rpx;
					}
				}
			}
			.header-userinfo {
				height: 100%;
				@include flex();
				justify-content: space-between;
				.header-userinfo-avatar {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}
				.header-userinfo-detail {
					flex: 1;
					height: 100%;
					@include flex(column);
					justify-content: space-evenly;
					.header-userinfo-names {
						width: 100%;
						@include flex();
						justify-content: flex-start;
						.header-userinfo-nickname {
							color: #FFFFFF;
							font-size: 36rpx;
							max-width: 240rpx;
						}
						.header-userinfo-levelname {
							height: 36rpx;
							@include flex();
							padding: 0 12rpx;
							font-size: 24rpx;
							margin-left: 12rpx;
							background: #FFFFFF;
							border-radius: 36rpx;
							color: rgb(254, 62, 44);
						}
					}
					.header-userinfo-invite {
						width: 100%;
						@include flex();
						justify-content: flex-start;
						.header-userinfo-invitename, .header-userinfo-invitecode {
							height: 48rpx;
							@include flex();
							color: #FFFFFF;
							font-size: 22rpx;
							padding: 0 24rpx;
							margin-right: 10rpx;
							border-radius: 48rpx;
							justify-content: flex-start;
							background: rgba(0, 0, 0, .3);
							image {
								width: 22rpx;
								height: 20rpx;
								margin-right: 12rpx;
							}
							text {
								max-width: 240rpx;
							}
						}
					}
				}
			}
		}
		.money-card {
			left: 20rpx;
			top: 290rpx;
			width: 710rpx;
			height: 160rpx;
			@include flex();
			position: absolute;
			background: #FFFFFF;
			border-radius: 16rpx;
			box-sizing: border-box;
			padding: 40rpx 0 18rpx 0;
			.money-card-line {
				width: 2rpx;
				height: 100%;
				background: #F4F4F4;
			}
			.money-card-item {
				flex: 1;
				height: 100%;
				@include flex(column);
				.money-card-num {
					color: #FE3E2C;
					font-size: 36rpx;
					margin-bottom: 6rpx;
				}
				.money-card-text {
					font-size: 20rpx;
				}
			}
		}
		.updataLevel {
			width: 710rpx;
			height: 170rpx;
			margin: 0 20rpx 20rpx;
		}
		.money-running {
			width: 710rpx;
			height: 388rpx;
			background: #FFFFFF;
			@include flex(column);
			border-radius: 16rpx;
			margin: 0 20rpx 20rpx;
			box-sizing: border-box;
			.money-running-title {
				width: 100%;
				height: 98rpx;
				@include flex();
				padding: 0 30rpx;
				justify-content: space-between;
				.money-running-title-text {
					font-size: 32rpx;
					font-weight: bold;
				}
			}
			.money-running-line {
				height: 2rpx;
				width: 650rpx;
				background: #F3F3F3;
			}
			.money-running-detail {
				flex: 1;
				width: 100%;
				@include flex();
				padding: 30rpx;
				box-sizing: border-box;
				align-items: flex-start;
				justify-content: space-between;
				.money-running-detail-text {
					flex: 1;
					height: 100%;
					margin-left: 10rpx;
					@include flex(column);
					align-items: flex-start;
					justify-content: flex-start;
				}
				> image {
					width: 34rpx;
					height: 34rpx;
				}
				> text {
					font-size: 38rpx;
					font-weight: bold;
				}
			}
		}
		.orders {
			width: 710rpx;
			height: 266rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			margin: 0 20rpx 20rpx;
			@include flex(column);
			justify-content: space-between;
			.orders-title {
				width: 100%;
				height: 98rpx;
				@include flex();
				padding: 0 30rpx;
				justify-content: space-between;
				.orders-title-text {
					font-size: 32rpx;
					font-weight: bold;
					
				}
				.orders-title-more {
					color: #999999;
					font-size: 24rpx;
				}
			}
			.orders-line {
				height: 2rpx;
				width: 650rpx;
				background: #F3F3F3;
			}
			.orders-type {
				flex: 1;
				width: 100%;
				@include flex();
				.orders-type-item {
					flex: 1;
					height: 100%;
					@include flex(column);
					.orders-type-item-img {
						width: 54rpx;
						height: 54rpx;
					}
					.orders-type-item-text {
						font-size: 28rpx;
						margin-top: 16rpx;
					}
				}
			}
		}
		.customer {
			width: 710rpx;
			height: 232rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			margin: 0 20rpx 20rpx;
			@include flex(column);
			justify-content: space-between;
			.customer-title {
				width: 100%;
				height: 98rpx;
				@include flex();
				padding: 0 30rpx;
				justify-content: space-between;
				.customer-title-text {
					font-size: 32rpx;
					font-weight: bold;
					
				}
			}
			.customer-line {
				height: 2rpx;
				width: 650rpx;
				background: #F3F3F3;
			}
			.customer-type {
				flex: 1;
				width: 100%;
				@include flex();
				.customer-type-item {
					flex: 1;
					height: 100%;
					@include flex(column);
					> view {
						font-size: 40rpx;
						font-weight: bold;
					}
					> text {
						font-size: 24rpx;
						margin-top: 8rpx;
					}
				}
			}
		}
		.my-tools {
			width: 710rpx;
			height: 390rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			margin: 0 20rpx 20rpx;
			@include flex(column);
			justify-content: space-between;
			.my-tools-title {
				width: 100%;
				height: 98rpx;
				@include flex();
				padding: 0 30rpx;
				justify-content: space-between;
				.my-tools-title-text {
					font-size: 32rpx;
					font-weight: bold;
					
				}
			}
			.my-tools-line {
				height: 2rpx;
				width: 650rpx;
				background: #F3F3F3;
			}
			.my-tools-type {
				flex: 1;
				width: 100%;
				@include flex();
				flex-wrap: wrap;
				.my-tools-type-item {
					width: 25%;
					height: 50%;
					@include flex(column);
					> image {
						width: 50rpx;
						height: 50rpx;
					}
					> text {
						font-size: 24rpx;
						margin-top: 12rpx;
					}
				}
			}
		}
		.bottom-tools {
			width: 710rpx;
			height: 140rpx;
			@include flex();
			background: #FFFFFF;
			border-radius: 16rpx;
			margin: 0 20rpx 20rpx;
			.bottom-tools-item {
				flex: 1;
				height: 100%;
				@include flex(column);
				> image {
					width: 56rpx;
					height: 56rpx;
				}
				> text {
					font-size: 24rpx;
					margin-top: 12rpx;
				}
			}
		}
		.others {
			width: 710rpx;
			height: 500rpx;
			margin: 0 20rpx 20rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			@include flex(column);
			.others-item {
				flex: 1;
				width: 100%;
				@include flex();
				padding: 0 30rpx;
				box-sizing: border-box;
				justify-content: space-between;
				.others-item-left {
					@include flex();
					> image {
						width: 30rpx;
						height: 30rpx;
						margin-right: 20rpx;
					}
					> text {
						font-size: 28rpx;
					}
				}
				> text {
					color: #999999;
					font-size: 24rpx;
				}
			}
			.others-line {
				height: 2rpx;
				width: 610rpx;
				background: #F3F3F3;
			}
		}
		.logout {
			width: 710rpx;
			height: 80rpx;
			@include flex();
			margin: 0 20rpx;
			color: #FFFFFF;
			font-size: 36rpx;
			color: #FFFFFF;
			background: #ff5555;
			border-radius: 16rpx;
		}
	}
</style>
