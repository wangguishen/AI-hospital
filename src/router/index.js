import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: 'login',
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/page/login.vue'], resolve)

  },
  {
    path: '/home',
    name: 'home',
    component: resolve => require(['@/page/home.vue'], resolve),
    children: [
      {
        path: '/Home',
        component: resolve => require(['@/page/personal/application.vue'], resolve),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/setup', //个人中心 设置
        name: 'setup',
        component: resolve => require(['@/page/personal/setup.vue'], resolve),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/helpfeed', //个人中心 帮助与反馈
        name: 'helpfeed',
        component: resolve => require(['@/page/personal/helpfeed.vue'], resolve),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/personaldata',  //个人中心 个人资料
        name: 'personaldata',
        component: resolve => require(['@/page/personal/personaldata.vue'], resolve),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/communication',  //通讯默认页面
        component: resolve => require(['@/page/personal/communication.vue'], resolve),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/application',  //应用主页
        name: 'application',
        component: resolve => require(['@/page/personal/application.vue'], resolve),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/applySubmenu',  //应用子菜单
        component: resolve => require(['@/page/personal/applySubmenu.vue'], resolve),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/noopsyche',  //智能模块主页
        component: resolve => require(['@/page/personal/noopsyche.vue'], resolve),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/holding',  //控股
        name: 'holding',
        component: resolve => require(['@/page/personal/holding.vue'], resolve),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/roleswitchin',  //角色切换
        name: 'roleswitchin',
        component: resolve => require(['@/page/personal/roleswitchin.vue'], resolve),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/smart',  //智能菜单切换
        name: 'smart',
        component: resolve => require(['@/page/personal/smart.vue'], resolve),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/iframe', //iframe页面
        component: resolve => require(['@/page/iframe.vue'], resolve),
        meta: {
          requireAuth: true
        }
      }
    ],
  }
]
const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  let storage = JSON.parse(localStorage.getItem('xpuserdata'))
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (storage) {  // 通过storage判断是否登录
      next();
    }
    else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})

export default router;