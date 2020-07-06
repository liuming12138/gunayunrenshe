<template>
	<view>
		<view class="app-1">
			<image src="../../static/img/monitor/7.png" mode=""></image>
			<text>投诉完成</text>
		</view>
		<view class="btn"><view class="" @tap="formSubmit">返回首页</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		formSubmit() {
			uni.navigateTo({
				url: '/'
			});
		}
	}
};
</script>

<style lang="scss">
.app-1{
	text-align: center;
	image{
		width: 200upx;
		height: 200upx;
		display: block;
		margin: 140upx auto 70upx;
	}
	text{
		font-size:46upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(44,50,64,1);
		display: inline-block;
		padding-bottom: 300upx;
	}
}
.btn {
	padding: 155upx 40upx 120upx;
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
