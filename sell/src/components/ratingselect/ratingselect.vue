<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
        <span @click="select(2, $event)" class="block positive" :class="{'active': selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
        <span @click="select(0, $event)" class="block positive" :class="{'active': selectType===0}">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
        <span @click="select(1, $event)" class="block negative" :class="{'active': selectType===1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on': onlyContent}">
        <span class="icon-checkbox-checked"></span>
        <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;

    export default {
    data () {
        return {
            selectType_a: this.selectType
        }
    },
    props: {
        ratings: {
            type: Array,
            default() {
                return [];
            }
        },
        selectType: {
            type: Number,
            default() {
                return ALL;
            }
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                }
            }
        }
    },
    computed: {
        positive() {
            return this.ratings.filter((rating) => {
                return rating.rateType == POSITIVE;
            })
        },
        negative() {
            return this.ratings.filter((rating) => {
                return rating.rateType == NEGATIVE;
            })
        }
    },
    methods: {
        select(type, event) {
            if (!event._constructed) {
                return ;
            }
            this.selectType_a = type;
            this.$emit('select', type);
        },
        toggleContent(event) {
            if (!event._constructed) {
                return ;
            }
            this.onlyContent = !this.onlyContent;
            this.$emit('toggle', this.onlyContent);
        }
    },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl'
    .ratingselect
        .rating-type
            padding: 18px 0
            margin: 0 18px  // 上下用padding,左右用margin是因为下面有一条border
            border-1px(rgba(7, 17, 27, 0.1))
            font-size: 0
            .block
                display: inline-block
                padding: 8px 12px
                margin-right: 8px
                line-height: 16px
                border-radius: 1px
                font-size: 12px
                color: rgb(77, 85, 93)
                &.active
                    color: #fff
                .count
                    margin-left: 2px
                    font-size: 8px
                &.positive
                    background: rgba(0, 160, 220, 0.2)
                    &.active
                        background: rgb(0, 160, 220)
                &.negative
                    background: rgba(77, 85, 93, 0.2) 
                    &.active  
                        background: rgb(77, 85, 93) 
        .switch
            padding: 12px 18px
            line-height: 24px
            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            color: rgb(147, 153, 159)
            font-size: 0
            &.on
                .icon-checkbox-checked
                    color: #00c850
            .icon-checkbox-checked
                display: inline-block
                vertical-align: top
                margin-right: 4px
                font-size: 24px
            .text
                display: inline-block
                vertical-align: top
                font-size: 12px
</style>

