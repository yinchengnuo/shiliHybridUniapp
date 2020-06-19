<template>
	<view class="member-info">
		<view class="fui-content">
			<view class="fui-list-group" @click="chooseImg">
				<view class="fui-list">
					<view class="fui-list-inner" style="color: #666;">修改头像</view>
					<view class="fui-list-media">
						<image :src="avatar" >
					</view>
					<view class="fui-list-angle">
						<view class="angle"></view>
					</view>
				</view>
			</view>
			<view class="fui-cell-group">
				<view class="fui-cell must ">
					<view class="fui-cell-label ">修改昵称</view>
					<view class="fui-cell-info">
						<input type="text" class="fui-input" placeholder="请输入您的昵称" v-model="nickname" />
					</view>
				</view>
				<view class="fui-cell must ">
					<view class="fui-cell-label ">姓名</view>
					<view class="fui-cell-info c000">
						<input type="text" class="fui-input" placeholder="请输入您的姓名" v-model="realname" />
					</view>
				</view>
				<view class="fui-cell must ">
					<view class="fui-cell-label ">手机号</view>
					<view class="fui-cell-info c000">
						<input class="fui-input" type="text" disabled v-model="phone" placeholder="请输入您的手机号" />
					</view>
				</view>
				<!-- <view class="fui-cell must" id="showMoalB">
					<view class="fui-cell-label">短信验证码</view>
					<view class="fui-cell-info"><input type="tel" class="fui-input" name="verifycode" placeholder="5位验证码"
						 value="" maxlength="5"></view>
					<view class="fui-cell-remark noremark"><a class="btn btn-default btn-default-o btn-sm">获取验证码</a>
					</view>
				</view> -->
			</view>
			<view class="fui-cell-group">
				<view class="fui-cell must ">
					<view class="fui-cell-label ">推荐人</view>
					<view class="fui-cell-info">
						<input type="hidden" disabled class="fui-input"  value="33666"></view>
				</view>
			</view>
			<view class="btn-wrap">
				<text class="btn blue" @click="toChange" >确认修改</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { _API_UploadImg } from '../../apis/pub.js'
	import { _API_UserSetInfo } from '../../apis/user.js'
	export default {
		data() {
			return {
				avatar: this.$store.state.user.userinfo.avatar,
				nickname: this.$store.state.user.userinfo.nickname,
				realname: this.$store.state.user.userinfo.realname,
				phone: this.$store.state.user.userinfo.mobile
			};
		},
		methods:{
			chooseImg() {
				uni.chooseImage({ count: 1 }).then(([, res]) => {
					if (res) {
						this.$request(_API_UploadImg({ name: 'file', filePath: res.tempFilePaths[0] }), data => {
							this.avatar = data.url
						})
					}
				})
			},
			toChange(){
				if (!this.nickname.trim().length) { uni.toast('请输入昵称'); return }
				if (!this.realname.match(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/)) { uni.toast('请输入真实姓名'); return }
				this.$request(_API_UserSetInfo({
					mid: this.$store.state.user.userinfo.id,
					avatar: this.avatar,
					nickname: this.nickname,
					realname: this.realname,
				}), () => {
					this.$store.dispatch('user/getUserInfo')
					this.$iRouter.pop()
				})
			},
		}
	}
</script>

<style lang="scss">
	.member-info {
		height: 100vh;
		background-color: #f3f3f3;
		padding-top: 2rpx;
		.fui-list-group{
			background-color: #fff;
			position: relative;
			margin-top: 20rpx;
			position: relative;
			.fui-list{
				position: relative;
				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				padding: 16rpx 24rpx;
				-moz-transition-duration: 300ms;
				-webkit-transition-duration: 300ms;
				transition-duration: 300ms;
				-webkit-box-align: center;
				-webkit-align-items: center;
				-ms-flex-align: center;
				align-items: center;
				overflow: hidden;
				.fui-list-inner{
					position: relative;
					width: 100%;
					overflow: hidden;
					box-sizing: border-box;
					display: -webkit-box;
					display: -webkit-flex;
					display: flex;
					-webkit-box-flex: 1;
					-webkit-flex: 1;
					-ms-flex: 1;
					flex: 1;
					color: #666;
				}
				.fui-list-media{
					display: -webkit-box;
					display: -webkit-flex;
					display: flex;
					-webkit-flex-shrink: 0;
					-ms-flex: 0 0 auto;
					-webkit-flex-shrink: 0;
					flex-shrink: 0;
					-webkit-box-lines: single;
					-moz-box-lines: single;
					-webkit-flex-wrap: nowrap;
					flex-wrap: nowrap;
					box-sizing: border-box;
					-webkit-box-align: center;
					-webkit-align-items: center;
					align-items: center;
					margin-right: 24rpx;
					color: #aaa;
					position: relative;
					image{
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
					}
				}
				.fui-list-angle{
					position: relative;
					vertical-align: middle;
					margin-right: 24rpx;
					margin-left: 20rpx;
					.angle:after{
						content: " ";
						display: inline-block;
						-webkit-transform: rotate(45deg);
						-ms-transform: rotate(45deg);
						transform: rotate(45deg);
						height: 16rpx;
						width: 16rpx;
						border-width: 1px 1px 0 0;
						border-color: #b2b2b2;
						border-style: solid;
						position: relative;
						top: 0px;
						margin-left: .1em;
					}
				}
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
				background: #CCCCCC;
				color: #FFFFFF;
				border-radius: 10rpx;
			}
			.submit{
				background-color: #ff5555;
			}
		
			.blue {
				background-color: #ff5555;
			}
		}
	}
</style>
