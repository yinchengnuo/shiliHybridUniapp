<template>
	<view class="good-detail">
		<view class="back" @click="$iRouter.pop()">
			<image class="back-img" src="../../static/goodsDetail/back.png"></image>
		</view>
		<view class="qr" @click="uni.previewImage({ urls: [good.goodscode] })">
			<image class="qr-img" src="../../static/goodsDetail/erweima.png"></image>
		</view>
		<view class="kefu" @click="$kefu">
			<image class="kefu-img" src="../../static/goodsDetail/kefu.png"></image>
		</view>
		<view class="goods-content">
			<!-- 商品轮播图 -->
			<view class="goods-swiper">
				<swiper class="swiper" indicator-dots indicator-active-color="#ff5555" autoplay circular  :interval="4567" :duration="345">
					<swiper-item v-for="(item, index) in good.swipe" :key="index">
						<view class="swiper-item">
							<image class="swiper-item-img" :src="item"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 商品信息 -->
			<view class="goods-info">
				<!-- <view v-if="good.sale && good.sale.msg" class="up">
					<image class="mem-bg" src="../../static/goodsDetail/gbg.png"></image>
					<image class="logo-img" src="../../static/goodsDetail/liyuanquanjianpan.png"></image>
					<view class="up-text">升级{{ good.sale.msg.option.levelname }}可享受<text class="red">￥{{ good.sale.msg.option.price }}</text>的价格</view>
					<image class="up-img" src="../../static/goodsDetail/upgrade.png"></image>
					<text class="upgrade">立即升级</text>
				</view> -->
				<view class="title-wrap">
					<view v-if="good.info" class="title">{{ good.info.title }}</view>
					<view class="share" @click="share({
						type: 0,
						title: good.info.title,
						summary: good.info.subtitle,
						imageUrl: good.swipe[0],
						href: 'https://dami.jinjiwu.cn/app/index.php?i=13&c=entry&m=ewei_shopv2&do=mobile&r=goods.detail&id=' + id
					})">
						<image class="share-img" src="../../static/goodsDetail/fenxiang.png"></image>
						<text class="text">分享</text>
					</view>
				</view>
				<view class="goods-price">
					<view class="price-left">
						<view class="red-price">
							<view class="flex-row">
								<text v-if="good.info" class="price">{{ good.info.red.price }}</text>
								<text class="name">红鲤专享价</text>
							</view>
						</view>
						<view class="red-price glord-price">
							<view class="flex-row">
								<text v-if="good.info" class="price">{{ good.info.gold.price }}</text>
								<image class="glord-bg" src="../../static/goodsDetail/jinli.png"></image>
							</view>
						</view>
					</view>
					<view class="marketprice-wrap">
						<text  v-if="good.info" class="marketprice">原价 {{ good.info.price }}</text>
						<text  v-if="good.info" class="sales">销量：{{ good.info.sales }}</text>
					</view>
				</view>
				<view v-if="good.info && good.info.subtitle" class="tip">注明：{{ good.info.subtitle }}</view>
			</view>
			<view class="goods-num">
				<view class="goods-item" @click="chooseAddress">
					<text class="item-text">送至</text>
					<view>
						<text v-if="address" class="item-num">{{ address | getAddress | sliceStr(20) }}</text>
						<text v-else class="item-num">请添加地址</text>
						<text class="cuIcon-right"></text>
					</view>
				</view>
				<view class="goods-item" @click="chooseExpress">
					<text class="item-text">运费</text>
					<view class="item-num">
						<text class="num-color">{{ expressMoney }}</text>
					</view>
				</view>
				<view v-if="expressMoney != '到付'" class="goods-item last" @click="chooseExpress">
					<text class="item-text">运费规则</text>
					<view style="font-size: 24rpx; max-width: 456rpx;">{{ expressRule }}</view>
				</view>
			</view>
			<!-- 商品详情 -->
			<view class="pic-detail">
				<view class="pic-title">商品详情</view>
				<rich-text :nodes="good.content"></rich-text>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="bottom-left">
				<view class="attention" @click="() => uni.toast('关注')">
					<image class="imgWrap" src="../../static/goodsDetail/xihuan.png"></image>
					<text class="text">关注</text>
				</view>
				<view class="attention" @click="$iRouter.switchTab('/index')">
					<image class="imgWrap" src="../../static/goodsDetail/dianpu.png"></image>
					<text class="text">店铺</text>
				</view>
				<view class="attention" @click="toCart">
					<image class="imgWrap" src="../../static/goodsDetail/gouwuche.png"></image>
					<text class="text">购物车</text>
					<view v-if="+cart.total" class="cartnum">{{ cart.total }}</view>
				</view>
			</view>
			<view class="bottom-right">
				<view class="add-cart" @click="addCart">加入购物车</view>
				<view class="buy-now" @click="buyNow">立即购买</view>
			</view>
		</view>
		
		<view v-if="showSelectBar" class="selectBar" @click="showSelectBar = false">
			<view class="selectBarContent" @click.stop="">
				<view class="selectBarContentHeader">
					<image class="picker-img" :src="choosedTypeID ? good.picker.detail.find(e => e.id == choosedTypeID).thumb : good.picker.img"></image>
					<view class="good-info">
						<text class="price">{{ good.info.price }}</text>
						<text v-if="good.picker.detail">{{ choosedTypeID ? ('已选' + good.picker.detail.find(e => e.id == choosedTypeID).title) : '请选择规格' }}</text>
					</view>
					<text class="cuIcon-close" @click="showSelectBar = false"></text>
				</view>
				<view v-if="good.picker.detail" class="good-type">
					<view class="good-type-title">规格</view>
					<view
						class="good-type-item" 
						v-for="(item, index) in good.picker.detail" :key="index"
						:class="{ active: item.id == choosedTypeID }"
						@click="choosedTypeID = good.picker.detail[index].id"
					>{{ item.title }}</view>
				</view>
				<view class="good-num" v-if="picker">
					<text>数量</text>
					<num-input :value="choosedNum" :min="+picker.goods.minbuy" :max="+picker.goods.total" :step="+picker.goods.minbuy" @change="e => choosedNum = e" />
				</view>
				
				<view class="express-type" v-if="this.good.freights_isshow == 1">
					<view class="express-type-title">选择快递</view>
					<view
						class="express-type-item"
						v-for="(item, key) in express.data" :key="key"
						:class="{ active: key == choosedExpressID }"
						@click="choosedExpressID = key"
						v-if="express.RemoteAreas == 1 ? (item.value && item.name == 'commonRemoteFreight') : (item.value && item.name != 'commonRemoteFreight')"
					>{{ item.name | getExpressName }}</view>
				</view>
				
				<view class="express-money">
					<text>运费</text>
					<view class="price">{{ expressMoney }}</view>
				</view>
				
				<view class="express-rule" v-if="expressMoney != '到付'">
					<text>运费计算规则</text>
					<view style="font-size: 24rpx; max-width: 456rpx;">{{ expressRule }}</view>
				</view>
				<view class="comfirm" @click="submit">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import _share from '../../utils/share.js'
	import { _API_CartAdd } from '@/apis/cart.js'
	import numInput from "@/components/num-input.vue"
	import { _API_ComfirmOrder } from '@/apis/order.js'
	import { _API_GetGoodDetail, _API_GetGoodExpress, _API_GetGoodSelect } from '@/apis/good.js'
	export default {
		components: { numInput },
		data() {
			return {
				share: _share,
				id: '',
				choosedNum: 1,
				choosedTypeID: '',
				choosedAddressID: '',
				choosedExpressID: '',
				showSelectBar: false,
				good: {},
				pickerType: 0,
				picker: null,
				express: {},
			}
		},
		filters: {
			getExpressName(name) {
				switch (name) {
					case 'commonExpress': 
						return '普通快递'
					case 'debangExpress':
						return '德邦快递'
					case 'debangLogistics':
						return '德邦物流'
					case 'commonLogistics':
						return '普通物流'
					case 'commonRemoteFreight':
						return '偏远地区'
					default:
						return '到付'
				}
			}
		},
		computed: {
			address() {
				const res = this.$store.state.address.address.find(e => this.choosedAddressID ? e.id == this.choosedAddressID : e.isdefault == '1')
				this.choosedAddressID = res ? res.id : ''
				return res
			},
			cart() {
				return this.$store.state.cart
			},
			expressMoney() { // 根据选择的物流计算快递费
				if (this.good.freights_isshow == 1) {
					if (this.choosedExpressID == 1 || this.choosedExpressID == 2 || this.choosedExpressID == 5) { // 普通快递  普通物流  偏远地区
						const item = this.express.data[this.choosedExpressID].value
						return +this.good.calculatetype ? 
						`${this.$options.filters.getExpressName(this.express.data[this.choosedExpressID].name)} ￥${(item.default_firstnum * item.default_firstnumprice + (this.choosedNum - 1) * item.default_secondnum * item.default_secondnumprice).toFixed(2)}` : 
						`${this.$options.filters.getExpressName(this.express.data[this.choosedExpressID].name)} ￥${(1 * item.default_firstprice + (this.choosedNum - 1) * item.default_secondprice).toFixed(2)}`
					} else if (this.choosedExpressID == 3 || this.choosedExpressID == 4) { // 德邦快递  德邦物流
						const item = this.express.data[this.choosedExpressID].value
						const weight = + this.good.goos_weight / 1000
						// console.log(weight)
						return `${this.$options.filters.getExpressName(this.express.data[this.choosedExpressID].name)} ￥${(item.groundPrice + (weight > item.lowerOfStage1 ? (weight - item.lowerOfStage1) * item.rateOfStage1 : 0)).toFixed(2)}`
					} else if (this.choosedExpressID == 6) { // 到付
						return '到付'
					} else {
						return '请选择快递方式'
					}
				} else {
					return '到付'
				}
			},
			expressRule() {
				if (this.choosedExpressID) {
					if (this.choosedExpressID == 1 || this.choosedExpressID == 2 || this.choosedExpressID == 5) { // 普通快递  普通物流
						const item = this.express.data[this.choosedExpressID].value
						return +this.good.calculatetype ? 
						`${item.default_firstnum}件费用：${item.default_firstnumprice}元；每增加${item.default_secondnum}件是${item.default_secondnumprice}元` : 
						`首重：${item.default_firstweight}公斤，费用：${item.default_firstprice}元；每续重${item.default_secondweight}公斤是${item.default_secondprice}元`
					} else if (this.choosedExpressID == 3 || this.choosedExpressID == 4) {
						const item = this.express.data[this.choosedExpressID].value
						return `首重：${item.upperGround}公斤，费用：${item.groundPrice}元；续重每公斤是${item.rateOfStage1}元`
					}
				} else {
					return '请选择快递方式'
				}
			}
		},
		watch: {
			choosedAddressID(n) { // 选择地址发生变化，运费随之发生变化
				this.$request(_API_GetGoodExpress({ id: this.id, addressid: this.choosedAddressID }), data => {
					data.data[6] ? data.data[6].value = 1 : ''
					this.express = data
					this.choosedExpressID = ''
					if (this.express.RemoteAreas == 1) {
						this.choosedExpressID = 5
					}
				})
			},
			showSelectBar(n) { // 显示 picker 弹窗
				if (n && !this.picker) {
					this.$request(_API_GetGoodSelect({ id: this.id }), data => {
						this.picker = data
						this.choosedNum = +this.picker.goods.minbuy
					})
				}
			}
		},
		onLoad({ id }) { // 获取商品信息
			this.id = id
			this.$request(_API_GetGoodDetail({ id }), data => this.good = data)
			// .then(({ data }) => console.log(data))
		},
		onBackPress() { // 返回时收起分享
			if (uni._SHARE && uni._SHARE.isVisible()) {
				uni._MASK.hide()
				uni._SHARE.hide()
				return true
			}
			if (this.showSelectBar) {
				this.showSelectBar = false
				return true
			}
		},
		methods:{
			chooseAddress() { // 点击选择地址
				if (!this.$storage.openid) { // 如果用户未登录，就登陆
					this.$iRoute.push('/login-psw')
					return
				}
				this.$iRoute.pushPop('/address-list', { choose: true }).then(({ id }) => this.choosedAddressID = id)
			},
			chooseExpress() { // 点击选择运费
				if (!this.$storage.openid) { this.$iRoute.push('/login-psw'); return } // 如果用户未登录，就登陆
				if (!this.address) { uni.toast('请添加地址后才可以操作'); this.$iRoute.push('/address-list'); return } // 如果未选择地址，无法操作
				if (this.express.RemoteAreas == 1) { return } // 如果用户是偏远地区，点击无效
				if (this.good.freights_isshow == 1) { // 如果不是包邮就显示选择框
					this.pickerType = 3
					this.showSelectBar = true
				}
			},
			toCart() { // 点击购物车
				if (!this.$storage.openid) { this.$iRoute.push('/login-psw'); return } // 如果用户未登录，就登陆
				this.$iRoute.switchTab('/cart')
			},
			buyNow() { // 立即购买
				if (!this.$storage.openid) { this.$iRoute.push('/login-psw'); return } // 如果用户未登录，就登陆
				if (!this.address) { uni.toast('请添加地址后才可以操作'); this.$iRoute.push('/address-list'); return } // 如果未选择地址，无法操作
				this.pickerType = 1
				this.showSelectBar = true
			},
			addCart() { // 加入购物车
				if (!this.$storage.openid) { this.$iRoute.push('/login-psw'); return } // 如果用户未登录，就登陆
				if (!this.address) { uni.toast('请添加地址后才可以操作'); this.$iRoute.push('/address-list');  return } // 如果未选择地址，无法操作
				this.pickerType = 2
				this.showSelectBar = true
			},
			submit() { // picker 点击确定
				if (this.pickerType == 1) { // 如果是立即购买
					if (this.good.picker.detail && !this.choosedTypeID) { uni.toast('请选择商品规格'); return }
					if (this.good.freights_isshow == 1 && !this.choosedExpressID) { uni.toast('请选择配送方式'); return }
					this.$iRouter.push('/order-comfirm', { 
						id: this.id,
						total: this.choosedNum,
						addressid: this.address.id,
						optionid: this.choosedTypeID,
						freightType: this.choosedExpressID,
						freightTotal: this.expressMoney.replace('￥', '')
					})  
				} else if (this.pickerType == 2) { // 如果是加入购物车
					if (this.good.picker.detail && !this.choosedTypeID) {
						uni.toast('请选择商品规格')
						return
					}
					if (this.good.freights_isshow == 1 && !this.choosedExpressID) {
						uni.toast('请选择配送方式')
						return
					}
					this.$request(_API_CartAdd({
						id: this.id,
						optionid: this.choosedTypeID,
						total: this.choosedNum,
						diyformdata: false,
						freightTotal: this.expressMoney.replace('￥', ''),
						freightType: this.choosedExpressID
					}), () => {
						uni.toast('添加成功')
						this.showSelectBar = false
						this.$store.dispatch('cart/getCart')
					})
				} else if (this.pickerType == 3) { // 如果点击运费
					this.showSelectBar = false
				}
			}
		}
	}
