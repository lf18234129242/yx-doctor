// import Vue from 'vue'
import wx from 'weixin-js-sdk'
import { duoduo } from './http'
export default function wxShare(url, practice_hospital,  doctorName, userId, doctorId, avatar_url) {
	duoduo.jsInit({
		token: sessionStorage.getItem('token'),
		url: url
	}).then(res => {
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: res.data.appId, // 必填，公众号的唯一标识
			timestamp: res.data.timestamp, // 必填，生成签名的时间戳
			nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
			signature: res.data.signature,// 必填，签名
			jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表
		})
		wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
			// 分享到群聊
			wx.updateAppMessageShareData({ 
				title: `快来参加！${practice_hospital}${doctorName}大夫开通了公益服务啦。`,
				desc: `你也快来参加吧！可以免费向医生提问。`,
				link: `https://admin.okginko.com/ginkgo-admin/wx/api/share?userId=${userId}&doctorId=${doctorId}`,
				imgUrl: avatar_url
			})
			// 分享到朋友圈
			wx.updateTimelineShareData({ 
				title: `快来参加！${practice_hospital}${doctorName}大夫开通了公益服务啦。`,
				link: `https://admin.okginko.com/ginkgo-admin/wx/api/share?userId=${userId}&doctorId=${doctorId}`,
				imgUrl: avatar_url
			})
		})
		wx.error(function (err) {
			console.log(err)
		})
	})
}
