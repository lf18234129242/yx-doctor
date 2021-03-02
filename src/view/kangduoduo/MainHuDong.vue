<template>
  <div class="hudong-box" ref="chactBox">
    <SelectDoctor style="position: fixed;right: 0.64rem;top: 0.5rem;"></SelectDoctor>

    <van-pull-refresh 
      v-model="isLoading" 
      @refresh="onRefresh"
    >
      <div class="chact-box">
        <div
          v-for="item in chartList"
          :key="item.id"
        >
          <div class="doctor-chart flex" v-if="item.type === 2">
            <div class="doctor-avatar-box">
              <img :src="item.avatarUrl" alt="" class="avatar-img">
              <div class="name">{{item.doctorName}}</div>
            </div>
            <div>
              <div class="chart-popover pr">{{item.msg}}</div>
            </div>
          </div>
          <div class="chart-time">{{item.createTime}}</div>
          <div class="user-chart flex" v-if="item.type === 1">
            <div class="chart-popover pr">{{item.msg}}</div>
            <img :src="item.headimgUrl" alt="" class="avatar-img">
          </div>
        </div>
      </div>
    </van-pull-refresh>
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
      isLoading: false,
      hasMore: true,
      chartList: [],
      filter: {
        token: '',
        limit: 10,
        page: 1
      }
    }
  },
  mounted () {
    let href = window.location.href
    this.filter.token = getStrParam(href, "token")
    this.personInteraction()
  },
  methods: {
    onRefresh() {
      this.filter.page++
      this.filter.page = this.filter.page * this.filter.limit
      if(this.hasMore) {
        this.personInteraction()
      } else {
        this.isLoading = false
      }
    },
    personInteraction() {
      this.isLoading = true
      duoduo.personInteraction(this.filter).then(res => {
        this.isLoading = false
        if(res.data.list.length) {
          this.hasMore = true
          this.chartList = this.chartList.concat(res.data.list)
        } else {
          this.hasMore = false
        }
        if(this.filter.page === 1) {
          this.$nextTick(() => {
            this.$refs.chactBox.scrollTop = 100000000
          })
        }
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
.hudong-box
  width 100%
  height (100vh - 3.28rem)
  overflow-y auto
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
        margin-right .5rem

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

      .chart-popover-1
        height 2rem

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