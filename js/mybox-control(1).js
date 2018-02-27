//闭包
(function($) {
//类级别
$.jkb = {
		//提示
		alert : function(str,callback,title,width,height) {
			
			var maskHtml="<div class='mask' style='z-index:999' id='mask01'></div>";
			if(title==null||typeof(title)=="undefined"){
				title="提示信息";
			}
			var w=width==null?"420px":width;
			var h=height==null?"200px":height;
			
			var alertHtml=' <div class="enterMess" style="height:'+h+';width:'+w+'" id="enterMess01"> <div class="enterMess-title">'+title+'</div> <div class="enterMess-context">'+str+'</div> <div class="enterMess-btn"> <button class="enterMess-btn03" type="button">确定</button> </div> </div>';
			
			if(self!=top){
				//不是顶级页面
				if(parent.$("#mask01").length==0){
					$("body",parent.document).append(maskHtml);
				}
				if(parent.$("#enterMess01").length==0){
					$("body",parent.document).append(alertHtml);
				}else{
					parent.$(".enterMess-title").text(title);
					parent.$(".enterMess-context").text(str);
				}
				
				parent.$(".enterMess-btn03").click(function(){
					$.jkb.close_Mask01(callback);
		        });
				
				$('html').css('overflow', 'hidden');
	            parent.$('#mask01').show(); 
	            parent.$('#enterMess01').show();
	            parent.$('#enterMess01').myCenter();
	            
			}else{
				if($("#mask01").length==0){
					$("body").append(maskHtml);
				}
				if($("#enterMess01").length==0){
					$("body").append(alertHtml);
				}else{
					$(".enterMess-title").text(title);
					$(".enterMess-context").text(str);
				}
				$(".enterMess-btn03").click(function(){
					$.jkb.close_Mask01(callback);
		        });
				
				$('html').css('overflow', 'hidden');
	            $('#mask01').show();
	            $('#enterMess01').show();
	            $('#enterMess01').myCenter();
			}
			
		},confirm:function(keyJson){//str,callback,title
			var eValue=eval(keyJson);  
			var str=eValue["msg"];
			var callback=eValue["callback"];
			var title=eValue["title"];
			var ok=eValue["ok"]==null?"确定":eValue["ok"];
			var cancel=eValue["cancel"]==null?"取消":eValue["cancel"];
			var closeWin=eValue["closeWin"]==null?true:eValue["closeWin"];
			var width=eValue["width"]==null?"420px":eValue["width"];
			var height=eValue["height"]==null?"200px":eValue["height"];
			
			if(title==null||typeof(title)=="undefined"){
				title="提示信息";
			}
			var maskHtml="<div class='mask' style='z-index:999' id='mask03'></div>";
			
			var confirmHtml='<div class="enterMess" id="enterMess03" style="width:'+width+';height:'+height+'"> <div class="enterMess-title">'+title+'</div> <div class="enterMess-context">'+str+'</div> <div class="enterMess-btn"> <button class="enterMess-btn01">'+ok+'</button> <button class="enterMess-btn02">'+cancel+'</button> </div> </div>';
			if(self!=top){
				//不是顶级页面
				if(parent.$("#mask03").length==0){
					$("body",parent.document).append(maskHtml);
				}
				
				parent.$("#enterMess03").remove();
				$("body",parent.document).append(confirmHtml);
				
				parent.$(".enterMess-btn02").click(function(){
					//取消
					$.jkb.close_Mask03(callback(false));
		        });
				parent.$(".enterMess-btn01").click(function(){
					//确定
					if(closeWin){
						$.jkb.close_Mask03(callback(true));
					}else{
						callback(true);
					}
		        });
				
				$('html').css('overflow', 'hidden');
	            parent.$('#mask03').show();
	            parent.$('#enterMess03').show();
	            parent.$('#enterMess03').myCenter();
	            
			}else{
				if($("#mask03").length==0){
					$("body").append(maskHtml);
				}
				$(".enterMess").remove();
				$("body").append(confirmHtml);
				
				$(".enterMess-btn02").click(function(){
					//取消
					$.jkb.close_Mask03(callback(false));
		        });
				$(".enterMess-btn01").click(function(){
					//确定
					if(closeWin){
						$.jkb.close_Mask03(callback(true));
					}else{
						callback(true);
					}
		        });
				
				$('html').css('overflow', 'hidden');
				$('#mask03').show();
				$('.enterMess').show();
				$('.enterMess').myCenter();
			}
			
		},win:function(keyJson){
			var eValue=eval(keyJson);  
			var url=eValue["url"];
			var width=eValue["width"]==null?"550px":eValue["width"];
			var height=eValue["height"]==null?"350px":eValue["height"];
			
			var length =  $(".mask",window.parent.document).length;
			var mask = "mask_"+length;
			var mess = "mess_"+length;
			var menuIframe = "menuIframe_"+length;
			var mask_ = "#"+mask;
			var mess_ = "#"+mess;
			var menuIframe_ = "#"+menuIframe;
			
			var maskHtml='<div class="mask" id="'+mask+'"></div>';
			
			var iframehtml='<div class="mess" id="'+mess+'"><iframe class="menuIframe" id="'+menuIframe+'" src="<%=request.getContextPath()%>/profession/pages/admin/newEmployees/ygck-zy.jsp" style="width: 100%;height:350px;border-radius:10px"  frameborder="0"></iframe> </div>';
			
			if(self!=top){
				//不是顶级页面
				if(parent.$(mask_).length==0){
					$("body",parent.document).append(maskHtml);
				}
				
				$("body",parent.document).append(iframehtml);
				
				parent.$(menuIframe_).css("width",width);
				parent.$(menuIframe_).css("height",height);
				parent.$(mess_).css("width",width);
				parent.$(mess_).css("height",height);
				parent.$(mess_).css("min-height",height);
				parent.$(menuIframe_).attr("src",url);
				
				
				$('html').css('overflow', 'hidden');
				parent.$(mask_).show();
				parent.$(mess_).show();
				parent.$(mess_).myCenter();
			}else{
				if(parent.$(mask_).length==0){
					$("body",parent.document).append(maskHtml);
				}
				
				$("body").append(iframehtml);
				
				$(menuIframe_).css("width",width);
				$(menuIframe_).css("height",height);
				$(mess_).css("width",width);
				$(mess_).css("height",height);
				$(mess_).css("min-height",height);
				$(menuIframe_).attr("src",url);
				
				
				$('html').css('overflow', 'hidden');
				$(mask_).show();
				$(mess_).show();
				$(mess_).myCenter();
			}
			
             
		},close_Mask01:function(callback){
			if(self!=top){
				$('html').css('overflow', 'auto');
				parent.$('#mask01').hide();
				parent.$('#enterMess01').hide();
				parent.$(".enterMess-btn03").unbind();
				parent.$("#enterMess01").remove();
				parent.$('#mask01').remove();
			}else{
				$('html').css('overflow', 'auto');
				$('#mask01').hide();
	        	$('#enterMess01').hide();
	        	$(".enterMess-btn03").unbind();
	        	$("#enterMess01").remove();
	        	$('#mask01').remove();
			}
		    if(callback!=null&&typeof(callback)!="undefined")callback();
		},close_Mask03:function(callback){
			if(self!=top){
				$('html').css('overflow', 'auto');
				parent.$('#mask03').hide();
				parent.$('#enterMess03').hide();
				parent.$(".enterMess-btn01").unbind();
				parent.$(".enterMess-btn02").unbind();
				parent.$("#enterMess03").remove();
				parent.$("#mask03").remove();
			}else{
				$('html').css('overflow', 'auto');
				$('#mask03').hide();
	        	$('#enterMess03').hide();
	        	$(".enterMess-btn01").unbind();
				$(".enterMess-btn02").unbind();
	        	$("#enterMess03").remove();
	        	$("#mask03").remove();
			}
		    if(callback!=null&&typeof(callback)!="undefined")callback();
		},closeWin:function(){
			if(top.frames['myFrame']){
				top.frames['myFrame'].$('html').css('overflow', 'auto');
			}else{
				parent.$('html').css('overflow', 'auto');
			}
			var mask_ = $(".mask",window.parent.document)[$(".mask",window.parent.document).length-1];
			$(mask_).remove();
			var mess_ = $(".mess",window.parent.document)[$(".mess",window.parent.document).length-1];
			$(mess_).remove();
		},closeWinReload:function(){
			if(top.frames['myFrame']){
				top.frames['myFrame'].$('html').css('overflow', 'auto');
				top.frames['myFrame'].location.reload();
			}else{
				parent.$('html').css('overflow', 'auto');
				parent.location.reload();
			}
			var mask_ = $(".mask",window.parent.document)[$(".mask",window.parent.document).length-1];
			$(mask_).remove();
			var mess_ = $(".mess",window.parent.document)[$(".mess",window.parent.document).length-1];
			$(mess_).remove();
		},setParentVal:function(keyJson){
			var eValue=eval(keyJson); 
			var id=eValue["id"];
			var value=eValue["value"]==null?"":eValue["value"];
			var num=eValue["num"]==null?0:eValue["num"];
			var menuIframe_ = $(".menuIframe",window.parent.document)[$(".menuIframe",window.parent.document).length-1-num];
			if(id != null && id != '' && id != undefined){
				var id_ = "#"+id;
				$(menuIframe_).contents().find(id_).val(value);
			}
		},getParentVal:function(keyJson){
			var eValue=eval(keyJson); 
			var id=eValue["id"];
			var num=eValue["num"]==null?0:eValue["num"];
			var menuIframe_ = $(".menuIframe",window.parent.document)[$(".menuIframe",window.parent.document).length-1-num];
			if(id != null && id != '' && id != undefined){
				var id_ = "#"+id;
				alert("222"+$(menuIframe_).contents().find(id_).val());
				return $(menuIframe_).contents().find(id_).val();
			}
			return null;
		},t_showTips : function(str, callback,time) {//提示
			var tipsHtml = '<div style="position: fixed;left: 0px;right: 0px;top:50%;text-align: center;z-index: 999999;width:90%;margin:0 auto;"><div id="t_showTips"><div class="dialog-body"></div></div></div>';
			
			if ($("#t_showTips").length == 0) {
				$(document.body).append(tipsHtml);
			}
			$("#t_showTips .dialog-body").html(str);

			var $parent = $("#t_showTips").parent();
			$parent.css({
				"margin-top" : $parent.height() / 2 * -1 + "px",
				"display" : "block"
			});
			if(time==undefined){//默认1.5秒
				time=1500;
			}
			setTimeout(function() {
				$parent.css("display","none");
				if(callback!=null&&typeof(callback)!="undefined")callback();
			}, time);
		}
};

})($); 

