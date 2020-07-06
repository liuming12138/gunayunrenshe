<template>
	<view class="app">
		<view class="list-con">
			<view class="case-con">
				<view class="list-1">
					<text>案件编号：{{ caseInfo.caseCode }}</text>
				</view>
				<view class="" style="padding: 0 40upx;">
					<view class="list-2">
						<view class="list-21">
							<view class="">
								<text>申请人</text>
								<text>{{ caseInfo.name }}</text>
							</view>
							<view class="">
								<text>被申请人</text>
								<text>{{ caseInfo.companyName }}</text>
							</view>
							<view class="">
								<text>案件状态</text>
								<text :class="caseInfo.auditFlag == 21 ? 'text-on3' : 'text-on1'">{{ audit[caseInfo.auditFlag] || '审核不通过' }}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="list-3">
					<view class="steps status-on2">
						<view class="step-1">
							<view class="step-11"><text></text></view>
							<view class="step-12"></view>
						</view>
						<view class="step-2">
							<view class="">
								<view class="">申请材料</view>
								<view class="step-con"><text>已提交</text></view>
							</view>
						</view>
					</view>
					<view class="steps" :class="caseInfo.auditFlag > 0 ? 'status-on2' : 'status-on1'">
						<view class="step-1">
							<view class="step-11"><text></text></view>
							<view class="step-12"></view>
						</view>
						<view class="step-2">
							<view class="">
								<view class="">申请审核</view>
								<view class="step-con"><text>审核中</text></view>
							</view>
						</view>
					</view>
					<view class="steps" :class="caseInfo.auditFlag == 21 ? 'status-on1' : caseInfo.auditFlag > 0 ? 'status-on2' : caseInfo.auditFlag < 1 ? '' : 'status-on1'">
						<view class="step-1">
							<view class="step-11"><text></text></view>
							<view class="step-12"></view>
						</view>
						<view class="step-2">
							<view class="">
								<view class="">审核结果</view>
								<view class="step-con" v-if="caseInfo.auditFlag > 0">
									<text v-if="caseInfo.auditFlag == 21">审核失败</text>
									<text v-else>审核通过</text>
									<view class="news-1" v-if="caseInfo.auditFlag == 21">
										<text>{{ caseInfo.remark }}</text>
										<view class="" @tap="onExamine">重新审核</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="steps" :class="caseInfo.auditFlag == 21 ? '' : caseInfo.auditFlag > 1 ? 'status-on2' : caseInfo.auditFlag < 1 ? '' : 'status-on1'">
						<view class="step-1">
							<view class="step-11"><text></text></view>
							<view class="step-12"></view>
						</view>
						<view class="step-2">
							<view class="">
								<view class="">提交材料</view>
								<view v-if="caseInfo.auditFlag == 1" class="step-con"><text>请将以下材料送达至灌云县劳动人事争议仲裁委员会</text></view>
								<view v-if="caseInfo.auditFlag > 1 && caseInfo.auditFlag != 21" class="">已提交</view>
							</view>
							<view v-if="caseInfo.auditFlag == 1" class="new-con">
								<view class="">
									<text>地址：</text>
									<text>灌云县伊山镇西苑南90000-1号</text>
								</view>
								<view class="">
									<text>材料：</text>
									<view class="">
										<text @tap="onDownLoad(url1)">劳动人事争议仲裁申请书</text>
										<text>、申请人身份 证材料、被申请人注册登记资料、证据材料复印件</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="steps" :class="caseInfo.auditFlag == 21 ? '' : caseInfo.auditFlag > 4 ? 'status-on2' : caseInfo.auditFlag < 4 ? '' : 'status-on1'">
						<view class="step-1">
							<view class="step-11"><text></text></view>
							<view class="step-12"></view>
						</view>
						<view class="step-2">
							<view class="">
								<view class="">开庭通知</view>
								<view class="step-con" v-if="caseInfo.auditFlag > 1">
									<text v-if="caseInfo.auditFlag > 5 && caseInfo.auditFlag != 21">开庭结束</text>
									<view v-else-if="caseInfo.auditFlag != 21" class="kaiti">
										<text>开庭时间</text>
										<text>2020-06-23 12:20</text>
										<text>开庭地点</text>
										<text>灌云县伊山镇西苑南90000-1号</text>
										<view class="" v-if="caseInfo.auditFlag == 4" @tap="onQueRen">确认</view>
									</view>
								</view>
							</view>
							<view class="kai-con" v-if="caseInfo.auditFlag == 5">
								<text>材料下载</text>
								<view class=""><text @tap="onDownLoad(url2)">开庭通知书等文件</text></view>
							</view>
						</view>
					</view>
					<view class="steps" :class="caseInfo.auditFlag == 21 ? '' : caseInfo.auditFlag > 5 ? 'status-on2' : caseInfo.auditFlag < 5 ? '' : 'status-on1'">
						<view class="step-1">
							<view class="step-11"><text></text></view>
							<view class="step-12"></view>
						</view>
						<view class="step-2">
							<view class="">
								<view class="">仲裁结果</view>
								<view class="step-con" v-if="caseInfo.auditFlag > 5 && caseInfo.auditFlag != 21">
									<text>
										仲裁结果已出
										<br />
										领取仲裁文书
									</text>
								</view>
								<view class="" v-else-if="caseInfo.auditFlag > 4 && caseInfo.auditFlag != 21"><text>待开庭</text></view>
							</view>
							<view class="cai-con" v-if="caseInfo.auditFlag == 6">
								<view class="">
									<text>仲裁结果</text>
									<view class="">
										<label class="radio">
											<radio value="1" :checked="way == 1" @tap="radio(1)" style="transform:scale(0.7)" />
											<text>自取</text>
										</label>
										<label class="radio">
											<radio value="2" :checked="way == 2" @tap="radio(2)" style="transform:scale(0.7)" />
											<text>邮寄</text>
										</label>
									</view>
								</view>
								<view class="" v-if="way == 1">
									<text>领取地址</text>
									<view class=""><text>灌云县伊山镇西苑南90000-1号</text></view>
								</view>
								<view class="" v-if="way == 2">
									<text>邮寄地址</text>
									<view class=""><input v-model="data" type="text" placeholder="请输入邮寄地址" /></view>
								</view>
								<view class=""><button type="default" @tap="onSubmitArbitra">提交</button></view>
							</view>
						</view>
					</view>
				</view>
				<!-- 	<view class="btn"><view class="">确认</view></view> -->
			</view>
		</view>
	</view>
