var baseurl = 'http://192.168.5.122/webapi/';
// var baseurl = 'http://192.168.42.140/webapi/';

var onlineStatus = '<div id="onlineStatusMsg" class="fm fm-top fm-danger">You\'re not connected to server.</div>';
var pleasewait = '<div class="loading"><img class="imageRotateHorizontal" src="../../favicon.ico" /><p>Please Wait</p></div>';

var userData = JSON.parse(window.localStorage.getItem('user_data'));
var tokenData = JSON.parse(window.localStorage.getItem('token_data'));

$.ajaxSetup({
    headers: { 'Authorization' : '5a189754850faae3305b284e1ab93a8c' }
});

function ping()
{
	$.get(baseurl + 'ajax_service?request=ping', function(response){
		if ($('#onlineStatusMsg').length > 0) {
			$('#onlineStatusMsg').remove();
		}
		setTimeout(function(){
		    ping();
		}, 3000);
	}, 'json')
	.fail(function(jqXHR, textStatus, errorThrown){
		if ($('#onlineStatusMsg').length == 0) {
			$('body').prepend(onlineStatus);
		}
		setTimeout(function(){
			ping();
		}, 3000);
	});
}

function fmDanger(msg = '')
{
	var message = $('<div class="fm fm-bottom fm-danger">');
    message.append(msg);
    message.insertAfter($('body')).slideDown('slow').delay(3000).slideUp('fast');
    setTimeout(function(){
    	message.remove();
    }, 4000);
}

function fmSuccess(msg = '')
{
	var message = $('<div class="fm fm-bottom fm-success">');
    message.append(msg);
    message.insertAfter($('body')).slideDown('slow').delay(3000).slideUp('fast');
    setTimeout(function(){
    	message.remove();
    }, 4000);
}

function fmWarning(msg = '')
{
	var message = $('<div class="fm fm-bottom fm-warning">');
    message.append(msg);
    message.insertAfter($('body')).slideDown('slow').delay(3000).slideUp('fast');
    setTimeout(function(){
    	message.remove();
    }, 4000);
}

function validateToken(dataToken)
{
	var loc = window.location.href;
	loc = loc.substring(loc.lastIndexOf('/')+1, loc.lastIndexOf('.html'));

	if (dataToken == null) {
		if (loc != 'login' && loc != 'register' && loc != 'forgot') {
			sessionStorage.setItem('msgResult', 'false');
			sessionStorage.setItem('msg', 'You\'ve no session.');
			window.location.replace('../../pages/login/login.html');
		}
	} else{
		$.ajax({
			type	: 'POST',
			url		: baseurl + 'ajax_service?request=7557c877d37c51bb1b2b17cf7c07f7b5',
			dataType: 'json',
			data	: dataToken,
			success	: function(response){
				// console.log(response);
				if (response.result) {
					window.localStorage.setItem('user_data', JSON.stringify(response.data));
					userData = JSON.parse(window.localStorage.getItem('user_data'));
					if (loc == 'login') {
						window.location.replace('../../pages/dashboard/dashboard.html');
					}
				} else{
					if (loc != 'login' && loc != 'register' && loc != 'forgot') {
						window.location.replace('../../pages/login/login.html');
					}
				}
			},
			error 	: function(jqXHR, textStatus, errorThrown){
				fmDanger('Error: session validation has been failed.');
				console.log(jqXHR);
			}
		});
	}
}

$('#btnProfile').click(function(){
	
});

$('#btnSignOut').click(function(){
	window.localStorage.clear();
	window.location.reload();
});

$(document).ready(function(){
	ping();
	validateToken(tokenData);
	
	if (sessionStorage.getItem('msgResult') !== null) {
		if (sessionStorage.getItem('msgResult') === 'true') {
			fmSuccess(sessionStorage.getItem('msg'));
		} else{
			fmDanger(sessionStorage.getItem('msg'));
		}
		sessionStorage.removeItem('msgResult');
		sessionStorage.removeItem('msg');
	}
})