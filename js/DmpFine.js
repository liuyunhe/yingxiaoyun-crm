/**
 * Created by Lin on 2016/12/19.
 */

/*������Ϣ��������*/


/*��ʾ������*/
function showMess() {
    $(".mask").css("display", "block");
    //     $(".messTable").css("display","table");
}
var messnum = 0;
function setMess(opt) {
    var obj = opt.obj;
    var url = opt.url || $(obj).attr('url');
    var width = opt.width || 972;
    var height = opt.height || 637;
    var callback = opt.callback || null;
    var parObjMain = $('.DmpFine-main', parent.document);
    var parObjMask = $('.maskiframe', parent.document);
    if (parObjMain.children().last().css('display') == 'none') {
        parObjMask.css("display", "block");
        parObjMain.append(
            '<table class="messTable" width="100%" height="100%">'+
                '<tbody>'+
                    '<tr>'+
                        '<td id="messTableContent">'+
                            '<iframe class="DmpFine-messIframe" src='+url+' frameborder="0" width="'+width+'" height="'+height+'"></iframe>'+
                        '</td>'+
                    '</tr>'+
                '</tbody>'+
            '</table>');

    } else {
        var maskIndex = parObjMask.css('zIndex');
        parObjMask.css('zIndex', maskIndex - 0 + 2);
        $('<table class="messTable" width="100%" height="100%">' +
            '<tr>' +
            '<td id="messTableContent' + (++messnum) + '">' +
            '<iframe class="DmpFine-messIframe" src='+url+' frameborder="0" width="'+width+'" height="'+height+'"></iframe>' +
            '</td>' +
            '</tr>' +
            '</table>').appendTo(parObjMain).css('zIndex', (1000 + messnum * 2));
    }
    if (callback && $.type(callback) == 'function') {
        $(".DmpFine-messIframe").last().contents().find("body").append('<script>'+callback+'</script>')
    }
}

/*���ص�����*/
function hideMess(fn) {
    if (fn && $.type(fn) == 'function') {
        fn(arguments[1],arguments[2]);
    }
    if ($('.messTable', parent.document).length > 1) {
        console.log('aaaaaaaaaa')
        $(".maskiframe", parent.document).css('zIndex', $('.mask').css('zIndex') - 2);
        messnum--;
    } else {
        console.log('bbbbbbbbbbbb')
        $(".maskiframe", parent.document).css("display", "none").css('zIndex', '999');
        messnum = 0;
    }
    $('.DmpFine-main', parent.document).children().last().remove();
}

function showUrl(url){
    $('.DmpFine-body-Iframe').attr('src',url);
}

/*������*/
function SlidingLayer($e, $layer,flag) {
    this.flag = !flag ?true:false;
    this.$e = $e;
    this.$layer = $layer;
    this.timer = null;
    this.opt = {};
    if (arguments.length > 2) {
        this.opt = arguments[2];
    }
    this.init();
}
SlidingLayer.prototype.hide = function (_this) {
    _this.$layer.hide();
    if (_this.opt.clazz) {
        _this.$e.removeClass(_this.opt.clazz);
    }
};
SlidingLayer.prototype.init = function () {
    var _this = this;
    _this.$e.bind("click.SlidingLayer", function () {
        clearTimeout(_this.timer);
        if (_this.opt.clazz) {
            _this.$e.addClass(_this.opt.clazz);
        }
        _this.$layer.show();
    });
    _this.$e.bind("mouseleave.SlidingLayer", function () {
        _this.timer = setTimeout(function () {
            _this.hide(_this);
        }, 300);
    });
    if(this.flag){
        _this.$layer.bind("click.SlidingLayer", function (e) {
            e.stopPropagation();
            _this.timer = setTimeout(function () {
                _this.hide(_this);
            }, 300);
        });
    }

    _this.$layer.bind("mouseenter.SlidingLayer", function () {
        clearTimeout(_this.timer);
    });
    _this.$layer.bind("mouseleave.SlidingLayer", function () {
        _this.timer = setTimeout(function () {
            _this.hide(_this);
        }, 300);
    });
};
/*快速搜索*/
function quickSearch(){
    $('.dmp-select').on('mouseleave',function(){
        var _this=this;
        setTimeout(function(){
            $(_this).find("input[type='search']").val('');
            $(_this).find("p").show();
        },300)
    })
    $(".dmp-select-option-quick p").click(function () {
    	$(this).parents('.dmp-select').find('.type_id').val($(this).data("v"));
        $(this).parents('.dmp-select').find('.font_type_id').text($(this).text());
        $(this).parents('.dmp-select-option-quick').hide();
        $(this).parents('.dmp-select-option-quick').find("input").val('');
        $(this).parents('.dmp-select-option-quick').find("p").show();
    });
    $('.dmp-select-option-quick input').click(function(e){
        e.stopPropagation();
    });
    $('.dmp-select-option-quick input').on('input',function(e){
        e.stopPropagation();
        var _this = this;
        $(this).parents('.dmp-select-option-quick').find('p').hide();
        $(this).parents('.dmp-select-option-quick').find('p').each(function(){
            if(flagMath($(_this).val(),$(this).text())){
                $(this).show();
            }else{
                $(this).hide();
            }
        })
        $(this).parents('.dmp-select-option-quick').find('.dmp-select-sonbox p:contains('+$(_this).val()+')').show();
    });
}
/**
 * objtext 需要绑定对象的类名或者id #xxx  或者 .xxx
 * @param objtext
 */
