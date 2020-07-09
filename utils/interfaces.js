const domain = "http://172.18.1.18:8066/";
const interfaces = {
	// 文件路径
	tempUrl: 'http://172.18.1.18/upload',
	//上传文件地址
	upImgUrl: 'http://172.18.1.18:8066/file/upload',
	// 仲裁须知
	arbitrNote: domain + "arbitrationArticle/list",
	// 仲裁须知详情
	arbitrNoteDec: domain + "arbitrationArticle/info",
	// 管辖须知
	policeNote: domain + "governNotice/list",
	// 管辖须知详情
	policeNoteDec: domain + "governNotice/info",
	// 我的案件列表
	caseList: domain + "arbitrationApp/list",
	// 我的案件详情
	caseDec: domain + "arbitrationApp/info",
	// 未完成仲裁列表
	incomCaseList: domain + "arbitrationApp/write",
	// 编辑未完成仲裁信息
	incomCaseDec: domain + "arbitrationApp/info",
	// 新增与更新未完成仲裁信息
	incomCaseUpdate: domain + "arbitrationApp/arbitration",
	// 删除未完成仲裁信息
	incomCaseDelete: domain + "arbitrationApp/deletes",
	// 新增监察信息
	incomMonitorUpdate: domain + "/monitorApp/monitor",
	// 微信授权
	weixnAuthor: "http://e5ckqv.natappfree.cc/weixin",
}
module.exports = interfaces;
