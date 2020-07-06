<template>
	<!-- 加载列表数据状态容器 -->
	<view class="container">
		<!-- 没有数据 -->
		<view class="item" v-if="type == 0">
			<view class="line"></view>
			<text class="tip">没有数据</text>
		</view>
		<!-- 暂无更多 -->
		<view class="item" v-else-if="type == 1">
			<view class="line"></view>
			<text class="tip">暂无更多</text>
		</view>
		<!-- 正在加载中... -->
		<view class="item loading" v-else-if="type == 2">
			<view class="center">
				<image
					class="loading-icon"
					src="data:image/svg+xml;base64,IDxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTIwJyBoZWlnaHQ9JzEyMCcgdmlld0JveD0nMCAwIDEwMCAxMDAnPjxwYXRoIGZpbGw9J25vbmUnIGQ9J00wIDBoMTAwdjEwMEgweicvPjxyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0nI0U5RTlFOScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwIC0zMCknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9JyM5ODk2OTcnIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMzAgMTA1Ljk4IDY1KScvPjxyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0nIzlCOTk5QScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA3NS45OCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9JyNBM0ExQTInIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNjUgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPScjQUJBOUFBJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDEyMCA1OC42NiA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9JyNCMkIyQjInIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMTUwIDU0LjAyIDY1KScvPjxyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0nI0JBQjhCOScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPScjQzJDMEMxJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC0xNTAgNDUuOTggNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPScjQ0JDQkNCJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC0xMjAgNDEuMzQgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPScjRDJEMkQyJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC05MCAzNSA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9JyNEQURBREEnIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTYwIDI0LjAyIDY1KScvPjxyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0nI0UyRTJFMicgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtMzAgLTUuOTggNjUpJy8+PC9zdmc+"
				></image>
				<text class="loading-tip">正在加载中...</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: ''
		}
	},
	data() {
		return {};
	},
	methods: {}
};
</script>

<style>
.container {
	width: 100%;
	height: 90upx;
}
	

.item {
	position: relative;
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.loading{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;
	background-color: rgba(0,0,0,0.4);
}
.line {
	width: 50%;
	height: 41upx;
	border-top: 2upx solid #999;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translate(-50%, 0);
}
.tip {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
	padding: 6upx 20upx;
}
.loading-tip,
.tip {
	font-size: 28upx;
}
.loading-tip {
	margin-left: 10upx;
}
.tip {
	color: #999;
}
.center {
	display: flex;
	position: absolute;
}
.loading-icon {
	width: 40upx;
	height: 40upx;
	transition: 0.3s;
	animation: loading 1s steps(12) infinite;
}
@keyframes loading {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(1turn);
	}
}
</style>
