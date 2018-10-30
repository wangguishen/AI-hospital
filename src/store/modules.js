import * as types from './types'
import {setSesStorage, getSesStore, getLocalStore, setLocalStore} from '@/util/storageUtil'

const state = {
  userBC: 'B',
  userType: [], //用户类型 - B/C
  userInfo: {}, //登录个人信息
  userCompInfo: {}, //用户信息列表
  moduleInfo: [], //模块列表信息
  currentRole: {}, //当前角色
  currentModule: {}, //当前智能模块列表
  currentOrganization: {}, //当前组织模块列表
  currentApplyModule: {}, //应用当前模块
  isCollapse: false, //主页面收缩
  headerTitle: '', //头部字体保存
  sideBarState: {
    IsAboutMeShow: false,  // true --> 个人信息模块, false --> 功能模块
    state: '2'  // 1 --> 通信模块, 2 --> 应用模块, 3 --> 智能模块
  }
}

const actions = {
  setUserBC ({ commit }, res) { //用户类型
    commit(types.SET_USER_B_C, res)
  },
  setUserType ({ commit }, res) { //保存用户类型
    commit(types.SET_USER_TYPE, res)
  },
  setUserInfo ({ commit }, res) { //保存个人信息
    commit(types.SET_USER_INFO, res)
  },
  setUserCompInfo ({ commit }, res) { //保存用户信息列表
    commit(types.SET_USER_COMP_INFO, res)
  },
  setCurrentRole ({ commit }, res) { //保存当前角色
    commit(types.SET_CURRENT_ROLE, res)
  },
  setCurrentModule ({ commit }, res) { //保存当前模块列表信息
    commit(types.SET_CURRENT_MODULE, res)
  },
  setModuleInfo ({ commit }, res) { //保存智能模块列表信息
    commit(types.SET_MODULE_INFO, res)
  },
  setCurrentOrganization ({ commit }, res) { //保存当前组织信息
    commit(types.SET_CURRENT_ORGANIZATION, res)
  },
  setCurrentApplyModule ({ commit }, res) { //保存当前应用信息
    commit(types.SET_CURRENT_APPLY_MODULE, res)
  },
  setTernimalAuthorityList ({ commit }, res) {
    commit(types.SET_TERMINAL_AUTHORITY_LIST, res)
  },
  setControlShow({ commit }, boo){
		commit(types.SET_CONTROL_SHOW, boo)
  },
  setHeaderTitle({ commit }, boo){
		commit(types.SET_HEADER_TITLE, boo)
	},
  setSideBarState({ commit }, boo){
		commit(types.SET_SIDE_BAR_STATE, boo)
  },
  setState({ commit }, boo){
		commit(types.SET_STATE, boo)
	}
}

const getters = {
  getUserBC : state => { //获取用户类型
    if (state.userBC.length == 0) {
      state.userBC = getSesStore('USER_B_C')
    }
    return state.userBC
  },
  getUserType : state => { //获取用户类型
    if (state.userType.length == 0) {
      state.userType = getLocalStore('USER_TYPE', 'json')
    }
    return state.userType
  },
  getUserInfo : state => { //获取登录个人信息
    if (Object.keys(state.userInfo).length == 0) {
      state.userInfo = getLocalStore('xpuserdata', 'json')
    }
    return state.userInfo
  },
  getUserCompInfo : state => { //获取用户信息中心
    if (Object.keys(state.userCompInfo).length == 0) {
      state.userCompInfo = getSesStore('USER_COMP_INFO', 'json')
    }
    return state.userCompInfo
  },
  getCurrentRole : state => { //获取当前角色
    if (Object.keys(state.currentRole).length == 0) {
      state.currentRole = getSesStore('CURRENT_ROLE', 'json')
    }
    return state.currentRole
  },
  getModuleInfo : state => { //获取模块信息列表
    if (state.moduleInfo.length == 0) {
      state.moduleInfo = getSesStore('MODULE_INFO', 'json')
    }
    return state.moduleInfo
  },
  getCurrentApplyModule : state => { //获取应用模块信息列表
    if (Object.keys(state.currentApplyModule).length == 0) {
      state.currentApplyModule = getSesStore('CURRENT_APPLY_MODULE', 'json')
    }
    return state.currentApplyModule
  },
  getCurrentModule : state => { //获取当前智能模块信息列表
    if (Object.keys(state.currentModule).length == 0) {
      state.currentModule = getSesStore('CURRENT_MODULE', 'json')
    }
    return state.currentModule
  },
  getCurrentOrganization : state => { //获取当前组织信息
    if (Object.keys(state.currentOrganization).length == 0) {
      state.currentOrganization = getSesStore('CURRENT_ORGANIZATION', 'json')
    }
    return state.currentOrganization
  },
  getTernimalAuthorityList: state => state.ternimalAuthorityList,
  getControlShow: state => state.isCollapse,
  getHeaderTitle: state => {
    if (state.headerTitle == '') {
      state.headerTitle = getSesStore('SET_HEADER_TITLE')
    }
    return state.headerTitle
  },
  getSideBarState: state => {
    let sideState = getSesStore('SET_SIDE_BAR_STATE', 'json')
    if (sideState) state.sideBarState = sideState
    return state.sideBarState
  }
}

