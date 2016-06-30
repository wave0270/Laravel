
@extends('pages/news/extends/layout')

@section('content')

<!-- Header -->
@include('pages/news/include/top')

<link rel="stylesheet" type="text/css" href="{{URL::route('index')}}/src/news_page/reviews.css" media="all">
<!-- Content -->
<section id="content">
    <div class="container">
        <!-- Main Content -->
        <div class="breadcrumbs column">
          <p><a href="{{URL::route('news_home')}}">Home.</a>   \\
            <a>
              @if(isset($type->name))
                {{$type->name}}.
              @else
                {{$type['name']}}.
              @endif
            </a>   \\   World News.
          </p>
        </div>
        <div class="main-content">

            <!-- Popular News -->
          <div class="column-two-third">
              @if(count($news) > 0)
              <div class="outertight m-t-no">
                    <div class="badg">
                        <p><a href="#">Featured.</a></p>
                    </div>
                    <div class="flexslider">
                        <ul class="slides">
                            <li class="flex-active-slide" style="width: 100%; float: left; margin-right: -100%; position: relative; display: list-item; opacity: 0.745452;">
                              <a href="{{URL::route('news_detail',$news[0]->key)}}">
                                <img src="{{$news[0]->image}}" alt="{{$news[0]->title}}">
                              </a>
                            </li>
                            <!-- <li style="width: 100%; float: left; margin-right: -100%; position: relative;">
                                <img src="{{URL::route('index')}}/src/news_page/24.png" alt="MyPassion">
                            </li>
                            <li style="width: 100%; float: left; margin-right: -100%; position: relative;">
                                <img src="{{URL::route('index')}}/src/news_page/26.png" alt="MyPassion">
                            </li> -->
                        </ul>
                    <!-- <ul class="flex-direction-nav">
                      <li><a class="flex-prev" href="#">Previous</a></li>
                      <li><a class="flex-next" href="#">Next</a></li>
                    </ul> -->
                  </div>

                    <h6 class="regular">
                        <a href="{{URL::route('news_detail',$news[0]->key)}}">{{$news[0]->title}}</a>
                    </h6>
                    <span class="meta">26 May, 2013.   \\   <a href="#">World News.</a>   \\   <a href="#">No Coments.</a></span>
                    <p>{{$news[0]->desc}}</p>
                </div>

                <div class="outertight m-r-no m-t-no">
                    <div class="badg">
                        <p><a href="#">Featured.</a></p>
                    </div>
                    <div class="flexslider">
                        <ul class="slides">
                            <li class="flex-active-slide" style="width: 100%; float: left; margin-right: -100%; position: relative; display: list-item; opacity: 0.745452;">
                              <a href="{{URL::route('news_detail',$news[1]->key)}}">
                                <img src="{{$news[1]->image}}" alt="{{$news[1]->title}}">
                              </a>
                            </li>
                            <!-- <li style="width: 100%; float: left; margin-right: -100%; position: relative;">
                                <img src="{{URL::route('index')}}/src/news_page/26.png" alt="MyPassion">
                            </li>
                            <li style="width: 100%; float: left; margin-right: -100%; position: relative;">
                                <img src="{{URL::route('index')}}/src/news_page/24.png" alt="MyPassion">
                            </li> -->
                        </ul>
                      <!-- <ul class="flex-direction-nav">
                        <li><a class="flex-prev" href="#">Previous</a></li>
                        <li><a class="flex-next" href="#">Next</a></li>
                      </ul> -->
                    </div>

                    <h6 class="regular">
                        <a href="{{URL::route('news_detail',$news[1]->key)}}">{{$news[1]->title}}</a>
                    </h6>
                    <span class="meta">26 May, 2013.   \\   <a href="#">World News.</a>   \\   <a href="#">No Coments.</a></span>
                    <p>{{$news[1]->desc}}</p>
                </div>

                <div class="outerwide">
                  <ul class="block2">
                      @foreach($news as $k => $v)
                        @if($k % 2 == 0 && $k > 1)
                        <li>
                            <a href="{{URL::route('news_detail',$v->key)}}"><img style="width:140px;height:86px" src="{{$v->image}}" alt="{{$v->title}}" class="alignleft"></a>
                            <p>
                                <span>26 May, 2013.</span>
                                  <a href="{{URL::route('news_detail',$v->key)}}">{{$v->title}}</a>
                            </p>
                            <span class="rating"><span style="width: 80%;"></span></span>
                        </li>
                        @endif
                        @if($k % 2 != 0 && $k > 1)
                        <li class="m-r-no">
                            <a href="{{URL::route('news_detail',$v->key)}}"><img style="width:140px;height:86px" src="{{$v->image}}" alt="{{$v->title}}" class="alignleft"></a>
                            <p>
                                <span>26 May, 2013.</span>
                                  <a href="{{URL::route('news_detail',$v->key)}}">{{$v->title}}</a>
                            </p>
                            <span class="rating"><span style="width: 100%;"></span></span>
                        </li>
                        @endif
                      @endforeach
                    </ul>
                </div>

                <div class="pager">
                    <ul>
                      <li><a href="#" class="first-page"></a></li>
                        <li><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#" class="active">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <li><a href="#">6</a></li>
                        <li><a href="#">7</a></li>
                        <li><a href="#" class="last-page"></a></li>
                    </ul>
                </div>
                @endif

            </div>
            <!-- /Popular News -->

        </div>
          <!-- /Main Content -->

        <!-- Left Sidebar -->
        @include('pages/news/include/col')

    </div>
</section>
<!-- / Content -->


@endsection
