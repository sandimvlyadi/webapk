var baseurl = 'http://192.168.5.122/webapi/';

var onlineStatus = '<div id="onlineStatusMsg" class="fm fm-top fm-danger">You\'re not connected to server.</div>';
var pleasewait = '<div class="loading"><img class="imageRotateHorizontal" src="../../favicon.ico" /><p>Please Wait</p></div>';

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