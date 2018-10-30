<template>
  <div class="controller">
    <div class="background">
      <div class="back_top">
        <p>&nbsp;</p>
      </div>
      <div class="back_bot">
        <p>桂ICP备17002994号&copy;Copyright&nbsp;2010-2017 象翌微链科技发展有限公司 版权所有</p>
      </div>
      <div class="login_box">
        <img src="../../static/images/login.png" alt="">
        <div class="login_contentbox">
          <div class="login_contentboxt">
            <transition name="fade">
              <el-form v-if="phoshow" class="login_content demo-ruleForm" id="dynamilogin" :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="70px">
                <el-form-item label="用户名" prop="account">
                  <el-input type="text" v-model="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <div class="getPwd">
                  <div class="dynamilogin" @click="phochangebtn()">动态密码登录</div>
                  <el-checkbox v-model="getPwd">记住密码</el-checkbox>
                </div>
                <el-form-item>
                  <el-button type="primary" @click="submitForm()">提交</el-button>
                </el-form-item>
              </el-form>
            </transition>
            <transition name="fade">
              <el-form v-if="mmshow" class="login_content demo-ruleForm" id="passwordlogin" :model="ruleForm2" :rules="rules3" ref="ruleForm2" label-width="70px">
                <el-form-item label="手机号：" prop="phonenumber">
                  <el-input type="text" v-model="ruleForm2.phonenumber"></el-input>
                </el-form-item>
                <div class="codebox">
                  <el-form-item class="codeinput" label="验证码：" prop="codeinput">
                    <el-input type="text" v-model="ruleForm2.codeinput"></el-input>
                  </el-form-item>
                  <div class="code-image" v-bind:class="{timeEndSunccess:istimeEndSunccess}" @click="codeimage()">
                    <i class="timeEnd" v-text="ruleForm2.codeimages">获取验证码</i>
                  </div>
                </div>
                <div class="getPwd">
                  <div class="dynamilogin" @click="pawchangebtn()">密码登录</div>
                </div>
                <el-form-item>
                  <el-button type="primary" @click="dynamicbtn()">提交</el-button>
                </el-form-item>
              </el-form>
            </transition>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { storage } from "./js/public";
