<!DOCTYPE html>
<html lang="en">
    <head>
    	@include('include/home/head')
    	<!-- css -->
    	@include('include/home/css')
        @yield('head')
    </head>
    <body>
    	<div id="page">
    		<div id="w-position-top">
    			@include('include/home/banner_main')
    			@include('include/home/menu_top')
    		</div>
    		<div id="w-position-middle" class="container">
    			<div id="w-position-left" class="col-md-3">
    				@include('include/home/menu_left')
    			</div>
    			<div id="w-position-main" class="col-md-9">
    				@yield('content')
    			</div>
    		</div>
    		<div id="w-position-bottom">
    			@include('include/home/bottom')
    		</div>
    	</div>
    	<div id="process-loading">
    		<img atl="process-loading" src="{{url('images/hex-loader.gif')}}" />
    	</div>
    	@include('include/home/menu_left_mobile')
    	<!-- js -->
		@include('include/home/js')
        @yield('js')
    </body>
</html>