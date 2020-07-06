<template>
	<view>
		<view class="app-1">
			<view class="">
				<view class=""><image style="width: 69upx;height: 52upx;" src="../../static/img/monitor/1.png" mode=""></image></view>
				<text class="on">申请人信息</text>
			</view>
			<view class="">
				<view class=""><image style="width: 63upx;height: 50upx;" src="../../static/img/monitor/2.png" mode=""></image></view>
				<text class="on">被申请人信息</text>
			</view>
			<view class="">
				<view class=""><image style="width: 63upx;height: 50upx;" src="../../static/img/monitor/3.png" mode=""></image></view>
				<text class="on">请求事项</text>
			</view>
			<view class="">
				<view class=""><image style="width: 56upx;height: 44upx;" src="../../static/img/monitor/4.png" mode=""></image></view>
				<text class="on">上传身份证</text>
			</view>
		</view>
		<view class="app-2">
			<text>请上传身份证正反面照片</text>
			<view class="app-from">
				<view class="app-item">
					<view class="">
						<view class="">
							<image :src="fromData.url1" mode=""></image>
							<button type="default" @tap="onChooseImage(1)"></button>
						</view>
						<text>上传身份证正面</text>
					</view>
					<view class="">
						<view class="">
							<image :src="fromData.url2" mode=""></image>
							<button type="default" @tap="onChooseImage(2)"></button>
						</view>
						<text>上传身份证国徽面</text>
					</view>
				</view>
			</view>
			<view class="btn"><view class="" @tap="formSubmit">下一步</view></view>
		</view>
	</view>
</template>

<script>
import interfaces from '../../utils/interfaces.js';

export default {
	data() {
		return {
			statusType: 2,
			fromData: {
				url1: '../../static/img/monitor/5.png',
				url2: '../../static/img/monitor/6.png'
			},
			id: 0,
			tempList: {
				url1: '',
				url2: ''
			},
			tempUrl: ''
		};
	},
	onLoad(option) {
		this.id = option.id;
		this.tempUrl = interfaces.tempUrl;
	},
	methods: {
		formSubmit() {
			if(this.tempList.url1.length<=0||this.tempList.url2.length<=0){
				uni.showModal({
					title: '请上传身份证正反两面',
					showCancel: false
				});
				return false;
			}
			let data = {};
			data.id = this.id;
			data.auditFlag = '0';
			data.imgUrl = this.tempList.url1 + ',' + this.tempList.url2;
			this.request({
				url: interfaces.incomMonitorUpdate,
				method: 'POST',
				data: data,
				success: res => {
					uni.navigateTo({
						url:'./monitor-6'
					});
				}
			});
		},
		onChooseImage(type) {
			var _this = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				success(res) {
					var imgFiles = res.tempFilePaths[0];
					var tempFiles = res.tempFiles[0];
					uni.showLoading({
						mask: true,
						title: '上传中'
					});
					if (tempFiles.size / (1024 * 1024) > 1) {
						_this.onCompression(tempFiles, function(data, files) {
							_this.onUpImage(data, type);
						});
					} else {
						_this.onUpImage(imgFiles, type);
					}
				}
			});
		},
		onCompression(file, callback) {
			let fileObj = file;
			let reader = new FileReader();
			reader.readAsDataURL(fileObj); //转base64
			reader.onload = function(e) {
				let image = new Image(); //新建一个img标签（还没嵌入DOM节点)
				image.src = e.target.result;
				image.onload = function() {
					let canvas = document.createElement('canvas'), // 新建canvas
						context = canvas.getContext('2d'),
						imageWidth = image.width / 2, //压缩后图片的大小
						imageHeight = image.height / 2,
						data = '';
					canvas.width = imageWidth;
					canvas.height = imageHeight;
					context.drawImage(image, 0, 0, imageWidth, imageHeight);
					data = canvas.toDataURL('image/jpeg'); // 输出压缩后的base64
					let arr = data.split(','),
						mime = arr[0].match(/:(.*?);/)[1], // 转成blob
						bstr = atob(arr[1]),
						n = bstr.length,
						u8arr = new Uint8Array(n);
					while (n--) {
						u8arr[n] = bstr.charCodeAt(n);
					}
					let files = new window.File([new Blob([u8arr], { type: mime })], 'test.jpeg', { type: 'image/jpeg' }); // 转成file
					callback(data, files); // 回调
				};
			};
		},
		onUpImage(imgFiles, type) {
			var _this = this;
			var uper = uni.uploadFile({
				url: interfaces.upImgUrl,
				filePath: imgFiles,
				file: 'file',
				success(res1) {
					uni.hideLoading();
					if (type == 1) {
						_this.fromData.url1 = _this.tempUrl + JSON.parse(res1.data).data.url;
						_this.tempList.url1 = JSON.parse(res1.data).data.url;
					} else if (type == 2) {
						_this.fromData.url2 = _this.tempUrl + JSON.parse(res1.data).data.url;
						_this.tempList.url2 = JSON.parse(res1.data).data.url;
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.app-1 {
	width: 669upx;
	height: 190upx;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 15upx 50upx 0px rgba(9, 9, 53, 0.07);
	border-radius: 10upx;
	margin: 40upx auto 20upx;
	display: flex;
	> view {
		flex: 1;
		text-align: center;
		.on {
			color: #2c3240;
		}
		text {
			color: #999;
			font-size: 24upx;
		}
		view {
			height: 70upx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 30upx;
		}
	}
}
.app-2 {
	width: 669upx;
	margin: 20upx auto 0;
	padding: 40upx 40upx 120upx;
	box-sizing: border-box;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 15upx 50upx 0px rgba(9, 9, 53, 0.07);
	border-radius: 10upx 10upx 0 0;

	> text {
		font-size: 34upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(44, 50, 64, 1);
	}
}
.app-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 37upx 0 30upx;
	text-align: center;
	text {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		display: inline-block;
		margin-top: 30upx;
		color: rgba(100, 108, 127, 1);
	}
	> view {
		width: 260upx;
		position: relative;
		image {
			width: 100%;
			height: 167upx;
			object-fit: cover;
			border-radius: 10upx;
		}
		button {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 167upx;
			z-index: 5;
			opacity: 0;
		}
	}
}
.btn {
	padding: 300upx 0 120upx;
	view {
		height: 90upx;
		background: linear-gradient(270deg, rgba(52, 151, 253, 1) 0%, rgba(52, 123, 253, 1) 100%);
		border-radius: 45upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 90upx;
	}
}
.plac-input {
	color: rgba(177, 184, 200, 0.8);
	font-size: 26upx;
	font-family: PingFang SC;
	font-weight: 500;
}
</style>
