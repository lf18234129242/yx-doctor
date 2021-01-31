<template>
  <div class="patient-box">
    <h1>请输入您的信息</h1>
    <div class="cell-box">
      <p>姓名</p>
      <input type="text" v-model="username" placeholder="请输入您的姓名" />
    </div>
    <div class="cell-box select-arrow" @click="selectSex">
      <p>性别</p>
      <input disabled type="text" v-model="usersex" placeholder="点击选择" />
    </div>
    <div class="cell-box select-arrow" @click="selectAge">
      <p>年龄</p>
      <input disabled type="text" v-model="userage" placeholder="点击选择" />
    </div>
    <div class="cell-box">
      <p>手机</p>
      <input type="number" v-model="phone_num" placeholder="请输入手机号" />
    </div>
    <div class="cell-box">
      <p>验证码</p>
      <input class="reg_input" type="number" v-model="reg_num" placeholder="请输入验证码" />
      <div class="get-reg-num" @click="getRegNum">{{timeout}}</div>
    </div>

    <!-- 选择性别弹出框 -->
    <van-popup v-model="show_sex" round position="bottom">
      <ul @click="chooseSex">
        <li class="nan" :data-index="1">男</li>
        <li class="nv" :data-index="2">女</li>
        <li class="cancel" :data-index="3">取消</li>
      </ul>
    </van-popup>
    <!-- 选择年龄弹出框 -->
    <van-popup v-model="show_age" round position="bottom">
      <van-picker
        show-toolbar
        title="选择年龄"
        :columns="age_columns"
        :default-index="30"
        @cancel="onCancel_age"
        @confirm="onConfirm_age"
      />
    </van-popup>
    <van-button type="primary" color="#16A332" :disabled="disabledNext" @click="next">下一步</van-button>
  </div>
</template>

