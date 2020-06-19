<template>
	<view class="good-list">
		<view class="good-list-header">
			<text class="cuIcon-back" @click="$iRouter.pop()"></text>
			<view class="input">
				<image class="input-search" src="../../static/index/indexTopInputSearch.png"></image>
				<input
					type="text"
					:focus="focus"
					v-model="keywords"
					placeholder="输入关键字搜索"
					@confirm="keywords ? query.keywords = keywords :''"
				/>
				<text v-if="keywords" class="cuIcon-close" @click="query.keywords = keywords = ''"></text>
			</view>
			<image class="good-list-message" src="../../static/index/sortMessage.png" @click="$kefu"></image>
		</view>
		<view class="type-nav">
			<view class="type-nav-item" :class="{ active: active == 0 }" @click="active = 0">综合</view>
			<view class="type-nav-line"></view>
			<view class="type-nav-item" :class="{ active: active == 1 }" @click="active = 1">销量</view>
			<view class="type-nav-line"></view>
			<view class="type-nav-item" :class="{ active: active == 2 }"
				@click="active = 2;active == 2 ? (query.by = (query.by == 'desc') ? 'asc' : 'desc') : ''">
				价格
				<view>
					<text class="cuIcon-triangleupfill" :class="{ activePrice: active == 2 && this.query.by == 'asc' }"></text>
					<text class="cuIcon-triangledownfill" :class="{ activePrice: active == 2 && this.query.by == 'desc' }"></text>
				</view>
			</view>
			<view class="type-nav-line"></view>
			<view class="type-nav-item" :class="{ active: active == 3 }" @click="showFilter = true;active = 3;">筛选 <text class="cuIcon-filter"></text></view>
			<view class="type-nav-line"></view>
		</view>
		<view v-if="showFilter" class="chooseBar" style="height:calc(100vh - 260rpx)">
			<view class="chooseBarWrapper">
				<view class="filters">
					<view class="filters-item" :class="{ choosed: chooseBar.isrecommand == '1' }" @click="chooseBar.isrecommand = (chooseBar.isrecommand == '0' ? '1' : '0')">
						<text v-if="chooseBar.isrecommand == '1'" class="cuIcon-check"></text>  推荐商品
					</view>
					<view class="filters-item" :class="{ choosed: chooseBar.isnew == '1' }" @click="chooseBar.isnew = (chooseBar.isnew == '0' ? '1' : '0')">
						<text v-if="chooseBar.isnew == '1'" class="cuIcon-check"></text>  新品上市
					</view>
					<view class="filters-item" :class="{ choosed: chooseBar.ishot == '1' }" @click="chooseBar.ishot = (chooseBar.ishot == '0' ? '1' : '0')">
						<text v-if="chooseBar.ishot == '1'" class="cuIcon-check"></text>  热卖商品
					</view>
					<view class="filters-item" :class="{ choosed: chooseBar.isdiscount == '1' }" @click="chooseBar.isdiscount = (chooseBar.isdiscount == '0' ? '1' : '0')">
						<text v-if="chooseBar.isdiscount == '1'" class="cuIcon-check"></text>  促销商品
					</view>
					<view class="filters-item" :class="{ choosed: chooseBar.issendfree == '1' }" @click="chooseBar.issendfree = (chooseBar.issendfree == '0' ? '1' : '0')">
						<text v-if="chooseBar.issendfree == '1'" class="cuIcon-check"></text>  卖家包邮
					</view>
					<view class="filters-item" :class="{ choosed: chooseBar.istime == '1' }" @click="chooseBar.istime = (chooseBar.istime == '0' ? '1' : '0')">
						<text v-if="chooseBar.istime == '1'" class="cuIcon-check"></text>  限时抢购
					</view>
				</view>
				<view class="chooseBarWrapperTitle">选择分类</view>
				<view class="chooseType">
					<scroll-view class="chooseTypeView" show-scrollbar scroll-y style="height: 500rpx;">
						<view
							class="chooseTypeViewItem"
							v-for="(item, index) in sort"
							:key="index"
							:class="{ chooseditem: index == chooseBar.activeType }"
							@click="chooseBar.activeItem = -1;chooseBar.activeType = index"
						>{{ item.name }}</view>
					</scroll-view>
					<view class="chooseTypeLine"></view>
					<scroll-view class="chooseTypeView" show-scrollbar scroll-y style="height: 500rpx;">
						<view
							class="chooseTypeViewItem"
							v-for="(item, index) in itemList"
							:key="index"
							:class="{ chooseditem: index == chooseBar.activeItem }"
							@click="chooseBar.activeItem = index"
						>{{ item.name }}</view>
					</scroll-view>
				</view>
				<view class="comfirm-choose">
					<text @click="showFilter = false">取消筛选</text>
					<text class="price" @click="comfirmFilter">确认</text>
				</view>
			</view>
		</view>
		<scroll-view scroll-y style="height:calc(100vh - 260rpx)" @scroll="({ detail: { scrollTop }}) => scrolltop = scrollTop" :scroll-top="scrolltop" @scrolltolower="request">
			<view v-if="list.length == 0 && page == 0" class="none">
				<text class="cuIcon-searchlist"></text>
				<text>暂时没有任何商品</text>
			</view>
			<good-item v-for="(item, index) in list" :key="index" :item="item" :index="index" />
			<view v-if="list.length" class="loading-list">{{ page ? '加载中...' : '没有更多了...' }}</view>
		</scroll-view>
	</view>