function quickSearch2(objtext){
    $(objtext+'.dmp-select').on('mouseleave',function(){
        var _this=this;
        setTimeout(function(){
            $(_this).find("input[type='search']").val('');
            $(_this).find("p").show();
        },300)
    })
    $(objtext+" .dmp-select-option-quick p").click(function () {
    	$(this).parents('.dmp-select').find('.type_id').val($(this).data("v"));
        $(this).parents('.dmp-select').find('.font_type_id').text($(this).text());
        $(this).parents('.dmp-select-option-quick').hide();
        $(this).parents('.dmp-select-option-quick').find("input").val('');
        $(this).parents('.dmp-select-option-quick').find("p").show();
    });
    $(objtext+' .dmp-select-option-quick input').click(function(e){
        e.stopPropagation();
    });
    $(objtext+' .dmp-select-option-quick input').on('input',function(e){
        e.stopPropagation();
        var _this = this;
        $(this).parents('.dmp-select-option-quick').find('p').hide();
        /*$(this).parents('.dmp-select-option-quick').find('p').each(function(){
            if(flagMath($(_this).val(),$(this).text())){
                $(this).show();
            }else{
                $(this).hide();
            }
        })*/
        $(this).parents('.dmp-select-option-quick').find('.dmp-select-sonbox p:contains('+$(_this).val()+')').show();
    });
}
/*多选下拉框快速搜索*/
function quickSearchMore(){
    $('.dmp-select').on('mouseleave',function(){
        var _this=this;
        setTimeout(function(){
            $(_this).find("input[type='search']").val('');
            $(_this).find("p").show();
            $(_this).find('input[type="search"]').val('');
            $(_this).find('.dmp-select-option-quick .dmp-select-sonbox div').show();
        },300)
    })
    $('.dmp-select-option-quick input').click(function(e){
        e.stopPropagation();
    })
    $('.dmp-select-option-quick input').on('input',function(e){
        e.stopPropagation();
        var _this = this;
        $(this).parents('.dmp-select-option-quick').find('.dmp-select-sonbox > div').hide();
        $(this).parents('.dmp-select-option-quick').find('.dmp-select-sonbox > div').each(function(){
            if(flagMath($(_this).val(),$(this).find('.selecttext').text())){
                $(this).show();
            }else{
                $(this).hide();
            }
        })
        $(this).parents('.dmp-select-option-quick').find('.dmp-select-sonbox div:contains('+$(_this).val()+')').show();
    })
}

function quickSearchMore1(obj){  //obj = $('.dmp-select')元素
    $(obj).on('mouseleave',function(){
        var _this=this;
        setTimeout(function(){
            $(_this).find("input[type='search']").val('');
            $(_this).find("p").show();
            $(_this).find('input[type="search"]').val('');
            $(_this).find('.dmp-select-option-quick .dmp-select-sonbox div').show();
        },300)
    })
    $(obj).find('.dmp-select-option-quick input').click(function(e){
        e.stopPropagation();
    })
    $(obj).find('.dmp-select-option-quick input').on('input',function(e){
        e.stopPropagation();
        var _this = this;
        $(this).parents('.dmp-select-option-quick').find('.dmp-select-sonbox > div').hide();
        $(this).parents('.dmp-select-option-quick').find('.dmp-select-sonbox > div').each(function(){
            if(flagMath($(_this).val(),$(this).find('.selecttext').text())){
                $(this).show();
            }else{
                $(this).hide();
            }
        })
        $(this).parents('.dmp-select-option-quick').find('.dmp-select-sonbox div:contains('+$(_this).val()+')').show();
    })
}


/*��״�б�*/
function DmpFineTreeInit(){
    $('.DmpFine-tree .DmpFine-tree-rowSon > .DmpFine-tree-row').each(function(){
        var parLeft = $(this).parent().prev().css('padding-left').replace('px','')-0+20+'px';
        $(this).css('padding-left',parLeft);
    })
    if($('.tree-body .DmpFine-tree-row:eq(0)').siblings('.DmpFine-tree-row').length<1 && $('.tree-body .DmpFine-tree-row:eq(0)').next().hasClass('DmpFine-tree-rowSon')){
        $('.tree-body .DmpFine-tree-row:eq(0)').next().show();
        $('.tree-body .DmpFine-tree-row:eq(0)').children('i').css('transform','rotate(0deg)');
    }
    $('.DmpFine-tree').on('click','.DmpFine-tree-row',function(){
        $(this).parents('.DmpFine-tree').find('.DmpFine-tree-row').removeClass('selected');
        $(this).addClass('selected');
        var sonObj = $(this).next();
        if(sonObj.hasClass('DmpFine-tree-rowSon')){
            if(sonObj.css('display') === 'none'){
                $(this).next().slideDown();
                $(this).find('i').css('transform','rotate(0deg)')
            }else{
                $(this).next().slideUp();
                $(this).find('i').css('transform','rotate(270deg)');
            }
        }
    })
}
function DmpFineTreeInit1(path){
    $('.DmpFine-tree .DmpFine-tree-rowSon > .DmpFine-tree-row').each(function(){
        var parLeft = $(this).parent().prev().css('padding-left').replace('px','')-0+20+'px';
        $(this).css('padding-left',parLeft);
    })
    $('.DmpFine-tree .DmpFine-tree-row .slide').click(function(){
        var sonObj = $(this).parent().next();
        if(sonObj.hasClass('DmpFine-tree-rowSon')){
            if(sonObj.css('display') === 'none'){
                $(this).parent().next().slideDown();
                $(this).css('backgroundImage','url('+path+'/images/slideUp.png)')
            }else{
                $(this).parent().next().slideUp();
                $(this).css('backgroundImage','url('+path+'/images/slideDown.png)')
            }
        }
    })
}

