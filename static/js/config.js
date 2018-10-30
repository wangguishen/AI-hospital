var storage = window.localStorage,
encryptCode = "1234567899876545",
loginname = "", //本地环境、测试环境、正式环境接口前缀
//loginname = "/yca", //演示环境接口前缀
indexAuthEntry = loginname+"/account_auth_admin/personal-api.newcheckpower", /*新主页访问权限*/
loginMethod = loginname+'/account_auth_admin/personal-api.clientSingleNewLogin', //
//loginMethod = '/account_auth_admin/personal-api.newloginPower',
loginOut = loginname+'/account_auth_admin/personal-api.logout', /*退出登录*/
updInfoMethod = loginname+"/account_auth_admin/personal-api.updateUserInfo", /*修改个人信息*/
updPwdMethod = loginname+"/account_auth_admin/personal-api.changePassword", /*修改密码*/
urlMinddle = loginname+"/account_auth_admin/personal-api.dynamicLoginOne", /*通过手机号，获取验证码*/
PhoneLogin = loginname+"/account_auth_admin/personal-api.dynamicLoginTwo", /*手机验证码登录*/
sessionIduser = loginname+"/account_auth_admin/user-api.findBySessionId", /*通过sessionId获取用户信息*/
getFileMethod = loginname+"/file-service/file-api.download?useOld=false&domain=user&type=photo&fileName=", /*获取头像*/
uploadFileMethod = loginname+"/file-service/file-api.upload?domain=user&type=photo";/*上传头像*/
 
//测试
var starttestaddress = "http://xptest.sunmath.cn:8199/NVRCT"/*后台配置测试接口地址*/
var personalCenterIframeUrl='http://10.0.0.97:83';  //个人中心测试地址
var Customerservice = "http://test5.zkb.xt.weilian.cn";  //客满测试地址
var ftxauth = 'https://ftx.weilian.cn/test/center-ccm/services/user/auth';   //泛通信正式环境auth参数；
var openftx = 'https://ftx.weilian.cn/test/suneee-wbs/mclink/index.html?obj=';   //泛通信正式环境打开连接；

//演示
/* var personalCenterIframeUrl='http://demo.uc.sunmath.cn';  //个人中心演示地址
var Customerservice = "http://demo.customer.suneee.weilian.cn";  //客满演示地址
var ftxauth = 'http://ccm.center.public.ftx.weilian.cn/services/user/auth';   //泛通信正式环境auth参数；
var openftx = 'http://wbs.suneee.private.public.ftx.weilian.cn/mclink/index.html?obj=';   //泛通信正式环境打开连接； */

//正式
/* var personalCenterIframeUrl = 'http://uc.weilian.cn'; //个人中心正式地址
var Customerservice = "http://suneee.oa.weilian.cn";  //客满正式地址
var ftxauth = 'http://yichao.sunmath.cn/ftx/ccm/services/user/auth';   //泛通信正式环境auth参数；
var openftx = 'http://yichao.sunmath.cn/ftx/wbs/mclink/index.html?obj=';   //泛通信正式环境打开连接； */

/*为null或是undefined判断*/
function isNull(object) {
	if (object === "null" || object === null || object === undefined || object === "undefined") {
		return true;
	}
	return false;
}

//aes加密
function Encrypt(word) {
	var key = CryptoJS.enc.Utf8.parse(encryptCode);
	var srcs = CryptoJS.enc.Utf8.parse(word);

	var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
	return encrypted.toString();
}