</template>

<script>
	import { _API_GetGoodList } from '@/apis/good.js'
	export default {
		data() {
			return {
				page: 1,
				list: [],
				active: 0,
				focus: false,
				keywords: '',
				scrolltop: 0,
				showFilter: false,
				requesting: false,
				query: {
					keywords: '',
					isrecommand: '0',
					ishot: '0',
					isnew: '0',
					isdiscount: '0',
					issendfree: '0',
					istime: '0',
					cate: '',
					order: '',
					by: ''
				},
				chooseBar: {
					isrecommand: '0',
					isnew: '0',
					ishot: '0',
					isdiscount: '0',
					issendfree: '0',
					istime: '0',
					activeType: -1,
					activeItem: -1
				}
			}
		},
		computed: {
			sort() {
				return this.$clone(this.$store.state.sort.list)
			},
			itemList() {
				return this.chooseBar.activeType == -1 ? [] : this.sort[this.chooseBar.activeType].children
			}
		},
		watch: {
			active(n) {
				this.showFilter = false
				if (n == 0) {
					this.query.order = ''
					this.query.by = ''
				} else if (n == 1) {
					this.query.order = 'sales'
					this.query.by = 'desc'
				} else if (n == 2) {
					this.query.order = 'minprice'
					this.query.by = 'asc'
				} else if (n == 3) {
					this.query.order = 'minprice'
					this.query.by = this.query.keywords ? 'asc' : 'desc'
					this.showFilter = true
				}
			},
			query: {
				handler(n)  {
					this.page = 1
					this.request().then(() => this.$nextTick(() => this.scrolltop = 0))
				},
				deep:true
			}
		},
		onLoad({ cate, keywords, ishot, focus }) {
			focus ? this.focus = true : ''
			cate ? this.query.cate = cate : ''
			ishot ? this.chooseBar.ishot = this.query.ishot = ishot : ''
			keywords ? this.query.keywords = this.keywords = keywords : ''
		},
		methods: {
			comfirmFilter() { // 提交筛选
				Object.assign(this.query, this.chooseBar)
				if (this.chooseBar.activeItem != -1) {
					this.query.cate = this.sort[this.chooseBar.activeType].children[this.chooseBar.activeItem].id
				}
				this.showFilter = false
			},
			request() { // 请求商品列表
				if (!this.requesting && this.page) {
					this.requesting = true
					return new Promise(resolve => {
						this.$request(_API_GetGoodList({ ...this.query, page: this.page }), ({ list, pagesize }) => {
							this.page == 1 ? this.list = list : this.list = [...this.list, ...list]
							list.length < pagesize ? this.page = 0 : this.page ++
						}).finally(() => {
							this.requesting = false
							resolve()
						})
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.good-list {
		height: 100%;
		.good-list-header {
			width: 100%;
			@include flex();
			height: 170rpx;
			align-items: flex-end;
			box-sizing: border-box;
			padding: 0 30rpx 30rpx;
			justify-content: flex-end;
			border-bottom: 2rpx solid #F3F3F3;
			.cuIcon-back {
				width: 30rpx;
				height: 100%;
				@include flex();
				color: #999999;
				font-size: 40rpx;
				margin-bottom: 12rpx;
				align-items: flex-end;
			}
			.input {
				flex: 1;
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
				.cuIcon-close {
					top: 20rpx;
					right: 30rpx;
					width: 30rpx;
					height: 30rpx;
					position: absolute;
				}
			}
			.good-list-message {
				width: 44rpx;
				height: 40rpx;
				margin-left: 30rpx;
				margin-bottom: 12rpx;
			}
		}
		.type-nav {
			height: 90rpx;
			padding: 20rpx;
			@include flex();
			box-sizing: border-box;
			border-bottom: 2rpx solid #F3F3F3;
			.type-nav-item {
				flex: 1;
				height: 100%;
				@include flex();
				&.active {
					color: #fd5454;
				}
				> view {
					@include flex(column);
					line-height: 12rpx;
					height: 24rpx;
					color: #333333;
					.activePrice {
						color: #fd5454;
					}
				}
			}
			.type-nav-line {
				width: 2rpx;
				height: 100%;
				background: #e7e7e7;
			}
		}
		.chooseBar {
			top: 260rpx;
			z-index: 1;
			width: 100%;
			position: absolute;
			background: rgba(0, 0, 0, .6);
			.chooseBarWrapper {
				padding: 12rpx;
				color: #999999;
				background: #FFFFFF;
				box-sizing: border-box;
				.filters {
					height: 160rpx;
					@include flex();
					flex-wrap: wrap;
					align-items: space-evenly;
					justify-content: space-around;
					.filters-item {
						width: 160rpx;
						height: 50rpx;
						margin: 0 20rpx;
						@include flex();
						font-size: 24rpx;
						border-radius: 8rpx;
						border: 1rpx solid #999999;
						&.choosed {
							color: #fd5454;
							border-color: #fd5454;
						}
					}
				}
				.chooseBarWrapperTitle {
					@include flex();
					height: 60rpx;
					border-top: 0.5rpx solid #999999;
					border-bottom: 0.5rpx solid #999999;
				}
				.chooseType {
					height: 524rpx;
					@include flex();
					padding: 12rpx 0;
					box-sizing: border-box;
					.chooseTypeView {
						background: #FFFFFF;
						.chooseTypeViewItem {
							height: 70rpx;
							@include flex();
							&.chooseditem {
								background: #f9f9f9;
							}
						}
					}
					.chooseTypeLine {
						width: 1rpx;
						height: 100%;
						background: #999999;
					}
				}
				.comfirm-choose {
					height: 60rpx;
					@include flex();
					padding: 0 30rpx;
					box-sizing: border-box;
					justify-content: space-between;
					border-top: 0.5rpx solid #999999;
				}
			}
		}
		scroll-view {
			background: #F5F5F5;
			.none {
				height: 100%;
				font-size: 32rpx;
				@include flex(column);
				.cuIcon-searchlist {
					font-size: 88rpx;
				}
			}
			.loading-list {
				width: 100%;
				float: left;
				height: 66rpx;
				@include flex();
			}
		}
	}
</style>
