<template>
	<view class="container homepage">
		<view class="section cardinfo">
			<view class="cardinfo-title">今日新增</view>
			<view> 
				<view class="cardinfo-item">入库<view class="cardinfo-item-num">{{userState.wareHousingRecordNum}}</view></view>
				<view class="cardinfo-item">出库<view class="cardinfo-item-num">{{userState.outOfStockRecordNum}}</view></view>
			</view>
		</view>
		<view class="section nav"> 
			<uni-grid :column="3" :showBorder="false"  :square="false" @change="onTabChange">
			    <uni-grid-item index="0">
					<view class="nav-item">
						<view class="nav-item-img"><uni-icons custom-prefix="iconfont" color="#fff" type="icon-ruku" size="34"></uni-icons></view>
						<!-- <uni-icons type="contact" size="30"></uni-icons> -->
						<text class="text">入库</text>
					</view>
			    </uni-grid-item>
			    <uni-grid-item index="1">
					<view class="nav-item">
						<view class="nav-item-img"><uni-icons custom-prefix="iconfont" color="#fff" type="icon-chuku" size="34"></uni-icons></view>
						<text class="text">出库</text>
					</view>
			    </uni-grid-item>
				<uni-grid-item index="2">
					<view class="nav-item">
						<view class="nav-item-img"><uni-icons custom-prefix="iconfont" color="#fff" type="icon-wuliaoguanli1" size="34"></uni-icons></view>
				        <text class="text">物料</text>
					</view>
				</uni-grid-item>
				<uni-grid-item index="3">
					<view class="nav-item">
						<view class="nav-item-img"><uni-icons custom-prefix="iconfont" color="#fff" type="icon-peijianrukutongji" size="28"></uni-icons></view>
						<text class="text">入库统计</text>
					</view>
				</uni-grid-item>
				<uni-grid-item index="4">
					<view class="nav-item">
						<view class="nav-item-img"><uni-icons custom-prefix="iconfont" color="#fff" type="icon-peijianchukutongji" size="28"></uni-icons></view>
						<text class="text">出库统计</text>
					</view>
				</uni-grid-item>
			    <uni-grid-item index="5">
					<view class="nav-item">
						<view class="nav-item-img"><uni-icons custom-prefix="iconfont" color="#fff" type="icon-kucunpandian" size="34"></uni-icons></view>
			            <text class="text">库存状态</text>
					</view>
			    </uni-grid-item>
			</uni-grid>
		</view>
		<view class="scan-img" @click="onScan"><uni-icons custom-prefix="iconfont" color="#6d3b85" type="icon-saoyisao1" size="50"></uni-icons></view>
		
	</view>
</template>

<script>
	const util = require('../../static/js/util.js'); 
	export default {
		data() {
			return {
				userState: {
					wareHousingRecordNum:0,
					outOfStockRecordNum:0
				},
			}
		},
		created(){},
		onLoad(){},
		onShow(){
			this.userState = util.xcStorage.getStorageSync('userState');
			if (!this.userState || this.userState == '') {
				uni.redirectTo({
					url: '/pages/login/login'
				});
			}
		},
		methods: {
			// 调起扫二维码
			onScan: function() {
				var _this = this;
				// 只允许通过相机扫码
				uni.scanCode({ 
				    onlyFromCamera: true,
				    success: function (res) {
						let materialsNo = util.xcUrlCode.getMaterialsNo(res.result, 'code');
						let pageUrl = '/pages/materials/materials?materialsNo='+ materialsNo; 
						uni.navigateTo({
						  url: pageUrl,
						  success: function(res) {
						    // 通过eventChannel向被打开页面传送数据
						  },
						  fail:function(res){
							  console.log(res);
						  },
						  complete:function(){
							  console.log("open page ");
						  }
						});
				    }
				});
			}, 
			onTabChange:function(e){
				var pageUrl = '';
				var index = e.detail.index;
				index = parseInt(index);
			},
			onClick:function(){}
		}
	}
</script>

<style>
	.container {
		padding: 15px;
		font-size: 14px;
		line-height: 24px;
	}
	.section{
		padding:15px;
	}
	.cardinfo{
		background:#6d3b85;
		color:#fff;
		border-radius:8px;
	}
	.cardinfo-title{
		padding-bottom:5px;
		margin-bottom:10px;
		font-size:16px;
		border-bottom:1px dashed #ccc;
	}
	.cardinfo-item{
		padding:5px 0;
		display:inline-block;
		width:50%;
		line-height:2;
		text-align:center;
	}
	.cardinfo-item-num{
		font-size:28px;
	}
	.homepage .nav{
		margin-top:20px;
		background:#fff;
	}
	.nav-item{
		margin-top:10px;
		margin-bottom:10px;
		text-align:center;
	}
	.homepage .nav .text{
		padding-top:6px;
		font-size:13px;
	}
	.nav-item .nav-item-img{
		margin:auto;
		width:50px;
		height:50px;
		line-height:50px;
		border-radius:50%;
		color:#fff;
		background-color: #6d3b85;
	}
	.scan-img{
		margin:25px auto 0;
		padding:0;
		width:80px;
		height:80px;
		line-height:80px;
		text-align:center;
		background:#fff;
		border-radius:50%;
		box-sizing: border-box;
	}
</style>
