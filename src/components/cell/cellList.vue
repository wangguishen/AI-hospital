<template>
	<div
    class="g-title-box"
    :class="{
      'g-border-top': borderTop,
      'g-border-bottom': borderBottom,
      'g-border-upDown': borderUpDown,
      'g-border-all': borderAll,
      'g-select-color': data.upDownShow
    }">
    <div @click="changeList(data)">
      <!-- <router-link to="/application"> -->
        <el-row class="g-title">
    		  <el-col :span="4">
    				<div class="g-title">
    					<img :src="(data[defalutKey.img] || data.img) | imgUrl" alt="">
    				</div>
    			</el-col>
    		  <el-col :span="14">
    				<div class="g-title s-title-main">
    					{{data[defalutKey.name] || data.name}}
    				</div>
    			</el-col>
    		  <el-col :span="6">
    				<div class="g-title s-title-right" v-if="data.childMenu">
              <template v-if="data.upDownShow">
                <i class="el-icon-caret-top"></i>
              </template>
              <template v-else>
                <i class="el-icon-caret-bottom"></i>
              </template>
    				</div>
    			</el-col>
    		</el-row>
      <!-- </router-link> -->
    </div>
    <template v-if="data.childMenu">
      <el-row v-show="data.upDownShow" style="position: relative;z-index: -10;">
  		  <el-col :span="4">
  				<div class="g-title g-min-height"></div>
  			</el-col>
  		  <el-col :span="14">
  				<div v-for="item of data.childMenu" :key="item.id" class="c-item-box">
            <div @click="submenu(item)">{{item.menu_name}}</div>
            <!-- <template v-if="item.url">
              <router-link :to="'/iframe?url=' + roleName + '-' + item.menu_name">{{item.menu_name}}</router-link>
            </template>
            <template v-else>
              {{item.menu_name}}
            </template> -->
          </div>
  			</el-col>
  		</el-row>
    </template>
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
    borderAll: Boolean
  },
	methods: {
    changeList (item) {
      let self = this;
      console.log(123)
      item.upDownShow = !item.upDownShow
      self.$emit('selectRadio', item)
    },
    submenu (item) {
      console.log(456)
      this.$emit('submenu', item, this.data)
    }
  },
  filters: {
    imgUrl: function (value) {
      return starttestaddress + value
    }
  }
}
</script>
<style lang="scss" scoped>
	.g-title-box{
    position: relative;
    z-index: 10;
    padding: 25px;
    font-size: 14px;
    // border-bottom: 2px solid #EAEAEA;
    cursor: pointer;
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
      font-size: 21px;
      cursor: pointer;
      color: #979797;
		}
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
  .g-select-color{
    color: #306FF0;
    // padding-bottom: 5px;
  }
  .g-min-height{
    min-height: 1px;
  }
  .c-item-box{
    font-size: 14px;
    color: #666;
    line-height: 25px;
  }
  .router-link-active{
    color: #306FF0;
  }
</style>