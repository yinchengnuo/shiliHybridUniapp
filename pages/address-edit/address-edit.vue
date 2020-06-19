<template>
	<view class="address-edit">
		<w-picker ref="Selector" mode="region" :defaultVal="pickerDefaultVal" themeColor="#F76454" @confirm="onConfirm" />
		<view class="fui-content">
			<form method="post" class="form-ajax">
				<div class="fui-cell-group">
					<div class="fui-cell">
						<div class="fui-cell-label">收货人</div>
						<div class="fui-cell-info">
							<input type="text" v-model="realname"  placeholder="请填写收货人姓名" class="fui-input">
						</div>
					</div>
					<div class="fui-cell">
						<div class="fui-cell-label">联系电话</div>
						<div class="fui-cell-info ">
							<input type="number" maxlength="11" v-model="mobile"  placeholder="请填写联系电话" class="fui-input">
						</div>
					</div>
					<div class="fui-cell" @click="$refs.Selector.show()">
						<div class="fui-cell-label">所在地区</div>
						<div class="fui-cell-info">
							<input disabled maxlength="11" v-model="areas" placeholder="所在地区" class="fui-input" readonly="readonly">
						</div>
					</div>
					<div class="fui-cell">
						<div class="fui-cell-label">详细地址</div>
						<div class="fui-cell-info">
							<input type="text" v-model="address"  placeholder="街道，楼牌号等" class="fui-input">
						</div>
					</div>
					<div class="fui-cell ">
						<div class="fui-cell-label" style="width:auto">设置默认地址</div>
						<div class="fui-cell-info switch-btn">
							<switch @change="changeSwitch" :checked="checked" :class="{ checked: checked, red: checked }" />
						</div>
					</div>
				</div>
				<view @click="saveAdress" class="btn" style="margin-top:1.25rem">保存地址</view>
			</form>
		</view>
	</view>
</template>

<script>
	import { _API_AddAddress } from '@/apis/address.js'
	import WPicker from '@/components/w-picker/w-picker.vue'
	import cityData from '@/components/w-picker/city-data/city.js'
	import areaData from '@/components/w-picker/city-data/area.js'
	import provinceData from '@/components/w-picker/city-data/province.js'
	export default {
		components: { WPicker },
		data() {
			return {
				id: '',
				areas: '',
				codes: '',
				address: '',
				mobile: '',
				realname: '',
				checked: true,
				pickerDefaultVal: ['北京市', '市辖区', '东城区'],
				edit: false,
			}
		},
		watch: {
			defaulta(n) {
				console.log(n)
			}
		},
		onLoad({ id }) {
			if (id) {
				const address = this.$store.state.address.address.find(e => e.id == id)
				this.id = id
				this.areas = `${address.province} ${address.city} ${address.area}`
				this.codes = address.datavalue
				this.address = address.address
				this.mobile = address.mobile
				this.realname = address.realname
				this.checked = Boolean(+address.isdefault)
				this.pickerDefaultVal = [address.province, address.city, address.area]
				this.edit = true
				uni.setNavigationBarTitle({ title: '编辑地址' })
			}
		},
		methods: {
			changeSwitch({ detail: { value }}) { // 切换默认地址
				this.checked = value
			},
			onConfirm(e) { // 选中所在地区
				this.areas = `${e.checkArr[0]} ${e.checkArr[1]} ${e.checkArr[2]}`
				this.codes = `${e.checkValue[0]}0000 ${e.checkValue[1]}00 ${e.checkValue[2]}`
			},
			saveAdress(){
				if (!this.realname.match(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/)) { // 校验姓名
					uni.toast('真实姓名不符合要求')
					return
				}
				if (!this.mobile.match(/^1\d{10}$/)) { // 校验手机号
					uni.toast('手机号码不符合要求')
					return
				}
				if (!this.areas.length) { // 校验是否选择地区
					uni.toast('请选择所在地区')
					return
				}
				if (!this.address.length) { // 校验是否填写详细地址
					uni.toast('详细地址不能为空')
					return
				}
				this.$request(_API_AddAddress({
					id: this.id,
					...this.$serializeMap({
						realname: this.realname,
						mobile: this.mobile,
						address: this.address,
						areas: this.areas,
						datavalue: this.codes,
						isdefault: this.checked ? '1' : '0'
					}, 'addressdata')
				}), data => {
					uni.toast(this.edit ? '修改成功' : '添加成功')
					this.$iRouter.pop()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address-edit {
		.fui-content{
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
						width: 144rpx;
						font-size: 28rpx;
						color: #666;
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
					.switch-btn{
						text-align: right;
					}
				}
				.fui-cell:before{
					content: " ";
					position: absolute;
					left: 20rpx;
					right: 20rpx;
					bottom: -1rpx;
					height: 1rpx;
					border-top: 1rpx solid #ebebeb;
					color: #D9D9D9;
					-webkit-transform-origin: 0 0;
					-ms-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scaleY(0.5);
					-ms-transform: scaleY(0.5);
					transform: scaleY(0.5);
				}
			}
			.btn{
				border-radius: 10rpx;
				box-sizing: border-box;
				font-family: inherit;
				font-size: 30rpx;
				height: 80rpx;
				line-height: 76rpx;
				margin: 0;
				padding: 0 24rpx;
				position: relative;
				text-align: center;
				text-decoration: none;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin: 24rpx;
				background: #ff5555;
				color: #fff;
				border: 1px solid #ff5555;
			}
		}
	}
</style>
