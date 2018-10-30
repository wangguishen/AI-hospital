<template>
	<div ref="bar" class="slidebar">
    <div class="slide-bar-header g-pad">
      <div class="slide-line">
        <img class="s-head-img g-img" v-bind:src="headicon" alt="">
      </div>
      <div class="name-l">
        <p class="name-t" v-text="username"></p>
        <p  class="name-ai">AI医院</p>
      </div>
      <div class="name-r">
        <i
          v-if="sideBarState.IsAboutMeShow"
          :class="{'sm-title-icon': IsSmTitleShow}"
          class="el-icon-caret-top"
          @click="aboutMeChange"></i>
        <i
          v-else
          :class="{'sml-title-icon': IsAboutMeShow}"
          class="el-icon-caret-bottom"
          @click="aboutMeChange"></i>
      </div>
    </div>
    <div class="slide-bar-main">
      <div v-show="sideBarState.IsAboutMeShow" :class="{'fade-center':IsAboutMeShow}">
        <v-side-message></v-side-message>
      </div>
      <div v-show="!sideBarState.IsAboutMeShow" :class="{'fade-center':IsAboutMeShow}">
        <div class="side-bottom-box">
          <el-menu :default-active="sideBarState.state" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item class="el-menu-demo-list" index="1">通信</el-menu-item>
            <el-menu-item class="el-menu-demo-list" index="2">应用</el-menu-item>
            <el-menu-item class="el-menu-demo-list" index="3">智能</el-menu-item>
          </el-menu>
        </div>
        <template v-if="sideBarState.state == '1'">
          <v-side-corre></v-side-corre>
        </template>
        <template v-else-if="sideBarState.state == '2'">
          <v-side-apply></v-side-apply>
        </template>
        <template v-else-if="sideBarState.state == '3'">
          <v-side-capacity></v-side-capacity>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import vSideMessage from './sideMessage.vue'  //个人信息模块
