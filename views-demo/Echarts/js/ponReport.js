/**
 * PON监控报告
 */
// 格式化日期
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if(/(y+)/.test(fmt)){
   		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    } 
    for (var k in o){
    	if(new RegExp("(" + k + ")").test(fmt)){
    		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    	} 
    }
    return fmt;
}

// 生成随机整数
function randomNum(min, max){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random() * min + 1, 10); 
       		break; 
        case 2: 
            return parseInt(Math.random() * (max - min + 1) + min, 10); 
        	break; 
        default: 
            return 0; 
            break; 
    } 
} 

// 数组过滤
function arrFilter(arr){
	var newArr = [];
	for (var i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) === -1 ) {
            newArr.push(arr[i]);
        }
    }
	//newArr = arrSort(newArr); // 排序
	return newArr.map(function(value, index, array){
		return {yAxis: value};
	});
}

// 数组排序
function arrSort(arr){
	var i = 0, len = arr.length, j, d;
  	for(; i < len; i++){
   		for(j = 0; j < len; j++){
      		if(parseInt(arr[i].substring(1)) < parseInt(arr[j].substring(1))){
        		d = arr[j];
        		arr[j] = arr[i];
        		arr[i] = d;
      		}
    	}
  	}
	return arr;
}

// map操作
function arrMap(arr, func){
	if(!func){
		func = getAccount;
	}
	return arr.map(function(value, index, array){
		return func(value);
	})
}

// 获取账户信息
function getAccount(val){
	return val[1];
}

var countChart = echarts.init(document.getElementById("countChart"));
var bdDetailchart = echarts.init(document.getElementById("bdDetailchart"));
var iptvDetailchart = echarts.init(document.getElementById("iptvDetailchart"));

$(function($) {
	var panels = ["basicInfo", "runningState", "legend", "monitor"];
	for(var index in panels){
		bindClickFunc(panels[index]);
	}
	initChart();
});

function initChart(){
	var chartData = {};
	countChart.showLoading();
	$.get('./data/ponData.json', function(ponData) {
	    countChart.hideLoading();
	    chartData = ponData;
	    refreshCountChart(ponData);
	    refreshBdDetailChart(ponData["detail"]);
	    refreshIptvDetailChart(ponData["detail"]);
	});
	// 同步
    echarts.connect([countChart, bdDetailchart, iptvDetailchart]);
	setInterval(function(){ 
		var iptv = chartData["IPTV"];
		var bd = chartData["BD"];
		var cDate = chartData["date"];
		iptv.splice(0,1);
		iptv.push(Math.random() * 2000);
		bd.splice(0,1);
		bd.push(Math.random() * 3000);
		cDate.splice(0,1);
		cDate.push(new Date().Format("HH:mm:ss"));
		var normal = chartData["detail"]["USER_REQUEST"];
		normal.splice(0,1);
		normal.push([new Date().Format("HH:mm:ss"), "S" + randomNum(5, 20)]);
		refreshCountChart(chartData);
		refreshBdDetailChart(chartData["detail"]);
		refreshIptvDetailChart(chartData["detail"]);
	}, 3000);
}
function refreshCountChart(cData){
	var countOption = {
		title: {
   			text: "在线人数",
   			textStyle: {
				fontSize: 13,
			},
			x: "left"
   		},
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    show: true
                }
            }
        },
        grid: {
            top: '8%',
            left: '0%',
            right: '0%',
            bottom: '3%',
            containLabel: true
        },
        calculable : true, //x、y轴是否可计算
        legend: { //图例说明文字设置
        	show: true,
            data:['宽带', 'IPTV', "宽带1", 'IPTV1'], //需要和series对上才能显示
            itemGap: 5,
            x: 'center',
            y: 'top',
            selectedMode: 'multiple', //选择模式，默认开启图例开关，可选single，multiple
        },
        xAxis: [
            {
                type : 'category',
                //name : '日期',
                data : cData.date,
                axisTick: {
                	show: true
                },
                axisLabel:{
	              	rotate: 270, 
	              	textStyle: {
	                 	fontSize: 12
	              	}
	            }
            }
        ],
        yAxis: [
            {
                type : 'value',
                //name : '数量',
                axisTick: {
                	show: true,
                	inside: true
                }
            }
        ],
        dataZoom: [
            {
                show: false,
                start: 0,
                end: 100
            }
        ],
        series : [
            {
                name: '宽带',
                type: 'bar',
                data: cData.BD
                ,itemStyle: {
                	normal: {
                		color: 'green',
                		barBorderRadius: [3, 3, 0, 0]
                	}
                }
            },
            {
                name: 'IPTV',
                type: 'bar',
                data: cData.IPTV
                ,itemStyle: {
                	normal: {
                		color: 'darkblue',
                		barBorderRadius: [3, 3, 0, 0]
                	}
                }
            }
        ]
   };
    countChart.setOption(countOption);
}

