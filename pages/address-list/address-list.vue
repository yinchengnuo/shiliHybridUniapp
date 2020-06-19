<template>
	<view class="address-list">
		<radio-group v-if="list.length" class="add-list" @change="setAddressDefault">
			<view class="address-item" v-for="(item, index) in list" :key="index" @click="choose(item.id)">
				<view class="item-name">
					<view class="name-tel">
						<text class="name">{{ item.realname }}</text><text class="tel">{{ item.mobile }}</text>
					</view>
					<view class="item-address">{{ item | getAddress }}</view>
				</view>
				<view class="item-fun">
					<label class="radio" @click.stop="">
						<radio :value="item.id" :checked="Boolean(+item.isdefault)" color="#ff6600" style="margin-right: 10rpx;"/>
						设置默认
					</label>
					<view class="function">
						<text class="item-edit" @click.stop="$iRouter.push('/address-edit', { id: item.id })">编辑</text>
						<text class="item-del" @click.stop="delAddress(item.id)">删除</text>
					</view>
				</view>
			</view>
		</radio-group>
		<view v-else class="add-nolist">
			<image class="add-img" src="../../static/addrss/noadd.png" mode=""></image>
			<text>您暂时没有任何收货地址哦</text>
		</view>
		<view class="add-address" @click="$iRouter.push('/address-edit')">+ 新建地址</view>
	</view>
</template>

<script>
	import { _API_SetAddressDefault, _API_DelAddress } from '@/apis/address.js'
	export default {
		data() {
			return {
				isChoose: ''
			}
		},
		computed: {
			list() {
				return this.$store.state.address.address
			}
		},
		onShow() {
			uni.startPullDownRefresh()
		},
		onPullDownRefresh() { // 下拉刷新
			this.$store.dispatch('address/getAddress').then(() => uni.stopPullDownRefresh())
		},
		onLoad({ choose }) {
			this.isChoose = choose
		},
		methods: {
			choose(id){
				if (this.choose) {
					this.$iRouter.pop({ id })
				}
			},
			delAddress(id) {
				uni.model('确定删除此地址？').then(() => {
					this.$request(_API_DelAddress({ id }), () => uni.startPullDownRefresh())
				})
			},
			setAddressDefault({ detail: { value }}) { // 设置默认地址
				this.$request(_API_SetAddressDefault({ id: value }))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address-list {
		background: #f5f5f5;
		min-height: 100%;
		padding-bottom: 100rpx;
		.add-nolist{
			@include flex(column);
			padding-top: 100rpx;
			.add-img{
				width: 240rpx;
				height: 240rpx;
				margin-bottom: 40rpx;
			}
		}
		// 地址列表
		.add-list{
			width: 100%;
			padding-top:1rpx;
			.address-item{
				background-color: #FFFFFF;
				margin-top: 20rpx;
				padding: 20rpx 24rpx;
				.item-name{
					margin-bottom: 20rpx;
					.name-tel{
						margin-bottom: 10rpx;
						display: flex;
						align-items: center;
						justify-content: flex-start;
						.name{
							display: inline-block;
							max-width: 240rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							padding-right: 48rpx;
						}
						.tel{
							display: inline-block;
						}
					}
					.item-address{
						font-size: 28rpx;
						color: #666666;
					}
				}
				.item-fun{
					display: flex;
					flex-flow: row;
					align-items: center;
					justify-content: space-between;
					.function{
						.item-edit{
							margin-right: 20rpx;
						}
					}
				}
			}
		}
		.add-address{
			width: 100%;
			height: 90rpx;
			background-color: #FE3E2C;
			color: #FFFFFF;
			text-align: center;
			line-height: 90rpx;
			font-size: 32rpx;
			position: fixed;
			bottom: 0;
			left: 0;
		}
	}
</style>
