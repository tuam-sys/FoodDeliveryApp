<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <!-- 如果index等于currentIndex,就为这个li添加一个current类，改变左侧导航栏的背景颜色-->
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current': currentIndex === index} " @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <!-- //food-list-hook类的添加只是为了能拿到food列表,例如，拿到的是多个类似整个粥品的区块 -->
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food, $event)" v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" alt="食品图片" height="72px">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @addCart="onAdd" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    <food @addCart="onAdd" ref="food" :food="selectedFood" :shopCart="shopCart"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import food from '../food/food.vue';

  const ERR_OK = 0

  export default {
    data () {
      return {
        goods:[],
        listHeight: [], //listHeight是一个递增的区间数组，是每个专区高度的累加
        scrollY: 0,
        selectedFood: {},
        shopCart: {}
      }
    },
    props:{
      seller:{
        type: Object
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    },
    // events: {  // vue1.0写法
    //   'cart.add'(target){
    //     this._drop(target);
    //   }
    // },
    computed:{
      currentIndex(){   //currentIndex对应菜单栏的下标
        for(let i = 0; i < this.listHeight.length; i++){
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];  //获得了一个区间的上下范围，判断scrollY落到这个区间，!height2是判断最后一个区间
          //避免i溢出，>= 向下的是一个闭区间，这样第一个就会高亮了
          if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
            return i;
          }
        }
        return 0;
      },
      selectFoods(){
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      },
      // shopCart(){
      //   return this.$refs.shopcart;
      // }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/static/mock/data.json').then((response) => {
        let result = response.data;
        this.goods = result.goods;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
        // this.$nextTick(() => {
        //   if(!this.meunScroll){  //如果meunScroll为初始化，即为空，则进行初始化；否则，进行刷新
        //     this.meunScroll=new BScroll(this.$refs.menuWrapper,{click: true}); 
        //   }else{
        //     this.meunScroll.refresh();
        //   }
        //   if(!this.foodsScroll){
        //     this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{click: true}); 
        //   }else{
        //     this.foodsScroll.refresh();
        //   }
        // });
      });
    },
    mounted() {
        // this.onADD();
    },
    methods: {
      selectMenu(index, event){
        if(!event._constructed){  //浏览器直接return掉,去掉自带click事件的点击
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let ref = foodList[index];  // 取到index对应的DOM
        this.foodsScroll.scrollToElement(ref, 300);  // 滚动到DOM所在位置
      },
      onAdd(target){
        this.$refs.shopcart.drop(target);
      },
      // _drop(target){  // vue1.0写法
      //   // 体验优化，异步执行下落动画
      //   this.$nextTick(() => {
      //     this.$refs.shopcart.drop(target);
      //   });
      // },
      _initScroll(){          
        this.meunScroll=new BScroll(this.$refs.menuWrapper,{click: true});          
        this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
          click: true,  //使better-scroll可点击，默认派发一个点击事件
          probeType: 3  //BScroll滚动时，能实时告诉我们滚动的位置，类似探针的效果
        });
        //foodsScroll监听事件,在scroll滚动时能见位置实时暴露出来
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));  //本身是个负值，取正值
        });
      },
      _calculateHeight(){
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for(let i = 0; i < foodList.length; i++){
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectFood(food, $event){
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        // console.log(food);
        this.shopCart = this.$refs.shopcart;
        this.$refs.food.show();
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom:46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table  //多行文本垂直居中
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1
          background: #fff
          font-weight: 700
        .text
          border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px  // 上下margin有重叠效果
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px   
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 8px
            color: rgb(147, 153, 159)
          .desc
            margin-bottom: 8px
          .extra
            &.count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 16px
</style>
