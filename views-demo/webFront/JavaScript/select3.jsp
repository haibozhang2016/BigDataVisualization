<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>三级下拉联动</title>
<jsp:include page="/head.jsp" />
<script type="text/javascript">
	$(function(){
		
		//430124
		
		var selects = $("select"); 
		
		selects.empty();
		selects.append("<option value=''>请选择</option>");
		
		$.post(
			"web2/city-list.do",
			function(data){
				var s = selects.eq(0);

//				for(var i = 0 ;i< data.length;i++){
////					s.append("<option value=\""+data[i].id+"\">"+data[i].name+"</option>");
//					var o = $("<option></option>");
//					o.text(data[i].name);
//					o.attr("value",data[i].id);
//					s.append(o);
//				}
				$.each(data, function(i,v) {
					var o = $("<option></option>");
					o.text(v.name);
					o.attr("value",v.id);
					s.append(o);
				});
			},"json"
		);
		
		selects.eq(0).change(function(){
			var val = $(this).val();
			
			selects.eq(1).empty();
			selects.eq(1).append("<option value=''>请选择</option>");
			selects.eq(1).change();
			if(val!=""){
				$.post(
					"web2/city-list.do",
					{"level":1,"id":val},
					function(data){
						var s = selects.eq(1);
						$.each(data, function(i,v) {
							var o = $("<option></option>");
							o.text(v.name);
							o.attr("value",v.id);
							s.append(o);
						});
					},"json"
				);
			}
		});
		
		
		
		selects.eq(1).change(function(){
			var val = $(this).val();
			
			selects.eq(2).empty();
			selects.eq(2).append("<option value=''>请选择</option>");
			if(val!=""){
				$.post(
					"web2/city-list.do",
					{"level":2,"id":val},
					function(data){
						var s = selects.eq(2);
						$.each(data, function(i,v) {
							var o = $("<option></option>");
							o.text(v.name);
							o.attr("value",v.id);
							s.append(o);
						});
					},"json"
				);
			}
		});
		
		
	});
</script>
</head>
<body>
<div class="container" style="padding-top:100px;">
	<div class="col-md-1">省</div>
	<div class="col-md-3"><select class="form-control">
		<option></option>
	</select></div>
	<div class="col-md-1">市</div>
	<div class="col-md-3"><select class="form-control"></select></div>
	<div class="col-md-1">县</div>
	<div class="col-md-3"><select class="form-control"></select></div>
</div>

</body>
</html>