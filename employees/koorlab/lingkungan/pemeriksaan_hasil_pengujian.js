var barangUji = '';

function generateTable()
{
	// redraw heading table
	$('#tablePemeriksaanHasilPengujian thead tr th').remove();
	$('#tablePemeriksaanHasilPengujian thead tr').append('<th>No.</th>');
	$('#tablePemeriksaanHasilPengujian thead tr').append('<th>Work Order</th>');
	$('#tablePemeriksaanHasilPengujian thead tr').append('<th>Status</th>');
	$('#tablePemeriksaanHasilPengujian thead tr').append('<th>Aksi</th>');

	// redraw body table
	$('#tablePemeriksaanHasilPengujian tbody tr').remove();
	$.get(baseurl + 'ajax_service/load?request=077ed13d3924f2c765353df38f1d3736&id_user='+ tokenData.id_user +'&token='+ tokenData.token, function(response){
		if (response.result) {
			var data = response.data;
			var tBody = $('#tablePemeriksaanHasilPengujian tbody');
			var tR = $('<tr>');
			var i = 1;
			for(var x in data){
				tR.append('<td>'+ i +'</td>');
				tR.append('<td>'+ data[x].kd_pemesanan +'</td>');
				var tD = $('<td>');
				var statusPengerjaan = $('<div class="label label-info">');
				statusPengerjaan.append(data[x].status_pengerjaan);
				tD.append(statusPengerjaan);
				tR.append(tD);
				if (data[x].status_pengerjaan == 'Koordinator Lab') {
					tR.append('<td><button id="'+ data[x].id_pemesanan +'" type="button" class="btn btn-success btn-sm btn-flat"><i class="fa fa-file-text-o"></i></button></td>');
				} else if (data[x].status_pengerjaan == 'Dokumentasi') {
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
		$('#tablePemeriksaanHasilPengujian, #tableDataHasilPengujian').DataTable({
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

function generateTableDataHasilPengujian(data)
{
	barangUji = data.barang_uji;
	var barang_uji = data.barang_uji;

	$('#tableDataHasilPengujian').DataTable().destroy();

	// redraw heading table
	$('#tableDataHasilPengujian thead tr th').remove();
	$('#tableDataHasilPengujian thead tr').append('<th>No.</th>');
	$('#tableDataHasilPengujian thead tr').append('<th>Contoh</th>');
	$('#tableDataHasilPengujian thead tr').append('<th>Kategori</th>');
	$('#tableDataHasilPengujian thead tr').append('<th>Nama Uji</th>');
	$('#tableDataHasilPengujian thead tr').append('<th>Metoda</th>');
	$('#tableDataHasilPengujian thead tr').append('<th>Hasil Uji</th>');
	$('#tableDataHasilPengujian thead tr').append('<th align="center">Ulang<br><input type="checkbox" name="check_ulangi_semua" id="check_ulangi_semua" value="checked_all"></th>');

	// redraw body table
	var tBody = $('#tableDataHasilPengujian tbody');
	var tR = $('<tr>');
	var i = 1;
	$('#tableDataHasilPengujian tbody tr').remove();
	// console.log(analis);
	for(var x in barang_uji){
		tR.append('<td>'+ i +'</td>');
		tR.append('<td>'+ barang_uji[x].nama_contoh +'</td>');
		tR.append('<td>'+ barang_uji[x].kategori +'</td>');
		tR.append('<td>'+ barang_uji[x].nama_uji +'</td>');
		tR.append('<td>'+ barang_uji[x].metoda +'</td>');
		if (barang_uji[x].status_pengerjaan == 'Koordinator Lab') {
			if (barang_uji[x].lampiran_uji == null) {
				tR.append('<td></td>');
			} else{
				tR.append('<td>'+ barang_uji[x].lampiran_uji +'</td>');
			}
		} else{
			tR.append('<td><div class="label label-danger">Belum Selesai</div></td>');
		}
		if (barang_uji[x].status_pengerjaan == 'Koordinator Lab') {
			tR.append('<td align="center"><input type="checkbox" name="check_ulangi" id="check_ulangi" value="'+ barang_uji[x].id_pengujian +'"></td>');
		} else{
			tR.append('<td></td>');
		}
		tBody.append(tR);
		tR = $('<tr>');
		i = i + 1;
	}

	$('#tableDataHasilPengujian').DataTable({
		'searching'			: false,
		'info'				: false,
		'paging'			: false,
		'ordering'			: false,
		'bLengthChange' 	: false,
		'scrollX'			: true
	});
	$('.dataTables_filter').addClass('pull-left');
}

$('#tablePemeriksaanHasilPengujian').on('click', '.btn-success', function(){
	$('.content box').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');
	$('.box:eq(1) .box-footer .btn-success').attr('id', id);
	$('.box:eq(1) .box-footer .btn-danger').attr('id', id);

	$.post(baseurl + 'ajax_service?request=ae56dacd1dd8375a7ef69d4a8a20cf29', 
	{
		'id'	: id,
		'token'	: tokenData
	},
	function(response){
		// console.log(response);
		if (response.result) {
			generateTableDataHasilPengujian(response.data);
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

$('#tablePemeriksaanHasilPengujian').on('click', '.btn-danger', function(){
	$('.content box').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');

	$.post(baseurl + 'ajax_service?request=3f858c8d5b08d48426549340234f7f61', 
	{
		'id'	: id,
		'token'	: tokenData
	},
	function(response){
		// console.log(response);
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
});

$('#tableDataHasilPengujian thead tr').on('click', 'input[type=checkbox]', function(){
	$('#tableDataHasilPengujian tbody input[type=checkbox]').each(function(){
		$(this).trigger('click');
	})
});

$('#tableDataHasilPengujian').on('click', 'input[type=checkbox]', function(){
	var id = $(this).val();
  	if (id == 'checked_all') {
    	return;
  	}
  	var data = '';
  	for(var x in barangUji){
  		if (barangUji[x].id_pengujian == id) {
  			data = barangUji[x];
  		}
  	}
  	$.post(baseurl + 'ajax_service?request=732da345ff0a712f7d16f9db09139128',
  	{
    	'data' 	: data,
    	'token'	: tokenData
  	},
  	function(data, status){
    	console.log(data);
  	}, 'json');
});

$('.box:eq(1) .box-footer').on('click', '.btn-danger', function(){
	$('.content box').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');

	$.post(baseurl + 'ajax_service?request=93441bca170c08eb46194d167ca2dda3', 
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

$('.box:eq(1) .box-footer').on('click', '.btn-success', function(){
	$('.content box').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');

	$.post(baseurl + 'ajax_service?request=d7a27e25043f0df41d670fed5192c836', 
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