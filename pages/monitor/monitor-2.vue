<template>
	<view>
		<view class="app-1">
			<view class="">
				<view class=""><image style="width: 69upx;height: 52upx;" src="../../static/img/monitor/1.png" mode=""></image></view>
				<text class="on">申请人信息</text>
			</view>
			<view class="">
				<view class=""><image style="width: 63upx;height: 50upx;" src="../../static/img/monitor/2-1.png" mode=""></image></view>
				<text>被申请人信息</text>
			</view>
			<view class="">
				<view class=""><image style="width: 63upx;height: 50upx;" src="../../static/img/monitor/3-1.png" mode=""></image></view>
				<text>请求事项</text>
			</view>
			<view class="">
				<view class=""><image style="width: 56upx;height: 44upx;" src="../../static/img/monitor/4-1.png" mode=""></image></view>
				<text>上传身份证</text>
			</view>
		</view>
		<view class="app-2">
			<text>请确认申请人信息</text>
			<view class="app-from">
				<view class="app-item">
					<text>姓名</text>
					<view class=""><input v-model="fromData.name" placeholder="请输入申请人姓名（姓名）" placeholder-class="plac-input" type="text" /></view>
				</view>
				<view class="app-item">
					<text>性别</text>
					<view class="">
						<label class="radio">
							<radio value="1" :checked="fromData.sex == 1" @tap="radio(1)" style="transform:scale(0.7)" />
							<text>男</text>
						</label>
						<label class="radio">
							<radio value="2" :checked="fromData.sex == 2" @tap="radio(2)" style="transform:scale(0.7)" />
							<text>女</text>
						</label>
					</view>
				</view>
				<view class="app-item">
					<text>名族</text>
					<view class=""><input v-model="fromData.nation" placeholder="请输入申请人民族（必填）" placeholder-class="plac-input" type="text" /></view>
				</view>
				<view class="app-item">
					<text>身份证号</text>
					<view class=""><input v-model="fromData.idCard" placeholder="请输入申请人身份证号（必填）" placeholder-class="plac-input" type="text" /></view>
				</view>
				<view class="app-item">
					<text>联系方式</text>
					<view class=""><input v-model="fromData.phone" placeholder="请输入申请人联系方式（必填）" placeholder-class="plac-input" type="text" /></view>
				</view>
				<view class="app-item">
					<text>居住地址</text>
					<view class=""><input v-model="fromData.address" placeholder="请输入申请人居住地址（必填）" placeholder-class="plac-input" type="text" /></view>
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
			fromData: {
				sex: 0
			}
		};
	},
	methods: {
		radio(val) {
			this.fromData.sex = JSON.stringify(val);
		},
		formSubmit() {
			let data = this.fromData;
			data.userId = '64';
			data.auditFlag = '-2';
			let code = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
			if (!code.test(this.fromData.idCard)) {
				uni.showModal({
					title: '身份证号码格式不正确',
					showCancel: false
				});
				return false;
			}
			this.request({
				url: interfaces.incomMonitorUpdate,
				method: 'POST',
				data: data,
				success: res => {
					uni.navigateTo({
						url: './monitor-3?id=' + res.data.id
					});
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
	padding: 37upx 0 30upx;
	border-bottom: 1px solid rgba(177, 184, 200, 0.2);
	text {
		width: 149upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #646c7f;
	}
	view {
		flex: 1;
		> input {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #646c7f;
		}
	}
	label {
		margin-right: 40upx;
	}
}
.btn {
	padding: 55upx 0 120upx;
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
