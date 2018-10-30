<template>
  <div class="main">
    <div class="mainbox">
      <el-row :gutter="6">
        <template v-if="currentApplyModule">
          <el-col :span="8" v-for="(work,index) in currentApplyModule.childMenu" :key="index">
            <div class="grid-content bg-purple" @click="jumpdetail(work)">
              <div
                v-bind:class='(work.menu_code == "SUANFAGUANLI" || work.menu_code == "JIEZHENGUANLIYS" || work.menu_code == "JIEZHENGUANLIJS") ? "apply-active" : "apply-no"'></div>
              <div class="children-box">
                <div class="childrenxiaotubiao">
                  <!-- work.img_url | imgUrl  static/images/modulesPlace/OA.png-->
                  <img :src="work.img_url | imgUrl" alt="..">
                </div>
                <div class="childrentemptxt">
                  <span class="titneme">{{work.menu_name}}</span>
                </div>
              </div>
                
            </div>
          </el-col>
        </template>
      </el-row>
    </div>
  </div>
</template>
<script>
//import { storage } from "./js/public";
import { indexAuthEntrys } from "@/service/axios.js";
import { getLocalStorage } from "@/util/storageUtil.js";
export default {
  data() {
    return {
      branch: 0,
      works: [],
      commerces: [],
      bigdatas: [],
      ds: "kd",
      administrative: [], //
    };
  },
  computed:{
		currentModule: function () { //获取当前菜单模块
      return this.$store.getters.getCurrentModule;
    },
    currentApplyModule: function () { //获取当前菜单模块
      return this.$store.getters.getCurrentApplyModule;
		}
	},
  mounted() {
    let self = this;
    let jsonResult = modulesAuth; //获取应用页面配置
    jsonResult.map(function(item, index, arr) {
      if (item.sign == "work") {
        self.works.push(item);
      } else if (item.sign == "commerce") {
        self.commerces.push(item);
      } else if (item.sign == "bigdata") {
        self.bigdatas.push(item);
      }
    });
    console.log("获取应用页面配置", jsonResult);
    self.branch = self.$route.query.id
  },
  watch: {
    '$route': {
      handler: function (val, old) {
        let self = this;
        self.branch = val.query.id
      },
      deep: true
    }
  },
  methods: {
    //统一弹出框
    Alert(messages) {
      this.$message({
        message: messages,
        center: true,
        duration: 2000,
        type: "error"
      });
    },
    jumpdetail (data) {
      let self = this;
      console.log(data.menu_code)
      if (data.menu_code == "SUANFAGUANLI" || data.menu_code == "JIEZHENGUANLIYS" || data.menu_code == "JIEZHENGUANLIJS") {
        self.$store.dispatch('setHeaderTitle', data.menu_name)
        self.$router.push({
	        path: '/iframe?',
	        query: {
	          url: (self.$store.getters.getCurrentRole.roleName || self.$store.getters.getCurrentRole.role_name) + '-' + data.menu_name
	        }
	      })
      }
    }
  },
  filters: {
    imgUrl: function (value) {
      return starttestaddress + value
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  .mainbox {
    margin: 24px 20px;
    .titname {
      margin-bottom: 24px;
      line-height: 22px;
      font-size: 16px;
      color: #2d3135;
    }
    .el-col {
      border-radius: 4px;
      text-align: center;
      .children-box{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -22px;
        margin-top: -35px;
      }
      .childrentemptxt {
        // margin-top: 10px;
        // font-size: 26px;
        span {
          display: block;
          font-size: 16px;
          color: #2d3135;
        }
        p {
          color: #a9a9a9;
          font-size: 12px;
          margin-top: 9px;
          /* margin-bottom: 50px; */
        }
      }
    }
    .apply-no{
      width: 11px;
      height: 11px;
    }
    .apply-active{
      float: right;
      width: 11px;
      height: 11px;
      background: url('../../../static/images/icon/apply-active.png');
    }
    .bg-purple {
      background: #fff;
      cursor: pointer;
    }
    .grid-content {
      // min-height: 188px;
      height: 0;
      padding-bottom: 64.7%;
      position: relative;
    }
  }
}
</style>