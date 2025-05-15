import { createRouter, createWebHistory } from 'vue-router'

const ProfileView = () => import('@/views/ProfileView.vue')
const EditView = () => import('@/views/EditView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')

const routes = [
  {
    path: '/',
    redirect: '/profile-page/1',
  },
  {
    path: '/profile-page/:userId',
    name: 'ProfileView',
    component: ProfileView,
  },
  {
    path: '/edit/:userId',
    name: 'EditView',
    component: EditView,
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFoundView,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
