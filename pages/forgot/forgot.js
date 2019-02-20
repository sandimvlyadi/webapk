$('#forgot-form button').click(function(){
	var email = $('input[type="email"]').val();
	if (email == '') {
		$('input[type="email"]').focus();
		var div = $('#forgot-form div:eq(0)');
		div.addClass('has-error');
		var errMsg = $('<span class="help-block"></span>');
		errMsg.append('Email can not be empty.');
		$('#forgot-form div:eq(0)').append(errMsg.slideDown('slow').delay(3000).slideUp('fast'));
		setTimeout(function(){
			errMsg.remove();
		}, 4000);
		return;
	} else{
		if (email.indexOf('@') > 0 && email.indexOf('.') > 0) {
			var div = $('#forgot-form div:eq(0)');
			div.removeClass('has-error');
		} else{
			$('input[type="email"]').focus();
			var div = $('#forgot-form div:eq(0)');
			div.addClass('has-error');
			var errMsg = $('<span class="help-block"></span>');
			errMsg.append('Please enter your e-mail address correctly.');
			$('#forgot-form div:eq(0)').append(errMsg.slideDown('slow').delay(3000).slideUp('fast'));
			setTimeout(function(){
				errMsg.remove();
			}, 4000);
			return;
		}
	}

	$(this).attr('disabled', 'disabled');
	$('.login-box').hide();
	$('body').prepend(pleasewait);

	// console.log($('#forgot-form').serializeArray());
	$.ajax({
		type	: 'POST',
		url		: baseurl + 'ajax_service?request=6af28909c46705fc22e4e2259787bc94',
		dataType: 'json',
		data	: $("#forgot-form").serialize(),
		success	: function(response){
			// console.log(response);
			if (response.result) {
				// window.location.replace(response.target);
				fmSuccess(response.msg);

				$('.loading').remove();
				$('.login-box').show();
				$('input[type="email"]').val('');
				$('input[type="email"]').focus();
				$('#forgot-form button').removeAttr('disabled');
			} else{
				fmDanger(response.msg);

				$('.loading').remove();
				$('.login-box').show();
				$('input[type="email"]').val('');
				$('input[type="email"]').focus();
				$('#forgot-form button').removeAttr('disabled');
			}
		},
		error 	: function(jqXHR, textStatus, errorThrown){
			fmDanger('Error: disconnected from server.');
			console.log(jqXHR);

			$('.loading').remove();
			$('.login-box').show();
			$('input[type="email"]').val('');
			$('input[type="email"]').focus();
			$('#forgot-form button').removeAttr('disabled');
		}
	});

});

$(document).ready(function(){
	$('#forgot-form button').removeAttr('disabled');
});