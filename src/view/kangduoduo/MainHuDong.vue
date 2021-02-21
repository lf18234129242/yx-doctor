<template>
  <div class="hudong-box">
    <SelectDoctor></SelectDoctor>
    <div class="chact-box">
      <div>
        <div class="doctor-chart flex-m">
          <div class="doctor-avatar-box">

          </div>
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
  }
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

    .doctor-chart
      width 100%

      .doctor-avatar-box
        width 88px

</style>