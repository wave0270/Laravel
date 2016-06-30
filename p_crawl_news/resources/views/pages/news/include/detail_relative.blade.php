<div class="relatednews">
    <h5 class="line"><span>Related News.</span></h5>
    <ul>
      @foreach($relative as $k => $v)
        <li>
            <a href="{{URL::route('news_detail',$v->key)}}">
              <div style="height:90px; overflow:hidden;">
                <img src="{{$v->image_full}}" alt="{{$v->title}}">
              </div>
            </a>
            <p>
                <span>26 May, 2013.</span>
                <a href="{{URL::route('news_detail',$v->key)}}">{{$v->title}}.</a>
            </p>
            <span class="rating"><span style="width: 80%;"></span></span>
        </li>
      @endforeach
        <!-- <li>
            <a href="#"><img src="{{URL::route('index')}}/src/news_page/5_001.png" alt="MyPassion"></a>
            <p>
                <span>26 May, 2013.</span>
                <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
            </p>
            <span class="rating"><span style="width: 80%;"></span></span>
        </li>
        <li>
            <a href="#"><img src="{{URL::route('index')}}/src/news_page/6_001.png" alt="MyPassion"></a>
            <p>
                <span>26 May, 2013.</span>
                <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
            </p>
            <span class="rating"><span style="width: 80%;"></span></span>
        </li>
        <li>
            <a href="#"><img src="{{URL::route('index')}}/src/news_page/7.png" alt="MyPassion"></a>
            <p>
                <span>26 May, 2013.</span>
                <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
            </p>
            <span class="rating"><span style="width: 80%;"></span></span>
        </li>
        <li>
            <a href="#"><img src="{{URL::route('index')}}/src/news_page/8.png" alt="MyPassion"></a>
            <p>
                <span>26 May, 2013.</span>
                <a href="#">Blandit Rutrum, Erat et Sagittis.</a>
            </p>
            <span class="rating"><span style="width: 80%;"></span></span>
        </li> -->
    </ul>
</div>
