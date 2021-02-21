<template>
  <!-- 就诊码 -->
  <div class="jz-ma-box">
    <SelectDoctor></SelectDoctor>
    <div class="code-box pr">
      <img src="" alt="" class="doctor-avatar">
      <div class="doctor-name">俞杞权医生</div>
      <img src="" alt="" class="code-img">
      <div class="level-text">黄金</div>
      <div class="desc">门诊就诊时请出示给医生<br>家人扫一扫, 可增加积分</div>
    </div>
  </div>
</template>

<script>
import SelectDoctor from './../components/SelectDoctor'
export default {
  components: {
    SelectDoctor
  }
}
</script>

<style lang="stylus" scoped>
.jz-ma-box
  width 100%
  min-height 100vh
  background #DBC69B
  padding 1.1rem 1rem 0 1rem

  .code-box
    width 13rem
    background #FFF
    border-radius .28rem
    margin-top 2.1rem
    padding-top 2.28rem
    padding-bottom .74rem

    .doctor-avatar
      width 4rem
      height 4rem
      border-radius 50%
      background #fff
      display block
      position absolute
      left 4.5rem
      top -2rem
      border .4rem solid #fff

    .doctor-name
      width 100%
      text-align center
      font-size .72rem
      font-weight 600
      margin-bottom .84rem

    .code-img
      width 7.08rem
      height 7.08rem
      margin 0 auto .44rem
      display block

    .level-text
      font-size .72rem
      font-weight 600
      margin-bottom .44rem
      color #6A3C00
      text-align center

    .desc
      width 100%
      line-height .68rem
      font-size .56rem
      text-align center
</style>