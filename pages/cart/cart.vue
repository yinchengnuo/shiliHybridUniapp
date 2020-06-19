<template>
	<view class="cart">
		<view class="nav">
			<text class="title">我的购物车</text>
			<text class="action" @click="edit = !edit">{{ edit ? '完成' : '编辑' }}</text>
		</view>
		<view v-if="cart.list && cart.list.length" class="cart-list">
			<view class="cart-item" v-for="(item, index) in cart.list" :key="item.id">
				<view @click="select(item.id, edit ? (+delList[index].selected ? '0' : '1') : (+item.selected ? '0' : '1'))">
					<template v-if="edit">
						<text v-if="+(delList[index].selected)" class="cuIcon-roundcheckfill" ></text>
						<text v-else  class="cuIcon-round"></text>
					</template>
					<template v-else>
						<text v-if="+item.selected" class="cuIcon-roundcheckfill" ></text>
						<text v-else  class="cuIcon-round"></text>
					</template>
				</view>
				<view class="good-info" @click="$iRouter.push('/good-detail', { id: item.goodsid })">
					<image class="good-img" :src="item.thumb"></image>
					<view class="good-name-price-num">
						<view class="good-name ellipsis2">{{ item.title }}</view>
						<view class="good-price-num">
							<view class="good-price-now price">￥{{ item.ggprice || '0' }}</view>
							<view class="good-price del">￥{{ item.goodsprice }}</view>
							<num-input
								:value="+item.total"
								:min="+item.minbuy ? +item.minbuy : 1"
								:step="+item.minbuy ? +item.minbuy : 1"
								:max="+item.totalmaxbuy" 
								@change="numChange($event, item)"
							/>
						</view>
					</view>
				</view>
			</view>
			<view class="submit-bar">
				<view class="submit-bar-left" @click="select('all', edit ? (delList.every(e => +e.selected) ? '0' : '1') : (cart.ischeckall ? '0' : '1'))">
					<template v-if="edit">
						<text v-if="delList.every(e => +e.selected)" class="cuIcon-roundcheckfill" ></text>
						<text v-else  class="cuIcon-round"></text>
					</template>
					<template v-else>
						<text v-if="cart.ischeckall" class="cuIcon-roundcheckfill" ></text>
						<text v-else  class="cuIcon-round"></text>
					</template>
					<text>{{ ' 全选' }}</text>
				</view>
				<view class="submit-bar-right">
					
					<template v-if="edit">
						<view class="total-num focus" :class="{ nochoosed: !delList.some(e => +e.selected) }" @click="favGoos">移到关注</view>
						<view class="total-num" :class="{ nochoosed: !delList.some(e => +e.selected) }" @click="delGoods">删除</view>
					</template>
					<template v-else>
						<view class="total-price">
							<view class="total-price-num">合计：<text class="price">￥{{ cart.totalprice }}</text></view>
							<view class="total-price-remark">不含运费</view>
						</view>
						<view class="total-num" @click="submit">结算({{ cart.total }})</view>
					</template>
				</view>
			</view>
		</view>
		<view v-else class="none">
			<image class="nogoods" src="../../static/index/nogoods.png"></image>
			<view class="nogoods-text">您的购物车中没有商品哦！</view>
			<view class="nogoods-btn" @click="$iRouter.switchTab('/index')">去首页逛逛吧</view>
		</view>
	</view>
</template>

