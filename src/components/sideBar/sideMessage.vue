<template>
	<div class="side-main-block">
		<ul class="user-list">
      <li v-for="message in messageList" :key="message.id">
        <i :class="[message.iconClass]"></i>
        <div v-if="message.path" @click="storeInfo(message)">
          <router-link :to="message.path">{{message.title}}</router-link>
        </div>
        <div v-else>
          <span>{{message.title}}</span>
        </div>
      </li>
    </ul>
	</div>
</template>
<script>
export default {
	data () {
		return {
			messageList: [
        {
          id: 1,
          iconClass: 'usericon1',
          title: '个人资料'
        }, {
          id: 2,
          iconClass: 'usericon2',
          title: '账户安全'
        }, {
          id: 3,
          iconClass: 'usericon3',
          path: '/setup',
          title: '设置'
        }, {
          id: 4,
          iconClass: 'usericon4',
          path: '/helpfeed',
          title: '帮助与反馈'
        }, {
          id: 5,
          iconClass: 'usericon5',
          path: '',
          title: '关于'
        },
      ]
		}
	},
	mounted () {
		
	},
	methods: {
    storeInfo (mes) {
      let self = this;
      self.$store.dispatch('setHeaderTitle', mes.title)
    }
	}
}
</script>
<style lang="scss" scoped>
	.user-list{
    padding: 10px 25px;
    li{
      height: 48px;
      line-height: 48px;
      i{
        float: left;
        display: block;
        width: 16px;
        background: url('../../../static/images/user-icon.png')
      }
      .usericon1{
        height: 14px;
        margin-top: 17px;
        background-position: 0 0;
      }
      .usericon2{
        height: 16px;
        margin-top: 17px;
        background-position:-31px 0 ;
      }
      .usericon3{
        height: 16px;
        margin-top: 15px;
        background-position: -62px 0;
      }
      .usericon4{
        height: 17px;
        margin-top: 15px;
        background-position: -93px 0;
      }
      .usericon5{
        height: 16px;
        margin-top: 15px;
        background-position: -124px 0;
      }
      a, span{
        float: left;
        padding-left: 20px;
        font-size: 14px;
        color: #2D3135;
        cursor: pointer;
      }
      .router-link-active{
        color: #306FF0;
      }
    }
  }
</style>