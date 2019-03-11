function generateTable()
{
	// redraw heading table
	$('#tablePekerjaanAnalis thead tr th').remove();
	$('#tablePekerjaanAnalis thead tr').append('<th>No.</th>');
	$('#tablePekerjaanAnalis thead tr').append('<th>Work Order</th>');
	$('#tablePekerjaanAnalis thead tr').append('<th>Status</th>');
	$('#tablePekerjaanAnalis thead tr').append('<th>Aksi</th>');

	// redraw body table
	$('#tablePekerjaanAnalis tbody tr').remove();
	$.get(baseurl + 'ajax_service/load?request=88f0536f00f35dea867adb261fec64bd&id_user='+ tokenData.id_user +'&token='+ tokenData.token, function(response){
		if (response.result) {
			var data = response.data;
			var tBody = $('#tablePekerjaanAnalis tbody');
			var tR = $('<tr>');
			var i = 1;
			for(var x in data){
				tR.append('<td>'+ i +'</td>');
				tR.append('<td>'+ data[x].kd_pemesanan +'</td>');
				var tD = $('<td>');
				var statusPengerjaan = '';
				if (data[x].status_pengerjaan == 'Analis / Teknisi') {
					statusPengerjaan = $('<div class="label label-danger">');
				} else{
					statusPengerjaan = $('<div class="label label-info">');
				}
				statusPengerjaan.append(data[x].status_pengerjaan);
				tD.append(statusPengerjaan);
				tR.append(tD);
				if (data[x].status_pengerjaan == 'Analis / Teknisi' && data[x].hasil_uji == null) {
					tR.append('<td><button id="'+ data[x].id_pemesanan +'" type="button" class="btn btn-success btn-sm btn-flat"><i class="fa fa-pencil"></i></button></td>');
				} else if (data[x].status_pengerjaan == 'Koordinator Lab') {
					tR.append('<td><button id="'+ data[x].id_pemesanan +'" type="button" class="btn btn-danger btn-sm btn-flat"><i class="fa fa-undo"></i></button></td>');
				} else{
					tR.append('<td></td>');
				}
				tBody.append(tR);
				tR = $('<tr>');
				i = i + 1;
			}
		} else{
			fmWarning(response.msg);
		}
	}, 'json')
	.done(function(){
		$('#tablePekerjaanAnalis, #tableProsesPengujian').DataTable({
			'ordering'			: false,
			'bLengthChange' 	: false,
			'pagingType'		: 'full',
			'iDisplayLength'	: 5
		});
		$('.dataTables_filter').addClass('pull-left');
	})
	.fail(function(jqXHR, textStatus, errorThrown){
		console.log(jqXHR);
	})
	.always(function(){
		$('.content div').show();
		$('.loading').remove();
	});
}

var barangUji = '';

