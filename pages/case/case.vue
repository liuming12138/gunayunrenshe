<template>
	<view>
		<view class="case-list">
			<view class="list-0"><text>个人案件</text></view>
			<view class="list-con">
				<view class="case-con" v-for="(item, index) in caseList" :key="index" @tap="onCheckDec(item)">
					<view class="list-1"><text>案件编号：{{item.caseCode}}</text></view>
					<view class="list-2">
						<view class="list-21">
							<view class="">
								<text>申请人</text>
								<text>{{item.name}}</text>
							</view>
							<view class="">
								<text>被申请人</text>
								<text>{{item.companyName}}</text>
							</view>
							<view class="">
								<text>案件状态</text>
								<text :class="item.auditFlag == 21 ? 'text-on3' : 'text-on1'">{{ audit[item.auditFlag]||'审核不通过' }}</text>
							</view>
						</view>
						<view class="list-22">
							<image v-if="item.auditFlag == 0 || item.auditFlag == 4 || item.auditFlag == 6" src="../../static/img/case/1.png" mode=""></image>
							<image v-if="item.auditFlag == 1 || item.auditFlag == 3 || item.auditFlag == 4 || item.auditFlag == 7" src="../../static/img/case/2.png" mode=""></image>
							<image v-if="item.auditFlag == 21" src="../../static/img/case/3.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="more" :show-icon="true" v-if="showLoadMore"></uni-load-more>
		</view>
	</view>
</template>

<script>
import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
import interfaces from '../../utils/interfaces.js';
export default {
	data() {
		return {
			page: 1,
			pageSize: 10,
			more: 'more',
			showLoadMore: true,
			caseList: [],
			status: 0,
			audit: ['审核中', '审核通过', '', '材料已确认', '待开庭确认', '已开庭确认', '仲裁书已出', '仲裁完成']
		};
	},
	components: { uniLoadMore },
	onLoad() {
		this.caseList = [];
		this.loadData();
	},
	onReachBottom: function() {
		this.page++;
		this.loadData();
	},
	methods: {
		onCheckDec(data) {
			uni.navigateTo({
				url: '../case_dec/case_dec?id=' + data.id
			});
		},
		loadData() {
			var _this = this;
			let data = {
				userId: '87',
				pageSize: this.pageSize,
				currentPage: this.page
			};
			this.request({
				url: interfaces.caseList,
				method: 'POST',
				data: data,
				success: res => {
					let tempData = res.data;
					console.log(tempData);
					if (tempData.list.length > 0) {
						_this.more = 'more';
						tempData.list.forEach(item => {
							_this.caseList.push(item);
						});
					} else {
						_this.more = 'noMore';
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.list-0 {
	padding: 40upx;
}
.list-0 text {
	font-family: PingFang SC;
	font-weight: bold;
	color: rgba(44, 50, 64, 1);
	font-size: 34upx;
	padding-left: 24upx;
	position: relative;
}
.list-0 text::before {
	content: '';
	position: absolute;
	width: 5upx;
	height: 31upx;
	background-color: #3679ff;
	left: 0;
	top: 10upx;
}
.list-con {
	padding: 0 40upx;
	.case-con {
		margin-bottom: 40upx;
		width: 100%;
		height: 286upx;
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
			padding: 20upx 40upx;
			display: flex;
			align-items: center;
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
					color: #409eff;
				}
				.text-on2 {
					color: #67c23a;
				}
				.text-on3 {
					color: #f56c6c;
				}
			}
		}
	}
}
</style>
