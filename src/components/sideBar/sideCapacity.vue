<template>
	<div class="side-main-block">
		<v-cell
			:data="currentModule"
			:defalut-key='defalut'
			border-bottom
			:path="userPath"
			v-on:storeInfo="storeInfo"
			isLink
			is-apply>
		</v-cell>
		<div class="ga-cell">
			<div v-for="(item, index) of currentModule.childMenu" :key="item.id" class="g-cell-boxes">
				<v-cell
					:defalut-key='defalut'
					:data="item"
					:border-bottom="index == currentModule.childMenu.length - 1"
					cursor
					:selectColor='item.upDownShow'
					v-on:fullUp="fullUp">
				</v-cell>
			</div>
		</div>
		<v-cell-help></v-cell-help>
	</div>
</template>
<script>
import vCell from '@/components/cell/cell.vue'  //横条模块
import vCellHelp from '@/components/cell/cellHelp.vue'  //帮助列表模块
export default {
	components:{
    vCell, vCellHelp
  },
	data () {
		return {
			obj: {
				userName: '全部影像',
				userImg: 'static/images/icon/all-images.png'
			},
			userPath: '/smart',
			defalut: {
				name: 'menu_name',
				img: 'img_url'
			},
			arrayList: [
				{
					id: 1,
					userName: '检测设备',
					userImg: 'static/images/icon/all-images.png',
					path: '/home',
				}, {
					id: 2,
					userName: '学习中心',
					userImg: 'static/images/icon/all-images.png',
					path: '/holding',
				},
			]
		}
	},
	computed:{
		moduleInfo: function () { //获取模块信息列表
      return this.$store.getters.getModuleInfo;
		},
		currentModule: function () { //获取当前智能模块
      return this.$store.getters.getCurrentModule;
    }
  },
	mounted () {
	},
	methods: {
		fullUp (data) {
			let self = this;
			console.log('currentModule',self.currentModule)
			console.log('currentModule',data)
			console.log('currentModule',self.$store.getters.getCurrentRole.role_name)
			// for(let i = 0; i < self.moduleInfo[2].childMenu.length; i++){
			// 	for(let j = 0; j < self.moduleInfo[2].childMenu[i].childMenu.length; j++){
			// 		self.moduleInfo[2].childMenu[i].childMenu[j].upDownShow = false
			// 	}
			// }
			self.currentModule.childMenu.forEach(item => {
				item.upDownShow = false
			});
			data.upDownShow = true;
			self.$store.dispatch('setHeaderTitle', data.menu_name)
			if (this.$store.getters.getUserType === null) {
				self.$router.push({
					path: '/iframe',
					query: {
						url: '公众会员-' + data.menu_name
					}
				})
			} else {
				self.$router.push({
					path: '/iframe',
					query: {
						url: self.$store.getters.getCurrentRole.role_name + '-' + data.menu_name
					}
				})
			}
		},
		storeInfo (data) {
			let self = this;
			self.currentModule.childMenu.forEach((item, index) => {
        item.upDownShow = false
      })
		}
	}
}
</script>
<style lang="scss" scoped>
	
</style>