/*��״�б������*/
function searchTree(){
    $('.DmpFine-mainBox,.DmpFine-box').on('click','.DmpFine-tree1 .DmpFine-tree-row',function(){
        $(this).addClass('selected').siblings('.DmpFine-tree-row').removeClass('selected');
    })
    $('#searchtree').on('input',function(){
        var text='';
        if($(this).val().trim()){
            $('.DmpFine-tree').hide();
            if($('.DmpFine-tree1').length>0){
                $('.tree-body .DmpFine-tree-row > span:contains("'+$(this).val()+'")').each(function(){
                    text+='<div class="DmpFine-tree-row"> <span>'+$(this).text()+'</span> </div>';
                })
                $('.DmpFine-tree1').html(text);
            }else{
                $('.DmpFine-tree').after('<div class="DmpFine-tree1"></div>');
                $('.tree-body .DmpFine-tree-row > span:contains("'+$(this).val()+'")').each(function(){
                    text+='<div class="DmpFine-tree-row"> <span>'+$(this).text()+'</span> </div>';
                })
                $('.DmpFine-tree1').html(text);
            }
        }else{
            $('.DmpFine-tree1').remove();
            $('.DmpFine-tree').show();
        }
    })
}

function toggleTab(){
    $('.toggleTab .toggleTab-til li').click(function(){
        $(this).addClass('selected').siblings().removeClass('selected');
        $('.toggleTab .toggleTab-body').eq($(this).index()).show().siblings('.toggleTab-body').hide();
    })
}

function checkbox(){  //初始化树列表checkbox加样式
    $('.tree-body').on('click','.selectcheckbox',function(event){
        var siblingobj = $(this).parent().siblings('.DmpFine-tree-row').children('.selectcheckbox');
        event.stopPropagation();
        if(!$(this).hasClass('selected')){   //没选中状态
            $(this).addClass('selected');
            if($(this).parent().next().hasClass('DmpFine-tree-rowSon')){
                $(this).parent().next().find('.selectcheckbox').addClass('selected');
            }
            diguiAdd(this);
        }else{
            $(this).removeClass('selected');
            if($(this).parent().next().hasClass('DmpFine-tree-rowSon')){
                $(this).parent().next().find('.selectcheckbox').removeClass('selected');
            }
            console.log($(this).parents('.DmpFine-tree-rowSon').length)
            $(this).parents('.DmpFine-tree-rowSon').prev().find('.selectcheckbox').removeClass('selected');
        }
    })
}
function diguiAdd(obj){  //递归判断上层是否需要选中状态
    var parentobj = $(obj).parent().parent();
    if(parentobj.hasClass('DmpFine-tree-rowSon')){
        if(parentobj.children('.DmpFine-tree-row').find('.selectcheckbox').length === parentobj.children('.DmpFine-tree-row').find('.selected').length ){
            diguiAdd(parentobj.prev().find('.selectcheckbox').addClass('selected'))
        }
    }
}

function treebtn(){ //初始化树列表button加样式
    $('.DmpFine-tree').on('click','.DmpFine-btn100',function(){
        if($(this).hasClass('selected')){
            $(this).removeClass('selected');
        }else{
            $(this).addClass('selected');
        }
    })
}

function tablecheckbox(){   //要用这方法先给thead里的checkbox加allselectcheckbox类名
    $('.DmpFine-table').on('click','.selectcheckbox',function(){
        if($(this).hasClass('allselectcheckbox')){
            if(!$(this).hasClass('selected')){
                $(this).parents('.DmpFine-table').find('.selectcheckbox').addClass('selected');
            }else{
                $(this).parents('.DmpFine-table').find('.selectcheckbox').removeClass('selected');
            }
        }else{
            if(!$(this).hasClass('selected')){
                $(this).addClass('selected');
                if( $(this).parents('.DmpFine-table').find('.selectcheckbox').length-1 === $(this).parents('.DmpFine-table').find('.selectcheckbox.selected').length){
                    $(this).parents('.DmpFine-table').find('.allselectcheckbox').addClass('selected')
                }
            }else{
                $(this).removeClass('selected').parents('.DmpFine-table').find('.allselectcheckbox').removeClass('selected');
            }
        }
    })
}

function changePosi(obj){
    var xqbox = $(obj).children('.DmpFine-xqbox')
    var parHeight = xqbox.parents('.droppalbe').height();
    var parWidth = $(obj).parent().width();
    var selfHeight = xqbox.height();
    var selfWidth = xqbox.width();
    var offTop = $(obj).position().top;
    var offLeft = $(obj).position().left;
    var toheight =  parHeight - offTop - selfHeight;
    var toleft =  parWidth - offLeft - selfWidth - 38;
    if(toheight<0){
        xqbox.css({'top':toheight});
    }else{
        xqbox.css({'top':'0px'});
    };
    if(toleft<0){
        xqbox.css({'left':-(selfWidth+10)});
    }else{
        xqbox.css({'left':'38px'});
    }
}

