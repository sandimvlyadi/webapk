var baseurl = 'http://192.168.5.122/webapi/';

function ping()
{
	$.get(baseurl + 'ajax_service?request=ping', function(response){
		if ($('#onlineStatusMsg').length > 0) {
			$('#onlineStatusMsg').slideUp('slow');
			$('#onlineStatusMsg').remove();
		}
		setTimeout(function(){
		    ping();
		}, 60000);
	}, 'json')
	.fail(function(jqXHR, textStatus, errorThrown){
		if ($('#onlineStatusMsg').length == 0) {
			$('body').prepend('<div id="onlineStatusMsg" class="bg-red color-palette" style="text-align: center;"> <b>You\'re offline.</b></div>').slideDown('slow');
		}
		setTimeout(function(){
			ping();
		}, 5000);
	});
}

$(document).ready(function(){
	ping();
});