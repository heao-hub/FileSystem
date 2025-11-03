import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from '@/components/UserLogin.vue'
import MainLayout from '@/components/MainLayout.vue'
import UserManage from '@/components/UserManage.vue'
import FileManage from '@/components/FileManage.vue'
import PersonalInfo from '@/components/PersonalInfo.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: UserLogin },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '/file', component: FileManage },
        { path: '/users', component: UserManage },
        { path:'/info', component: PersonalInfo}
      ]
    }
  ]
})

// 路由守卫：未登录跳转登录页
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!token && to.path !== '/login') {
    next('/login')
    return
  }

  // 非管理员禁止访问 /user
  if (to.path === '/users' && user.role !== 3) {
    next('/info')
    return
  }

  next()
})

export default router