var chart_toolbox_option = {
		// 普通线条或柱状图工具栏
		line_bar_toolbox : {
        	show:true,
        	orient: 'horizontal',
        	itemSize: 15,
        	itemGap: 10,
        	showTitle: true,
        	zlevel: 0,
        	z: 2,
        	left: 'auto',
        	top: '5',
        	right: '5',
        	botton: 'auto',
        	width: 'auto',
        	height: 'auto',
	        show: true,
	        feature: {
	    		myTool2: { // 自定义工具
	                show: true,
	                title: '数值标签',
	                //icon: 'image://'+basePath+'/crm/images/chart_tool_img/favicon.png',
	                icon: 'path://M480.219,412.273c-70.014,0-126.964-56.966-126.964-126.979c0-70.017,56.95-126.985,126.964-126.985c70.01,0,126.993,56.968,126.993,126.985C607.212,355.307,550.229,412.273,480.219,412.273L480.219,412.273z M480.216,186.58c-54.426,0-98.695,44.29-98.695,98.715c0,54.423,44.269,98.705,98.695,98.705c54.422,0,98.729-44.282,98.729-98.705C578.946,230.87,534.638,186.58,480.216,186.58L480.216,186.58z M480.219,512.636c-152.204,0-288.597-85.188-355.892-222.32c-3.103-6.307-3.103-13.698,0-20.009C191.622,133.189,328.015,48,480.219,48c152.237,0,288.627,85.189,355.921,222.307c3.102,6.312,3.102,13.702,0,20.01C768.846,427.448,632.451,512.636,480.219,512.636L480.219,512.636z M145.411,280.31c66.126,124.832,193.302,201.859,334.807,201.859c141.507,0,268.714-77.027,334.841-201.859C748.932,155.496,621.725,78.472,480.218,78.472C338.744,78.472,211.537,155.496,145.411,280.31L145.411,280.31z',
	                onclick: function (ecModel, api, type){
	                	doToggleEchartLabel(ecModel, api, type);
	                }
	            },
	            dataView: {
	            	show: true,
                	readOnly: true,
                	lang: ['数据视图','关闭'],
                	fn: function(viewMain){
                		/* 数据模型加载完成之后的回调 */
                		$(viewMain).css({
                			overflow: 'auto'
                        });
                	},
                	// 自定义数据视图展现：
                	// 1、第一列列名(代表时间、分类类别等)：取X轴名称(一般X轴没定义名称所以暂为空字符串)---取第一系列数据名称series[0].name(有可能也没定义)，暂时为空统一效果
                	// 2、后台N列列名(数据值列名、多图时不同图名称)：遍历每一系列名称，如果没定义则可以取Y轴名称(一般也为空)，没有为空
                	optionToContent: function(opt){
            		 	var axisData = opt.xAxis[0].data; // 适合单X轴y轴模式
            		 	if(typeof(axisData) === 'undefined' || axisData === null) { // 有可能是X、Y轴互换的图形，则判断如果没X轴数据，则用Y轴
            		 		axisData = opt.yAxis[0].data;
            		 	}
            		 	var axisName = opt.xAxis[0].name; // X轴坐标名称，可做为第一列名
            		 	var yAxisName = opt.yAxis[0].name; // y轴坐标名称，如果数据系列没定义name可用y轴列名使用y轴列名没有时可以默认定义成数量/占比
            		 	console.log("y轴名称：" + yAxisName);
            		 	console.log(axisData);
            		    var series = opt.series;
            		    var table = '<table style="width:100%; text-align:center"><tbody><tr>';
            		    // 处理列名
            		    table += '<td>' + axisName + '</td>'; // 第一列名设置成X轴名称
		                for(var j = 0; j < series.length; j++){ // 线条、柱状图单或多系列都可以从系列数据中遍历出每一系列列名，如果没定义或可以取Y轴名称
		                	if(typeof(series[j].name) == 'undefined' || series[j].name == null || series[j].name == '') {
		                		table += '<td>' + yAxisName + '</td>';
		                	} else {
		                		table += '<td>' + series[j].name + '</td>';
		                	}
		                }
            		    table += '</tr>';
            		    // 处理数据
            		    for (var i = 0, l = axisData.length; i < l; i++) { // 行遍历填充数据
            		        table += '<tr>';
            		        table += '<td>' + axisData[i] + '</td>'; // 第一列值就是X轴的数据
    		                for(var k = 0; k < series.length; k++){
    		                	var num = series[k].data[i];
    		                	if(typeof(num) == 'number' || typeof(num) === 'string') {
        		                	if(num == null || num === '') {
        		                		num=0;
        		                	}
        		                	table += '<td>' + num + '</td>';
    		                	} else { // 'object'类型
        		                	if(num == null || num === '') {
        		                		num = 0;
        		                		table += '<td>' + num + '</td>';
        		                	} else {
        		                		table += '<td>' + num.value + '</td>';
        		                	}
    		                	}

    		                	
    		                } 
            		        table += '</tr>';
            		    }
            		    
            		    table += '</tbody></table>';
            		    return table;
                	}
	            },
        		saveAsImage: {
        			type: 'png',
        			show: true,
        			backgroundColor: '#ffffff'
        			//backgroundColor: {
        			//	image: getRandomBgImg(),
        			//	repeat: 'no-repeat'
        			//}
        		}
	        }
		},
		// 需要区域缩放工具
		line_bar_datazoom_toolbox : {
        	show:true,
        	orient: 'horizontal',
        	itemSize: 15,
        	itemGap: 10,
        	showTitle: true,
        	zlevel: 0,
        	z: 2,
        	left: 'auto',
        	top: '5',
        	right: '5',
        	botton: 'auto',
        	width: 'auto',
        	height: 'auto',
	        show: true,
	        feature: {
	    		myTool2: { // 自定义工具
	                show: true,
	                title: '数值标签',
	                //icon: 'image://'+basePath+'/crm/images/chart_tool_img/favicon.png',
	                icon: 'path://M480.219,412.273c-70.014,0-126.964-56.966-126.964-126.979c0-70.017,56.95-126.985,126.964-126.985c70.01,0,126.993,56.968,126.993,126.985C607.212,355.307,550.229,412.273,480.219,412.273L480.219,412.273z M480.216,186.58c-54.426,0-98.695,44.29-98.695,98.715c0,54.423,44.269,98.705,98.695,98.705c54.422,0,98.729-44.282,98.729-98.705C578.946,230.87,534.638,186.58,480.216,186.58L480.216,186.58z M480.219,512.636c-152.204,0-288.597-85.188-355.892-222.32c-3.103-6.307-3.103-13.698,0-20.009C191.622,133.189,328.015,48,480.219,48c152.237,0,288.627,85.189,355.921,222.307c3.102,6.312,3.102,13.702,0,20.01C768.846,427.448,632.451,512.636,480.219,512.636L480.219,512.636z M145.411,280.31c66.126,124.832,193.302,201.859,334.807,201.859c141.507,0,268.714-77.027,334.841-201.859C748.932,155.496,621.725,78.472,480.218,78.472C338.744,78.472,211.537,155.496,145.411,280.31L145.411,280.31z',
	                onclick: function (ecModel, api, type){
	                	doToggleEchartLabel(ecModel, api, type);
	                }
	            },
	        	dataZoom: {
                    yAxisIndex: 'none'
               	},
	            dataView: {
	            	show: true,
                	readOnly: true,
                	lang: ['数据视图','关闭'],
                	fn: function(viewMain){
                		/* 数据模型加载完成之后的回调 */
                		$(viewMain).css({
                			overflow: 'auto'
                        });
                	},
                	// 自定义数据视图展现：
                	// 1、第一列列名(代表时间、分类类别等)：取X轴名称(一般X轴没定义名称所以暂为空字符串)---取第一系列数据名称series[0].name(有可能也没定义)，暂时为空统一效果
                	// 2、后台N列列名(数据值列名、多图时不同图名称)：遍历每一系列名称，如果没定义则可以取Y轴名称(一般也为空)，没有为空
                	optionToContent: function(opt){
            		 	var axisData = opt.xAxis[0].data; // 适合单X轴y轴模式
            		 	if(typeof(axisData) === 'undefined' || axisData === null) { // 有可能是X、Y轴互换的图形，则判断如果没X轴数据，则用Y轴
            		 		axisData = opt.yAxis[0].data;
            		 	}
            		 	var axisName = opt.xAxis[0].name; // X轴坐标名称，可做为第一列名
            		 	var yAxisName = opt.yAxis[0].name; // y轴坐标名称，如果数据系列没定义name可用y轴列名使用y轴列名没有时可以默认定义成数量/占比
            		 	console.log("y轴名称：" + yAxisName);
            		 	console.log(axisData);
            		    var series = opt.series;
            		    var table = '<table style="width:100%; text-align:center"><tbody><tr>';
            		    // 处理列名
            		    table += '<td>' + axisName + '</td>'; // 第一列名设置成X轴名称
		                for(var j = 0; j < series.length; j++){ // 线条、柱状图单或多系列都可以从系列数据中遍历出每一系列列名，如果没定义或可以取Y轴名称
		                	if(typeof(series[j].name) == 'undefined' || series[j].name == null || series[j].name == '') {
		                		table += '<td>' + yAxisName + '</td>';
		                	} else {
		                		table += '<td>' + series[j].name + '</td>';
		                	}
		                }
            		    table += '</tr>';
            		    // 处理数据
            		    for (var i = 0, l = axisData.length; i < l; i++) { // 行遍历填充数据
            		        table += '<tr>';
            		        table += '<td>' + axisData[i] + '</td>'; // 第一列值就是X轴的数据
    		                for(var k = 0; k < series.length; k++){
    		                	var num = series[k].data[i];
    		                	console.log('数据类型：' + (typeof(num)));
    		                	console.log(num);
    		                	if(typeof(num) == 'number' || typeof(num) == 'string') {
        		                	if(num == null || num === '') {
        		                		num=0;
        		                	}
        		                	table += '<td>' + num + '</td>';
    		                	} else { // 'object'类型
        		                	if(num == null || num === '') {
        		                		num = 0;
        		                		table += '<td>' + num + '</td>';
        		                	} else {
        		                		table += '<td>' + num.value + '</td>';
        		                	}
    		                	}	
    		                } 
            		        table += '</tr>';
            		    }
            		    
            		    table += '</tbody></table>';
            		    return table;
                	}
	            },
        		saveAsImage: {
        			type: 'png',
        			show: true,
        			backgroundColor: '#ffffff'
        		}
	        }
		},
		pie_toolbox : {
        	show:true,
        	orient: 'horizontal',
        	itemSize: 15,
        	itemGap: 10,
        	showTitle: true,
        	zlevel: 0,
        	z: 2,
        	left: 'auto',
        	top: '5',
        	right: '5',
        	botton: 'auto',
        	width: 'auto',
        	height: 'auto',
        	feature: {
        		myTool2: { // 自定义工具
                    show: true,
                    title: '数值标签',
                    //icon: 'image://'+basePath+'/crm/images/chart_tool_img/favicon.png',
                    icon: 'path://M480.219,412.273c-70.014,0-126.964-56.966-126.964-126.979c0-70.017,56.95-126.985,126.964-126.985c70.01,0,126.993,56.968,126.993,126.985C607.212,355.307,550.229,412.273,480.219,412.273L480.219,412.273z M480.216,186.58c-54.426,0-98.695,44.29-98.695,98.715c0,54.423,44.269,98.705,98.695,98.705c54.422,0,98.729-44.282,98.729-98.705C578.946,230.87,534.638,186.58,480.216,186.58L480.216,186.58z M480.219,512.636c-152.204,0-288.597-85.188-355.892-222.32c-3.103-6.307-3.103-13.698,0-20.009C191.622,133.189,328.015,48,480.219,48c152.237,0,288.627,85.189,355.921,222.307c3.102,6.312,3.102,13.702,0,20.01C768.846,427.448,632.451,512.636,480.219,512.636L480.219,512.636z M145.411,280.31c66.126,124.832,193.302,201.859,334.807,201.859c141.507,0,268.714-77.027,334.841-201.859C748.932,155.496,621.725,78.472,480.218,78.472C338.744,78.472,211.537,155.496,145.411,280.31L145.411,280.31z',
                    onclick: function (ecModel, api, type){
                    	doToggleEchartLabel(ecModel, api, type);
                    }
                },
	            dataView: {
	            	show: true,
                	readOnly: true,
                	lang: ['数据视图','关闭'],
                	fn: function(viewMain){
                		/* 数据模型加载完成之后的回调 */
                		$(viewMain).css({
                			overflow: 'auto'
                        });
                	},
                	// 1、饼图必须规定有图例，并且数据的顺序必须与图例一样
                	optionToContent: function(opt){
                		var series = opt.series;
                		var legend1 =  opt.legend[0];
                		var legendData; 
                		if(typeof(legend1) != 'undefined') {
                			legendData = opt.legend[0].data; // 饼图一个图例标记数据情况，一般情况下就单个饼图一个系列数据好处理
                		}
            		 	if(typeof(legendData) === 'undefined' || legendData === null) { // 没定义图例数据时，可以使用系列数据中第一列的值
            		 		var seriesdata1 = series[0].data; 
            		 		legendData = [];
            		 		if(seriesdata1.length > 0) {
            		 			for(var i = 0; i < seriesdata1.length; i++) {
            		 				var obj = seriesdata1[i];
            		 				if(typeof(obj) === 'object') { // 判断是对象时，如果是number或string则代表这里只有数据，没名称
            		 					legendData.push(obj.name);
            		 				}
            		 			}
            		 		}
            		 	}
            		 	console.log(legendData);
            		 	var legendName = ''; // 因为图例没有名称，则第一列名没有，则可以默认一个或为空字符串
            		    var table = '<table style="width:100%; text-align:center"><tbody><tr>';
            		    // 处理列名
            		    table += '<td>' + legendName + '</td>'; // 第一列名，饼图情况下一般没有
		                for(var j = 0; j < series.length; j++){ // 每一系列数据的名称，多系列下可能不适应。此地方应该只适应单饼图
		                	table += '<td>' + series[j].name + '</td>'
		                }
            		    table += '</tr>';
            		    // 处理数据
            		    for (var i = 0, l = legendData.length; i < l; i++) { // 行遍历填充数据
            		        table += '<tr>';
            		        table += '<td>' + legendData[i] + '</td>'; // 第一列值就是图例的数据
    		                for(var k = 0; k < series.length; k++){ // 需要保证图例数据顺序与系列数据中的值对应顺序一致，不然没法处理
    		                	var num = series[k].data[i];
    		                	if(typeof(num) == 'number' || typeof(num) == 'string') {
        		                	if(num == null || num === '') {
        		                		num=0;
        		                	}
        		                	table += '<td>' + num + '</td>';
    		                	} else { // 'object'类型
        		                	if(num == null || num === '') {
        		                		num = 0;
        		                		table += '<td>' + num + '</td>';
        		                	} else {
        		                		table += '<td>' + num.value + '</td>';
        		                	}
    		                	}
    		                } 
            		        table += '</tr>';
            		    }
            		    table += '</tbody></table>';
            		    return table;
                	}
	            },
        		saveAsImage: {
        			type: 'png',
        			show: true,
        			backgroundColor: '#ffffff'
        		}
        	}
        },
        pie_toolboxs : {
        	show:true,
        	orient: 'horizontal',
        	itemSize: 15,
        	itemGap: 10,
        	showTitle: true,
        	zlevel: 0,
        	z: 2,
        	left: 'auto',
        	top: '5',
        	right: '5',
        	botton: 'auto',
        	width: 'auto',
        	height: 'auto',
        	feature: {
	            dataView: {
	            	show: true,
                	readOnly: true,
                	lang: ['数据视图','关闭'],
                	fn: function(viewMain){
                		/* 数据模型加载完成之后的回调 */
                		$(viewMain).css({
                			overflow: 'auto'
                        });
                	},
                	// 1、饼图必须规定有图例，并且数据的顺序必须与图例一样
                	optionToContent: function(opt){
                		var series = opt.series;
                		var legend1 =  opt.legend[0];
                		var legendData; 
                		if(typeof(legend1) != 'undefined') {
                			legendData = opt.legend[0].data; // 饼图一个图例标记数据情况，一般情况下就单个饼图一个系列数据好处理
                		}
            		 	if(typeof(legendData) === 'undefined' || legendData === null) { // 没定义图例数据时，可以使用系列数据中第一列的值
            		 		var seriesdata1 = series[0].data; 
            		 		legendData = [];
            		 		if(seriesdata1.length > 0) {
            		 			for(var i = 0; i < seriesdata1.length; i++) {
            		 				var obj = seriesdata1[i];
            		 				if(typeof(obj) === 'object') { // 判断是对象时，如果是number或string则代表这里只有数据，没名称
            		 					legendData.push(obj.name);
            		 				}
            		 			}
            		 		}
            		 	}
            		 	console.log(legendData);
            		 	var legendName = ''; // 因为图例没有名称，则第一列名没有，则可以默认一个或为空字符串
            		    var table = '<table style="width:100%; text-align:center"><tbody><tr>';
            		    // 处理列名
            		    table += '<td>' + legendName + '</td>'; // 第一列名，饼图情况下一般没有
		                for(var j = 0; j < series.length; j++){ // 每一系列数据的名称，多系列下可能不适应。此地方应该只适应单饼图
		                	table += '<td>' + series[j].name + '</td>'
		                }
            		    table += '</tr>';
            		    // 处理数据
            		    for (var i = 0, l = legendData.length; i < l; i++) { // 行遍历填充数据
            		        table += '<tr>';
            		        table += '<td>' + legendData[i] + '</td>'; // 第一列值就是图例的数据
    		                for(var k = 0; k < series.length; k++){ // 需要保证图例数据顺序与系列数据中的值对应顺序一致，不然没法处理
    		                	var num = series[k].data[i];
    		                	if(typeof(num) == 'number' || typeof(num) == 'string') {
        		                	if(num == null || num === '') {
        		                		num=0;
        		                	}
        		                	table += '<td>' + num + '</td>';
    		                	} else { // 'object'类型
        		                	if(num == null || num === '') {
        		                		num = 0;
        		                		table += '<td>' + num + '</td>';
        		                	} else {
        		                		table += '<td>' + num.value + '</td>';
        		                	}
    		                	}
    		                } 
            		        table += '</tr>';
            		    }
            		    table += '</tbody></table>';
            		    return table;
                	}
	            },
        		saveAsImage: {
        			type: 'png',
        			show: true,
        			backgroundColor: '#ffffff'
        		}
        	}
        },
		radar_toolbox: {
	        show : true,
	        feature : {
        		myTool2: { // 自定义工具 家庭结构访转成交趋势
                    show: true,
                    title: '数值标签',
                    //icon: 'image://'+basePath+'/crm/images/chart_tool_img/favicon.png',
                    icon: 'path://M480.219,412.273c-70.014,0-126.964-56.966-126.964-126.979c0-70.017,56.95-126.985,126.964-126.985c70.01,0,126.993,56.968,126.993,126.985C607.212,355.307,550.229,412.273,480.219,412.273L480.219,412.273z M480.216,186.58c-54.426,0-98.695,44.29-98.695,98.715c0,54.423,44.269,98.705,98.695,98.705c54.422,0,98.729-44.282,98.729-98.705C578.946,230.87,534.638,186.58,480.216,186.58L480.216,186.58z M480.219,512.636c-152.204,0-288.597-85.188-355.892-222.32c-3.103-6.307-3.103-13.698,0-20.009C191.622,133.189,328.015,48,480.219,48c152.237,0,288.627,85.189,355.921,222.307c3.102,6.312,3.102,13.702,0,20.01C768.846,427.448,632.451,512.636,480.219,512.636L480.219,512.636z M145.411,280.31c66.126,124.832,193.302,201.859,334.807,201.859c141.507,0,268.714-77.027,334.841-201.859C748.932,155.496,621.725,78.472,480.218,78.472C338.744,78.472,211.537,155.496,145.411,280.31L145.411,280.31z',
                    onclick: function (ecModel, api, type){
                    	doToggleEchartLabel(ecModel, api, type);
                    }
                },
	            dataView: {
	            	show: true,
                	readOnly: true,
                	lang: ['数据视图','关闭'],
                	fn: function(viewMain){
                		/* 数据模型加载完成之后的回调 */
                		$(viewMain).css({
                            overflow: 'auto'
                        });
                	},
                	// 1、规定雷达图使用单系列，数据可能多项内容
                	optionToContent: function(opt){
            		 	var indicatorData = opt.radar[0].indicator; // 雷达图数据变量维度
            		 	var indicatorName = "";
            		 	console.log(indicatorData);
            		    var series = opt.series;
            		    var table = '<table style="width:100%; text-align:center"><tbody><tr>';
            		    // 处理列名
            		    table += '<td>' + indicatorName + '</td>'; // 第一列名，饼图情况下一般没有
            		    var dataLength = series[0].data.length;
            		    var radarData = series[0].data;
		                for(var j = 0; j < dataLength; j++){ // 每一系列数据的名称, 但第一系列可能有多项数据
		                	table += '<td>' + radarData[j].name + '</td>'
		                }
            		    table += '</tr>';
            		    // 处理数据
            		    for (var i = 0, l = indicatorData.length; i < l; i++) { // 行遍历填充数据
            		        table += '<tr>';
            		        table += '<td>' + indicatorData[i].name + '</td>'; // 雷达维度有name,max,min等属性取name
    		                for(var k = 0; k < dataLength; k++){ // 雷达数据
    		                	var num = radarData[k].value[i];
    		                	if(typeof(num) == 'number' || typeof(num) == 'string') {
        		                	if(num == null || num === '') {
        		                		num=0;
        		                	}
        		                	table += '<td>' + num + '</td>';
    		                	} else { // 'object'类型
    		                		table += '<td>' + num + '</td>'; // 雷达的数据好像不会是其它类别的
    		                	}
    		                } 
            		        table += '</tr>';
            		    }
            		    table += '</tbody></table>';
            		    return table;
                	}
	            },
        		saveAsImage: {
    	            dataView: {
    	            	show: true
    	            },
        			type: 'png',
        			show: true,
        			backgroundColor: '#ffffff'
        		}
	        }
	    }
}

