<template>
  <div class="holding">
    <el-tabs class="nav" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane class="lately" label="最近用过的" name="first">
        <div class="lately-t">
          <em>AI医院</em>
          <em>翌歌影像</em>
        </div>
        <ul v-if="!nohistory">
          <li v-for="(allhistory , index) in allhistorys" :key="index" @click="gotoapplication(allhistory, index, 0)">
            <div class="logoicon"><img src="static/images/icon/zz-default.png" alt=""></div>
            <div class="logoname">{{allhistory.org_name}}-{{allhistory.role_name}}</div>
            <span class="collection">
              <i v-bind:class="[allhistory.collected ? collecnew : collections]"
                @click.stop="fccollection(allhistory.collected,allhistory.menu_code,allhistory.parent_code,
                  allhistory.org_code,allhistory.role_code,index)" class="el-icon-star-on"></i>
            </span>
          </li>
        </ul>
        <!-- <p v-else class="nocollec">暂无记录</p> -->
      </el-tab-pane>
      <el-tab-pane class="lately" label="收藏" name="second">
        <div class="lately-t">
          <em>AI医院</em>
          <em>翌歌影像</em>
        </div>
        <ul v-if="!nocollec">
          <li v-for="(allcollection , index) in allcollections" :key="index" @click="gotoapplication(allcollection, index, 0)">
            <div class="logoicon"><img src="static/images/icon/zz-default.png" alt=""></div>
            <div class="logoname">{{allcollection.org_name}}-{{allcollection.role_name}}</div>
            <span class="collection">
              <i v-bind:class="[allcollection.collected ? collecnew : collections]"
                @click.stop="fccollection(allcollection.collected, allcollection.menu_code, allcollection.parent_code,
                  allcollection.org_code, allcollection.role_code, index)" class="el-icon-star-on"></i>
            </span>
          </li>
        </ul>
        <!-- <p v-else class="nocollec">暂无收藏</p> -->
      </el-tab-pane>
      <el-tab-pane class="lately" label="全部" name="third">
        <div class="lately-t">
          <em>AI医院</em>
          <em>翌歌影像</em>
        </div>
        <template v-for="(allorganize, index) in allorganizes">
          <el-row class="g-zz-row" v-bind:class="[index !== checkIndex ? 'g-bb' : '']">
            <el-col :span="20">
              <div class="logoicon">
                <img src="static/images/icon/zz-default.png" alt="" class="g-logoimg">
                <span class="logoname">{{allorganize.comp_name}}</span>
              </div>
            </el-col>
            <el-col :span="4" class="tr">
              <template v-if="index === checkIndex">
                <i class="el-icon-caret-top" :class="{'sm-title-icon': index === checkIndex}"
                  @click.stop="queryAuthority(allorganize, index)"></i>
              </template>
              <template v-else>
                <i class="el-icon-caret-bottom" :class="{'sml-title-icon': allorganize.isFirst}"
                  @click.stop="queryAuthority(allorganize, index)"></i>
              </template>
            </el-col>
          </el-row>
          <div v-bind:class="[index === checkIndex ? 'g-bb' : '']">
            <template v-for="(roleItem, index1) in roleList">
              <el-row class="g-js-row" v-show="index === checkIndex">
                <el-col :span="8">
                  <span class="cursor-pointer g-pl" @click="gotoapplication(allorganize, index, 2, roleItem)">{{roleItem.role_name}}</span>
                </el-col>
                <el-col :span="16" class="tr">
                  <span class="collection">
                    <i v-bind:class="[roleItem.collected ? collecnew : collections]" 
                      @click.stop="fccollection(roleItem.collected, allorganize.menu_code, allorganize.comp_parent_code,
                    allorganize.comp_code, roleItem.type, index)" class="el-icon-star-on"></i>
                  </span>
                </el-col>
              </el-row>
            </template>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getCollectionsAndRole, getHistorysAndRole, operation,getsaveHistory, getRoleCollections } from "@/service/axios"
