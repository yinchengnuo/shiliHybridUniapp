<template>
	<view class="subsidy-expected">
		<view class="fui-cell-group">
			<view class="fui-cell">
				<view class="fui-cell-info">预计补贴总计：+0元</view>
			</view>
		</view>
		<view class="content-wrap">
			<view class="log-item">
				<view class="external" :class="{ 'active': active == 0 }" @click="active = 0">
					<view>所有</view>
					<view class="line"></view>
				</view>
				<view class="external" :class="{ 'active': active == 1 }" @click="active = 1">
					<view>待付款</view>
					<view class="line"></view>
				</view>
				<view class="external" :class="{ 'active': active == 3 }" @click="active = 3">
					<view>已付款</view>
					<view class="line"></view>
				</view>
				<view class="external" :class="{ 'active': active == 2 }" @click="active = 2">
					<view>已完成</view>
					<view class="line"></view>
				</view>
			</view>
			<view class="list-con" v-if="list.length > 0">
				<view class="item" v-for="item in list" :key="item.id">
					<view class="uesr">
						<image class="phonte" :src="item.buyer.avatar" mode=""></image>
						<text class="name">{{item.buyer.nickname}}</text>
					</view>
					<view class="goods-list" v-for="item in item.order_goods" :key="item.goodsid">
						<view class="imgWrap">
							<image :src="item.thumb" mode=""></image>
						</view>
						<view class="goods-info">
							<view class="title">{{item.title}}</view>
							<view class="total">{{item.optionname}}x{{item.total}}</view>
						</view>
					</view>
					<view class="order-con">
						<view class="order-item">分销等级：{{item.level}}</view>
						<view class="order-item">订单编号：{{item.ordersn}}</view>
						<view class="order-item">订单时间：{{item.createtime}}</view>
					</view>
					<view class="goods-bottom">
						<view class="status">
							订单状态：{{item.status}}
						</view>
						<view class="money">预计佣金：{{item.commission_ok_sum}}</view>
					</view>
				</view>
			</view>
			<view class="list-img" v-else>
				<image class="img" src="../../static/addrss/nobg.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:0,
				list:'',
				data:[{
						commission_ok_sum: 11.99,
						createtime: "2020-06-15 15:53",
						id: "16650",
						level: "一级",
						ordersn: "SH20200615155310565284",
						rule: 2,
						status: "待付款",
						order_goods:[{
							goodsid: "4811",
							id: "23815",
							optionname: "银色",
							price: "1158.00",
							status1: "0",
							status2: "0",
							status3: "0",
							thumb: "https://dami.jinjiwu.cn/attachment/images/13/2020/06/luy5E5R85ZU5Mu85uq58bm8mQmmP0z.jpeg",
							title: "某猫同款 洛克兰夏威夷拉杆箱20英寸RLX-1012",
							total: "1"
						}],
						buyer:{
							nickname: "我就是我",
							avatar: "https://dami.jinjiwu.cn/attachment/images/13/2020/06/UK9NGa999An8Nk9988cvkvLs08lVqL.jpg"
						}
					},{
						commission_ok_sum: 11.99,
						createtime: "2020-06-15 15:53",
						id: "16650",
						level: "一级",
						ordersn: "SH20200615155310565284",
						rule: 2,
						status: "待付款",
						order_goods:[{
							goodsid: "4811",
							id: "23815",
							optionname: "银色",
							price: "1158.00",
							status1: "0",
							status2: "0",
							status3: "0",
							thumb: "https://dami.jinjiwu.cn/attachment/images/13/2020/06/luy5E5R85ZU5Mu85uq58bm8mQmmP0z.jpeg",
							title: "某猫同款 洛克兰夏威夷拉杆箱20英寸RLX-1012",
							total: "1"
						},{
							goodsid: "4811",
							id: "23815",
							optionname: "银色",
							price: "1158.00",
							status1: "0",
							status2: "0",
							status3: "0",
							thumb: "https://dami.jinjiwu.cn/attachment/images/13/2020/06/luy5E5R85ZU5Mu85uq58bm8mQmmP0z.jpeg",
							title: "某猫同款 洛克兰夏威夷拉杆箱20英寸RLX-1012",
							total: "1"
						}],
						buyer:{
							nickname: "我就是我",
							avatar: "https://dami.jinjiwu.cn/attachment/images/13/2020/06/UK9NGa999An8Nk9988cvkvLs08lVqL.jpg"
						}
					}
				]
			};
		},
		onLoad() {
			this.list=this.data
		}
	}
</script>

<style lang="scss" scoped>
.subsidy-expected{
	min-height: 100vh;
	background-color: #f3f3f3;
	.fui-cell-group{
		margin-top:0px;
		background: #fea23d;
		color: #fff;
		line-height: 1.4;
		font-size: 32rpx;
		overflow: hidden;
		position: relative;
		.fui-cell{
			position: relative;
			padding: 30rpx 24rpx 26rpx;
			display: flex;
			align-items: center;
			line-height: 1.2;
			.fui-cell-info{
				-webkit-box-flex: 1;
				-webkit-flex: 1;
				-ms-flex: 1;
				flex: 1;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				font-size: 28rpx;
				color: #FFFFFF;
			}
		}
	}
	.content-wrap{
		.log-item{
			display: flex;
			justify-content: space-around;
			background-color: #FFFFFF;
			padding: 20rpx 0;
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
		.list-con{
			.item{
				margin-top: 20rpx;
				background-color: #FFFFFF;
				.uesr{
					padding: 24rpx;
					display: flex;
					flex-flow: row;
					align-items: center;
					.phonte{
						width: 56rpx;
						height: 56rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}
					.name{
						max-width: 500rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 28rpx;
					}
				}
				.goods-list{
					display: flex;
					flex-flow: row;
					background-color: #f3f3f3;
					align-items: center;
					padding: 24rpx;
					margin-bottom: 10rpx;
					.imgWrap{
						width: 100rpx;
						height: 100rpx;
						background: #FFFFFF;
						border-radius: 20rpx;
						overflow: hidden;
						margin-right: 15rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.goods-info{
						display: flex;
						flex-flow: column;
						justify-content: center;
						.title{
							width: 550rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							font-size: 28rpx;
							color: #666;
						}
						.total{
							font-size: 24rpx;
							color: #999999;
							margin-top: 10rpx;
						}
					}
				}
				.order-con{
					font-size: 26rpx;
					color: #999999;
					padding:20rpx 24rpx;
					border-bottom: 1rpx solid #f3f3f3;
					.order-item{
						line-height: 1.5;
						padding: 5rpx 0;
					}
				}
				.goods-bottom{
					display: flex;
					flex-flow: row;
					justify-content: space-between;
					padding: 24rpx;
					font-size: 24rpx;
					font-weight: 600;
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
</style>