//echarts报表自定义“显示数值标签”按钮事件处理方法 option报表配置，api报表实全部分方法，type按钮缩写my开头
function doToggleEchartLabel(ecModel, api, type) {
	// 获取当前报表对应的dom元素，在dom元素中存储flag表示当前显示还是隐藏label，另外根据dom元素获取对应的echats实例对象
	console.log(type);
	var chart_dom = api.getDom();
	var flag = chart_dom.getAttribute('echartlabelflag');
	var chart = echarts.getInstanceByDom(chart_dom);
	
	var series_length = ecModel.option.series.length; // 数据系列数量
	var series = ecModel.option.series;
	var labelOption = [];
	if(typeof(flag) == 'undefined' || flag == null || flag == 0) { // 默认不显示，点击后显示
		for(var i = 0; i < series_length; i++) {
			labelOption.push(getLabelOption(series[i].type));
		}
		//chart.setOption({series: labelOption, toolbox: {feature: {myTool2: {icon: 'image://'+basePath+'/crm/images/chart_tool_img/favicon_highlight.png'}}}});
    	chart_dom.setAttribute('echartlabelflag', 1);
	} else {
		for(var i = 0; i < series_length; i++) { // 不显示，直接加入show:false不管图形类别
			labelOption.push({
	            label: {
	                normal: {
	                    show: false // true|false
	                },
	                emphasis: {
	                    show: false // true|false
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false // true|false
	                },
	                emphasis: {
	                    show: false // true|false
	                }
	            }
			});
		}
		//chart.setOption({series: labelOption, toolbox: {feature: {myTool2: {icon: 'image://'+basePath+'/crm/images/chart_tool_img/favicon.png'}}}});
		
    	chart_dom.setAttribute('echartlabelflag', 0);
	}
	chart.setOption({series: labelOption});
}