import {
  adminLogin,
  getMinddleCode,
  PhoneLogin,
  getUsers
} from "@/service/axios";
import md5 from "js-md5";
import {
  setLocalStorage,
  getLocalStorage,
  clearStorage
} from "@/util/storageUtil";
import { findCompCode } from "@/util/utils";
export default {
  data() {
    return {
      ruleForm: {
        account: "", //用户名
        password: "" //密码
      },
      ruleForm2: {
        phonenumber: "", //用户名
        codeinput: "", //密码
        codeimages: "获取验证码" //获取验证码
      },
      appCode: "XIANGPUYIGEAPP", //应用编码
      clientIp: "127.0.0.1", //客户端IP
      encryptCode: encryptCode, //密钥
      enterpriseCode: "YIGEYINGXIANG", //企业编码
      prefix: "YCHXP", //短信前缀标识
      entrance: "WEILIANHAI", //入口
      sign: "", //签名校验
      rules2: {
        //判断用户名、密码是否为空
        account: { required: true, message: "请输入用户名", trigger: "blur" },
        password: { required: true, message: "请输入密码", trigger: "blur" }
      },
      rules3: {
        //判断用户名、密码是否为空
        phonenumber: {
          required: true,
          message: "手机号码不能为空",
          trigger: "blur"
        },
        codeinput: {
          required: true,
          message: "验证码不能为空",
          trigger: "blur"
        }
      },
      getPwd: true, //记住密码
      istimeEndSunccess: true, //获取验证码
      sessionId: "",
      phoshow: true,
      mmshow: true
    };
  },
  created() {
    let remembersf = getLocalStorage("remember","json")
    if (remembersf) {
      if (remembersf.password) {
        this.ruleForm.password = remembersf.password;
      }
      this.ruleForm.account = remembersf.account;
    }
  },
  methods: {
    //登录按钮
    submitForm() {
      const that = this;
      that.$refs.ruleForm.validate(async valid => {
        if (valid) {
          let temp = getLocalStorage("remember","json")
          that.ruleForm.password = temp && temp.password ? temp.password : md5(that.ruleForm.password)
          let sign = Encrypt(JSON.stringify(that.parameter()));
          let reqData = {
            account: that.ruleForm.account,
            appCode: that.appCode,
            clientIp: that.clientIp,
            encryptCode: that.encryptCode,
            enterpriseCode: that.enterpriseCode,
            entrance: that.entrance,
            password: that.ruleForm.password,
            sign: sign
          };
          let resDatas = await adminLogin(reqData);
          if (resDatas.data.status == 1) {
            // setLocalStorage("xpuserdata",resDatas.data.data)
            let authMsg = resDatas.data.data.dataPower.enterprise;
            console.log("2222222",authMsg)
            that.$store.dispatch('setUserType', findCompCode(authMsg))
            that.$store.dispatch('setUserInfo', resDatas.data.data)
            if (that.getPwd) {
              setLocalStorage("remember",{
                account: that.ruleForm.account,
                password: that.ruleForm.password
              })
            } else {
              setLocalStorage("remember",{
                account: that.ruleForm.account
              })
            }
            if(resDatas.data.data.userType == 'BUSER' || resDatas.data.data.userType == 'CUSER'){
              console.log('sdfa',this.$store.getters.getSideBarState)
              let sideBarState = {
                IsAboutMeShow: false,
                state: '2'
              }
              that.$store.dispatch('setSideBarState', sideBarState)
              that.$router.push({ path: "/home" });
            }
/*             if (typeof resDatas.data.data.dataPower == "string") {
              that.Alert("该用户没有权限!");
            } else {
              let authMsg = resDatas.data.data.dataPower.enterprise;
              let sendIndexMsg = {};
              if (authMsg.company.hasPower) {
                sendIndexMsg = {
                  enterpriseCode: authMsg.company.groupCode,
                  CompCode: authMsg.company.groupCode
                };
                setLocalStorage("sendIndexMsg",sendIndexMsg);
                that.$router.push({ path: "/home" });
              } else if (authMsg.companyChildren != null) {
                var authLength = 0;
                authMsg.companyChildren.map(function(item, index) {
                  if (item.hasPower) {
                    authLength++;
                    sendIndexMsg = {
                      enterpriseCode: item.groupCode,
                      CompCode: item.comp_code
                    };
                    setLocalStorage("sendIndexMsg",sendIndexMsg);
                    that.$router.push({ path: "/home" });
                    return;
                  }
                });
              } else {
                that.Alert("该用户没有权限!");
              }
            } */
          } else if (resDatas.data.status == 2) {
            if (resDatas.data.code == "APP_NO_FIND") {
              that.Alert("系统错误，请联系管理员！");
            } else if (resDatas.data.code == "UNAUTHORIZED_ACCESS_APP") {
              that.Alert("无法识别用户身份");
            } else if (resDatas.data.code == "ENTERPRISE_NOT_ENABLED") {
              that.Alert("系统错误，请联系管理员");
            } else if (resDatas.data.code == "NO_EXISTS_ACCOUNT") {
              that.Alert("无法识别用户身份");
            } else if (resDatas.data.code == "PLEASE_MOBILE_EMAIL_LOGIN") {
              that.Alert("账号重复，请用手机或邮箱登录");
            } else if (resDatas.data.code == "USER_DISABLED") {
              that.Alert("该帐号已禁用，请联系管理员");
            } else if (isNull(resDatas.data.code)) {
              that.Alert("应用异常，请稍后重试");
            } else {
              that.Alert(resDatas.data.message);
            }
          }
        } else {
          return false;
        }
      });
    },
    //登录参数
    parameter() {
      return {
        account: this.ruleForm.account,
        appCode: this.appCode,
        clientIp: this.clientIp,
        encryptCode: this.encryptCode,
        enterpriseCode: this.enterpriseCode,
        entrance: this.entrance,
        password: this.ruleForm.password
      };
    },
    //切换---动态密码登录
    phochangebtn() {
      this.phoshow = false;
      this.mmshow = true;
    },
    //切换---密码登录
    pawchangebtn() {
      this.phoshow = true;
      this.mmshow = false;
    },
    //点击获取验证码
    async codeimage() {
      const that = this;
      if (that.ruleForm2.phonenumber == "") {
        that.Alert("手机号不能为空");
        return false;
      }
      let phonenumber = that.ruleForm2.phonenumber;
      if (that.istimeEndSunccess) {
        that.istimeEndSunccess = false;
        let reqData = {
          appCode: that.appCode,
          clientIp: that.clientIp,
          encryptCode: that.encryptCode,
          enterpriseCode: that.enterpriseCode,
          mobile: phonenumber,
          prefix: that.prefix
        };
        let minddles = await getMinddleCode(reqData);
        if (minddles.data.status == 1 && minddles.data.data != null) {
          that.ruleForm2.codeimages = "60s重新获取";
          let inialNum = that.ruleForm2.codeimages.slice(0, 2);
          let timeEnd = window.setInterval(function() {
            //倒计时
            inialNum--;
            that.ruleForm2.codeimages = inialNum + "s重新获取";
            if (inialNum <= 0) {
              that.ruleForm2.codeimages = "重获取验证码";
              that.istimeEndSunccess = true;
              window.clearInterval(timeEnd);
            }
          }, 1000);
          that.sessionId = minddles.data.data;
        } else if (minddles.data.status == 2 && minddles.data.data == null) {
          that.istimeEndSunccess = true;
          that.Alert(minddles.data.message);
        }
      } else {
        that.istimeEndSunccess = true;
      }
    },
    async dynamicbtn() {
      //动态密码登录按钮
      const that = this;
      let phonenumber = that.ruleForm2.phonenumber;
      let codeinput = that.ruleForm2.codeinput;
      if (phonenumber == "") {
        that.Alert("手机号不能为空");
        return false;
      }
      if (codeinput == "") {
        that.Alert("验证码不能为空");
        return false;
      }
      let codesendData = {
        code: codeinput,
        mobile: phonenumber,
        sessionId: that.sessionId
      };
      let codesendDatas = await PhoneLogin(codesendData);
      if (codesendDatas.data.status == 1 && codesendDatas.data.data != null) {
        //获取登录信息接口
        let sessionIdData = {
          sessionId: that.sessionId
        };
        let userdata = await getUsers(sessionIdData);
        if (userdata.data.status == 1 && userdata.data.data != null) {
          setLocalStorage("xpuserdata",userdata.data.data);
          if (typeof userdata.data.data.dataPower == "string") {
            that.Alert("该用户没有权限!");
            setTimeout(function() {
              that.ruleForm2.codeinput = "";
            }, 5000);
          } else {
            let authMsg = userdata.data.data.dataPower.enterprise;
            let sendIndexMsg = {};
            if (authMsg.company.hasPower) {
              sendIndexMsg = {
                enterpriseCode: authMsg.company.groupCode,
                CompCode: authMsg.company.groupCode
              };
              setLocalStorage("sendIndexMsg",sendIndexMsg);
              self.$store.dispatch('setUserType', findCompCode(authMsg))
              that.$router.push({ path: "/home" });
            } else if (authMsg.companyChildren != null) {
              var authLength = 0;
              authMsg.companyChildren.map(function(item, index) {
                if (item.hasPower) {
                  authLength++;
                  sendIndexMsg = {
                    enterpriseCode: item.groupCode,
                    CompCode: item.comp_code
                  };
                  setLocalStorage("sendIndexMsg",sendIndexMsg)
                  self.$store.dispatch('setUserType', findCompCode(authMsg))
                  that.$router.push({ path: "/home" });
                  return;
                }
              });
            } else {
              that.Alert("该用户没有权限!");
              setTimeout(function() {
                that.ruleForm2.codeinput = "";
              }, 5000);
            }
          }
        } else if (userdata.data.status == 2 && userdata.data.data == null) {
          that.Alert(userdata.data.message);
        }
      } else if (codesendDatas.data.status == 2 && reg.data.data == null) {
        that.Alert(codesendDatas.data.message);
      }

    },
    //统一弹出框
    Alert(messages) {
      this.$message({
        message: messages,
        center: true,
        duration: 4000,
        type: "error"
      });
    }
  }
};
</script>
<style>
html,
body,
#app {
  height: 100%;
}
p {
  display: block;
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
}
.controller {
  height: 100%;
}
.controller .background {
  position: relative;
  height: 100%;
}
.controller .background .back_top {
  width: 100%;
  height: 44%;
  background-color: #306FF0;
}
.controller .background .back_top p {
  text-align: center;
  padding-top: 44%;
}
.controller .background .back_bot {
  position: relative;
  background-image: url(../../static/images/bg_56d799.png);
  height: 56%;
}
.controller .background .back_bot p {
  width: 100%;
  position: absolute;
  bottom: 10%;
  text-align: center;
  color: #a4a5a3;
}
.controller .background .login_box {
  background-image: url(../../static/images/login-boxbj.png);
  width: 634px;
  height: 290px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -325px;
  margin-top: -145px;
}
.controller .background .login_box img {
  width: 252px;
  height: 52px;
  margin-top: 100px;
  margin-left: 26px;
  margin-right: 60px;
  cursor: pointer;
  float: left;
}
.controller .background .login_box .login_contentbox {
  width: 235px;
  height: 210px;
  padding-top: 40px;
  overflow: hidden;
}
.controller .background .login_box .login_contentboxt {
  width: 470px;
  height: 210px;
}
.controller .background .login_box .login_content {
  width: 235px;
  height: 210px;
  float: left;
  position: relative;
}
.controller .background .login_box .login_content .el-form-item {
  margin-bottom: 10px;
}
.controller .background .login_box .login_content label {
  font-size: 14px;
  color: #464646;
  width: 59px;
  display: inline-block;
  text-align: right;
  font-family: "微软雅黑";
  padding-right: 10px;
}
.controller .background .el-form-item.is-required .el-form-item__label:before {
  content: none;
}
.controller .background .login_box .login_content .codebox {
  width: 235px;
  height: 46px;
}
.controller
  .background
  .login_box
  .login_content
  .codeinput
  .el-form-item__content {
  height: 46px;
}
.controller
  .background
  .login_box
  .login_content
  .codeinput
  .el-form-item__error {
  width: 200px;
}
.controller .background .login_box .login_content .codeinput .el-input {
  width: 66px;
}
.controller .background .login_box .login_content .el-input {
  width: 150px;
  height: 32px;
  margin-bottom: 14px;
  background: #f6f6f6;
}
.controller .background .login_box .login_content .el-form-item__error {
  margin-top: -10px;
}
.controller .background .login_box .login_content .el-input .el-input__inner {
  width: 155px;
  height: 34px;
  border-radius: 0;
  line-height: 30px;
}
.controller .background .login_box .login_content .getPwd {
  display: block;
  height: 20px;
  margin-bottom: 10px;
  clear: both;
}
.controller .background .login_box .login_content .getPwd .dynamilogin {
  float: left;
  margin: 0 10px 10px 70px;
  margin-left: 70px;
  margin-right: 10px;
  font-size: 12px;
  line-height: 26px;
  cursor: pointer;
}
.controller .background .login_box .login_content .getPwd .el-checkbox__label {
  padding-left: 5px;
  font-size: 12px;
}
.controller .background .login_box .login_content .el-button--primary {
  width: 155px;
  height: 34px;
  background: #306FF0;
  color: #fff;
  border: none;
  border-radius: 3px;
  line-height: 34px;
  padding: 0;
}
.controller .background .login_box .login_content .codeinput {
  width: 66px;
  float: left;
}
.controller
  .background
  .login_box
  .login_content
  .codeinput
  .el-input
  .el-input__inner {
  float: left;
  width: 70px;
  padding-left: 5px;
  padding-right: 5px;
}
.controller .background .login_box .login_content .code-image {
  float: left;
  width: 77px;
  height: 32px;
  margin-left: 80px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  border: 1px solid #ccc;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>