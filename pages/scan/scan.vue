<template>
	<view class="content">
		扫一扫
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
			}
		},
		onLoad() {
			//扫码
			// this.$options.methods.onScan(this,1);
		},
		onShow(){},
		methods: {
			onScan: function() {
				const _this = this;
				// 只允许通过相机扫码
				uni.scanCode({
				    onlyFromCamera: true,
				    success: function (res) {
						_this.devId = res.result;
				    } 
				});
			},
		}
	}
</script>

<style>
</style>