//根据echart图形类别，返回适合的数值显示配置
function getLabelOption(series_type) {
	console.log(series_type);
	if(series_type == 'line') {
		return {
			label: {
                normal: {
                    show: true, // true|false
                    position: 'top', // 默认也是top
                    formatter: '{c}' // 只显示数值，需要百分号%的，得有标志判断，需要在图表dom中专门配置参数表示
                },
                emphasis: {
                    show: true, 
                    position: 'top',
                    formatter: '{c}'
                }
			}
		};
	} else if(series_type == 'bar') {
		return {
			label: {
                normal: {
                    show: true, // true|false
                    position: 'top', // 默认是inside
                    formatter: '{c}' // 只显示数值，需要百分号%的，得有标志判断，需要在图表dom中专门配置参数表示
                },
                emphasis: {
                    show: true, 
                    position: 'inside',
                    formatter: '{c}'
                }
			}
		};
	} else if(series_type == 'pie') {
		return {
			label: {
                normal: {
                    show: true, // true|false
                    position: 'outside', // 默认也是outside
                    formatter: '{b}: {c}({d}%)' // 饼状图，有百分比d
                },
                emphasis: {
                    show: true, 
                    position: 'outside',
                    formatter: '{b}: {c}({d}%)'
                }
			},
			labelLine: { // 视觉引导线，是否需要
				normal: {
					show: true
				}, 
				emphasis: {
					show: true
				}
			}
		};
	} else if(series_type == 'funnel') {
		return {
			label: {
                normal: {
                    show: true, // true|false
                    position: 'outside', // 默认也是outside
                    formatter: '{b}: {c}({d}%)' // 漏斗图，有百分比d
                },
                emphasis: {
                    show: true, 
                    position: 'outside',
                    formatter: '{b}: {c}({d}%)'
                }
			},
			labelLine: { // 视觉引导线，是否需要left right时起作用
				normal: {
					show: true
				}, 
				emphasis: {
					show: true
				}
			}
		};
	} else if(series_type == 'radar') {
		return {
			label: {
                normal: {
                    show: true, // true|false
                    position: 'top', // 默认也是outside
                    formatter: '{b}: {c}' // 漏斗图，有百分比d
                },
                emphasis: {
                    show: true, 
                    position: 'top',
                    formatter: '{b}: {c}'
                }
			}
		};
	}
}

