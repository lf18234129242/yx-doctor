<template>
  <div class="Doctors-order">
    <div class="title_box">
      <p class="warn">{{doctorOrderList[0].user_name ? doctorOrderList[0].user_name : '你好'}}，{{doctorOrderList[0].text1}}</p>
      <van-image
        width="3.88rem"
        height="3.88rem"
        fit="contain"
        lazy-load
        :src="doctorOrderList[0].avatar_url"
      />
    </div>
    <section>
      <div class="score_box">
        <img class="step" src="@/assets/img/step.png" alt="">
        <p>健康进度 {{ill_score}}%</p>
        <img 
          v-for="(item, index) in firstCount" 
          :key="index" 
          :style="{left: (2.5 + item * 0.5) + 'rem'}"
          src="@/assets/img/step-green-2.png"
          class="green_2"
        >
        <img 
          v-for="(item, index) in secondCount" 
          :key="index + '-label'" 
          src="@/assets/img/step-green-1.png" 
          class="green_1"
          :style="{left: (secondScore + item * 0.5) + 'rem'}"
        >
      </div>
      <div class="warn_date">
        {{doctorOrderList[0].create_time | filterDate}} {{doctorOrderList[0].recovery}}
      </div>
      <div class="zindex_0 padding8" v-if="pushType !== 4">
        <div v-for="(item, index) in doctorOrderList" :key="index">
          <div v-html="item.content"></div>
        </div>
      </div>
      <div class="zindex_0" v-else>
        <div class="padding8">
          <div v-html="doctorOrderList[0].content1"></div>
          <router-link :to="{path:'/DoctorsDetails', query:{illnessId: illnessId, type: type_1}}"  v-if="doctorOrderList[0].content1_link">
            <img class="detail_img" :src="type_1 == 8 ? doctorImg_1 : type_1 == 10 ? doctorImg_3 : type_1 == 11 ? doctorImg_2 : type_1 == 12 ? doctorImg_4 : ''" alt="">
          </router-link>
        </div>
        <div class="padding8" style="background:#ECF5EE!important">
          <div v-html="doctorOrderList[0].content2"></div>
          <router-link :to="{path:'/DoctorsDetails', query:{illnessId: illnessId, type: type_2}}"  v-if="doctorOrderList[0].content2_link">
            <img class="detail_img" :src="type_2== 8 ? doctorImg_1 : type_2== 10 ? doctorImg_3 : type_2== 11 ? doctorImg_2 : type_2== 12 ? doctorImg_4 : ''" alt="">
          </router-link>
        </div>
        <div class="padding8">
          <div v-html="doctorOrderList[0].content3"></div>
          <router-link :to="{path:'/DoctorsDetails', query:{illnessId: illnessId, type: type_3}}"  v-if="doctorOrderList[0].content3_link">
            <img class="detail_img" :src="type_3 == 8 ? doctorImg_1 : type_3 == 10 ? doctorImg_3 : type_3 == 11 ? doctorImg_2 : type_3 == 12 ? doctorImg_4 : ''" alt="">
          </router-link>
        </div>
        <div class="padding8" style="background:#ECF5EE!important">
          <div v-html="doctorOrderList[0].content4"></div>
          <router-link :to="{path:'/DoctorsDetails', query:{illnessId: illnessId, type: type_4}}"  v-if="doctorOrderList[0].content4_link">
            <img class="detail_img" :src="type_4 == 8 ? doctorImg_1 : type_4 == 10 ? doctorImg_3 : type_4 == 11 ? doctorImg_2 : type_4 == 12 ? doctorImg_4 : ''" alt="">
          </router-link>
        </div>
      </div>
    </section>
    <footer>
      <img src="@/assets/img/bottom.png" class="bottom" alt />
      <p>如果觉得情况不符合，可以进行调整或给我留言</p>
      <!-- <img class="signature_url" v-if="doctorOrderList[0].signature_url" :src="doctorOrderList[0].signature_url" alt="">
      <p v-else class="doctor_name">{{doctorOrderList[0].doctorName}}</p> -->
      <p class="doctor_name">{{doctorOrderList[0].doctorName}}</p>
    </footer>
  </div>
