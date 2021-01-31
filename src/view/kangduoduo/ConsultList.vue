<template>
  <div class="QuestionList pr">
		<div class="no_data" v-if="questionList.length === 0">
			<img src="@/assets/img/duoduo/no_record_data.png" alt="">
			<p>还没有病人提交问题</p>
      <p>谢谢您，{{doctorName}}医生，您辛苦了！</p>
		</div>
		<template v-else>
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list
					v-model="loading"
					:finished="finished"
					finished-text="没有更多了"
					@load="getConsultList"
				>
					<div 
						class="question_list"
						v-for="(item,index) in questionList"
						:key="index"
						@click="handleQuestionDetail(item)"
					>
						<div class="question">
							<span :class="['question_status', item.type === 2 ? 'no' : 'yes']">{{item.type === 2 ? '已回复' : '未回复'}}</span>
							{{item.sick_desc}}
						</div>
						<div class="question_imgs">
							<div v-if="item.imgList[0] !== ''">
								<img 
									v-for="(jtem, idx) in item.imgList" 
									:key="idx" 
									v-show="idx < 3"
									:src="jtem" 
									alt=""
								>
							</div>
							<div v-else></div>
						</div>
						<div class="create_time">
							<span>{{item.update_time}}</span>
						</div>
					</div>
				</van-list>
			</van-pull-refresh>
		</template>
    <nav class="nav">
      <div class="current_page div">问题列表</div>
      <div class="div" @click="handleLink">用户管理</div>
    </nav>
	</div>
</template>

<script>
import { duoduo } from "@/utils/http"
import { getStrParam } from "@/utils/count"
export default {
  name: "ConsultList",
  data() {
    return {
      questionList: [],
			token: '',
			page: 0,
			limit: 10,
			doctorName: '',
      loading: false,
      finished: false,
      refreshing: false,
    }
	},
	mounted () {
    let href = window.location.href
    this.token = getStrParam(href, "token")
    sessionStorage.setItem("token", this.token)
		this.getConsultList()
	},
	methods: {
    handleLink() {
      this.$router.push({
        path: '/UserManage',
        query: {
          token: this.token
        }
      })
    },
		handleQuestionDetail(item) {
      this.$router.push({
        path: '/ReplyDoctor',
        query: {
          consultId: item.consult_id,
          doctorId: item.doctor_id,
          doctorName: this.doctorName,
          token: this.token
        }
      })
		},
		onRefresh() {
			this.questionList = []
			this.page = 0
			this.limit = 10
			this.loading = true
			this.finished = false
			this.getConsultList()
		},
		getConsultList() {
			if (this.refreshing) {
				this.questionList = []
				this.refreshing = false
			}
			let params = {
				limit: this.limit,
				page: this.page * this.limit,
				token: this.token
			}
			duoduo.consultList(params).then(res => {
				if (res.data.code === 0) {
					this.doctorName = res.data.doctorName
          if (res.data.list && res.data.list.length > 0) {
						this.questionList = this.questionList.concat(res.data.list)
						this.page++
					} else {
						this.finished = true
					}
					this.loading = false
					this.questionList.forEach(item => {
						item.imgList = item.disease_imgs.split(',')
          })
				}
			})
		}
	}
};
</script>

<style lang="stylus" scoped>
.QuestionList{
	width: 100%;
	min-height: 100vh;
	background: #F2F2F2;
	margin-bottom: 2rem;
  .nav{
    width: 100%;
    height: 2rem;
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    .div{
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
	.my_integral{
		width: 100%;
		height: 1.5rem;
		background: #b8e98a;
		display: flex;
		align-items: center;
		justify-content: space-between;
		li{
			color: #111;
			font-size: .7rem;
			line-height: 1.5rem;
			padding: 0 .4rem;
			box-sizing: border-box;
			&:nth-child(2){
				text-decoration: underline;
			}
		}
	}
	.no_data{
		width: 100%;
		height: 10rem;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-top: 6rem;
		img{
			width: 2.44rem;
			height: 3.16rem;
			margin: 0 0 1.2rem 0;
		}
		p{
			color: #999;
			font-size: .6rem;
		}
	}
	.kong{
		width:15rem;
		height:1.96rem;
	}
	.put_question{
		width:15rem;
		height:1.96rem;
		background:linear-gradient(90deg,rgba(0,181,140,1) 0%,rgba(0,104,82,1) 99%);
		box-shadow:0px 0.1rem .2rem 0px rgba(0,106,84,0.3);
		color: #fff;
		font-weight:600;
		border: none;
		position: fixed;
		left: 0;
		bottom: 0;
		span{
			font-size: .72rem;
		}
	}
	.question_list{
		width: 100%;
		// height: 6.7rem;
		background: #fff;
		padding: .6rem;
		box-sizing: border-box;
		margin-bottom: .4rem;
		.question{
			font-size: .6rem;
			color: #333333;
			line-height: .96rem;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			overflow:hidden;
			/*! autoprefixer: off */
			-webkit-box-orient: vertical;
			margin-bottom: .4rem;
			.question_status{
				width:2rem;
				height:.84rem;
				border-radius:.4rem;
				color: #fff;
				font-size: .48rem;
				line-height: .84rem;
				text-align: center;
				display: inline-block;
			}
			.yes{
				background:linear-gradient(90deg,rgba(0,181,140,1) 0%,rgba(0,104,82,1) 99%);
			}
			.no{
				background: #BFBFBF;
			}
		}
		.question_imgs{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: .5rem;
			img{
				width: 3.2rem;
				height: 3.2rem;
				display: inline-block;
				margin-right: .4rem;
			}
			.btn_box{
				&>span{
					color: red;
					font-size: .56rem;
					text-align: center;
				}
			}
			.look_detail{
				width:3rem;
				height:1rem;
				background:linear-gradient(90deg,rgba(0,181,140,1) 0%,rgba(0,104,82,1) 99%);
				box-shadow:0 .36rem 1.3rem 0 rgba(0,106,84,0.3);
				border-radius:.5rem;
				display: block;
				color: #fff;
				font-size: .6rem;
				font-weight:600;
				border: none;
				letter-spacing: .08rem;
				margin: auto 0;
				padding: 0;
				line-height: 1rem;
				align-self: flex-end;
			}
		}
		.create_time{
			width: 100%;
			font-size: .5rem;
			color: #666;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
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
		img{
			width: 9.28rem;
			height: 7.28rem;
			position: absolute;
			left: 5.1rem;
			top: 1.42rem;
		}
		ul{
			width: 100%;
			margin-top: 12rem;
			color: #fff;
			padding-left: 1rem;
			box-sizing: border-box;
			transform: rotate(-5deg);
			li{
				font-size: 1rem;
				line-height: 1.8rem;
			}
		}
	}
}
</style>