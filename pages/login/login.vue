<template>
	<view>
		<view class="app-1"><image src="../../static/img/login/1.png" mode=""></image></view>
		<view class="btn">
			<view class="">
				<button type="default" open-type="getUserInfo" @tap="loginMP">微信登录</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {
		
	},
	methods:{
		
	}
};
</script>

<style lang="scss">
.app-1 {
	display: flex;
	height: 500upx;
	align-items: center;
	justify-content: center;
	padding: 150upx 0 50upx;
	image {
		width: 340upx;
		height: 260upx;
	}
}
.btn {
	padding: 20upx 40upx;
	view {
		background-color: #07c160;
		height: 88upx;
		font-size: 36upx;
		color: #fff;
		text-align: center;
		line-height: 88upx;
		border-radius: 88upx;
	}
}
</style>
