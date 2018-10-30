<template>
	<div class="side-button">
    <!-- <span class="iconfont" @click="handleControl">&#xe609;</span> -->
    <img class="side-img" :src="sidebar" alt="" @click="handleControl">
    <span class="side-text">{{headerTitle}}</span>
  </div>
</template>
<script>
export default {
	data () {
		return {
      sidebar: 'static/images/icon/sidebar.png',
      isCollapse: false
		}
  },
  computed:{
    headerTitle: function() {
      return this.$store.getters.getHeaderTitle;
    }
  },
	mounted () {
	},
	methods: {
    handleControl () {
			let self = this;
			self.isCollapse = !self.isCollapse;
			self.$store.dispatch('setControlShow', self.isCollapse)
		}
	}
}
</script>
<style lang="scss" scoped>
.side-button{
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;
  .side-img{
    display: block;
    margin: 0 20px;
    cursor: pointer;
  }
  .side-text{
    font-family: 'PingFang-SC';
    font-weight: bold;
    font-size: 16px;
  }
}
</style>