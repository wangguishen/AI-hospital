<template>
	<div class="wrapper">
    <el-container>
      <el-aside :width="asideWidth" refs="aside" class="aside" :class="{'mymove':isOne, 'myleave':isTwo}">
        <v-side-bar></v-side-bar>
      </el-aside>
      <el-container>
        <el-header height="80px" :class="{'headermove':isOne, 'headerleave':isTwo}">
          <v-side-header></v-side-header>
        </el-header>
        <el-main :style="{paddingRight: padRight}" :class="{'headermove':isOne, 'headerleave':isTwo}">
          <transition name="move" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import VSideBar from '@/components/sideBar/SideBar.vue';
import VSideHeader from '@/components/sideHeader/SideHeader.vue';
export default {
  components:{
    VSideBar, VSideHeader
  },
	data () {
		return {
      asideWidth: '260px',
      isOne: false,
      isTwo: false,
      padRight: 0
		}
  },
  created () {
    
  },
  mounted () {
	},
  computed:{
    isCollapse: function() {
      return this.$store.state.modules.isCollapse;
    }
  },
  watch: {
    isCollapse: {
      handler: function(val, old){
        let self = this;
        if(val){
          self.asideWidth = '0px'
          self.isOne = true
          self.isTwo = false
        }else{
          self.asideWidth = '260px'
          self.isOne = false
          self.isTwo = true
        }
      },
      deep: true
    }
  },
	methods: {

	}
}
</script>
<style lang="scss" scoped>
	.mymove{
    animation:mymove 1s;
    -ms-animation:mymove 1s;
  }
  @keyframes mymove{
    from{
      width: 260px;
    }
    to{
      width: 0px;
    }
  }
  .myleave{
    animation:myleave 1s;
    -ms-animation:myleave 1s;
  }
  @keyframes myleave{
    from{
      width: 0px;
    }
    to{
      width: 260px;
    }
  }
</style>