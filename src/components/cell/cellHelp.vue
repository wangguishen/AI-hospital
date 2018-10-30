<template>
  <div class="ga-cell">
		<div v-for="item of actionList" :key="item.id" class="g-cell-boxes">
			<v-cell
				:data="item"
				:defalut-key='cellDefalut'
				:path='item.path'
        v-on:storeInfo="storeInfo"
        v-on:fullUp="fullUp"
				is-apply>
			</v-cell>
		</div>
	</div>
</template>
<script>
import vCell from '@/components/cell/cell.vue'  //横条模块
import { getLocalStorage } from "@/util/storageUtil";
export default {
  components:{
    vCell
  },
  data () {
		return {
			cellDefalut: {
				name: 'roleName',
				img: 'img'
			},
			actionList: [
				{
					id: 1,
					roleName: '帮助',
					img: 'static/images/icon/help.png',
					path: '/helpfeed'
				}, {
					id: 2,
					roleName: '客满',
					img: 'static/images/icon/full-up.png',
				},
			],
			sessionIdn:'',
		}
	},
	computed:{
		moduleInfo: {
			get: function () { //获取模块信息列表
	      return this.$store.getters.getModuleInfo;
			}
		},
		currentModule: {
			get: function () { //获取当前智能模块
	      return this.$store.getters.getCurrentModule;
	    }
		},
		currentApplyModule: {
			get: function () { //获取当前菜单模块
	      return this.$store.getters.getCurrentApplyModule;
	    }
		}
	},
	mounted () {
		let self = this;
		if(getLocalStorage('xpuserdata','json').user.sessionId){
      self.sessionIdn = getLocalStorage('xpuserdata','json').user.sessionId;
		}else{
			self.$router.push({ path: "/login" });
		}
		
	},
	methods: {
		fullUp (data) {
			if(document.getElementById('serviceJS')){
        if( !document.getElementsByClassName('i_cusiframe')[0]){
          opCustom();
        }
      }else {
        window.transferVary = Customerservice+'/command-web';
        window.SESSIONID_COMMAND_WEB = this.sessionIdn;
        var script =document.createElement('script');
        script.type = 'text/javascript';
        script.src=Customerservice+'/command-web/static/js/cusPage.js'; 
        script.setAttribute('id','serviceJS');
        document.body.appendChild(script);
      }
		},
    storeInfo (data) {
			let self = this;
			console.log('xxxx',data)
			self.$store.dispatch('setHeaderTitle', '帮助')
			if (self.moduleInfo.length != 0) {
				for(let i = 0; i < self.moduleInfo.length; i++){
					for(let j = 0; j < self.moduleInfo[i].childMenu.length; j++){
						self.moduleInfo[i].childMenu[j].upDownShow = false
						if(i === 2 && self.currentModule.childMenu){
							self.currentModule.childMenu.forEach((item, index) => {
                item.upDownShow = false
              })
						}
					}
				}

				// self.moduleInfo[0].childMenu.forEach(item => {
				// 	item.upDownShow = false
				// })
				// self.moduleInfo[1].childMenu.forEach(item => {
				// 	item.upDownShow = false
				// })
			}
			self.currentApplyModule.childMenu.forEach(item => {
				item.upDownShow = false
			});
    },
	}
}
</script>
<style lang="scss" scoped>
.g-cell-boxes{
	cursor: pointer;
}
</style>