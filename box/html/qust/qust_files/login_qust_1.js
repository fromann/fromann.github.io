$(function() {
//	var setting = {
//		imageWidth : 1680,
//		imageHeight : 1050
//	};
//	var init = function() {
//		var windowHeight = $(window).height();
//		var windowWidth = $(window).width();
//		$(".login_conatiner").css("height",windowHeight);
//		$(".login_conatiner").css("width",windowWidth);
//		
//		$("#container_bg").css("height",windowHeight);
//		$("#container_bg").css("width",windowWidth);
//		
//		$("#login_right_box").css("height",windowHeight);
//
//		var imgW = setting.imageWidth;
//		var imgH = setting.imageHeight;
//		var ratio = imgH / imgW; // 图片的高宽比
//
//		imgW = windowWidth; // 图片的宽度等于窗口宽度
//		imgH = Math.round(windowWidth * ratio); // 图片高度等于图片宽度 乘以 高宽比
//
//		if (imgH < windowHeight) { // 但如果图片高度小于窗口高度的话
//			imgH = windowHeight; // 让图片高度等于窗口高度
//			imgW = Math.round(imgH / ratio); // 图片宽度等于图片高度 除以 高宽比
//		}
//
//		$(".login_img_01").width(imgW).height(imgH); // 设置图片高度和宽度
//	};

//	init();
	
	getImageCode();
	
//	$(window).resize(function() {
//		init();
//	});
	
	//登录按钮触发
	$("#index_login_btn").click(function(){
		login();
	});
	
	//用户名文本域keyup事件
	$("#un").keyup(function(e){
		if(e.which == 13) {
			login();
	    }
	}).keydown(function(e){
		$("#errorDiv").empty();
	}).focus();
	
	//密码文本域keyup事件
	$("#pd").keyup(function(e){
		if(e.which == 13) {
			login();
	    }
	}).keydown(function(e){
		$("#errorDiv").empty();
	});
	
	//如果有错误信息，则显示
	if($("#errormsghide").text()){
		$("#errormsg").text($("#errormsghide").text()).show();
	}
	$("#change_language").unbind("click").click(function(){
		var re=eval('/(locale=)([^&]*)/gi');  
	    var url = window.location.href;
		if($("#change_language").attr("value") == "中文"){
			
			if(url.indexOf("locale") >= 0 ) { 
				url=url.replace(re,'locale=zh_CN');
				location.href=url;
			}else{
				location.href=url+"&locale=zh_CN";
			}
		}else if($("#change_language").attr("value") == "English") {
			if(url.indexOf("locale") >= 0 ) { 
				url=url.replace(re,'locale=en');
				location.href=url;
			}else{
				location.href=url+"&locale=en";
			}
		}
		
		
	});
	//手机下载移入移出事件
	$("#mobile_download").hover(function(){
        $("#mobile_code_box").show();
    },function(){
        $("#mobile_code_box").hide();
    });
	
	//点击记住用户名
	$("#rememberName").change(function(){
		if($(this).is(":checked")){
			var $u = $("#un").val() ;
			if($.trim($u)==''){
				$("#errormsg").text("账号不能为空。").show();
				$(this).removeAttr("checked");
			}else{
				//不等于空，写cookie
				setCookie('qust_cas_un' , $u , 365);
			}
		}else{
			//反选之后清空cookie
			clearCookie('qust_cas_un');
		}
	});
	
	//获取cookie值
	var cookie = getCookie('qust_cas_un');
	if(cookie){
		$("#un").val(cookie);
		$("#rememberName").attr("checked","checked");
	}
});

function login(){
	var $u = $("#un") , $p=$("#pd");
	
	var u = $u.val().trim();
	if(u==""){
		$u.focus();
		return ;
	}
	
	var p = $p.val().trim();
	if(p==""){
		$p.focus();
		return ;
	}
	
	$u.attr("disabled","disabled");
	$p.attr("disabled","disabled");
	
	var lt = $("#lt").val();
	
	$("#ul").val(u.length);
	$("#pl").val(p.length);
	$("#rsa").val(strEnc(u+p+lt , '1' , '2' , '3'));
	if($('#div_image_code').length>0){
		var code = $("#captchacode").val();
		if(!code) {
			showErr("请拖动提示中给的元素");
			return false;
		}else {
			$("#loginForm")[0].submit();
		}
	}else {
		$("#loginForm")[0].submit();
	}
}

function getImageCode(){
	if($('#div_image_code').length>0){
		$(".ajax-fc-container").captcha(); 
	}
}
function showErr(msg){
	$("#errorDiv").empty();
	$("#errorDiv").html('<span id="errormsg" class="login_box_notice">'+msg+'</span>');
}
//设置cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

//获取cookie
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}

//清除cookie  
function clearCookie(name) {  
  setCookie(name, "", -1);  
}  