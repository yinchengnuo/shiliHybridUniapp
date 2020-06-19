<template>
	<view class="num-input" @click.stop="">
		<view class="i l" @click="red">-</view>
		<view class="i c" @click="inputNum = value ? value : '';  step == 1 ? showInput = true : ''">{{ value }}</view>
		<view class="i r basecolor" @click="add">+</view>
		<view v-if="showInput" class="inputModelWrapper">
			<view class="inputModel">
				<view class="t">请输入数量</view>
				<view class="m">
					<input ref="input" focus type="number" maxlength="4" v-model="inputNum" />
				</view>
				<view class="b">
					<text class="l" @click="showInput = false">取消</text>
					<text class="r basecolor" @click="comfirmNum">确定</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			min: { type: Number, default: 0 },
			value: { type: Number, default: 0 },
			args: { type: Array, default: () => [] },
			max: { type: Number, default: 9999 },
			step: { type: Number, default: 1 }
		},
		data() {
			return {
				showInput: false,
				inputNum: 0
			}
		},
		methods: {
			red() {
				if (this.value - this.step >= this.min) {
					this.$emit('change', this.value - this.step, ...this.args)
					this.$emit('input', this.value - this.step, ...this.args)
				}
			},
			add() {
				if (this.value + this.step > this.max) {
					uni.toast('数量不能再多了')
				} else {
					this.$emit('change', this.value + this.step, ...this.args)
					this.$emit('input', this.value + this.step, ...this.args)
				}
			},
			comfirmNum() {
				if (this.inputNum) {
					if (+this.inputNum > this.max) {
						this.$emit('change', this.max, ...this.args)
						this.$emit('input', this.max, ...this.args)
					} else {
						this.$emit('change', +this.inputNum, ...this.args)
						this.$emit('input', +this.inputNum, ...this.args)
					}
				} else {
					this.$emit('change', 0, ...this.args)
					this.$emit('input', 0, ...this.args)
				}
				this.showInput = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.num-input {
		@include flex();
		width: 144rpx;
		height: 44rpx;
		overflow: hidden;
		font-size: 32rpx;
		background: #F2F2F2;
		.i {
			flex: 1;
			height: 100%;
			@include flex();
			&.c {
				border-left: 4rpx solid #FFFFFF;
				border-right: 4rpx solid #FFFFFF;
			}
		}
		.inputModelWrapper {
			@include flex();
			top: 0;
			left: 0;
			z-index: 2;
			width: 100vw;
			height: 100vh;
			position: fixed;
			background: rgba(0, 0, 0, 0.3);
			.inputModel {
				width: 600rpx;
				height: 400rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				@include flex(column);
				.t {
					@include flex();
					width: 100%;
					height: 100rpx;
					border-bottom: 1rpx solid #CCCCCC;
				}
				.m {
					width: 100%;
					flex: 1;
					@include flex();
					input {
						width: 240rpx;
						height: 120rpx;
						text-align: center;
						font-size: 88rpx;
						border-radius: 8rpx;
						border: 1rpx solid #CCCCCC;
					}
				}
				.b {
					@include flex();
					width: 100%;
					height: 100rpx;
					border-top: 1rpx solid #CCCCCC;
					text {
						height: 100%;
						flex: 1;
						@include flex();
						&.basecolor {
							border-left: 1rpx solid #CCCCCC;
						}
					}
				}
			}
		}
	}
</style>
