import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/view/kangduoduo/${view}.vue`)
}
function loadYinxing(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/components/${view}.vue`)
}

export default new Router({
  routes: [
    {
      path: '/DoctorsDetails',
      name: 'DoctorsDetails',
      component: loadYinxing('Doctors-details'),
      meta:{
        index:2,
        auth:true,
        title:'疾病详情'
      }
    },
    {
      path: '/DoctorsOrder',
      name: 'DoctorsOrder',
      component: loadYinxing('Doctors-order'),
      meta:{
        index:1,
        auth:true,
        title:'我的医嘱'
      }
    },
    {
      path: '/',
      name: 'RegisterChooseIll',
      component: loadYinxing('Register-chooseIll'),
      meta:{
        index:1,
        auth:true,
        title:'选择疾病'
      }
    },
    {
      path: '/RegisterChooseIllStep',
      name: 'RegisterChooseIllStep',
      component: loadYinxing('Register-chooseIllStep'),
      meta:{
        index:2,
        auth:true,
        title:'选择病程'
      }
    },
    {
      path: '/RegisterPatient',
      name: 'RegisterPatient',
      component: loadYinxing('Register-patient'),
      meta:{
        index:3,
        auth:true,
        title:'填写信息'
      }
    },
    {
      path: '/RegisterBindPhoneNum',
      name: 'RegisterBindPhoneNum',
      component: loadYinxing('Register-bindPhoneNum'),
      meta:{
        index:4,
        auth:true,
        title:'绑定手机号'
      }
    },
    {
      path: '/RegisterSubmitPicture',
      name: 'RegisterSubmitPicture',
      component: loadYinxing('Register-submitPicture'),
      meta:{
        index:5,
        auth:true,
        title:'提交资料'
      }
    },
    {
      path: '/WechatCode',
      name: 'WechatCode',
      component: loadYinxing('WechatCode'),
      meta:{
        index:6,
        auth:true,
        title:'扫码进群'
      }
    },
    {
      path: '/Share',
      name: 'Share',
      component: loadView('Share'),
      meta:{
        index:1,
        auth:true,
        title:'转发领积分'
      }
    },
    {
      path: '/SubmitTheIllness',
      name: 'SubmitTheIllness',
      component: loadView('SubmitTheIllness'),
      meta:{
        index:1,
        auth:true,
        title:''
      }
    },
    {
      path: '*',
      redirect:{path:'/SubmitTheIllness'}
    },
    {
      path: '/Chating',
      name: 'Chating',
      component: loadView('Chating'),
      meta:{
        index:3,
        auth:true,
        title:'问题详情'
      }
    },
    {
      path: '/SubSuccess',
      name: 'SubSuccess',
      component: loadView('SubSuccess'),
      meta:{
        index:4,
        auth:true,
        title:'提交成功'
      }
    },
    {
      path: '/QuestionList',
      name: 'QuestionList',
      component: loadView('QuestionList'),
      meta:{
        index:2,
        auth:true,
        title:'问题列表'
      }
    },
    {
      path: '/OtherQuestionList',
      name: 'OtherQuestionList',
      component: loadView('OtherQuestionList'),
      meta:{
        index:2,
        auth:true,
        title:'其他人的问题'
      }
    },
    {
      path: '/OtherQuestionDetail',
      name: 'OtherQuestionDetail',
      component: loadView('OtherQuestionDetail'),
      meta:{
        index:3,
        auth:true,
        title:'问题详情'
      }
    },
    {
      path: '/BindDoctor',
      name: 'BindDoctor',
      component: loadView('BindDoctor'),
      meta:{
        index:1,
        auth:true,
        title:'绑定医生'
      }
    },
    {
      path: '/BindDoctors',
      name: 'BindDoctors',
      component: loadView('BindDoctors'),
      meta:{
        index:1,
        auth:true,
        title:'医生团队'
      }
    },
    {
      path: '/BindDoctorCode',
      name: 'BindDoctorCode',
      component: loadView('BindDoctorCode'),
      meta:{
        index:1,
        auth:true,
        title:'医生团队'
      }
    },
    {
      path: '/RegisterAll',
      name: 'RegisterAll',
      component: loadView('RegisterAll'),
      meta:{
        index:0,
        auth:true,
        title:'注册'
      }
    },
    {
      path: '/ScanShare',
      name: 'ScanShare',
      component: loadView('ScanShare'),
      meta:{
        index:0,
        auth:true,
        title:'转发好医生'
      }
    },
    {
      path: '/LoginDoctor',
      name: 'LoginDoctor',
      component: loadView('LoginDoctor'),
      meta:{
        index:0,
        auth:true,
        title:'登录'
      }
    },
    {
      path: '/ConsultList',
      name: 'ConsultList',
      component: loadView('ConsultList'),
      meta:{
        index:1,
        auth:true,
        title:'问题列表'
      }
    },
    {
      path: '/ReplyDoctor',
      name: 'ReplyDoctor',
      component: loadView('ReplyDoctor'),
      meta:{
        index:10,
        auth:true,
        title:'医生回复'
      }
    },
    {
      path: '/UserManage',
      name: 'UserManage',
      component: loadView('UserManage'),
      meta:{
        index:2,
        auth:true,
        title:'用户管理'
      }
    },
  ]
})
