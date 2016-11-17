@extends('pages/news/extends/layout')

@section('content')

<!-- Header -->
@include('pages/news/include/top')

<!-- Slider -->
@include('pages/news/include/slider')

<!-- Content -->
<section id="content">
    <div class="container">

        <!-- Main Content -->
          <div class="main-content">

              <!-- Popular News -->
            <div class="column-one-third">
                <h5 class="line"><span>{{$menu[0]->name}}.</span></h5>
                  <div class="outertight">
                    <ul class="block">
                      @foreach( $menu[0]->data as $k => $v)
                      @if($k<=3)
                      <li>
                          <a href="{{URL::route('news_detail',$v->key)}}">
                            @if($v->image_full == "no Data")
                              <img style="width:140px;height:86px" src="{{$v->image}}" alt="{{$v->title}}" class="alignleft">
                            @else
                              <img style="width:140px;height:86px" src="{{$v->image_full}}" alt="{{$v->title}}" class="alignleft">
                            @endif
                          </a>
                          <p>
                              <span>26 May, 2013. {{$v->domain}}</span>
                              <a href="{{URL::route('news_detail',$v->key)}}">{{$v->title}}</a>
                          </p>
                          <span class="rating"><span style="width: 80%;"></span></span>
                      </li>
                      @endif
                      @endforeach
                          <!-- <li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/5_001.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 80%;"></span></span>
                          </li>
                          <li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/6_001.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 100%;"></span></span>
                          </li>
                          <li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/7.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 70%;"></span></span>
                          </li>
                          <li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/8.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 60%;"></span></span>
                          </li> -->
                      </ul>
                  </div>

              </div>
              <!-- /Popular News -->

              <!-- Hot News -->
              <div class="column-one-third">
                <h5 class="line"><span>{{$menu[1]->name}}.</span></h5>
                  <div class="outertight m-r-no">
                    <ul class="block">
                      @foreach( $menu[1]->data as $k => $v)
                      @if($k<=3)
                      <li>
                          <a href="{{URL::route('news_detail',$v->key)}}">
                            @if($v->image_full == "no Data")
                              <img style="width:140px;height:86px" src="{{$v->image}}" alt="{{$v->title}}" class="alignleft">
                            @else
                              <img style="width:140px;height:86px" src="{{$v->image_full}}" alt="{{$v->title}}" class="alignleft">
                            @endif
                          </a>
                          <p>
                              <span>26 May, 2013. {{$v->domain}}</span>
                              <a href="{{URL::route('news_detail',$v->key)}}">{{$v->title}}</a>
                          </p>
                          <span class="rating"><span style="width: 80%;"></span></span>
                      </li>
                      @endif
                      @endforeach
                          <!-- <li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/9.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 80%;"></span></span>
                          </li>
                          <li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/10.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 100%;"></span></span>
                          </li>
                          <li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/11.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 70%;"></span></span>
                          </li>
                          <li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/12.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 60%;"></span></span>
                          </li> -->
                      </ul>
                  </div>

              </div>
              <!-- /Hot News -->

              <!-- Life Style -->
              <div class="column-two-third">
                <h5 class="line">
                    <span>{{$menu[2]->name}}.</span>
                      <div class="navbar">
                          <a style="display: none;" id="next1" class="next hidden" href="#"><span></span></a>
                          <a style="display: none;" id="prev1" class="prev hidden" href="#"><span></span></a>
                      </div>
                  </h5>

                  <div class="outertight">
                    @if($menu[0]->data[0]->image_full == "no Data")
                      <img src="{{$menu[0]->data[0]->image}}" alt="{{$menu[0]->data[0]->title}}">
                    @else
                      <img src="{{$menu[0]->data[0]->image_full}}" alt="{{$menu[0]->data[0]->title}}">
                    @endif

                      <h6 class="regular">
                        <a href="{{URL::route('news_detail',$menu[0]->data[0]->key)}}">{{$menu[0]->data[0]->title}}</a>
                      </h6>
        <span class="meta">26 May, 2013. {{$menu[0]->data[0]->domain}}  \\   <a href="#">World News.</a>   \\   <a href="#">No Coments.</a></span>
                      <p>{{$menu[0]->data[0]->desc}}</p>
                  </div>

                  <div class="outertight m-r-no">

                    <div style="display: block; text-align: start; float: left; position: relative; top: auto; right: auto; bottom: auto; left: auto; z-index: auto; width: 300px; height: 380px; margin: 0px; overflow: hidden;" class="caroufredsel_wrapper">
                      <div style="display: block; text-align: left; float: none; position: absolute; top: 0px; right: 0px; bottom: -1520px; left: 0px; z-index: auto; width: 300px; height: 580px; margin: 0px; overflow: hidden;" class="caroufredsel_wrapper">
                        <ul style="text-align: left; float: none; position: absolute; top: 0px; right: auto; bottom: auto; left: 0px; margin: 0px; height: 1740px; width: 300px;" class="block" id="carousel">
                          @foreach( $menu[1]->data as $k => $v)
                          @if($k<=3 && $k > 0)
                          <li>
                              <a href="{{URL::route('news_detail',$v->key)}}">
                                @if($v->image_full == "no Data")
                                  <img style="width:140px; height:86px;" src="{{$v->image}}" alt="{{$v->title}}" class="alignleft">
                                @else
                                  <img style="width:140px; height:86px;" src="{{$v->image_full}}" alt="{{$v->title}}" class="alignleft">
                                @endif

                              </a>
                              <p>
                                  <span>26 May, 2013. {{$v->domain}}</span>
                                  <a href="{{URL::route('news_detail',$v->key)}}">{{$v->title}}</a>
                              </p>
                              <span class="rating"><span style="width: 60%;"></span></span>
                          </li>
                          @endif
                          @endforeach
                          <!-- <li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/12.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 60%;"></span></span>
                          </li><li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/13.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 80%;"></span></span>
                          </li><li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/14.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 100%;"></span></span>
                          </li><li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/15.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 70%;"></span></span>
                          </li><li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/16.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 60%;"></span></span>
                          </li><li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/11.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 70%;"></span></span>
                          </li> -->
                      </ul>
                    </div>
                  </div>
                  </div>
              </div>
              <!-- /Life Style -->

              <!-- World News -->
              <div class="column-two-third">
                  <h5 class="line">
                    <span>{{$menu[3]->name}}.</span>
                  </h5>

                  <div class="outerwide">
                    <ul class="block2">
                      @foreach( $menu[3]->data as $k => $v)
                      @if($k<=3)
                      <li>
                          <a href="{{URL::route('news_detail',$v->key)}}">
                            @if($v->image_full == "no Data")
                              <img src="{{$v->image}}" alt="{{$v->title}}" class="alignleft">
                            @else
                              <img src="{{$v->image_full}}" alt="{{$v->title}}" class="alignleft">
                            @endif

                          </a>
                          <p>
                              <span>26 May, 2013. {{$v->domain}}</span>
                              <a href="{{URL::route('news_detail',$v->key)}}">{{$v->title}}</a>
                          </p>
                          <span class="rating"><span style="width: 80%;"></span></span>
                      </li>
                      @endif
                      @endforeach
                          <!-- <li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/17.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 80%;"></span></span>
                          </li>
                          <li class="m-r-no">
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/18.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 100%;"></span></span>
                          </li>
                          <li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/19.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 70%;"></span></span>
                          </li>
                          <li class="m-r-no">
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/20.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 60%;"></span></span>
                          </li> -->
                      </ul>
                  </div>
              </div>
              <!-- /World News -->

              <!-- Popular News -->
            <div class="column-two-third">
                <div class="outertight">
                    <h5 class="line"><span>Business News.</span></h5>

                      <div class="outertight m-r-no">
                          <div class="flexslider">
                              <ul class="slides">
                                  <li class="flex-active-slide" style="width: 100%; float: left; margin-right: -100%; position: relative; display: list-item;">
                                      <img src="{{URL::route('index')}}/src/news_page/25.png" alt="MyPassion">
                                  </li>
                                  <li class="" style="width: 100%; float: left; margin-right: -100%; position: relative; display: none;">
                                      <img src="{{URL::route('index')}}/src/news_page/24.png" alt="MyPassion">
                                  </li>
                                  <li class="" style="width: 100%; float: left; margin-right: -100%; position: relative; display: list-item;">
                                      <img src="{{URL::route('index')}}/src/news_page/26.png" alt="MyPassion">
                                  </li>
                              </ul>
                          <ul class="flex-direction-nav"><li><a class="flex-prev" href="#">Previous</a></li><li><a class="flex-next" href="#">Next</a></li></ul><ul class="flex-direction-nav"><li><a class="flex-prev" href="#">Previous</a></li><li><a class="flex-next" href="#">Next</a></li></ul></div>

                          <h6 class="regular"><a href="#">Blandit Rutrum, Erat et Sagittis. Lorem
        Ipsum Dolor, Sit Amet Adipsing.</a></h6>
                          <span class="meta">26 May, 2013.   \\   <a href="#">World News.</a>   \\   <a href="#">No Coments.</a></span>
                          <p>Blandit rutrum, erat et egestas ultricies, dolor tortor egestas enim, quiste rhoncus sem purus eu sapien. Curabitur a orci nec risus lacinia vehic. Lorem ipsum
        dolor adipcising elit. Erat egestan sagittis lorem aupo dolor sit ameta, auctor libero tempor...</p>
                      </div>

                      <ul class="block">
                          <li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/21.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013. </span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 80%;"></span></span>
                          </li>
                          <li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/20.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 100%;"></span></span>
                          </li>
                      </ul>
                  </div>

                  <div class="outertight m-r-no">
                    <h5 class="line"><span>Sport News.</span></h5>

                      <div class="outertight m-r-no">
                          <div class="flexslider">
                              <ul class="slides">
                                  <li class="flex-active-slide" style="width: 100%; float: left; margin-right: -100%; position: relative; display: list-item;">
                                      <img src="{{URL::route('index')}}/src/news_page/27.png" alt="MyPassion">
                                  </li>
                                  <li class="" style="width: 100%; float: left; margin-right: -100%; position: relative; display: none;">
                                      <img src="{{URL::route('index')}}/src/news_page/26.png" alt="MyPassion">
                                  </li>
                                  <li class="" style="width: 100%; float: left; margin-right: -100%; position: relative; display: list-item;">
                                      <img src="{{URL::route('index')}}/src/news_page/24.png" alt="MyPassion">
                                  </li>
                              </ul>
                          <ul class="flex-direction-nav"><li><a class="flex-prev" href="#">Previous</a></li><li><a class="flex-next" href="#">Next</a></li></ul><ul class="flex-direction-nav"><li><a class="flex-prev" href="#">Previous</a></li><li><a class="flex-next" href="#">Next</a></li></ul></div>

                          <h6 class="regular"><a href="#">Blandit Rutrum, Erat et Sagittis. Lorem
        Ipsum Dolor, Sit Amet Adipsing.</a></h6>
                          <span class="meta">26 May, 2013.   \\   <a href="#">World News.</a>   \\   <a href="#">No Coments.</a></span>
                          <p>Blandit rutrum, erat et egestas ultricies, dolor tortor egestas enim, quiste rhoncus sem purus eu sapien. Curabitur a orci nec risus lacinia vehic. Lorem ipsum
        dolor adipcising elit. Erat egestan sagittis lorem aupo dolor sit ameta, auctor libero tempor...</p>
                      </div>

                      <ul class="block">
                          <li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/23.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 80%;"></span></span>
                          </li>
                          <li>
                              <a href="#"><img src="{{URL::route('index')}}/src/news_page/22.png" alt="MyPassion" class="alignleft"></a>
                              <p>
                                  <span>26 May, 2013.</span>
                                  <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
                              </p>
                              <span class="rating"><span style="width: 100%;"></span></span>
                          </li>
                      </ul>
                  </div>

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
