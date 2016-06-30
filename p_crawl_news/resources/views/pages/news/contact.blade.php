
@extends('pages/news/extends/layout')

@section('content')

<script src="{{URL::route('index')}}/src/news_page/common.js" charset="UTF-8" type="text/javascript"></script>
<script src="{{URL::route('index')}}/src/news_page/map.js" charset="UTF-8" type="text/javascript"></script>
<script src="{{URL::route('index')}}/src/news_page/util.js" charset="UTF-8" type="text/javascript"></script>
<script src="{{URL::route('index')}}/src/news_page/marker.js" charset="UTF-8" type="text/javascript"></script>
<script src="{{URL::route('index')}}/src/news_page/infowindow.js" charset="UTF-8" type="text/javascript"></script>
<script src="{{URL::route('index')}}/src/news_page/onion.js" charset="UTF-8" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="{{URL::route('index')}}/src/news_page/contact.css" media="all">
<!-- Content -->
<section id="content">
    <div class="container">
        <!-- Main Content -->
        <div class="main-content">

            <!-- Single -->
            <div class="column-two-third single">
              <div style="position: relative; background-color: rgb(229, 227, 223); overflow: hidden;" id="map"><div class="gm-style" style="position: absolute; left: 0px; top: 0px; overflow: hidden; width: 100%; height: 100%; z-index: 0;"><div style="position: absolute; left: 0px; top: 0px; overflow: hidden; width: 100%; height: 100%; z-index: 0; cursor: url('{{URL::route('index')}}/src/news_page/openhand_8_8.cur'), default;"><div style="position: absolute; left: 0px; top: 0px; z-index: 1; width: 100%;"><div style="position: absolute; left: 0px; top: 0px; z-index: 100; width: 100%;"></div><div style="position: absolute; left: 0px; top: 0px; z-index: 101; width: 100%;"></div><div style="position: absolute; left: 0px; top: 0px; z-index: 102; width: 100%;"></div><div style="position: absolute; left: 0px; top: 0px; z-index: 103; width: 100%;"></div><div style="position: absolute; z-index: 0;"><div style="overflow: hidden; width: 620px; height: 300px;"></div></div></div><div style="position: absolute; left: 0px; top: 0px; z-index: 2; width: 100%; height: 100%;"></div><div style="position: absolute; left: 0px; top: 0px; z-index: 3; width: 100%; height: 100%;"></div><div style="position: absolute; left: 0px; top: 0px; z-index: 4; width: 100%;"><div style="position: absolute; left: 0px; top: 0px; z-index: 104; width: 100%;"></div><div style="position: absolute; left: 0px; top: 0px; z-index: 105; width: 100%;"></div><div style="position: absolute; left: 0px; top: 0px; z-index: 106; width: 100%;"></div><div style="position: absolute; left: 0px; top: 0px; z-index: 107; width: 100%;"></div></div></div></div></div>
                <div class="outerwide">
                  <h5 class="line"><span>Location.</span></h5>
                    <p>Mauris dapibus quam id turpis dignissim rutrum. Phasellus placerat nunc in nulla pretium pellentesque. Aliquam erat volutpat. In nec enim dui, in hendrerit enim. Vestibulum ante ipsum primis in faucibus adipcising elit. Lorem ipsum Dolor sit amet adipcising elit mauris dapibus dignisim. </p>

                    <div class="contact-info">
                      <p class="man"><i class="icon-location"></i>Creative Laboratory <br>77 New York Avenue, New York city, <br>USA 10000.</p>
                        <p class="phone"><i class="icon-phone"></i> Phone:  73 443 11 23. <br>Fax:  73 443 11 23.</p>
                        <p class="envelop"><i class="icon-mail"></i>Email: <a href="#">mail@page.com</a> <br> Web: <a href="#">www.page.com</a></p>
                    </div>
                </div>
                <div class="contact-form">
                    <form action="contact.html" method="post" id="contactForm" name="contactForm">
                        <div class="form">
                            <label>Name*</label>
                            <div class="input">
                                <span class="name"></span>
                                <input value="" class="name" name="yourname" id="yourname" type="text">
                            </div>
                        </div>
                        <div class="form">
                            <label>Email*</label>
                            <div class="input">
                                <span class="email"></span>
                                <input value="" class="name" name="email" id="email" type="text">
                            </div>
                        </div>
                        <div class="form">
                            <label>Subject*</label>
                            <div class="input">
                                <span class="website"></span>
                                <input value="" class="name" name="tele" id="tele" type="text">
                            </div>
                        </div>
                        <div class="form">
                            <label>Message*</label>
                            <textarea name="message" rows="10" cols="20"></textarea>
                        </div>
                        <div class="form2">
                            <!--<input type="submit" class="send-message" value="Send Message" />-->
                            <a href="javascript:submitForm();" class="send">Send Message</a>
                        </div>

                    </form>

                    <div class="alertMessage"></div>
                </div>
            </div>
            <!-- /Single -->

        </div>
          <!-- /Main Content -->

        <!-- Left Sidebar -->
        @include('pages/news/include/left')

    </div>
</section>
<!-- / Content -->


@endsection
