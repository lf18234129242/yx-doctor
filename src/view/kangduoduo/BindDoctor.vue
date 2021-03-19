<template>
  <div :class="['BindDoctor', haveOtherDoctor ? '' : 'vh100']">
		<div class="header_title">
			<h3>每个家庭都需要<br>有几个医生微信</h3>
			<h4>微信群免费问问题，公益科普</h4>
		</div>
		<div class="header">
			<div class="avatar_box">
				<img :src="doctorInfo.avatar_url" alt="">
			</div>
			<div class="info">
				<li>{{doctorInfo.practice_hospital}}</li>
				<li>{{doctorInfo.dept_name}}&nbsp;&nbsp;&nbsp;&nbsp;{{doctorInfo.doctor_name}}</li>
				<li v-if="doctorInfo.intro">{{doctorInfo.intro}}</li>
			</div>
			<div class="code_img_box">
				<img :src="'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + doctorInfo.share_ticket" alt="">
			</div>
			<li class="code_desc">长按识别二维码</li>
		</div>
		<section v-if="haveOtherDoctor">
			<h4>免费咨询其他医生</h4>
			<h5 class="sixedge">点击头像 可同时关注多个医生</h5>
			<ul class="doctor_list">
				<li 
					class="doctor_item"
					v-for="(item, index) in doctorList"
					:key="index"
					@click="handleChooseDoctor(item)"
				>
					<div class="pr avatar">
						<img :src="item.avatar_url" alt="">
						<div class="model" v-show="item.seledted">已选择</div>
					</div>
					<div class="doctor_name">
						<span>{{item.hospital_abbr}}</span>
						<span>{{item.dept_name}} {{item.doctor_name}}</span>
					</div>
				</li>
			</ul>
		</section>
		<footer v-if="haveOtherDoctor">
			<van-button class="btn" @click="bindDoctor">一键关注</van-button>
		</footer>
		<div v-if="showBindDoctorCode" class="bind_doctor_code_box">
			<img @click="showBindDoctorCode = false" class="close" src="@/assets/img/duoduo/icon_close.png" alt="">
			<div class="content">
				<div class="sixedge" style="width:6.6rem;">长按二维码并关注</div>
				<p>立即关注所选医生</p>
				<div class="code_box">
					<img :src="'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + doctorInfo.share_ticket" alt="">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import wxShare from '@/utils/share'
import { duoduo } from "@/utils/http"
import { getStrParam } from "@/utils/count";
import { Toast } from 'vant';
export default {
	name: 'BindDoctor',
  data() {
    return {
			doctorIds: '',
			haveOtherDoctor: false,
			showBindDoctorCode: false,
			showThanksBox: true,
      doctorList: [],
			seledtedArr: [],
			token: '',
			userId: '',
			currentUserId: '',
			doctorId: '',
			avatar_url: '',
			doctorName: '',
			practice_hospital: '',
			hospital_abbr: '',
			doctorInfo: {},
			doctorListArr: []
    }
	},
	mounted () {
		this.doctorIds = ''
		this.doctorListArr = []
    let href = window.location.href
    this.token = getStrParam(href, "token")
    this.userId = getStrParam(href, "userId")
    this.doctorId = getStrParam(href, "doctorId")
    this.currentUserId = getStrParam(href, "currentUserId")
		sessionStorage.setItem("token", this.token)
		this.getDoctorInfo()
		this.getDoctorList()
		this.monitoring()
		if (this.currentUserId != this.userId) {
			this.usershareSave()
			// this.userIntegralSave()
		}
		Toast('谢谢你的助力！')
	},
	methods: {
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
		monitoring() {
			let params = {
				doctorId: this.doctorId,
				token: this.token,
				type: 7
			}
			duoduo.monitoring(params).then(() => {})
		},
		// userIntegralSave() {
		// 	let params = {
		// 		integral: 3,
		// 		token: this.token,
		// 		type: 1,
		// 		userId: this.userId
		// 	}
		// 	duoduo.userIntegralSave(params).then(() => {})
		// },
		usershareSave() {
			let params = {
				doctorId: this.doctorId,
				token: this.token,
				userId: this.userId
			}
			duoduo.usershareSave(params).then(() => {})
		},
		bindDoctor() {
			let params = {
				doctorIds: this.doctorIds ? this.doctorIds : this.doctorListArr.toString(),
				token: this.token
			}
			duoduo.bindDoctor(params).then(res => {
				if (res.data.code === 0) {
					this.showBindDoctorCode = true
					this.getDoctorInfo()
				}
			})
		},
		getDoctorInfo() {
			let params = {
				doctor: this.doctorId,
				token: this.token
			}
			duoduo.getDoctorInfo(params).then(res => {
				if (res.data.code === 0) {
					this.doctorInfo = res.data
					this.avatar_url = res.data.avatar_url
					this.doctorName = res.data.doctor_name
					this.practice_hospital = res.data.practice_hospital
					this.hospital_abbr = res.data.hospital_abbr
					this.shareFuc()
				}
			})
		},
		getDoctorList() {
			let params = {
				doctor: this.doctorId,
				token: this.token,
				limit: 9,
				page: 0
			}
			duoduo.getDoctorList(params).then(res => {
				if (res.data.code === 0) {
					if (res.data.data.length > 0) {
						this.haveOtherDoctor = true
						this.doctorList = res.data.data
						this.doctorList.forEach(item => {
							this.$set(item, 'seledted', false)
						})
						this.doctorList.forEach(item => {
							this.doctorListArr.push(item.id)
						})
					} else {
						this.haveOtherDoctor = false
					}
				}
			})
		},
		handleChooseDoctor(data) {
			this.doctorList.forEach(item => {
				if (item.id === data.id) {
					if (item.seledted) {
						this.$set(item, 'seledted', false)
						this.seledtedArr.splice(this.seledtedArr.indexOf(item.id),1)
					} else {
						this.$set(item, 'seledted', true)
						this.seledtedArr.push(item.id)
					}
				}
			})
			this.doctorIds = this.seledtedArr.toString()
		}
	}
};
</script>

