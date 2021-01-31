<template>
  <div class="doctorsDetails">
    <header>
      <h1>{{vanTabs[0].illness_name}}</h1>
      <img src="@/assets/img/detail.png" alt />
    </header>
    <section>
      <van-tabs v-model="active" animated>
        <van-tab
          v-for="(item, index) in vanTabs"
          :key="index"
          :title="item.module_name"
          v-html="item.content"
        ></van-tab>
      </van-tabs>
    </section>
  </div>
</template>

<script>
import { yinxing } from "@/utils/http"
import { showHtml } from "@/utils/count";
export default {
  name: "doctorsDetails",
  data() {
    return {
      active: 0,
      vanTabs: [{
        illness_name: '',
      }],
      token: '',
      illnessId: '',
      type: '',
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("token");
    this.illnessId = this.$route.query.illnessId
    this.type = this.$route.query.type
    this.getTheoryInfo();
    switch(this.type) {
      case '8':
        this.active = 0
        break
      case '10':
        this.active = 1
        break
      case '11':
        this.active = 2
        break
      case '12':
        this.active = 3
        break
    }
  },
  methods: {
    getTheoryInfo() {
      yinxing.theoryInfo({
        token: this.token,
        illnessId: this.illnessId
      }).then(res => {
        if (res.data.code === 0) {
          this.vanTabs = JSON.parse(showHtml(JSON.stringify(res.data.data)))
        }
      })
    }
  }
};
</script>

<style lang="stylus">
.van-tab__pane, .van-tab__pane-wrapper {   
  padding: 0 20px;
  box-sizing: border-box;
  background: #fff;
  height: 71vh;
  overflow: scroll;
  img,video{
    width: 100%;
    height: auto;
    margin: 20px auto;
    display: block;
    border-radius: 10px;
  }
}
header {
  margin: 0.6rem;
  width: 13.8rem;
  height: 4.9rem;
  background: #16a332;
  position: relative;
  z-index: -2;
  overflow: hidden;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.6rem;
  box-sizing: border-box;
  &::before {
    content: "";
    width: 14rem;
    height: 14rem;
    background: linear-gradient(
      0deg,
      rgb(67, 185, 91) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: 50%;
    position: absolute;
    left: -7rem;
    top: -10rem;
    z-index: -1;
  }
  &::after {
    content: "";
    width: 14rem;
    height: 14rem;
    background: linear-gradient(
      0deg,
      rgb(109, 204, 128) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: 50%;
    position: absolute;
    right: -7rem;
    bottom: -10rem;
    z-index: -1;
  }
  h1 {
    font-size: 1.2rem;
    color: #dbfbe1;
    font-weight: 600;
    width: 7.44rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 3.3rem;
    height: 3.3rem;
  }
}
section{
  .van-tab--active{
    font-weight: 600;
    color: #000;
  }
  .van-tabs__line{
    background: #67C379;
    border-radius: 0;
    bottom: 1rem;
    height: .32rem;
  }
  .van-tab{
    z-index: 2;
    // min-width: none;
    padding: 0;
  }
  .van-tabs__content{
    width: 100%;
    min-height: 71vh;
    background: #F5F5F5;
  }
  .van-tab__pane{
    margin: .8rem;
    width: 13.4rem;
  }
}
</style>