<script>
	import numInput from "@/components/num-input.vue"
	import { _API_CartList, _API_CartUpdata, _API_CartSel, _API_CartDel, _API_FavGoods } from '@/apis/cart.js'
	export default {
		components: { numInput },
		data() {
			return {
				edit: false,
				delList: [],
			}
		},
		computed: {
			cart() {
				return this.$store.state.cart
			},
			address() {
				return this.$store.state.address.address.find(e => +e.isdefault == '1')
			},
		},
		onPullDownRefresh() {
			this.getCart() // 获取购物车
		},
		created() {
			uni.loading()
		},
		onReady() {
			uni.uloading()
		},
		onShow() { // 页面展示后更新购物车
			this.edit = false // 取消编辑状态
			this.getCart() // 获取购物车
			if (!this.$storage.openid && !uni.FROMLOGIN) { // 如果用户未登录，跳转到登录页面
				this.$iRouter.push('/login-psw')
			}
		},
		methods: {
			getCart() {
				this.$store.dispatch('cart/getCart').then(data => { // 更新购物车数据
					// console.log(data)
					this.delList = this.$clone(data.list).map(e => {
						e.selected = '0'
						return e
					})
					uni.stopPullDownRefresh()
				})
			},
			numChange(total, { id,  }) { // 修改购物车商品数量
				this.$request(_API_CartUpdata({ id, total, optionid:0, addressid: 0 }), () => {
					this.$store.dispatch('cart/getCart').then(data => console.log(data))
				})
			},
			select(id, select) { // 修改购物选中状态
				if (this.edit) {
					if (id == 'all') {
						this.delList.forEach(e => e.selected = this.delList.every(e => +e.selected) ? '0' : '1')
					} else {
						this.delList.find(e => e.id == id).selected = select.toString()
					}
				} else {
					this.$request(_API_CartSel({ id, select }), () => {
						this.$store.dispatch('cart/getCart').then(data => console.log(data))
					})
				}
			},
			delGoods() { // 删除商品
				if (this.delList.some(e => +e.selected)) {
					uni.model('提示', '确定删除这些商品？').then(() => {
						const ids = {}
						this.delList.filter(e => +e.selected).map(e => e.id).forEach((e, i) => ids[`ids[${i}]`] = e)
						this.$request(_API_CartDel(ids), () => {
							this.edit = false
							this.$store.dispatch('cart/getCart').then(data => console.log(data))
						})
					})
				} else {
					uni.toast('还没有选中商品呢')
				}
			},
			favGoos() {
				if (this.delList.some(e => +e.selected)) {
					const ids = {}
					this.delList.filter(e => +e.selected).map(e => e.id).forEach((e, i) => ids[`ids[${i}]`] = e)
					this.$request(_API_FavGoods(ids), () => {
						this.edit = false
						uni.toast('添加成功')
					})
				} else {
					uni.toast('还没有选中商品呢')
				}
			},
			submit() { // 结算购物车
				if (this.cart.total) {
					if (this.address) { // 如果有地址
						this.$iRouter.push('/order-comfirm')
					} else {
						uni.toast('请添加地址后才可以结算')
						this.$iRoute.push('/address-list')
					}
				} else {
					uni.toast('没有选中的商品')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cart {
		height: 100%;
		background: #f3f3f3;
		border-top: 74px solid #FFFFFF;
		.nav {
			top: 0;
			left: 0;
			z-index: 1;
			width: 100%;
			height: 74px;
			position: fixed;
			@include flex();
			background: #FFFFFF;
			align-items: flex-end;
			border-bottom: 1rpx solid #EEEEEE;
			.title {
				font-size: 17px;
				margin-bottom: 10px;
			}
			.action {
				bottom: 10px;
				right: 40rpx;
				position: absolute;
			}
		}
		.cart-list {
			position: relative;
			box-sizing: border-box;
			border-bottom: 98rpx solid transparent;
			.cart-item {
				height: 210rpx;
				@include flex();
				margin-bottom: 2rpx;
				background: #FFFFFF;
				padding: 26rpx 24rpx;
				box-sizing: border-box;
				.cuIcon-roundcheckfill , .cuIcon-round {
					color: #DFDFDF;
					font-size: 36rpx;
					&.cuIcon-roundcheckfill {
						color: #ff5555;
					}
				}
				.good-info {
					flex: 1;
					height: 100%;
					@include flex();
					margin-left: 18rpx;
					.good-img {
						width: 160rpx;
						height: 160rpx;
					}
					.good-name-price-num {
						flex: 1;
						height: 100%;
						font-size: 28rpx;
						margin-left: 18rpx;
						@include flex(column);
						align-items: flex-start;
						justify-content: space-between;
						.good-price-num {
							width: 100%;
							@include flex();
							justify-content: space-between;
						}
					}
				}
			}
			.submit-bar {
				left: 0;
				bottom: 0;
				width: 100%;
				height: 98rpx;
				position: fixed;
				@include flex();
				background: #FFFFFF;
				padding-left: 24rpx;
				box-sizing: border-box;
				justify-content: space-between;
				box-shadow: 0 0 4px rgba(0,0,0,0.1);
				// #ifdef H5
				bottom: 98rpx;
				// #endif
				.submit-bar-left {
					.cuIcon-roundcheckfill , .cuIcon-round {
						color: #DFDFDF;
						font-size: 36rpx;
						&.cuIcon-roundcheckfill {
							color: #ff5555;
						}
					}
				}
				.submit-bar-right {
					flex: 1;
					height: 100%;
					@include flex();
					justify-content: flex-end;
					.total-price {
						height: 100%;
						margin-right: 18rpx;
						@include flex(column);
						align-items: flex-end;
						justify-content: space-evenly;
						.total-price-remark {
							color: #999999;
							font-size: 24rpx;
						}
					}
					.total-num {
						height: 100%;
						width: 200rpx;
						color: #FFFFFF;
						@include flex();
						background: #ff5555;
						&.focus {
							background: #ff9900;
						}
						&.nochoosed {
							margin-left: 4rpx;
							background: #CCCCCC;
						}
					}
				}
			}
		}
		.none {
			height: 100%;
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
</style>
