import Vue from 'vue'
import VueRouter from 'vue-router'
const Index = () => import("../views/index.vue");
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    meta: {
      title: "图书查询",
    },
    component: Index
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
