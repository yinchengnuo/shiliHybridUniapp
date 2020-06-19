<template>
	<view class="member-list">
		<view class="member-title">
			<view class="title"><image src="../../static/member/xing.png" mode=""></image>剩余开通名额</view>
			<view class="member-num">
				<view class="list-name">
					<view class="top"><image src="../../static/member/red_bg.png" mode=""></image>红鲤</view>
					<view class="num">{{vip_total}}<text class="unite">人</text></view>
				</view>
				<view class="list-name">
					<view class="top"><image src="../../static/member/glod_bg.png" mode=""></image>金鲤</view>
					<view class="num">{{hehuo_total}}<text class="unite">人</text></view>
				</view>
				<view class="list-name">
					<view class="top"><image src="../../static/member/tiyan_bg.png" mode=""></image>营销中心</view>
					<view class="num">{{svip_total}}<text class="unite">人</text></view>
				</view>
			</view>
			<view class="member-buy">购买名额</view>
		</view>
		<view class="list-wrap">
			<view class="item" v-for="item in list" :key='item.id'>
				<view class="item-top">
					<view class="level">
						<image src="../../static/member/com_bg.png" mode=""></image>
						<text class="name" v-if="item.level_name!=''">{{item.level_name}}</text>
						<text class="name" v-else>普通会员</text>
					</view>
					<view class="close" v-if="item.level!=0" @click="closeMember">
						关闭会员
					</view>
				</view>
				<view class="item-info">
					<view class="user">
						<image :src="item.avatar" mode=""></image>
						<view class="user-info">
							<view class="name">{{item.nickname}}</view>
							<view class="time">注册时间：{{item.createtime}}</view>
						</view>
					</view>
					<view class="open">
						<view class="open-btn" v-if="item.level==0" @click="$iRouter.push('/member-set')">创建会员</view>
						<view class="info" v-else>
							<text>0</text>
							<text>个会员</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{
					avatar: "http://thirdwx.qlogo.cn/mmopen/h4gtbB74nSiaxA9PiaaZkf5mTRdJ5ajNFDUXMEbkWwRPEZes3wIh59iaAUYvRbcyvdBIcrDHvcQ8LCEUjW9RjwFxjVIBHt27SyH/132",
					createtime: "2020-05-25",
					id: "91435",
					ismember: "3",
					level: "0",
					level_name: '',
					mobile: "",
					nickname: "巧克力",
					openid: "o4xrj01KiR43b21lr0ejBzVG6Hqk",
					realname: "",
					status: "0"
				},{
					avatar: "https://thirdwx.qlogo.cn/mmopen/h4gtbB74nSia9piazo7wUhmgnSjhFT2sVfyBbP91Qy3ZRz25NAGwFzetO91vGbg0OFCRYruR5hRHFmBdg68icaBTJuGvW7Cns13/132",
					createtime: "2020-02-14",
					id: "89629",
					ismember: "0",
					level: "26",
					level_name: "红鲤会员",
					mobile: "15518522985",
					nickname: "刘 春",
					openid: "o4xrj02x8kgo_09rjvTjD4wGJQKc",
					realname: "刘春",
					status: "1"
				}],
				vip_total:'98',
				hehuo_total:'0',
				svip_total:'0'
			};
		},
		methods:{
			closeMember(){
				uni.toast("关闭会员")
			}
		}
	}
</script>

<style lang="scss">
.member-list{
	min-height: 100vh;
	background: #f3f3f3;
	padding-top: 1rpx;
	.member-title{
		margin-top: 20rpx;
		background-color: #FFFFFF;
		position: relative;
		padding: 20rpx 24rpx;
		.title{
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: #888888;
			image{
				width: 36rpx;
				height: 36rpx;
				margin-right: 10rpx;
			}
		}
		.member-num{
			display: flex;
			flex-flow: row;
			padding: 30rpx 0 5rpx;
			.list-name{
				display: flex;
				flex-flow: column;
				min-width: 33.3%;
				// align-items: center;
				font-size: 28rpx;
				color: #888888;
				margin-right: 15rpx;
				.top{
					display: flex;
					align-items: center;
					image{
						width: 40rpx;
						height: 40rpx;
						margin-right: 10rpx;
					}
				}
				.num{
					display: flex;
					font-size: 36rpx;
					color: #333 ;
					padding: 0 12rpx;
					margin-top: 20rpx;
					.unite{
						font-size: 24rpx;
						color: #999999;
						padding-left: 5rpx;
						margin-top: 5rpx;
					}
				}
			}
		}
		.member-buy{
			width: 160rpx;
			line-height: 40rpx;
			position: absolute;
			top: 10rpx;
			right: 10rpx;
			text-align: right;
			padding: 10rpx 20rpx 10rpx 20rpx;
			border-top-left-radius: 50rpx;
			border-bottom-left-radius: 50rpx;
			background-color: #ff8000;
			color: #FFFFFF;
		}
	}
	.list-wrap{
		.item{
			margin-top: 20rpx;
			background: #FFFFFF;
			padding: 20rpx 24rpx;
			.item-top{
				display: flex;
				flex-flow: row;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #f3f3f3;
				padding-bottom: 20rpx;
				.level{
					display: flex;
					align-items: center;
					font-size: 28rpx;
					.name{
						display: inline-block;
						padding: 8rpx 0 0 8rpx;
						color: #333;
					}
					image{
						width: 48rpx;
						height: 40rpx;
					}
				}
				.close{
					display: inline-block;
					font-size: 26rpx;
					color: #FFFFFF;
					padding: 10rpx 20rpx;
					line-height: 30rpx;
					background-color: #CCCCCC;
					border-radius: 30rpx;
				}
			}
			.item-info{
				display: flex;
				flex-flow: row;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0;
				.user{
					display: flex;
					flex-flow: row;
					align-items: center;
					image{
						width: 90rpx;
						height: 90rpx;
						border-radius: 50%;
						margin-right: 15rpx;
					}
					.user-info{
							max-width: 400rpx;
						.name{
							width: 100%;
							font-size: 28rpx;
							color: #333;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							-webkit-box-flex: 1;
							-webkit-flex: 1;
							-ms-flex: 1;
							flex: 1;
						}
						.time{
							margin-top: 15rpx;
							color: #999999;
							font-size: 24rpx;
						}
					}
				}
				.open{
					text-align: center;
					position: relative;
					flex-shrink: 0;
					padding-left: 25rpx;
					min-width: 160rpx;
					.open-btn{
						display: inline-block;
						font-size: 26rpx;
						color: #FFFFFF;
						padding: 10rpx 20rpx;
						line-height: 30rpx;
						background-color: #F43F3B;
						border-radius: 30rpx;
					}
					.info{
						display: flex;
						flex-flow: column;
						font-size: 24rpx;
					}
				}
				.open:before{
					content: "";
					position: absolute;
					left: 0;
					top: 0;
					width: 1px;
					height: 100%;
					background: #ebebeb;
				}
			}
		}
	}
}
</style>