</template>

<script>
import uniSteps from '../../components/uni-steps/uni-steps.vue';
import interfaces from '../../utils/interfaces.js';
export default {
	data() {
		return {
			audit: ['审核中', '审核通过', '', '材料已确认', '待开庭确认', '已开庭确认', '仲裁书已出', '仲裁完成'],
			caseData: {
				status: 0
			},
			data: '',
			way: 1,
			caseInfo: {},
			url1: 'http://172.18.1.23/upload/20200622/4028298172caa3340172caa6b4b90000back.zip',
			url2: 'http://172.18.1.23/upload/20200622/4028298172caa3340172caa6b4b90000back.zip'
		};
	},
	components: { uniSteps },
	onLoad(option) {
		this.loadData(option.id);
		// ('http://172.18.1.23/upload/20200622/4028298172caa3340172caa6b4b90000back.zip');
	},
	methods: {
		//重新审核
		onExamine() {
			let data = this.caseInfo;
			data.auditFlag = '-2';
			this.request({
				url: interfaces.incomCaseUpdate,
				method: 'POST',
				data: data,
				success: res => {
					console.log(res);
					uni.navigateTo({
						url: '../contr/contr-2?id=' + data.id
					});
				}
			});
		},
		//确认开庭
		onQueRen() {
			this.caseInfo.auditFlag = '5';
			let data = {
				id: this.caseInfo.id,
				auditFlag: this.caseInfo.auditFlag
			};
			this.request({
				url: interfaces.incomCaseUpdate,
				method: 'POST',
				data: data,
				success: res => {
					console.log(res);
				}
			});
		},
		//确认领取方式
		onSubmitArbitra() {
			this.caseInfo.auditFlag = '7';
			this.caseInfo.postAddress = this.data;
			this.caseInfo.cellValue = this.way;
			let data = {
				id: this.caseInfo.id,
				auditFlag: this.caseInfo.auditFlag,
				postAddress: this.caseInfo.auditFlag,
				cellValue: this.caseInfo.cellValue
			};
			this.request({
				url: interfaces.incomCaseUpdate,
				method: 'POST',
				data: data,
				success: res => {
					console.log(res);
				}
			});
		},
		radio(val) {
			this.way = val;
		},
		onDownLoad(fileName) {
			const downloadTask = uni.downloadFile({
				url: fileName,
				success: res => {
					let that = this;
					console.log('下载成功', res.tempFilePath);
					uni.openDocument({
						filePath: escape(res.tempFilePath),
						success: res => {
							console.log('打开文件成功');
						},
						fail() {
							uni.showToast({
								title: '暂不支持此类型',
								duration: 2000
							});
						}
					});
				}
			});
			downloadTask.onProgressUpdate(res => {
				console.log('下载进度' + res.progress);
				console.log('已经下载的数据长度' + res.totalBytesWritten);
				console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
			});
		},
		loadData(id) {
			var _this = this;
			let data = {
				id: id
			};
			this.request({
				url: interfaces.caseDec,
				method: 'POST',
				data: data,
				success: res => {
					_this.caseInfo = res.data;
					console.log(_this.caseInfo);
				}
			});
		}
	}
};
</script>

