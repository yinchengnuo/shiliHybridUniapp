<template>
	<view class="order">
		<view class="nav">
			<text class="back" @click="goBack"></text>
			<text class="title">我的订单</text>
			<text class="action" v-bind:class="{ 'active': isActive==5}" @click="recycle">回收站</text>
		</view>
		<view class="contert">
			<view class="log-item">
				<view class="external" v-bind:class="{ 'active': isActive==-1}" @click="recharge">
					<view>全部</view>
					<view class="line"></view>
				</view>
				<view class="external" v-bind:class="{ 'active': isActive==1}" @click="submitted">
					<view>待付款</view>
					<view class="line"></view>
				</view>
				<view class="external" v-bind:class="{ 'active': isActive==2}" @click="rebate">
					<view>待发货</view>
					<view class="line"></view>
				</view>
				<view class="external" v-bind:class="{ 'active': isActive==3}" @click="wait">
					<view>待收货</view>
					<view class="line"></view>
				</view>
				<view class="external" v-bind:class="{ 'active': isActive==4}" @click="finish">
					<view>待完成</view>
					<view class="line"></view>
				</view>
			</view>
			<view class="order-con">
				<view class="order-item" v-if="list.length>0">
					<view class="list-item" v-for="item in list" :key="item.id">
						<view class="goods-info" @click="$iRouter.push('/order-detail')">
							<view class="fui-list-group-title lineblock2 ">
								订单号: {{item.ordersn}}
								<span class="status text-cancel">{{item.statusstr}}</span>
							</view>
							<view class="fui-list goods-list" v-for="item in item.goods" :key="item.goodsid">
								<view class="fui-list-media">
									<image :src="item.thumb"></image>
								</view>
								<view class="fui-list-inner">
									<view class="text goodstitle towline">{{item.title}}</view>
									<view class="subtitle" style="color:#999;">{{item.optiontitle}}</view>
								</view>
								<view class="fui-list-angle">
									<span class="marketprice">¥{{item.price}}<span style="color: #999">x{{item.total}}</span></span>
								</view>
							</view>
							<div class="fui-list-group-title lineblock">
								<span class="status noremark">共 
									<span>{{item.goods_num}}</span> 个商品 实付: 
									<span class="text-danger">¥ <span class="bigprice">{{item.price}}</span>
									</span>
								</span>
							</div>
						</view>
						<view class="order-status" v-if="item.status==-1">
							<view class="status">
								删除订单
							</view>
						</view>
						<view class="order-status" v-if="isActive==-1">
							<view class="status">
								彻底删除订单
							</view>
						</view>
						<view class="order-status" v-if="isActive==-1">
							<view class="status">
								确认收货
							</view>
						</view>
						<view class="order-status" v-if="isActive==-1">
							<view class="status">
								申请退货
							</view>
						</view>
						<view class="order-status" v-if="isActive==-1">
							<view class="status">去评价</view>
						</view>
						<view class="order-status" v-if="item.status==0">
							<view class="status pay">支付订单</view>
							<view class="status">取消订单</view>
						</view>
					</view>
				</view>
				<view v-else class="none">
					<image class="nogoods" src="../../static/index/nogoods.png"></image>
					<view class="nogoods-text">您的购物车中没有商品哦！</view>
					<view class="nogoods-btn" @click="$iRouter.switchTab('/index')">去首页逛逛吧</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:'',
				isActive:-1,
				data:[{
					goods:[{
						title:"某猫同款 洛克兰夏威夷拉杆箱20英寸RLX-1012",
						total:'1',
						type:1,
						thumb: "https://dami.jinjiwu.cn/attachment/images/13/2020/06/Me80Zreg8KFre9x0WFg2t2mh08mN7e.jpeg?t=AL1larxLzL9Z0W6WU2y11l6ld5d9X912W5rLqY1KR10X2Lq1Xu",
						status:1,
						price:'1158.00',
						optiontitle:'银色',
						goodsid:'4811',
					}],
					goods_num:1,
					ordersn:'SH20200615155310565284',
					price:'218.90',
					statusstr:"待付款",
					status:0,
					id:16308
				},
				{
					goods:[{
						title:"某猫同款 洛克兰夏威夷拉杆箱20英寸RLX-1012",
						total:'1',
						type:1,
						thumb: "https://dami.jinjiwu.cn/attachment/images/13/2020/06/Me80Zreg8KFre9x0WFg2t2mh08mN7e.jpeg?t=AL1larxLzL9Z0W6WU2y11l6ld5d9X912W5rLqY1KR10X2Lq1Xu",
						status:1,
						price:'1158.00',
						optiontitle:'银色',
						goodsid:'4821',
					},{
						title:"某猫同款 洛克兰夏威夷拉杆箱20英寸RLX-1012",
						total:'1',
						type:1,
						thumb: "https://dami.jinjiwu.cn/attachment/images/13/2020/06/Me80Zreg8KFre9x0WFg2t2mh08mN7e.jpeg?t=AL1larxLzL9Z0W6WU2y11l6ld5d9X912W5rLqY1KR10X2Lq1Xu",
						status:1,
						price:'1158.00',
						optiontitle:'银色',
						goodsid:'4831',
					}],
					goods_num:1,
					ordersn:'SH20200615155310565284',
					price:'218.90',
					statusstr:"待付款",
					status:0,
					id:16650
				},
				{
					goods:[{
						title:"某猫同款 洛克兰夏威夷拉杆箱20英寸RLX-1012",
						total:'1',
						type:1,
						thumb: "https://dami.jinjiwu.cn/attachment/images/13/2020/06/Me80Zreg8KFre9x0WFg2t2mh08mN7e.jpeg?t=AL1larxLzL9Z0W6WU2y11l6ld5d9X912W5rLqY1KR10X2Lq1Xu",
						status:1,
						price:'1158.00',
						optiontitle:'银色',
						goodsid:'4841',
					}],
					goods_num:1,
					ordersn:'SH20200615155310565284',
					price:'218.90',
					statusstr:"已取消",
					status:-1,
					id:16651
				}],
				data1:[],
				data2:[]
			};
		},
		onLoad() {
			this.list=this.data
		},
		methods:{
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			recharge(){
				this.list=this.data
				this.isActive=-1
			},
			submitted(){
				this.list=this.data1
				this.isActive=1
			},
			rebate(){
				this.list=this.data1
				this.isActive=2
			},
			wait(){
				this.list=this.data
				this.isActive=3
			},
			finish(){
				this.list=this.data1
				this.isActive=4
			},
			recycle(){
				this.list=this.data2
				this.isActive=5
			},
		}
	}
