function generateTable()
{
	// redraw heading table
	$('#tablePekerjaanPengujian thead tr th').remove();
	$('#tablePekerjaanPengujian thead tr').append('<th>No.</th>');
	$('#tablePekerjaanPengujian thead tr').append('<th>Work Order</th>');
	$('#tablePekerjaanPengujian thead tr').append('<th>Status</th>');
	$('#tablePekerjaanPengujian thead tr').append('<th>Aksi</th>');

	// redraw body table
	$('#tablePekerjaanPengujian tbody tr').remove();
	$.get(baseurl + 'ajax_service/load?request=b9f9db4d4880e6419279fb72fa583678&id_user='+ tokenData.id_user +'&token='+ tokenData.token, function(response){
		if (response.result) {
			var data = response.data;
			var tBody = $('#tablePekerjaanPengujian tbody');
			var tR = $('<tr>');
			var i = 1;
			for(var x in data){
				tR.append('<td>'+ i +'</td>');
				tR.append('<td>'+ data[x].kd_pemesanan +'</td>');
				var tD = $('<td>');
				var statusPengerjaan = '';
				if (data[x].status_pengerjaan == 'Akan Dibagikan') {
					statusPengerjaan = $('<div class="label label-danger">');
				} else{
					statusPengerjaan = $('<div class="label label-info">');
				}
				statusPengerjaan.append(data[x].status_pengerjaan);
				tD.append(statusPengerjaan);
				tR.append(tD);
				if ((data[x].status_pengerjaan == 'Akan Dibagikan' && data[x].id_anggota == null) || (data[x].status_pengerjaan == 'Analis / Teknisi' && data[x].keterangan == 'Belum Diuji') || (data[x].status_pengerjaan == 'Analis / Teknisi')) {
					tR.append('<td><button id="'+ data[x].id_pemesanan +'" type="button" class="btn btn-success btn-sm btn-flat"><i class="fa fa-pencil"></i></button></td>');
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
		$('#tablePekerjaanPengujian, #tableProsesPengujian').DataTable({
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

function generateTableProses(data)
{
	var barang_uji = data.barang_uji;
	var analis = data.analis;

	$('#tableProsesPengujian').DataTable().destroy();

	// redraw heading table
	$('#tableProsesPengujian thead tr th').remove();
	$('#tableProsesPengujian thead tr').append('<th>No.</th>');
	$('#tableProsesPengujian thead tr').append('<th>Contoh</th>');
	$('#tableProsesPengujian thead tr').append('<th>Kategori</th>');
	$('#tableProsesPengujian thead tr').append('<th>Nama Uji</th>');
	$('#tableProsesPengujian thead tr').append('<th>Metoda</th>');
	$('#tableProsesPengujian thead tr').append('<th>Analis</th>');
	$('#tableProsesPengujian thead tr').append('<th>Keterangan</th>');

	// redraw body table
	var tBody = $('#tableProsesPengujian tbody');
	var tR = $('<tr>');
	var i = 1;
	$('#tableProsesPengujian tbody tr').remove();
	// console.log(analis);
	for(var x in barang_uji){
		tR.append('<td>'+ i +'</td>');
		tR.append('<td>'+ barang_uji[x].nama_contoh +'</td>');
		tR.append('<td>'+ barang_uji[x].kategori +'</td>');
		tR.append('<td>'+ barang_uji[x].nama_uji +'</td>');
		tR.append('<td>'+ barang_uji[x].metoda +'</td>');
		var tD = $('<td style="min-width: 150px;">');
		tD.append('<input type="hidden" value="'+ barang_uji[x].id_pengujian +'" class="form-control">')
		var select = $('<select class="form-control select2">');
		select.append('<option value="0" selected>- Pilih -</option>');
		for(var y in analis){
			if (barang_uji[x].id_anggota == analis[y].id_anggota) {
				select.append('<option value="'+ analis[y].id_anggota +'" selected>'+ analis[y].pengguna +'</option>');
			} else{
				select.append('<option value="'+ analis[y].id_anggota +'">'+ analis[y].pengguna +'</option>');
			}
		}
		tD.append(select);
		tR.append(tD);
		if (barang_uji[x].keterangan != null || barang_uji[x].keterangan != '') {
			tR.append('<td style="min-width: 150px;"><input type="text" value="'+ barang_uji[x].keterangan +'" class="form-control"></td>');
		} else{
			tR.append('<td style="min-width: 150px;"><input type="text" class="form-control"></td>');
		}
		tBody.append(tR);
		tR = $('<tr>');
		i = i + 1;
	}

	$('.select2').select2();

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

$('#tablePekerjaanPengujian').on('click', '.btn-success', function(){
	$('.content box').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');
	$('.box:eq(1) .box-footer .btn-success').attr('id', id);
	$('.box:eq(1) .box-footer .btn-danger').attr('id', id);

	$.post(baseurl + 'ajax_service?request=f99c78ddc4ce71e054f3d3b16bb01967', 
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

$('.box:eq(1) .box-footer').on('click', '.btn-danger', function(){
	$('.box:eq(0)').slideDown();
	$('.box:eq(1)').slideUp();
});

$('.box:eq(1) .box-footer').on('click', '.btn-success', function(){
	var analis = $('.box:eq(1) form').serializeArray();
	for(var x in analis){
		if (analis[x].name.substr(0, 6) == 'Analis') {
			if (analis[x].value == 0) {
				fmWarning('Silakan pilih analis untuk pengujian.');
				return;
			}
		}
	}

	$('.content box').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');

	var id = $('input[name="Pengujian[id]"]').val();
	analis = new Array();
	$('#tableProsesPengujian tbody tr').each(function(){
		var id_pengujian = $(this).find('input[type="hidden"]').val();
		var id_analis = $(this).find('.select2').val();
		var keterangan = $(this).find('input[type="text"]').val();
		var data = {
			id_pengujian	: id_pengujian,
			id_analis		: id_analis,
			keterangan 		: keterangan
		}
		analis.push(data);
	});
	$.post(baseurl + 'ajax_service?request=348633741e66e39a59cf0f12cd22ba75', 
	{
		'id'		: id,
		'analis'	: analis,
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