import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant, {Lazyload } from 'vant';
import 'vant/lib/index.css';

Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(Lazyload);
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