const mutations = {
  [types.SET_USER_B_C] (state, res) { //登录用户类型
    state.userBC = res
    setSesStorage('USER_B_C', res)
  },
  [types.SET_USER_TYPE] (state, res) { //登录用户类型
    state.userType = res
    setSesStorage('USER_TYPE', res)
  },
  [types.SET_USER_INFO] (state, res) { //登录保存个人信息
    state.userInfo = res
    setLocalStore('xpuserdata', res)
  },
  [types.SET_USER_COMP_INFO] (state, res) { //用户信息列表
    state.userCompInfo = res
    setSesStorage('USER_COMP_INFO', res)
  },
  [types.SET_CURRENT_ROLE] (state, res) { //用户信息列表
    state.currentRole = res
    setSesStorage('CURRENT_ROLE', res)
  },
  [types.SET_MODULE_INFO] (state, res) { //模块信息列表
    state.moduleInfo = res
    setSesStorage('MODULE_INFO', res)
  },
  [types.SET_CURRENT_MODULE] (state, res) { //当前菜单信息列表
    state.currentModule = res
    setSesStorage('CURRENT_MODULE', res)
  },
  [types.SET_CURRENT_APPLY_MODULE] (state, res) { //当前应用菜单信息列表
    state.currentApplyModule = res
    setSesStorage('CURRENT_APPLY_MODULE', res)
  },
  [types.SET_CURRENT_ORGANIZATION] (state, res) { //当前组织信息
    state.currentOrganization = res
    setSesStorage('CURRENT_ORGANIZATION', res)
  },
  [types.SET_TERMINAL_AUTHORITY_LIST] (state, res) {
    state.ternimalAuthorityList = res
  },
  [types.SET_CONTROL_SHOW] (state, boo) { //更改主页面收缩状态
    state.isCollapse = boo
  },
  [types.SET_HEADER_TITLE] (state, boo) { //更换头部信息导航
    state.headerTitle = boo;
    setSesStorage("SET_HEADER_TITLE", boo)
  },
  [types.SET_SIDE_BAR_STATE] (state, boo) { //更换头部信息导航
    state.sideBarState = boo;
    setSesStorage("SET_SIDE_BAR_STATE", boo)
  },
  [types.SET_STATE] (state, boo) { //清空
    state.sideBarState = boo;
    state.userBC = 'B'
    state.userType = []
    state.userInfo = {}
    state.userCompInfo = {}
    state.moduleInfo = []
    state.currentRole = {}
    state.currentModule = {}
    state.currentOrganization = {}
    state.currentApplyModule = {}
    state.isCollapse = false
    state.headerTitle = ''
    // state.sideBarState = {
    //   IsAboutMeShow: false
    //   state: '2'
    // }
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}