</script>

<style lang="scss">
	.good-detail{
		font-family: PingFangSC-Regular, sans-serif;
		background-color: #f3f3f3;
		min-height: 100%;
		padding-bottom: 120rpx;
		.back{
			z-index: 2;
			top: 60rpx;
			left: 30rpx;
			width: 64rpx;
			height: 64rpx;
			position: fixed;
			overflow: hidden;
			.back-img{
				width: 100%;
				height: 100%;
			}
		}
		.qr{
			position: fixed;
			top: 60rpx;
			right: 30rpx;
			z-index: 2;
			.qr-img{
				width: 90rpx;
				height: 90rpx;
			}
		}
		.kefu{
			position: fixed;
			bottom: 146rpx;
			right: 30rpx;
			z-index: 2;
			.kefu-img{
				width: 90rpx;
				height: 90rpx;
			}
		}
		.goods-content {
			.goods-swiper{
				width: 750rpx;
				height: 750rpx;
				position: relative;
				.swiper {
					height: 100%;
					overflow: hidden;
					.swiper-item {
						height: 100%;
						.swiper-item-img {
							width: 100%;
							height: 100%;
						}	
					}
				}
			}
			.goods-info{
				width: 100%;
				z-index: 1;
				position: relative;
				padding: 24rpx 30rpx ;
				background-color: #FFFFFF;
				.up{
					width: 690rpx;
					height: 72rpx;
					margin: 0 auto;
					display: flex;
					flex-flow: row;
					position: relative;
					align-items: center;
					.mem-bg{
						width: 100%;
						height: 100%;
						position: absolute;
						top: 0;
						left: 0;
						z-index: -2;
					}
					.logo-img{
						width: 42.7rpx;
						height: 40rpx;
						margin-left: 26rpx;
						margin-right: 18rpx;
					}
					.up-text{
						color: #333333;
						font-size: 28rpx;
						.red{
							color: #FE3E2C;
							letter-spacing:.05em;
						}
					}
					.up-img{
						width: 22rpx;
						height: 24rpx;
						margin-left: 60rpx;
						margin-right: 6rpx;
					}
					.upgrade{
						color: #FFFFFF;
						font-size: 28rpx;
					}
				}
				.title-wrap{
					@include flex();
					margin-top: 20rpx;
					.title{
						width: 608rpx;
						font-size: 32rpx;
						line-height: 44rpx;
						color: #333333;
					}
					.share{
						@include flex(column);
						.share-img{
							width: 36rpx;
							height: 36rpx;
						}
						.text{
							font-size: 24rpx;
							color: #FE3E2C;
						}
					}
				}
				.goods-price{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					.price-left{
						.red-price{
							color: #FE3E2C;
							display: flex;
							flex-flow: row;
							align-items: flex-end;
							.flex-row{
								display: flex;
								flex-flow: row;
								align-items: flex-start;
								.price{
									font-size: 36rpx;
								}
								.name{
									font-size: 24rpx;
									margin-left: 10rpx;
									padding-top: 10rpx;
								}
							}
						}
						.glord-price{
							color: #333333;
							.flex-row{
								display: flex;
								flex-flow: row;
								align-items: center;
								.price{
									color: #333333;
								}
								.glord-bg{
									width: 120rpx;
									height: 36rpx;
									margin-left: 10rpx;
								}
							}
						}
					}
					.marketprice-wrap{
						display: flex;
						flex-flow: column;
						align-content: space-between;
						color: #999999;
						font-size: 24rpx;
						height: 100%;
						.marketprice{
							margin-bottom: 10rpx;
							text-decoration: line-through;
						}
					}
				}
				.tip{
					width: 100%;
					color: #333333;
					font-size: 24rpx;
					background-color: #EEEEEE;
					padding: 26rpx;
					border-radius: 16rpx;
					margin-top: 20rpx;
				}
			}
			.goods-num{
				background: #FFFFFF;
				margin-top: 20rpx;
				padding: 0rpx 30rpx;
				.goods-item{
					display: flex;
					flex-flow: row;
					justify-content: space-between;
					padding: 20rpx 0;
					border-bottom: 1px solid #f5f5f5;
					.item-text{
						color: #333333;
						font-family: PingFangSC-Semibold, sans-serif;
						font-weight: 600;
					}
					.item-num{
							max-width: 567rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						.subtract{
							display: inline-block;
							background-color: #EEEEEE;
							width: 40rpx;
							height: 40rpx;
							font-size: 28rpx;
							text-align: center;
							line-height: 38rpx;
							color: #666666;
						}
						.num{
							padding: 0 30rpx;
							font-size: 28rpx;
						}
						.num-color{
							color: #FE3E2C;
						}
						.fui-cell-remark{
							text-align: right;
							font-size: 26rpx;
							margin-right: 8rpx;
							line-height: 26rpx;
						}
						.fui-cell-remark:after{
							content: " ";
							display: inline-block;
							-webkit-transform: rotate(45deg);
							-ms-transform: rotate(45deg);
							transform: rotate(45deg);
							height: 12rpx;
							width: 12rpx;
							border-width: 3rpx 3rpx 0 0;
							border-color: #333;
							border-style: solid;
							position: relative;
							top: -2px;
							margin-left: 0;
						}
					}
				}
				.last{
					border: 0;
				}
			}
			.pic-detail{
				background-color: #FFFFFF;
				margin-top: 20rpx;
				.pic-title{
					padding: 20rpx 30rpx;
					text-align: center;
					font-size: 28rpx;
					font-weight: 600;
				}
			}
		}
			
		.detail-bottom{
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-flow: row;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 1;
			background-color: #FFFFFF;
			.bottom-left{
				width: 40%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-around;
				overflow: hidden;
				.attention{
					display: flex;
					flex-flow: column;
					position: relative;
					align-items: center;
					justify-content: center;
					.imgWrap{
						width: 40rpx;
						height: 36rpx;
					}
					.text{
						font-size: 24rpx;
						color: #666666;
						margin-top: 4rpx;
					}
					.cartnum {
						top: -14rpx;
						right: -14rpx;
						height: 36rpx;
						color: #FFFFFF;
						@include flex();
						min-width: 36rpx;
						font-size: 24rpx;
						padding: 0 12rpx;
						position: absolute;
						background: #ff5555;
						border-radius: 36rpx;
					}
				}
			}
			.bottom-right{
				width: 60%;
				@include flex(row);
				color: #FFFFFF;
				text-align: center;
				font-size: 28rpx;
				.add-cart{
					line-height: 80rpx;
					width: 200rpx;
					background-color: #FD9301;
					border-top-left-radius: 80rpx;
					border-bottom-left-radius: 80rpx;
				}
				.buy-now{
					width: 200rpx;
					line-height: 80rpx;
					background-color: #FE3E2C;
					border-top-right-radius: 80rpx;
					border-bottom-right-radius: 80rpx;
					margin-left: 4rpx;
				}
			}
		}
		
		.selectBar {
			top: 0;
			left: 0;
			z-index: 3;
			height: 100vh;
			width: 100vw;
			position: fixed;
			background: rgba(0, 0, 0, .7);
			.selectBarContent {
				left: 0;
				bottom: 0;
				width: 100%;
				padding: 20rpx;
				position: absolute;
				background: #FFFFFF;
				padding-bottom: 128rpx;
				box-sizing: border-box;
				.selectBarContentHeader {
					@include flex();
					height: 180rpx;
					align-items: flex-start;
					justify-content: space-between;
					border-bottom: 1rpx solid #EEEEEE;
					.good-info {
						flex: 1;
						height: 100%;
						padding: 30rpx;
						@include flex(column);
						box-sizing: border-box;
						align-items: flex-start;
						justify-content: space-between;
					}
					.picker-img {
						width: 150rpx;
						height: 150rpx;
						box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
					}
					.cuIcon-close {
						font: 88rpx;
					}
				}
				.good-type {
					.good-type-title {
						height: 88rpx;
						@include flex();
						font-size: 32rpx;
						justify-content: flex-start;
					}
					.good-type-item {
						font-size: 24rpx;
						padding: 8rpx 24rpx;
						margin: 12rpx 24rpx 12rpx 0;
						border-radius: 24rpx;
						display: inline-block;
						background: #f7f7f7;
						&.active {
							color: #FFFFFF;
							background: #ff5555;
						}
					}
				}
				.good-num, .express-money, .express-rule {
					height: 88rpx;
					@include flex();
					justify-content: space-between;
					> text {
						font-size: 32rpx;
					}
				}
				.express-type {
					.express-type-title {
						height: 88rpx;
						@include flex();
						font-size: 32rpx;
						justify-content: flex-start;
					}
					.express-type-item {
						font-size: 24rpx;
						padding: 8rpx 24rpx;
						margin: 12rpx 24rpx 12rpx 0;
						border-radius: 24rpx;
						display: inline-block;
						background: #f7f7f7;
						&.active {
							color: #FFFFFF;
							background: #ff5555;
						}
					}
				}
				.comfirm {
					left: 0;
					bottom: 0;
					width: 100%;
					height: 98rpx;
					color: #FFFFFF;
					@include flex();
					font-size: 36rpx;
					position: absolute;
					background: #FF5555;
				}
			}
		}
	}
</style>
