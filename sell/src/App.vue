<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
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
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import { urlParse } from './common/js/util';
  import header from './components/header/header.vue'
  
  const ERR_OK = 200;
export default {
  name: 'App',
  data(){
    return {
      seller:{
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    }
  },
  components:{
    'v-header':header
  },
  created(){
    this.$http.get('/static/mock/data.json?id=' + this.seller.id).then((response) => {
      console.log(response);
      if(response.status == ERR_OK){
        // this.seller = response.data.seller;
        this.seller = Object.assign({}, this.seller, response.data.seller);  // 扩展对象，添加其他属性--id
      }
    })
  },
  methods:{
    getList(){
    // alert("123");
       
    this.$http.get('/static/mock/index.json')
    .then(function(res){
      console.log(res);
    // let {code, list} = res.data;
      let result = res.data;
      let code = result.code;
      let list = result.list;
      console.log(code);
      console.log(list);
    })
    .catch(function(err){
      console.log(err);
    });

    // 利用了axios
    // this.$http.get("/seller").then(res => {
    //         let seller = res.data;
    //       }).catch(error=>{
    //         console.log(error);
    //       });
    }
  }
}
// <!-- #app:
//   font-family: 'Avenir', Helvetica, Arial, sans-serif
//   -webkit-font-smoothing: antialiased
//   -moz-osx-font-smoothing: grayscale
//   text-align: left
//   color: #2c3e50
//   margin-top: 60px -->
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  #app
    .tab
      display: flex
      width :100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a 
          display: block
          font-size: 14px
          color: #778593
          &.active
            color #fff
            background-color: #f60
        


</style>
