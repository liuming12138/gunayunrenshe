<template>
	<view class="">
		<view class="app-nav">
			<view :class="curIndex == 1 ? 'nav-on' : ''" @tap="onTab(1)">个人案件</view>
			<view :class="curIndex == 2 ? 'nav-on' : ''" @tap="onTab(2)">政府法规</view>
		</view>
		<view class="app-list">
			<view v-for="(item, index) in orderList" :key="index" @tap="onCheckDec(item)">
				<text>{{ item.title }}</text>
				<text>{{ item.createTime | pattime }}</text>
			</view>
		</view>
		<uni-load-more :status="more" :show-icon="true" v-if="showLoadMore"></uni-load-more>
	</view>
</template>

<script>
import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
import interfaces from '../../utils/interfaces.js';
export default {
	data() {
		return {
			type:'0',
			curIndex: 1,
			orderList: [],
			more: 'more',
			showLoadMore: true,
			page: 1,
			pageSize: 10
		};
	},
	components: { uniLoadMore },
	filters: {
		pattime(value) {
			value = value.slice(5, 10);
			value = value.replace('/', '-');
			return value;
		}
	},
	onLoad() {
		this.orderList = [];
		this.loadData();
	},
	onReachBottom: function() {
		this.page++;
		this.loadData();
	},
	methods: {
		onTab(index) {
			this.curIndex = index;
			this.page = 1;
			this.orderList = [];
			this.loadData();
		},
		onCheckDec(data) {
			uni.navigateTo({
				url: '../note_dec/note_dec?id=' + data.id+'&type=1'
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
				url: interfaces.arbitrNote,
				method: 'POST',
				data: data,
				success: res => {
					let tempData = res.data.data;
					if (tempData.content.length > 0) {
						_this.more = 'more';
						tempData.content.forEach(item => {
							_this.orderList.push(item);
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
page {
	background-color: #f9f9f9;
}

.app-nav {
	border-top: 1px solid #eee;
	position: fixed;
	z-index: 5;
	/* #ifdef APP-NVUE */
	top: 88upx;
	/* #endif */
	
	width: 100%;
	height: 88upx;
	background-color: #fff;
	display: flex;
	view {
		flex: 1;
		text-align: center;
		font-size: 34upx;
		line-height: 88upx;
		color: #b2b8c8;
		position: relative;
	}
	.nav-on {
		color: #000;
	}
	.nav-on::after {
		content: '';
		display: inline-block;
		background-color: #367afe;
		width: 86upx;
		height: 4upx;
		position: absolute;
		bottom: 0;
		left: 50%;
		margin-left: -43upx;
	}
}
.app-list {
	padding: 128upx 40upx 20upx;
	view {
		height: 100upx;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		box-shadow: 1upx 15upx 50upx 0px rgba(10, 10, 54, 0.05);
		margin-bottom: 20upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 40upx;
		box-sizing: border-box;
		text {
			font-size: 26upx;
			color: #b2b8c8;
		}
		text:nth-of-type(1) {
			color: #646c80;
			width: 80%;
			display: inline-block;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}
}
</style>
