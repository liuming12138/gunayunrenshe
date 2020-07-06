<template>
	<view>
		<!-- 状态栏 -->
		<page-status></page-status>
		<view class="app-1"><image src="../../static/img/home/1.jpg" mode=""></image></view>
		<view class="app-2">
			<view class="">
				<navigator url="../contr/contr-1">
					<image src="../../static/img/home/2.png" mode=""></image>
					<text>个人争议申请</text>
				</navigator>
			</view>
			<view class="" @tap="onloped()">
				<image src="../../static/img/home/3.png" mode=""></image>
				<text>集体争议申请</text>
			</view>
			<view class="">
				<navigator url="../case/case">
					<image src="../../static/img/home/4.png" mode=""></image>
					<text>我的案件</text>
				</navigator>
			</view>
			<view class="">
				<navigator url="../arbitr_note/arbitr_note">
					<image src="../../static/img/home/5.png" mode=""></image>
					<text>仲裁须知</text>
				</navigator>
			</view>
			<view class="">
				<navigator url="../monitor/monitor-1">
					<image src="../../static/img/home/6.png" mode=""></image>
					<text>监察投诉</text>
				</navigator>
			</view>
			<view class="">
				<navigator url="../police_note/police_note">
					<image src="../../static/img/home/7.png" mode=""></image>
					<text>管辖须知</text>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		onloped() {
			uni.showModal({
				title: '提示',
				content: '功能暂未开发',
				showCancel: false,
				success: function(res) {
					
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f8f8f8;
}
.app-1 {
	padding: 20upx 40upx;
	image {
		width: 669upx;
		height: 298upx;
	}
}
.app-2 {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 42upx 40upx;
	view {
		width: 210upx;
		height: 210upx;
		text-align: center;
		background: rgba(255, 255, 255, 1);
		box-shadow: 1upx 15upx 50upx 0upx rgba(10, 10, 54, 0.07);
		border-radius: 10upx;
		margin-bottom: 20upx;
		position: relative;
		navigator {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}
		image {
			display: block;
			margin: 43upx auto 0;
		}
		text {
			padding-top: 26upx;
			font-size: 24upx;
			color: #2d3340;
			display: inline-block;
			text-align: center;
		}
	}
}
.app-2 view:nth-of-type(1) image {
	width: 74upx;
	height: 78upx;
}
.app-2 view:nth-of-type(2) image {
	width: 69upx;
	height: 73upx;
}
.app-2 view:nth-of-type(3) image {
	width: 74upx;
	height: 74upx;
}
.app-2 view:nth-of-type(4) image {
	width: 72upx;
	height: 80upx;
}
.app-2 view:nth-of-type(5) image {
	width: 74upx;
	height: 74upx;
}
.app-2 view:nth-of-type(6) image {
	width: 74upx;
	height: 76upx;
}
</style>
