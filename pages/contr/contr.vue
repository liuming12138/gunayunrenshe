<template>
	<view>
		<view class="app-1"><text>请选择身份</text></view>
		<view class="app-2">
			<view class="" @click="radio(1)">
				<view :class="way == 1 ? 'on' : ''">
					<image src="../../static/img/geren/1.png" mode=""></image>
					<text>申请人</text>
				</view>
				<label class="radio"><radio value="1" :checked="way == 1" style="transform:scale(0.7)" /></label>
			</view>
			<view @click="radio(2)">
				<view :class="way == 2 ? 'on' : ''">
					<image src="../../static/img/geren/2.png" mode=""></image>
					<text>代理人</text>
				</view>
				<label class="radio"><radio value="2" :checked="way == 2" style="transform:scale(0.7)" /></label>
			</view>
		</view>
		<view class="app-3">
			<checkbox :checked="state" style="transform:scale(0.7)" @tap="state = !state" />
			<text>我已阅读</text>
			<navigator url="../monitor/monitor-0">“灌云人社仲裁服务平台”使用说明</navigator>
		</view>
		<view class="btn"><view class="" @tap="onPage">下一步</view></view>
	</view>
</template>

<script>
import interfaces from '../../utils/interfaces.js';	
export default {
	data() {
		return {
			way: 1,
			state: false
		};
	},
	onLoad(option) {},
	methods: {
		radio(index) {
			this.way = index;
		},
		onPage() {
			var  _this =this
			if (!this.state) {
				uni.showModal({
					content: '请点击已阅读使用说明',
					showCancel: false
				});
				return false;
			}
			let data = {
				roleType: _this.way,
				userId: '64',
				auditFlag:'-2'
			};
			this.request({
				url: interfaces.incomCaseUpdate,
				method: 'POST',
				data: data,
				success: res => {
					let timp  = res.data
					uni.navigateTo({
						url: './contr-2?id=' + timp.id
					});
				}
			});
		}
	}
};
</script>

<style lang="scss">
.app-1 {
	padding: 70upx 40upx 98upx;
	text {
		font-size: 34upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(44, 50, 64, 1);
		position: relative;
		padding-left: 22upx
		::before {
			content: '';
			position:absolute;
			width:5upx;
			height:31upx;
			background:rgba(54,121,255,1);
			top: 10upx;
			left: 0;
		}
	}
}
.app-2{
	display: flex;
	justify-content: space-evenly;
	text-align: center;
	.on{
		border:2upx solid rgba(54,121,255,1);
	}
	>view{
		width: 240upx;
		view{
			width: 100%;
			height: 300upx;
			background:rgba(249,251,253,1);
			border:2upx solid rgba(240,242,245,1);
			border-radius:10upx;
			text-align: center;
			image{
				width: 115upx;
				height: 99upx;
				display: block;
				margin: 80upx auto 25upx;
			}
			text{
				font-size:28upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(54,121,255,1);
			}
		}
		label{
			margin-top: 40upx;
			display: block;
		}
	}
}
.btn {
	padding: 0 40upx 120upx;
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
.app-3 {
	display: flex;
	align-items: center;
	padding: 118upx 0 55upx;
	justify-content: center;
	text {
		font-size: 26upx;
		color: #b1b7c7;
	}
	navigator {
		font-size: 26upx;
		color: #337bfd;
	}
}
</style>
