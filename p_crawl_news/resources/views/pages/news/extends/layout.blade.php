<!DOCTYPE html>
<html lang="en" class=" js csstransitions js csstransitions">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">



<meta name="description" content="News - Clean HTML5 and CSS3 responsive template">
<meta name="author" content="MyPassion">

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

<title>News - Responsive HTML5 and CSS3 template</title>

<link rel="shortcut icon" href="{{URL::route('index')}}/src/news_page/sms-4.ico">

<!-- STYLES -->

<!--[if lt IE 9]> <script type="text/javascript" src="{{URL::route('index')}}/src/news_page/js/customM.js"></script> <![endif]-->

<link rel="stylesheet" type="text/css" href="{{URL::route('index')}}/src/news_page/index.css" media="all">
<link rel="stylesheet" type="text/css" href="{{URL::route('index')}}/src/news_page/style.css" media="all">
</head>
<body>

<!-- Body Wrapper -->
<div class="body-wrapper">
	<div class="controller">
    <div class="controller2">

				<!-- Content -->
				@yield('content')

        <!-- Footer -->
        @include('pages/news/include/bottom', ['menu'=>$menu])

    </div>
	</div>
</div>
<!-- / Body Wrapper -->


<!-- SCRIPTS -->
<script type="text/javascript" src="{{URL::route('index')}}/src/news_page/jquery.js"></script>
<script type="text/javascript" src="{{URL::route('index')}}/src/news_page/easing.min.js"></script>
<script type="text/javascript" src="{{URL::route('index')}}/src/news_page/1.8.2.min.js"></script>
<script type="text/javascript" src="{{URL::route('index')}}/src/news_page/ui.js"></script>
<script type="text/javascript" src="{{URL::route('index')}}/src/news_page/caroufredsel.js"></script>
<script type="text/javascript" src="{{URL::route('index')}}/src/news_page/superfish.js"></script>
<script type="text/javascript" src="{{URL::route('index')}}/src/news_page/customm.js"></script>
<script type="text/javascript" src="{{URL::route('index')}}/src/news_page/flexslider-min.js"></script>
<script type="text/javascript" src="{{URL::route('index')}}/src/news_page/tweetable.js"></script>
<script type="text/javascript" src="{{URL::route('index')}}/src/news_page/timeago.js"></script>
<script type="text/javascript" src="{{URL::route('index')}}/src/news_page/jflickrfeed.min.js"></script>
<script type="text/javascript" src="{{URL::route('index')}}/src/news_page/mobilemenu.js"></script>

<!--[if lt IE 9]> <script type="text/javascript" src="{{URL::route('index')}}/src/news_page/js/html5.js"></script> <![endif]-->
<!-- <script type="text/javascript" src="{{URL::route('index')}}/src/news_page/mypassion.js"></script> -->





</body></html>