<style lang="scss">
.list-con {
	padding: 20upx 40upx 0;
	.case-con {
		margin-bottom: 40upx;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 15upx 50upx 0px rgba(9, 9, 53, 0.07);
		border-radius: 10upx;
		overflow: hidden;
		.list-1 {
			height: 88upx;
			background-color: #347bfd;
			line-height: 88upx;
			font-size: 30upx;
			color: #fff;
			padding: 0 40upx;
		}
		.list-2 {
			padding: 20upx 0 30upx;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #eee;
			image {
				width: 120upx;
				height: 120upx;
			}
			.list-21 {
				flex: 1;
				text {
					font-size: 28upx;
				}
				text:nth-of-type(1) {
					margin-right: 30upx;
					width: 120upx;
					display: inline-block;
					color: #999;
				}
				.text-on1 {
					color: #3679fe;
				}
				.text-on2 {
					color: #67c23a;
				}
				.text-on3 {
					color: #f56c6c;
				}
			}
		}
		.list-3 {
			padding: 20upx 40upx 150upx;
		}
		.btn {
			padding: 20upx 40upx 40upx;
			view {
				width: 100%;
				height: 80upx;
				background-color: #3679fe;
				font-size: 30upx;
				color: #fff;
				border-radius: 80upx;
				text-align: center;
				line-height: 80upx;
			}
		}
	}
}
.steps {
	display: flex;
	align-items: flex-start;
	position: relative;
}
.step-1 {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
}
.step-1 view:nth-of-type(1) {
	width: 27upx;
	height: 27upx;
	background-color: #b1b8c8;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	text {
		width: 15upx;
		height: 15upx;
		border-radius: 50%;
		background-color: #fff;
	}
}
.list-3 > view:last-child .step-1 view:nth-of-type(2) {
	width: 0;
}
.step-1 view:nth-of-type(2) {
	width: 2upx;
	flex: 1;
	background-color: #b1b8c8;
}
.step-2 {
	flex: 1;
	padding-left: 84upx;
	min-height: 95upx;
}
.step-2 > view:nth-of-type(1) {
	display: flex;
	flex: 1;
}
.step-2 > view:nth-of-type(1) > view:nth-of-type(1) {
	margin-right: 45upx;
	color: #999;
}
.step-2 > view:nth-of-type(1) > view:nth-of-type(2) {
	flex: 1;
}
.step-2 > view:nth-of-type(1) > view {
	font-size: 28upx;
}

