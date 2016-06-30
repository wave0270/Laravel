<div class="sidebar">
  <div class="ui-tabs ui-widget ui-widget-content ui-corner-all" id="tabs">
        <ul role="tablist" class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
            <li aria-selected="true" aria-labelledby="ui-id-1" aria-controls="tabs1" tabindex="0" role="tab" class="ui-state-default ui-corner-top ui-tabs-active ui-state-active">
              <a id="ui-id-1" tabindex="-1" role="presentation" class="ui-tabs-anchor" href="#tabs1">Recent.</a>
            </li>
            <li aria-selected="false" aria-labelledby="ui-id-2" aria-controls="tabs2" tabindex="-1" role="tab" class="ui-state-default ui-corner-top">
              <a id="ui-id-2" tabindex="-1" role="presentation" class="ui-tabs-anchor" href="#tabs2">Popular.</a>
            </li>
        </ul>
        <div aria-hidden="false" aria-expanded="true" role="tabpanel" class="ui-tabs-panel ui-widget-content ui-corner-bottom" aria-labelledby="ui-id-1" id="tabs1">
            <ul>
              @foreach($col_recent as $k => $v)
              <li>
                <a href="{{URL::route('news_detail',$v->key)}}#" class="title">{{$v->title}}</a>
                  <span class="meta">26 May, 2013.   \\   <a href="{{URL::route('news_list',$v->type)}}">Relative</a></span>
                  <span class="rating"><span style="width: 70%;"></span></span>
              </li>
              @endforeach
              <!-- <li>
                <a href="#" class="title">Blandit Rutrum, Erat et Sagittis Adipcising Elit.</a>
                  <span class="meta">26 May, 2013.   \\   <a href="#">World News.</a>   \\   <a href="#">No Coments.</a></span>
                  <span class="rating"><span style="width: 70%;"></span></span>
              </li>
              <li>
                <a href="#" class="title">Blandit Rutrum, Erat et Sagittis Adipcising Elit.</a>
                  <span class="meta">26 May, 2013.   \\   <a href="#">World News.</a>   \\   <a href="#">No Coments.</a></span>
                  <span class="rating"><span style="width: 70%;"></span></span>
              </li>
              <li>
                <a href="#" class="title">Blandit Rutrum, Erat et Sagittis Adipcising Elit.</a>
                  <span class="meta">26 May, 2013.   \\   <a href="#">World News.</a>   \\   <a href="#">No Coments.</a></span>
                  <span class="rating"><span style="width: 70%;"></span></span>
              </li>
              <li>
                <a href="#" class="title">Blandit Rutrum, Erat et Sagittis Adipcising Elit.</a>
                  <span class="meta">26 May, 2013.   \\   <a href="#">World News.</a>   \\   <a href="#">No Coments.</a></span>
                  <span class="rating"><span style="width: 70%;"></span></span>
              </li> -->
            </ul>
        </div>
        <div aria-hidden="true" aria-expanded="false" style="display: none;" role="tabpanel" class="ui-tabs-panel ui-widget-content ui-corner-bottom" aria-labelledby="ui-id-2" id="tabs2">
            <ul>
              @foreach($col_popular as $k => $v)
              <li>
                <a href="{{URL::route('news_detail',$v->key)}}#" class="title">{{$v->title}}</a>
                  <span class="meta">26 May, 2013.   \\   <a href="{{URL::route('news_list',$v->type)}}">Relative</a></span>
                  <span class="rating"><span style="width: 70%;"></span></span>
              </li>
              @endforeach
              <!-- <li>
                  <a href="#" class="title">Mauris eleifend est et turpis. Duis id erat.</a>
                    <span class="meta">27 May, 2013.   \\   <a href="#">World News.</a>   \\   <a href="#">No Coments.</a></span>
                    <span class="rating"><span style="width: 70%;"></span></span>
                </li>
                <li>
                  <a href="#" class="title">Mauris eleifend est et turpis. Duis id erat.</a>
                    <span class="meta">27 May, 2013.   \\   <a href="#">World News.</a>   \\   <a href="#">No Coments.</a></span>
                    <span class="rating"><span style="width: 70%;"></span></span>
                </li>
                <li>
                  <a href="#" class="title">Mauris eleifend est et turpis. Duis id erat.</a>
                    <span class="meta">27 May, 2013.   \\   <a href="#">World News.</a>   \\   <a href="#">No Coments.</a></span>
                    <span class="rating"><span style="width: 70%;"></span></span>
                </li>
                <li>
                  <a href="#" class="title">Mauris eleifend est et turpis. Duis id erat.</a>
                    <span class="meta">27 May, 2013.   \\   <a href="#">World News.</a>   \\   <a href="#">No Coments.</a></span>
                    <span class="rating"><span style="width: 70%;"></span></span>
                </li> -->
            </ul>
        </div>
    </div>
</div>