</template>
<script>
import { yinxing } from "@/utils/http"
import { count, getStrParam, showHtml } from "@/utils/count";
export default {
  name: 'DoctorsOrder',
  data() {
    return {
      doctorOrderList: [{
        user_name: '',
        create_time: '',
        recovery: '',
        text1: '',
        avatar_url: '',
        content1: '',
        content1_link: '',
        content2: '',
        content2_link: '',
        content3: '',
        content3_link: '',
        content4: '',
        content4_link: '',
        doctorName: '',
        signature_url: '',
      }],
      pushType: '',
      push_id: '',
      token: '',
      type: '',
      ill_score: 0,
      firstCount: 0,
      secondCount: 0,
      secondScore: 0,
      illnessId: 0,
      type_1: 0,
      type_2: 0,
      type_3: 0,
      type_4: 0,
      doctorImg_1: require('@/assets/img/detail-1.png'),
      doctorImg_2: require('@/assets/img/detail-2.png'),
      doctorImg_3: require('@/assets/img/detail-3.png'),
      doctorImg_4: require('@/assets/img/detail-4.png'),
    }
  },
  mounted() {
    let href = window.location.href
    // let href = "https://www.okginko.com/index.html?token=ouYrs1Y3ri3ke2Wyk-7Q7njCAE4o&push_id=64&type=1";
    this.token = getStrParam(href, "token");
    this.push_id = getStrParam(href, "push_id");
    this.type = getStrParam(href, "type");
    sessionStorage.setItem("token", this.token);
    sessionStorage.setItem("push_id", this.push_id);
    sessionStorage.setItem("type", this.type);
    count(this.push_id, this.token);
    this.getDoctorOrder()
  },
  filters: {
    filterDate(val) {
      return val.replace(/-/g, '月') + '日'
    }
  },
  methods: {
    computeScore() {
      let count = 18
      this.firstCount = Math.round(count * this.ill_score / 100)
      this.secondCount = count - this.firstCount
      this.secondScore = this.firstCount * 0.5 + 2.5
    },
    getDoctorOrder () {
      yinxing.doctorsOrder({
        token: this.token,
        type: this.type,
        pushId: this.push_id
      }).then(res => {
        if (res.data.code === 0) {
          let item = res.data.data[0]
          this.ill_score = item.illness_score
          this.doctorOrderList = JSON.parse(showHtml(JSON.stringify(res.data.data)))
          this.pushType = res.data.pushType
          this.computeScore()
          if (res.data.pushType === 4) {
            if (item.content1_link) {
              this.illnessId = getStrParam((item.content1_link).replace(/amp;/, ''), 'illnessId')
              this.type_1 = getStrParam((item.content1_link).replace(/amp;/, ''), 'type')
            }
            if (item.content2_link) {
              this.illnessId = getStrParam((item.content2_link).replace(/amp;/, ''), 'illnessId')
              this.type_2 = getStrParam((item.content2_link).replace(/amp;/, ''), 'type')
            }
            if (item.content3_link) {
              this.illnessId = getStrParam((item.content3_link).replace(/amp;/, ''), 'illnessId')
              this.type_3 = getStrParam((item.content3_link).replace(/amp;/, ''), 'type')
            }
            if (item.content4_link) {
              this.illnessId = getStrParam((item.content4_link).replace(/amp;/, ''), 'illnessId')
              this.type_4 = getStrParam((item.content4_link).replace(/amp;/, ''), 'type')
            }
          }
        }
      })
    }
  }
};
</script>

