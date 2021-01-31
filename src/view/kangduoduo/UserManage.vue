<template>
  <div class="UserManage">
    <div class="search-header-box">
      <van-search v-model="searchStr" @input="getUserList" placeholder="请输入姓名关键词" />
      <div class="header">
        <div>
          <span>用户数</span>
          <span>{{userJson.opcList.length}}</span>
        </div>
        <div>
          <span>门诊扫码次数</span>
          <span>{{userJson.opcCount}}</span>
        </div>
        <div>
          <span>裂变人数</span>
          <span>{{userJson.fissionCount}}</span>
        </div>
      </div>
    </div>
    <div class="user_list_box">
      <div 
        class="user_item ripple"
        v-for="(item, index) in userJson.opcList"
        :key="item.userId"
        @click="handleDetail(item)"
      >
        <span class="index">{{index + 1}}</span>
        <img :src="item.headimgUrl" alt="">
        <div>
          <div class="user_item_name">
            <span class="nick_name">{{item.nickName | filterNoData}}</span>
            <span :class="['source', item.userType == 1 ? 'yellow' : 'blue']">{{item.userType == 1 ? '门诊' : '裂变'}}</span>
            <span class="scan_time">{{item.createTime | filterCteateTime}}</span>
          </div>
          <div class="user_item_info">
            <span class="user_name">{{item.name | filterNoData}}</span>
            <span class="age">{{item.age | filterNoData}}岁</span>
            <span class="gender">{{item.gender | filterNoData}}</span>
            <span class="phone">{{item.phoneNumber | filterNoData}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="kong"></div>
    <nav>
      <div @click="handleLink">问题列表</div>
      <div class="current_page">用户管理</div>
    </nav>
    <van-dialog
      v-model="showUserInfo"
      title=""
      showCancelButton
      @confirm="saveProcess"
      className="user_info_dialog_box"
    >
      <div class="user_info_dialog">
        <div class="user_info_item">
          <span>微信昵称：</span>
          <span>{{userInfo.nickName}}</span>
        </div>
        <div class="user_info_item">
          <span>姓名：</span>
          <span>{{userInfo.name}}</span>
        </div>
        <div class="user_info_item">
          <span>性别：</span>
          <span>{{userInfo.gender}}</span>
        </div>
        <div class="user_info_item">
          <span>年龄：</span>
          <span>{{userInfo.age}}</span>
        </div>
        <div class="user_info_item">
          <span>电话：</span>
          <span>{{userInfo.phoneNumber}}</span>
        </div>
        <div class="user_info_item">
          <span>疾病：</span>
          <span 
            @click="handleShowIllnessPicker"
            class="ill_picker pr"  
          >
            {{userInfo.illness}}
            <van-icon name="arrow-down" />
          </span>
        </div>
        <div class="user_info_item">
          <span>病程：</span>
          <span 
            @click="handleShowIllStepPicker"
            class="ill_picker pr"  
          >
            {{userInfo.illnessStep}}
            <van-icon name="arrow-down" />
          </span>
        </div>
        <div class="user_info_item">
          <span>备注：</span>
          <textarea cols="30" rows="10" v-model="user_mark"></textarea>
        </div>
      </div>
    </van-dialog>
    <!-- 疾病选择 -->
    <van-popup 
      v-model="showIllnessPicker" 
      round 
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="illnessList"
        @cancel="showIllnessPicker = false"
        @confirm="onConfirmIllness"
      />
    </van-popup>
    <!-- 病程选择 -->
    <van-popup 
      v-model="showIllStepPicker" 
      round 
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="illnessStepList"
        @cancel="showIllStepPicker = false"
        @confirm="onConfirmIllStep"
      />
    </van-popup>
  </div>
</template>

<script>
import { duoduo, yinxing } from "@/utils/http"
import { getStrParam } from "@/utils/count"
import { Toast } from 'vant'
export default {
  name: 'UserManage',
  data() {
    return {
      token: '',
      userJson: {
        opcList: [],
        opcCount: null,
        fissionCount: null
      },
      illnessList: [],
      illnessStepList: [],
      showIllnessPicker: false,
      showIllStepPicker: false,
      showUserInfo: false,
      userInfo: {},
      user_mark: '',
      searchStr: ''
    }
  },
  filters: {
    filterCteateTime(val) {
      return val.slice(0, 16)
    },
    filterNoData(val) {
      return val ? val : '--'
    }
  },
  mounted () {
    let href = window.location.href
    this.token = getStrParam(href, "token")
    this.getUserList()
  },
  methods: {
    saveProcess() {
      if (this.userInfo.illnessId && !this.userInfo.processId) {
        Toast('请选择病程')
        return false
      }
      let params = {
        illnessId: this.userInfo.illnessId,
        openId: this.userInfo.openId,
        processId: this.userInfo.processId,
        remake: this.user_mark,
        token: this.token
      }
      duoduo.processSave(params).then(res => {
        if (res.data.code === 0) {
          this.showUserInfo = false
          Toast('提交成功')
          this.user_mark = ''
          this.userInfo = {}
          this.getUserList()
        }
      })
    },
    getIllList(openId) {
      let params = {
        token: openId
      }
      yinxing.getIllList(params).then(res => {
        if (res.data.code === 0) {
          this.showUserInfo = true
          this.illnessList = res.data.data
          this.illnessList.forEach(item => {
            item.value = item.id
            item.text = item.name
          })
        }
      })
    },
    getProcessList() {
      let params = {
        token: this.userInfo.openId,
        illnessId: this.userInfo.illnessId
      }
      duoduo.getProcessList1(params).then(res => {
        if (res.data.code === 0) {
          this.illnessStepList = res.data.data
          this.illnessStepList.forEach(item => {
            item.value = item.id
            item.text = item.NAME
          })
          if (this.illnessStepList.length > 0) {
            this.userInfo.illnessStep = this.illnessStepList[0].text
            this.userInfo.processId = this.illnessStepList[0].id
          }
        }
      })
    },
    getUserList() {
      let params = {
        token: this.token,
        searchStr: this.searchStr
      }
      duoduo.getUserList(params).then(res => {
        if (res.data.code === 0) {
          this.userJson = res.data
        }
      })
    },
    handleLink() {
      this.$router.push({
        path: '/ConsultList',
        query: {
          token: this.token
        }
      })
    },
    handleDetail(data) {
      this.userInfo = data
      this.user_mark = data.doctorRemake
      if (data.userType !== '2') {
        this.getIllList(data.openId)
      } else {
        this.showUserInfo = true
      }
    },
    handleShowIllnessPicker() {
      if (this.illnessList.length > 0) {
        this.showIllnessPicker = true
      }
    },
    handleShowIllStepPicker() {
      if (this.illnessStepList.length > 0) {
        this.showIllStepPicker = true
      }
    },
    onConfirmIllness(data) {
      this.userInfo.illness = data.text
      this.userInfo.illnessId = data.value
      this.showIllnessPicker = false
      this.getProcessList()
    },
    onConfirmIllStep(data) {
      this.userInfo.illnessStep = data.text
      this.userInfo.processId = data.value
      this.showIllStepPicker = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.kong{
  width: 100%;
  height: 2rem;
}
.UserManage{
  width: 100%;
  height: 100vh;
  font-size: .6rem;
  .search-header-box{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
  }
  .header{
    width: 100%;
    height: 2rem;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    box-shadow:0px 2px 10px 0px rgba(0,105,83,0.3);
    background: #fff;
    div{
      height: 100%;
      padding: 0 .2rem;
      box-sizing: border-box;
      line-height: 1rem;
      font-size: .6rem;
      text-align: center;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      span{
        &:nth-child(1){
          color: #888;
        }
      }
    }
  }
  .user_list_box{
    width: 100%;
    margin: 4rem 0 2px;
    box-sizing: border-box;
    background: #fff;
    .user_item{
      width: 100%;
      height: 3rem;
      padding: 0 .5rem;
      border-bottom: .02rem solid #f1f1f1;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      .index{
        font-size: .6rem;
      }
      img{
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
        margin: 0 .5rem;
      }
      .user_item_name,.user_item_info{
        width: calc(100vw - 4rem);
        height: 1rem;
        display: flex;
        align-items: center;
        .scan_time,.phone{
          flex: 2;
          text-align: left;
        }
        .nick_name,.source,.user_name,.age,.gender{
          flex: 1;
          text-align: left;
        }
        span{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }
      }
    }
  }
  .yellow{
    color: #FFBA00;
  }
  .blue{
    color: blue;
  }
  nav{
    width: 100%;
    height: 2rem;
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    div{
      flex: 1;
      height: 100%;
      font-size: .8rem;
      display: flex;
      align-items: center;
      justify-content: center;
			background:linear-gradient(90deg,rgba(0,181,140,1) 0%,rgba(0,104,82,1) 99%);
			box-shadow:0px .1rem .2rem 0px rgba(0,106,84,0.3);
			color: #fff;
			font-weight:600;
    }
    .current_page{
      background: #fff;
      color: #000;
    }
  }
  .user_info_dialog_box{
    width: 70vw;
    .user_info_dialog{
      width: 100%;
      padding: 1rem;
      box-sizing: border-box;
      .user_info_item{
        display: flex;
        width: 100%;
        min-height: 1rem;
        align-items: center;
        span:nth-child(1){
          flex: 1;
          height: 100%;
          text-align: right;
        }
        span:nth-child(2){
          flex: 2;
          height: 100%;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .ill_picker{
          width: 100%;
          height: .8rem!important;
          display: inline-block;
          background: #f2f2f2;
          i{
            position: absolute;
            right: .1rem;
            top: .1rem;
          }
        }
        textarea{
          flex: 2;
          height: 3rem;
          resize: none;
          padding: .4rem;
          box-sizing: border-box;
        }
      }
    }
  }
}
.ripple {
    position: relative;
    //隐藏溢出的径向渐变背景
    overflow: hidden;
}

.ripple:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    //设置径向渐变
    background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .3s, opacity .5s;
}

.ripple:active:after {
    transform: scale(0, 0);
    opacity: .3;
    //设置初始状态
    transition: 0s;
}
</style>