import { getLocalStorage } from '@/util/storageUtil'
export default {
  data() {
    return {
      activeName: "third",
      collections: "collections",
      collecnew: "collecnew",
      currentRole: "", //角色
      nohistory: false, //判断是否有历史记录
      nocollec: false, //判断是否有收藏
      allhistorys: [], //历史记录列表
      allcollections: [], //收藏列表
      userId: "", //用户userId
      organizes: [], //从用户中心登录获取的公司列表
      allorganizes: [], //组织列表
      sessionId: '',
      enterpriseCode: '',
      roleList: [], //角色列表 
      test: false,
      checkIndex: -1,
      isFirst: false
    };
  },
  computed: {
    vuexuserInfo: function() {
      return this.$store.getters.getUserInfo;
    },
    vuexcurrentRole: function() {
      return this.$store.getters.getCurrentRole;
    },
    userType: function () { //获取用户类型
      return this.$store.getters.getUserType;
		}
  },
  created() {
    let self = this;
    self.currentRole = self.vuexcurrentRole.type;
    console.log("当前角色", self.currentRole)
    let xpuserdata = getLocalStorage('xpuserdata', 'json')
    self.sessionId = xpuserdata ? xpuserdata.user.sessionId : ''
    self.getHistory();
    self.getCollectionsway();
    self.$nextTick(() => {
      self.getorganize(); //执行 查找全部组织方法
    })
  },
  methods: {
    handleClick(tab, event) {},
    async getHistory() {
      //获取最近用过的记录
      let self = this;
      let historyrep = [];
      let historyboj = {}; //去重使用函数
      self.userId = self.vuexuserInfo.user.userId;
      let historyData = {
        role_code: self.currentRole,
        userId: self.userId,
        type: "2"
      };
      let ftxgethistors = await getHistorysAndRole(historyData);
      if (ftxgethistors.data.code == 1 && ftxgethistors.data.data != null) {
        self.allhistorys = ftxgethistors.data.data
        console.log("最近用过的", self.allhistorys)
      } else {
        self.nohistory = true
      }
    },
    async getCollectionsway() {
      //查询收藏
      let self = this;
      let collData = {
        userId: self.userId,
        role_code: self.vuexcurrentRole.roleCode,
        type: "2"
      };
      let repeats = [];
      let getcollectdatas = await getCollectionsAndRole(collData);
      if (getcollectdatas.data.code == 1 && getcollectdatas.data.data != null) {
        self.allcollections = getcollectdatas.data.data
        console.log("已收藏的", self.allcollections)
      } else {
        self.nocollec = true;
      }
    },
    getorganize() {
      //查询企业组织
      let self = this;
      let company = self.vuexuserInfo.dataPower.enterprise;
      //获取用户中心登录hasPower为1的公司列表
      if (company.companyChildren != null) {
        company.companyChildren.map(function(item, index, arr) {
          if (item.hasPower == 1) {
            self.$set(item, 'isFirst', false)
            self.allorganizes.push(item);
          }
        });
        // self.allorganizes = self.$store.getters.getUserType
      }
      if (company.company.hasPower == 1) {
        self.allorganizes.push(company.company);
      }
      self.allorganizes.map(function(company, indexcompany) {
        company.collected = false;
      });
      self.allorganizes.map(function(company, indexcompany) {
        self.allcollections.map(function(collectitem, index, arr) {
          if (company.comp_code == collectitem.org_code) {
            company.collected = collectitem.collected;
          }
        });
      });
      console.log("组织列表", self.allorganizes)
    },
    //点击收藏切换
    async fccollection (collected, menucode, parentcode, orgcode, roleCode, index) {
      console.log("点击收藏切换", collected, menucode, parentcode, orgcode, roleCode, index)
      let self = this
      let operationdata = {
        userId: self.userId,
        menu_code: menucode,
        parent_code: parentcode,
        org_code: orgcode,
        role_code: roleCode,
        type: "2",
        status: "0"
      };
      if (collected) {
        operationdata.status = '0';
        let nocollects = await operation(operationdata);
        if (nocollects.data.code == 1) {
          if (self.allcollections.length == 0) {
            self.nocollec = true;
          }

          //收藏
          self.allcollections.forEach((item, index) => {
            if (orgcode === item.org_code && roleCode === item.role_code) {
              self.allcollections.splice(index, 1)  
            }
          })

          //最近用过的
          self.allhistorys.forEach((item, index) => {
            if (orgcode === item.org_code && roleCode === item.role_code) {
              item.collected = !item.collected  
            }
          })

          //全部的
          self.allorganizes.forEach((item, index) => {
            if (item.comp_code === orgcode) {
              self.roleList.forEach((item1, index1) => {
                if (item1.type == roleCode) {
                  item1.collected = !item1.collected
                }
              })
            }
          })
        }
      } else {
        operationdata.status = '1';
        let collects = await operation(operationdata);
        let collarr = {};
        if (collects.data.code == 1) {
          self.nocollec = false;
          //最近用过的
          self.allhistorys.forEach((item, index) => {
            if (orgcode === item.org_code && roleCode === item.role_code) {
              item.collected = !item.collected  
            }
          })

          //全部的
          self.allorganizes.forEach((item, index) => {
            if (item.comp_code === orgcode) {
              self.roleList.forEach((item1, index1) => {
                if (item1.type == roleCode) {
                  item1.collected = !item1.collected
                }
              })
            }
          })

          //收藏的查询
          self.allcollections = []
          self.getCollectionsway()
        }
      }
    },
    async gotoapplication (value, index, key, roleItem) {
      console.log("go to application", value, index, key, roleItem)
      let self = this;
      let roleObj = {}
      if (key == 0) {
        // comp_code   role_code type
        console.log('aaa',self.allorganizes)
        self.allorganizes.forEach(item => {
          if (item.comp_code == value.org_code) {
            self.$store.dispatch("setCurrentOrganization", item)
            roleObj = {
              type: value.role_code,
              role_name: value.role_name,
            }
            console.log("sdfasdfffffff",item)
            self.$store.dispatch("setCurrentRole", roleObj)
          }
        })
        
      } else if (key == 1) {

      } else if (key == 2) {
        self.$store.dispatch("setCurrentOrganization", value)
        self.$store.dispatch("setCurrentRole", roleItem)
      }
      /* self.$store.dispatch("setCurrentRole", value) */
      console.log('ssdfasdf',value)
      self.$store.dispatch('setHeaderTitle', '通信')
      let operationdata = {
        userId: this.userId,
        role_code: value.role_code || roleItem.type,
        type: "2",
        status: "1",
        org_code: value.org_code || value.comp_code
      };
      let resData = await getsaveHistory(operationdata)
      self.$nextTick(() => {
        this.getHistory()
        this.$router.push('/iframe')
      })
    },
    async getRoleCollections () {  //查询角色列表
      let params = {
        sessionId: this.sessionId,
        enterpriseCode: this.enterpriseCode,
        type: '2'
      }
      let resData = await getRoleCollections(params)
      console.log("查询角色成功", resData)
      if (resData.status === 200 && resData.data.code === 1) {
        this.roleList = resData.data.data
      }
    },
    queryAuthority (value, index) {
      value.isFirst = true
      this.checkIndex = this.checkIndex === index ? -1 : index
      this.enterpriseCode = value.comp_code
      this.getRoleCollections()
    }
  }
};
</script>
<style lang="less" scoped>
.holding {
  width: 100%;
  .lately {
    .lately-t {
      height: 57px;
      padding-left: 20px;
      background-color: rgb(245, 245, 245);
      em {
        // padding-bottom: 2px;
        display: block;
        font-style: oblique;
        color: #a9a9a9;
      }
    }
    ul {
      li {
        height: 44px;
        padding-top: 26px;
        border-bottom: 2px solid #f5f5f5;
        background-color: #fff;
        cursor: pointer;
        .logoicon {
          height: 7px;
          padding-left: 20px;
          padding-right: 18px;
          float: left;
        }
        .logoname {
          font-size: 14px;
          float: left;
        }
        .collections {
          width: 20px;
          height: 20px;
          float: right;
          margin-top: -5px;
          margin-right: 30px;
          font-size: 20px;
          color: #808080;
          cursor: pointer;
        }
        .collecnew {
          width: 20px;
          height: 20px;
          float: right;
          margin-top: -5px;
          margin-right: 30px;
          font-size: 20px;
          color: #306ff0;
          cursor: pointer;
        }
      }
    }
    .nocollec {
      text-align: center;
      font-size: 18px;
    }
    .el-icon-caret-bottom, .el-icon-caret-top {
      font-size: 21px;
      cursor: pointer;
      color: #979797;
    }
    .g-zz-row {
      padding-left:20px;
      padding-right:40px;
      height: 72px;
      line-height: 72px;
      background: #fff;
      font-size: 14px;
      /* border-bottom: 2px solid #f5f5f5; */
    }
    .g-js-row {
      padding-left:30px;
      padding-right:40px;
      line-height: 25px;
      height: 40px;
      font-size: 13px;
      background: #fff;
    }
    .collections {
      width: 20px;
      height: 20px;
      font-size: 20px;
      color: #808080;
      cursor: pointer;
    }
    .collecnew {
      width: 20px;
      height: 20px;
      font-size: 20px;
      color: #306ff0;
      cursor: pointer;
    }
    .g-bb {
      border-bottom: 2px solid #f5f5f5;
    }
    .g-logoimg {
      padding-right:18px;
      vertical-align: middle;
    }
    .tr {
      text-align: right;
    }
    .cursor-pointer {
      cursor: pointer;
    }
    .g-pl {
      padding-left: 28px;
    }
  }
}
</style>