.status-on1 .step-1 view:nth-of-type(1),
.status-on1 .step-1 view:nth-of-type(2) {
	background-color: #347cfd;
}

.status-on2 .step-1 view:nth-of-type(1),
.status-on2 .step-1 view:nth-of-type(1) text,
.status-on2 .step-1 view:nth-of-type(2) {
	background-color: #347cfd;
}
.news-1 text {
	color: #b1b8c8;
	font-size: 24upx;
	margin: 15upx 0;
	display: inline-block;
}
.news-1 view {
	width: 160upx;
	height: 58upx;
	background: rgba(52, 124, 253, 1);
	border-radius: 29upx;
	font-size: 24upx;
	color: #fff;
	text-align: center;
	line-height: 58upx;
	margin: 20upx 0;
}
.new-con {
	padding: 30upx;
	background: rgba(246, 248, 250, 1);
	border-radius: 10upx;
	margin: 20upx 0;
}
.new-con > view {
	display: flex;
	margin-bottom: 15upx;
}
.new-con > view text {
	color: #646c7f;
	font-size: 24upx;
}
.new-con > view > text:nth-of-type(2) {
	flex: 1;
}

.new-con > view > view {
	flex: 1;
	position: relative;
	top: -10upx;
}
.new-con > view > view text:nth-of-type(1) {
	color: #347cfd;
}

.kaiti text {
	display: block;
}
.kaiti text:nth-of-type(even) {
	font-size: 24upx;
	margin: 10upx 0;
	color: #b1b7c7;
}
.kaiti view {
	width: 112upx;
	height: 58upx;
	background: rgba(51, 123, 253, 1);
	border-radius: 29upx;
	text-align: center;
	line-height: 58upx;
	color: #fff;
	margin: 10upx 0;
}
.kai-con {
	padding: 30upx;
	background: rgba(246, 248, 250, 1);
	border-radius: 10upx;
	margin: 20upx 0;
}
.kai-con > text {
	font-size: 24upx;
	color: #646c7f;
}
.kai-con view text {
	color: #347cfd;
	font-size: 24upx;
	display: inline-block;
	padding-top: 10upx;
	line-height: 40upx;
	border-bottom: 1px solid #347cfd;
}
.kai-con view text:nth-of-type(2) {
	margin: 0 10upx;
}

.cai-con {
	border-radius: 10upx;
	margin: 20upx 0;
}
.cai-con > view:nth-of-type(1) {
	align-items: center;
	view {
		text {
			margin: 0 10upx;
		}
	}
}
.cai-con > view {
	display: flex;
	margin-top: 40upx;
	view {
		display: flex;
		align-items: center;
		flex: 1;
		text {
			font-size: 28upx;
			color: #646c7f;
		}
		input {
			font-size: 28upx;
			border-bottom: 2upx solid #eee;
			padding-bottom: 10upx;
		}
	}
	> text {
		font-size: 28upx;
		color: #b1b8c8;
		margin-right: 50upx;
	}
	label {
		font-size: 28upx;
		margin: 0 10upx;
	}
	button {
		width: 160upx;
		height: 58upx;
		background: rgba(52, 124, 253, 1);
		border-radius: 29upx;
		border: 0;
		padding: 0;
		line-height: 58upx;
		color: #fff;
		font-size: 28upx;
	}
}
uni-radio .uni-radio-input {
	width: 15upx;
	height: 15upx;
	margin: 0 10upx;
}
</style>
