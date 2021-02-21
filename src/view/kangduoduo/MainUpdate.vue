<template>
  <div class="main-box">
    <div class="main-header-box">
      <div class="header-info-box flex-sb">
        <div class="flex-m">
          <img src="" alt="" class="avatar">
          <div class="doctor-box">
            <div class="doctor-name">俞杞权医生</div>
            <div class="doctor-hospitol">上海龙华医院  胸外科</div>
          </div>
        </div>
        <SelectDoctor :isMain="false"></SelectDoctor>
      </div>
      <div class="tooltip-box">嗨,咱们老朋友了,有什么问题都可以入群找我哦~</div>
    </div>

    <div class="vip-box">
      <div class="text-1">当前等级</div>
      <div class="text-2">老朋友</div>
      <van-progress :percentage="50" stroke-width="12" color="#fff" />
      <div class="flex-m">
        <div class="renqing-score">人情分 1243/2678</div>
        <div class="jiasu flex-m">
          <i class="iconfont"></i>
          加速
        </div>
      </div>
    </div>

    <!-- 当前特权,下一级特权 -->
    <div
      class="menu-list-box"
      v-for="item in menuList"
      :key="item.name"
    >
      <div class="menu-name">{{item.name}}</div>
      <div class="menu-list flex-m">
        <div 
          class="menu-item flex-m-c"
          v-for="jtem in item.list"
          :key="jtem.id"
          @click="handleLinkTo(jtem.url)"
        >
          <img :src="jtem.iconfont" alt="" class="iconfont-img">
          <div 
            class="label"
            :style="{color: jtem.color}"
          >{{jtem.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectDoctor from './../components/SelectDoctor'

export default {
  components: {
    SelectDoctor
  },
  data() {
    return {
      menuList: [
        {
          name: '当前特权',
          list: [
            {
              id: 1,
              name: '免费咨询',
              iconfont: require('./../../assets/img/duoduo/menu-1.png'),
              url: '',
              color: '#C0A069'
            },
            {
              id: 2,
              name: '免费学习',
              iconfont: require('./../../assets/img/duoduo/menu-2.png'),
              url: '',
              color: '#C0A069'
            },
            {
              id: 3,
              name: '网上配药',
              iconfont: require('./../../assets/img/duoduo/menu-3.png'),
              url: '',
              color: '#C0A069'
            }
          ]
        },
        {
          name: '下一级特权',
          list: [
            {
              id: 4,
              name: '营养处方',
              iconfont: require('./../../assets/img/duoduo/menu-4.png'),
              url: '',
              color: '#999'
            },
            {
              id: 5,
              name: '免费学习',
              iconfont: require('./../../assets/img/duoduo/menu-5.png'),
              url: '',
              color: '#999'
            },
          ]
        }
      ]
    }
  },
}
</script>

<style lang="stylus">
.main-box
  .van-progress__pivot
    display none
  .van-progress
    background rgba(128,108,78,.2)
    margin-bottom .4rem
</style>
<style lang="stylus" scoped>
.main-box
  width 100%

  .main-header-box
    width 100%
    height 8rem
    background url('./../../assets/img/duoduo/main-header-bg.png') no-repeat
    background-size 100% 100%
    padding .8rem .66rem 0

    .header-info-box
      width 100%
      height 2.4rem

      .avatar
        width 2.4rem
        height 2.4rem
        margin-right .4rem

      .doctor-box
        .doctor-name
          font-size .6rem
          color #fff
          margin-bottom .5rem

        .doctor-hospitol
          font-size .72rem
          color #fff
          font-weight 600
          text-align left

    .tooltip-box
      width 12.6rem
      height 1.12rem
      background #fff
      border-radius .2rem
      margin .3rem auto
      position relative
      text-align center
      line-height 1.12rem

      &::after
        width .3rem
        height .3rem
        content ''
        background #fff
        position absolute
        left 1.6rem
        top -.14rem
        transform rotate(45deg)

  .vip-box
    width 13.82rem
    height 7.06rem
    background url('./../../assets/img/duoduo/main-level-bg.png') no-repeat
    background-size 100% 100%
    margin -2.46rem auto .6rem
    padding .8rem .64rem

    .text-1
      font-size .48rem
      margin-bottom .4rem
      color #fff
    
    .text-2
      font-size .96rem
      color #fff
      font-weight 600
      margin-bottom 1.8rem

    .renqing-score
      font-size .56rem
      color #fff
      margin-right .6rem

    .jiasu
      height .92rem
      border-radius .46rem
      background linear-gradient(90deg, #384556 0%, #2A2D39 100%)
      padding 0 .58rem
      font-size .56rem
      color #fff

      .iconfont
        margin-right .1rem
      
  .menu-list-box
    width 100%
    height 6.06rem
    background #fff
    margin-bottom .4rem
    padding .8rem .6rem

    .menu-name
      font-size .68rem
      font-weight 600
      margin-bottom .6rem

    .menu-list
      width 100%
      height 3rem

      .menu-item
        width 2.4rem
        margin-right .8rem
        flex-direction column

        .iconfont-img
          width 2.4rem
          height 2.4rem
          margin-bottom .4rem

        .label
          font-size .48rem
          text-align center

</style>