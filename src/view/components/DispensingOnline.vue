<template>
  <div class="internet-peiyao-box">
    <img src="../../assets/img/online-peiyao.png" alt="" class="peiyao-img">
    <slot></slot>
    <!-- 其他病人都在看 -->
    <div class="other-view">
      <div class="view-title flex-m-c">
        <div class="line line-left"></div>
        ·
        <span class="text">其他病人都在看</span>
        ·
        <div class="line line-right"></div>
      </div>
      <div class="view-item">
        <div class="view-item-title suspe">手术后伤口恢复手术后伤口恢复手术后伤口恢复,需不需要吃海参?</div>
        <div class="view-item-content flex-m-sb">
          <div class="item-desc suspe-3">
            问题详情问题详情问题详情问题详情问题详情问题详情问题详情问题详情问题详情详情问题详情问题详情问题详情问题问题详情问题详情问题详情问题详情问题详情问题详情问题详情问题详情问题详情详情问题详情问题详情问题详情问题
          </div>
          <img src="" alt="" class="item-img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
.internet-peiyao-box
	background #fff
	width 100%
	padding-top .6rem

	.peiyao-img
		display block
		width 13.8rem
		height 4.32rem
		margin 0 auto 1rem

	.other-view
		width 100%
		padding 0 .58rem 2.5rem

		.view-title
			width 100%
			height .58rem
			font-size .6rem
			margin-bottom .98rem

			.text
				padding 0 .7rem

			.line
				width 3.84rem
				height 1px


			.line-left
				background linear-gradient(-90deg, #000000 0%, rgba(0, 0, 0, 0) 100%)
				margin-right .2rem

			.line-right
				background linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%)
				margin-left .2rem

		.view-item
			width 100%
			padding-bottom .38rem
			border-bottom 1px solid #F5F5F5

			&:last-child
				border 0

			.view-item-title
				width 100%
				font-weight bold
				margin-bottom .6rem

			.item-desc
				width 9.58rem
				font-size .48rem
				line-height .84rem
				color #999999

			.item-img
				width 3.72rem
				height 2.56rem
</style>