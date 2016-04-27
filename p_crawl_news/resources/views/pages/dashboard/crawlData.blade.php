<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta content="width=device-width,initial-scale = 1" name="viewport">
        <meta name="csrf-token" content="{!! Session::token() !!}">
        <link href="{{asset('/libs/bootstrap/css/bootstrap.min.css')}}" type="text/css" rel="stylesheet" />
        <!-- --------------------------------------- -->
		<script type="text/javascript" src="{{asset('/libs/jquery/jquery.min.js')}}"></script>
		<script type="text/javascript" src="{{asset('/libs/notify/notify.min.js')}}"></script>
    	<script type="text/javascript" src="{{asset('/js/crawl/readability.js')}}"></script>
    	<script type="text/javascript" src="{{asset('/js/crawl/custom.js')}}"></script>
    	<script type="text/javascript" src="{{asset('/js/crawl/crawl.js')}}"></script>
    	<script type="text/javascript" src="{{asset('/js/crawl/data.js')}}"></script>
    	<script>
    		var URL_ROOT = "{{ URL::route('index') }}/";
    		var TOKEN	 = "{{csrf_token()}}"
		</script>
		<style>
			/*.container{
				display:none;
			}*/
		</style>
    </head>
    <body>
    	<div class="container" style="margin-top: 10px; padding-right: 5px; padding-left: 5px; width: 100%; overflow-x:hidden;">
    		<div id="crawl-status"></div>
    		
    		<a href="{{URL::route('deleteNewsAll')}}" target="_blank" class="btn btn-warning"> Remove All</a>
    		<button onclick="save()" class="btn btn-primary"> Save to Database</button>
		</div>
		<div id="content" style="display:none"></div>
		<div id="content_show"></div>
	    <script>

	    	function saveToDatabase(arr){
	    		if(arr !=undefined){
	    			var params = {
		    			_token	: TOKEN,
		    			arr		: arr,
		    		};
		    		$.post(URL_ROOT + 'aj_save_news', params, function (data) {
		    			console.log(data)
		    			INDEX ++;
		    			saveToDatabase(NEWS_LIST_2[INDEX]);
		    			//todo
				    }).always(function() {
				    	//todo
				    }).error(function(e){
				    	if(e.status == 401){
				    		//todo
				    	}
				    });
	    		}
	    	}
	    	function save(){
	    		INDEX = 0;
	    		NEWS_LIST_2 = splitArr(NEWS_LIST);
	    		saveToDatabase(NEWS_LIST_2[INDEX]);
	    	}
	    	function splitArr(arr){
	    		var arr_2 = [];
	    		var arr_sub = [];
	    		for(var i=0; i<arr.length ;i++){
	    			arr_sub.push(arr[i]);
	    			if( i%50 == 0 && i!=0){
	    				arr_2.push(arr_sub);
	    				arr_sub = [];
	    			}
	    		}
	    		if(arr_sub.length > 0){
	    			arr_2.push(arr_sub);
	    		}
	    		return arr_2
	    	}
	    	var NEWS_LIST = [];
	    	var INDEX = 0;
	    	var NEWS_LIST_2 = [];
	    	$(document).ready(function(){
	    		var start_time = new Date().getTime();
	    		
	    		var arr = [];
	    		/*get news list*/
	    		/*vnexpress.net:106*/  
	   			for(var i=0; i<vnexpress_beauty.length; i++){
	   				arr = getListAll(vnexpress_beauty_obj,vnexpress_beauty[i],arr);
	   			}
 	   			
	   			/*eva.vn: 103*/ 
	   			for(var i=0; i<eva_thoitrang.length; i++){
	   				arr = getListAll(eva_thoitrang_obj,eva_thoitrang[i],arr);
	   			}
 	   			
	   			/*ngoisao.net: 24*/ 
	   			for(var i=0; i<ngoisao_news.length; i++){
	   				arr = getListAll(ngoisao_news_obj,ngoisao_news[i],arr);
	   			}
	   			
	   			/*kenh14.vn:*/ 
	   			for(var i=0; i<kenh14_news.length; i++){
	   				arr = getListAll(kenh14_news_obj,kenh14_news[i],arr);
	   			}
	   			
 	   			/*phunutoday.vn:*/ 
	   			for(var i=0; i<phunutoday_vn.length; i++){
	   				arr = getListAll(phunutoday_vn_obj,phunutoday_vn[i],arr);
	   			}
	   			
	   			/*ebe.vn:*/ 
	   			// for(var i=0; i<ebe_vn.length; i++){
	   				// arr = getListAll(ebe_vn_obj,ebe_vn[i],arr);
	   			// }
	   			
	   			/*get detail content*/
	   			// console.log("get detail:**********************")
	   			// arr = getDetail(arr);
	   			
	   			/*video*****************************************************/
	   			// /*youtube.com:*/ 
	   			// for(var i=0; i<youtube_com.length; i++){
	   				// arr = getListAll(youtube_com_obj,youtube_com[i],arr);
	   			// }
	   			// /*get detail content*/
	   			// console.log("get detail:**********************")
	   			// arr = getDetailYoutube(arr);
	   			
	   			/*check how long to get data*/
	   			var end_time = new Date().getTime();
	   			console.log(end_time-start_time)
	   			NEWS_LIST = arr;
	   			console.log(NEWS_LIST.length)
	   			console.log(NEWS_LIST)
	    		
	    	});
    	</script>
    </body>
</html>