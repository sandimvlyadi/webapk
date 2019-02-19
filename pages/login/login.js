var baseurl = 'http://192.168.5.122/webapi/';

function ping()
{
	$.get(baseurl + 'ajax_service?request=ping', function(response){
		if ($('#onlineStatusMsg').length > 0) {
			$('#onlineStatusMsg').slideUp('fast');
			$('#onlineStatusMsg').remove();
		}
		setTimeout(function(){
		    ping();
		}, 3000);
	}, 'json')
	.fail(function(jqXHR, textStatus, errorThrown){
		if ($('#onlineStatusMsg').length == 0) {
			$('body').prepend('<div id="onlineStatusMsg" class="bg-red color-palette" style="text-align: center;"> <b>You\'re offline.</b></div>').slideDown('slow');
		}
		setTimeout(function(){
			ping();
		}, 3000);
	});
}

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
	$('body').prepend('<div class="loading"><img class="imageRotateHorizontal" src="../../favicon.ico" /><p>Please Wait</p></div>');
	setTimeout(function(){
		$('.loading').remove();
		$('.login-box').show();
	}, 3000);

});

$(document).ready(function(){
	ping();

	$('#login-form button').removeAttr('disabled');
});