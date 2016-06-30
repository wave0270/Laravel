<!-- Header -->
<header id="header">
    <div class="container">
        <div class="column">
            <div class="logo">
                <a indepth="true" href="index.html"><img src="{{URL::route('index')}}/src/news_page/logo.png" alt="MyPassion"></a>
            </div>

            <div class="search">
                <form action="index.html" method="post">
                    <input value="Search." onblur="if(this.value=='') this.value='Search.';" onfocus="if(this.value=='Search.') this.value='';" class="ft" type="text">
                    <input value="" class="fs" type="submit">
                </form>
            </div>

            <!-- Nav -->
            <nav id="nav">
                <ul class="sf-menu sf-js-enabled">
                    <li class="current"><a indepth="true" href="{{URL::route('news_home')}}">Home.</a></li>
                    @foreach($menu as $k => $v)
                      @if($v->parentId == '0')
                        <li class='sf-with-li'>
                          <a indepth="true" href="{{URL::route('news_list',$v->type)}}">{{$v->name}}</a>
                          @if(count($v->childs > 0))
                            <ul class="sub-menu">
                              @foreach($v->childs as $k2 => $v2)
                                <li><i class="icon-right-open"></i>
                                  <a indepth="true" href="{{URL::route('news_list',$v2->type)}}">{{$v2->name}}</a>
                                </li>
                              @endforeach
                            </ul>
                          @endif
                        </li>
                      @endif
                    @endforeach
                </ul>
                <select class="device-menu" onchange="">
                  <option value="#">Go to ...</option>
                  @foreach($menu as $k => $v)
                    @if($v->parentId == '0')
                      <option value="{{URL::route('news_list',$v->type)}}">{{$v->name}}</option>
                        @if(count($v->childs > 0))
                            @foreach($v->childs as $k2 => $v2)
                              <option value="{{URL::route('news_list',$v2->type)}}"> - {{$v2->name}}</option>
                            @endforeach
                        @endif
                    @endif
                  @endforeach
                </select>
            </nav>
            <!-- /Nav -->
        </div>
    </div>
</header>
<!-- /Header -->
