<template>
  <div id="app">
    <div id="header">
      <Header :seller="seller"></Header>
    </div>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  // import { reactive, toRefs, getCurrentInstance, onMounted, provide  } from 'vue';
  import Header from './components/header/HeaderVue'
  // import axios from 'axios';

  export default {
    data() {
      return {
        seller: {},
      }
    },
    created() {
      this.getSeller()
    },
    methods: {
      getSeller(){
        this.$http.get('/api/data.json').then((res) => {
          // axios.get('http://localhost:8080/mock/data.json').then((res) => {
          console.log(res)
          if(res.status === 200) {
            this.seller = res.data.seller
          }
        }, err => {
          console.log(err);
        });
      },
      
    },

    // setup() {
    //   const state = reactive({
        
    //   })
    //   const instance = getCurrentInstance();
    //   const _this = instance.appContext.config.globalProperties;
    //   provide('seller', "state.seller")
    //   let getSeller = () => {
    //     _this.$http.get('/api/data.json').then((res) => {
    //       // axios.get('http://localhost:8080/mock/data.json').then((res) => {
    //       // console.log(res)
    //       if(res.status === 200) {
    //         state.seller = res.data.seller
    //       }
    //     }, err => {
    //       console.log(err);
    //     });
    //   }
      
    //   onMounted(() => {   // 挂载完成
    //     getSeller()
    //     // provide('seller', 'state.seller')
    //   })

    //   return {...toRefs(state)}
    // },
    components: { 
      Header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  #app
    .tab
      display: flex
      width :100%
      height: 40px
      line-height: 40px
      // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          /* display: block; 可以使得点击超链接所在的整个div都有效，否则只有点中超链接文本时才有效，这一属性可以优化用户体验 */
          display: block
          font-size: 14px
          color: #778593
          &.active
            color #fff
            background-color: #f60
</style>
