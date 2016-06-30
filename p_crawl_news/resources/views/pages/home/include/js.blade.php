
<script src="{{asset('/libs/jquery/jquery.min.js')}}"></script>
<script src="{{asset('/libs/modernizr/modernizr.min.js')}}"></script>
<script src="{{asset('/libs/bootstrap/js/bootstrap.min.js')}}"></script>
<script src="{{asset('/libs/bootstrap/js/bootstrap-select.min.js')}}"></script>
<script src="{{asset('/libs/footable/footable.js')}}"></script>
<script src="{{asset('/libs/footable/footable.filter.js')}}"></script>
<script src="{{asset('/libs/footable/footable.sortable.js')}}"></script>
<script src="{{asset('/libs/notify/notify.min.js')}}"></script>
<script src="{{asset('/libs/numeral/numeral.js')}}"></script>
<script src="{{asset('/libs/mmenu/js/jquery.mmenu.min.all.js')}}"></script>

<script type="text/javascript">
	$(function() {
		$('nav#menu').mmenu({
			extensions	: [ 'effect-slide-menu', 'pageshadow' ],
			searchfield	: true,
			counters	: true,
			navbar 		: {
				title		: 'Advanced menu'
			},
			navbars		: [
				{
					position	: 'top',
					content		: [ 'searchfield' ]
				}, {
					position	: 'top',
					content		: [
						'prev',
						'title',
						'close'
					]
				}, {
					position	: 'bottom',
					content		: [
						'<a href="http://mmenu.frebsite.nl/wordpress-plugin.html" target="_blank">WordPress plugin</a>'
					]
				}
			]
		});
	});
</script>	