<style lang="stylus" scoped>
.user-select{
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.vh100{
	height: 100vh;
}
.BindDoctor{
	width: 100%;
	background: #FFD2B2 url('./../../assets/img/duoduo/building_bg_small.png') no-repeat center 4.76rem;
	background-size: 100% auto;
	padding: .6rem .7rem;
	box-sizing: border-box;
	.sixedge{
		@extend .user-select;
		width: 9.4rem;
		height: 1.36rem;
		padding: 0 .5rem;
		position:relative;
		background: linear-gradient(90deg,rgba(0,181,140,1) 0%,rgba(0,104,82,1) 99%);
		box-shadow:0px .1rem .2rem 0px rgba(0,106,84,0.3);
		margin: 0 auto .92rem;
		color: #fff;
		font-size: .6rem;
		text-align: center;
		line-height: 1.36rem;
		&::after{
			content: '';
			position: absolute;
			background-color: transparent;
			top: .2rem;
			right: -0.5rem;
			width: .95rem;
			height: .95rem;
			transform: rotate(45deg);
			-ms-transform: rotate(45deg);
			-moz-transform: rotate(45deg);
			-webkit-transform: rotate(45deg);
			-o-transform: rotate(45deg);
			background: linear-gradient(180deg,#00715B 0%,#006852 99%)
		}
		&::before{
			content: '';
			position: absolute;
			background-color: transparent;
			top: .2rem;
			left: -0.5rem;
			width: .95rem;
			height: .95rem;
			transform: rotate(45deg);
			-ms-transform: rotate(45deg);
			-moz-transform: rotate(45deg);
			-webkit-transform: rotate(45deg);
			-o-transform: rotate(45deg);
			background: linear-gradient(180deg,#00B58C 0%,#00AD85 99%);
		}
	}
	.header_title{
		color: #6D2700;
		text-align: center;
		transform: rotate(-3deg);
		font-style:italic;
		h3{
			text-shadow: -9px 5px 4px rgba(247,121,81,0.3);
			line-height: 2rem;
			font-size: 1.64rem;
			font-weight: 600;
		}
		h4{
			font-size: .72rem;
			line-height: 1.42rem;
		}
	}
	.header{
		width:13.6rem;
		background:rgba(255,255,255,1);
		box-shadow:0px 1px .4rem 1px rgba(72,47,39,0.1);
		padding-bottom: .5rem;
		border-radius:.4rem;
		margin-top: 2.3rem;
		margin-bottom: .6rem;
		background: #fff url('./../../assets/img/duoduo/light_bg.png') no-repeat center top;
		background-size: 100% auto;
		border-top: 1px solid #FFD2B2;
		.avatar_box{
			width: 4rem;
			height: 4rem;
			border-radius: 50%;
			margin: -2rem auto 0;
			border: .1rem solid #FFEDD6;
			box-sizing: border-box;
			img{
				width: 3.8rem;
				height: 3.8rem;
				border-radius: 50%;
			}
		}
		.info{
			text-align: center;
			margin-bottom: 1rem;
			li{
				font-size: .6rem;
				color: #00221A;
				line-height: .96rem;
			}
			li:nth-child(3){
				padding: .3rem .5rem;
				box-sizing: border-box;
			}
		}
		.code_img_box{
			width: 5.2rem;
			height: 5.2rem;
			margin: 0 auto;
			border:1px solid rgba(255, 169, 124, 1);
			box-shadow:-0.28rem .28rem 0px 0px rgba(255,230,213,1);
			border-radius:.4rem;
			display: flex;
			align-items: center;
			justify-content: center;
			img{
				width:4.74rem;
				height:4.74rem;
			}
		}
		.code_desc{
			margin-top: .8rem;
			color: #00221A;
			font-size: .6rem;
			text-align: center;
		}
	}
	section{
		width:13.6rem;
		background:rgba(255,255,255,1);
		box-shadow:0px 1px .4rem 1px rgba(72,47,39,0.1);
		border-radius:.4rem;
		background: #fff url('./../../assets/img/duoduo/light_bg.png') no-repeat center top;
		background-size: 100% auto;
		h4{
			color: #00221A;
			font-size: .84rem;
			width: 100%;
			height: 1.8rem;
			line-height: 1.8rem;
			text-align: center;
		}
		.doctor_list{
			width: 100%;
			padding: 0 0 1rem .86rem;
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;			
			.doctor_item{
				width: 45%;
				height: 6rem;
				margin: 0 .6rem 0 0;
				.avatar{
					width: 3.6rem;
					height: 3.6rem;
					margin: 0 auto;
					box-sizing: border-box;
					border-radius: 50%;
					border: .1rem solid #FEF3F0;
					img{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
					.model{
						position: absolute;
						left: 0;
						top: 0;
						width: 3.4rem;
						height: 3.4rem;
						border-radius: 50%;
						background: rgba(0,0,0,0.3);
						text-align: center;
						line-height: 3.6rem;
						color: #fff;
						font-size: .6rem;
						font-weight: 600;
					}
				}
				.doctor_name{
					text-align: center;
					width: 100%;
					height: 1rem;
					line-height: 1rem;
					font-size: .48rem;
					color: #00221A;
					display: flex;
					flex-direction: column;
				}
			}
		}
	}
	// .kong{
		// width: 100%;
		// height: 4.24rem;
	// }
	footer{
		width: 100%;
		height: 3.24rem;
		margin-top: 1rem;
		// position: absolute;
		// left: 0;
		// bottom: 0;
		.btn{
			width:8.4rem;
			height:1.76rem;
			background:linear-gradient(90deg,rgba(0,181,140,1) 0%,rgba(0,104,82,1) 99%);
			box-shadow:0 .36rem 1.3rem 0 rgba(0,106,84,0.3);
			border-radius:.88rem;
			display: block;
			margin: 0 auto;
			color: #fff;
			font-weight:600;
			border: none;
			letter-spacing: .08rem;
			padding: 0;
			span{
				font-size: .8rem;
			}
		}
	}
	.bind_doctor_code_box{
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,0.8);
		position: fixed;
		left: 0;
		bottom: 0;
		.close{
			width: 1.2rem;
			height: 1.2rem;
			position: absolute;
			left: 11.3rem;
			top: 2.94rem;
		}
		.content{
			width:11.34rem;
			height:13.44rem;
			background:rgba(255,255,255,1);
			border-radius:.4rem;
			padding: .8rem 0;
			box-sizing: border-box;
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			margin: auto;
			p{
				@extend .user-select;
				width: 100%;
				height: 1rem;
				line-height: 1rem;
				text-align: center;
				font-size: .72rem;
				font-weight: 600;
				margin-top: -.4rem;
			}
			.code_box{
				width: 8rem;
				height: 8rem;
				background:rgba(255,255,255,1);
				border:1px solid rgba(255, 169, 124, 1);
				box-shadow:-.28rem .28rem 0px 0px rgba(255,230,213,1);
				border-radius:.4rem;
				display: block;
				margin: .3rem auto 0;
				img{
					width:100%;
					height:100%;
					border-radius:.4rem;
				}
			}
		}
	}
	.thanks_for_share{
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,0.8);
		position: fixed;
		left: 0;
		bottom: 0;
		.close{
			width: 1.2rem;
			height: 1.2rem;
			position: absolute;
			left: 11.3rem;
			top: 2.94rem;
		}
		.banner{
			width: 12.04rem;
			height: 3.24rem;
			position: absolute;
			left: 1.46rem;
			top: 5.4rem;
		}
		.content{
			width:9.94rem;
			height:8.36rem;
			background:rgba(255,255,255,1);
			border-radius:.4rem;
			text-align: center;
			color: #00221A;
			padding: 1.2rem 0 .8rem;
			box-sizing: border-box;
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			margin: auto;
			h3{
				font-size: .96rem;
				margin-bottom: .3rem;
				font-weight: bold;
			}
			h4{
				font-size: .72rem;
				line-height: 1.2rem;
			}
			.btn{
				width:8.4rem;
				height:1.76rem;
				background:linear-gradient(90deg,rgba(0,181,140,1) 0%,rgba(0,104,82,1) 99%);
				box-shadow:0px .1rem .2rem 0px rgba(0,106,84,0.3);
				border-radius:.88rem;
				color: #fff;
				border: none;
				font-size: .72rem;
				font-weight: bold;
				margin-top: .6rem;
				letter-spacing: .1rem;
			}
		}
	}
}
</style>