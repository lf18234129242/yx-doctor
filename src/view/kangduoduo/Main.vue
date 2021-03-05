<template>
  <div class="my-center-box">
    <component :is="componentId"></component>
    <div class="footer-bar-box flex-m-sa">
      <div 
        :class="['bar-item flex-m-c', item.id === activeId ? 'active-item' : '']"
        v-for="item in tabBar"
        :key="item.id"
        @click="handleCheckTab(item.id)"
      >
        <i :class="['iconfont', item.iconfont]"></i>
        <span class="label">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import MainJZMa from './MainJZMa'
import MainHuDong from './MainHuDong'
import MainUpdate from './MainUpdate'

export default {
  data() {
    return {
      activeId: 1,
      componentId: MainJZMa,
      tabBar: [
        { id: 1, name: '就诊码', iconfont: 'iconerweima' },
        { id: 2, name: '互动', iconfont: 'iconxiaoxi' },
        { id: 3, name: '升级', iconfont: 'iconaixin' }
      ],
      tabBarJson: {
        1: MainJZMa,
        2: MainHuDong,
        3: MainUpdate
      }
    }
  },
  mounted () {
    let tabId = +this.$route.query.tab
    this.activeId = tabId
    this.componentId = this.tabBarJson[tabId]
  },
  methods: {
    handleCheckTab(id) {
      this.activeId = id
      this.componentId = this.tabBarJson[id]
    }
  },
}
</script>

<style lang="stylus" scoped>
.my-center-box
  width 100%
  min-height 100vh
  background #F2F2F2
  padding-bottom 3rem

.footer-bar-box
  width 100%
  height 2.8rem
  background #fff
  position fixed
  left 0
  bottom 0
  padding .48rem 0 .28rem
  border-top 1px solid #F2F2F2

  .active-item
    color #16A332

  .bar-item
    flex 1
    flex-direction column

    &:nth-child(2)
      border-left 2px solid #F2F2F2
      border-right 2px solid #F2F2F2

    .iconfont
      font-size 1.04rem

    .label
      font-size .72rem
      margin-top .2rem


</style>