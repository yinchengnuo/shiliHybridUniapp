<template>
	<view class="member-set">
		<view class="item">
			<text class="name">当前等级：</text><text>普通会员</text>
		</view>
		<view class="fui-cell-group">
			<view class="fui-cell must ">
				<view class="fui-cell-label ">升级后：</view>
				<view class="fui-cell-info" @click="select">
					会员等级
				</view>
				
			</view>
		</view>
		<view class="fui-cell-group">
			<view class="fui-cell must ">
				<view class="fui-cell-label ">昵称：</view>
				<view class="fui-cell-info">
					<input class="fui-input" type="text" disabled v-model="nickname" placeholder="请输入您的昵称" />
				</view>
			</view>
		</view>
		<view class="fui-cell-group">
			<view class="fui-cell must ">
				<view class="fui-cell-label ">姓名</view>
				<view class="fui-cell-info">
					<input type="text" class="fui-input" placeholder="请输入您的姓名" v-model="realname" />
				</view>
			</view>
			<view class="fui-cell must ">
				<view class="fui-cell-label ">手机号</view>
				<view class="fui-cell-info">
					<input class="fui-input" type="text" disabled v-model="phone" placeholder="请输入您的手机号" />
				</view>
			</view>
		</view>
		<view class="btn-wrap">
			<text class="btn" @click="toChange" >立即开通</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:18336093227,
				realname:'',
				nickname:'我就是我'
			};
		},
		methods:{
			select(){
				uni.toast('选择会员等级')
			},
			toChange(){
				uni.toast('确定开通会员')
			}
		}
	}
</script>

<style lang="scss">
.member-set{
	min-height: 100vh;
	background-color: #f3f3f3;
	padding-top: 1rpx;
	.item{
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 20rpx 24rpx;
		font-size: 28rpx;
		color: #333333;
		display: flex;
		flex-flow: row;
		.name{
			display: block;
			width: 140rpx;
			margin-right: 15rpx;
		}
	}
	.fui-cell-group{
		margin-top: 20rpx;
		background-color: #fff;
		line-height: 1.4;
		font-size: 32rpx;
		overflow: hidden;
		position: relative;
		display: block;
		.fui-cell{
			position: relative;
			padding: 30rpx 24rpx 26rpx;
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			-ms-flex-align: center;
			align-items: center;
			-moz-transition-duration: 300ms;
			-webkit-transition-duration: 300ms;
			transition-duration: 300ms;
			-webkit-transition-property: background-color;
			transition-property: background-color;
			line-height: 1.2;
			.fui-cell-label{
				position: relative;
				display: block;
				width: 154rpx;
				font-size: 28rpx;
				color: #666;
			}
			.fui-cell-label:after{
				content: "*";
				position: absolute;
				right: 8rpx;
				top: 8rpx;
				color: #f30;
				font-size: 32rpx;
			}
			.fui-cell-info{
				-webkit-box-flex: 1;
				-webkit-flex: 1;
				-ms-flex: 1;
				flex: 1;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				font-size: 28rpx;
				color: #333;
				.fui-input{
					width: 100%;
					border: 0;
					outline: 0;
					-webkit-appearance: none;
					background-color: transparent;
					font-size: inherit;
					color: inherit;
					height: 1.41176471em;
					line-height: 1.41176471;
				}
			}
		}
		.fui-cell:before{
			content: " ";
			position: absolute;
			left: 20rpx;
			right: 20rpx;
			bottom: -1px;
			height: 1px;
			border-top: 1px solid #f3f3f3;
			-webkit-transform-origin: 0 0;
			-ms-transform-origin: 0 0;
			transform-origin: 0 0;
			-webkit-transform: scaleY(0.5);
			-ms-transform: scaleY(0.5);
			transform: scaleY(0.5);
		}
	}
	.btn-wrap {
		.btn {
			display: block;
			width: 690rpx;
			height: 80rpx;
			line-height: 80rpx;
			margin: 50rpx auto 30rpx;
			text-align: center;
			background-color: #ff5555;
			color: #FFFFFF;
			border-radius: 10rpx;
		}
	}
}
</style>
