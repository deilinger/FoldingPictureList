(function ($) {
	$.fn.FoldingPictureList = function(options) {
		// 默认值
		var dft = {
			imgs: [], // 图片数组
			size: "100px", // 尺寸
			color: "#6a6afb", // 边框及按钮颜色
			direction: "right", // 收起方向
			speed: 500, // 速度
			isFold: false, // 初始折叠状态
			btnWidth: "10px" // 折叠按钮宽度
		};

		// 将第二位及之后的参数合并到第一个参数中，后面的参数如果和前面的参数存在相同的名称，那么后面的会覆盖前面的参数值。
		var ops = $.extend(dft, options);

		// 箭头图片地址
		var jturl = {
			left: "sjLeftWhite.png", // 向左箭头URL
			right: "sjRightWhite.png", // 向右箭头URL
			now: this.left // 初始箭头URL
		}

		// 相反值
		var opposite = {
			float: "left", // 相反方向
			radius: "4px 0px 0px 4px" // 相反圆角设定
		}

		// 展开宽度
		var unFoldWidth = parseInt(ops.size) * ops.imgs.length + parseInt(ops.btnWidth);
		// DIV的ID
		var id = this.selector;

		// 设定相反值
		if(ops.direction == "right"){
			opposite.float = "left";
			if(!ops.isFold){
				jturl.now = jturl.right;
			}
			opposite.radius = "4px 0px 0px 4px";
		}else{
			opposite.float = "right";
			if(ops.isFold){
				jturl.now = jturl.right;
			}
			opposite.radius = "0px 4px 4px 0px";
		}

		var html = "<div class='FoldingToolbar_foldBtn' " 
			+ "style='box-sizing: border-box;"
			+ "background-color: " + ops.color + ";" 
			+ "width: " + ops.btnWidth + ";"
			+ "background-position: center;" 
			+ "background-repeat: no-repeat;" 
			+ "background-image: url(" + jturl.now + ");" 
			+ "height:" + ops.size + ";" 
			+ "float:" + opposite.float + ";" 
			+ "background-size:contain'></div>";
		
		for(var i = 0; i < ops.imgs.length; i++){
			html = html + "<div style='height:" + ops.size + ";" 
				+ "width:" + ops.size + ";" 
				+ "float:left;" 
				+ "background-size:contain;" 
				+ "background-image:url(" + ops.imgs[i] + ")'></div>";
		}

		$(this).css("border", "2px solid " + ops.color);
		$(this).css("width", "auto");
		$(this).css("float", ops.direction);
		$(this).css("overflow", "hidden");
		$(this).css("height", ops.size);
		$(this).css("border-radius", opposite.radius);
		$(this).attr("isFold", ops.isFold);
		$(this).append(html);

		if(ops.isFold){
			$(this).css("width", ops.btnWidth);
		}

		// 设定点击事件 
		$(".FoldingToolbar_foldBtn").click(function(){
			if($(id).attr("isFold") == "true"){
				$(id).animate({width:unFoldWidth + "px"}, ops.speed);
				$(id).attr("isFold", false);
			}else{
				$(id).animate({width:$(this).css("width")}, ops.speed);
				$(id).attr("isFold", true);
			}
			if(jturl.now == jturl.left){
				$(this).css("background-image", "url(" + jturl.right + ")");
				jturl.now = jturl.right;
			}else{
				$(this).css("background-image", "url(" + jturl.left + ")");
				jturl.now = jturl.left;
			}
		});
	}
})(jQuery);// Mandy 2015-12-15 15:08:04