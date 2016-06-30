<!-- Slider -->
<section id="slider">
    <div class="container">
        <div class="main-slider">
          <div class="badg">
              <p><a href="#">Popular.</a></p>
            </div>
          <div class="flexslider">
                <ul class="slides">
                  <li class="flex-active-slide" style="width: 100%; float: left; margin-right: -100%; position: relative; display: list-item;">
                      <div style="height:370px; overflow:hidden">
                        <a href="{{URL::route('news_detail',$hot[0]->key)}}">
                          <img src="{{$hot[0]->image_full}}" alt="{{$hot[0]->title}}">
                        </a>
                      </div>
                      <p class="flex-caption"><a href="{{URL::route('news_detail',$hot[0]->key)}}">{{$hot[0]->title}}</a> {{$hot[0]->desc}} </p>
                  </li>

                    <!-- <li class="flex-active-slide" style="width: 100%; float: left; margin-right: -100%; position: relative; display: list-item;">
                        <img src="{{URL::route('index')}}/src/news_page/1.png" alt="MyPassion">
                        <p class="flex-caption"><a href="#">Google wants more women in tech.</a> Donec bibendum dolor at ante. Proin neque dui, pre tium quis fringilla ut,  sodales sed. </p>
                    </li>
                    <li class="" style="width: 100%; float: left; margin-right: -100%; position: relative; display: none;">
                        <img src="{{URL::route('index')}}/src/news_page/3.png" alt="MyPassion">
                        <p class="flex-caption"><a href="#">Small Businesses Surge against all expectations.</a> Donec bibendum dolor at ante. Proin neque dui, pre tium quis fringilla ut,  sodales sed. </p>
                    </li>
                    <li class="" style="width: 100%; float: left; margin-right: -100%; position: relative; display: none;">
                        <img src="{{URL::route('index')}}/src/news_page/5.png" alt="MyPassion">
                        <p class="flex-caption"><a href="#">Drones: Future of disaster response?</a> Donec bibendum dolor at ante. Proin neque dui, pre tium quis fringilla ut,  sodales sed. </p>
                    </li>
                    <li class="" style="width: 100%; float: left; margin-right: -100%; position: relative; display: list-item;">
                        <img src="{{URL::route('index')}}/src/news_page/4.png" alt="MyPassion">
                        <p class="flex-caption"><a href="#">Hollywood cowboys' retreat. </a> Donec bibendum dolor at ante. Proin neque dui, pre tium quis fringilla ut,  sodales sed. </p>
                    </li>
                    <li class="" style="width: 100%; float: left; margin-right: -100%; position: relative; display: none;">
                        <img src="{{URL::route('index')}}/src/news_page/2.png" alt="MyPassion">
                        <p class="flex-caption"><a href="#">Stress may cause cravings.</a> Donec bibendum dolor at ante. Proin neque dui, pre tium quis fringilla ut,  sodales sed. </p>
                    </li> -->
                </ul>
            <!-- <ul class="flex-direction-nav">
              <li><a class="flex-prev" href="#">Previous</a></li>
              <li><a class="flex-next" href="#">Next</a></li>
            </ul>
            <ul class="flex-direction-nav">
              <li><a class="flex-prev" href="#">Previous</a></li>
              <li><a class="flex-next" href="#">Next</a></li>
            </ul> -->
          </div>
        </div>

        <div class="slider2">
          <div class="badg">
              <p><a href="#">Latest.</a></p>
            </div>
            <a href="{{URL::route('news_detail',$hot[1]->key)}}">
              <div style="height:230px; overflow:hidden">
                <img src="{{$hot[1]->image_full}}" alt="{{$hot[1]->title}}">
              </div>
            </a>
            <p class="caption"><a href="{{URL::route('news_detail',$hot[1]->key)}}">{{$hot[1]->title}}</a> {{$hot[1]->desc}} </p>
        </div>

        <div class="slider3">
          <a href="{{URL::route('news_detail',$hot[2]->key)}}">
            <div style="height:125px; overflow:hidden">
              <img src="{{$hot[2]->image_full}}" alt="{{$hot[2]->title}}">
            </div>
          </a>
            <p class="caption"><a href="{{URL::route('news_detail',$hot[2]->key)}}">{{$hot[2]->title}} </a></p>
        </div>

        <div class="slider3">
          <a href="{{URL::route('news_detail',$hot[3]->key)}}">
            <div style="height:125px; overflow:hidden">
              <img src="{{$hot[3]->image_full}}" alt="{{$hot[3]->title}}">
            </div>
          </a>
            <p class="caption"><a href="{{URL::route('news_detail',$hot[3]->key)}}">{{$hot[3]->title}} </a></p>
        </div>

    </div>
</section>
<!-- / Slider -->
