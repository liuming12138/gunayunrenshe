<template>
	<view>
		<view class="app-1">{{ decData.title }}</view>
		<view class="app-2" v-if="decData.createTime">发布时间：{{ decData.createTime | pattime }}</view>
		<view class="app-3"><u-parse :content="decData.content"></u-parse></view>
	</view>
</template>

<script>
import uParse from '@/components/u-parse/u-parse.vue';
import interfaces from '../../utils/interfaces.js';
export default {
	data() {
		return {
			decData: {}
		};
	},
	components: {
		uParse
	},
	filters: {
		pattime(value) {
			value = value.slice(5, 10);
			value = value.replace('/', '-');
			return value;
		}
	},
	onLoad(option) {
		let id = option.id;
		let type  = option.type
		this.loadData(id,type);
	},
	methods: {
		loadData(id,type) {
			var _this = this
			var curUrl = ''
			if(type==1){
				curUrl = interfaces.arbitrNoteDec
			}
			else if(type==2){
				curUrl = interfaces.policeNoteDec
			}
			let data = {
				id: id
			};
			this.request({
				url: curUrl,
				method: 'POST',
				data: data,
				success: res => {
					var richtext = res.data;
					const regex = new RegExp('<img', 'gi');
					richtext.content = richtext.content.replace(regex, `<img style="max-width: 100%;"`);
					this.decData = richtext;
				}
			});
		}
	}
};
</script>
<style lang="scss">
.app-1 {
	text-align: center;
	padding: 20upx 40upx;
	font-size: 36upx;
	font-weight: 500;
}
.app-2 {
	text-align: center;
	font-size: 28upx;
	color: #666;
}
.app-3 {
	padding: 20upx 40upx;
	image {
		max-width: 100% !important;
		display: block;
	}
}
</style>

<style>
@import url('@/components/u-parse/u-parse.css');
</style>
