<template>
	<view>
		<view class="wsj" v-if="contrList.length < 1">
			<image src="../../static/img/geren/3.png" mode=""></image>
			<text>没有申请记录</text>
		</view>
		<view class="" v-else>
			<view class="app-1">
				<text>未完成申请</text>
				<view class="">
					<text v-if="state" @tap="onEditor">取消</text>
					<text v-else @tap="onEditor">编辑</text>
				</view>
			</view>
			<view class="list-0">
				<view class="list">
					<view class="" v-for="(item, index) in contrList" :key="index" @tap="onSelected(item, index)">
						<!-- 	<view class="list-1"><text>案件一</text></view> -->
						<view class="list-2">
							<view class="">
								<text>申请人</text>
								<text>{{ item.name || '暂未填写' }}</text>
							</view>
							<view class="">
								<text>被申请人</text>
								<text>{{ item.companyName || '暂未填写' }}</text>
							</view>
							<view class="">
								<text>更新时间</text>
								<text>{{ item.createDate | pattime }}</text>
							</view>
						</view>
						<view class="list-3" v-if="state">
							<image v-if="item.isCheck" src="../../static/img/geren/4.png" mode=""></image>
							<image v-else src="../../static/img/geren/5.png" mode=""></image>
						</view>
					</view>
				</view>
				<uni-load-more :status="more" :show-icon="true" v-if="showLoadMore"></uni-load-more>
			</view>
		</view>
		<view v-if="!state" class="btn"><view class="" @tap="onPage">新建案件</view></view>
		<view v-else class="btn"><view class="" @tap="onDeleContr">删除</view></view>
	</view>
</template>

<script>
import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
import interfaces from '../../utils/interfaces.js';
export default {
	data() {
		return {
			contrList: [],
			state: false,
			more: 'more',
			showLoadMore: true,
			page: 1,
			pageSize: 10
		};
	},
	filters: {
		pattime(value) {
			return value.slice(0, 10);
		}
	},
	components: { uniLoadMore },
	onReachBottom: function() {
		this.page++;
		this.loadData();
	},
	onShow() {
		this.contrList = [];
		this.loadData();
	},
	onLoad() {
		// this.contrList = [];
		// this.loadData();
	},
	methods: {
		onPage() {
			uni.navigateTo({
				url: './contr'
			});
		},
		loadData() {
			var _this = this;
			let data = {
				type: this.curIndex,
				pageSize: this.pageSize,
				currentPage: this.page
			};
			this.request({
				url: interfaces.incomCaseList,
				method: 'POST',
				data: data,
				success: res => {
					let tempData = res.data;
					console.log(tempData);
					if (tempData.list.length > 0) {
						_this.more = 'more';
						tempData.list.forEach(item => {
							_this.contrList.push(item);
						});
					} else {
						_this.more = 'noMore';
					}
				}
			});
		},
		onSelected(data, index) {
			if (!this.state) {
				uni.navigateTo({
					url: './contr-2?id=' + data.id
				});
				return false;
			}
			data.isCheck = !data.isCheck;
			this.$set(this.contrList, index, data);
		},
		onDeleContr() {
			var _this = this;
			let decide = this._.find(this.contrList, p => {
				return p.isCheck;
			});
			if (!decide) {
				uni.showModal({
					content: '至少选择一种案件',
					showCancel: false
				});
				return false;
			}
			uni.showModal({
				title: '删除案件',
				content: '确认删除当前案件',
				showCancel: true,
				success(res) {
					if (res.confirm) {
						var deleId = [];
						_this._.each(_this.contrList, p => {
							if (p.isCheck) {
								deleId.push(p.id);
							}
						});
						let data = {
							ids: deleId,
							deleteFlag: 1
						};
						_this.request({
							url: interfaces.incomCaseDelete,
							method: 'POST',
							data: data,
							success: res => {
								let tempData = res;
								_this.state = false;
								_this.contrList = _this._.filter(_this.contrList, p => {
									return !p.isCheck;
								});
							}
						});
					}
				}
			}); 
		},
		onEditor() {
			this.state = !this.state;
			this._.each(this.contrList, p => {
				p.isCheck = false;
			});
		}
	}
};
</script>

<style lang="scss">
.app-1 {
	padding:40upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #fff;
	position: fixed;
	/* #ifdef APP-NVUE */
	top: 88upx;
	/* #endif */

	left: 0;
	width: 100%;
	box-sizing: border-box;
	z-index: 2;
	>text {
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
	view{
		text{
			font-size:28upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(44,50,64,1);
		}
	}
}
.list-0{
	padding: 170upx 40upx 130upx;
	.list{
		>view{
			height:208upx;
			background:rgba(255,255,255,1);
			box-shadow:0px 15upx 50upx 0px rgba(9,9,53,0.07);
			border-radius:10upx;
			margin-bottom: 40upx;
			display: flex;
			align-items: center;
			overflow: hidden;
			position: relative;
			.list-1{
				width: 169upx;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				background:linear-gradient(180deg,rgba(52,151,253,1) 0%,rgba(52,123,253,1) 100%);
				text{
					font-size:30upx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(255,255,255,1);
				}
			}
			.list-2{
				flex: 1;
				padding: 0 40upx;
				view{
					height: 60upx;
					text:nth-of-type(1){
						font-size: 28upx;
						color: #B1B8C8;
						width: 140upx;
						display: inline-block;
					}
					text:nth-of-type(2){
						font-size: 28upx;
						color: #2C3240;
						display: inline-block;
					}
				}
				view:nth-of-type(3){
					text:nth-of-type(2){
						color: #3679FE;
						display: inline-block;
					}
				}
			}
			.list-3{
				position: absolute;
				top: 20upx;
				right: 20upx;
				image{
					display: block;
					width: 34upx;
					height: 34upx;
				}
			}
		}
	}
}

.wsj{
	padding: 280upx 0 190upx;
	text-align: center;
	image{
		display: block;
		width:374upx;
		height:288upx;
		margin: 0 auto;
	}
	text{
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(177,184,200,1);
		line-height:50upx;
	}
}
.btn {
	padding: 20upx 40upx;
	position: fixed;
	width: 100%;
	box-sizing: border-box;
	bottom: 0;
	left: 0;
	background-color: #fff;
	z-index: 2;
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
</style>
