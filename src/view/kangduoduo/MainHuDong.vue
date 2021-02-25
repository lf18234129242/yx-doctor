<template>
  <div class="hudong-box">
    <SelectDoctor></SelectDoctor>
    <div class="chact-box">
      <div>
        <div class="doctor-chart flex">
          <div class="doctor-avatar-box">
            <img src="./../../assets/img/duoduo/menu-1.png" alt="" class="avatar-img">
            <div class="name">张鹏医</div>
          </div>
          <div class="chart-popover pr">回复了你的问题回</div>
        </div>
        <div class="chart-time">上午10:00</div>
        <div class="user-chart flex">
          <div class="chart-popover pr">你提交了一个问题</div>
          <img src="./../../assets/img/duoduo/menu-1.png" alt="" class="avatar-img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectDoctor from './../components/SelectDoctor'
import { duoduo } from "@/utils/http"
import { getStrParam } from "@/utils/count"

export default {
  components: {
    SelectDoctor
  },
  data() {
    return {
      chartList: [],
      token: '',
    }
  },
  mounted () {
    let href = window.location.href
    this.token = getStrParam(href, "token")
    this.personInteraction()
  },
  methods: {
    personInteraction() {
      duoduo.personInteraction({
        token: this.token
      }).then(res => {
        this.chartList = res.data.list
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
.hudong-box
  width 100%
  background #F2F2F2
  padding .7rem .64rem

  .chact-box
    width 100%
    padding-top 1rem

    .chart-time
      width 100%
      text-align center
      font-size .48rem
      color #999
      margin-bottom .6rem

    .user-chart
      width 100%
      justify-content flex-end
      margin-bottom .6rem

      .chart-popover
        width 9.52rem
        background #fff
        border-radius .2rem
        padding .6rem

        &::after
          width .4rem
          height .4rem
          background #fff
          transform rotate(45deg)
          content ''
          position absolute
          right -.2rem
          top .4rem

      .avatar-img
        width 1.76rem
        height 1.76rem
        border-radius 50%
        margin-bottom .2rem

    .doctor-chart
      width 100%
      margin-bottom .6rem

      .doctor-avatar-box
        width 1.76rem
        min-height 2.8rem
        margin-right .7rem

        .avatar-img
          width 1.76rem
          height 1.76rem
          border-radius 50%
          margin-bottom .2rem

        .name
          font-size .48rem
          color #666
          text-align center

      .chart-popover
        width 9.52rem
        background #fff
        border-radius .2rem
        padding .6rem

        &::after
          width .4rem
          height .4rem
          background #fff
          transform rotate(45deg)
          content ''
          position absolute
          left -.2rem
          top .4rem
</style>