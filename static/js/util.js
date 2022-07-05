//项目URL相同部分，减轻代码量，同时方便项目迁移
//服务器请求地址
const xcRequestURL = {
	BASEURL: 'https://127.0.0.1',
	WAREHOUSE: {
		getMaterialList:'/app/material/getMaterialList', // 获取物料数据接口
		getMaterialsByMaterialNo:'/app/material/getMaterialsByMaterialNo', // 根据物料编号获取物料库存信息接口(扫码获取)
		getOutHouseRecordList:'/app/material/getOutHouseRecordList', // 根据物料编号获取出库记录接口
		getInHouseRecordList:'/app/material/getInHouseRecordList', // 根据物料编号获取入库记录接口
		outWareHouse:'/app/material/outOfStock', // 出库接口
		inWareHouse:'/app/material/wareHousing', // 入库接口
		getStoreHouseList:'/app/material/getStoreHouseList', // 获取仓库列表
		getXcMaterialsBy:'/app/material/getXcMaterialsByStorehouseIdOrMaterialsNo', // 根据仓库ID或物料编码获取当前物料位置列表
		getXcMaterialsList:'/app/material/getXcMaterialsListByMaterialsNo', // 根据物料编码获取当前物料存放的仓库列表
		switchLocation:'/app/material/switchLocation', // 根据参数信息转移位置
	},
	LOGIN: {
		login: '/app/user/login', //登录接口
		logout: '/app/user/logout', //退出接口
		phoneLogin: '/app/user/phoneLogin' //获取用户信息接口
	}
};

//服务器数据请求
// url:网络请求的url
// params:请求参数
// doSuccess:成功的回调函数
// fail：失败的回调
const xcRequest = {
	xcPost: function(url, params, doSuccess) {
		//uni.showNavigationBarLoading();
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		let contentType = 'application/json;charset=UTF-8';
		if(url == '/app/user/login' ){
			contentType = 'application/x-www-form-urlencoded;charset=UTF-8';
		}
		
		//if (message && message != "") {uni.showLoading({title: message})}
		
		uni.request({
			url: xcRequestURL.BASEURL + url,
			method: 'POST',
			data: params, 
			header: {
				'content-type': contentType  // 默认值
			},
			success(res) {
				//console.log(JSON.stringify(res)); 
				if (res.data.code == 100001) {
					uni.reLaunch({
						url: '../login/login',
					});
				}else{
					doSuccess(res.data);
				}
				if (res.data.status != 200) {
					uni.showToast({
						title: res.data.result,
						duration:3000,
						icon: 'none'
					});
				}
				if(res.data.code == 500){
					uni.showToast({
						title: res.data.msg,
						duration:3000,
						icon: 'none'
					}); 
				}
			},
			fail(err) {
				//uni.hideNavigationBarLoading();
				uni.showToast({
					title: '请求失败',
					duration:2200,
					icon: 'none'
				});
			},
			complete(res) {
				if(res.data.status != 200){
				  setTimeout(function(){
					uni.hideLoading();
				  },2000);
				}else{
					uni.hideLoading();
				}
				
				//console.log('完成');
			} 
		});
	},

	xcGet: function(url, params, doSuccess) {
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		uni.request({
			url: xcRequestURL.BASEURL + url,
			method: 'GET',
			data: params,
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				//console.log(JSON.stringify(res.data));
				if (res.data.code == 100001) {
					uni.reLaunch({
						url:"../login/login",
					});  
				}else{ 
					doSuccess(res.data);
				}
				if (res.data.status != 200) {
					uni.showToast({
						title: res.data.result,
						duration:3000,
						icon: 'none'
					});
				}
				if(res.data.code == 500){
					uni.showToast({
						title: res.data.msg,
						duration:3000,
						icon: 'none'
					});
				}
			},
			fail(err) {
				console.log('请求失败！');
			},
			complete(res) {
				if(res.data.status != 200){
				  setTimeout(function(){
					uni.hideLoading();
				  },2000);
				}else{
					uni.hideLoading();
				}
				//console.log('完成');
			}
		});
	}
};

//本地存储
const xcStorage = {
	getStorage: function(id) {
		var data;
		uni.getStorage({
			key: id,
			success(res) {
				data = res.data;
				if (data) {
					data = JSON.parse(data);
				}
				return data;
			},
			fail(res) {
				console.log("setfail")
			}
		});
	},
	setStorage: function(id, data) { 
		uni.setStorage({
			key: id,
			data: JSON.stringify(data),
			success: function(res) {
				console.log("save");
			}
		});
	},
	removeStorage: function(id) {
		uni.removeStorage({
			key: id,
			success(res) {
				console.log(res)
			}
		});
	},
	getStorageSync: function(id) {
		var data = null;
		try {
			data = uni.getStorageSync(id)
			if (data) {
				data = JSON.parse(data);
				// Do something with return value
			}
		} catch (e) {
			// Do something when catch error
		}
		//console.log(data);
		return data;
	},
	setStorageSync: function(id, data) {
		try {
			uni.setStorageSync(id, JSON.stringify(data))
		} catch (e) {}
	},
	removeStorageSync: function(id) {
		try {
			uni.removeStorageSync(id)
		} catch (e) {
			// Do something when catch error
		}
	},
	clearStorage: function() {
		uni.clearStorage();
	},
	clearStorageSync: function() {
		try {
			uni.clearStorageSync()
		} catch (e) {
			// Do something when catch error
		}
	}
};
 
const xcUrlCode = {
	getMaterialsNo:function(hrefs, param){
		let codeHtr = xcUrlCode.getQueryString(param, hrefs);
		let code = codeHtr.replace(/\s+/g, "");
		// let gunNo = code.substring(0, 1); // 首字母
		// let materialsNo = code.substring(1); // 物料编号
		let materialsNo = code;// 物料编号
		return materialsNo;
	},
	getQueryString:function(name, hrefs) {
	  var index1 = hrefs.indexOf('?');
	  if(index1 != -1){
		  hrefs = hrefs.substring(index1);
	  } 
	  var n = hrefs.indexOf(name);
	  if (n != -1) {
	    var str = hrefs.substring(n);
	    var m = str.indexOf("&");
	    var start = name.length + 1;
	    if (m != -1) {
	      var code = str.substring(start, m);
	    } else {
	      var code = str.substring(start);
	    }
	  }else{
	    var code = hrefs;
	  }
	  return code;
	}
}
module.exports = {
	xcRequestURL: xcRequestURL,
	xcRequest: xcRequest,
	xcStorage: xcStorage,
	xcUrlCode: xcUrlCode
}
