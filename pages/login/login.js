$('#login-form button').click(function(){
	var email = $('input[type="email"]').val();
	if (email == '') {
		$('input[type="email"]').focus();
		var div = $('#login-form div:eq(0)');
		div.addClass('has-error');
		var errMsg = $('<span class="help-block"></span>');
		errMsg.append('Email can not be empty.');
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
			errMsg.append('Please enter your e-mail address correctly.');
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
		errMsg.append('Passowrd can not be empty.');
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

	// console.log($('#login-form').serializeArray());
	$.ajax({
		type	: 'POST',
		url		: baseurl + 'ajax_service?request=eedacb1cf19c9aa0a5194bede1d25a40',
		dataType: 'json',
		data	: $("#login-form").serialize(),
		success	: function(response){
			// console.log(response);
			if (response.result) {
				// console.log(response.data);
				window.localStorage.setItem('user_data', JSON.stringify(response.data));
				window.localStorage.setItem('token_data', JSON.stringify(response.token));
				window.localStorage.setItem('testing_data', JSON.stringify(response.testing));
				window.localStorage.setItem('calibration_data', JSON.stringify(response.calibration));
				window.localStorage.setItem('certification_data', JSON.stringify(response.certification));
				window.location.replace(response.target);
			} else{
				fmDanger(response.msg);

				$('.loading').remove();
				$('.login-box').show();
				$('input[type="password"]').val('');
				$('input[type="password"]').focus();
				$('#login-form button').removeAttr('disabled');
			}
		},
		error 	: function(jqXHR, textStatus, errorThrown){
			fmDanger('Error: disconnected from server.');
			console.log(jqXHR);

			$('.loading').remove();
			$('.login-box').show();
			$('input[type="password"]').val('');
			$('input[type="password"]').focus();
			$('#login-form button').removeAttr('disabled');
		}
	});

});

$(document).ready(function(){
	$('#login-form button').removeAttr('disabled');

	$('body div').show();
	$('.loading').remove();
});