//随机获取一个背景图image元素
function getRandomBgImg() {
	var location = (window.location+'').split('/');  
	var basePath = location[0]+'//'+location[2]+'/'+location[3];  
	
	var imageArr = [
		'/images/chart_bg_img/chart_925_414_bg1.jpg',
		'/images/chart_bg_img/chart_925_414_bg2.jpg',
		'/images/chart_bg_img/chart_925_414_bg3.jpg',
		'/images/chart_bg_img/chart_925_414_bg4.jpg',
		'/images/chart_bg_img/chart_925_414_bg5.jpg'
	];
	var randomNum = Math.floor(Math.random()*4);
	var imgDom = new Image();
	imgDom.src = basePath + imageArr[randomNum];
	return imgDom;
}

// loading调用方法
function loading(){
    $(window.top.document).find('.fakeloader').show();
}

function hideloading(){
    $(window.top.document).find('.fakeloader').hide();
}

function bigger(){
    $('.bigger-icon').click(function(){
        var id = $(this).attr('uuid');
        var width = $('#'+id).width();
        var height = $('#'+id).height();
        var present = width/height;
        var topwin = window.top.document;
        $(topwin).find('.DmpFine-confirm').show();
        var num1 = $(topwin).find('#earcharts').width()/present;
        var num2 = $(topwin).height()*0.9;
        $(topwin).find('#earcharts').height( num1>num2?num2:num1);
        var myChart = echarts.init($(topwin).find('#earcharts')[0]);
        var opt = echarts.getInstanceByDom($('#'+id)[0]).getOption();
        myChart.setOption(opt);
        $(topwin).find('#earcharts').css('backgroundColor','#ffffff');
    });
}

function formatNULLValue(value) {
    if(value === null || value === undefined)
        return "";
    return value;
}

//表格操作图标提示
function tableTips() {
	$(".ctrl a b").mouseover(function () {
        $(this).find(".tips").show();
    })
    $(".ctrl a b").mouseout(function () {
        $(this).find(".tips").hide();
    })
}