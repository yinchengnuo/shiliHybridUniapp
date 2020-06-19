<template>
	<view class="membercard-detail">
		<view class="nav" :class="{'active':state==2}" v-if="state==2">
			<text class="back" @click="goBack"></text>
			<text class="title">会员卡详情</text>
		</view>
		<view class="nav" v-else>
			<text class="back" @click="goBack"></text>
			<text class="title">会员卡详情</text>
		</view>
		<view class="golden" v-if="state==2">
			<image class="imgurl" src="../../static/member/golden-detail.png" mode=""></image>
			<image class="imgurlm" src="../../static/member/golden-text.png" mode=""></image>
			<image class="imgurlb" @click="buy" src="../../static/member/golden-buy.png" mode=""></image>
		</view>
		<view class="golden" v-else>
			<image class="imgurl" src="../../static/member/marketing-detail.png" mode=""></image>
			<image class="imgurlm" src="../../static/member/marketing-text.png" mode=""></image>
			<image class="imgurlb" @click="buy" src="../../static/member/marketing-buy.png" mode=""></image>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state:2
			};
		},
		onLoad(option) {
			this.state=option.state
		},
		methods:{
			buy(){
				console.log(this.state)
				if(this.state==1){
					uni.toast('购买营销中心');
					uni.navigateTo({
						url:'../pay/pay?type=1'
					})
				}else{
					uni.toast('购买金鲤领袖');
					uni.navigateTo({
						url:'../pay/pay?type=2'
					})
				}
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
.membercard-detail{
	height: 100%;
	.nav{
		width: 100%;
		height: 150rpx;
		display: flex;
		justify-content: center;
		padding: 0 30rpx;
		line-height: 170rpx;
		background: #4B4B4B;
		color: #FFFFFF !important;
		position: relative;
		font-weight: 600;
		.back{
			position: absolute;
			left: 30rpx;
		}
		.back:after{
			content: " ";
			display: inline-block;
			-webkit-transform: rotate(-135deg);
			-ms-transform: rotate(-135deg);
			transform: rotate(-135deg);
			height: 20rpx;
			width: 20rpx;
			border-width: 2px 2px 0 0;
			border-color: #FFFFFF;
			border-style: solid;
			position: relative;
			top: 0px;
			margin-left: .1em;
		}
	}
	.active{
		background-color: #C58240 !important;
	}
	.golden{
		display: flex;
		flex-flow: column;
		align-items: center;
		.imgurl{
			width: 750rpx;
			height: 270rpx;
		}
		.imgurlm{
			width: 750rpx;
			height: 590rpx;
		}
		.imgurlb{
			width: 750rpx;
			height: 140rpx;
		}
	}
}
</style>
