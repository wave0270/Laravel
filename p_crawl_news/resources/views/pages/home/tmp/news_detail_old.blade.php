<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta content="width=device-width,initial-scale = 1" name="viewport">
        <link href="{{asset('/libs/bootstrap/css/bootstrap.css')}}" type="text/css" rel="stylesheet" />
        <link href='../css/custom.css' type="text/css" rel="stylesheet" />
        <!-- --------------------------------------- -->
		<script type="text/javascript" src="{{asset('/libs/jquery/jquery.min.js')}}"></script>
		<script type="text/javascript" src="{{asset('/libs/notify/notify.min.js')}}"></script>
    	<script type="text/javascript" src="{{asset('/js/crawl/readability.js')}}"></script>
    	<script type="text/javascript" src="{{asset('/js/crawl/custom.js')}}"></script>
    	<script>
    		var URL_ROOT = "{{ URL::route('index') }}/";
		</script>
    </head>
    <body>
    	<div class="container" style="margin-top: 10px; padding-right: 5px; padding-left: 5px; width: 100%; overflow-x:hidden;">
    		<div id="submit-div">
		        <input id="url" type="text" class="form-control" placeholder="URL here...">
		        <button id="get-content" class="btn btn-info" type="button" onclick="getUrlFromInput()">Get Content</button>
    		</div>
    		<div class="group">
				<div class="panel-heading">

				</div>
				<div class="panel-body">

				</div>
			</div>
		</div>
	    <script>
	    	$(document).ready(function(){
	    		var url = "http://vnexpress.net/tin-tuc/the-gioi/phan-tich/vi-sao-co-pho-germanwings-lao-may-bay-xuong-nui-3174380.html";
	    		getContent(url);
	    	});
    	</script>
    </body>
</html>