function refreshBdDetailChart(cData){
	var markLineData = arrFilter(
		[].concat(arrMap(cData["USER_REQUEST"]))
				.concat(arrMap(cData["LOST_SERVICE"]))
				.concat(arrMap(cData["IDLS_TIMEOUT"]))
				.concat(arrMap(cData["ADMIN_RESET"]))
				.concat(arrMap(cData["BAS_ERROR"]))
				.concat(arrMap(cData["LOST_CARRIER"]))
	);
	
	var bdDetailOption = {
	    title: {
   			text: "上下线详情（宽带）",
   			textStyle: {
				fontSize: 13,
			},
			x: "left"
   		},
   		grid: {
            top: '8%',
            left: '1%',
            right: '0%',
            bottom: '2%',
            containLabel: true
        },
        dataZoom: [
            {
                show: false,
                start: 0,
                end: 100
            }
        ],
	    tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    show: true
                }
            }
        },
	    legend: {
	        data:['正常下线', '业务异常', "资源回收", "局端操作用户下线", "局端异常掉线", "接入网异常掉线"],
	        x: 'center',
	        y: 'top'
	    },
	    xAxis : [
	        {
	            type : 'category',
	            axisLabel:{
                	show: true,
                	rotate: 270, 
	              	textStyle: {
	                 	fontSize: 12
	              	}
	            },
	            axisTick: {
	            	inside: true,
	            },
	            position: 'bottom'
	        }
	    ],
	    yAxis : [
	        {
	            type : 'category',
	            axisLabel:{
                	show: true,
	              	textStyle: {
	                 	fontSize: 12
	              	}
	            },
	            axisTick: {
	            	inside: true,
	            	show: false
	            }
	            /*,splitLine: {
	            	show: true
	            }*/
	        }
	    ],
	    series : [
	        {
	            name: '正常下线',
	            type: 'scatter',
	            data: cData["USER_REQUEST"],
	            // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow',
            	// path://m 0,0 h 48 v 20 h -30 l -6,10 l -6,-10 h -6 z,  
            	// path://m 0,0 h 48 v 20 h -34 l -6,10 l -6,-10 h -2 z
            	symbol: 'circle'
            	,markLine : {
	            	symbol: '',
	            	itemStyle: {
	            		normal: {
	            			color: '#191616',
	            			lineStyle: {
	            				type: 'dashed'
	            			}
	            		}
	            	},
	                data : markLineData
	            }
	        },
	        {
	            name:'业务异常',
	            type:'scatter',
	            data: cData["LOST_SERVICE"],
	            symbol: 'circle'
	        },
	        {
	            name:'资源回收',
	            type:'scatter',
	            data: cData["IDLS_TIMEOUT"],
	            symbol: 'circle'
	        }, 
	        {
	            name:'局端操作用户下线',
	            type:'scatter',
	            data: [],
	            symbol: 'circle'
	        },
	        {
	            name:'局端异常掉线',
	            type:'scatter',
	            data: [],
	            symbol: 'circle'
	        },
	        {
	            name:'接入网异常掉线',
	            type:'scatter',
	            data: [],
	            symbol: 'circle'
	        }
	    ]
	};
    bdDetailchart.setOption(bdDetailOption);
}

