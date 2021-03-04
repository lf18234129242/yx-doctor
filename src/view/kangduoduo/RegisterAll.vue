<template>
  <div class="patient-box">
    <h1>请输入您的信息</h1>
    <div class="cell-box">
      <p class="user-name-label">
        姓名<span class="must">*</span>
      </p>
      <input class="user-name" type="text" v-model="filter.name" placeholder="请输入您的姓名" />
      <div class="flex-m gender-box" @click="handleChangeGender()">
        <div :class="['gender-left flex-m-c', filter.gender === 2 ? 'active-gender' : '']">
          <i class="iconfont iconxingbienv"></i>
          女士
        </div>
        <div :class="['gender-right flex-m-c', filter.gender === 1 ? 'active-gender' : '']">
          <i class="iconfont iconxingbienan"></i>
          男士
        </div>
      </div>
    </div>
    <div class="cell-box select-arrow" @click="selectAge">
      <p>年龄<span class="must">*</span></p>
      <input @click="selectAge" disabled type="text" v-model="filter.age" placeholder="点击选择年龄" />
    </div>
    <div class="cell-box">
      <p>手机<span class="must">*</span></p>
      <input type="number" v-model="filter.phoneNumber" placeholder="请输入手机号" />
    </div>
    <div class="cell-box">
      <p>验证码<span class="must">*</span></p>
      <input class="reg_input" type="number" v-model="reg_num" placeholder="请输入验证码" />
      <div class="get-reg-num" @click="getRegNum">{{timeout}}</div>
    </div>
    <div class="cell-box select-arrow" @click="showIll = true">
      <p>疾病</p>
      <input disabled type="text" v-model="illText" placeholder="点击选择疾病" />
    </div>
    <div class="cell-box select-arrow" @click="showIllStep = true">
      <p>病程</p>
      <input disabled type="text" v-model="illStepText" placeholder="点击选择病程" />
    </div>
    <div class="cell-box" @click="showIllStep = true">
      <p>备注</p>
      <input disabled type="text" v-model="filter.description" placeholder="请输入备注信息" />
    </div>
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

    <!-- 选择疾病 -->
    <van-popup v-model="showIll" round position="bottom">
      <van-picker
        show-toolbar
        title="选择疾病"
        :columns="illList"
        value-key="name"
        @cancel="showIll = false"
        @confirm="onConfirmIll"
      />
    </van-popup>

    <!-- 选择病程 -->
    <van-popup v-model="showIllStep" round position="bottom">
      <van-picker
        show-toolbar
        title="选择疾病"
        :columns="illStepList"
        value-key="NAME"
        @cancel="showIllStep = false"
        @confirm="onConfirmIllStep"
      />
    </van-popup>

    <van-button type="primary" color="#16A332" :disabled="disabledNext" @click="next">下一步</van-button>
  </div>
</template>

<script>
import { yinxing, duoduo } from "@/utils/http"
import { getStrParam, XSSReg } from "@/utils/count";
// import BMap from 'BMap'
import BaiduMap from 'vue-baidu-map'
import Vue from 'vue'
import wx from 'weixin-js-sdk'

Vue.use(BaiduMap, {
	ak: 'fA0g4pvRrmFy45tziwe4QF1tOcaN54HC'
})

