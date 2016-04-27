<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta content="width=device-width,initial-scale = 1" name="viewport">
        <link href="{{asset('/libs/bootstrap/css/bootstrap.min.css')}}" type="text/css" rel="stylesheet" />
        <!-- --------------------------------------- -->
		<script type="text/javascript" src="{{asset('/libs/jquery/jquery.min.js')}}"></script>
    	<script type="text/javascript" src="{{asset('/js/crawl/custom.js')}}"></script>
    	<script>
    		var URL_ROOT = "{{ URL::route('index') }}/";
		</script>
    </head>
    <body>
    	<div class="container">
    		@foreach($news as $k => $v)
    		<div class="col-sm-4" style="height:300px;">
    			<div class="title">
    				<a href="{{URL::route('video_detail',$v->id)}}" target="_blank">{{$v->title}}</a>
    			</div>
    			<div class="img" style="height:200px; overflow: hidden;">
    				<img alt="{{$v->title}}" src="{{$v->image}}" style="width:100%;">
    			</div>
    			<div class="desc">
    				{{$v->time}} {{$v->quality}}
    			</div>
    		</div>
    		@endforeach
		</div>
    </body>
    <script>
    	$(document).ready(function(){
			
    	});
	</script>
</html>