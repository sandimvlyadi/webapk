$('#register-form button').click(function(){
	var fullname = $('input[type="text"]:eq(0)').val();
	if (fullname == '') {
		$('input[type="text"]:eq(0)').focus();
		var div = $('#register-form div:eq(0)');
		div.addClass('has-error');
		var errMsg = $('<span class="help-block"></span>');
		errMsg.append('Please fill your fullname.');
		$('#register-form div:eq(0)').append(errMsg.slideDown('slow').delay(3000).slideUp('fast'));
		setTimeout(function(){
			errMsg.remove();
		}, 4000);
		return;
	} else{
		var div = $('#register-form div:eq(0)');
		div.removeClass('has-error');
	}

	var email = $('input[type="email"]').val();
	if (email == '') {
		$('input[type="email"]').focus();
		var div = $('#register-form div:eq(1)');
		div.addClass('has-error');
		var errMsg = $('<span class="help-block"></span>');
		errMsg.append('Email can not be empty.');
		$('#register-form div:eq(1)').append(errMsg.slideDown('slow').delay(3000).slideUp('fast'));
		setTimeout(function(){
			errMsg.remove();
		}, 4000);
		return;
	} else{
		if (email.indexOf('@') > 0 && email.indexOf('.') > 0) {
			var div = $('#register-form div:eq(1)');
			div.removeClass('has-error');
		} else{
			$('input[type="email"]').focus();
			var div = $('#register-form div:eq(1)');
			div.addClass('has-error');
			var errMsg = $('<span class="help-block"></span>');
			errMsg.append('Please enter your e-mail address correctly.');
			$('#register-form div:eq(1)').append(errMsg.slideDown('slow').delay(3000).slideUp('fast'));
			setTimeout(function(){
				errMsg.remove();
			}, 4000);
			return;
		}
	}

	var paswd = $('input[type="password"]:eq(0)').val();
	if (paswd == '') {
		$('input[type="password"]:eq(0)').focus();
		var div = $('#register-form div:eq(2)');
		div.addClass('has-error');
		var errMsg = $('<span class="help-block"></span>');
		errMsg.append('Passowrd can not be empty.');
		$('#register-form div:eq(2)').append(errMsg.slideDown('slow').delay(3000).slideUp('fast'));
		setTimeout(function(){
			errMsg.remove();
		}, 4000);
		return;
	} else{
		var div = $('#register-form div:eq(2)');
		div.removeClass('has-error');
	}

	var repaswd = $('input[type="password"]:eq(1)').val();
	if (repaswd == '') {
		$('input[type="password"]:eq(1)').focus();
		var div = $('#register-form div:eq(3)');
		div.addClass('has-error');
		var errMsg = $('<span class="help-block"></span>');
		errMsg.append('Repeat passowrd can not be empty.');
		$('#register-form div:eq(3)').append(errMsg.slideDown('slow').delay(3000).slideUp('fast'));
		setTimeout(function(){
			errMsg.remove();
		}, 4000);
		return;
	} else{
		var div = $('#register-form div:eq(3)');
		div.removeClass('has-error');
	}

	if (paswd != repaswd) {
		$('input[type="password"]:eq(1)').val('');
		$('input[type="password"]:eq(1)').focus();
		var div = $('#register-form div:eq(3)');
		div.addClass('has-error');
		var errMsg = $('<span class="help-block"></span>');
		errMsg.append('Your password is not match.');
		$('#register-form div:eq(3)').append(errMsg.slideDown('slow').delay(3000).slideUp('fast'));
		setTimeout(function(){
			errMsg.remove();
		}, 4000);
		return;
	}

	var isChecked = $('input[type="checkbox"]').prop('checked');
	if (!isChecked) {
		$('input[type="checkbox"]').focus();
		var errMsg = $('<span class="help-block" style="color: red;"></span>');
		errMsg.append('You should agree with our terms & conditions.');
		$('#register-form div:eq(5)').append(errMsg.slideDown('slow').delay(3000).slideUp('fast'));
		setTimeout(function(){
			errMsg.remove();
		}, 4000);
		return;
	}

	$(this).attr('disabled', 'disabled');
	$('.login-box').hide();
	$('body').prepend(pleasewait);

	// console.log($('#register-form').serializeArray());
	$.ajax({
		type	: 'POST',
		url		: baseurl + 'ajax_service?request=a8e01d08c74ef782d4335b5815efcf7d',
		dataType: 'json',
		data	: $("#register-form").serialize(),
		success	: function(response){
			// console.log(response);
			if (response.result) {
				sessionStorage.setItem('msgResult', response.result);
				sessionStorage.setItem('msg', response.msg);
				window.location.replace(response.target);
			} else{
				fmDanger(response.msg);
				$('.loading').remove();
				$('.login-box').show();
				$('input[type="password"]:eq(0)').val('');
				$('input[type="password"]:eq(1)').val('');
				$('input[type="password"]:eq(0)').focus();
				$('#register-form button').removeAttr('disabled');
			}
		},
		error 	: function(jqXHR, textStatus, errorThrown){
			fmDanger('Error: ' + textStatus);
			console.log(jqXHR);

			$('.loading').remove();
			$('.login-box').show();
			$('input[type="password"]:eq(0)').val('');
			$('input[type="password"]:eq(1)').val('');
			$('input[type="password"]:eq(0)').focus();
			$('#register-form button').removeAttr('disabled');
		}
	});

});

$(document).ready(function(){
	$('#register-form button').removeAttr('disabled');
});