<style lang="stylus">
p{
  a{
    img {
      width: 12.2rem;
      height: auto;
      border-radius: .2rem;
      display: block;
      margin: .6rem 0 0 0;
    }
  }
}
</style>
<style lang="stylus" scoped>
.Doctors-order {
  width: 100%;
  min-height: 100vh;
  padding: 0.8rem 0.6rem;
  box-sizing: border-box;
  background: linear-gradient(#35af4d, #16a332);
  position: relative;
  z-index: 0;
  overflow: hidden;
  &::before {
    width: 17rem;
    height: 17rem;
    background: linear-gradient(
      0deg,
      rgba(22, 163, 50, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: 50%;
    content: "";
    position: absolute;
    left: -7.82rem;
    top: -12rem;
    z-index: -1;
  }
  &::after {
    width: 12.9rem;
    height: 12.9rem;
    background: linear-gradient(
      0deg,
      rgba(22, 163, 50, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: 50%;
    content: "";
    position: absolute;
    right: -5.18rem;
    top: 1rem;
    z-index: -1;
  }
  .title_box {
    width: 100%;
    height: 3.88rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.6rem;
    box-sizing: border-box;
    .warn {
      font-size: 0.48rem;
      color: #e1fce7;
      width: 8rem;
      font-weight: 400;
      line-height: 0.8rem;
    }
    .doctor {
      width: 3.88rem;
      height: 3.88rem;
    }
  }
  section {
    width: 100%;
    min-height: 75vh;
    background: #fff;
    border-radius: 0.4rem;
    margin-top: 0.8rem;
    padding: 0.8rem 0 7.5rem;
    box-sizing: border-box;
    .padding8{
      padding: 0.8rem;
      box-sizing: border-box;
    }
    .zindex_0{
      z-index: 2;
    }
    .detail_img{
      width: 12.2rem;
      height: 4rem;
      border-radius: .2rem;
      display: block;
      margin: .6rem 0 0 0;
    }
    .score_box{
      width: 12.6rem;
      height: 2.52rem;
      margin: 0 .8rem .74rem;
      position: relative;
      .step{
        width: 100%;
        height: 100%;
      }
      p{
        font-size: .6rem;
        color: #1FA63A;
        font-weight: bold;
        position: absolute;
        left: 3.64rem;
        top: .2rem;
      }
      .green_1,.green_2{
        width: .78rem;
        height: .84rem;
        position: absolute;
        top: 1.16rem;
      }
    }
    .warn_date{
      width: 13.8rem;
      height: 1.76rem;
      background: #ECF5EE;
      display: flex;
      align-items: center;
      font-size: .6rem;
      color: #010101;
      padding: 0 .78rem;
      box-sizing: border-box;
    }
    .warn_title{
      width:13.8rem;
      height:1.76rem;
      background:rgba(236,245,238,1);
      margin-left: -0.8rem;
      padding: 0 .6rem 0 .8rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p{
        color: #010101;
        font-size: .6rem;
      }
      h3{
        color: #16A332;
        font-size: .6rem;
        cursor: pointer;
      }
    }
    .content{
      font-size: .6rem;
      line-height: .96rem;
      font-weight: 400;
      margin-top: 1rem;
    }
    .a_href{
      font-size: .6rem;
      color: #16A332;
      line-height: .96rem;
      font-weight: 400;
      text-decoration: underline;
    }
  }
  footer {
    width: 100%;
    height: 6.68rem;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 2.4rem 1.2rem 0;
    box-sizing: border-box;
    .bottom {
      width: 15rem;
      height: 6.68rem;
      position: absolute;
      left: 0;
      top: 0.6rem;
      z-index: 2;
    }
    .signature_url{
      width: 3.6rem;
      height: auto;
      z-index: 2;
      position: absolute;
      right: 0.5rem;
    }
    p {
      font-size: 0.6rem;
      color: #fefefe;
      width: 9.3rem;
      line-height: 0.96rem;
      z-index: 3;
      position: absolute;
      left: 1.2rem;
      top: 2.7rem;
    }
    .doctor_name {
      font-size: 0.6rem;
      color: #fefefe;
      text-align: right;
      width: 100%;
      z-index: 3;
      position: absolute;
      left: 0rem;
      top: 4.4rem;
      padding: 0 1.2rem;
      box-sizing: border-box;
    }
  }
}
</style>