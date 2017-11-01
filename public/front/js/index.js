

// 区域滚动
mui('.mui-scroll-wrapper').scroll({
	// deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	indicators:false
});


// 轮播图效果
mui('.mui-slider').slider({
	interval:1000 //自动轮播周期 为0则不自动播放
})