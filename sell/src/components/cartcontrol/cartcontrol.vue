<template>
  <div class="cartcontrol">
    <transition name="move">
        <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
            <span class="inner icon-minus"></span>
        </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-plus" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    const EVENT_ADD = 'addCart';
export default {
  data () {
    return {}
  },
  props: {
    food: {
        type: Object
    }
  },
  created(){
    // console.log(this.food)
  },
  methods: {
    addCart(event){
        if(!event._constructed){
            return ;
        }
        if(!this.food.count) {
            Vue.set(this.food, 'count', 1);
            // this.food.count = 1;
        }
        else {
            this.food.count++;
        }
        // console.log(this);
        // this.$dispatch('cart.add', event.target);  // vue2.0中$dispatch方法已经被弃用
        this.$emit(EVENT_ADD, event.target);
    },
    decreaseCart(event){
        if(!event._constructed){
            return ;
        }
        if (this.food.count){
            this.food.count--;
        }
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
        font-size: 0
        .cart-decrease
            display: inline-block
            padding: 6px
            opacity: 1
            // transform: translate3d(0, 0, 0)
            .inner
                display: inline-block
                line-height: 24px
                font-size: 24px
                color: rgb(0, 160, 220)
                transition: all 0.4s linear
                transform: rotate(0)
            &.move-enter-active, &.move-leave-active
                transition: all 0.4s linear
                // transform: translate3d(24px, 0, 0)
            &.move-enter, &.move-leave-active
                opacity: 0
                transform: rotate(180deg)
        // .cart-decrease
        //     display: inline-block
        //     padding: 6px
        //     opacity: 1
        //     transform: translate3d(0, 0, 0)
        //     // transition: all 0.4s linear
        //     // &.move-transition
        //     //     opacity: 1
        //     //     transform: translate3d(0, 0, 0)
        //     &.icon-minus
        //         display: inline-block
        //         line-height: 24px
        //         font-size: 24px
        //         color: rgb(0, 160, 220)
        //         // transition: all 0.4s linear
        //         // transition: rotate(0)
        //         // .inner
        //         //     display: inline-block
        //         //     line-height: 24px
        //         //     font-size: 24px
        //         //     color: rgb(0, 160, 220)
        //         //     transition: all 0.4s linear
        //         //     transition: rotate(0)
        //     &.move-enter-active, &.move-leave-active
        //         transition all 1s linear
        //     &.move-enter, &.move-leave-to
        //         opacity: 0
        //         transform: translate3d(24px, 0, 0)
                // &.fold-enter-active
                // &.fold-leave-active
                //     transition all 0.5s
                //     // transform translate3d(0, -100%, 0)

                // &.fold-enter
                // &.fold-leave-to
                //     transform translate3d(0, 0, 0)

            // &.move-enter, &.move-leave
            //     opacity: 0
            //     transform: translate3d(24px, 0, 0)
                // .inner
                //     transform: rotate(180deg)
        .cart-count
            display: inline-block
            vertical-align: top
            width: 12px
            padding-top: 6px
            line-height: 24px
            text-align: center
            font-size: 10px
            color: rgb(147, 153, 159)
        .cart-add
            display: inline-block
            padding: 6px
            line-height: 24px
            font-size: 24px
            color: rgb(0, 160, 220)
            
</style>
