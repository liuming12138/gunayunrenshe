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
				<view class=""><image style="width: 63upx;height: 50upx;" src="../../static/img/monitor/3-1.png" mode=""></image></view>
				<text>请求事项</text>
			</view>
			<view class="">
				<view class=""><image style="width: 60upx;height: 46upx;" src="../../static/img/geren/6-1.png" mode=""></image></view>
				<text>上传证据</text>
			</view>
		</view>
		<view class="app-2">
			<text>请确认被申请人信息</text>
			<view class="app-from">
				<view class="app-item">
					<text>企业名称</text>
					<view class=""><input v-model="fromData.companyName" placeholder="请输入企业名称（必填）" placeholder-class="plac-input" type="text" /></view>
				</view>
				<view class="app-item">
					<text>法定代表人</text>
					<view class=""><input v-model="fromData.legalPerson" placeholder="请输入法定代表人姓名（必填）" placeholder-class="plac-input" type="text" /></view>
				</view>
				<view class="app-item">
					<text>联系方式</text>
					<view class=""><input v-model="fromData.legalPersonPhone" placeholder="请输入法定代表人联系方式（必填）" placeholder-class="plac-input" type="text" /></view>
				</view>
				<view class="app-item">
					<text>企业地址</text>
					<view class=""><input v-model="fromData.companyAddress" placeholder="请输入企业注册地址（必填）" placeholder-class="plac-input" type="text" /></view>
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
			fromData: {},
			id: 0
		};
	},
	onLoad(option) {
		this.id = option.id;
		this.loadData(this.id);
	},
	methods: {
		radio(val) {
			this.fromData.way = val;
		},
		formSubmit() {
			let data = this.fromData;
			this.request({
				url: interfaces.incomCaseUpdate,
				method: 'POST',
				data: data,
				success: res => {
					uni.navigateTo({
						url: './contr-4?id=' + this.id
					});
				}
			});
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
					this.fromData = res.data;
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
		width: 159upx;
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
