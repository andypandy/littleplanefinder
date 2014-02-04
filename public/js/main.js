var modal = new Modal();

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

	$('.blackbox').click(function() {
		modal.close();
	});
});


//Modal stuff
function Modal() {}

Modal.prototype.open = function() {
	//Add modal-open to body
	$('body').addClass('modal-open');

	//Fade in background and foreground
	$('.blackbox').css('height', $(document).height());
	$('.blackbox, .modal').fadeIn(200);
};

Modal.prototype.fill = function(html) {
	$('.modal').html(html);
};

Modal.prototype.resize = function() {
	var height = $(window).height();
	var width = $(window).width();
	$('.modal').css({
		'height' : height-40,
		'width' : width-(width*.3),
		'marginLeft' : -(width-(width*.3))/2
	});
};

Modal.prototype.close = function() {
	$('body').removeClass('modal-open');
	$('.blackbox, .modal').fadeOut(200);
};