import api from './apiconfig'
import axios from './axios'
import Vue from 'vue'
import { Toast } from 'vant'
// import _this from '@/main'
Vue.use(Toast)
const http = request => {
	return new Promise((resolve, reject) => {
		request.then(res => {
			if (res.data === null) {
				Toast('暂无数据，请稍后再试')
				return false
			}
			if (res.data.code === 0) {
				return resolve(res)
			} else {
				if (res.data.msg) {
					Toast(res.data.msg)
				}
			}
		}).catch(err => {
			if (err.data.msg) {
				Toast(err.data.msg)
			}
			// if (err.data.code === 500) {
			// 	_this.push('/LoginDoctor')
			// }
			return reject(err)
		})
	})
}

export const duoduo = {
	getUserCode: async (params) => {
		const res = await http(axios.post('https://admin.okginko.com/ginkgo-admin//wx/api/userCode', params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	personInteraction: async (params) => {
		const res = await http(axios.post(api.person_interaction, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	personUpgrade: async (params) => {
		const res = await http(axios.post(api.person_upgrade, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	illnessShop: async (params) => {
		const res = await http(axios.post(api.illness_shop, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	getUserDoctorTeamList: async (params) => {
		const res = await http(axios.post(api.userDoctorTeamList, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	getProcessList1: async (params) => {
		const res = await http(axios.post(api.process_list1, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	processSave: async(params) => {
		const res = await http(axios.post(api.processSave, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	getUserList: async(params) => {
		const res = await http(axios.post(api.userList, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	consultInfo: async(params) => {
		const res = await http(axios.post(api.consultInfo, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	consultSave: async(params) => {
		const res = await http(axios.post(api.consultSave, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	consultList: async(params) => {
		const res = await http(axios.post(api.consultList, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	doctorLogin: async(params) => {
		const res = await http(axios.post(api.doctor_login, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	monitoring: async(params) => {
		const res = await http(axios.post(api.monitoring, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	usershareSave: async(params) => {
		const res = await http(axios.post(api.usershare_save, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	jsInit: async(params) => {
		const res = await http(axios.post(api.jsInit, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	bindDoctor: async(params) => {
		const res = await http(axios.post(api.bind_doctor, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	getDoctorList: async(params) => {
		const res = await http(axios.post(api.doctor_list, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	getDoctorInfo: async(params) => {
		const res = await http(axios.post(api.doctor_info, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	getTotalIntegral: async(params) => {
		const res = await http(axios.post(api.totalIntegral, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	userIntegralSave: async(params) => {
		const res = await http(axios.post(api.userintegral_save, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	getQuestionInfo: async(params) => {
		const res = await http(axios.post(api.question_info, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	getQuestionList: async(params) => {
		const res = await http(axios.post(api.question_list, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	getPublicQuestionInfo: async(params) => {
		const res = await http(axios.post(api.public_info, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	getPublicQuestionList: async(params) => {
		const res = await http(axios.post(api.public_list, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	submitQuestionSave: async(params) => {
		const res = await http(axios.post(api.question_save, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
}
export const yinxing = {
	getProcessList: async (token) => {
		const res = await http(axios.post(api.process_list, token))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	processSave: async (params) => {
		const res = await http(axios.post(api.process_save, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	doctorsOrder: async (params) => {
		const res = await http(axios.post(api.doctorsOrder, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	theoryInfo: async (params) => {
		const res = await http(axios.post(api.theoryInfo, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	getIllList: async (params) => {
		const res = await http(axios.post(api.ill_list, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	illnessSave: async (params) => {
		const res = await http(axios.post(api.illness_save, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	messageSave1: async (params) => {
		const res = await http(axios.post(api.message_save1, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	messageSave: async (params) => {
		const res = await http(axios.post(api.message_save, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	getDoctorCode: async (params) => {
		const res = await http(axios.post(api.doctor_code, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	phoneSave: async (params) => {
		const res = await http(axios.post(api.phone_save, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	getPhoneCode: async (params) => {
		const res = await http(axios.post(api.phone_code, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	datumSave: async (params) => {
		const res = await http(axios.post(api.datum_save, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
	// uploadBase64Url: async (params) => {
	// 	const res = await http(axios.post(api.uploadBase64_url, params))
	// 	if (res) {
	// 		return Promise.resolve(res)
	// 	}
	// 	return Promise.reject(false)
	// },
	userpushSave: async (params) => {
		const res = await http(axios.post(api.userpush_save, params))
		if (res) {
			return Promise.resolve(res)
		}
		return Promise.reject(false)
	},
}