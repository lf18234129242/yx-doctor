<template>
	<div class="sharePage pr">
		<img src="@/assets/img/duoduo/leaf-bg.png" alt="" class="leaf">
		<div class="text_content">
			<h2>每个家庭都需要<br>有几个医生微信</h2>
		</div>
		<div class="doctor_info">
			<div class="avatar_box">
				<img :src="avatar_url" alt="" class="avatar">
			</div>
      <p class="desc">你好，我是{{doctorName}}医生，我正在参加 "{{city}}好医生" 公益评比活动，我将利用空闲时间在微信群里给大家免费服务，包括：</p>
      <ul class="desc_text">
        <li class="li">1. 免费问问题</li>
        <li class="li">2. 在线健康科普</li>
      </ul>
			<li class="share_text">
				“请你帮我转发给3个好朋友，谢谢！”
			</li>
			<img class="red_bg" src="@/assets/img/duoduo/red_bg_.png" alt="">
			<img class="half_coin" src="@/assets/img/duoduo/coin_half.png" alt="">
			<button 
				@click="showShareArrow = true" 
				class="share_btn"
			>立即转发</button>
			<div v-if="showShareArrow" class="share_arrow" @click="showShareArrow = false">
				<img class="img" src="@/assets/img/duoduo/share_arrow.png" alt="">
			</div>
		</div>
	</div>
</template>

<script>
import wxShare from '@/utils/share'
import { duoduo } from "@/utils/http"
import { getStrParam } from "@/utils/count";
export default {
	name: 'share-page',
	data() {
		return {
			showShareArrow: false,
			hospitalName: '',
			doctorDepartment: '',
			doctorName: '',
			city: '',
			avatar_url: '',
			token: '',
			userId: '',
			doctorId: '',
			practice_hospital: '',
			hospital_abbr: '',
		}
	},
	mounted () {
    let href = window.location.href
    this.token = getStrParam(href, "token")
    this.userId = getStrParam(href, "userId")
		this.doctorId = getStrParam(href, "doctorId")
		sessionStorage.setItem('token', this.token)
		this.getDoctorInfo()
		this.monitoring()
	},
	methods: {
		monitoring() {
			let params = {
				doctorId: this.doctorId,
				token: this.token,
				type: 4
			}
			duoduo.monitoring(params).then(() => {})
		},
		shareFuc() {
			wxShare(
				window.location.href.split('#')[0],
				this.hospital_abbr,
				this.doctorName, 
				this.userId, 
				this.doctorId, 
				this.avatar_url
			)
		},
		getDoctorInfo() {
			let params = {
				doctor: this.doctorId,
				token: this.token
			}
			duoduo.getDoctorInfo(params).then(res => {
				this.hospitalName = res.data.practice_hospital
				this.city = res.data.city
				this.doctorName = res.data.doctor_name
				this.avatar_url = res.data.avatar_url
				this.practice_hospital = res.data.practice_hospital
				this.hospital_abbr = res.data.hospital_abbr
				this.shareFuc()
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.sharePage{
	width: 100%;
	height: 110vh;
	background: #FFDBCA url('./../../assets/img/duoduo/building_bg.png') no-repeat center bottom;
	background-size: 15rem auto;
	border-top: 1px solid #FFDBCA;
	box-sizing: border-box;
	.leaf{
		width: 5.8rem;
		height: 6.4rem;
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 4;
	}
	.now_coin{
		span{
			margin-top: .96rem;
			display: inline-block;
			height: 1.76rem;
			line-height: 1.76rem;
			border-radius: 0 .88rem .88rem 0;
			background: #FFAD7F;
			color: #6D2700;
			font-weight: 600;
			font-size: .6rem;
			padding: 0 .6rem;
			font-style:italic;
		}
	}
	.text_content{
		width: 100%;
		text-align: center;
		margin-top: .4rem;
		color: #6D2700;
		font-style:italic;
		transform: rotate(-3deg);
		h2{
			margin-top: 1rem;
			font-size: 1.5rem;
			line-height: 2.2rem;
			text-shadow:-9px 5px 4px rgba(247,121,81,0.3);
			span{
				font-size: 3.24rem;
				color: #FFFC2A;
			}
		}
		h3{
			font-size: .72rem;
			line-height: 1.2rem;
		}
	}
	.doctor_info{
		width: 12.24rem;
		height: 14.7rem;
		position: absolute;
		left: 1.38rem;
		bottom: 3.06rem;
		background: linear-gradient(0deg,rgba(254,204,172,1),rgba(255,255,255,1));
		border-radius: .4rem;
		text-align: center;
		&::before{
			width: .78rem;
			height: 6rem;
			background: linear-gradient(0deg,#FF5526,#D82B01);
			content: '';
			position: absolute;
			left: -0.8rem;
			top: 3.8rem;
			border-radius: .4rem 0 0 0;
		}
		&::after{
			width: .78rem;
			height: 6rem;
			background: linear-gradient(0deg,#FF5526,#D82B01);
			content: '';
			position: absolute;
			right: -0.8rem;
			top: 3.8rem;
			border-radius: 0 .4rem 0 0;
		}
		.avatar_box{
			width: 4.2rem;
			height: 4.2rem;
			background: #fff;
			border-radius: 50%;
			margin: -2rem auto 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.avatar{
			width: 4rem;
			height: 4rem;
			border-radius: 50%;
		}
    .desc{
      width: 100%;
      padding: .5rem;
      box-sizing: border-box;
      font-size: .6rem;
      text-indent: 2em;
      line-height: 1rem;
      text-align: left;
    }
    .desc_text{
      width: 100%;
      padding: 0 3rem;
      box-sizing: border-box;
      .li{
        font-size: .7rem;
        font-weight: bold;
        text-align: left;
      }
    }
		.share_text{
			margin-top: .7rem;
			font-size: .65rem;
			color: #FF0000;
			text-align: center;
		}
		.share_times{
			font-size: .72rem;
			color: #6D2700;
			margin: .66rem 0 0 0;
		}
		.red_bg{
			width: 13.9rem;
			height: 6.64rem;
			position: absolute;
			left: -0.83rem;
			bottom: -2.5rem;
			z-index: 2;
		}
		.share_btn{
			width: 8rem;
			height: 1.8rem;
			background:linear-gradient(0deg,rgba(250,185,143,1),rgba(254,250,241,1));
			box-shadow:0px 5px 20px 0px rgba(113,0,0,0.3);
			border-radius:45px;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
			border: none;
			font-size: .96rem;
			color: #6D2700;
			font-weight: bold;
			z-index: 3;
		}
		.question_btn{
			width:8.4rem;
			height:1.76rem;
			background:linear-gradient(90deg,rgba(0,181,140,1) 0%,rgba(0,104,82,1) 99%);
			box-shadow:0 .36rem 1.3rem 0 rgba(0,106,84,0.3);
			border-radius:.88rem;
			display: block;
			color: #fff;
			font-size: .96rem;
			font-weight:600;
			border: none;
			letter-spacing: .08rem;
			z-index: 3;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
		}
		.half_coin{
			width: 1.14rem;
			height: 2.4rem;
			position: absolute;
			left: -1.1rem;
			top: 5.1rem;
		}
	}
	.share_arrow{
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,0.8);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
		.img{
			width: 9.28rem;
			height: 7.28rem;
			position: absolute;
			left: 5.1rem;
			top: 1.42rem;
		}
	}
}
</style>
                                
                            
                                
                            