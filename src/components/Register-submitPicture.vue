<template>
  <div class="RegisterSubmitPicture">
    <textarea v-model="textarea" cols="30" rows="10" placeholder="请输入患者病情资料或上传报告单" maxlength="300"></textarea>

    <van-uploader
      v-model="fileList"
      multiple
      :max-count="9"
      :before-read="beforeRead"
      :after-read="afterRead"
    />
    <van-button color="#16A332" round type="info" @click="next">提交</van-button>
  </div>
</template>

<script>
import { yinxing } from "@/utils/http"
import { Toast } from 'vant';
import { count, getStrParam, uploadBase64_url, XSSReg } from "@/utils/count";
export default {
  name: 'Register-submitPicture',
  data() {
    return {
      textarea: "",
      fileList: [],
      fileArr: [],
      token: "",
      push_id: ""
    };
  },
  mounted() {
    this.fileArr = [];
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
      let fileStr = this.fileArr.join(",");
      let textarea = this.textarea.trim().replace(XSSReg, '')
      if (textarea) {
        yinxing.datumSave({
          content: textarea,
          imgUrl: fileStr,
          token: this.token
        }).then(res => {
          if (res.data.code === 0) {
            this.fileArr = [];
            this.textarea = "";
            this.$router.push("/WechatCode")
          }
        })
      } else {
        this.$toast("请输入患者病情资料或上传报告单");
      }
    },
    // 上传图片
    afterRead(file) {
      Toast.loading({
        message:'正在上传中...',
        duration:0,
        forbidClick: true
      })
      this.axios
        .post(uploadBase64_url, {
          base64: file.content
        })
        .then(res => {
          this.$toast.success("上传成功");
          if (res.data.code === 0) {
            this.fileArr.push(res.data.url);
          } else {
            this.$toast(res.data.msg)
          }
        });
    },
    // 返回布尔值
    beforeRead(file) {
      if (file.type == "image/jpeg" || file.type == "image/png") {
        return true;
      } else {
        this.$toast("请上传 jpg/png 格式图片");
        return false;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.RegisterSubmitPicture {
  width: 100%;
  position: absolute;
  padding: 0.6rem;
  box-sizing: border-box;
  textarea {
    width: 100%;
    height: 5rem;
    font-size: 0.56rem;
    color: #333;
    border: none;
    line-height: 0.96rem;
    resize: none;
  }
  .van-button {
    margin-top: 4.8rem;
    width: 11.8rem;
    height: 1.76rem;
    margin-left: 1rem;
  }
}
</style>