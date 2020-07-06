<template>
	<view>
		<view class="app-2">
			<text>请确认申请人信息</text>
			<view class="app-from">
				<view class="app-item">
					<text>姓名</text>
					<view class=""><input v-model="fromData.agencyName" placeholder="请输入代理人姓名（必填）" placeholder-class="plac-input" type="text" /></view>
				</view>
				<view class="app-item">
					<text>性别</text>
					<view class="">
						<label class="radio">
							<radio value="1" :checked="fromData.agencySex == 1" @click="radio(1)" style="transform:scale(0.7)" />
							<text>男</text>
						</label>
						<label class="radio">
							<radio value="2" :checked="fromData.agencySex == 2" @click="radio(2)" style="transform:scale(0.7)" />
							<text>女</text>
						</label>
					</view>
				</view>
				<view class="app-item">
					<text>名族</text>
					<view class=""><input v-model="fromData.agencyNation" placeholder="请输入代理人民族（必填）" placeholder-class="plac-input" type="text" /></view>
				</view>
				<view class="app-item">
					<text>身份证号</text>
					<view class=""><input v-model="fromData.agencyIdCard" placeholder="请输入代理人身份证号（必填）" placeholder-class="plac-input" type="text" /></view>
				</view>
				<view class="app-item">
					<text>联系方式</text>
					<view class=""><input v-model="fromData.agencyPhone" placeholder="请输入代理人联系方式（必填）" placeholder-class="plac-input" type="text" /></view>
				</view>
				<view class="app-item">
					<text>居住地址</text>
					<view class=""><input v-model="fromData.agencyAddress" placeholder="请输入代理人居住地址（必填）" placeholder-class="plac-input" type="text" /></view>
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
			id:0
		};
	},
	onLoad(option) {
		this.id = option.id;
		this.loadData(this.id);
	},
	methods: {
		radio(val) {
			this.fromData.agencySex = JSON.stringify(val);
		},
		formSubmit() {
			let data = this.fromData;
			this.request({
				url: interfaces.incomCaseUpdate,
				method: 'POST',
				data: data,
				success: res => {
					uni.navigateTo({
						url: './contr-8?id=' + this.id
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

.app-2 {
	padding: 40upx 40upx ;
	box-sizing: border-box;
	background: rgba(255, 255, 255, 1);

	>text {
		font-size: 34upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(44, 50, 64, 1);
		position: relative;
		padding-left: 23upx
		::before{
			content: '';
			position: absolute;
			width:5upx;
			height:31upx;
			background:rgba(54,121,255,1);
			left: 0;
			top: 10upx;
		}
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
.btn{
	padding: 55upx 0 120upx;
	view{
		height:90upx;
		background:linear-gradient(270deg,rgba(52,151,253,1) 0%,rgba(52,123,253,1) 100%);
		border-radius:45upx;
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
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