import vSideApply from './sideApply.vue'  //应用模块
import vSideCapacity from './sideCapacity.vue'  //智能模块
import vSideCorre from './sideCorre.vue'  //通信模块
import { getLocalStorage } from "@/util/storageUtil";
import { userFilter, findCompCode } from "@/util/utils";
import { getRoleCollections, getMenuListByRoleNum, getEnterpriseUserRoleInfo } from "@/service/axios";
export default {
  components:{
    vSideMessage, vSideApply, vSideCapacity, vSideCorre
  },
	data () {
		return {
      headicon: '',
      username: '',
      sessionIdn: '',
      userList: [],
      userType: [],
      pathList: [
        {
          id: 1,
          path: '/communication'
        }, {
          id: 2,
          path: '/application'
        }, {
          id: 3,
          path: '/noopsyche'
        },
      ],
      userRegister: [],
      IsSuneee: false,
      suneeeObj: {
        comp_name: "象翌微链",
        comp_code: "SUNEEE",
        groupCode: "SUNEEE",
        hasPower: 1
      },
      IsAboutMeShow: false,
      IsSmTitleShow: false,
      IsFadeCenter: false
		}
  },
  computed:{
    sideBarState: {
      cache:false,
      get: function () {
        return this.$store.getters.getSideBarState;
      }
    },
    // userTypes: function () { //获取用户类型
    //   return this.$store.getters.getUserType;
		// },
    userInfo: function () {
      return this.$store.getters.getUserInfo;
    },
    currentRole: function () { //获取当前角色
      return this.$store.getters.getCurrentRole;
    },
    moduleInfo: function () { //获取全部菜单
      return this.$store.getters.getModuleInfo;
    },
    currentModule: function () { //获取当前菜单模块
      return this.$store.getters.getCurrentModule;
    },
    currentOrganization: function () { //获取当前组织
      return this.$store.getters.getCurrentOrganization;
    }
  },
  watch:{
    currentRole: { //获取当前角色
      handler: function (val, old) {
        let self = this;
        console.log('----',val)
        if (self.userType.length != 0) {
          let req = {
    				comp_code: self.currentOrganization.groupCode,
            role_code: val.type,
            org_code: self.currentOrganization.comp_code || self.currentOrganization.org_code,
            userId: self.userInfo.user.userId,
            env: self.COLLEC_ENV,
            verNo: self.VER_NO
          }
          self.gainUserInfo(req)
        }
      },
      deep: true
    },
  },
	mounted () {
    let self = this;
    let enterprise = self.userInfo.dataPower.enterprise;
    
    self.userType = findCompCode(enterprise)
    self.$store.dispatch('setUserType', self.userType)
    self.getUserMessage()
	},
	methods: {
    getUserMessage () { //获取个人信息头像
      let self = this;
      let userdata = self.userInfo.user;
      if(userdata.sessionId){
        self.sessionIdn = userdata.sessionId
        let photo = userdata.photo; //获取用户头像
        if(isNull(photo) || photo==''){
          self.headicon = './static/images/headicon.png';
        }else{
          self.headicon = getFileMethod+userdata.photo
        }
        //获取用户名
        let usernames = userdata.aliasName;
        if(!isNull(usernames)){
          self.username = userdata.aliasName;
        }else{
          self.username = userdata.name;
        }
        if (self.userType.length == 0) { //C类用户
          self.cUserInfo()
          self.$store.dispatch('setUserBC', 'C')
        } else {
          self.$store.dispatch('setUserBC', 'B')
          if (!self.currentOrganization) {
            self.getEnterpriseUserRole()
          }
        }
      }else{
        self.$router.push({ path: "/login" });
      }
    },
    cUserInfo () {
      let self = this;
      let reqData = {
        comp_code: 'YIGEYINGXIANG',
        role_code: '100',
        org_code: 'YIGEHUIYUAN',
        userId: self.userInfo.user.userId
      }
      self.gainUserInfo(reqData)
    },
    async getEnterpriseUserRole () { // 获取象翌微链角色权限判断
      let self = this;
      let reqData = {
        sessionId: self.userInfo.user.sessionId,
        enterpriseCode: 'SUNEEE',
        type: '2'
      }
      let resDatas = await getRoleCollections(reqData);
      console.log("象翌微链用户信息", resDatas)
      let resData = resDatas.data.data
      if (resData.length == 0) {
        self.IsSuneee = false
      } else {
        self.IsSuneee = true
      }

      self.userRegister = findCompCode(self.userInfo.dataPower.enterprise)
      console.log('------',self.userRegister)
      // self.$set(self.userRegister[0], 'org_name', self.userRegister[0].comp_name)
      if (!self.currentOrganization) {
        self.$store.dispatch('setCurrentOrganization', self.userRegister[0])
        self.getRoleCollections()
      }
    },
    async getRoleCollections () { // 获取默认第一条组织的角色
      let self = this;
      let params = {
        sessionId: self.userInfo.user.sessionId,
        enterpriseCode: self.currentOrganization.comp_code,
        type: '2'
      }
      let resData = await getRoleCollections(params)
      console.log("查询角色成功", resData)
      if (resData.status === 200 && resData.data.code === 1) {
        if (!self.currentRole) {
          if (self.IsSuneee) {
            self.userInfo.dataPower.enterprise.companyChildren.push(self.suneeeObj)
            self.userType.push(self.suneeeObj)
            self.$store.dispatch('setUserInfo', self.userInfo)
            self.$store.dispatch('setUserType', self.userType)
          }
          self.$store.dispatch('setCurrentRole', resData.data.data[0])
        }
      }
    },
    async gainUserInfo (reqData) { // 获取后台菜单
      let self = this;
      let resDatas = await getMenuListByRoleNum(reqData);
      let resData = resDatas.data.data;
      console.log("获取菜单信息", resDatas)
      if (resData) {
        for (let v = 0; v < resData.length; v++) {
          for(let y = 0; y < resData[v].childMenu.length; y++){
            self.$set(resData[v].childMenu[y], 'upDownShow', false)
            if ((v === 2 || v === 1) && resData[v].childMenu[y].childMenu) {
              resData[v].childMenu[y].childMenu.forEach((item, index) => {
                self.$set(item, 'upDownShow', false)
              })
            }
          }
        }
      } else {
        self.$message.warning(resDatas.data.msg)
        return
      }
      if (!self.currentModule) {
        self.$store.dispatch('setHeaderTitle', resData[1].childMenu[0].menu_name)
      }
      self.$store.dispatch('setCurrentModule', resData[1].childMenu[0])
      self.$store.dispatch('setCurrentApplyModule', resData[1].childMenu[0])
      
      self.$store.dispatch('setModuleInfo', resData)
    },
    aboutMeChange () {
      let self = this;
      self.IsAboutMeShow = true
      self.IsSmTitleShow = true
      if (self.sideBarState.IsAboutMeShow) {

      }
      self.sideBarState.IsAboutMeShow = !self.sideBarState.IsAboutMeShow;
      self.$store.dispatch('setSideBarState', self.sideBarState)
    },
    handleSelect (key, keyPath) {
      let self = this;
      let menuName = ''
      self.sideBarState.state = key;
      self.$store.dispatch('setSideBarState', self.sideBarState)
      if (key == 1) { //通信
        menuName = self.moduleInfo[key - 1].childMenu[0].menu_name
        self.$store.dispatch('setHeaderTitle', '通信')
      } else if (key == 2) { //应用
        menuName = self.moduleInfo[key - 1].childMenu[0].menu_name
        self.$store.dispatch('setHeaderTitle', '应用')
      } else if (key == 3) { //智能
        menuName = self.moduleInfo[key - 1].childMenu[0].childMenu[0].menu_name
        self.$store.dispatch('setHeaderTitle', '智能')
      }
      console.log(self.pathList)
      self.pathList.forEach(item => {
        if (key == item.id) {
          let data = self.moduleInfo[key - 1].childMenu[0]
          console.log('sssssssssssssssss')
          self.$store.dispatch('setHeaderTitle', menuName)
          self.$store.dispatch('setCurrentModule', data)
          // self.$router.push(item.path)
          console.log(menuName)
          if (self.userType.length == 0) {
            self.$router.push({
    	        path: '/iframe?',
    	        query: {
    	          url: '公众会员-' + menuName
    	        }
    	      })
          } else {
            if (key == 2) {
              self.$router.push({
                path: item.path,
                query: {
                  id: data.id
                }
              })
            } else {
              self.$router.push({
      	        path: '/iframe?',
      	        query: {
      	          url: (self.currentRole.roleName || self.currentRole.role_name) + '-' + menuName
      	        }
      	      })
            }
          }
        }
      })
    }
	}
}
</script>
<style lang="scss" scoped>
	.slidebar {
    width: 260px;
    height: 100vh;
		float: left;
		display: block;
    white-space: nowrap;
    .slide-bar-header{
      height: 200px;
      color: #fff;
      background: #005ACE;
      box-sizing: border-box;
      .slide-line{
        padding-top: 44px;
        margin-bottom: 20px;
        box-sizing: border-box;
        .s-head-img{
          width: 62px;
          height: 62px;
          border-radius: 8px;
        }
        .m-wrap{
          height: 55px;
        }
      }
    }
    .name-l{
      float: left;
      .name-t{
        font-size: 20px;
        color: #fff;
      }
      .name-ai{
        font-size: 14px;
        line-height: 28px;
      }
    }
    .name-r{
      float:right;
      margin-top: 35px;
      i{
        font-size: 20px;
        cursor: pointer;
      }
    }
    .slide-bar-main{
      position: relative;
      height: calc(100% - 200px);
      border-right: 1px solid #A3A3A3;
      border-left: 1px solid #A3A3A3;
      box-sizing: border-box;
      background: #FFF;
      .side-bottom-box{
        position: absolute;
        bottom: 0;
        left: 0;
        background: #eee;
        .el-menu-demo{
          // display: grid;
          // grid-template-columns: repeat(3, 86px);
          // grid-template-rows: repeat(1, 60px);
          width: 258px;
          text-align: center;
          .el-menu-demo-list{
            width: 33.33%;
          }
        }
      }
    }
  }
  .fade-center{
    animation: bounce-out .5s;
  }
  @keyframes bounce-out {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 0.1;
    }
    20% {
      opacity: 0.2;
    }
    30% {
      opacity: 0.3;
    }
    40% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.5;
    }
    60% {
      opacity: 0.6;
    }
    70% {
      opacity: 0.7;
    }
    80% {
      opacity: 0.8;
    }
    90% {
      opacity: 0.9;
    }
    100% {
      opacity: 1;
    }
  }
</style>