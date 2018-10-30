<template>
  <div class="g-containers" :class="{'is-bg-color': isBGColor, 'is-bg-gray': !isBGColor}">
    <!-- <iframe :src="url" frameborder="0" width="100%" class="g-iframe"></iframe> -->
    <img :src="url" alt="..">
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: '',
      sessionId: '',
      isBGColor: false
    }
  },
  watch: {
    '$route': {
      handler: function(val, oldval) {
        this.url = this.load(this.$route.query.url)
      },
      deep: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.url = this.load(this.$route.query.url)
      /* this.sessionId = this.$store.getters.getUserInfo.user.sessionId
      this.url = this.$route.query.url + '?sessionId=' + this.sessionId */
    },
    load (url) {
      this.isBGColor = false
      switch (url) {
        case '设备技师-接诊管理':
          return 'static/images/chartlet/sbjs-jzgl.png'
        case '算法管理-算法管理':
          return 'static/images/chartlet/sfgl-sfgl.png'
        case '诊断医生-接诊管理':
          return 'static/images/chartlet/zdys-jzgl.png'
        case '设备技师-检测设备':
          return 'static/images/chartlet/sbjs-jcsb.png'
        case '算法管理-医学算法':
          return 'static/images/chartlet/sfgl-yxsf.png'
        case '诊断医生-学习中心':
          return 'static/images/chartlet/zdys-xxzx.png'
        case '设备技师-学习中心':
          return 'static/images/chartlet/zdys-xxzx.png'
        case '算法管理-学习中心':
          return 'static/images/chartlet/zdys-xxzx.png'
        case '诊断医生-智能诊断':
          return 'static/images/chartlet/zdys-znzd.png'
        case '公众会员-健康管理':
          return 'static/images/chartlet/jkgl.png'
        case '公众会员-我的影像':
          return 'static/images/chartlet/wdyx.png'
        case '公众会员-我的预约':
          return 'static/images/chartlet/wdyxx.png'
        case '公众会员-预约检测':
          return 'static/images/chartlet/yyjc.png'
        default:
          this.isBGColor = true
          return 'static/images/chartlet/qsy.png'
      }
    }  
  }
}
</script>

<style lang="scss" scoped>
  .g-containers {
    display: flex;
    justify-content: center;
    align-items: center; 
    box-sizing: border-box;
  }
  .is-bg-color{
    background: #fff;
  }
  .is-bg-gray{
    background: #FFF;
  }
  .g-iframe {
    min-height: calc(100vh - 80px);
  }
  img {
    display: block;
    // width: 100%;
    height: calc(100vh - 80px);
  }
</style>


