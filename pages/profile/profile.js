$('input[name="Profile[display_picture]"]').click(function(){
	$('input[name="Profile[display_picture_file]"]').trigger('click');
});

$('input[name="Profile[display_picture_file]"]').change(function(e){
	e.preventDefault();
	if ($(this).val() != '') {
		$('input[name="Profile[display_picture]"]').val($(this).val());
	} else{
		$('input[name="Profile[display_picture]"]').val(userData.display_picture);
	}
});

$('#btnUploadDisplayPicture').click(function(){
	var fn = $('input[name="Profile[display_picture_file]"]').val();
	if (fn == '') {
		fmWarning('Choose a file to upload as display picture.');
		return;
	}

	var fd = $('input[name="Profile[display_picture_file]"]').prop('files')[0];
	var fu = new FormData();
	fu.append('file', fd);

	$('body div').hide();
	$('body').prepend(pleasewait);

	$.ajax({
        type        : 'POST',
        url         : baseurl + 'ajax_service/upload?request=32ac9d61d08e9806f92489f89e206b84&id_user=' + tokenData.id_user + '&token=' + tokenData.token,
        dataType	: 'json',
        cache       : false,
        contentType : false,
        processData : false,
        data        : fu,                         
        success		: function(response){
        	// console.log(response);
        	if (response.result) {
        		$('.user-header img').attr('src', response.file_uploaded);
				$('.user-menu a img').attr('src', response.file_uploaded);
				$('.user-panel .image img').attr('src', response.file_uploaded);

				$('input[name="Profile[display_picture]"]').val(response.file_uploaded);
        		$('#userImage').attr('src', response.file_uploaded);
        		userData.display_picture = response.file_uploaded;
        		window.localStorage.setItem('user_data', JSON.stringify(userData));

        		$('body div').show();
				$('.loading').remove();

        		fmSuccess(response.msg);
        	} else{
        		$('body div').show();
				$('.loading').remove();

        		fmDanger(response.msg);
        	}
        },
        error		: function(jqXHR, textStatus, errorThrown){
        	$('body div').show();
			$('.loading').remove();

			fmDanger('Error: Disconnected from server.');
			console.log(jqXHR);
		}
    });
});

$('#btnSaveFullname').click(function(){
	var fullname = $('input[name="Profile[fullname]"]').val();
	if (fullname == '') {
		$('input[name="Profile[fullname]"]').val(userData.fullname)
		fmWarning('Fullname cannot be empty.');
		return;
	}

	$('body div').hide();
	$('body').prepend(pleasewait);

	$.post(baseurl + 'ajax_service?request=716f3902aa7d14149cee3ec2c6d1589d',
	{
		'fullname'	: fullname,
		'token'		: tokenData
	}, function(response){
		// console.log(response);
		if (response.result) {
			$('.user-header p').replaceWith('<p>' + response.fullname + '<small>' + userData.company_name + '</small></p>');
			$('.user-panel .info').remove();
			$('.user-panel').append('<div class="full-left info">');
			$('.user-panel .info').append('<p>'+ response.fullname +'</p>');
			$('.user-panel .info').append('<i class="fa fa-home text-success"></i> ' + userData.company_name.substring(0, 17));

			$('#userFullname').text(response.fullname);
			$('input[name="Profile[fullname]"]').val(response.fullname);
			userData.fullname = response.fullname;
			window.localStorage.setItem('user_data', JSON.stringify(userData));

			$('body div').show();
			$('.loading').remove();

			fmSuccess(response.msg);
		} else{
			fmDanger(response.msg);
			
			$('body div').show();
			$('.loading').remove();
		}
	}, 'json')
	.fail(function(jqXHR, textStatus, errorThrown){
		fmDanger('Error: disconnected from server.');
		console.log(jqXHR);

		$('body div').show();
		$('.loading').remove();
	});
});

