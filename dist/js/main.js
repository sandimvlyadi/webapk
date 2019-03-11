var baseurl = 'http://sisfo.bbt.kemenperin.go.id/webapi/';
// var baseurl = 'http://192.168.5.122/webapi/';
// var baseurl = 'http://192.168.42.140/webapi/';
//var baseurl = 'http://localhost/webapi/';

var onlineStatus = '<div id="onlineStatusMsg" class="fm fm-top fm-danger">You\'re not connected to server.</div>';
var pleasewait = '<div class="loading"><img class="imageRotateHorizontal" src="../../favicon.ico" /><p>Please Wait</p></div>';

var userData = JSON.parse(window.localStorage.getItem('user_data'));
var tokenData = JSON.parse(window.localStorage.getItem('token_data'));
var testData = JSON.parse(window.localStorage.getItem('testing_data'));
var caliData = JSON.parse(window.localStorage.getItem('calibration_data'));
var certData = JSON.parse(window.localStorage.getItem('certification_data'));

$.ajaxSetup({
    headers: { 'Authorization' : '5a189754850faae3305b284e1ab93a8c' }
});

function actionWhenOnline()
{
	if (userData != null && userData.display_picture != '') {
		$('.user-header img').attr('src', userData.display_picture);
		$('.user-menu a img').attr('src', userData.display_picture);
		$('.user-panel .image img').attr('src', userData.display_picture);
		$('#userImage').attr('src', userData.display_picture);
	}
}

function ping()
{
	$.get(baseurl + 'ajax_service?request=ping', function(response){
		if ($('#onlineStatusMsg').length > 0) {
			$('#onlineStatusMsg').remove();
		}

		actionWhenOnline();

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

$('#btnProfile').click(function(){
	window.location.replace('../../pages/profile/profile.html');
});

$('#btnSignOut, a[href="#signout"]').click(function(){
	window.localStorage.clear();
	window.location.replace('../../pages/login/login.html');
});

$('#btnQr').click(function(){
	window.Android.scanBarcode();
});

function qrCodeScannerResult(barcode)
{
	if (barcode != '') {
		$('input[name="Search[keyword]"]').val(barcode);
		$('input[name="Search[keyword]"]').focus();
		$('#btnSearch').trigger('click');
	}
}

$('input[name="Search[keyword]"]').on('keyup keypress', function(e){
	var keyCode = e.keyCode || e.which;
  	if (keyCode === 13) { 
    	e.preventDefault();
    	$('#btnSearch').trigger('click');
    	return false;
  	}
});

$('#btnSearch').click(function(){
 	var keyword = $('input[name="Search[keyword]"]').val();
 	if (keyword == '') {
 		fmWarning('Search keyword cannot be empty.');
 		return;
 	}
 	var sKeyword = keyword;
 	var sFound = 0;
 	keyword = keyword.toLowerCase();

 	$('body div').hide();
 	$('body').prepend(pleasewait);

 	window.localStorage.removeItem('sTest');
 	window.localStorage.removeItem('sCali');
 	window.localStorage.removeItem('sCert');
 	window.localStorage.removeItem('sKeyword');
 	window.localStorage.removeItem('sFound');

 	var sTest = Array();
 	var sCali = Array();
 	var sCert = Array();

 	for(var x in testData){
 		$.each(testData[x], function(key, data){
 			if (data != null) {
 				if (data.toLowerCase().indexOf(keyword) >= 0) {
 					sTest.push(testData[x]);
 					sFound = sFound + 1;
 					return false;
 				}
 			}
 		})
 	}

 	for(var x in caliData){
 		$.each(caliData[x], function(key, data){
 			if (data != null) {
 				if (data.toLowerCase().indexOf(keyword) >= 0) {
 					sCali.push(caliData[x]);
 					sFound = sFound + 1;
 					return false;
 				}
 			}
 		})
 	}

 	for(var x in certData){
 		$.each(certData[x], function(key, data){
 			if (data != null) {
 				if (data.toLowerCase().indexOf(keyword) >= 0) {
 					sCert.push(certData[x]);
 					sFound = sFound + 1;
 					return false;
 				}
 			}
 		})
 	}

 	if (sTest.length > 0) {
 		window.localStorage.setItem('sTest', JSON.stringify(sTest));
 	}
 	if (sCali.length > 0) {
 		window.localStorage.setItem('sCali', JSON.stringify(sCali));
 	}
 	if (sCert.length > 0) {
 		window.localStorage.setItem('sCert', JSON.stringify(sCert));
 	}
 	window.localStorage.setItem('sKeyword', JSON.stringify(sKeyword));
 	window.localStorage.setItem('sFound', JSON.stringify(sFound));

 	window.location.replace('../../pages/search/search.html');
});

$('body div').hide();
$('body').prepend(pleasewait);

$(document).ready(function(){
	ping();
	validateToken(tokenData);
	setFooter();

	if (userData != null) {
		if (userData.display_picture != '') {
			$('.user-header img')
			.on('error', function(){ $(this).attr('src', '../../dist/img/user2-160x160.jpg'); })
			.attr('src', userData.display_picture);
			$('.user-menu a img')
			.on('error', function(){ $(this).attr('src', '../../dist/img/user2-160x160.jpg'); })
			.attr('src', userData.display_picture);
			$('.user-panel .image img')
			.on('error', function(){ $(this).attr('src', '../../dist/img/user2-160x160.jpg'); })
			.attr('src', userData.display_picture);
			$('#userImage')
			.on('error', function(){ $(this).attr('src', '../../dist/img/user2-160x160.jpg'); })
			.attr('src', userData.display_picture);
		}

		$('.user-header p').replaceWith('<p>' + userData.fullname + '<small>' + userData.company_name + '</small></p>');
		$('.user-panel .info').remove();
		$('.user-panel').append('<div class="full-left info">');
		$('.user-panel .info').append('<p>'+ userData.fullname +'</p>');
		$('.user-panel .info').append('<i class="fa fa-home text-success"></i> ' + userData.company_name.substring(0, 17));
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