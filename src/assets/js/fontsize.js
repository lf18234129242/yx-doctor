(function(win,doc){
	function change(){
		doc.documentElement.style.fontSize=doc.documentElement.clientWidth/15+'px';
	}
	win.addEventListener('resize',change,false);
	change();
})(window,document)