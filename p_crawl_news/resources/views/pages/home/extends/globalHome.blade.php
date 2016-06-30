<!DOCTYPE html>
<html lang="en">
    <head>
    	@include('pages/home/include/head')
    	<!-- css -->
    	@include('pages/home/include/css')
        @yield('head')
    </head>
    <body>
    	<div id="page">
    		<div id="w-position-top">
    			@include('pages/home/include/banner_main')
    			@include('pages/home/include/menu_top')
    		</div>
    		<div id="w-position-middle" class="container">
    			<div id="w-position-left" class="col-md-3">
    				@include('pages/home/include/menu_left')
    			</div>
    			<div id="w-position-main" class="col-md-9">
    				@yield('content')
    			</div>
    		</div>
    		<div id="w-position-bottom">
    			@include('pages/home/include/bottom')
    		</div>
    	</div>
    	<div id="process-loading">
    		<img atl="process-loading" src="{{url('images/hex-loader.gif')}}" />
    	</div>
    	@include('pages/home/include/menu_left_mobile')
    	<!-- js -->
		@include('pages/home/include/js')
        @yield('js')
    </body>
</html>
