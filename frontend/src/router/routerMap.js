import Layout from '@/layout/index.vue'

/**
 * 基础路由
 * @type { *[] }
 */

const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: { name: 'home' },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/study',
        name: 'study',
        component: () => import('@/views/study/index.vue')
      },
      {
        path: '/read',
        name: 'read',
        component: () => import('@/views/read/index.vue')
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/settings/index.vue')
      }
    ]
  },
  {
    path: '/web',
    name: 'web',
    component: () => import('@/views/web/index.vue')
  },
  {
    path: '/readDetail',
    name: 'readDetail',
    component: () => import('@/views/read/detail.vue')
  }
]

export default constantRouterMap
