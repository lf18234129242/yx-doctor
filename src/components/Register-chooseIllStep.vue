<template>
  <div class="Register-chooseIllStep">
    <h1>请选择病程</h1>
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell
          v-for="(item,index) in radioList"
          :key="index"
          :title="item.NAME"
          clickable
          @click="radio = item.id"
        >
          <van-radio slot="right-icon" :name="item.id" checked-color="#16A332" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <van-button @click="next" type="primary" color="#16A332">下一步</van-button>
  </div>
</template>

<script>
import { yinxing } from "@/utils/http"
import { count, getStrParam } from "@/utils/count";
export default {
  data() {
    return {
      radio: 1,
      radioList: [],
      token: "",
      push_id: "",
    };
  },
  mounted() {
    let token = sessionStorage.getItem("token");
    let push_id = sessionStorage.getItem("push_id");
    this.token = token;
    this.push_id = push_id;
    if (!token) {
      let href = window.location.href
      // let href = "https://www.okginko.com/index.html?token=ouYrs1YZ2D4DVAbxbmBCgjMUv72Y&push_id=2";
      this.token = getStrParam(href, "token");
      this.push_id = getStrParam(href, "push_id");
      count(this.push_id, this.token);
      sessionStorage.setItem("token", this.token);
      sessionStorage.setItem("push_id", this.push_id);
    }
    this.getIllStep()
  },
  methods: {
    getIllStep() {
      yinxing.getProcessList({token: this.token}).then(res => {
        if (res.data.code === 0) {
          this.radioList = res.data.data;
        }
      })
    },
    next() {
      yinxing.processSave({
        token: this.token,
        processId: this.radio
      }).then(res => {
        if (res.data.code === 0) {
          this.$router.push("/RegisterPatient");
        }
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
.Register-chooseIllStep {
  width: 100%;
  position: absolute;
  h1 {
    font-size: 0.96rem;
    color: #333;
    font-weight: 600;
    padding-left: 0.6rem;
    box-sizing: border-box;
    margin: 2.18rem 0 1.18rem;
  }
  .van-cell {
    height: 1.76rem;
    font-size: 0.6rem !important;
    color: #333;
    display: flex;
    align-items: center;
  }
  .van-button {
    width: 100%;
    height: 1.76rem;
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: 0.56rem;
    color: #fff;
  }
}
</style>