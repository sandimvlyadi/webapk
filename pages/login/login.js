$('#login-form button').click(function(){
	var email = $('input[type="email"]').val();
	if (email == '') {
		$('input[type="email"]').focus();
		var div = $('#login-form div:eq(0)');
		div.addClass('has-error');
		var errMsg = $('<span class="help-block"></span>');
		errMsg.append('Email can not be empty');
		$('#login-form div:eq(0)').append(errMsg.slideDown('slow').delay(3000).slideUp('fast'));
		setTimeout(function(){
			errMsg.remove();
		}, 4000);
		return;
	} else{
		if (email.indexOf('@') > 0 && email.indexOf('.') > 0) {
			var div = $('#login-form div:eq(0)');
			div.removeClass('has-error');
		} else{
			$('input[type="email"]').focus();
			var div = $('#login-form div:eq(0)');
			div.addClass('has-error');
			var errMsg = $('<span class="help-block"></span>');
			errMsg.append('Please enter your e-mail address correctly');
			$('#login-form div:eq(0)').append(errMsg.slideDown('slow').delay(3000).slideUp('fast'));
			setTimeout(function(){
				errMsg.remove();
			}, 4000);
			return;
		}
	}

	var paswd = $('input[type="password"]').val();
	if (paswd == '') {
		$('input[type="password"]').focus();
		var div = $('#login-form div:eq(1)');
		div.addClass('has-error');
		var errMsg = $('<span class="help-block"></span>');
		errMsg.append('Passowrd can not be empty');
		$('#login-form div:eq(1)').append(errMsg.slideDown('slow').delay(3000).slideUp('fast'));
		setTimeout(function(){
			errMsg.remove();
		}, 4000);
		return;
	} else{
		var div = $('#login-form div:eq(1)');
		div.removeClass('has-error');
	}

	$(this).attr('disabled', 'disabled');
	$('.login-box').hide();
	$('body').prepend(pleasewait);

	$.post(baseurl + 'ajax_service?request=eedacb1cf19c9aa0a5194bede1d25a40',
		{ 
			'data' : $('#login-form').serializeArray() 
		}, 
		function(response)
		{
			if (response.result) {
				location.replace(response.target);
			} else{
				fmDanger(response.msg);
			}
		}, 'json')
	.fail(function(jqXHR, textStatus, errorThrown){
		fmDanger('Failed to connect to the server.');
	});

	$('.loading').remove();
	$('.login-box').show();
	$('input[type="password"]').val('');
	$('input[type="password"]').focus();
	$('#login-form button').removeAttr('disabled');

});

$(document).ready(function(){
	ping();

	$('#login-form button').removeAttr('disabled');
});