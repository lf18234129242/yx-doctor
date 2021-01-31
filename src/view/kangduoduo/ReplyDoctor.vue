<template>
  <div class="ReplyDoctor">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getConsultInfo"
      >
        <div class="illness_desc" v-for="(item, index) in replyInfoList" :key="index">
          <h2>{{item.consult_flag === 1 ? '医生回复' : userName}}<span class="span">{{item.create_time}}</span></h2>
          <p>{{item.sick_desc}}</p>
          <div v-if="item.imgArr">
            <img 
              v-for="(jtem, index) in item.imgArr" 
              :key="index"
              :src="jtem"
              alt=""
              lazy-load
              @click="previewImage(index, item.imgArr)"
            >
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <div class="illness_desc" v-if="!has_reply">
      <h2>医生回复</h2>
      <textarea class="textarea" id="" cols="30" rows="10" v-model="doctor_reply"></textarea>
    </div>

		<van-button round class="put_question_again" @click="submit" :disabled="replyBtnSub">{{reply_btn_text}}</van-button>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import { ImagePreview } from 'vant'
import { XSSReg, getStrParam } from "@/utils/count"
import { duoduo } from "@/utils/http"
export default {
  name: 'ReplyDoctor',
  data() {
    return {
      has_reply: false,
      reply_btn_text: '回复',  // 补充回复
      token: '',
      doctor_reply: '',
      replyBtnSub: false,
      doctorName: '',
      consultId: '',
      limit: 10,
      page: 0,
      next_page: true,
      replyInfoList: [],
      diseaseImgs: '',
      doctorId: '',
      userName: '',
      loading: false,
      finished: false,
      refreshing: false,
    }
  },
  mounted () {
    let href = decodeURI(window.location.href)
    this.token = getStrParam(href, "token")
    this.consultId = getStrParam(href, "consultId")
    this.doctorId = getStrParam(href, "doctorId")
    this.doctorName = getStrParam(href, "doctorName")
		this.getConsultInfo()
  },
  methods: {
		onRefresh() {
			this.replyInfoList = []
			this.page = 0
			this.limit = 10
			this.loading = true
			this.finished = false
			this.getQuestionList()
		},
		previewImage(num, imgList) {
			ImagePreview({
				images: imgList,
				startPosition: num
			})
		},
    getConsultInfo() {
      this.loading = true
			if (this.refreshing) {
				this.replyInfoList = []
				this.refreshing = false
			}
      let params = {
        page: this.page * this.limit,
        limit: this.limit,
        consultId: this.consultId,
        token: this.token
      }
      duoduo.consultInfo(params).then(res => {
        if (res.data.code === 0) {
          if(res.data.list && res.data.list.length > 0) {
            this.userName = res.data.userName
            this.replyInfoList = this.replyInfoList.concat(res.data.list)
						this.page++
          } else {
            this.finished = true
          }
          this.loading = false
          this.replyInfoList.forEach(item => {
            if (item.disease_imgs) {
              item.imgArr = item.disease_imgs.split(',')
            }
          })
          if (this.replyInfoList[this.replyInfoList.length - 1].consult_flag === 1) {
            this.has_reply = true
            this.reply_btn_text = '补充回复'
          }
        }
      })
    },
    submit() {
      if (this.has_reply) {
        this.handleReplayAgain()
      } else {
        this.handleSubmitReply()
      }
    },
    handleReplayAgain() {
      this.has_reply = false
      this.reply_btn_text = '回复'
    },
    handleSubmitReply() {
      let doctor_reply = this.doctor_reply.trim().replace(XSSReg, '')
      if (doctor_reply === '') {
        this.$toast("请输入您的回复内容");
        return false;
      }
      this.replyBtnSub = true
      Dialog.confirm({
        message: `是否提交回复？`,
      })
      .then(() => {
        this.confirmReply(doctor_reply)
      })
      .catch(() => {
        // on cancel
      })
    },
    confirmReply(doctor_reply) {
      let params = {
        consultId: this.consultId,
        diseaseImgs: this.diseaseImgs,
        doctorId: this.doctorId,
        sickDesc: doctor_reply,
        token: this.token
      }
      duoduo.consultSave(params).then(res => {
        if (res.data.code === 0) {
          this.has_reply = false
          this.reply_btn_text = '补充回复'
          this.$toast(`已提交回复，病人将收到短信通知，辛苦您了，${this.doctorName}！`)
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.ReplyDoctor{
	background: #F2F2F2;
	width: 100%;
	min-height: 100vh;
	padding-bottom: .6rem;
	.illness_desc{
		padding: .6rem;
		box-sizing: border-box;
		background: #fff;
		border-bottom: .4rem solid #F2F2F2;
    .textarea{
      width: 100%;
      height: 7rem;
      resize: none;
      box-sizing: border-box;
      padding: .2rem;
      line-height: .8rem;
      border-radius: .1rem;
    }
		h2{
			font-size: .72rem;
			color: #010101;
			font-weight: 600;
			margin-bottom: .4rem;
			height: 1.32rem;
			line-height: 1.32rem;
			.span{
        padding-left: 10px;
				font-size: .5rem;
				color: #666;
			}
		}
		p{
			font-size: .6rem;
			color: #333;
			line-height: .96rem;
			margin-bottom: .4rem;
		}
		img{
			width: 4rem;
			height: 4rem;
			margin: 0 .6rem .6rem 0;
		}
	}
	.put_question_again{
		width:8.4rem;
		height:1.76rem;
		background:linear-gradient(90deg,rgba(0,181,140,1) 0%,rgba(0,104,82,1) 99%);
		box-shadow:0px .1rem .2rem 0px rgba(0,106,84,0.3);
		color: #fff;
		font-weight:600;
		border: none;
		margin: 1rem auto 1rem;
		display: block;
		span{
			font-size: .72rem;
		}
	}
	footer{
		padding: .6rem;
		box-sizing: border-box;
		font-size: .6rem;
		color: #666;
		line-height: .96rem;
		h3{
			font-size: .6rem;
			font-weight: 600;
		}
	}
}
</style>