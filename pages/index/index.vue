<template>
	<view class="index">
		<view class="header">
			<image class="header-bg" src="../../static/index/indexTopBg.png"></image>
			<image class="name" src="../../static/index/indexTopName.png"></image>
			<image class="message" src="../../static/index/indexTopMessage.png" @click="$kefu"></image>
			<image class="search" src="../../static/index/indexTopSearch.png" @click="$iRouter.push('/good-list', { focus: 1 })"></image>
			<view class="input">
				<image class="input-search" src="../../static/index/indexTopInputSearch.png"></image>
				<input type="text" v-model="keywords" placeholder="输入关键字搜索" @confirm="keywords ? $iRouter.push('/good-list', { keywords }) : '';keywords = ''" />
			</view>
		</view>
		<view class="banner-swiper">
			<image class="swiper-bg" src="../../static/index/indexTopBg.png"></image>
			<swiper class="swiper" indicator-dots autoplay circular :interval="4567" :duration="345">
				<swiper-item v-for="item in index.banner" :key="item.imgurl"@click="$iRouter.push('/good-detail', { id: item.linkurl })">
					<view class="swiper-item">
						<image class="swiper-item-img" :src="item.imgurl"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="kingkong">
			<view class="kingkong-item" v-for="(item, key, index) in index.menu" :key="item.imgurl" @click="tapKongKong(item, index)">
				<image class="kingkong-item-img" :src="item.imgurl"></image>
				<text class="kingkong-item-text" :style="{ color: item.color }">{{ item.text }}</text>
			</view>
		</view>
		<view class="news">
			<image class="news-img" src="../../static/index/indexNews.png"></image>
			<swiper class="news-swiper" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item>
					<view class="swiper-item">拾鲤众创，共建，共荣，共赢！</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="case">
			<image class="case-header" src="../../static/index/indexCaseHeader.png"></image>
			<image
				class="case-item"
				v-for="item in index.picturew"
				:key="item.imgurl"
				:src="item.imgurl"
				@click="$iRouter.push('/good-list', { cate: item.linkurl })"
			></image>
		</view>
		<view class="hot">
			<image
				class="hot-tem"
				v-for="item in index.pictures"
				:key="item.imgurl"
				:src="item.imgurl"
				@click="$iRouter.push('/good-list-type', { id: item.linkurl, title: item.title })"
			></image>
		</view>
		<view class="recom">
			<image class="recom-bg" src="../../static/index/indexRecom.png"></image>
			<view class="recom-header">
				<text class="recom-title">爆款推荐</text>
				<text class="recome-more" @click="$iRouter.push('/good-list', { ishot: 1 })">查看更多></text>
			</view>
			<view
				class="recom-item"
				v-for="(item, key, index) in index.goods"
				:key="index"
				:class="{ first: index === 0 }"
				@click="$iRouter.push('/good-detail', { id: item.gid })"
			>
				<image class="recom-item-img" :src="item.thumb"></image>
				<view class="recom-item-info">
					<view class="recom-item-name">{{ item.title }}</view>
					<view class="recom-item-price">
						<view>￥</view>
						<view class="price" style="font-size: 28rpx;">{{ item.discounts_one }}</view>
						<view v-if="item.discounts_one != '你还不是会员'" class="price">金鲤专享</view>
						<view style="margin-left: 16rpx;">￥</view>
						<view style="font-size: 28rpx;">{{ item.discounts_two }}</view>
						<view v-if="item.discounts_two != '你还不是会员'" class="hongli-logo">红鲤</view>
					</view>
				</view>
			</view>
		</view>
		<view class="guess" @click="$iRouter.push('/good-list', { cate: 330 })">
			<image class="guess-img" src="../../static/index/indexGuessYouLike.png"></image>
		</view>
		<view class="typeList-header">
			<view class="typeList-header-item" v-for="(item, key, index) in index.tabbar" @tap="active = index">
				<text class="typeList-header-item-title" :class="{ price: index == active }">{{ item.text1 }}</text>
				<text class="typeList-header-item-text" :class="{ price: index == active }">{{ item.text2 }}</text>
				<image v-if="index === active" src="../../static/index/indexActiceType.png"></image>
			</view>
		</view>
		<view class="typeList">
			<good-item v-for="(item, index) in list" :key="index" :item="item" :index="index" />
			<view class="typeList-status">{{ page ? '加载中...' : '没有更多了...' }}</view>
		</view>
	</view>
</template>

