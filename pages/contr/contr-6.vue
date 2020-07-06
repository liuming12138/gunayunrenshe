<template>
	<view>
		<view class="app-1">
			<image src="../../static/img/monitor/7.png" mode=""></image>
			<text>申请完成</text>
			<text>您可以在我的案件</text>
			<text>查看审核进程</text>
		</view>
		<navigator class="btn" url="../case/case"><view class="">我的案件</view></navigator>
		<navigator class="btn1" url="/"><view class="">返回首页</view></navigator>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		
	}
};
</script>

<style lang="scss">
.app-1 {
	text-align: center;
	image {
		width: 200upx;
		height: 200upx;
		display: block;
		margin: 140upx auto 70upx;
	}
	text:nth-of-type(1){
		font-size: 46upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(44, 50, 64, 1);
		padding-bottom: 30upx;
	}
	text {
		display: block;
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(177,184,200,1);
		line-height:46upx;
	}
}

.btn {
	padding: 155upx 40upx 30upx;
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
.btn1{
	padding: 0 40upx;
	view {
		height:90upx;
		background:rgba(241,242,246,1);
		border-radius:45upx;
		color:rgba(44,50,64,1);
		text-align: center;
		line-height: 90upx;
		font-size:30upx;
	}
}
.plac-input {
	color: rgba(177, 184, 200, 0.8);
	font-size: 26upx;
	font-family: PingFang SC;
	font-weight: 500;
}
</style>
