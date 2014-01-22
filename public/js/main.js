$(function() {
	$('body').on('click', '#search-table thead tr th', function() {
		$(this).addClass('highlightColumn');
		var colIndex = $(this).prevAll().length;
		$('#search-table tbody tr').find(':nth-child(' + (colIndex + 1) + ')').addClass('highlightColumn');
	}, function() {
		$(this).removeClass('highlightColumn');
		var colIndex = $(this).prevAll().length;
		$('#search-table tbody tr').find(':nth-child(' + (colIndex + 1) + ')').removeClass('highlightColumn');
	});

	$('body').on('click', '#search-table tbody tr', function() {
		if($(this).hasClass('hover')) {
			$(this).removeClass('hover');
		} else {
			$(this).addClass('hover');
		}
	});
});