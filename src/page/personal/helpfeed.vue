<template>
  <div class="helpfeed">
    <div class="main">
      <div class="tit-name">1.登录</div>
      <p>1）密码登录</p>
      <p>用户输入正确用户名和密码即可登录，并且用户名和密码都不能为空，登录成功后跳转至应用界面（如下图所示）</p>
      <img src="../../../static/images/help/help1.png" alt="">
      <p>1）动态密码登录</p>
      <p>用户输入正确的手机号码，在获取验证码之后，输入发送到手机上的验证，进行登录（如下图所示）</p>
      <img src="../../../static/images/help/help1.png" alt="">
      <div class="tit-name">2.用户说明</div>
      <p>象翌象谱适用于企业，它实现了通信、应用、智能之间的相互切换（如下图所示）</p>
      <img src="../../../static/images/help/help1.png" alt="">
    </div>
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
.helpfeed {
  width: 100%;
  .main{
    margin-left: 30px;
    margin-right: 30px;
    text-align: center;
    .tit-name{
      padding-top: 20px;
      padding-bottom: 12px;
      line-height: 20px;
      text-align: left;
      font-weight: bold;
      color: #2D3135;
    }
    p{
      text-align: left;
      color: #2D3135;
      line-height: 22px;
    }
    img{
      width: 800px;
      padding-top: 28px;
      padding-bottom: 50px;
      text-align: center;
    }
  }
}
</style>