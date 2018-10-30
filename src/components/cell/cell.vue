<template>
  <div>
    <div v-if="path" @click="storeInfo(data)">
		  <router-link :to="path">
        <div class="g-title-box"
          :class="{
            'g-border-top': borderTop,
            'g-border-bottom': borderBottom,
            'g-border-upDown': borderUpDown,
            'g-border-all': borderAll,
            'g-title-box-link': path,
            'g-select-color':selectColor
          }">
          <el-row class="g-title">
      		  <el-col :span="4">
      				<div class="g-title">
                <!-- {{defalutKey ? data[defalutKey.img] : data.img}} -->
      					<img :src="(defalutKey ? data[defalutKey.img] : data.img) | imgUrl" alt="">
      				</div>
      			</el-col>
      		  <el-col :span="14">
      				<div class="g-title s-title-main">
                {{defalutKey ? data[defalutKey.name] : data.name}}
      				</div>
      			</el-col>
      		  <el-col :span="6" v-show="isLink">
      				<div class="g-title s-title-right">
      					<i class="el-icon-arrow-right"></i>
      				</div>
      			</el-col>
      		</el-row>
        </div>
      </router-link>
    </div>
    <div v-else>
      <div class="g-title-box"
        :class="{
          'g-border-top': borderTop,
          'g-border-bottom': borderBottom,
          'g-border-upDown': borderUpDown,
          'g-border-all': borderAll,
          'g-title-box-link': cursor,
          'g-select-color':selectColor
        }"
        @click="fullUp">
        <el-row class="g-title">
    		  <el-col :span="4">
    				<div class="g-title">
              <!-- {{defalutKey ? data[defalutKey.img] : data.img}} -->
    					<img :src="(defalutKey ? data[defalutKey.img] : data.img) | imgUrl" alt="">
    				</div>
    			</el-col>
    		  <el-col :span="14">
    				<div class="g-title s-title-main">
              <div>{{defalutKey ? data[defalutKey.name] : data.name}}</div>
    				</div>
    			</el-col>
    		  <el-col :span="6" v-show="isLink">
    				<div class="g-title s-title-right">
    					<i class="el-icon-arrow-right"></i>
    				</div>
    			</el-col>
    		</el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: Object,
    isLink: Boolean,
    defalutKey: Object,
    borderTop: Boolean,
    borderBottom: Boolean,
    borderUpDown: Boolean,
    borderAll: Boolean,
    path: String,
    isApply: Boolean,
    cursor: Boolean,
    selectColor: Boolean
  },
	data () {
		return {
			
		}
	},
	mounted () {
		
	},
	methods: {
    fullUp () {
      this.$emit('fullUp', this.data)
    },
    storeInfo (msg) {
      let self = this;
      let roleName = self.defalutKey ? msg[self.defalutKey.name] : msg.name
      if (msg.hasOwnProperty('comp_name')) {
        self.$store.dispatch('setHeaderTitle', '通信')
      } else if (msg.hasOwnProperty('roleCode')) {
        self.$store.dispatch('setHeaderTitle', '应用')
      } else if (msg.hasOwnProperty('menu_code')) {
        self.$store.dispatch('setHeaderTitle', '智能')
      }
      // self.$store.dispatch('setHeaderTitle', roleName)
      if (self.isApply) {
        self.$emit('storeInfo', msg)
      }
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
}
</script>
<style lang="scss" scoped>
	.g-title-box{
    padding: 25px;
    padding-right: 28px;
    font-size: 14px;
    // border-bottom: 2px solid #EAEAEA;
    cursor: default;
		box-sizing: border-box;
		.g-title{
			display: flex;
      align-items: center;
      img{
        width: 16px;
      }
		}
		.s-title-main{
			letter-spacing: 1px;
		}
		.s-title-right{
			justify-content: flex-end;
		}
  }
  .g-title-box-link{
    cursor: pointer;
  }
  .g-border-top{
    border-top: 2px solid #EAEAEA;
  }
  .g-border-bottom{
    border-bottom: 2px solid #EAEAEA;
  }
  .g-border-upDown{
    border-top: 2px solid #EAEAEA;
    border-bottom: 2px solid #EAEAEA;
  }
  .g-border-all{
    border: 2px solid #EAEAEA;
  }
  .g-padding-all{
    padding: 25px;
  }
  // .g-padding-noBottom{
  //   padding: 25px 25px 0 25px;
  // }
  .g-min-height{
    min-height: 1px;
  }
  .c-item-box{
    font-size: 14px;
    color: #666;
  }
  .router-link-active, .g-select-color{
    color: #306FF0;
  }
</style>