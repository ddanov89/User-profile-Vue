import { createRouter, createWebHistory } from 'vue-router'

const ProfilePage = () => import('@/views/ProfilePage.vue')
const EditPage = () => import('@/views/EditPage.vue')
const NotFound = () => import('@/views/NotFound.vue')

const routes = [
  {
    path: '/',
    redirect: '/profile-page/1',
  },
  {
    path: '/profile-page/:userId',
    name: 'ProfilePage',
    component: ProfilePage,
  },
  {
    path: '/edit/:userId',
    name: 'EditPage',
    component: EditPage,
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
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
