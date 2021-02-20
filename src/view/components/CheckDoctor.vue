<template>
  <div>
    <div class="check-doctor" v-if="isMain">
      <i class="iconfont"></i>
      切换医生
    </div>
    <div class="check-doctor-bd" v-else>
      <i class="iconfont"></i>
      切换医生
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isMain: {
      type: Boolean,
      default: true
    },
  },
}
</script>

<style lang="stylus" scoped>
.check-doctor
  height 30px
  color #333
  font-size .52rem
  text-align right
  line-height .6rem

.check-doctor-bd
  height .94rem
  border 1px solid rgba(255,255,255,.7)
  border-radius .48rem
  color rgba(255,255,255,.7)
  line-height .94rem
  padding 0 .28rem

</style>