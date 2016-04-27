<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta content="width=device-width,initial-scale = 1" name="viewport">
        <link href="{{asset('/libs/bootstrap/css/bootstrap.min.css')}}" type="text/css" rel="stylesheet" />
        <!-- --------------------------------------- -->
		<script type="text/javascript" src="{{asset('/libs/jquery/jquery.min.js')}}"></script>

    	<script>
    		var URL_ROOT = "{{ URL::route('index') }}/";
		</script>
    </head>
    <body>
    	<div class="container">
    		<h1 class="wp-title">{{$news->title}}</h1>
    		<div class="wp-detail-content">{!! $news->content !!}</div>
		</div>
	    <script>
	    	$(document).ready(function(){
	    		
	    	});
    	</script>
    </body>
</html>