/*
 * str 想要提示的信息
 * callback 回调方法 点击确定后调用的方法
 * title 提示框标题 默认为： 提示信息
 */
function jkbAlert(str,callback,title,width,height){
	$.jkb.alert(str,callback,title,width,height);
}

/*
 * str 提示的内容
 * callback 回调方法 会在提示信息消失之后进行提示
 * time 提示框显示时间 默认为1.5秒
 */
function showTips(str, callback,time){
	$.jkb.t_showTips(str, callback,time);
}

/*
 * msg 显示的提示信息
 * callback 回调方法 方法中有一个回传参数 返回true或flase 表示点击了确定还是取消 
 * title 头部标题
 * ok 右边按钮文字 默认为确定
 * cancel 左边按钮文字 默认为取消
 * closeWin 点击确定或者取消之后是否关闭当前窗口默认为：true 关闭
 * width ： 默认为420px
 * height：默认为200px
 */
function jkbConfirm(keyJson){
	$.jkb.confirm(keyJson);
}

/*
 * 关闭弹出页面
 */
function jkbCloseWin(){
	$.jkb.closeWin();
}

/*
 * url 打开页面的url 必须有
 * width 默认为550px
 * height 默认为350px
 */
function jkbWin(keyJson){
	$.jkb.win(keyJson);
}

/*
 * id 父iframe中的标签的id 必须有
 * value 设置的值
 * num 上几层，0当前弹框，1上一个弹框，2上两个弹框，依次类推
 * 例子：jkbSetParentVal({"id":"yaxis","value":yaxis,"num":1});
 */
function jkbSetParentVal(keyJson){
	$.jkb.setParentVal(keyJson);
}

/*
 * id 父iframe中的标签的id 必须有
 * num 上几层，0当前弹框，1上一个弹框，2上两个弹框，依次类推
 * return value
 * 例子：var value = jkbSetParentVal({"id":"yaxis","num":1});
 */
function jkbGetParentVal(keyJson){
	return $.jkb.getParentVal(keyJson);
}

/*
 * 关闭弹出页面并刷新
 */
function jkbCloseWinReload(){
	$.jkb.closeWinReload();
}