<script>
import { yinxing } from "@/utils/http"
import { getStrParam, XSSReg } from "@/utils/count";
export default {
  name: 'RegisterAll',
  data() {
    return {
      disabledNext: false,
      phone_num: "",
      reg_num: "",
      phoneCode: "",
      username: "",
      usersex: "",
      userage: "",
      timeout: "获取验证码",
      isGetRegNum: true,
      gender: null,
      show_sex: false,
      show_age: false,
      sex_columns: ["男", "女"],
      age_columns: [],
      token: "",
      userId: "",
      doctorId: "",
      // myIntegral: "",
    };
  },
  mounted() {
    let href = window.location.href
    this.token = getStrParam(href, "token");
    this.userId = getStrParam(href, "userId");
    this.doctorId = getStrParam(href, "doctorId");
    sessionStorage.setItem("token", this.token);
    this.disabledNext = false
  },
  methods: {
    // 下一步
    next() {
      let username = this.username.trim().replace(XSSReg, '')
      let phone_num = this.phone_num.trim().replace(XSSReg, '')
      let reg_num = this.reg_num.trim().replace(XSSReg, '')
      if (username == "") {
        this.$toast("请输入您的姓名");
        return false;
      }
      if (this.usersex == "") {
        this.$toast("请选择您的性别");
        return false;
      }
      if (this.userage == "") {
        this.$toast("请选择您的年龄");
        return false;
      }
      if (!phone_num) {
        this.$toast("请输入您的手机号");
        return false;
      }
      if (!reg_num) {
        this.$toast("请输入验证码");
        return false;
      }
      if (reg_num != this.phoneCode) {
        this.$toast("验证码输入错误");
        return false;
      }
      this.disabledNext = true
      yinxing.messageSave1({
        doctorId: this.doctorId,
        phoneNumber: phone_num,
        age: this.userage,
        gender: this.gender,
        name: username,
        token: this.token
      }).then(res => {
        if (res.data.code === 0) {
          // this.getTotalIntegral()
					// this.myIntegral = res.data.totalIntegral
					// if (this.myIntegral < 20) {
						// this.$router.push({
						// 	path: '/Share',
						// 	query: {
            //     userId: this.userId,
            //     doctorId: this.doctorId,
            //     token: this.token
						// 	}
						// })
					// } else {
            this.$router.push({
              path: "/SubmitTheIllness",
              query: {
                token: this.token,
                userId: this.userId,
                doctorId: this.doctorId
              }
            })
          // }
        }
      })
    },
		// getTotalIntegral() {
		// 	duoduo.getTotalIntegral({token: this.token}).then(res => {
		// 		if (res.data.code === 0) {
		// 			this.myIntegral = res.data.totalIntegral
		// 			if (this.myIntegral < 20) {
		// 				this.$router.push({
		// 					path: '/Share',
		// 					query: {
    //             userId: this.userId,
    //             doctorId: this.doctorId,
    //             token: this.token
		// 					}
		// 				})
		// 			} else {
    //         this.$router.push({
    //           path: "/SubmitTheIllness",
    //           query: {
    //             token: this.token,
    //             userId: this.userId,
    //             doctorId: this.doctorId
    //           }
    //         })
    //       }
		// 		}
		// 	})
		// },
    selectSex() {
      this.show_sex = true;
    },
    chooseSex(event) {
      switch (event.target.innerHTML) {
        case "男":
          this.usersex = "男";
          this.gender = 1;
          this.show_sex = false;
          break;
        case "女":
          this.usersex = "女";
          this.gender = 2;
          this.show_sex = false;
          break;
        case "取消":
          this.show_sex = false;
          break;
      }
    },
    selectAge() {
      for (let i = 0; i < 121; i++) {
        this.age_columns.push(i);
      }
      this.show_age = true;
    },
    onConfirm_age(value) {
      this.userage = value;
      this.show_age = false;
    },
    onCancel_age() {
      this.show_age = false;
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
      if (!this.isGetRegNum) return false
      yinxing.getPhoneCode({
        phoneNumber: this.phone_num,
        token: this.token
      }).then(res => {
        this.$toast("验证码发送成功")
        this.phoneCode = res.data.verificationCode
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
.reg_input{
  width: 5rem!important;
}
.get-reg-num {
  width: 4.5rem;
  height: 1rem;
  text-align: center;
  line-height: 1rem;
  color: #16a332;
  font-weight: 400;
  font-size: 0.56rem;
  border-left: 1px solid #d0d0d0;
}
.reg-num {
  margin-bottom: 2.8rem;
}
.van-button {
  width: 11.8rem;
  height: 1.76rem;
}
.patient-box {
  width: 100%;
  position: absolute;
  h1 {
    font-size: 0.96rem;
    font-weight: 600;
    color: #333;
    width: 100%;
    height: 0.96rem;
    margin-top: 2.18rem;
    margin-bottom: 2.8rem;
    padding-left: 0.96rem;
    box-sizing: border-box;
  }
  .cell-box {
    width: 100%;
    // height: 150px;
    padding: 1.4rem 1.6rem 1.2rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    p {
      width: 2rem;
      font-size: 0.56rem;
      font-weight: 400;
      margin-right: 0.6rem;
      line-height: 0.6rem;
      position: relative;
    }
    input {
      width: 8.1rem;
      height: 0.6rem;
      border: none;
      font-size: 0.52rem;
      padding: 0;
      background: #fff;
    }
    p::after {
      content: "";
      position: absolute;
      left: 1.6rem;
      bottom: -1.02rem;
      width: 10.1rem;
      height: 0.02rem;
      background: #d0d0d0;
    }
  }
  .select-arrow {
    position: relative;
  }
  .select-arrow::before {
    content: "";
    width: 0.4rem;
    height: 0.4rem;
    background: #acacac;
    position: absolute;
    right: 1.8rem;
    top: 1.56rem;
    transform: rotate(45deg);
  }
  .select-arrow::after {
    content: "";
    width: 0.4rem;
    height: 0.4rem;
    background: #fff;
    position: absolute;
    right: 1.84rem;
    top: 1.56rem;
    transform: rotate(45deg);
  }
  .nan,
  .nv,
  .cancel {
    width: 100%;
    height: 1.76rem;
    text-align: center;
    line-height: 1.76rem;
    font-size: 0.6rem;
  }
  .nan,
  .nv {
    color: #666;
    position: relative;
  }
  .nan::after {
    content: "";
    width: 13.8rem;
    height: 1px;
    background: #f2f2f2;
    position: absolute;
    left: 0.6rem;
    bottom: 0;
  }
  .cancel {
    color: #bbb;
    border-top: 1px solid #000;
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