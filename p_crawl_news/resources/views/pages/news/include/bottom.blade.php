<footer id="footer">
    <div class="container">
      <div class="column-one-fourth">
            <h5 class="line"><span>Tweets.</span></h5>
            <div id="tweets"><ul class="tweetList"></ul><ul class="tweetList"></ul></div>
        </div>
        <div class="column-one-fourth">
            <h5 class="line"><span>Navigation.</span></h5>
            <ul class="footnav">
              @foreach( $menu as $k => $v)
              <li><a href="{{URL::route('news_list',$v->type)}}"><i class="icon-right-open"></i> {{$v->name}}</a></li>
              @endforeach

              <!-- <li><a href="#"><i class="icon-right-open"></i> World.</a></li>
              <li><a href="#"><i class="icon-right-open"></i> Business.</a></li>
              <li><a href="#"><i class="icon-right-open"></i> Politics.</a></li>
              <li><a href="#"><i class="icon-right-open"></i> Sports.</a></li>
              <li><a href="#"><i class="icon-right-open"></i> Health.</a></li>
              <li><a href="#"><i class="icon-right-open"></i> Sciences.</a></li>
              <li><a href="#"><i class="icon-right-open"></i> Spotlight.</a></li> -->
            </ul>
        </div>
        <div class="column-one-fourth">
            <h5 class="line"><span>Flickr Stream.</span></h5>
            <div class="flickrfeed">
                <ul id="basicuse" class="thumbs"><li class="hide"></li>
                  <li><a href="http://www.flickr.com/photos/we-are-envato/15647274066/" target="_top">
                    <img src="{{URL::route('index')}}/src/news_page/15647274066_2ee48c3fe9_s.jpg" alt="Halloween 2014 at Envato in Melbourne"></a></li>
                  <li><a href="http://www.flickr.com/photos/we-are-envato/15485436268/" target="_top">
                    <img src="{{URL::route('index')}}/src/news_page/15485436268_846ccca178_s.jpg" alt="Halloween 2014 at Envato in Melbourne"></a></li><li><a href="http://www.flickr.com/photos/we-are-envato/15668911091/" target="_top"><img src="{{URL::route('index')}}/src/news_page/15668911091_4ef20118b5_s.jpg" alt="Halloween 2014 at Envato in Melbourne"></a></li>
                  <li><a href="http://www.flickr.com/photos/we-are-envato/15484954949/" target="_top"><img src="{{URL::route('index')}}/src/news_page/15484954949_a4e97a9dc5_s.jpg" alt="Halloween 2014 at Envato in Melbourne"></a></li>
                  <li><a href="http://www.flickr.com/photos/we-are-envato/15647103116/" target="_top"><img src="{{URL::route('index')}}/src/news_page/15647103116_1e4b9033f0_s.jpg" alt="Halloween 2014 at Envato in Melbourne"></a></li>
                  <li><a href="http://www.flickr.com/photos/we-are-envato/15484954949/" target="_top"><img src="{{URL::route('index')}}/src/news_page/15484954949_a4e97a9dc5_s.jpg" alt="Halloween 2014 at Envato in Melbourne"></a></li>
                  <li><a href="http://www.flickr.com/photos/we-are-envato/15647103116/" target="_top"><img src="{{URL::route('index')}}/src/news_page/15647103116_1e4b9033f0_s.jpg" alt="Halloween 2014 at Envato in Melbourne"></a></li>
                  <li><a href="http://www.flickr.com/photos/we-are-envato/15484954949/" target="_top"><img src="{{URL::route('index')}}/src/news_page/15484954949_a4e97a9dc5_s.jpg" alt="Halloween 2014 at Envato in Melbourne"></a></li>
                  <li><a href="http://www.flickr.com/photos/we-are-envato/15647103116/" target="_top"><img src="{{URL::route('index')}}/src/news_page/15647103116_1e4b9033f0_s.jpg" alt="Halloween 2014 at Envato in Melbourne"></a></li>
                </ul>
            </div>
        </div>
        <div class="column-one-fourth">
            <h5 class="line"><span>About.</span></h5>
            <p>Blandit rutrum, erat et egestas ultricies, dolor tortor egestas enim, quiste rhon cus sem purus eu sapien. Lorem ipsum dolor sit amet adipcising elit. Elit norem simuls tortor lorem adipcising purus mosteu dsapien egestas.</p>
        </div>
        <p class="copyright">Copyright 2013. All Rights Reserved</p>
    </div>
</footer>
<!-- / Footer -->
