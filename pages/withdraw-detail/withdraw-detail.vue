<template>
	<view class="withdraw-detail">
		<view class="fui-cell-group">
			<view class="fui-cell">
				<view class="fui-cell-info">预计提现：+0元</view>
			</view>
		</view>
		<view class="content-wrap">
			<view class="log-item">
				<view class="external" :class="{ 'active': active == 0 }" @click="active = 0">
					<view>所有</view>
					<view class="line"></view>
				</view>
				<view class="external" :class="{ 'active': active == 1 }" @click="active = 1">
					<view>待审核</view>
					<view class="line"></view>
				</view>
				<view class="external" :class="{ 'active': active == 3 }" @click="active = 3">
					<view>待打款</view>
					<view class="line"></view>
				</view>
				<view class="external" :class="{ 'active': active == 2 }" @click="active = 2">
					<view>已打款</view>
					<view class="line"></view>
				</view>
				<view class="external" :class="{ 'active': active == 4 }" @click="active = 4">
					<view>无效</view>
					<view class="line"></view>
				</view>
			</view>
			<view class="log-list" v-if="list.length > 0">
				
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
				list:[]
			};
		}
	}
</script>

<style lang="scss" scoped>
.withdraw-detail{
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
		.log-list{
			
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
