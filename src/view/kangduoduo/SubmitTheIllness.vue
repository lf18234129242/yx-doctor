<template>
  <div class="SubmitTheIllness">
		<div class="header">
			<h2>描述病情</h2>
			<textarea 
				id="illness_desc" 
				cols="30" 
				rows="10" 
				maxlength="500" 
				placeholder="请详细描述您的主要症状，也可上传症状部位的照片或更多资料，会得到医生更详细的指导！"
				v-model="illness_desc"	
			></textarea>
			<h2>添加照片</h2>
			<van-uploader
				v-model="fileList"
				multiple
				:max-count="9"
				:before-read="beforeRead"
				:after-read="afterRead"
				class="uploader"
			/>
		</div>
		<footer>
			<h3>温馨提示</h3>
			<li>1.提交详细的资料有助于医生给您更好的建议</li>
			<li>2.本服务系为您提供的免费帮忙，如需诊疗，请前往医院就医</li>
			<li>3.医生平时工作较忙，本次帮忙会在1-2个工作日内回复</li>
			<van-button round class="submit" :disabled="disabledSub" @click="handleSubmit">立即提交</van-button>
		</footer>
	</div>
</template>

<script>
import { duoduo } from "@/utils/http"
import { Toast } from 'vant';
import { getStrParam, uploadBase64_url, XSSReg } from "@/utils/count";
export default {
  name: "SubmitTheIllness",
  data() {
    return {
			disabledSub: false,
      illness_desc: "",
      fileList: [],
      fileArr: [],
			doctorId: '',
			userId: '',
			consultId: '',
			integral: 10,
			token: ''
    }
	},
	mounted () {
    let href = window.location.href
		this.token = getStrParam(href, "token");
		this.doctorId = getStrParam(href, "doctorId");
		if (getStrParam(href, "consultId")) {
			this.consultId = getStrParam(href, "consultId");
		} else {
			this.consultId = ''
		}
		sessionStorage.setItem("token", this.token);
		if (getStrParam(href, "userId")) {
			this.userId = getStrParam(href, "userId")
		}
		this.getDoctorInfo()
		this.disabledSub = false
	},
	destroyed() {
		this.consultId = ''
	},
	methods: {
		getDoctorInfo() {
			let params = {
				doctor: this.doctorId,
				token: this.token
			}
			duoduo.getDoctorInfo(params).then(res => {
				document.title = `请${res.data.doctor_name}医生帮忙`
			})
		},
		handleSubmit() {
			let illness_desc = this.illness_desc.trim().replace(XSSReg, '')
			if (!illness_desc) {
				Toast('请您先填写病情描述哦！')
				return false
			}
			this.disabledSub = true
			let fileStr = this.fileArr.join(",")
			let params = {
				consultId: this.consultId,
				diseaseImgs: fileStr,
				doctorId: this.doctorId,
				// integral: this.integral,
				sickDesc: illness_desc,
				token: this.token
			}
			duoduo.submitQuestionSave(params).then(res => {
				if (res.data.code === 0) {
					Toast('提交成功')
					this.illness_desc = ''
					this.fileArr = []
					this.$router.push({
						path: '/QuestionList', 
						query: {
							token: this.token,
							userId: this.userId,
							doctorId: this.doctorId,
							openModel: true
						}
					})
				}
			})
		},
    // 上传图片
    afterRead(file) {
			// let images = '', imageArr = []
			if (Array.isArray(file)) {
				file.forEach(item => {
					this.reduceImg(item)
				})
				// images = imageArr.toString
			} else {
				this.reduceImg(file)
			}
      // file.status = 'uploading'
      // file.message = '上传中...'
      Toast.loading({
        message:'正在上传中...',
        duration:0,
        forbidClick: true
			})
		},
		uploadBase64Url(file) {
      this.axios
        .post(uploadBase64_url, {
          base64: file
        })
        .then(res => {
          if (res.data.code === 0) {
						this.$toast.success("上传成功");
						// file.status = 'done'
            this.fileArr.push(res.data.url);
          } else {
            this.$toast(res.data.msg)
          }
        });
		},
		// 图片压缩
		reduceImg(file) {
			if(/\/(?:jpeg|png)/i.test(file.file.type)&&file.file.size>1000000) { //1000000=1M
				let canvas =  document.createElement('canvas')  
				let context = canvas.getContext('2d') 
				let img = new Image()
				img.src = file.content
				img.onload = () => {
					let imgWidth = img.width / 2
					let imgHeight = img.height / 2
					canvas.width = imgWidth
					canvas.height = imgHeight
					context.drawImage(img, 0, 0, imgWidth, imgHeight)
					// 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
					file.content = canvas.toDataURL(file.file.type, 0.92) 
					this.uploadBase64Url(file.content)
				}                       
			}else{
				// 不做处理的jpg和png以及gif直接保存到数组
				this.uploadBase64Url(file.content)
			}
		},
    // 返回布尔值
    beforeRead(file) {
			if (Array.isArray(file)) {
				file.forEach(item => {
					if (item.type !== 'image/jpeg' && item.type !== 'image/png') {
						Toast('只允许上传jpg/png格式的图片！')
						return false
					}
				})
			} else {
				if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
					Toast('只允许上传jpg/png格式的图片！')
					return false
				}
			}
			return true
    }
	}
}
</script>

<style lang="stylus">
.van-uploader__upload{
	width: 4rem;
	height: 4rem;
	border-radius:.4rem;
	margin: 0 .6rem .6rem 0;
}
.van-uploader__preview-image{
	width: 4rem;
	height: 4rem;
}
.van-uploader__upload-icon{
	font-size: 1.2rem;
}
</style>
<style lang="stylus" scoped>
.SubmitTheIllness{
	.header{
		width: 100%;
		background: #fff;
		padding: .6rem;
		box-sizing: border-box;
		border-bottom: .4rem solid #F2F2F2;
		h2{
			font-size: .72rem;
			height: 1rem;
			line-height: 1rem;
			color: #010101;
			font-weight: bold;
			margin-bottom: .4rem;
		}
		#illness_desc{
			width: 100%;
			height: 5.6rem;
			display: block;
			border: none;
			resize: none;
			margin-bottom: .4rem;
			font-size: .6rem;
			line-height: .96rem;
			border-bottom: .02rem solid #ddd;
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
		.submit{
			width:8.4rem;
			height:1.76rem;
			background:linear-gradient(90deg,rgba(0,181,140,1) 0%,rgba(0,104,82,1) 99%);
			box-shadow:0px .1rem .2rem 0px rgba(0,106,84,0.3);
			color: #fff;
			font-weight:600;
			border: none;
			margin: 2rem auto 0;
			display: block;
			span{
				font-size: .72rem;
			}
		}
	}
}
</style>
