<!DOCTYPE html>
<html lang="en">
    <head>
    	@include('include/dashboard/head')
    	<!-- css -->
    	@include('include/dashboard/css')
        @yield('head')
    </head>
    <body>
    	<div id="page">
    		<div id="w-position-top">
    			@include('include/dashboard/menu_top')
    		</div>
    		<div id="w-position-middle" class="container">
    			<div id="w-position-main" class="col-md-9">
    				@yield('content')
    			</div>
    		</div>
    		<div id="w-position-bottom">
    			@include('include/dashboard/bottom')
    		</div>
    	</div>
    	<div id="process-loading">
    		<img atl="process-loading" src="{{url('images/hex-loader.gif')}}" />
    	</div>
    	@include('include/home/menu_left_mobile')
    	<!-- js -->
		@include('include/dashboard/js')
        @yield('js')
    </body>
</html>