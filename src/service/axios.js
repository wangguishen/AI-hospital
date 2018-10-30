/**
 * 用户中心service层
 * @authors bhq
 * @date    2018-06-07
 */
import axios from '@/config/api.js'
/* 登录获取用户信息 */
//用户名密码登录
export const adminLogin = params => axios.post('/account_auth_admin/personal-api.newloginPower', params);
//手机动态登录
export const getMinddleCode = params => axios.post('/account_auth_admin/personal-api.dynamicLoginOne',params);
export const PhoneLogin = params => axios.post('/account_auth_admin/personal-api.dynamicLoginTwo',params);
export const getUsers = params => axios.post('/account_auth_admin/user-api.findBySessionId',params);
export const indexAuthEntrys = params => axios.post("/account_auth_admin/personal-api.newcheckpower",params)
export const loginOut = params => axios.post("/account_auth_admin/personal-api.logout",params);
//用户中心角色获取
export const getEnterpriseUserRoleInfo = params => axios.post('/account_auth_admin/personal-api.getEnterpriseUserRoleInfo', params);
//角色获取
export const roles = params => axios.post("/NVRCT/menuController/getMenuRoleList",params);

// 收藏、取消收藏
export const operation = params => axios.post('/NVRCT/collectionController/operation',params);
//查询收藏
export const getCollections = params => axios.post("/NVRCT/collectionController/getCollections",params);
//查询历史记录
export const getHistorys =  params => axios.post('/NVRCT/historyController/getHistorys',params);
//添加历史记录
export const getsaveHistory =  params => axios.post('/NVRCT/historyController/saveHistory',params);
//查询菜单列表
export const getMenuListByRoleNum =  params => axios.post('/NVRCT/menuController/getMenuListByRoleNum',params);

//查询组织列表
export const getMenuOrgListByRoleNum =  params => axios.post('/NVRCT/menuController/getMenuOrgListByRoleNum',params);

//查询角色列表
export const getRoleCollections = params => axios.post('/NVRCT/collectionController/getRoleCollections', params)

//查询收藏列表--角色
export const getCollectionsAndRole = params => axios.post('/NVRCT/collectionController/getCollectionsAndRole', params)

//查询历史纪录--角色
export const getHistorysAndRole = params => axios.post('/NVRCT/historyController/getHistorysAndRole', params)


