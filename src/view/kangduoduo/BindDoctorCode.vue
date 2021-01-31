<template>
  <div>
    <div class="BindDoctors" v-if="haveOtherDoctor">
      <h1>{{doctorName}}医生团队<br>共同为您服务</h1>
      <div class="doctors-box">
        <h5 class="sixedge fiexd-code">进群可获得免费服务</h5>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getUserDoctorTeamList"
          >
            <div 
              class="doctors-item"
              v-for="item in doctorList"
              :key="item.id"
            >
              <div class="checkbox-box">
                <div class="avatar-box">
                  <img :src="item.avatarUrl" alt="">
                  <div class="doctor-name">{{item.doctorName}}</div>
                </div>
                <div class="doctor-info">
                  <h2>{{item.hospitalAbbr}}</h2>
                  <h3>{{item.deptName}}</h3>
                  <h4>{{item.intro}}</h4>
                </div>
                <div 
                  class="get-code" 
                  @click="$router.push(`/WechatCode?token=${token}&doctor_id=${item.doctorId}&type=${type}&push_id=${push_id}`)"
                >进群</div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <div v-else class="no-doctor">暂无可关注的医生</div>
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
import { getStrParam } from "@/utils/count"
export default {
  name: 'BindDoctorsCode',
  data() {
    return {
			showBindDoctorCode: false,
      haveOtherDoctor: false,
      doctorList: [],
      doctorInfo: '',
      avatar_url: '',
      doctorName: '',
      practice_hospital: '',
      hospital_abbr: '',
      push_id: '',
      type: '',
      loading: false,
      finished: false,
      refreshing: false,
			page: 0,
			limit: 10,
    }
  },
  mounted () {
    let href = window.location.href
    this.token = getStrParam(href, "token")
    this.doctorId = getStrParam(href, "doctorId")
    this.push_id = getStrParam(href, "pushId")
    this.type = getStrParam(href, "type")
		this.getUserDoctorTeamList()
		this.getDoctorInfo()
		sessionStorage.setItem("token", this.token)
    sessionStorage.setItem("push_id", this.push_id)
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
          document.title = `${this.doctorName}的医生团队`
					this.shareFuc()
				}
			})
		},
		onRefresh() {
			this.doctorList = []
			this.page = 0
			this.limit = 10
			this.loading = true
			this.finished = false
			this.getUserDoctorTeamList()
		},
		getUserDoctorTeamList() {
			if (this.refreshing) {
				this.doctorList = []
				this.refreshing = false
			}
			let params = {
				doctorId: this.doctorId,
				token: this.token,
				limit: this.limit,
				page: this.page * this.limit,
			}
			duoduo.getUserDoctorTeamList(params).then(res => {
				if (res.data.code === 0) {
					if (res.data.data && res.data.data.length > 0) {
						this.haveOtherDoctor = true
            this.doctorList = this.doctorList.concat(res.data.data)
            this.page++
					} else {
						this.finished = true
          }
          if(this.page === 0 && res.data.data.length === 0) {
						this.haveOtherDoctor = false
          }
          this.loading = false
				}
			})
		},
  },
}
</script>

<style lang="stylus" scoped>
.user-select{
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.BindDoctors{
  width: 100%;
  min-height: 100vh;
  background: #FFDCC7;
  padding-top: 1.2rem;
  box-sizing: border-box;

  h1{
    font-size: 1.44rem;
    color: #6D2700;
    width: 11.44rem;
    line-height: 2rem;
    margin: 0 1.78rem 1.2rem;
    text-align: center;
  }

  .doctors-box{
    width: 13.6rem;
    min-height: calc(100vh - 6rem);
    background: #fff;
    border-radius: .4rem .4rem 0 0;
    margin: 0 auto;
    position: relative;
    padding: 0.68rem .3rem 0;
    box-sizing: border-box;
  }

  .doctors-item{
    width: 100%;
    height: 4.4rem;
    padding: .5rem 0 0 0;
    border-bottom: 1px solid #EEEEEE;
  }

  .checkbox-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .avatar-box{
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;
    border: .1rem solid #FDF2ED;
    overflow: hidden;
    position: relative;
    margin: 0 .3rem 0 0;

    img{
      width: 3.6rem;
      height: 3.6rem;
    }

    .doctor-name{
      width: 100%;
      height: .92rem;
      color: #fff;
      background: rgba(0,0,0,0.5);
      font-size: .6rem;
      line-height: .92rem;
      text-align: center;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }

  .doctor-info{
    width: 6rem;
    height: 3.6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    h2{
      font-size: .6rem;
      color: #00221A;
      font-weight: 600;
    }

    h3{
      font-size: .56rem;
      color: #00221A;
    }

    h4{
      width: 6.6rem;
      font-size: .48rem;
      color: #666;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box; 
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; 
    }
  }

  .get-code{
    width: 2rem;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    border-radius: 4px;
    background: rgb(0, 104, 82);
    color: #fff;

  }

  .btn{
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
    font-size: .72rem;
    text-align: center;
    line-height: 1.96rem;
  }
}

.no-doctor{
  width: 100%;
  height: 1rem;
  font-size: .7rem;
  text-align: center;
  margin: 5rem auto;
  color: #666;
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
      position: relative;

      img{
        width:100%;
        height:100%;
        border-radius:.4rem;
      }
    }
  }
}

.fiexd-code{
  position: absolute !important;
  left: 0;
  right: 0;
  top: -0.68rem;
}

.sixedge{
  @extend .user-select;
  width: 9.4rem;
  height: 1.36rem;
  padding: 0 .5rem;
  position: relative;
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
</style>