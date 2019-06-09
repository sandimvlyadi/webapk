var baseurl = 'http://sisfo.bbt.kemenperin.go.id/webapi/';
// var baseurl = 'http://192.168.5.122/webapi/';
// var baseurl = 'http://192.168.42.140/webapi/';
// var baseurl = 'http://localhost/webapi/';

var onlineStatus = '<div id="onlineStatusMsg" class="fm fm-top fm-danger">You\'re not connected to server.</div>';
var pleasewait = '<div class="loading"><img class="imageRotateHorizontal" src="../../favicon.ico" /><p>Please Wait</p></div>';

var userData = JSON.parse(window.localStorage.getItem('user_data'));
var tokenData = JSON.parse(window.localStorage.getItem('token_data'));

$.ajaxSetup({
    headers: { 'Authorization' : 'a7cc4403cf63785bc0a226cdb98cf713' }
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
		if (loc != 'login') {
			sessionStorage.setItem('msgResult', 'false');
			sessionStorage.setItem('msg', 'You\'ve no session.');
			window.location.replace('../../login/login.html');
		}
	} else{
		$.ajax({
			type	: 'POST',
			url		: baseurl + 'ajax_service?request=08f6c4027f3cf8ebc9a2aca8e113eaf0',
			dataType: 'json',
			data	: dataToken,
			success	: function(response){
				// console.log(response);
				if (response.result) {
					window.localStorage.setItem('user_data', JSON.stringify(response.data));
					userData = JSON.parse(window.localStorage.getItem('user_data'));
					if (loc == 'login') {
						window.location.replace(response.target);
					}
				} else{
					if (loc != 'login') {
						window.location.replace('../../login/login.html');
					}
				}
			},
			error 	: function(jqXHR, textStatus, errorThrown){
				// fmDanger('Error: session validation has been failed.');
				console.log(jqXHR);
			}
		});
	}
}

function setFooter()
{
	var date = new Date();
	var year = date.getFullYear();
	if (year == '2019') {
		$('.main-footer').html('<strong>Copyright &copy; 2019.</strong> All rights reserved.');
	} else{
		$('.main-footer').html('<strong>Copyright &copy; 2019 - '+ year +'.</strong> All rights reserved.');
	}
}

function setIDR(price)
{
	var	number_string = price.toString(),
	sisa 	= number_string.length % 3,
	rupiah 	= number_string.substr(0, sisa),
	ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
		
	if (ribuan) {
		separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}

	return rupiah;
}

$('#btnSignOut, a[href="#signout"]').click(function(){
	window.localStorage.clear();
	window.location.replace('../../login/login.html');
});

$('body div').hide();
$('body').prepend(pleasewait);

$(document).ready(function(){
	ping();
	validateToken(tokenData);
	setFooter();

	if (userData != null) {
		$('.user-header p').replaceWith('<p>' + userData.pengguna + '<small>' + userData.nama_jabatan + '</small></p>');
	}
	
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