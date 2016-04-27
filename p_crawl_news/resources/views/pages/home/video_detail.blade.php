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
    		<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/{{$news->content}}?rel=0&showinfo=0" frameborder="0" allowfullscreen>
    			
    		</iframe> -->
    		
    		<!-- <object style="width:100%;height:100%;width: 820px; height: 461.25px; float: none; clear: both; margin: 2px auto;" data="http://www.youtube.com/embed/{{$news->content}}">
</object> -->
			<div style="width:100%;height:100%;width: 820px; height: 461.25px; float: none; clear: both; margin: 2px auto;">
  <embed src="https://www.youtube.com/v/{{$news->content}}?version=3&autoplay=1"
         type="application/x-shockwave-flash"
         allowscriptaccess="always"
         width="100%" height="100%"></embed>

</div>
		</div>
	    <script>
	    	$(document).ready(function(){
	    		document.cookie="VISITOR_INFO1_LIVE=oKckVSqvaGw; path=/; domain=.youtube.com";
	    	});
    	</script>
    </body>
</html>