<template>
	<view class="comfirm-order">
		<view class="address" @click="chooseAddress">
		<!-- <view class="address"> -->
			<text class="cuIcon-location"></text>
			<view class="address-content">
				<view v-if="address" class="address-name">收货人： {{ address.realname }}{{ '    ' }}{{ address.mobile }}</view>
				<view v-if="address" class="address-addresss">{{ address | getAddress }}</view>
			</view>
			<text class="cuIcon-right"></text>
		</view>
		<view class="good-list">
			<view class="good-list-title"><text class="cuIcon-shop" style="margin-right: 8rpx;"></text>拾鲤助销平台</view>
			<view class="good-list-item" v-for="(item, index) in good_list" :key="index">
				<image class="good-list-item-img" :src="item.thumb"></image>
				<view class="good-list-item-info">
					<view class="left">
						<view class="name ellipsis2">{{ item.title }}</view>
						<view v-if="item.optiontitle" class="type">{{ item.optiontitle }}</view>
						<view class="market">原价：{{ item.marketprice }}</view>
					</view>
					<view class="right">
						<view class="price" style="font-size: 36rpx;">￥{{ item.ggprice }}</view>
						<num-input
							v-if="edit"
							:value="total"
							:min="+item.minbuy ? +item.minbuy : 1"
							:step="+item.minbuy ? +item.minbuy : 1"
							:max="+item.totalmaxbuy" 
							@change="numChange"
						/>
						<view v-else class="num">x{{ item.total }}</view>
						<view class="express" style="font-size: 24rpx; color: #999999;">运费：{{ express_list[index] || item.freightTotal }}</view>
					</view>
				</view>
			</view>
			<view v-if="send_list" class="small-total">
				共 <text class="price">{{ edit ? total : good_list.length }}</text> 件商品
				共计： <text class="price" style="font-size: 36rpx;">￥{{ totalprice }}</text>
			</view>
		</view>
		<template v-if="send_list">
			<view class="remark">
				<text>买家留言：</text>
				<textarea v-model="remark" auto-height maxlength="50" placeholder="50字以内(选填)" />
			</view>
			<view class="order-item">
				<text>商品小计：</text>
				<text>￥{{ cOrder.realprice }}</text>
			</view>
			<view class="order-item">
				<text>会员优惠：</text>
				<text>-￥{{ isNaN(cOrder.realprice - cOrder.price) ? '0' : (cOrder.realprice - cOrder.price).toFixed(2) }}</text>
			</view>
			<view style="background: #FF5555; font-size: 24rpx; line-height: 66rpx; text-align: center; color: #FFFFFF;">关于运费提示：如果您批量的宝贝中有【到付】，系统不自动计算！</view>
			<view class="order-item">
				<text>运费小计：</text>
				<text>￥{{ cOrder.price || '0' }}</text>
			</view>
		</template>
		<view class="submit">
			<view class="total">需付：<text class="price" style="font-size: 36rpx;">￥{{ +totalprice + (cOrder.price ? cOrder.price : 0) }}</text></view>
			<view class="paynow" @click="paynow">立即支付</view>
		</view>
	</view>
</template>

