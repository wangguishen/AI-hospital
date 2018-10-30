<template>
  <div class="holding">
    <el-tabs class="nav" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane class="lately" label="最近用过的" name="first">
        <div class="lately-t">
          <em>AI医院</em>
          <em>翌歌影像</em>
        </div>
        <ul v-if="!nohistory">
          <li v-for="(allhistory , index) in allhistorys" :key="index" @click="gotoapplication(allhistory, index)">
            <div class="logoicon"><img :src="allhistory.img_url | imgUrl" alt=""></div>
            <div class="logoname">{{allhistory.menu_name}}</div>
            <span class="collection">
              <i v-bind:class="[allhistory.collected ? collecnew : collections]" 
                @click.stop="fccollection(allhistory.collected, allhistory.menu_code, allhistory.parent_code,
                  allhistory.org_code, allhistory.status, index)" class="el-icon-star-on"></i>
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
          <li v-for="(allcollection , index) in allcollections" :key="index" @click="gotoapplication(allcollection, index)">
            <div class="logoicon"><img :src="allcollection.img_url | imgUrl" alt=""></div>
            <div class="logoname">{{allcollection.menu_name}}</div>
            <span class="collection">
              <i v-bind:class="[allcollection.collected ? collecnew : collections]" 
                @click.stop="fccollection(allcollection.collected, allcollection.menu_code,
                  allcollection.parent_code,allcollection.org_code,allcollection.type,index)" class="el-icon-star-on"></i>
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
        <ul>
          <li v-for="(allorganize , index) in allorganizes" :key="index" @click="gotoapplication(allorganize, index)">
            <div class="logoicon"><img :src="allorganize.img_url | imgUrl" alt=""></div>
            <div class="logoname">{{allorganize.menu_name}}</div>
            <span class="collection">
              <i v-bind:class="[allorganize.collected ? collecnew : collections]" 
                @click.stop="fccollection(allorganize.collected, allorganize.menu_code, allorganize.parent_code, 
                  allorganize.comp_code, allorganize.type, index)" class="el-icon-star-on"></i>
            </span>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getCollections, getHistorys, operation,getsaveHistory } from "@/service/axios";
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
      allorganizes: [] //组织列表
    };
  },
  computed: {
    userBC: function () { //获取用户类型
      return this.$store.getters.getUserBC;
		},
    vuexuserInfo: function() {
      return this.$store.getters.getUserInfo;
    },
    vuexcurrentRole: function() {
      return this.$store.getters.getCurrentRole;
    },
    vuexmoduleInfo: function() {
      return this.$store.getters.getModuleInfo;
    }
  },
  created() {
    let self = this;
    console.log('s0s0s0',self.userType)
    if (self.userBC == 'C') {
      self.currentRole = '100'
    } else {
      self.currentRole = self.vuexcurrentRole.type;
    }
    console.log('currentRole', self.currentRole)
    self.getorganize()
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
        type: "1",
        env: this.COLLEC_ENV,
        verNo: this.VER_NO
      };
      let ftxgethistors = await getHistorys(historyData);
      if (ftxgethistors.data.code == 1 && ftxgethistors.data.data != null) {
        self.allhistorys = []
        historyrep = ftxgethistors.data.data;
        //收藏去重
        for (var j = 0; j < historyrep.length; j++) {
          if (!historyboj[historyrep[j].menu_code]) {
            self.allhistorys.push(historyrep[j]);
            historyboj[historyrep[j].menu_code] = true;
          }
        }
      } else {
        self.nohistory = true;
      }
      self.getCollectionsway()
    },
    async getCollectionsway() {
      //查询收藏
      let self = this;
      let collData = {
        userId: self.userId,
        role_code: self.currentRole,
        type: "1",
        env: this.COLLEC_ENV,
        verNo: this.VER_NO
      };
      let repeats = [];
      let getcollectdatas = await getCollections(collData);
      if (getcollectdatas.data.code == 1 && getcollectdatas.data.data != null) {
        repeats = getcollectdatas.data.data;
        self.allcollections = []
        let repeatsobj = {};
        //收藏去重
        for (var j = 0; j < repeats.length; j++) {
          if (!repeatsobj[repeats[j].menu_code]) {
            self.allcollections.push(repeats[j]);
            repeatsobj[repeats[j].menu_code] = true;
          }
        }
        // for (let o = 0; o < self.allorganizes.length; o++) {
        //   for (let s = 0; s < repeats.length; s++) {
        //     if(self.allorganizes[o].menu_code == repeats[s].menu_code){
        //       self.allorganizes[o].collected = true;
        //     }
        //   }
        // }
      } else {
        self.nocollec = true;
      }
    },
    getorganize() {
      //查询企业组织
      let self = this;
      let company = self.vuexmoduleInfo[2];
      //获取用户中心登录hasPower为1的公司列表
      if (company.childMenu != null) {
        self.allorganizes = company.childMenu;
      }
      self.getHistory();
    },
    //点击收藏切换
    async fccollection(collected, menucode, parentcode, orgcode, type, index) {
      let self = this;
      let operationdata = {
        userId: self.userId,
        menu_code: menucode,
        parent_code: parentcode,
        org_code: orgcode,
        role_code: self.currentRole,
        type: "1",
        status: "0",
        env: this.COLLEC_ENV,
        verNo: this.VER_NO
      };
      if (collected) {
        operationdata.status = '0';
        let nocollects = await operation(operationdata);
        if (nocollects.data.code == 1) {
          self.allhistorys.map(function(hissitem, indexhist) {
            //取消收藏后 查看最近历史状态
            if (hissitem.menu_code == menucode) {
              hissitem.collected = false;
            }
          });
          self.allcollections.map(function(hissitem, indexhist, arr) {
            if (hissitem.menu_code == menucode) {
              arr.splice(indexhist, 1);
            }
          });
          if (self.allcollections.length == 0) {
            self.nocollec = true;
          }
          self.allorganizes.map(function(hissitem, indexhist) {
            //取消收藏后 组织状态状态
            if (hissitem.menu_code == menucode) {
              hissitem.collected = false;
            }
          });
          self.vuexmoduleInfo[2].childMenu[index].collected = false;
          self.$store.dispatch("setModuleInfo", self.vuexmoduleInfo)
        }
      } else {
        operationdata.status = '1';
        let collects = await operation(operationdata);
        let collarr = {};
        if (collects.data.code == 1) {
          self.nocollec = false;
          self.allhistorys.map(function(hissitem, indexhist) {
            //收藏成功 查看最近历史状态
            if (hissitem.menu_code == menucode) {
              hissitem.collected = true;
              collarr = hissitem;
            }
          });
          self.allorganizes.map(function(hissitem, indexhist) {
            //收藏成功 组织状态状态
            if (hissitem.menu_code == menucode) {
              hissitem.collected = true;
              collarr = hissitem;
              collarr.org_code = hissitem.comp_code;
              collarr.org_name = hissitem.comp_name;
            }
          });
          self.allcollections.push(collarr);
          self.vuexmoduleInfo[2].childMenu[index].collected = true;
          self.$store.dispatch("setModuleInfo", self.vuexmoduleInfo)
        }
      }
    },
    async gotoapplication(value, index) {
      console.log("智能模块", value, index)
      if (value.hasOwnProperty('childMenu')) {
          this.$store.dispatch("setCurrentModule", value)
      } else {
        this.allorganizes.forEach(item => {
          if (item.menu_code == value.menu_code) {
            this.$store.dispatch("setCurrentModule", item)
          }
        })
      }
      // this.$store.dispatch("setCurrentModule", value)
      this.$store.dispatch("setHeaderTitle", '智能')
      let operationdata = {
        userId: this.userId,
        menu_code: value.menu_code,
        parent_code: value.parent_code,
        role_code: this.currentRole,
        type: "1",
        status: "0",
        env: this.COLLEC_ENV,
        verNo: this.VER_NO
      };
      let resData = await getsaveHistory(operationdata)
      this.getHistory()
      let url = this.$store.getters.getCurrentRole.role_name + '-' + this.$store.getters.getCurrentModule.childMenu[0].menu_name
      console.log(url)
      this.$router.push({
				path: '/iframe',
				query: {
					url: url
				}
			})
    }
  },
	filters: {
    imgUrl: function (value) {
      let img = ''
      if (value) {
        let val = value.split('/')[0]
        if (val == 'static') {
          img = value
        } else {
          img = starttestaddress + value
        }
      } else {
        img = "static/images/icon/zz-default.png"
      }
      
      return img
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
        padding-bottom: 2px;
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
          width: 28px;
          height: 7px;
          padding-left: 20px;
          padding-right: 18px;
          float: left;
          img {
            width: 16px;
          }
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
  }
}
</style>