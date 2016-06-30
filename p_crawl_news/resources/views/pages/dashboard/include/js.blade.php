{{ HTML::script('/libs/jquery/jquery.min.js') }}
{{ HTML::script('/libs/modernizr/modernizr.min.js') }}
{{ HTML::script('/libs/bootstrap/js/bootstrap.min.js') }}
{{ HTML::script('/libs/bootstrap/js/bootstrap-select.min.js') }}
{{ HTML::script('/libs/footable/footable.js') }}
{{ HTML::script('/libs/footable/footable.filter.js') }}
{{ HTML::script('/libs/footable/footable.sortable.js') }}
{{ HTML::script('/libs/notify/notify.min.js') }}
{{ HTML::script('/libs/moment/moment.js') }}
{{ HTML::script('/libs/numeral/numeral.js') }}
{{ HTML::script('/libs/mmenu/js/jquery.mmenu.min.all.js') }}

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