</script>

<style lang="scss">
.order{
	min-height: 100%;
	background: #f3f3f3;
	border-top: 195rpx solid #FFFFFF;
	.nav{
		width: 100%;
		height: 100rpx;
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		justify-content: space-between;
		padding: 0 30rpx;
		line-height: 130rpx;
		background: #FFFFFF;
		border-bottom: 1px solid #f3f3f3;
		.back:after{
			content: " ";
			display: inline-block;
			-webkit-transform: rotate(-135deg);
			-ms-transform: rotate(-135deg);
			transform: rotate(-135deg);
			height: 18rpx;
			width: 18rpx;
			border-width: 3rpx 3rpx 0 0;
			border-color: #333333;
			border-style: solid;
			position: relative;
			top: 0px;
			margin-left: .1em;
		}
		.action{
			color: #999999;
		}
		.active{
			color: #FF593D;
		}
	}
	.contert{
		.log-item{
			display: flex;
			width: 100%;
			justify-content: space-around;
			padding: 20rpx 0;
			background-color: #FFFFFF;
			position: fixed;
			top: 100rpx;
			left: 0;
			z-index: 9999;
			border-bottom: 1px solid #f3f3f3;
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
		.order-con{
			.order-item{
				display: flex;
				flex-flow: column;
				justify-content: center;
				.list-item{
					display: flex;
					flex-flow: column;
					justify-content: center;
					background-color: #FFFFFF;
					margin-top: 20rpx;
					.goods-info{
						.fui-list-group-title{
							padding: 0 24rpx;
							color: #999;
							font-size: 24rpx;
							height: 80rpx;
							line-height: 80rpx;
							position: relative;
							.status{
								float: right;
								color: #666666;
								font-size: 26rpx;
							}
							.status:after{
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
						.fui-list-group-title.lineblock2:before{
							content: "";
							position: absolute;
							left: 20rpx;
							bottom: 0;
							right: 20rpx;
							height: 1px;
							border-top: 1px solid #ebebeb;
							-webkit-transform-origin: 0 100%;
							-ms-transform-origin: 0 100%;
							transform-origin: 0 100%;
							-webkit-transform: scaleY(0.5);
							-ms-transform: scaleY(0.5);
							transform: scaleY(0.5);
						}
						.fui-list{
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
							background-color: #FFFFFF;
							.fui-list-media{
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
								margin-right: 20rpx;
								color: #aaa;
								position: relative;
								image{
									width: 160rpx;
									height: 160rpx;
								}
							}
							.fui-list-inner{
								position: relative;
								width: 100%;
								height: 140rpx;
								overflow: hidden;
								box-sizing: border-box;
								display: -webkit-box;
								display: -webkit-flex;
								display: flex;
								-webkit-box-flex: 1;
								-webkit-flex: 1;
								-ms-flex: 1;
								flex: 1;
								flex-flow: column;
								.towline{
									color: #333333;
									font-size: 28rpx;
									line-height: 1.2;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 2;
									-webkit-box-orient: vertical;
									position: relative;
								}
								.subtitle{
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
									margin-top: 8rpx;
								}
							}
							.fui-list-angle{
								width: auto;
								height: 140rpx;
								align-self: center;
								font-size: 26rpx;
								text-align: right;
								margin-left: 20rpx;
								margin-right: 0;
								color: #333;
								.marketprice{
									display: flex;
									flex-flow: column;
								}
							}
						}
						.lineblock{
							color: #999;
							font-size: 24rpx;
							height: 80rpx;
							line-height: 80rpx;
							position: relative;
							padding: 0 24rpx;
							overflow: hidden;
							.status.noremark{
								height: 100%;
								font-size: 26rpx;
								display: -webkit-box;
								display: -webkit-flex;
								display: -ms-flexbox;
								display: flex;
								-webkit-box-align: center;
								-webkit-align-items: center;
								-ms-flex-align: center;
								align-items: center;
								-webkit-box-pack: end;
								-ms-flex-pack: end;
								-webkit-justify-content: flex-end;
								justify-content: flex-end;
								.text-danger{
									color: #ff5555;
									.bigprice{
										font-size: 30rpx;
									}
								}
							}
						}
						.lineblock:before{
							content: "";
							position: absolute;
							left: 20rpx;
							top: 0;
							right: 20rpx;
							height: 1px;
							border-top: 1px solid #ebebeb;
							-webkit-transform-origin: 0 100%;
							-ms-transform-origin: 0 100%;
							transform-origin: 0 100%;
							-webkit-transform: scaleY(0.5);
							-ms-transform: scaleY(0.5);
							transform: scaleY(0.5);
						}
					}
					.order-status{
						padding: 0 20rpx;
						font-size: 28rpx;
						color: #333;
						height: 96rpx;
						line-height: 96rpx;
						position: relative;
						overflow: hidden;
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
					.order-status:before{
						content: "";
						position: absolute;
						left: 20rpx;
						top: 0;
						right: 20rpx;
						height: 1px;
						border-top: 1px solid #ebebeb;
						-webkit-transform-origin: 0 100%;
						-ms-transform-origin: 0 100%;
						transform-origin: 0 100%;
						-webkit-transform: scaleY(0.5);
						-ms-transform: scaleY(0.5);
						transform: scaleY(0.5);
					}
				}
			}
			.none {
				height: 100%;
				padding-top: 120rpx;
				@include flex(column);
				.nogoods {
					width: 240rpx;
					height: 240rpx;
				}
				.nogoods-text {
					margin: 24rpx;
					color: #999999;
					font-size: 30rpx;
				}
				.nogoods-btn {
					@include flex();
					width: 280rpx;
					height: 80rpx;
					color: #ff5555;
					font-size: 30rpx;
					border-radius: 80rpx;
					border: 2px solid #ff5555;
				}
			}
		}
	}
}
</style>