$('#btnSaveCompanyCode').click(function(){
	var company_code = $('input[name="Profile[company_code]"]').val();
	if (company_code == '') {
		$('input[name="Profile[company_code]"]').val(userData.company_code)
		fmWarning('Company code cannot be empty.');
		return;
	}

	if (company_code.length != 6) {
		$('input[name="Profile[company_code]"]').val(userData.company_code)
		fmWarning('Invalid company code.');
		return;
	}

	company_code = company_code.toUpperCase();

	$('body div').hide();
	$('body').prepend(pleasewait);

	$.post(baseurl + 'ajax_service?request=14417867d292840171a22404a85f3ff9',
	{
		'company_code'	: company_code,
		'token'			: tokenData
	}, function(response){
		// console.log(response);
		if (response.result) {
			$('.user-header p').replaceWith('<p>' + userData.fullname + '<small>' + response.company_name + '</small></p>');
			$('.user-panel .info').remove();
			$('.user-panel').append('<div class="full-left info">');
			$('.user-panel .info').append('<p>'+ userData.fullname +'</p>');
			$('.user-panel .info').append('<i class="fa fa-home text-success"></i> ' + response.company_name.substring(0, 17));

			$('#userCompany').text(response.company_name);
			$('input[name="Profile[company_code]"]').val(response.company_code);
			userData.company_code = response.company_code;
			userData.company_name = response.company_name;
			window.localStorage.setItem('user_data', JSON.stringify(userData));

			$('body div').show();
			$('.loading').remove();

			fmSuccess(response.msg);
		} else{
			fmDanger(response.msg);
			
			$('body div').show();
			$('.loading').remove();
		}
	}, 'json')
	.fail(function(jqXHR, textStatus, errorThrown){
		fmDanger('Error: disconnected from server.');
		console.log(jqXHR);

		$('body div').show();
		$('.loading').remove();
	});
});

$('#btnChangePassword').click(function(){
	var currentPassword = $('input[name="Profile[current_password]"]').val();
	if (currentPassword == '') {
		$('input[name="Profile[current_password]"]').focus();
		fmWarning('Current password cannot be empty.');
		return;
	}

	var newPassword = $('input[name="Profile[new_password]"]').val();
	if (newPassword == '') {
		$('input[name="Profile[new_password]"]').focus();
		fmWarning('New password cannot be empty.');
		return;
	}

	var repeatPassword = $('input[name="Profile[repeat_password]"]').val();
	if (repeatPassword == '') {
		$('input[name="Profile[repeat_password]"]').focus();
		fmWarning('Repeat password cannot be empty.');
		return;
	}

	if (newPassword != repeatPassword) {
		$('input[name="Profile[new_password]"]').val('');
		$('input[name="Profile[repeat_password]"]').val('');
		$('input[name="Profile[new_password]"]').focus();
		fmWarning('New password doesn\'t match.');
		return;
	}

	$('body div').hide();
	$('body').prepend(pleasewait);

	$.post(baseurl + 'ajax_service?request=a812b9339fcd1bfa5de8417205aa2749',
	{
		'current_password'	: currentPassword,
		'new_password'		: newPassword,
		'repeat_password'	: repeatPassword,
		'token'				: tokenData
	}, function(response){
		// console.log(response);
		if (response.result) {
			$('input[name="Profile[current_password]"]').val('');
			$('input[name="Profile[new_password]"]').val('');
			$('input[name="Profile[repeat_password]"]').val('');
			
			$('body div').show();
			$('.loading').remove();

			fmSuccess(response.msg);
		} else{
			$('input[name="Profile[current_password]"]').val('');
			$('input[name="Profile[new_password]"]').val('');
			$('input[name="Profile[repeat_password]"]').val('');

			fmDanger(response.msg);
			
			$('body div').show();
			$('.loading').remove();
		}
	}, 'json')
	.fail(function(jqXHR, textStatus, errorThrown){
		$('input[name="Profile[current_password]"]').val('');
		$('input[name="Profile[new_password]"]').val('');
		$('input[name="Profile[repeat_password]"]').val('');

		fmDanger('Error: disconnected from server.');
		console.log(jqXHR);

		$('body div').show();
		$('.loading').remove();
	});
});

$(document).ready(function(){
	if (userData.display_picture != '') {
		$('#userImage').attr('src', userData.display_picture);
	}
	$('#userFullname').text(userData.fullname);
	$('#userCompany').text(userData.company_name);
	$('input[name="Profile[display_picture]"]').val(userData.display_picture);
	$('input[name="Profile[fullname]"]').val(userData.fullname);
	$('input[name="Profile[company_code]"]').val(userData.company_code);

	$('body div').show();
	$('.loading').remove();
});