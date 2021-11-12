import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import { Pagination,Tag,CheckableTag } from 'ant-design-vue';

Vue.component(Pagination.name, Pagination)
Vue.component(Tag.name, Tag)
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
new Vue({
  router,

  render: h => h(App)
}).$mount('#app')
