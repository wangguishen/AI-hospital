<template>
  <div class="personal">
    <ul>
      <li>
        <div class="labername">头像</div>
        <div class="laberinfo">
          <i class="el-icon-arrow-right"></i>
        </div>
      </li>
      <li>
        <div class="labername">昵称</div>
        <div class="laberinfo">
          <i class="el-icon-arrow-right"></i>
        </div>
      </li>
      <li>
        <div class="labername">微链号</div>
        <div class="laberinfo">4088815</div>
      </li>
      <li>
        <div class="labername">姓名</div>
        <div class="laberinfo">小米</div>
      </li>
      <li>
        <div class="labername">性别</div>
        <div class="laberinfo">
          男
          <i class="el-icon-arrow-right"></i>
        </div>
      </li>
      <li>
        <div class="labername">个性签名</div>
        <div class="laberinfo">
          努力每一天
          <i class="el-icon-arrow-right"></i>
        </div>
      </li>
      <li>
        <div class="labername">手机号</div>
        <div class="laberinfo">18766424444</div>
      </li>
      <li>
        <div class="labername">座机号</div>
        <div class="laberinfo">
          0775-4445-444
          <i class="el-icon-arrow-right"></i>
        </div>
      </li>
      <li>
        <div class="labername">地区</div>
        <div class="laberinfo">
          北京 北京
          <i class="el-icon-arrow-right"></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.personal {
  ul {
    background-color: #fff;
    li {
      height: 55px;
      line-height: 55px;
      border-bottom: 1px solid #ddd;
      .labername {
        float: left;
        padding-left: 30px;
      }
      .laberinfo {
        float: right;
        margin-right: 20px;
        i{
          font-size: 18px;
        }
      }
    }
  }
}
</style>