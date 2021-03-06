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
    </head>
    <body>
    	<div class="container" style="margin-top: 10px; padding-right: 5px; padding-left: 5px; width: 100%; overflow-x:hidden;">
    		<div id="crawl-status"></div>
		</div>
	    <script>
	    	function saveToDatabase_update(arr){
	    		if(arr !=undefined){
	    			var params_check = {
		    			_token	: TOKEN,
		    			arr		: arr,
		    		};

		    		$.post(URL_ROOT + 'aj_check_news_update', params_check, function (data) {
		    			console.log("Check group:"+INDEX);
		    			if(data.count > 0){
		    				/*convert obj to arr*/
		    				var arr = $.map(data.arr, function(value, index) {
							    return [value];
							});
							for(var i=0; i<arr.length; i++){
								CHECKED_ARR.push(arr[i]);
							}
		    			}
		    			console.log(CHECKED_ARR)
		    			INDEX ++;
		    			saveToDatabase_update(NEWS_LIST_2[INDEX]);
				    }).always(function() {
				    	//todo
				    }).error(function(e){
				    	if(e.status == 401){
				    		//todo
				    	}
				    });
	    		}else{
	    			if(CHECKED_ARR.length>0){
	    				/*get detail*/
	   					CHECKED_ARR = getDetail(CHECKED_ARR);
	   					for(var i=0; i<CHECKED_ARR.length ;i++){
	   						console.log(CHECKED_ARR[i].content.length)
	   					}
	   					/*save to database*/
	   					var params_save = {
			    			_token	: TOKEN,
			    			arr		: CHECKED_ARR,
			    		};
			    		console.log(CHECKED_ARR.length)
	   					$.post(URL_ROOT + 'aj_save_news_update', params_save, function (data) {
	   						console.log('Updated!!!');
							console.log(data);
							setTimeout(function(){
								window.location.reload();
							},360000);
					    }).always(function() {
					    	//todo
					    }).error(function(e){
					    	if(e.status == 401){
					    		//todo
					    	}
					    });
	    			}else{
	    				console.log('No new row!!!');
	    				setTimeout(function(){
							window.location.reload();
						},(30*60*1000));
	    			}

	    		}

	    	}
	    	function save(){
	    		INDEX = 0;
	    		CHECKED_ARR = [];
	    		NEWS_LIST_2 = splitArr(NEWS_LIST);
	    		saveToDatabase_update(NEWS_LIST_2[INDEX]);
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
	    	var CHECKED_ARR = [];
	    	$(document).ready(function(){
					console.log('***Start crawl*********************************')
					var start_time = new Date().getTime();
					var arr = [];
		   			/*get news list*/

		    		/*vnexpress.net:*/
		   			for(var i=0; i<vnexpress_beauty.length; i++){
		   				arr = getListAll(vnexpress_beauty_obj,vnexpress_beauty[i],arr,'update');
		   			}
            // a.vn:*/
            // var i=0; i<eva_thoitrang.length; i++){
            //  = getListAll(eva_thoitrang_obj,eva_thoitrang[i],arr,'update');
            //
            // oisao.net:*/
            // var i=0; i<ngoisao_news.length; i++){
            //  = getListAll(ngoisao_news_obj,ngoisao_news[i],arr,'update');
            //
            // nh14.vn:*/
            // var i=0; i<kenh14_news.length; i++){
            //  = getListAll(kenh14_news_obj,kenh14_news[i],arr,'update');
            //
            // unutoday.vn:*/
            // var i=0; i<phunutoday_vn.length; i++){
            //  = getListAll(phunutoday_vn_obj,phunutoday_vn[i],arr,'update');
            //
		   			// /*ebe.vn:*/
		   			// for(var i=0; i<ebe_vn.length; i++){
		   				// arr = getListAll(ebe_vn_obj,ebe_vn[i],arr,'update');
		   			// }

            /*get detail content*/
            // console.log("get detail:**********************")
            // arr = getDetail(arr);
		   			console.log('page Number: '+arr.length);
		   			console.log(arr);
		   			/*save to database*/

            if(arr.length > 0){
              NEWS_LIST  = arr;
              save();
            }
		    		/*check how long to get data*/
		   			var end_time = new Date().getTime();
		   			console.log(end_time-start_time)

	    	});
    	</script>
    </body>
</html>
