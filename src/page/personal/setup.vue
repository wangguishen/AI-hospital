<template>
  <div>
    <div class="sign-state">状态</div>
    <div class="sign-message">
      <div class="sign-img">
        <img :src="userInfo.headicon" alt="">
      </div>
      <div class="sign-content">
        <div class="sign-name">{{userInfo.username}}</div>
        <div class="sign-system">AI医院</div>
      </div>
    </div>
    <div class="signout">
      <el-button class="sign-btn" type="primary" @click="signout()">退出当前账号</el-button>
    </div>
    
  </div>
</template>
<script>
import { loginOut } from "@/service/axios.js";
import { setLocalStorage,getLocalStorage,clearStorage } from '@/util/storageUtil'
export default {
  data() {
    return {
      userInfo: {
        headicon: '',
        username: ''
      },
      userData: getLocalStorage("xpuserdata", "json"),
      sessionIdn: ""
    };
  },
  mounted() {
    if (this.userData != null && getLocalStorage("xpuserdata", "json").user.sessionId) {
      this.sessionIdn = getLocalStorage("xpuserdata", "json").user.sessionId;
    } else {
      this.$router.push({ path: "/login" });
      return false;
    }
    this.messageUser()
  },
  methods: {
    messageUser () {
      let self = this;
      let userdata = self.$store.getters.getUserInfo.user
      if(userdata.sessionId){
        let photo = userdata.photo; //获取用户头像
        if(isNull(photo) || photo==''){
          self.userInfo.headicon = './static/images/headicon.png';
        }else{
          self.userInfo.headicon = getFileMethod + userdata.photo
        }
        //获取用户名
        let usernames = userdata.aliasName;
        if(!isNull(usernames)){
          self.userInfo.username = userdata.aliasName;
        }else{
          self.userInfo.username = userdata.name;
        }
      }
      console.log('userInfo',self.userInfo)
    },
    // 退出登录
    async signout() {
      const that = this;
      let outdata ={
        sessionId: that.sessionIdn,
        syn: true,
      };
      let userOut = await loginOut(outdata);
      if(userOut.data.status == 1){
        let accountMsg = getLocalStorage('remember','json');
        clearStorage();
        setLocalStorage('remember',accountMsg);
        that.$store.dispatch("setState", '')
        that.$router.push({path:'/login'})
      }else{
        if(userOut.data.code=="CONNECTION_FAIL"){
          let accountMsg = getLocalStorage('remember','json');
          clearStorage();
          setLocalStorage('remember',accountMsg)
          that.$store.dispatch("setState", '')
          that.$router.push({path:"/login"})
        }else if(isNull(userOut.data.code)){
          that.Alert("应用异常，请稍后重试");
        }else{
          that.Alert(userOut.data.message);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.sign-state{
  margin: 30px 20px 10px 20px;
  font-size: 14px;
  color: #999;
}
.sign-message{
  display: flex;
  padding: 20px;
  background: #FFF;
  height: 50px;
  .sign-img{
    margin-right: 10px;
    img{
      display: block;
      height: 50px;
      border-radius: 4px;
    }
  }
  .sign-content{
    .sign-name{
      font-size: 18px;
      height: 30px;
    }
    .sign-system{
      height: 20px;
      font-size: 14px;
      color: #999;
    }
  }
}
.signout{
  padding: 30px 20px;
  .sign-btn{
    width: 100%;
    height: 45px;
    background: #306FF0;
  }
}
</style>