<script>
	import { _API_IndexBanner, _API_IndexGoodList } from '@/apis/index.js'
	export default {
		data() {
			return {
				page: 1,
				list: [],
				index: {},
				active: 0,
				keywords: '',
			}
		},
		watch: {
			active(n) {
				this.page = 1
				uni.loading()
				this.requestList(true)
			}
		},
		created() {
			uni.startPullDownRefresh()
			// #ifdef APP-PLUS
				this.$store.dispatch('app/getNowVersion') // 检查版本更新
			// #endif
		},
		onShow() {
			if (uni.LOGCHANGED) { // 如果用户登录状态发生改变，重新请求首页数据
				setTimeout(() => uni.startPullDownRefresh())
				uni.LOGCHANGED = false
			}
			if (this.$storage.openid) { // 如果用户已登录
				this.$store.dispatch('cart/getCart') // 更新购物车
			}
		},
		onPullDownRefresh() { // 下拉刷新
			this.page = 1
			this.active = 0
			Promise.all([_API_IndexBanner({ id: 209 }), this.requestList()]).then(([{ data }]) => {
				this.index = data
				// console.log(this.index)
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() { // 上拉触底
			this.requestList()
		},
		methods: {
			tapKongKong(item, index) { // 点击金刚区
				if (item.linkurl.match(/^\d+$/)) {
					if (index == 8 || index == 9) { // 点击拾鲤定制和随手礼
						this.$iRouter.push('/good-list-type', { id: item.linkurl, title: item.text })
					} else if (index == 7) {
						this.$iRouter.push('/brand-area', { id: item.linkurl })
					} else if (index == 0) { // 点击超级业务员
						// this.$iRouter.push('/super-salesman', { id: item.linkurl })
						if (!this.$storage.openid) { this.$iRouter.push('/login-psw'); return } // 未登录不许访问
						this.$shili('/shop', '超级业务员')
					} else if (index == 1) { // 营销主张
						this.$iRouter.push('/marketing-idea', { id: item.linkurl })
					} else if (index == 2) { // 点击直播
						this.$live()
					} else if (index == 3) { // 点击抢乐购
						// this.$iRouter.push('/happy-shopping', { id: item.linkurl })
						this.$shili('/group', '抢乐购')
					} else if (index == 4) { // 点击商学院
						this.$iRouter.push('/business-school', { id: item.linkurl })
					}
				} else {
					this.$iRouter.push('/good-list', { cate: item.linkurl.match(/\d+$/)[0] })
				}
			},
			requestList(tap) { // 请求首页数据方法
				if (!this.requesting && this.page) {
					this.requesting = true
					return new Promise(resolve => {
						_API_IndexGoodList({
							page: this.page,
							cate: (this.index.tabbar && this.active != -1) ? Object.values(this.index.tabbar)[this.active].linkurl : null,
						}).then(({ data: { list, pagesize }}) => {
							this.page == 1 ? this.list = list : this.list = [...this.list, ...list]
							list.length < pagesize ? this.page = 0 : this.page ++
							if (tap) {
								uni.pageScrollTo({ duration: 56, scrollTop: uni.upx2px(3144) })
							}
						}).finally(() => {
							resolve()
							uni.uloading()
							this.requesting = false
						})
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		.header {
			top: 0;
			left: 0;
			z-index: 2;
			width: 750rpx;
			height: 238rpx;
			position: fixed;
			overflow: hidden;
			.header-bg {
				width: 750rpx;
				height: 430rpx;
			}
			.name {
				top: 66rpx;
				left: 30rpx;
				width: 260rpx;
				height: 46rpx;
				position: absolute;
			}
			.message {
				top: 72rpx;
				right: 94rpx;
				width: 40rpx;
				height: 36rpx;
				position: absolute;
			}
			.search {
				top: 72rpx;
				right: 30rpx;
				width: 32rpx;
				height: 36rpx;
				position: absolute;
			}
			.input {
				top: 138rpx;
				right: 30rpx;
				width: 690rpx;
				height: 70rpx;
				overflow: hidden;
				position: absolute;
				background: #FFFFFF;
				border-radius: 70rpx;
				.input-search {
					top: 20rpx;
					left: 30rpx;
					width: 30rpx;
					height: 30rpx;
					position: absolute;
				}
				input {
					height: 70rpx;
					padding: 0 10rpx;
					font-size: 28rpx;
					margin-left: 60rpx;
					box-sizing: border-box;
				}
			}
		}
		.banner-swiper {
			width: 750rpx;
			height: 300rpx;
			margin-top: 238rpx;
			position: relative;
			.swiper-bg {
				left: 0;
				width: 750rpx;
				bottom: 106rpx;
				height: 430rpx;
				position: absolute;
			}
			.swiper {
				height: 100%;
				margin: 0 30rpx;
				overflow: hidden;
				border-radius: 12rpx;
				.swiper-item {
					height: 100%;
					.swiper-item-img {
						width: 100%;
						height: 100%;
					}	
				}
			}
		}
		.kingkong {
			height: 284rpx;
			width: 690rpx;
			margin: 30rpx 30rpx 0;
			.kingkong-item {
				width: 20%;
				height: 50%;
				float: left;
				@include flex(column);
				box-sizing: border-box;
				// border: 1px solid #000000;
				.kingkong-item-img {
					width: 80rpx;
					height: 80rpx;
				}
				.kingkong-item-text {
					font-size: 24rpx;
					line-height: 3;
				}
			}
		}
		.news {
			height: 120rpx;
			padding: 40rpx;
			@include flex();
			box-sizing: border-box;
			.news-img {
				width: 154rpx;
				height: 100%;
			}
			.news-swiper {
				flex: 1;
				height: 30rpx;
				color: #666666;
				padding: 0 16rpx;
				font-size: 24rpx;
				margin-left: 14rpx;
				box-sizing: border-box;
				border-left: 2rpx solid #EEEEEE;
			}
		}
		.case {
			height: 886rpx;
			image {
				float: left;
				&.case-header {
					width: 750rpx;
					height: 326rpx;
				}
				&.case-item {
					height: 280rpx;
					width: 187.5rpx;
				}
			}
		}
		.hot {
			height: 540rpx;
			.hot-tem {
				width: 50%;
				height: 50%;
				float: left;
			}
		}
		.recom {
			z-index: 1;
			height: 766rpx;
			position: relative;
			background: #F3F3F3;
			.recom-bg {
				top: 0;
				z-index: -1;
				left: 20rpx;
				height: 100%;
				width: 710rpx;
				position: absolute;
				border-radius: 12rpx;
			}
			.recom-header {
				color: #FFFFFF;
				height: 90rpx;
				@include flex();
				padding: 0 50rpx;
				box-sizing: border-box;
				justify-content: space-between;
				.recom-title {
					font-size: 36rpx;
				}
				.recome-more {
					font-size: 28rpx;
				}
			}
			.recom-item {
				width: 650rpx;
				height: 200rpx;
				overflow: hidden;
				@include flex();
				margin: 20rpx auto;
				background: #FFFFFF;
				border-radius: 20rpx;
				&.first {
					margin-top: 6rpx;
				}
				.recom-item-img {
					width: 200rpx;
					height: 200rpx;
				}
				.recom-item-info {
					flex: 1;
					height: 100%;
					padding: 20rpx;
					@include flex(column);
					box-sizing: border-box;
					justify-content: space-between;
					.recom-item-name {
						width: 100%;
						font-size: 32rpx;
						overflow : hidden;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						word-break: break-all;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
					}
					.recom-item-price {
						width: 100%;
						height: 56rpx;
						@include flex();
						font-size: 20rpx;
						align-items: flex-end;
						justify-content: flex-start;
						.hongli-logo {
							width: 58rpx;
							height: 28rpx;
							@include flex();
							font-size: 20rpx;
							margin: 0 0 16rpx 4rpx;
							color: rgba(255,237,183,1);
							background: rgba(51,51,51,1);
							border-radius: 53rpx 53rpx 53rpx 4rpx;
						}
					}
				}
			}
		}
		.guess {
			height: 220rpx;
			background: #F5F5F5;
			.guess-img {
				width: 710rpx;
				height: 200rpx;
				margin: 20rpx 20rpx 0;
			}
		}
		.typeList-header {
			left: 0;
			z-index: 2;
			top: 238rpx;
			width: 750rpx;
			height: 132rpx;
			@include flex();
			padding: 0 40rpx;
			position: sticky;
			padding-top: 20rpx;
			background: #F5F5F5;
			box-sizing: border-box;
			.typeList-header-item {
				flex: 1;
				height: 100%;
				position: relative;
				@include flex(column);
				justify-content: flex-start;
				.typeList-header-item-title {
					font-size: 28rpx;
					line-height: 44rpx;
					&.price {
						font-size: 32rpx;
					}
				}
				.typeList-header-item-text {
					font-size: 24rpx;
					line-height: 34rpx;
				}
				image {
					left: 50%;
					width: 34rpx;
					bottom: 20rpx;
					height: 12rpx;
					position: absolute;
					transform: translate(-50%);
				}
			}
		}
		.typeList {
			overflow: hidden;
			background: #F5F5F5;
			.typeList-status {
				float: left;
				width: 100%;
				height: 50px;
				@include flex();
			}
		}
	}
</style>
