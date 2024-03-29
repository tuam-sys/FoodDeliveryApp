<template>
  <div class="seller" ref="seller">
     <!-- 这个标签存在是因为better-scroll只作用于第一个子元素 -->
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <!-- 对应是否收藏两种样式-->
          <span class="icon-heart" :class="{'active': favorite}"></span>
          <!-- 有没有选中对应不同的文本，所以这里要绑定一个变量，放到data中 -->
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <div class="title">公告与活动</div>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="supports-item border-1px" v-for="item in seller.supports">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90" alt="商家实景图片">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import { saveToLocal, loadFromLocal } from '../../common/js/store'
  import star from '../star/star'
  import split from '../split/split'
  export default {
    data () {
      return {
        favorite: false
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    components :{
      star,
      split
    },
    watch: {
      'seller'() { // 观测seller数据的更新，并且执行更新后的操作
        this._initScroll();
        this._initPics();
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this._initScroll();
      this._initPics();
      this.favorite = (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
          // return localStorage.favorite;
        })();
    },
    methods: {
      toggleFavorite (event) {
        if (!event._constructed) {
          return ;
        }
        this.favorite = !this.favorite;
        // 这样写无法区分商家id，不同商家的状态一样
        // localStorage.favorite = this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      },
      _initScroll() {
        this.$nextTick(() => {
          if(!this.scroll) {
            this.scroll = new BScroll(this.$refs.seller, {
              click: true
            });
          }
          else {
            this.scroll.refresh();
          }
        });
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin; // 计算ul的宽度
          this.$nextTick(() => {
            this.$refs.picList.style.width = width + 'px'; // 设置ul宽度，不要忘记单位
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true, // 表示横向滚动
                eventPassthrough: 'vertical' // 横向滚动图片的时候忽略纵向滚动
              });
            }
            else {
              this.picScroll.refresh();
            }
          });
        }
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .desc
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0
        .star
          display: inline-block
          margin-right: 8px
          vertical-align: top
        .text
          display: inline-block
          margin-right: 12px
          vertical-align: top
          line-height: 18px
          font-size: 10px
          color: rgb(77, 85, 93)
      .remark
        display: flex
        padding-top: 18px
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border: none
          h2
            margin-bottom: 4px
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .content
            line-height: 24px
            font-size: 10px
            font-weight: 200
            color: rgb(7, 17, 27)
            .stress
              font-size: 24px
      .favorite
        position: absolute
        width: 50px
        right: 11px
        top: 18px
        text-align: center
        .icon-heart
          display: block
          margin-bottom: 4px
          line-height: 24px
          font-size: 24px
          color: #d4d6d9
          &.active
            color: rgb(240, 20, 20)
        .text
          line-height: 10px
          font-size: 10px
          color: rgb(77, 85, 93)
    .bulletin
      padding: 18px 18px 0 18px
      .title
        margin-bottom: 8px
        line-height 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .content-wrapper
        padding: 0 12px 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .content
          line-height 24px
          font-size: 12px
          font-weight: 200
          color: rgb(240, 20, 20)
      .supports
        .supports-item
          padding: 16px 12px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
          .icon
            display: inline-block
            width: 16px
            height: 16px
            vertical-align: top
            margin-right: 6px
            background-size: 16px 16px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_4')
            &.discount
              bg-image('discount_4')
            &.guarantee
              bg-image('guarantee_4')
            &.invoice
              bg-image('invoice_4')
            &.special
              bg-image('special_4')
          .text
            line-height 16px
            font-size: 12px
            font-weight: 200
            color: rgb(7, 17, 27)
    .pics
      padding: 18px
      .title
        margin-bottom: 12px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .pic-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap // 不产生折行
        .pic-list
          font-size: 0
          .pic-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
    .info
      padding: 18px 18px 0 18px
      color: rgb(7, 17, 27)
      .title
        padding-bottom: 12px
        line-height 14px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 14px
      .info-item
        padding: 16px 12px
        line-height 16px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px
        &:last-child
          border-none()
</style>
