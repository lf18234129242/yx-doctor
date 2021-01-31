<template>
  <div class="RegisterBindPhoneNum">
    <h1>绑定手机号</h1>
    <li class="phone-num">
      <input type="number" v-model="phone_num" placeholder="请输入手机号" />
    </li>
    <li class="reg-num">
      <input type="number" v-model="reg_num" placeholder="请输入验证码" />
      <div class="get-reg-num" @click="getRegNum">{{timeout}}</div>
    </li>

    <van-button color="#16A332" round type="info" @click="next">下一步</van-button>
  </div>
</template>

<script>
import { yinxing } from "@/utils/http"
import { count, getStrParam } from "@/utils/count";
export default {
  data() {
    return {
      phone_num: "",
      reg_num: "",
      phoneCode: "",
      timeout: "获取验证码",
      isGetRegNum: true,
      token: "",
      push_id: ""
    };
  },
  mounted() {
    let token = sessionStorage.getItem("token");
    let push_id = sessionStorage.getItem("push_id");
    this.token = token;
    this.push_id = push_id;
    if (!token) {
      let href = window.location.href
      // let href = "https://www.okginko.com/index.html?token=ouYrs1Y3ri3ke2Wyk-7Q7njCAE4o&push_id=2";
      this.token = getStrParam(href, "token");
      this.push_id = getStrParam(href, "push_id");
      count(this.push_id, this.token);
      sessionStorage.setItem("token", this.token);
      sessionStorage.setItem("push_id", this.push_id);
    }
  },
  methods: {
    next() {
      if (!this.reg_num) {
        this.$toast("请输入验证码");
        return false;
      }
      if (this.reg_num == this.phoneCode) {
        this.savePhoneNum();
      } else {
        this.$toast("验证码输入错误");
      }
    },
    savePhoneNum() {
      yinxing.phoneSave({
        phoneNumber: this.phone_num,
        token: this.token
      }).then(res => {
        if (res.data.code === 0) {
          this.$router.push({
            path: "/WechatCode"
            // path: "/RegisterSubmitPicture"
          })
        }
      })
    },
    // 获取验证码
    getRegNum() {
      let second = 60;
      let regPhoneNum = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      if (!this.phone_num) {
        this.$toast("请输入您的手机号");
        return false;
      }
      if (!regPhoneNum.test(this.phone_num)) {
        this.$toast("请检查您的的手机号是否正确");
        return false;
      }
      if (this.isGetRegNum) {
        this.timeout = `${second}后重新获取`;
        let timer = setInterval(() => {
          if (second > 0) {
            second--;
            this.timeout = `${second}后重新获取`;
            this.isGetRegNum = false;
          } else {
            this.timeout = "重新获取";
            clearInterval(timer);
            this.isGetRegNum = true;
          }
        }, 1000);
      }
      this.getPhoneCode();
    },
    getPhoneCode() {
      yinxing.getPhoneCode({
        phoneNumber: this.phone_num,
        token: this.token
      }).then(res => {
        this.$toast("验证码发送成功")
        this.phoneCode = res.data.code
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
.RegisterBindPhoneNum {
  width: 100%;
  position: absolute;
  padding: 0 0.6rem;
  box-sizing: border-box;
  h1 {
    width: 100%;
    height: 5.4rem;
    line-height: 5.4rem;
    font-size: 0.96rem;
    color: #333;
    font-weight: 600;
  }
  li {
    width: 100%;
    height: 3rem;
    border-bottom: 0.02rem solid #d0d0d0;
    padding-top: 0.4rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      border: none;
      width: 9.8rem;
      height: 1rem;
      font-size: 0.56rem;
    }
    .get-reg-num {
      width: 3.96rem;
      height: 1rem;
      text-align: center;
      line-height: 1rem;
      color: #16a332;
      font-weight: 400;
      font-size: 0.56rem;
      border-left: 1px solid #d0d0d0;
    }
  }
  .reg-num {
    margin-bottom: 2.8rem;
  }
  .van-button {
    width: 11.8rem;
    height: 1.76rem;
    margin-left: 1rem;
  }
}
</style>