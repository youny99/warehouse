<template>
	<view class="container">
		<view class="login-logo">
			<image :src="loginLogo" class="login-img"></image>
		</view>
		<view class="login-wechat">
			<button class="login-btn" @click="getTestLogin">登 录</button>
			<!-- <button class="login-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信授权登录</button> -->
		</view>
		<view class="remark">物料管理</view>
	</view>
</template>

<script>
	const util = require('../../static/js/util.js'); 

	export default { 
		data() { 
			return {
				loginLogo: '../../static/image/logo.png',
				wechatImg:'../../static/image/wechat.png',
				code:'',
				encryptedData:'',
				iv:''
			}
		},
		created(){
			this.login('no');
		},
		onShow:function(){
		},
		methods: { 
			getPhoneNumber(e){
				// console.log(e);  
				if(e.detail.errMsg == 'getPhoneNumber:ok'){
					uni.showLoading({ 
						title:'授权登录中',
						duration:3000 
					});
					this.encryptedData = e.detail.encryptedData;
					this.iv = e.detail.iv;
					this.login('yes');
				}else{ 
					uni.showLoading({
						title:'授权登录失败！',
						duration:3000 
					});
				}
			},
			login(id) {
				var type ='weixin';
				uni.login({
					provider: type,
					success: (res) => {
						this.code = res.code; 
						if(id == 'yes'){
						   this.getLogin();
						}
					},
					fail: (err) => {
						console.error('登录失败：' + JSON.stringify(err));
					}
				});
			},
			getTestLogin(){
				var userState = {};
				userState.token = '123456';
				userState.outOfStockRecordNum = 32;
				userState.wareHousingRecordNum = 12;
				util.xcStorage.setStorage('userState', userState);
				var userInfo = '小小';
				
				util.xcStorage.setStorage('userInfo', userInfo);
				uni.switchTab({
					url: '/pages/index/index',
					fail:function(res){
						console.log(res);
					}
				});
			},
			getLogin(){
				uni.hideLoading(); 
				const url = util.xcRequestURL.LOGIN.phoneLogin + '?js_code=' + this.code + '&encryptedData=' + this.encryptedData + '&iv='+this.iv;
				util.xcRequest.xcPost(url, {}, function(res) {
					// console.log(JSON.stringify(res));
					if(res.status == 200){
						const { result } = res;
						var userState = {};
						userState.token = result.token;
						userState.outOfStockRecordNum = result.outOfStockRecordNum;
						userState.wareHousingRecordNum = result.wareHousingRecordNum;
						util.xcStorage.setStorage('userState', userState);
						var userInfo = result.user;
						
						util.xcStorage.setStorage('userInfo', userInfo);
						uni.switchTab({
							url: '/pages/index/index',
							fail:function(res){
								console.log(res);
							}
						});
					}
				}); 
			},
			
		},
		onLoad() {  }
	}
</script>

<style>
	.content{
		font-size:28upx;
	}
	.login-logo {
		padding: 80px 15px 50px;
		text-align: center;
		background-image: url('../../static/image/login-bg.png');
		background-size:cover;
	}
    .login-img{
		width:70px;
		height:70px;
		border-radius:50%;
		background:#fff;
     }
   .login-group{
	   width:80%;
	   margin:auto;
	   padding-bottom:15px;
   }

	.btn-define {
		color:#fff;
		background: #6d3b85 !important;
		border-radius: 20px;
		font-size:14px;
	}
	.login-wechat{
		width:80%;
		margin:auto;
		padding-top:30px;
		text-align:center;
	}
	.login-item{
		padding-bottom:10px;
	}
	.login-wechat .login-btn{
		display:inline-block;
		margin:auto;
		width:120px;
		font-size:14px;
		color:#fff;
		border:1px solid #6d3b85;
		background:#6d3b85;
		border-radius:20px;
	}
	.login-btn:after{
		border:0;
	}
	.remark{
		position:fixed;
		bottom:15px;
		width:100%;
		text-align:center;
		color:#888;
		font-size:12px;
	}
</style>
