
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/home","pages/arbitr_note/arbitr_note","pages/note_dec/note_dec","pages/police_note/police_note","pages/case/case","pages/case_dec/case_dec","pages/login/login","pages/monitor/monitor-0","pages/monitor/monitor-1","pages/monitor/monitor-2","pages/monitor/monitor-3","pages/monitor/monitor-4","pages/monitor/monitor-5","pages/monitor/monitor-6","pages/contr/contr","pages/contr/contr-1","pages/contr/contr-2","pages/contr/contr-3","pages/contr/contr-4","pages/contr/contr-5","pages/contr/contr-6","pages/contr/contr-7","pages/contr/contr-8"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"人社仲裁","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#FFFFFF"},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"uni-app-mall","compilerVersion":"2.7.14","entryPagePath":"pages/case_dec/case_dec","entryPageQuery":"","realEntryPagePath":"pages/home/home","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/home","meta":{"isQuit":true},"window":{"navigationBarTitleText":"灌云人社仲裁","onReachBottomDistance":0}},{"path":"/pages/arbitr_note/arbitr_note","meta":{},"window":{"navigationBarTitleText":"仲裁须知","onReachBottomDistance":0}},{"path":"/pages/note_dec/note_dec","meta":{},"window":{"navigationBarTitleText":"详情","onReachBottomDistance":0}},{"path":"/pages/police_note/police_note","meta":{},"window":{"navigationBarTitleText":"管辖须知","onReachBottomDistance":0}},{"path":"/pages/case/case","meta":{},"window":{"navigationBarTitleText":"我的案件","onReachBottomDistance":0}},{"path":"/pages/case_dec/case_dec","meta":{},"window":{"navigationBarTitleText":"案件详情","onReachBottomDistance":0}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","onReachBottomDistance":0}},{"path":"/pages/monitor/monitor-0","meta":{},"window":{"navigationBarTitleText":"使用说明","onReachBottomDistance":0}},{"path":"/pages/monitor/monitor-1","meta":{},"window":{"navigationBarTitleText":"灌云人社监察投诉","onReachBottomDistance":0}},{"path":"/pages/monitor/monitor-2","meta":{},"window":{"navigationBarTitleText":"监察投诉","onReachBottomDistance":0}},{"path":"/pages/monitor/monitor-3","meta":{},"window":{"navigationBarTitleText":"监察投诉","onReachBottomDistance":0}},{"path":"/pages/monitor/monitor-4","meta":{},"window":{"navigationBarTitleText":"监察投诉","onReachBottomDistance":0}},{"path":"/pages/monitor/monitor-5","meta":{},"window":{"navigationBarTitleText":"监察投诉","onReachBottomDistance":0}},{"path":"/pages/monitor/monitor-6","meta":{},"window":{"navigationBarTitleText":"监察投诉","onReachBottomDistance":0}},{"path":"/pages/contr/contr","meta":{},"window":{"navigationBarTitleText":"灌云人社仲裁","onReachBottomDistance":0}},{"path":"/pages/contr/contr-1","meta":{},"window":{"navigationBarTitleText":"个人争议申请","onReachBottomDistance":0}},{"path":"/pages/contr/contr-2","meta":{},"window":{"navigationBarTitleText":"个人争议申请","onReachBottomDistance":0}},{"path":"/pages/contr/contr-3","meta":{},"window":{"navigationBarTitleText":"个人争议申请","onReachBottomDistance":0}},{"path":"/pages/contr/contr-4","meta":{},"window":{"navigationBarTitleText":"个人争议申请","onReachBottomDistance":0}},{"path":"/pages/contr/contr-5","meta":{},"window":{"navigationBarTitleText":"个人争议申请","onReachBottomDistance":0}},{"path":"/pages/contr/contr-6","meta":{},"window":{"navigationBarTitleText":"个人争议申请","onReachBottomDistance":0}},{"path":"/pages/contr/contr-7","meta":{},"window":{"navigationBarTitleText":"个人争议申请","onReachBottomDistance":0}},{"path":"/pages/contr/contr-8","meta":{},"window":{"navigationBarTitleText":"个人争议申请","onReachBottomDistance":0}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
