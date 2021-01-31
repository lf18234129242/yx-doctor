<template>
  <div class="sub-success-box">
    <div class="sub-header-box flex-m-c">
      <van-icon name="checked" class="success-icon" />
      <span class="sub-text">提交成功！</span>
      <span class="sub-text-1">医生回复后,您可收到提醒</span>
      <span class="sub-text-2">医生都是利用休息时间回复，一般回复时间在1-2个工作日，
稍安勿躁。如果您有紧急情况，请及时到医院就诊!</span>
    </div>
    <DispensingOnline></DispensingOnline>
  </div>
</template>

<script>
import { getStrParam } from "@/utils/count"
import DispensingOnline from './../components/DispensingOnline'

export default {
	components: {
		DispensingOnline
	},
  data() {
    return {
			token: '',
			doctorId: '',
			userId: '',
    }
  },
  mounted () {
    let href = window.location.href
    this.token = getStrParam(href, "token")
    this.userId = getStrParam(href, "userId")
    this.doctorId = getStrParam(href, "doctorId")
		sessionStorage.setItem("token", this.token)
  },
}
</script>

<style lang="stylus" scoped>
.sub-success-box
  background: #fff;
  padding-top 1.18rem

  .sub-header-box
    flex-direction column

  .success-icon
    font-size 2.4rem
    color #16A332

  .sub-text
    color #16A332
    height .92rem
    font-size .96rem
    margin .6rem auto
    font-weight bold

  .sub-text-1
    font-size .72rem
    margin-bottom .6rem

  .sub-text-2
    width 12.4rem
    font-size .48rem
    line-height .72rem
    text-align center

</style>