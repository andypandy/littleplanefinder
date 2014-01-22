$(function() {
	$('body').on('click', '#search-table tbody tr td', function() {
		if(!$(this).hasClass('jqIgnore')) {
			if($(this).parent('tr').hasClass('hover')) {
				$(this).parent('tr').removeClass('hover');
			} else {
				$(this).parent('tr').addClass('hover');
			}
		}
	});
});