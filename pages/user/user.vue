<template>
	<view class="page-container">
		<view class="page-section">
			<view class="user-header">
				<view class="user-icon">
					<uni-icons custom-prefix="iconfont" color="#fff" type="icon-yonghuzhongxin" size="32"></uni-icons>
				</view>
				<view class="user-info">{{userName}}</view>
			</view>
		</view>

		<view class="page-section">
			<view class="page-btn">
				<button class="btn-default" type="default" @click="bindLogout">退出登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	const util = require('../../static/js/util.js');
	export default {
		data() {
			return {
				userState:{},
				userName: ''
			}
		},
		created(){
			const userInfo = util.xcStorage.getStorageSync('userInfo');
			this.userState = util.xcStorage.getStorageSync('userState');
			this.userName = userInfo.userName;
		},
		onShow(){ },
		methods: {
			// ...mapMutations(['logout']),
			bindLogout() {
				util.xcStorage.removeStorage('userState');
				util.xcStorage.removeStorage('userInfo');
				// this.$store.commit('logout');
				uni.reLaunch({ 
					url: '../login/login',
				});
				// const url = util.xcRequestURL.LOGIN.logout+ "?token=" + this.userState.token;
				// util.xcRequest.xcGet(url, {}, function(res) { });
			}
		}
	}
</script>

<style>
	.page-container {
		width: 100%;
		font-size: 14px;
	}

	.page-section {
		margin-bottom: 20px;
	}

	.user-header {
		position: relative;
		background: #6d3b85;
		padding: 60px 20px;
		color: #fff;
	}

	.user-icon {
		display: inline-block;
		padding-right: 20px;
		vertical-align: top;
	}
	
	.user-info {
		display: inline-block;
		line-height: 40px;
		font-size: 16px;
	}

	.page-btn {
		padding: 50px 20px 20px;
	}
	.btn-default{
		font-size:14px;
		color: #6d3b85 !important;
		line-height:2.5;
		border-radius:20px;
		border:1px solid #6d3b85;
	}
</style>
