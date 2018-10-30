<template>
	<div class="side-main-block">
		<template v-if="!userType || (userType.length == 0)">
			<v-cell
				:data="CUserObj"
				border-bottom>
			</v-cell>
		</template>
		<template v-else>
			<v-cell
				:data="currentTitle"
				border-bottom
				:path='userPath'
				v-on:storeInfo="storeInfo"
				isLink
				is-apply>
			</v-cell>
		</template>
		<div class="ga-cell">
			<div v-for="(item, index) of moduleInfo[0].childMenu" :key="item.id" class="g-cell-boxes">
				<v-cell
					:defalut-key='defalut'
					:data="item"
					:border-bottom="index == moduleInfo[0].childMenu.length - 1"
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
import { getLocalStore } from "@/util/storageUtil";
import { findCompCode } from "@/util/utils";
// import { getMenuOrgListByRoleNum } from "@/service/axios";
export default {
	components:{
    vCell, vCellHelp
  },
	data () {
		return {
			CUserObj: {
				name: '翌歌会员',
				img: 'static/images/icon/yigeVip.png'
			},
			defalut: {
				name: 'menu_name',
				img: 'img_url'
			},
			userPath: '/holding',
			currentTitle: {
				name: '',
				img: 'static/images/icon/zz-default.png',
				upDownShow: false
			},
			defalutTitle: {
				name: 'name',
				img: 'img_url'
			},
		}
	},
	computed:{
		userType: function () { //获取用户类型org_name
      return this.$store.getters.getUserType;
		},
    sideBarState: function () {
      return this.$store.getters.getSideBarState;
    },
    userInfo: function () { //获取登录信息
      return this.$store.getters.getUserInfo;
    },
    currentRole: function () { //获取当前角色
      return this.$store.getters.getCurrentRole;
		},
		moduleInfo: function () { //获取模块信息列表
      return this.$store.getters.getModuleInfo;
		},
		currentOrganization: function () { //获取当前组织
      return this.$store.getters.getCurrentOrganization;
    }
	},
	watch: {
		currentRole: { //获取当前角色
      handler: function (val, old) {
        let self = this;
				console.log(val)
				self.currentTitle.name = self.currentOrganization.comp_name + '-' + val.role_name;
      },
      deep: true
    },
	},
	mounted () {
		let self = this;
		self.currentTitle.name = self.currentOrganization.comp_name + '-' + self.currentRole.role_name;
		// self.currentTitle.upDownShow = false;
		// self.currentTitle = {
		// 	name: self.currentOrganization.comp_name + '-' + self.currentRole.role_name,
		// 	img: self.currentRole.img_url,
		// 	upDownShow: false
		// }
		console.log("组织",self.currentOrganization)
		console.log("角色",self.currentRole)
	},
	methods: {
		fullUp (data) {
			let self = this;
			console.log('----返回函数',data)
			self.moduleInfo[0].childMenu.forEach(item => {
				item.upDownShow = false
			});
			data.upDownShow = true;
			self.$store.dispatch('setHeaderTitle', data.menu_name)
			// self.$router.push({
      //   path: '/communication',
      //   query: {
      //     id: data.id
      //   }
			// })
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
	          url: self.currentRole.roleName + '-' + data.parent_name
	        }
	      })
			}
			// self.$router.push({
      //   path: '/iframe?',
      //   query: {
      //     url: self.currentRole.roleName + '-' + data.menu_name
      //   }
      // })
		},
		storeInfo (data) {
			let self = this;
			console.log('storeInfo',data)
			self.moduleInfo[0].childMenu.forEach(item => {
				item.upDownShow = false
			})
			self.$store.dispatch('setHeaderTitle', '通信')
		}
	}
}
</script>
<style lang="scss" scoped>
	
</style>