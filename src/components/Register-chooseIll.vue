<template>
  <div class="hello">
    <!-- <div class="search-box">
      <input class="search" type="text" v-model="search_data" placeholder="输入疾病名称或编码" />
    </div> -->

    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell
          v-for="(item,index) in radioList"
          :key="index"
          :title="item.name"
          clickable
          @click="radio = item.id"
        >
          <van-radio slot="right-icon" :name="item.id" checked-color="#16A332" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-button @click="submit" type="primary" color="#16A332">下一步</van-button>
  </div>
</template>

<script>
import { yinxing } from "@/utils/http"
import { count, getStrParam } from "@/utils/count"
export default {
  name: "Register-chooseIll",
  data() {
    return {
      search_data: "", //搜索内容
      radio: null,
      radioList: [],
      token: "",
      push_id: ""
    };
  },
  mounted() {
    let href = window.location.href
    // let href = "https://admin.okginko.com/ginkgo-admin/wx/api/wxRoute?token=ouYrs1YZ2D4DVAbxbmBCgjMUv72Y&push_id=57";
    this.token = getStrParam(href, "token");
    this.push_id = getStrParam(href, "push_id");
    count(this.push_id, this.token);
    sessionStorage.setItem("token", this.token);
    sessionStorage.setItem("push_id", this.push_id);
    this.getIllList();
  },
  computed: {
    newRadioList() {
      var _this = this;
      var newRadioList = [];
      _this.radioList.map(item => {
        if (item.title.search(_this.search_data) != -1) {
          newRadioList.push(item);
        }
      });
      return newRadioList;
    }
  },
  methods: {
    getIllList() {
      yinxing.getIllList({
        token: this.token
      }).then(res => {
        if (res.data.code === 0) {
          this.radioList = res.data.data;
        }
      })
    },
    submit() {
      if (!this.radio) {
        this.$toast('请选择疾病')
        return false
      }
      yinxing.illnessSave({
        illnessId: this.radio,
        token: this.token
      }).then(res => {
        if (res.data.code === 0) {
          this.$router.push("/RegisterChooseIllStep");
        }
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.hello {
  width: 100%;
  position: absolute;
}
.search-box {
  width: 15rem;
  height: 2rem;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  .search {
    width: 11rem;
    height: 1.36rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.68rem;
    border: none;
    text-align: center;
    line-height: 1.36rem;
    font-size: 0.44rem;
    font-weight: 400;
  }
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
</style>
