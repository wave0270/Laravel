
@extends('pages/news/extends/layout')

@section('content')
<link rel="stylesheet" type="text/css" href="{{URL::route('index')}}/src/news_page/features.css" media="all">
<!-- Content -->
<section id="content">

    <div class="container">
      <div class="breadcrumbs column">
        <p><a href="#">Home.</a>   \\   <a href="#">World News.</a>   \\   Single.</p>
      </div>
        <!-- Main Content -->
        <div class="full-width">

            <!-- Single -->
            <div class="column-one-fourth">
              <h1>Heading 1</h1>
                <h2>Heading 2</h2>
                <h3>Heading 3</h3>
                <h4>Heading 4</h4>
                <h5>Heading 5</h5>
                <h6>Heading 6</h6>
            </div>
            <div class="column-three-fourth features">
              <p>Morbi leo risus, <span class="highlight">porta ac consectetur ac</span>, vestibulum at eros. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Duis mollis, est non commodo luctus, <a href="#" id="tooltip" title="Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cum sociis natoque penatibusparturient montes.">Test Tooltip</a> nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
                <ul>
                  <li>List item 1</li>
                    <li>List item 2</li>
                    <li>List item 3</li>
                    <li>List item 4</li>
                    <li>List item 5</li>
                </ul>

                <ul class="check">
                  <li>List item 1</li>
                    <li>List item 2</li>
                    <li>List item 3</li>
                    <li>List item 4</li>
                    <li>List item 5</li>
                </ul>

                <ol>
                  <li>List item 1</li>
                    <li>List item 2</li>
                    <li>List item 3</li>
                    <li>List item 4</li>
                    <li>List item 5</li>
                </ol>

                <blockquote>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cum sociis natoque penatibusparturient montes.</blockquote>
            </div>

            <div class="column"></div>

            <div class="column-two-third">
              <div class="ui-tabs ui-widget ui-widget-content ui-corner-all" id="tabs">
                    <ul role="tablist" class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
                        <li aria-selected="true" aria-labelledby="ui-id-1" aria-controls="tabs1" tabindex="0" role="tab" class="ui-state-default ui-corner-top ui-tabs-active ui-state-active"><a id="ui-id-1" tabindex="-1" role="presentation" class="ui-tabs-anchor" href="#tabs1">Tab 1.</a></li>
                        <li aria-selected="false" aria-labelledby="ui-id-2" aria-controls="tabs2" tabindex="-1" role="tab" class="ui-state-default ui-corner-top"><a id="ui-id-2" tabindex="-1" role="presentation" class="ui-tabs-anchor" href="#tabs2">Tab 2.</a></li>
                        <li aria-selected="false" aria-labelledby="ui-id-3" aria-controls="tabs3" tabindex="-1" role="tab" class="ui-state-default ui-corner-top"><a id="ui-id-3" tabindex="-1" role="presentation" class="ui-tabs-anchor" href="#tabs3">Tab 3.</a></li>
                    </ul>
                    <div aria-hidden="false" aria-expanded="true" role="tabpanel" class="ui-tabs-panel ui-widget-content ui-corner-bottom" aria-labelledby="ui-id-1" id="tabs1">
                        <p>Proin neque dui, pretium quis fringilla ut, sodales sed metus. Proin tincidu vestibulum tempor. In scelerisque nibh tempus felis dictum eu auctor mauris consectetur. Vestibulum tempor feugiat est in posuere.</p>
                        <p>Proin neque dui, pretium quis fringilla ut, sodales sed metus. Proin tincidu vestibulum tempor. In scelerisque nibh tempus felis dictum eu auctor mauris consectetur. Vestibulum tempor feugiat est in posuere. Sed auctor libero augue, a faucibus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.</p>
                    </div>
                    <div aria-hidden="true" aria-expanded="false" style="display: none;" role="tabpanel" class="ui-tabs-panel ui-widget-content ui-corner-bottom" aria-labelledby="ui-id-2" id="tabs2">
                        <p>Neque dui, pretium quis fringilla ut, sodales sed metus. Proin tincidu vestibulum tempor. In scelerisque nibh tempus felis dictum eu auctor mauris consectetur. Vestibulum tempor feugiat est in posuere.</p>
                        <p>Dui, pretium quis fringilla ut, sodales sed metus. Proin tincidu vestibulum tempor. In scelerisque nibh tempus felis dictum eu auctor mauris consectetur. Vestibulum tempor feugiat est in posuere. Sed auctor libero augue, a faucibus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.</p>
                    </div>
                    <div aria-hidden="true" aria-expanded="false" style="display: none;" role="tabpanel" class="ui-tabs-panel ui-widget-content ui-corner-bottom" aria-labelledby="ui-id-3" id="tabs3">
                        <p>Dark proin neque dui, pretium quis fringilla ut, sodales sed metus. Proin tincidu vestibulum tempor. In scelerisque nibh tempus felis dictum eu auctor mauris consectetur. Vestibulum tempor feugiat est in posuere.</p>
                        <p> Green proin neque dui, pretium quis fringilla ut, sodales sed metus. Proin tincidu vestibulum tempor. In scelerisque nibh tempus felis dictum eu auctor mauris consectetur. Vestibulum tempor feugiat est in posuere. Sed auctor libero augue, a faucibus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.</p>
                    </div>
                </div>
            </div>

            <div class="column-one-third">
              <div role="tablist" class="ui-accordion ui-widget ui-helper-reset" id="accordion">

                    <h3 tabindex="0" aria-selected="true" aria-controls="ui-accordion-accordion-panel-0" id="ui-accordion-accordion-header-0" role="tab" class="ui-accordion-header ui-helper-reset ui-state-default ui-accordion-header-active ui-state-active ui-corner-top ui-accordion-icons"><span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s"></span>Poserue Clubre.</h3>
                    <div aria-hidden="false" aria-expanded="true" role="tabpanel" aria-labelledby="ui-accordion-accordion-header-0" id="ui-accordion-accordion-panel-0" style="display: block;" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active">
                        <p>Vestibulum tempor feugiat est in posuere. Sed auctor libero augue, a faucibus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices. posuere.</p>
                    </div>

                    <h3 tabindex="-1" aria-selected="false" aria-controls="ui-accordion-accordion-panel-1" id="ui-accordion-accordion-header-1" role="tab" class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons"><span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e"></span>Lubelia Mest.</h3>
                    <div aria-hidden="true" aria-expanded="false" role="tabpanel" aria-labelledby="ui-accordion-accordion-header-1" id="ui-accordion-accordion-panel-1" style="display: none;" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom">
                        <p>Sed non urna. Donec et ante. Phasellus eu ligula. Vestibulum sit amet purus. Vivamus hendrerit, dolor at aliquet laoreet, mauris turpis porttitor velit, faucibus interdum tellus libero ac justo. Vivamus non quam. In suscipit faucibus urna.</p>
                    </div>

                    <h3 tabindex="-1" aria-selected="false" aria-controls="ui-accordion-accordion-panel-2" id="ui-accordion-accordion-header-2" role="tab" class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons"><span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e"></span>Tincidunt Massa.</h3>
                    <div aria-hidden="true" aria-expanded="false" role="tabpanel" aria-labelledby="ui-accordion-accordion-header-2" id="ui-accordion-accordion-panel-2" style="display: none;" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom">
                        <p>Nam enim risus, molestie et, porta ac, aliquam ac, risus. Quisque lobortis. Phasellus pellentesque purus in massa. Aenean in pede. Phasellus ac liberoac tellus pellentesque semper. Sed ac felis. Sed commodo, magna quis lacinia ornare, quam ante aliquam nisi, eu iaculis leo purus venenatis dui.</p>
                    </div>

                </div>
            </div>

            <div class="column"></div>

            <div class="column-one-half">
              <div class="notifications error">
                    <p><span>Error!</span> Your Message Goes Here. Maybe, it is too long and harsh</p>
                    <span class="closer">x</span>
                </div>
                <div class="notifications info">
                    <p><span>Info!</span> Your Message Goes Here.</p>
                    <span class="closer">x</span>
                </div>
                <div class="notifications success">
                    <p><span>Success!</span> Your Message Goes Here.</p>
                    <span class="closer">x</span>
                </div>
                <div class="notifications notice">
                    <p><span>Notice!</span> Your Message Goes Here.</p>
                    <span class="closer">x</span>
                </div>
            </div>

            <div class="column-one-half">
              <p><span class="dropcap">A</span>tam enim risus, molestie et, porta ac, aliquam ac, risus. Quisque lobortis. Phasellus pellentesque purus in massa. Aenean in pede. Phasellus ac liberoac tellus pellentesque semper. Sed ac felis. Sed commodo, magna quis lacinia ornare, quam ante aliquam nisi, eu iaculis leo purus venenatis dui.</p>

                <p><span class="dropcap2">A</span>tam enim risus, molestie et, porta ac, aliquam ac, risus. Quisque lobortis. Phasellus pellentesque purus in massa. Aenean in pede. Phasellus ac liberoac tellus pellentesque semper. Sed ac felis. Sed commodo, magna quis lacinia ornare, quam ante aliquam nisi, eu iaculis leo purus venenatis dui.</p>
            </div>
            <!-- /Single -->

            <div class="column">
              <table>
                    <tbody><tr>
                        <th>Header 1</th>
                        <th>Header 2</th>
                        <th>Header 3</th>
                    </tr>
                    <tr>
                        <td>Unlimited Users</td>
                        <td>Unlimited Users</td>
                        <td>Unlimited Users</td>
                    </tr>
                    <tr>
                        <td>Unlimited Users</td>
                        <td>Unlimited Users</td>
                        <td>Unlimited Users</td>
                    </tr>
                    <tr>
                        <td>Unlimited Users</td>
                        <td>Unlimited Users</td>
                        <td>Unlimited Users</td>
                    </tr>
                    <tr>
                        <td>Unlimited Users</td>
                        <td>Unlimited Users</td>
                        <td>Unlimited Users</td>
                    </tr>
                </tbody></table>
            </div>

        </div>
          <!-- /Main Content -->

    </div>
</section>
<!-- / Content -->


@endsection
