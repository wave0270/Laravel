
@extends('pages/news/extends/layout')

@section('content')

<!-- Header -->
@include('pages/news/include/top')

<link rel="stylesheet" type="text/css" href="{{URL::route('index')}}/src/news_page/single.css" media="all">
<!-- Content -->
<section id="content">
    <div class="container">
        <!-- Main Content -->
        <div class="main-content">

            <!-- Single -->
            <div class="column-two-third single">
              <!-- <div class="flexslider">
                <ul class="slides">
                    <li class="flex-active-slide" style="width: 100%; float: left; margin-right: -100%; position: relative; display: list-item; opacity: 0.787503;">
                        <img src="{{URL::route('index')}}/src/news_page/1.png" alt="MyPassion">
                    </li>
                    <li style="width: 100%; float: left; margin-right: -100%; position: relative;">
                        <img src="{{URL::route('index')}}/src/news_page/3.png" alt="MyPassion">
                    </li>
                    <li style="width: 100%; float: left; margin-right: -100%; position: relative;">
                        <img src="{{URL::route('index')}}/src/news_page/5.png" alt="MyPassion">
                    </li>
                </ul>
                <ul class="flex-direction-nav">
                  <li><a class="flex-prev" href="#">Previous</a></li>
                  <li><a class="flex-next" href="#">Next</a></li>
                </ul>
              </div> -->

                <h6 class="title">{{$news->title}}</h6>
                <span class="meta">26 May, 2013.   \\   <a href="{{URL::route('news_list',$category->type)}}">{{$category->name}}</a> </span>
                <div>
                  {!! $news->content !!}
                </div>
                <!-- <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales dapibus dui, sed iaculis metus facilisis sed. Etiam scelerisque molestie purus vel mollis. Mauris dapibus quam id turpis dignissim rutrum. Phasellus placerat nunc in nulla pretium pellentesque. Aliquam erat volutpat. In nec enim dui, in hendrerit enim. Vestibulum ante
ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus at tortor at est mattis aliquam non
id est. Quisque pretium suscipit faucibus. Fusce vestibulum mollis interdum. Duis a nibh at odio aliquet varius. Pellen tesque feugiat nulla nec ipsum suscipit ut varius elit posuere. Nunc tellus urna, viverra ac porta ac, com modo et libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Pellentesque ullam corper nisl id justo ultrices hendrerit. Vivamus dignissim ultrices erat, vitae placerat ligula lacinia non. In arcu nunc, aliquet a condimentum et, tempor eget nisl. </p> -->
                <ul class="sharebox">
                    <li><a href="#"><span class="twitter">Tweet</span></a></li>
                    <li><a href="#"><span class="pinterest">Pin it</span></a></li>
                    <li><a href="#"><span class="facebook">Like</span></a></li>
                </ul>

                <!-- RELATIVE -->
                @include('pages/news/include/detail_relative')

                <!-- COMMENTS -->
                @include('pages/news/include/comments')


            </div>
            <!-- /Single -->

        </div>
        <!-- /Main Content -->

        <!-- Left Sidebar -->
        @include('pages/news/include/col')

    </div>
</section>
<!-- / Content -->


@endsection