function refreshIptvDetailChart(cData){
	var markLineData = arrFilter(
		[].concat(arrMap(cData["USER_REQUEST"]))
				.concat(arrMap(cData["LOST_SERVICE"]))
				.concat(arrMap(cData["IDLS_TIMEOUT"]))
				.concat(arrMap(cData["ADMIN_RESET"]))
				.concat(arrMap(cData["BAS_ERROR"]))
				.concat(arrMap(cData["LOST_CARRIER"]))
	);
	
	var iptvDetailOption = {
	    title: {
   			text: "上下线详情（IPTV）",
   			textStyle: {
				fontSize: 13,
			},
			x: "left"
   		},
   		grid: {
            top: '8%',
            left: '1%',
            right: '0%',
            bottom: '2%',
            containLabel: true
        },
        dataZoom: [
            {
                show: false,
                start: 0,
                end: 100
            }
        ],
	    tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    show: true
                }
            }
        },
        legend: {
	        data:['正常下线', '业务异常', "资源回收", "局端操作用户下线", "局端异常掉线", "接入网异常掉线"],
	        x: 'center',
	        y: 'top',
	        show: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            axisLabel:{
                	show: true,
                	rotate: 270, 
	              	textStyle: {
	                 	fontSize: 12
	              	}
	            },
	            axisTick: {
	            	inside: true
	            },
	            position: 'bottom'
	        }
	    ],
	    yAxis : [
	        {
	            type : 'category',
	            axisLabel:{
                	show: true,
	              	textStyle: {
	                 	fontSize: 12
	              	}
	            },
	            axisTick: {
	            	inside: true,
	            	show: false
	            }
	            /*,splitLine: {
	            	show: true,
	            	color: 'blue'
	            }*/
	        }
	    ],
	    series : [
	        {
	            name: '正常下线',
	            type: 'scatter',
	            data: cData["USER_REQUEST"],
	            // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow',
            	// path://m 0,0 h 48 v 20 h -30 l -6,10 l -6,-10 h -6 z,  
            	// path://m 0,0 h 48 v 20 h -34 l -6,10 l -6,-10 h -2 z
            	/**
            	 *  A RX,RY,XROTATION,FLAG1,FLAG2,X,Y
				 *	RX,RY指所在椭圆的半轴大小
				 *	XROTATION指椭圆的X轴与水平方向顺时针方向夹角，可以想像成一个水平的椭圆绕中心点顺时针旋转XROTATION的角度。
				 *	FLAG1只有两个值，1表示大角度弧线，0为小角度弧线。
				 *	FLAG2只有两个值，确定从起点至终点的方向，1为顺时针，0为逆时针
				 *	X,Y为终点坐标
            	 */
            	symbol: 'circle'
            	//symbol: 'path://M 100, 100 m -100, 0 a 100,100 0 1,0 200,0 a 100,100 0 1,0 -200,0'
            	,markLine : {
	            	symbol: '',
	            	itemStyle: {
	            		normal: {
	            			color: '#191616',
	            			lineStyle: {
	            				type: 'dashed'
	            			}
	            		}
	            	},
	            	data: markLineData
	            }
	        },
	        {
	            name:'业务异常',
	            type:'scatter',
	            data: cData["LOST_SERVICE"],
	            symbol: 'circle',
	            //symbol: 'path://M130 50 L100 100 L160 100 L130 50 M130 60 L130 80 M130 85 L130 90 Z',
	            itemStyle: {
	            	normal: {
	            		color: '#f2711cf0'
	            	}		
	            }	
	        },
	        {
	            name:'资源回收',
	            type:'scatter',
	            data: cData["IDLS_TIMEOUT"],
	            symbol: 'circle'
	        },
	        {
	            name:'局端操作用户下线',
	            type:'scatter',
	            data: [],
	            symbol: 'circle'
	        },
	        {
	            name:'局端异常掉线',
	            type:'scatter',
	            data: [],
	            symbol: 'circle'
	        },
	        {
	            name:'接入网异常掉线',
	            type:'scatter',
	            data: [],
	            symbol: 'circle'
	        }
	    ]
	};
    iptvDetailchart.setOption(iptvDetailOption);
}

window.onresize = function(){
	if(countChart){
		countChart.resize();
	}
	if(bdDetailchart){
		bdDetailchart.resize();
	}
	if(iptvDetailchart){
		iptvDetailchart.resize();
	}
}

// 绑定点击事件
function bindClickFunc(name){ 
	$('#' + name).on("click", function(){
		$("#"+ name +"Body").slideToggle();
		var className = $('#' + name + " .expandIcon > span").attr("class");
		if(className == "glyphicon glyphicon-chevron-up"){
			$('#' + name + " .expandIcon > span").attr("class", "glyphicon glyphicon-chevron-down");
		}else{
			$('#' + name + " .expandIcon > span").attr("class", "glyphicon glyphicon-chevron-up");
		}
  	})
}
// 查询城市信息
function getCityList(){
	$.get('./data/cities.json', function (data) {
		var cities = data.cities;
		$("#cityList").empty();
		if(cities.length <= 0){
			$("#cityList").append('<option value="">无</option>');
			return;
		}
		for(var index in cities){
			$("#cityList").append('<option value="'+ cities[index] +'">'+ cities[index] +'</option>')
		}
	})
	getAccountList();
}
// 查询账号信息
function getAccountList(){
	$.get('./data/account.json', function(data) {
		var accounts = data.accounts;
		$("#accountList").empty();
		for(var index in accounts){
			var account = accounts[index];
			console.log(account);
			$("#accountList").append(
			  '<tr class="gradeX">'
				+ '<td hidden>'+ account.id +'</td>'
				+ '<td>'+ account.area +'</td>'
				+ '<td>'+ account.brasIp +'</td>'
				+ '<td>'+ account.oltIp +'</td>'
				+ '<td>'+ account.oltDport +'</td>'
				+ '<td class="center" style="padding-top: 4px;"><button class="monitorClass">监控</button></td>'
				+ '</tr>');
		}
	})
}
// 分页
function paginationFunc(currentPage, numberOfPages, totalPages){
	$('#paginatorTag').bootstrapPaginator({
        bootstrapMajorVersion: 3, 		//对应的bootstrap版本
        currentPage: currentPage,		//当前页数，这里是用的EL表达式，获取从后台传过来的值
        numberOfPages: numberOfPages, 	//显示页数
        totalPages: totalPages,			//总页数，这里是用的EL表达式，获取从后台传过来的值
        shouldShowPage: true,			//是否显示该按钮
        useBootstrapTooltip: true,
        onPageClicked: function (event, originalEvent, type, page) {
            
        }
    });
}
paginationFunc(1, 3, 20000);

var count = 1;
function refreshPagination(){
	paginationFunc(count++, 3, 20000);
}