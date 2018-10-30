<template>
  <div class="roleswitchin">
    <div class="rolelist">
      <div class="rolelist-t">
        <em>AI医院</em>
        <em>翌歌影像</em>
      </div>
      <ul>
        <li v-for="(coldata , index) in coldatas" :key="index" v-show="coldata.role_name != '公众用户'">
          <div class="logoicon"><img v-bind:src="coldata.img_url | logoImage" alt=""></div>
          <div class="rolename">{{coldata.menu_name}}</div>
          <el-switch class="choicerole" v-model="coldata.status" :disabled="coldata.status"
            @change="choicerole(coldata.status,index)" active-color="#BCD1FE" inactive-color="#D9D9D9">
          </el-switch>
        </li>
      </ul>
    </div>
  </div>  
</template>
<script>
import { roles } from "@/service/axios"
import { userFilter } from '@/util/utils.js'

export default {
  data() {
    return {
      activeName: "first",
      collections: "collections",
      collecnew: "collecnew",
      value2: '',
      coldatas: []
    };
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.coldatas = this.$store.getters.getModuleInfo[1].childMenu
      let currentApplyModule = this.$store.getters.getCurrentApplyModule
      this.coldatas.forEach((item, index) => {
        this.$set(item, 'status', item.menu_code === currentApplyModule.menu_code)
      })
      console.log('--',this.coldatas)
    },
    //点击收藏切换
    choicerole(status, index) {
      let date = {}
      this.coldatas.forEach((item, j) => {
        this.$set(item, 'status', j === index)
        if (item.status) {
          date = item
          this.$store.dispatch('setCurrentApplyModule', item)
          this.$store.dispatch('setHeaderTitle', item.menu_name)
        }
      })
      this.$nextTick(() => {
        this.$router.push({
  				path: '/application',
  				query: {
  					id: date.id
  				}
  			})
      })
    }
  },
  filters:{
    'logoImage': value => {
      return value ? starttestaddress + value : 'static/images/icon/all-images.png'
    }
  }
};
</script>
<style lang="less" scoped>
.roleswitchin {
  width: 100%;
  .rolelist {
    .rolelist-t {
      height: 57px;
      padding-top: 16px;
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
        .rolename {
          font-size: 14px;
          float: left;
        }
        .choicerole {
          float: right;
          margin-top: -5px;
          margin-right: 30px;
        }
      }
    }
  }
}
</style>