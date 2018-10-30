<template>
	<div class="side-main-block">
		<template v-if="!userType || userType.length == 0">
			<v-cell
				:data="CUserObj"
				border-bottom>
			</v-cell>
			<div class="ga-cell">
				<template v-if="currentApplyModule">
					<div v-for="(item, index) of moduleInfo[1].childMenu" :key="item.id" class="g-cell-boxes">
						<v-cell
							:defalut-key='defalut'
							:data="item"
							:border-bottom="index == moduleInfo[1].childMenu.length - 1"
							cursor
							:selectColor='item.upDownShow'
							v-on:fullUp="submenu">
						</v-cell>
					</div>
				</template>
			</div>
		</template>
		<template v-else>
			<v-cell
				:data="currentApplyModule ? currentApplyModule : CUserObj"
				:defalut-key='defalut'
				border-bottom
				:path='userPath'
				isLink
				is-apply
				v-on:storeInfo="storeInfo">
			</v-cell>
			<div class="ga-cell">
				<template v-if="currentApplyModule">
					<div v-for="(item, index) of currentApplyModule.childMenu" :key="item.id" class="g-cell-boxes">
						<v-cell
							:defalut-key='defalut'
							:data="item"
							:border-bottom="index == currentApplyModule.childMenu.length - 1"
							:cursor='item.parent_code != "XINGZHENGZHONGXIN" || item.parent_code != "YUNYINGZHONGXIN"'
							:selectColor='item.upDownShow'
							v-on:fullUp="submenu">
						</v-cell>
					</div>
				</template>
			</div>
		</template>
		<v-cell-help></v-cell-help>
	</div>
</template>
<script>
import vCell from '@/components/cell/cell.vue'  //横条模块
import vCellList from '@/components/cell/cellList.vue'  //横条列表模块
import vCellHelp from '@/components/cell/cellHelp.vue'  //帮助列表模块
export default {
	components:{
    vCell, vCellList, vCellHelp
  },
	data () {
		return {
			CUserObj: {
				name: '翌歌会员',
				img: 'static/images/icon/yigeVip.png'
			},
			userPath: '/roleswitchin',
			cellDefalut: {
				name: 'roleName',
				img: 'img'
			},
			defalut: {
				name: 'menu_name',
				img: 'img_url'
			}
		}
	},
	computed:{
		userType: function () { //获取用户类型
      return this.$store.getters.getUserType;
		},
		moduleInfo: function () { //获取模块信息列表
      return this.$store.getters.getModuleInfo;
		},
		currentRole: function () { //获取当前角色
      return this.$store.getters.getCurrentRole;
		},
		currentModule: function () { //获取当前菜单模块
      return this.$store.getters.getCurrentModule;
		},
		currentApplyModule: function () { //获取当前菜单模块
      return this.$store.getters.getCurrentApplyModule;
    },
	},
	props: {
	},
	watch: {
	},
	mounted () {
	},
	methods: {
		selectRadio (data) {
			let self = this;
			console.log('adfa',data)
			// self.moduleInfo[1].childMenu.forEach((item, index) => {
			// 	if (item.id != data.id) {
			// 		item.upDownShow = false;	
			// 	}
			// })
			// self.$store.dispatch('setHeaderTitle', data.menu_name)
			// self.$store.dispatch('setCurrentModule', data)
			// if (self.userType === null) {
			// 	self.$router.push({
			// 		path: '/iframe',
			// 		query: {
			// 			url: '公众会员-' + data.menu_name
			// 		}
			// 	})
			// } else {
			// 	self.$router.push({
			// 		path: '/application',
			// 		query: {
			// 			id: data.id
			// 		}
			// 	})
			// }
		},
		storeInfo (msg) {
			let self = this;
			console.log('adfa',msg)
			if (self.moduleInfo.length != 0) {
				self.moduleInfo[1].childMenu.forEach(item => {
					item.upDownShow = false
				})
			}
			self.currentApplyModule.childMenu.forEach(item => {
				item.upDownShow = false
			});
			self.$store.dispatch('setHeaderTitle', '应用切换')
			self.$router.push({
				path: '/roleswitchin',
				query: {
					id: msg.id
				}
			})
		},
		submenu (data) {
			let self = this;
			console.log('sdfa',data)
			console.log('sdfa',self.currentRole)
			if(!self.userType || self.userType.length == 0) {
				self.moduleInfo[1].childMenu.forEach(item => {
					item.upDownShow = false
				})
			} else {
				self.currentApplyModule.childMenu.forEach(item => {
					item.upDownShow = false
				});
			}
			if (data.parent_code != 'XINGZHENGZHONGXIN' && data.parent_code != 'YUNYINGZHONGXIN') {
				data.upDownShow = true;
				// self.$store.dispatch('setHeaderTitle', item.menu_name)
				if (self.userType === null) {
					self.$router.push({
						path: '/iframe',
						query: {
							url: '公众会员-' + data.menu_name
						}
					})
				} else {
					self.$router.push({
		        path: '/iframe?',
		        query: {
		          url: (self.currentRole.roleName || self.currentRole.role_name) + '-' + data.menu_name
		        }
		      })
				}
			}
		}
	}
}
</script>
<style lang="scss" scoped>
	
</style>