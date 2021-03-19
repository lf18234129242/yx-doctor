const BASEURL = 'https://api.okginko.com'
const URL = {
	userDoctorTeamList: BASEURL + '/api/doctor/userDoctorTeamList', // 公用问题单条记录接口
	processSave: BASEURL + '/api/doctor/user/process/save', // 用户病程保存接口
	userList: BASEURL + '/api/doctor/userList', // 用户列表接口
	process_list1: BASEURL + '/api/process/list1', // 病程列表接口，用户管理用
	process_list: BASEURL + '/api/process/list', // 病程列表接口
	ill_list: BASEURL + '/api/illness/list', // 疾病列表接口
	datum_save: BASEURL + '/api/userinfo/datum/save', // 患者资料保存接口
	illness_save: BASEURL + '/api/userinfo/illness/save', // 疾病保存接口
	message_save: BASEURL + '/api/userinfo/message/save', // 患者信息保存接口
	message_save1: BASEURL + '/api/userinfo/message/save1', // 患者信息保存接口
	phone_code: BASEURL + '/api/userinfo/phone/code', // 短信验证码接口
	phone_save: BASEURL + '/api/userinfo/phone/save', // 手机号保存接口
	process_save: BASEURL + '/api/userinfo/process/save', // 病程保存接口
	query_user_info: BASEURL + '/api/userinfo/query', // 用户信息查询接口
	userpush_save: BASEURL + '/api/userpush/save', // 推送点击率保存接口
	doctor_code: BASEURL + '/api/doctor/code', // 医生二维码
	doctorsOrder: BASEURL + '/api/userpush/doctorsOrder', // 科室疾病病程内容
	theoryInfo: BASEURL + '/api/userpush/theoryInfo', // 疾病原理内容
	// 用户咨询 -------------
	question_info: BASEURL + '/api/userconsult/info', // 单条记录接口
	question_list: BASEURL + '/api/userconsult/list', // 列表接口
	question_save: BASEURL + '/api/userconsult/save', // 咨询保存接口
	// userintegral_save: BASEURL + '/api/userintegral/save', // 积分消耗或转发保存
	totalIntegral: BASEURL + '/api/userintegral/totalIntegral', // 总积分
	doctor_info: BASEURL + '/api/doctor/info', // 医生资料（详细信息）
	monitoring: BASEURL + '/api/doctor/monitoring', // 医生数据监控
	doctor_list: BASEURL + '/api/doctor/areaRecommended', // 同地区医生推荐列表
	bind_doctor: BASEURL + '/api/userdoctor/save', // 绑定（保存）医生
	usershare_save: BASEURL + '/api/usershare/save', // 分享绑定用户
	jsInit: BASEURL + '/api/wx/jsInit', // 获取签名
	doctor_login: BASEURL + '/api/doctor/login', // 医生登录接口
	consultList: BASEURL + '/api/doctor/consultList', // 医生问题列表
	consultSave: BASEURL + '/api/doctor/consultSave', // 医生回复问题保存
	consultInfo: BASEURL + '/api/doctor/consultInfo', // 医生回复问题保存
	public_list: BASEURL + '/api/userconsult/public/list', // 公用问题列表接口
	public_info: BASEURL + '/api/userconsult/public/info', // 公用问题单条记录接口
	illness_shop: BASEURL + '/api/userconsult/illnessShop', // 疾病对应商品
	person_upgrade: BASEURL + '/api/userinfo/personUpgrade', // 用户个人中心-升级接口
	person_interaction: BASEURL + '/api/userinfo/personInteraction', // 用户个人中心-互动接口
	new_list: BASEURL + '/ginkgo-api/api/process/newList', // 新病程接口
}

module.exports = URL