export default {
  name: 'RegisterAll',
  data() {
    return {
      filter: {
        description: '',
        province: '',
        city: '',
        area: '',
        illnessId: '',
        processId: '',
        age: "",
        phoneNumber: "",
        name: "",
        gender: 1,
        token: "",
        doctorId: ""
      },
      illStepText: '',
      illStep: '',
      illText: '',
      illStepList: [],
      illList: [],
      showIllStep: false,
      showIll: false,
      disabledNext: false,
      reg_num: "",
      phoneCode: "",
      usersex: "男",
      timeout: "获取验证码",
      isGetRegNum: true,
      show_age: false,
      sex_columns: ["男", "女"],
      age_columns: [],
      userId: "",
    };
  },
  mounted() {
    let href = window.location.href
    this.filter.token = getStrParam(href, "token");
    this.userId = getStrParam(href, "userId");
    this.filter.doctorId = getStrParam(href, "doctorId");
    sessionStorage.setItem("token", this.filter.token);
    this.disabledNext = false
    this.getIllList()
    // this.$nextTick(() => {
    //   this.wxAddress()
    // })
  },
  methods: {
    wxAddress() {
      let that = this
      // let u = navigator.userAgent;
      // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      // let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      // let request_url = ''
      // if (isAndroid) {
      //   this.isIOS = false;
      //   request_url = encodeURIComponent(location.href);
      // }
      // if (isIOS) {
      //   this.isIOS = true;
      //   request_url = encodeURIComponent(window.entryUrl);//这里是解决ios路由不刷新，获取签名失败的问题，具体使用见最后
      // }
      // let params = {
      //   url: request_url
      // }
      // let url = this.GLOBAL.API_WECHATLOGIN_GET_WECHAT_SIGN;//签名接口
      duoduo.jsInit({
        token: this.filter.token,
        // url: window.location.href.split('#')[0]
        url: 'https://www.okginko.com/index.html'
      }).then((res) => {
        // if (res.data.code === 0) {
          wx.config({ //配置微信接口
            debug: false,
            appId: res.data.appId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: ['openLocation', 'getLocation']
          });
          console.log('wx.getLocation', wx.getLocation)
          wx.ready(function () {
            console.log('-----------ready--------')
            // wx.openLocation({
            //   type: 'gcj02',
            //   success(res) {
            //     console.log('openLocation', res)
            //   },
            //   complete(com) {
            //     console.log({com})
            //   }
            // })
            wx.getLocation({
              type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function(res) {
                console.log({res}, '----------')
                // that.latitude = res.latitude;
                // that.longitude = res.longitude;
                //火星经纬度转百度地图经纬度
                // let x_PI = 3.14159265358979324 * 3000.0 / 180.0;
                // var lat =Number(res.latitude);
                // var lng =Number(res.longitude);
                // var z =Math.sqrt(lng * lng + lat * lat) +0.00002 * Math.sin(lat * x_PI);
                // var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
                // that.longitude = z*Math.cos(theta) + 0.0065;
                // that.latitude = z*Math.sin(theta) + 0.006; 
                that.detailAddress();
              },
              fail: function(err) {
                console.log('err+++++', {err})
                that.Toast({
                  message: err,
                  position: 'center',
                  duration: 2000
                })
              },
              complete(complete) {
                console.log({complete})
              }
            });
          });
          // wx.error(function (res) {
          //   that.Toast({
          //     message: res,
          //     position: 'center',
          //     duration: 5000
          //   })
          // });
        // } else {
        //   that.Toast({
        //     message: res.data.message,
        //     position: 'center',
        //     duration: 5000
        //   })
        // }
      })
    },
    detailAddress(){
      let that = this;
      let point = new BaiduMap.Point(that.longitude, that.latitude)
      let gc = new BaiduMap.Geocoder()
      gc.getLocation(point, function(rs){
        let addComp = rs.addressComponents
        this.filter.province = addComp.province
        this.filter.city = addComp.city
        this.filter.area = addComp.district
        // let street = addComp.street
        console.log('22222222', rs.addressComponents)
        // that.address=province+city+district+street
        console.log('33333333333', that.address)        
      })
    },
    onConfirmIllStep(value) {
      this.filter.processId = value.id
      this.illStepText = value.NAME
      this.showIllStep = false
    },
    onConfirmIll(value) {
      this.filter.illnessId = value.id
      this.illText = value.name
      this.showIll = false
      this.getIllStep()
    },
    handleChangeGender() {
      this.filter.gender = this.filter.gender === 1 ? 2 : 1
    },
    getIllStep() {
      duoduo.newList({
        token: this.filter.token,
        illnessId: this.filter.illnessId
      }).then(res => {
        if (res.data.code === 0) {
          this.illStepList = res.data.data
        }
      })
    },
    getIllList() {
      yinxing.getIllList({
        token: this.filter.token
      }).then(res => {
        if (res.data.code === 0) {
          this.illList = res.data.data
        }
      })
    },
    // 下一步
    next() {
      console.log(this.filter)
      let name = this.filter.name.trim().replace(XSSReg, '')
      let phoneNumber = this.filter.phoneNumber.trim().replace(XSSReg, '')
      let reg_num = this.reg_num.trim().replace(XSSReg, '')
      if (name == "") {
        this.$toast("请输入您的姓名");
        return false;
      }
      if (this.usersex == "") {
        this.$toast("请选择您的性别");
        return false;
      }
      if (this.filter.age == "") {
        this.$toast("请选择您的年龄");
        return false;
      }
      if (!phoneNumber) {
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
      yinxing.messageSave1(this.filter).then(res => {
        if (res.data.code === 0) {
          this.$router.push({
            path: "/SubmitTheIllness",
            query: {
              token: this.filter.token,
              userId: this.userId,
              doctorId: this.filter.doctorId
            }
          })
        }
      })
    },
    chooseSex(event) {
      switch (event.target.innerHTML) {
        case "男":
          this.usersex = "男";
          this.filter.gender = 1;
          break;
        case "女":
          this.usersex = "女";
          this.filter.gender = 2;
          break;
        case "取消":
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
      this.filter.age = value;
      this.show_age = false;
    },
    onCancel_age() {
      this.show_age = false;
    },
    // 获取验证码
    getRegNum() {
      let second = 60;
      let regPhoneNum = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      if (!this.filter.phoneNumber) {
        this.$toast("请输入您的手机号");
        return false;
      }
      if (!regPhoneNum.test(this.filter.phoneNumber)) {
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
        phoneNumber: this.filter.phoneNumber,
        token: this.filter.token
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
  min-height 100vh
  background #fff
  position: absolute;
  h1 {
    font-size: 0.96rem;
    font-weight: 600;
    color: #333;
    width: 100%;
    height: 0.96rem;
    margin-top: 2.18rem;
    margin-bottom: 1.2rem;
    padding-left: 0.96rem;
    box-sizing: border-box;
  }
  .cell-box {
    width: 100%;
    height: 2.2rem
    display: flex;
    align-items center
    padding: 0 .8rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .must{
      color red
    }
    .gender-box{
      width 5.1rem
      height 1.36rem
      border-radius .68rem
      background #EDEDED
      margin-left auto
      .active-gender{
        background #16A332
        color #fff!important
      }
      .gender-left,.gender-right{
        height 100%
        flex 1.1
        font-size .6rem
        color #999
        border-radius .68rem
      }
    }
    .user-name{
      width 4rem
    }
    p {
      width: 2rem;
      font-size: 0.56rem;
      font-weight: 400;
      margin-right: 0.6rem;
      line-height: 0.6rem;
      position: relative;
    }
    p::after {
      content: "";
      position: absolute;
      left: 2.5rem;
      bottom: -0.8rem;
      width: 10.1rem;
      height: 0.02rem;
      background: #d0d0d0;
    }
    input {
      width: 8.1rem;
      height: 1rem;
      border: none;
      font-size: 0.52rem;
      padding: 0;
      background: #fff;
    }
    .user-name-label::after {
      content: "";
      position: absolute;
      left: 2.5rem;
      bottom: -0.8rem;
      width: 5rem;
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
    right: 1.6rem;
    top: .9rem;
    transform: rotate(45deg);
  }
  .select-arrow::after {
    content: "";
    width: 0.4rem;
    height: 0.4rem;
    background: #fff;
    position: absolute;
    right: 1.64rem;
    top: .9rem;
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