function generateTableProses(data)
{
	var barang_uji = data.barang_uji;
	barangUji = barang_uji;

	$('#tableProsesPengujian').DataTable().destroy();

	// redraw heading table
	$('#tableProsesPengujian thead tr th').remove();
	$('#tableProsesPengujian thead tr').append('<th>No.</th>');
	$('#tableProsesPengujian thead tr').append('<th>Nama Alat</th>');
	$('#tableProsesPengujian thead tr').append('<th>Nama Uji</th>');
	$('#tableProsesPengujian thead tr').append('<th>Metoda</th>');
	$('#tableProsesPengujian thead tr').append('<th>Status Uji</th>');
	$('#tableProsesPengujian thead tr').append('<th>Lampiran Uji</th>');
	$('#tableProsesPengujian thead tr').append('<th>Aksi</th>');

	// redraw body table
	var tBody = $('#tableProsesPengujian tbody');
	var tR = $('<tr>');
	var i = 1;
	$('#tableProsesPengujian tbody tr').remove();
	// console.log(barang_uji);
	for(var x in barang_uji){
		tR.append('<td>'+ i +'</td>');
		tR.append('<td>'+ barang_uji[x].nama_contoh +'</td>');
		tR.append('<td>'+ barang_uji[x].nama_uji +'</td>');
		tR.append('<td>'+ barang_uji[x].metoda +'</td>');
		if (barang_uji[x].status_uji == 'Belum Selesai') {
			tR.append('<td><div class="label label-danger">'+ barang_uji[x].status_uji +'</div></td>');
			tR.append('<td style="min-width: 150px;"><input id="'+ barang_uji[x].id_pengujian +'" type="file" name="Pengujian[upload_file]" class="form-control" style="display: none;" accept=".doc, .docx, .xls, .xlsx, .pdf, .jpeg, .jpg, .png"><input id="'+ barang_uji[x].id_pengujian +'" type="text" name="Pengujian[select_file]" class="form-control" placeholder="Pilih File" readonly="readonly"></td>');
			tR.append('<td><button id="'+ barang_uji[x].id_pengujian +'" type="button" class="btn btn-success btn-sm btn-flat" disabled="disabled"><i class="fa fa-upload"></i> Upload</button></td>');
		} else{
			tR.append('<td><div class="label label-success">'+ barang_uji[x].status_uji +'</div></td>');
			if (barang_uji[x].lampiran_uji == null) {
				tR.append('<td></td>');
				tR.append('<td></td>');
			} else{
				tR.append('<td>'+ barang_uji[x].lampiran_uji +'</td>');
				tR.append('<td><button id="'+ barang_uji[x].id_pengujian +'" type="button" class="btn btn-danger btn-sm btn-flat"><i class="fa fa-trash"></i></button></td>');
			}
		}
		tBody.append(tR);
		tR = $('<tr>');
		i = i + 1;
	}

	$('#tableProsesPengujian').DataTable({
		'searching'			: false,
		'info'				: false,
		'paging'			: false,
		'ordering'			: false,
		'bLengthChange' 	: false,
		'scrollX'			: true
	});
	$('.dataTables_filter').addClass('pull-left');
}

$('#tablePekerjaanAnalis').on('click', '.btn-success', function(){
	$('.content box').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');
	$('.box:eq(1) .box-footer .btn-success').attr('id', id);

	$.post(baseurl + 'ajax_service?request=9c6351bc9d7c063a2dac8609e7c514c0', 
	{
		'id'	: id,
		'token'	: tokenData
	},
	function(response){
		// console.log(response);
		if (response.result) {
			var customer = response.data.customer;
			$('input[name="Pengujian[nomor_wo]"]').val(customer[0].kd_pemesanan);
			$('input[name="Pengujian[id]"]').val(customer[0].id_pemesanan);
			$('input[name="Pengujian[keterangan]"]').text(customer[0].keterangan);

			generateTableProses(response.data);
		} else{
			fmDanger(response.msg);
		}
	}, 'json')
	.fail(function(jqXHR, textStatus, errorThrown){
		console.log(jqXHR);
		fmDanger('Tidak terhubung dengan server.');
	});

	$(this).removeAttr('disabled');

	$('.content .box:eq(0)').show();
	$('.loading').remove();

	$('.box:eq(1)').slideDown();
	$('.box:eq(0)').slideUp();
});

$('#tablePekerjaanAnalis').on('click', '.btn-danger', function(){
	$('.content box').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');

	$.post(baseurl + 'ajax_service?request=1a62fb49026b5a2f38ba6739021fb671', 
	{
		'id'	: id,
		'token'	: tokenData
	},
	function(response){
		console.log(response);
		if (response.result) {
			sessionStorage.setItem('msgResult', response.result);
			sessionStorage.setItem('msg', response.msg);
			window.location.reload();
		} else{
			fmDanger(response.msg);
		}
	}, 'json')
	.fail(function(jqXHR, textStatus, errorThrown){
		console.log(jqXHR);
		fmDanger('Tidak terhubung dengan server.');
	});

	$(this).removeAttr('disabled');

	$('.content .box:eq(0)').show();
	$('.loading').remove();

	$('.box:eq(1)').slideDown();
	$('.box:eq(0)').slideUp();
});

$('#tableProsesPengujian').on('click', 'input[name="Pengujian[select_file]"]', function(){
	var id = $(this).attr('id');
	$('input[name="Pengujian[upload_file]"]').each(function(){
		var idBtn = $(this).attr('id');
		if (id == idBtn) {
			$(this).trigger('click');
		}
	});
});

