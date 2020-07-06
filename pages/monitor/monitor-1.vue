<template>
	<view>
		<view class="app-1"><text>“劳动监察投诉”使用说明</text></view>
		<view class="app-2">
			1）投诉应当由投诉人向有管辖权的劳动行政部门递交投诉文书。投诉文书应当载明下列事项：①投诉人的姓名、性别、年龄、职业、工作单位、住所和联系方式，被投诉用人单位的名称、住所、法定代表人或者主要负责人的姓名、职务以及违反劳动保障法律、法规、规章情况；②劳动保障合法权益受到侵害的事实和投诉请求事项，并应有投诉人的签名或盖章。
			<br />
			2）投诉人证明材料。投诉人的身份证复印件（应提供原件核对）；用人单位营业执照复印件或注册登记资料（确实不能提供的，经说明后可不提交）。集体投诉推荐代表的还需要提交推荐人签章的推荐委托文书。
			<br />
			3）相关证据材料。提交必要证据材料以证明投诉人的合法权益受到侵害是被投诉用人单位违反劳动保障法律的行为所造成的，如证明劳动关系及与投诉请求有关的证据材料。具体事宜可以直接咨询劳动监察，以劳动监察的要求为准。
		</view>
		<view class="app-3">
			<view class="app-31">
				<checkbox :checked="state" style="transform:scale(0.7)" @tap="state = !state" />
				<text>我已阅读</text>
				<text>“灌云人社仲裁服务平台”使用说明</text>
			</view>
			<view class="app-32" @tap="onPage">下一步</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			state: false
		};
	},
	methods: {
		onCheckboxState() {},
		onPage() {
			if (!this.state) {
				uni.showModal({
					content: '请点击已阅读使用说明',
					showCancel: false
				});
				return false;
			}
			uni.navigateTo({
				url: './monitor-2'
			});
		}
	}
};
</script>

<style lang="scss">
.app-1 {
	padding: 70upx 40upx 50upx;
	text {
		color: #2c323f;
		font-size: 34upx;
		font-family: PingFang SC;
		font-weight: bold;
		position: relative;
		padding-left: 25upx;
	}
	text::before {
		content: '';
		position: absolute;
		width: 5upx;
		height: 31upx;
		background: rgba(53, 121, 255, 1);
		top: 12upx;
		left: 0;
	}
}
.app-2 {
	padding: 0 40upx;
	font-size: 24upx;
	color: #636b7f;
	line-height: 50upx;
}

.app-3 {
	padding: 100upx 40upx 40upx;
	view {
		display: flex;
		align-items: center;
		text {
			font-size: 26upx;
			color: #b1b7c7;
		}
		text:nth-of-type(2) {
			font-size: 26upx;
			color: #337bfd;
		}
	}
	.app-32 {
		height: 90upx;
		margin-top: 58upx;
		background: linear-gradient(-90deg, rgba(52, 151, 253, 1) 0%, rgba(52, 123, 253, 1) 100%);
		border-radius: 45upx;
		align-items: center;
		justify-content: center;
		color: #fff;
	}
}
.poMsg {
	background-color: #fff;
	border-top: 1px solid #eee;
	text-align: center;
	line-height: 90upx;
	padding: 0 50upx;
}
</style>
