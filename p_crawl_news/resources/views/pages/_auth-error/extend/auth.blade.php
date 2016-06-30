<!DOCTYPE html>
<html lang="en">
    <head>
    	@include('include/home/head')
    	
    	<!-- css -->
    	{{ HTML::style('/libs/bootstrap/css/bootstrap.min.css') }}
    	{{ HTML::style('/css/main.css') }}
        @yield('head')
    </head>
    <body class="page-{{$page_name}}">
    	<div id="page">
    		@yield('content')
    	</div>
    	
		<!-- js -->
		{{ HTML::script('/libs/jquery/jquery.min.js') }}
		{{ HTML::script('/libs/modernizr/modernizr.min.js') }}
		{{ HTML::script('/libs/bootstrap/js/bootstrap.min.js') }}
        @yield('js')
    </body>
</html>