<script>
	import numInput from "@/components/num-input.vue"
	import { _API_BuyNow, _API_ReComputeOrder, _API_ComfirmOrderSubmit } from '@/apis/order.js'
	export default {
		components: { numInput },
		data() {
			return {
				total: 1,
				order: {},
				cOrder: {},
				remark: '',
				edit: false,
				good_list: [],
				send_list: null,
				choosedAddressID: '',
			}
		},
		computed: {
			address() { // 已选中的地址
				return this.$store.state.address.address.find(e => this.choosedAddressID ? e.id == this.choosedAddressID : e.isdefault == '1')
			},
			express_list() { // 重新计算后的运费列表
				return this.cOrder.fgtGoods ? this.cOrder.fgtGoods.map(e => e.freightTotal) : []
			},
			totalprice() { // 不含运费的实际价格
				if (this.edit) {
					if (this.good_list[0]) {
						const step = +this.good_list[0].minbuy ? +this.good_list[0].minbuy : 1
						return (this.total / step * this.good_list[0].ggprice).toFixed(2)
					} else {
						return 0
					}
				} else {
					return this.order.create_info ? this.order.create_info.realprice : 0
				}
			}
		},
		watch: {
			choosedAddressID(n) { // 地址变化重新请求运费
				if (this.send_list) { // 如果商品列表请求回来之后才执行
					this.reCompute()
				}
			}
		},
		onLoad({ id, total, optionid, addressid, freightTotal, freightType }) {
			if (id) { // 如果是从商品详情页，带着地址ID
				this.edit = true
				this.total = +total
				this.choosedAddressID = addressid
				console.log(id, total, optionid, freightTotal, freightType)
			}
			this.$request(_API_BuyNow({ id, total, optionid, freightTotal, freightType }), data => { // 请求商品列表
				this.order = data
				this.good_list = data.goods_list
				this.send_list = data.create_info.goods
				this.reCompute()
			}).catch(e => {
				uni.toast('购物车数据异常')
				this.$iRouter.pop()
			})
		},
		methods: {
			chooseAddress() { // 选择地址
				this.$iRoute.pushPop('/address-list', { choose: true }).then(({ id }) => this.choosedAddressID = id)
			},
			numChange(val) { // 商品数量发生变化
				this.total = val
				this.send_list[0].total = val
				this.reCompute()
			},
			reCompute() { // 重新计算订单
				this.$request(_API_ReComputeOrder({
					totalprice: this.order.create_info.realprice,
					addressid: this.address.id,
					dflag: 0,
					...this.$serializeArr(this.send_list, 'goods'),
					packageid: '0',
					liveid: '0',
					card_id: '0',
					freightTotal: this.order.create_info.freightTotal,
					freightType: this.order.create_info.goods[0].freightType
				}), data => this.cOrder = data)
			},
			paynow() {
				this.$request(_API_ComfirmOrderSubmit({
					addressid: this.address.id,
					...this.$serializeArr(this.send_list, 'goods'),
					freightTotal: this.express_list.reduce((t, e) => t + Number(e), 0)
				}), ({ orderid }) => this.$iRoute.push('/pay', { orderid }))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comfirm-order {
		min-height: 100vh;
		position: relative;
		background: #fafafa;
		padding-bottom: 118rpx;
		.submit {
			left: 0;
			bottom: 0;
			width: 100%;
			height: 98rpx;
			@include flex();
			position: fixed;
			background: #FFFFFF;
			justify-content: flex-end;
			border-top: 1rpx solid #EBEEF5;
			.paynow {
				height: 100%;
				width: 160rpx;
				color: #FFFFFF;
				@include flex();
				margin-left: 24rpx;
				background: #FF5555;
			}
		}
		.address {
			@include flex();
			min-height: 160rpx;
			position: relative;
			background: #FFFFFF;
			padding: 20rpx 30rpx;
			margin-bottom: 10rpx;
			box-sizing: border-box;
			> text {
				font-size: 36rpx;
				color: #999999;
			}
			.address-content {
				flex: 1;
				height: 100%;
				margin: 0 24rpx;
				@include flex(column);
				align-items: flex-start;
			}
		}
		.address::after {
			content: "";
			width: 100%;
			height: 10rpx;
			position: absolute;
			bottom: 0;
			background: url('../../static/index/order_line.png') repeat-x;
		}
		.good-list {
			box-sizing: border-box;
			.good-list-title {
				height: 60rpx;
				line-height: 60rpx;
				background: #FFFFFF;
				padding: 20rpx 30rpx;
				box-sizing: border-box;
			}
			.good-list-item {
				height: 200rpx;
				margin-top: 4rpx;
				@include flex();
				background: #FFFFFF;
				padding: 20rpx 30rpx;
				box-sizing: border-box;
				justify-content: space-between;
				.good-list-item-img {
					width: 160rpx;
					height: 160rpx;
				}
				.good-list-item-info {
					flex: 1;
					height: 100%;
					@include flex();
					margin-left: 24rpx;
					.left {
						flex: 1;
						height: 100%;
						@include flex(column);
						align-items: flex-start;
						justify-content: space-between;
						.type {
							color: #999999;
						}
						.market {
							color: #999999;
							font-size: 22rpx;
							text-decoration: line-through;
						}
					}
					.right {
						height: 100%;
						margin-left: 24rpx;
						@include flex(column);
						align-items: flex-end;
						justify-content: space-between;
					}
				}
			}
			.small-total {
				height: 98rpx;
				margin-top: 2rpx;
				text-align: right;
				padding:  0 30rpx;
				background: #FFFFFF;
				line-height: 98rpx;
				background: #FFFFFF;
				margin-bottom: 24rpx;
				box-sizing: border-box;
			}
		}
		.remark {
			@include flex();
			margin: 20rpx 0;
			padding: 0 30rpx;
			margin-top: 2rpx;
			min-height: 80rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			justify-content: space-between;
			> textarea {
				width: 520rpx;
				padding: 12rpx;
				font-size: 28rpx;
				min-height: 80rpx;
			}
		}
		.order-item {
			height: 80rpx;
			@include flex();
			padding: 0 30rpx;
			margin-top: 2rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			justify-content: space-between;
		}
	}
</style>
