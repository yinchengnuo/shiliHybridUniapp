<template>
	<view class="register">
		<view class="shili-logo">
			<image class="logo-img" src="../../static/login/logo.png" mode=""></image>
		</view>
		<view class="input-content">
			<view class="input-item">
				<view class="icon-wrap">
					<image class="icon-img" src="../../static/login/phone.png" mode=""></image>
				</view>
				<input type="number" v-model="phone" placeholder="请输入手机号码" placeholder-class="input-empty" maxlength="11" />
			</view>
			<view class="input-item">
				<view class="icon-wrap">
					<image class="icon-img" src="../../static/login/tpyz.png" mode=""></image>
				</view>
				<input class="input" type="number" v-model="imgCode" placeholder="图形验证码" placeholder-class="input-empty" maxlength="6" />
				<view class="codeWrap">
					<image v-if="imgURL" class="codeImg" :src="imgURL" @click="refreshCodeImg"></image>
				</view>
			</view>
			<view class="input-item">
				<view class="icon-wrap">
					<image class="icon-img" src="../../static/login/dxyz.png" mode=""></image>
				</view>
				<input class="input" type="number" v-model="code" placeholder="请输入手机验证码" placeholder-class="input-empty" maxlength="6" />
				<view class="code" @click="getCode">获取验证码 <text v-if="count">{{ count }}</text></view>
			</view>
			<view class="input-item">
				<view class="icon-wrap">
					<image class="icon-img" src="../../static/login/pws.png" mode=""></image>
				</view>
				<input type="text" v-model="psw1" placeholder="请输入登录密码" placeholder-class="input-empty" maxlength="20" password />
			</view>
			<view class="input-item">
				<view class="icon-wrap">
					<image class="icon-img" src="../../static/login/pws.png" mode=""></image>
				</view>
				<input type="text" v-model="psw2" placeholder="请再次确认登陆密码" placeholder-class="input-empty" maxlength="20" password />
			</view>
		</view>
		<view class="red">
			<label class="radio">
				<switch checked type="checkbox" v-model="agree" color="#ff6600" />
				<text class="text-left">阅读并同意</text>
				<text class="text-color" @click="$iRouter.push('/agreement')">《拾鲤助销平台用户服务协议》</text>
			</label>
		</view>
		<view class="buttonWrap" @click="login">
			<view class="button"> 立即注册</view>
		</view>
		<!-- <view class="red" @click="toLogin">手机密码登录></view> -->
		<view class="company">- 河南拾之鲤信息科技有限公司-</view>
	</view>
</template>

<script>
	import { baseURL } from '../../utils/request.js'
	import { _API_ImgCode, _API_GetCode6, _API_Reg } from '../../apis/login.js'
	export default {
		data() {
			return {
				code: '',
				count: 0,
				agree: '',
				psw1: '',
				psw2: '',
				phone: '',
				imgCode: '',
				maxCount: 60,
				imgURL: baseURL + _API_ImgCode
			}
		},
		methods: {
			refreshCodeImg() { // 点击刷新验证码
				this.imgURL = ''
				this.$nextTick(() => this.imgURL = baseURL + _API_ImgCode)
			},
			getCode() { // 点击获取手机验证码
				if (!this.phone) {
					uni.toast('请输入手机号');
					return
				}
				if (!this.imgCode) {
					uni.toast('请输入图形验证码');
					return
				}
				if (this.count) {
					uni.toast('验证码已发送，请稍后重试');
					return
				} else {
					this.$request(_API_GetCode6({
						mobile: this.phone,
						temp: 'sms_reg',
						imgcode: this.imgCode,
						uniacid: 13
					}), data => {
						console.log(data)
						this.count = this.maxCount
						this.timer = setInterval(() => {
							this.count--
							if (this.count <= 0) {
								this.count = 0
								clearInterval(this.timer)
							}
						}, 1000)
					})
				}
			},
			login() {
				if (!this.phone)  { uni.toast('请输入手机号'); return }
				if (!this.imgCode)  { uni.toast('请输入图形验证码'); return }
				if (!this.code)  { uni.toast('请输入手机验证码'); return }
				if (!this.psw1)  { uni.toast('请输入手机验证码'); return }
				if (!this.psw2)  { uni.toast('请输入新的登录密码'); return }
				if (!this.psw2)  { uni.toast('请再次输入新的登录密码'); return }
				if (this.psw1 != this.psw2)  { uni.toast('两次输入的密码不一致'); return }
				this.$request(_API_Reg({
					mobile: this.phone,
					verifycode: this.code,
					pwd: this.psw1,
					uniacid: 13,
				}), data => {
					this.$iRouter.pop()
					uni.toast('注册成功')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.register {
		background: #FFFFFF;
		min-height: 100%;
		position: relative;
		.shili-logo {
			width: 750rpx;
			height: 380rpx;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			box-sizing: border-box;

			.logo-img {
				width: 412rpx;
				height: 204rpx;
			}
		}

		.input-content {
			padding: 0 60rpx;

			.input-item {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-start;
				padding: 0 30rpx;
				height: 100rpx;
				border-radius: 4px;
				margin-bottom: 20rpx;
				border-bottom: 1rpx solid #ECECEC;

				.icon-img {
					width: 30rpx;
					height: 38rpx;
				}

				&:last-child {
					margin-bottom: 0;
				}

				input {
					height: 60rpx;
					width: 100%;
					font-family: PingFangSC-Regular, sans-serif;
					font-size: 32rpx;
					margin-left: 24rpx;
					color: #333333;
				}

				.input {
					width: 57%;
				}

				.input-empty {
					color: #999999;
					font-family: PingFangSC-Regular, sans-serif;
					font-size: 32rpx;
				}

				.codeWrap {
					.codeImg {
						width: 182rpx;
						height: 46rpx;
					}
				}

				.code {
					flex: 1;
					@include flex();
					color: #FE3E2C;
					font-size: 28rpx;
					padding: 10rpx;
					line-height: 1.5;
					background-color: transparent;
					border: 1rpx solid #FE3E2C;
					border-radius: 32rpx;
				}
			}
		}

		.buttonWrap {
			width: 100%;
			display: flex;
			margin-top: 40rpx;
			align-items: center;
			justify-content: center;
			padding-bottom: 160rpx;

			.button {
				width: 85%;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				border-radius: 90rpx;
				color: #FFFFFF;
				background-color: #FE3E2C;
				background: -webkit-linear-gradient(to left, #FF7257, #FE3E2C, #FE3E2C);
				/* Safari 5.1 - 6.0 */
				background: -o-linear-gradient(to left, #FF7257, #FE3E2C, #FE3E2C);
				/* Opera 11.1 - 12.0 */
				background: -moz-linear-gradient(to left, #FF7257, #FE3E2C, #FE3E2C);
				/* Firefox 3.6 - 15 */
				background: linear-gradient(to left, #FF7257, #FE3E2C, #FE3E2C);
				/* 标准的语法（必须放在最后） */
				font-size: 32rpx;
				font-weight: 500;
			}
		}

		.red {
			width: 100%;
			line-height: 36rpx;
			font-size: 32rpx;
			margin: 40rpx 0;
			text-align: center;

			.text-left {
				margin-left: 10rpx;
			}

			.text-color {
				color: #FE3E2C;
			}
		}

		.company {
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
