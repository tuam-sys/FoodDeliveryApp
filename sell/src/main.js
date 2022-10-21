// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import router from './router';
import App from './App.vue';

import './common/stylus/index.styl';

//引入mock，关闭则注释该行
// import '../mock/index'
// import mockServe from 'mock/index'

Vue.prototype.$http = axios
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8080/'
// 2
// Vue.component('my-header', {
// template: '<p>This is my header.</P>'
// })
// 3局部组件 注意：data需要用函数函数返回，而不是直接定义
var myHeaderChild = {
  template: '<p>This is my header child.</P>'
}
var myHeader = {
  template: '<p><my-header-child></my-header-child></P>',
  components: {
    'my-header-child': myHeaderChild
  }
}
/* eslint-disable no-new */
// var root =
new Vue({
  el: '#app',
  // 2
  // template: '<p>hello world {{world}}</p>',
  data: {
    world: 'Hello World'
  },
  components: {
    'my-header': myHeader
  },
  router,
  render: h => h(App)
}).$mount('#app')






// 获取实例对象的选项数据
// root.$data

// import express from 'express'
// // var app = express()
// var appData = require('../data.json');
// var seller = appData.seller;

// var apiRoutes = express.Router();
// apiRoutes.get('./seller', function(req, res){
//   res.json({
//     errno:0,
//     data:seller
//   });
// });

// app.use('/api', apiRoutes);