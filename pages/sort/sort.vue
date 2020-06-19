<template>
	<view class="sort">
		<view class="sortSearch">
			<view class="input">
				<image class="input-search" src="../../static/index/indexTopInputSearch.png" @click="$kefu"></image>
				<input type="text" v-model="keywords" placeholder="输入关键字搜索" @confirm="keywords ? $iRouter.push('/good-list', { keywords }) : '';keywords = ''" />
			</view>
			<image class="sortSearch-message" src="../../static/index/sortMessage.png" @click="$kefu"></image>
		</view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 170rpx)">
				<view
					class="VerticalNavItem"
					:class="{ active: index == tabCur }"
					v-for="(item,index) in list"
					:key="index"
					@tap="TabSelect"
					:data-id="index"
				>{{item.name}}</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 170rpx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<image class="sortBanner" src="../../static/index/sortNav.png"></image>
				<view class="sortItem" v-for="(item, index) in list" :key="index" :id="'main-'+index" :class="{ first: index == 0 }">
					<view class="sortItemName">{{ item.name }}<text class="cuIcon-right"></text></view>
					<view class="sortItemItem"
						v-for="(sortItem, index) in item.children"
						:key="index"
						:style="{ marginRight: ((index + 1) % 3 == 0) ? '0px' : '16rpx' }"
						@click="$iRouter.push('/good-list', { cate: sortItem.id })"
					>
						<image class="sortItemItemImg" :src="sortItem.thumb"></image>
						<text class="sortItemItemName">{{ sortItem.name }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { _API_SortList }  from '@/apis/index.js';
	export default {
		data() {
			return {
				tabCur: 0,
				load: true,
				mainCur: -1,
				keywords: '',
				verticalNavTop: 0
			};
		},
		computed: {
			list() {
				const list = this.$clone(this.$store.state.sort.list)
				list.forEach((e, i) => e._id = i)
				this.listCur = list[0]
				return list
			}
		},
		created() {
			uni.loading()
		},
		onShow() {
			this.$store.dispatch('cart/getCart') // 更新购物车
		},
		onReady() {
			uni.uloading()
			// this.$nextTick(() => this.$iRouter.switchTab('/index').then(() => {
			// 	// #ifdef APP-PLUS
			// 	plus.navigator.closeSplashscreen()
			// 	// #endif
			// }))
		},
		methods: {
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				let tabHeight = uni.upx2px(208)
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i]._id)
						view.fields({ size: true }, data => {
							tabHeight += uni.upx2px(30)
							this.list[i].top = tabHeight
							tabHeight = tabHeight + data.height
							this.list[i].bottom = tabHeight
						}).exec()
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i]._id - 1) * 50
						this.tabCur = this.list[i]._id
						return false
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sort {
		height: 100%;
		.sortSearch {
			@include flex();
			height: 170rpx;
			align-items: flex-end;
			box-sizing: border-box;
			padding: 0 30rpx 30rpx;
			justify-content: space-between;
			border-bottom: 2rpx solid #F3F3F3;
			.input {
				width: 610rpx;
				height: 70rpx;
				position: relative;
				background: #F3F3F3;
				border-radius: 70rpx;
				.input-search {
					top: 20rpx;
					left: 30rpx;
					width: 30rpx;
					height: 30rpx;
					position: absolute;
				}
				input {
					height: 78rpx;
					padding: 0 10rpx;
					font-size: 28rpx;
					margin-left: 60rpx;
					box-sizing: border-box;
				}
			}
			.sortSearch-message {
				width: 44rpx;
				height: 40rpx;
				margin-bottom: 12rpx;
			}
		}
		
		.VerticalBox {
			display: flex;
			.VerticalNav {
				width: 200rpx;
				.VerticalNavItem {
					height: 100rpx;
					@include flex();
					&.active {
						position: relative;
						background: #F1F1F1;
					}
					&.active::before {
						left: 0;
						top: 35rpx;
						width: 6rpx;
						content: "";
						height: 30rpx;
						border-radius: 5rpx;
						position: absolute;
						background: #E02020;
					}
				}
			}
			.VerticalMain {
				flex: 1;
				padding: 30rpx;
				box-sizing: border-box;
				background-color: #F1F1F1;
				.sortBanner {
					width: 100%;
					height: 208rpx;
					border-radius: 22rpx;
				}
				.sortItem {
					overflow: hidden;
					margin-top: 30rpx;
					background: #FFFFFF;
					border-radius: 22rpx;
					padding: 30rpx 20rpx 0;
					box-sizing: border-box;
					align-items: flex-start;
					&.first {
						margin-top: 22rpx;
					}
					.sortItemName {
						font-weight: bold;
						font-size: 28rpx;
						margin-bottom: 20rpx;
					}
					.sortItemItem {
						float: left;
						width: 139rpx;
						height: 178rpx;
						@include flex(column);
						margin-bottom: 30rpx;
						justify-content: space-between;
						.sortItemItemImg {
							width: 139rpx;
							height: 139rpx;
						}
						.sortItemItemName {
							width: 139rpx;
							font-size: 22rpx;
							overflow: hidden;
							text-align: center;
							white-space: nowrap;
							word-break: break-all;
							text-overflow: ellipsis;
						}
					}
				}
			}
		}
		
		
		
		
		
	}
</style>
