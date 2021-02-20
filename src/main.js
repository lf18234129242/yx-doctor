// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './assets/css/base.css'
import './assets/js/fontsize.js'
// import Meta from 'vue-meta'

import {
	Progress,
	Icon,
	Dialog,
	RadioGroup, 
	Radio, 
	CellGroup, 
	Cell, 
	Button, 
	Popup, 
	Picker, 
	Toast, 
	Uploader, 
	Tabs, 
	Tab,
	Image,
	Lazyload,
	List,
	PullRefresh,
	Checkbox,
	CheckboxGroup,
	Search
} from 'vant';

Vue.use(RadioGroup)
	.use(Radio)
	.use(CellGroup)
	.use(Cell)
	.use(Button)
	.use(Popup)
	.use(Picker)
	.use(Toast)
	.use(Uploader)
	.use(Tabs)
	.use(Tab)
	.use(Image)
	.use(Lazyload)
	.use(List)
	.use(PullRefresh)
	.use(Dialog)
	.use(Icon)
	// .use(Meta)
	.use(Checkbox)
	.use(CheckboxGroup)
	.use(Search)
	.use(Progress)

//把 `******` 加到 `Vue` 的原型中
Vue.prototype.axios = axios
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  // 为页面添加标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

export default router