<template>
	<view class="login-psw">
		<view class="shili-logo">
			<image class="logo-img" src="../../static/login/logo.png" mode=""></image>
		</view>
		<view class="input-content">
			<view class="input-item">
				<view class="icon-wrap">
					<image class="icon-img" src="../../static/login/phone.png" mode=""></image>
				</view>
				<input @keyboardheightchange="console.log(2333)" focus type="number"  v-model="phone" placeholder="请输入手机号码" placeholder-class="input-empty" maxlength="11" />
			</view>
			<view class="input-item">
				<view class="icon-wrap">
					<image class="icon-img" src="../../static/login/pws.png" mode=""></image>
				</view>
				<input @keyboardheightchange="console.log(2333)" type="number" v-model="psw" placeholder="请输入密码" placeholder-class="input-empty" maxlength="20" password />
			</view>
		</view>
		<view class="flex-wrap">
			<view class="register" @click="$iRouter.push('/register')">立即注册</view>
			<view class="register" @click="$iRouter.push('/forget-psw')">忘记密码?</view>
		</view>
		<view class="buttonWrap">
			<view class="button" @click="login">立即登录</view>
		</view>
		<view class="red" @click="$iRouter.replace('/login-code')">手机验证码登录></view>
		<view class="company">- 河南拾之鲤信息科技有限公司-</view>
	</view>
</template>

<script>
	import { _API_LoginPsw } from '@/apis/login.js'
	export default {
		data(){
			return{
				phone: '',
				psw: ''
			}
		},
		beforeDestroy() {
			uni.FROMLOGIN = true
			setTimeout(() => uni.FROMLOGIN = false, 1234)
		},
		methods:{
			login() { // 点击登录
				if (this.phone && this.psw) {
					this.$request(_API_LoginPsw({ mobile: this.phone, pwd: this.psw, uniacid: 13 }), data => {
						Object.assign(this.$storage, data)
						uni.toast('登陆成功')
						uni.loading()
						uni.LOGCHANGED = true
						this.$store.dispatch('user/getUserInfo').then(() => {
							this.$iRouter.pop()
							uni.uloading()
						})
					})
				} else {
					uni.toast('请输入手机号和密码')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-psw {
		background: #FFFFFF;
		height: 100%;
		position: relative;
		.shili-logo{
			width: 750rpx;
			height: 380rpx;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			box-sizing: border-box;
			.logo-img{
				width: 412rpx;
				height: 204rpx;
			}
		}
		.input-content{
			padding: 0 60rpx;
			.input-item{
				display:flex;
				flex-direction: row;
				align-items:center;
				justify-content: center;
				padding: 0 30rpx;
				height: 100rpx;
				border-radius: 4px;
				margin-bottom: 20rpx;
				border-bottom: 1rpx solid #ECECEC;
				.icon-img{
					width: 30rpx;
					height: 38rpx;
				}
				&:last-child{
					margin-bottom: 0;
				}
				input{
					height: 60rpx;
					width: 100%;
					font-family: PingFangSC-Regular, sans-serif;
					font-size: 32rpx;
					margin-left: 24rpx;
					color: #333333;
				}
				.input-empty{
					color: #999999;
					font-family: PingFangSC-Regular, sans-serif;
					font-size: 32rpx;
				}
			}
		}
		.flex-wrap{
			display: flex;
			flex-flow: row;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 70rpx;
			.register{
				color: #666666;
				font-size: 28rpx;
				line-height: 1.5;
				font-family: PingFangSC-Regular, sans-serif;
				font-weight: Regular;
			}
		}
		.buttonWrap{
			width: 100%;
			display: flex;
			margin-top: 40rpx;
			align-items: center;
			justify-content: center;			.button{
				width:85%;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				border-radius: 90rpx;
				color: #FFFFFF;
				background-color: #FE3E2C;
				background: -webkit-linear-gradient(to left, #FF7257 , #FE3E2C,#FE3E2C); /* Safari 5.1 - 6.0 */
				background: -o-linear-gradient(to left, #FF7257, #FE3E2C,#FE3E2C); /* Opera 11.1 - 12.0 */
				background: -moz-linear-gradient(to left, #FF7257, #FE3E2C,#FE3E2C); /* Firefox 3.6 - 15 */
				background: linear-gradient(to left, #FF7257 , #FE3E2C,#FE3E2C); /* 标准的语法（必须放在最后） */
				font-size: 32rpx;
				font-weight: 500;
			}
		}
		.red{
			width: 100%;
			line-height: 36rpx;
			color: #FE3E2C;
			font-size: 32rpx;
			margin: 40rpx 0;
			text-align: center;
		}
		.company{
			width: 100%;
			position: absolute;
			bottom: 80rpx;
			left: 0;
			line-height: 24rpx;
			font-size: 32rpx;
			text-align: center;
			color: #BABABA;
		}
	}
</style>
