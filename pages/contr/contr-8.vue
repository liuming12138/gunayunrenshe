<template>
	<view>
		<view class="app-2">
			<text>请上传代理相关文件</text>
			<view class="app-from">
				<view class="app-1">
					<text>授权委托书</text>
					<text>（必传）</text>
				</view>
				<view class="app-item">
					<view class="" v-for="(item, index) in authorization_letter" :key="index">
						<image :src="tempUrl+item" mode=""></image>
						<view class="" @tap="onDeleImg(index,1)"><image src="../../static/img/geren/8.png" mode=""></image></view>
					</view>
					<view class="upImg"><image src="../../static/img/geren/7.png" mode="" @tap="onChooseImage(1)"></image></view>
				</view>
				<view class="app-1">
					<text>法律服务函</text>
					<text>（必传）</text>
				</view>
				<view class="app-item">
					<view class="" v-for="(item, index) in Legal_service_letter" :key="index">
						<image :src="tempUrl+item" mode=""></image>
						<view class="" @tap="onDeleImg(index,2)"><image src="../../static/img/geren/8.png" mode=""></image></view>
					</view>
					<view class="upImg"><image src="../../static/img/geren/7.png" mode="" @tap="onChooseImage(2)"></image></view>
				</view>
				<view class="app-1">
					<text>律师证</text>
					<text>（必传）</text>
				</view>
				<view class="app-item">
					<view class="" v-for="(item, index) in lawyer_certificate" :key="index">
						<image :src="tempUrl+item" mode=""></image>
						<view class="" @tap="onDeleImg(index,3)"><image src="../../static/img/geren/8.png" mode=""></image></view>
					</view>
					<view class="upImg"><image src="../../static/img/geren/7.png" mode="" @tap="onChooseImage(3)"></image></view>
				</view>
			</view>
			<view class="btn"><view class="" @tap="formSubmit">完成</view></view>
		</view>
	</view>
</template>

<script>
import interfaces from '../../utils/interfaces.js';			
export default {
	data() {
		return {
			tempUrl:'',
			authorization_letter: [],
			Legal_service_letter: [],
			lawyer_certificate: [],
			type: 1
		};
	},
	onLoad(option) {
		this.id = option.id;
		this.tempUrl = interfaces.tempUrl
		this.loadData(this.id);
	},
	methods: {
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
					this.fromData = res.data;
				}
			});
		},
	
		formSubmit() {
			let data = this.fromData
			data.authorizationLetter = this.authorization_letter
			data.legalServiceLetter = this.Legal_service_letter
			data.lawyerCertificate = this.lawyer_certificate
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
			console.log(this.fromData)
		},
		onDeleImg(index,type) {
			console.log(index);
			var _this  = this
			if (type == 1) {
				_this.authorization_letter.splice(index, 1);
			} else if (type == 2) {
				_this.Legal_service_letter.splice(index, 1);
			} else if (type == 3) {
				_this.lawyer_certificate.splice(index, 1);
			}
		},
		onChooseImage(type) {
			var _this = this;
			this.type = type;
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
							_this.onCompression(tempFiles, function(data, files) {
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
		onUpImage(imgFiles) {
			var _this = this;
			var uper = uni.uploadFile({
				url: 'http://172.18.1.23:8066/file/upload',
				filePath: imgFiles,
				file: 'file',
				success(res1) {
					uni.hideLoading();
					console.log(JSON.parse(res1.data).data);
					let url = JSON.parse(res1.data).data.url;
					if (_this.type == 1) {
						_this.authorization_letter.push(url);
					} else if (_this.type == 2) {
						_this.Legal_service_letter.push(url);
					} else if (_this.type == 3) {
						_this.lawyer_certificate.push(url);
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.app-1 {
	display: flex;
	margin-top: 50upx;
	text:nth-child(1) {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(100, 108, 127, 1);
	}
	text:nth-child(2) {
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(230, 233, 240, 1);
		padding-left: 40upx;
	}
}
.app-2 {
	padding: 40upx 40upx 120upx;
	box-sizing: border-box;
	background: rgba(255, 255, 255, 1);
	> text {
		font-size: 34upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(44, 50, 64, 1);
		padding-left: 23upx;
		position: relative;
		::before {
			content: '';
			position: absolute;
			width: 5upx;
			height: 31upx;
			background: rgba(54, 121, 255, 1);
			left: 0;
			top: 10upx;
		}
	}
}
.app-item {
	display: flex;
	padding: 37upx 0 30upx;
	flex-wrap: wrap;
	> view {
		width: 150upx;
		height: 117upx;
		overflow: hidden;
		margin-right: 23upx;
		margin-bottom: 23upx;
		position: relative;
		> image {
			width: 100%;
			height: 117upx;
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
	padding: 100upx 0 20upx;
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
