<template>
  <div class="chating" ref="mescroll">
		<div 
			class="illness_desc"
			v-for="(item, index) in questionInfoList"
			:key="index"
		>
			<h2>{{item.consult_flag === 1 ? '医生回答' : '病情描述'}} <span>{{item.create_time}}</span></h2>
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
		<van-button round class="put_question_again" @click="putQuestionAgain">追加提问</van-button>
		<footer>
			<h3>温馨提示</h3>
			<li>1.提交详细信息，医生可以给更准确的回复</li>
			<li>2.该服务是医生利用空闲时间进行的免费帮忙</li>
			<li>3.本服务为免费帮忙，内容仅供参考，如具体病情请及时前往门诊就医。</li>
		</footer>
	</div>
</template>

<script>
import { duoduo } from "@/utils/http"
import { ImagePreview } from 'vant'
function scrollY () {
	return window.pageYOffset || window.document.documentElement.scrollTop
}
export default {
	name: 'Chating',
  data() {
    return {
			questionInfoList: [],
			token: '',
			consultId: '',
			limit: 10,
			page: 0,
			next_page: true,
    }
	},
	mounted() {
		this.consultId = this.$route.query.consultId
		this.token = this.$route.query.token
		sessionStorage.setItem('consultId', this.consultId)
		this.getQuestionInfo()
		this.loadmore()
	},
	destroyed() {
		window.removeEventListener('scroll')
	},
	methods: {
		loadmore() {
			window.addEventListener('scroll', () => {
				const isBottom = scrollY() >= (document.body.scrollHeight - document.documentElement.clientHeight)
				if (isBottom) {
					this.getQuestionInfo()
				}
			})
		},
		getDoctorInfo(doctorId) {
			let params = {
				doctor: doctorId,
				token: this.token
			}
			duoduo.getDoctorInfo(params).then(res => {
				document.title = `请${res.data.doctor_name}医生帮忙`
			})
		},
		previewImage(num, imgList) {
			ImagePreview({
				images: imgList,
				startPosition: num
			})
		},
		putQuestionAgain() {
			this.$router.push({
				path: '*',
				query: {
					token: this.token,
					doctorId: this.questionInfoList[0].doctor_id,
					consultId: this.consultId
				}
			})
		},
		getQuestionInfo() {
			if (!this.next_page) {
				return false
			}
			let params = {
				consultId: this.consultId,
				limit: this.limit,
				page: this.page * this.limit,
				token: this.token
			}
			duoduo.getQuestionInfo(params).then(res => {
				if (res.data.list && res.data.list.length > 0) {
					this.questionInfoList = this.questionInfoList.concat(res.data.list)
					this.getDoctorInfo(res.data.list[0].doctor_id)
					this.next_page = true
					this.page++
				} else {
					this.next_page = false
				}
				this.questionInfoList.forEach(item => {
					if (item.disease_imgs) {
						item.imgArr = item.disease_imgs.split(',')
					}
				})
			})
		}
	},
};
</script>

<style lang="stylus" scoped>
.chating{
	background: #F2F2F2;
	width: 100%;
	min-height: 100vh;
	padding-bottom: .6rem;
	.illness_desc{
		padding: .6rem;
		box-sizing: border-box;
		background: #fff;
		border-bottom: .4rem solid #F2F2F2;
		h2{
			font-size: .72rem;
			color: #010101;
			font-weight: 600;
			margin-bottom: .4rem;
			height: 1.32rem;
			line-height: 1.32rem;
			span{
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