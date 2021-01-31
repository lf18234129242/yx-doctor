<template>
  <div class="LoginDoctor">
    <h1>登录</h1>
    <div class="cell-box pr">
      <p>姓名</p>
      <input 
        type="text" 
        v-model="username" 
        placeholder="请输入您的账号" 
        @focus="handleGetLoc"
        @input="handleInputAccount"
      />
      <transition name="van-fade">
        <div 
          v-show="hasAccountLoc"
          class="user_name_loc"
        >
          <div 
            class="accout_name"
            v-for="item in accountList"
            :key="item.username"
            @click="handleLogin(item)"
          >{{item.username}}</div>
        </div>
      </transition>
    </div>
    <div class="cell-box">
      <p>密码</p>
      <input type="password" v-model="password" placeholder="请输入您的密码" />
    </div>
    <van-button type="primary" color="#16A332" :disabled="loginDis" @click="login">登录</van-button>
  </div>
</template>

<script>
import { duoduo } from "@/utils/http"
export default {
  name: 'LoginDoctor',
  data() {
    return {
      hasAccountLoc: false,
      username: '',
      password: '',
      loginDis: false,
      accountList: []
    }
  },
  watch: {
    username() {
      this.loginDis = false
    },
    password() {
      this.loginDis = false
    },
  },
  methods: {
    handleInputAccount() {
      this.hasAccountLoc = false
    },
    handleGetLoc() {
      let arr = JSON.parse(localStorage.getItem('account_list'))
      if (arr.length > 0) {
        this.hasAccountLoc = true
        this.accountList = arr
      }
    },
    handleLogin(item) {
      this.username = item.username
      this.password = item.password
      this.hasAccountLoc = false
    },
    setStorege() {
      let json = {
        username: this.username,
        password: this.password
      }
      let item = this.accountList.find(v => v.username === json.username)
      if (!item) {
        this.accountList.push(json)
      }
      localStorage.setItem('account_list', JSON.stringify(this.accountList))
    },
    login() {
      if (this.username.trim() === "") {
        this.$toast("请输入您的账号");
        return false;
      }
      if (this.password.trim() === "") {
        this.$toast("请选择您的密码");
        return false;
      }
      this.loginDis = true
      let params = {
        loginName: this.username,
        password: this.password
      }
      duoduo.doctorLogin(params).then(res => {
        if (res.data.code === 0) {
          this.setStorege()
          this.$router.push({
            path: '/ConsultList',
            query: {token: res.data.token}
          })
        }
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
.LoginDoctor{
  width: 100%;
  position: absolute;
  .van-button {
    width: 100%;
    height: 1.76rem;
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: 0.56rem;
    color: #fff;
  }
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
    height: 3rem;
    padding: 1.4rem 1.6rem 1.2rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .user_name_loc{
      width: 10.1rem;
      position: absolute;
      left: 3.2rem;
      top: 2.7rem;
      z-index: 3;
      box-shadow: 0px 0px 5px 5px #eee;
      .accout_name{
        width: 100%;
        height: 1.2rem;
        font-size: 0.6rem;
        line-height: 1.2rem;
        text-indent: 2em;
        background: #fff;
        border-bottom: 1px solid #f2f2f2;
      }
    }
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
}
</style>