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
				<view class=""><image style="width: 60upx;height: 46upx;" src="../../static/img/geren/6.png" mode=""></image></view>
				<text class="on">上传证据</text>
			</view>
		</view>
		<view class="app-2">
			<text>请上传相应的证据照片</text>
			<view class="app-from">
				<view class="app-item">
					<view class="" v-for="(item, index) in fromData.imgUrl" :key="index">
						<image :src="tempUrl+item" mode=""></image>
						<view class="" @tap="onDeleImg(index)"><image src="../../static/img/geren/8.png" mode=""></image></view>
					</view>
					<view class="upImg"><image src="../../static/img/geren/7.png" mode="" @tap="onChooseImage()"></image></view>
				</view>
			</view>
			<view class="btn" v-if="fromData.roleType == 2"><view class="" @tap="formSubmit">下一步</view></view>
			<view class="btn" v-else><view class="" @tap="formSubmit">完成</view></view>
		</view>
	</view>
</template>

<script>
import interfaces from '../../utils/interfaces.js';
export default {
	data() {
		return {
			statusType: 2,
			loadingState: false,
			fromData: {},
			fromList: [],
			Identity: 1,
			id: 0,
			tempUrl: ''
		};
	},
	onLoad(option) {
		// this.loadingState = true
		this.tempUrl = interfaces.tempUrl;
		this.id = option.id;
		this.loadData(this.id);
	},
	methods: {
		radio(val) {
			this.fromData.way = val;
		},
		formSubmit() {
			if (this.fromData.roleType == 1) {
				let data = this.fromData;
				data.auditFlag = 0;
				this.request({
					url: interfaces.incomCaseUpdate,
					method: 'POST',
					data: data,
					success: res => {
						uni.navigateTo({
							url: './contr-6'
						});
					}
				});
			} else if (this.fromData.roleType == 2) {
				let data = this.fromData;
				this.request({
					url: interfaces.incomCaseUpdate,
					method: 'POST',
					data: data,
					success: res => {
						uni.navigateTo({
							url: './contr-7?id=' + this.id
						});
					}
				});
			}
		},
		loadData(id) {
			let data = {
				id: id
			};
			this.request({
				url: interfaces.incomCaseDec,
				method: 'POST',
				data: data,
				success: res => {
					console.log(res.data);
					res.data.imgUrl = res.data.imgUrl.split(',');
					this.fromData = res.data;
					console.log(this.fromData);
				}
			});
		},
		onDeleImg(index) {
			console.log(index);
			this.fromData.imgUrl.splice(index, 1);
		},
		onChooseImage() {
			var _this = this;
			uni.chooseImage({
				count: 8,
				sizeType: ['compressed'],
				success(res) {
					var imgFiles = res.tempFilePaths.slice(0, 8);
					var tempFiles = res.tempFiles.slice(0, 8);
					uni.showLoading({
						mask: true,
						title: '上传中'
					});

					_this._.each(tempFiles, (p, index) => {
						if (p.size / (1024 * 1024) > 1) {
							_this.onCompression(tempFiles[index], function(data, files) {
								_this.onUpImage(data);
							});
						} else {
							_this.onUpImage(imgFiles[index]);
						}
					});
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
						imageWidth = image.width / 4, //压缩后图片的大小
						imageHeight = image.height / 4,
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
		onUpImage(imgFiles) {
			var _this = this;
			var uper = uni.uploadFile({
				url: interfaces.upImgUrl,
				filePath: imgFiles,
				file: 'file',
				success(res1) {
					uni.hideLoading();
					console.log(JSON.parse(res1.data).data);
					let url = JSON.parse(res1.data).data.url;
					_this.fromData.imgUrl.push(url);
				},
				fail(e){
					console.log(e)
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
	padding: 37upx 0 30upx;
	flex-wrap: wrap;
	> view {
		width: 130upx;
		height: 97upx;
		overflow: hidden;
		margin-right: 23upx;
		margin-bottom: 23upx;
		position: relative;
		> image {
			width: 100%;
			height: 97upx;
			object-fit: cover;
			border-radius: 10upx;
			display: block;
		}
		view {
			position: absolute;
			top: -5upx;
			right: 5upx;
			image {
				width: 30upx;
				height: 30upx;
			}
		}
	}
	view:nth-child(4n + 4) {
		margin-right: 0;
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