$('#tableProsesPengujian').on('change', 'input[name="Pengujian[upload_file]"]', function(){
	var id = $(this).attr('id');
	var filename = $(this).val();
	if (filename != '') {
		$('input[name="Pengujian[select_file]"]').each(function(){
			var idFile = $(this).attr('id');
			if (id == idFile) {
				$(this).val(filename);
			}
		});
		$('#tableProsesPengujian .btn-success').each(function(){
			var idBtn = $(this).attr('id');
			if (id == idBtn) {
				$(this).removeAttr('disabled');
			}
		});
	} else{
		$('input[name="Pengujian[select_file]"]').each(function(){
			var idFile = $(this).attr('id');
			if (id == idFile) {
				$(this).val(filename);
			}
		});
		$('#tableProsesPengujian .btn-success').each(function(){
			var idBtn = $(this).attr('id');
			if (id == idBtn) {
				$(this).attr('disabled', 'disabled');
			}
		});
	}
});

$('#tableProsesPengujian').on('click', '.btn-success', function(){
	var id = $(this).attr('id');
	var fd = '';
	$('input[name="Pengujian[upload_file]"]').each(function(){
		var idFile = $(this).attr('id');
		if (id == idFile) {
			var fn = $(this).val();
			if (fn == '') {
				fmWarning('Silakan pilih dokumen hasil uji terlebih dahulu.');
				return;
			} else{
				fd = $(this).prop('files')[0];
			}
		}
	});

	$('.content box').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');

	var fu = new FormData();
	fu.append('file', fd);
	fu.append('id_pengujian', id);
	fu.append('id_pemesanan', $('input[name="Pengujian[id]"]').val());

	$.ajax({
	    type        : 'POST',
	    url         : baseurl + 'ajax_service/upload?request=f29ad6b45c52319eb8b0af074a18ecdb&employee=true&id_user=' + tokenData.id_user + '&token=' + tokenData.token,
	    dataType	: 'json',
	    cache       : false,
	    contentType : false,
	    processData : false,
	    data        : fu,                         
	    success		: function(response){
	    	// console.log(response);
	    	if (response.result) {
	    		generateTableProses(response.data);
	    		fmSuccess(response.msg);
	    	} else{
	    		fmDanger(response.msg);
	    	}
	    },
	    error		: function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR);
			fmDanger('Tidak terhubung dengan server.');
		}
	})
	.always(function(){
	    $(this).removeAttr('disabled');

        $('.content .box:eq(1)').show();
        $('.loading').remove();
	});
});

$('#tableProsesPengujian').on('click', '.btn-danger', function(){
	$('.content box').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');

	var data = '';
	for(var x in barangUji){
		if (barangUji[x].id_pengujian == id) {
			data = barangUji[x];
		}
	}

	$.post(baseurl + 'ajax_service?request=47bfcb86aa93c75f5add32c9d8984331', 
	{
		'data'		: data,
		'token'		: tokenData
	},
	function(response){
		// console.log(response);
		if (response.result) {
			generateTableProses(response.data);
			fmSuccess(response.msg);
		} else{
			fmDanger(response.msg);
		}
	}, 'json')
	.fail(function(jqXHR, textStatus, errorThrown){
		console.log(jqXHR);
		fmDanger('Tidak terhubung dengan server.');
	});

	$(this).removeAttr('disabled');

	$('.content .box:eq(1)').show();
	$('.loading').remove();
});

$('.box:eq(1) .box-footer').on('click', '.btn-danger', function(){
	$('.box:eq(0)').slideDown();
	$('.box:eq(1)').slideUp();
});

$('.box:eq(1) .box-footer').on('click', '.btn-success', function(){
	$('.content box').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');

	$.post(baseurl + 'ajax_service?request=fe9d44255097454715a4bf22b02672ae', 
	{
		'id'		: id,
		'token'		: tokenData
	},
	function(response){
		console.log(response);
		if (response.result) {
			sessionStorage.setItem('msgResult', response.result);
			sessionStorage.setItem('msg', response.msg);
			window.location.reload();
		} else{
			fmDanger(response.msg);
		}
	}, 'json')
	.fail(function(jqXHR, textStatus, errorThrown){
		console.log(jqXHR);
		fmDanger('Tidak terhubung dengan server.');
	});

	$(this).removeAttr('disabled');

	$('.content .box:eq(1)').show();
	$('.loading').remove();
});

$(document).ready(function(){
	generateTable();

	$('body div').show();
	$('.loading').remove();

	$('.content .box:eq(1)').fadeOut('fast');

	$('.content div').hide();
	$('.content').prepend(pleasewait);
});