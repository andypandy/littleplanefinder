$(function() {
	$('#search-table thead th').hover(function() {
		$(this).addClass('highlightCell');
		var colIndex = $(this).prevAll().length;
		$('#search-table tbody tr').find(':nth-child(' + (colIndex + 1) + ')').addClass('highlightCell');
	}, function() {
		$(this).removeClass('highlightCell');
		var colIndex = $(this).prevAll().length;
		$('#search-table tbody tr').find(':nth-child(' + (colIndex + 1) + ')').removeClass('highlightCell');
	});
});