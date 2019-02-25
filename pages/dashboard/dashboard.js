$(document).ready(function(){
	if (userData.display_picture != '') {
		$('.user-header img').attr('src', userData.display_picture);
		$('.user-menu a img').attr('src', userData.display_picture);
		$('.user-panel .image img').attr('src', userData.display_picture);
	}

	$('.user-header p').replaceWith('<p>' + userData.fullname + '<small>' + userData.company_name + '</small></p>');
	$('.user-panel .info').remove();
	$('.user-panel').append('<div class="full-left info">');
	$('.user-panel .info').append('<p>'+ userData.fullname +'</p>');
	$('.user-panel .info').append('<i class="fa fa-home text-success"></i> ' + userData.company_name.substring(0, 17));

	setTimeout(function(){
		$('body div').show();
		$('.loading').remove();
	}, 500);
});