function generateTable()
{
	// redraw heading table
	$('#tableLaporanProduksi thead tr th').remove();
	$('#tableLaporanProduksi thead tr').append('<th>No.</th>');
	$('#tableLaporanProduksi thead tr').append('<th>Work Order</th>');
	$('#tableLaporanProduksi thead tr').append('<th>Status Pemesanan</th>');
	$('#tableLaporanProduksi thead tr').append('<th>Status Bayar</th>');

	// redraw body table
	$('#tableLaporanProduksi tbody tr').remove();
	$.get(baseurl + 'ajax_service/load?request=e5c986e7a094d0b3c7f84a2646f91eae&id_user='+ tokenData.id_user +'&token='+ tokenData.token, function(response){
		if (response.result) {
			var data = response.data;
			var tBody = $('#tableLaporanProduksi tbody');
			var tR = $('<tr>');
			var i = 1;
			for(var x in data){
				tR.append('<td>'+ i +'</td>');
				tR.append('<td>'+ data[x].kd_pemesanan +'</td>');
				var tD = $('<td>');
				var statusPemesanan = '';
				if (data[x].status_pemesanan == 'Belum Lengkap') {
					statusPemesanan = $('<div class="label label-danger">');
				} else if (data[x].status_pemesanan == 'Selesai') {
					statusPemesanan = $('<div class="label label-success">');
				} else{
					statusPemesanan = $('<div class="label label-info">');
				}
				statusPemesanan.append(data[x].status_pemesanan);
				tD.append(statusPemesanan);
				tR.append(tD);
				tD = $('<td>');
				var statusKeuangan = '';
				if (data[x].status_keuangan == 'Belum Lunas') {
					statusKeuangan = $('<div class="label label-danger">');
				} else{
					statusKeuangan = $('<div class="label label-success">');
				}
				statusKeuangan.append(data[x].status_keuangan);
				tD.append(statusKeuangan);
				tR.append(tD);
				tBody.append(tR);
				tR = $('<tr>');
				i = i + 1;
			}
		} else{
			fmWarning(response.msg);
		}
	}, 'json')
	.done(function(){
		$('#tableLaporanProduksi').DataTable({
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

$('#dpFrom, #dpTo').datepicker({
	autoclose		: true,
	format			: 'yyyy-mm-dd',
	todayHighlight	: true
});

$('#filter').on('click', '.btn-success', function(){
	var from = $('#dpFrom').val();
	var to = $('#dpTo').val();
	var from = $('#dpFrom').val();
	if (from == '' && to == '') {
		fmWarning('Silakan masukan rentang waktu terlebih dahulu.');
		return;
	}
	
	$('.content div').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');

	$.post(baseurl + 'ajax_service?request=3a25677d5fcb5019d1735e67749fc9a7', 
	{
		'from'	: $('input[name="Filter[date_from]"]').val(),
		'to'	: $('input[name="Filter[date_to]"]').val(),
		'by'	: $('select[name="Filter[filter_by]"]').val(),
		'token'	: tokenData
	},
	function(response){
		if (response.result) {
			$('#tableLaporanProduksi').DataTable().destroy();
			$('#tableLaporanProduksi tbody tr').remove();
			var data = response.data;
			var tBody = $('#tableLaporanProduksi tbody');
			var tR = $('<tr>');
			var i = 1;
			for(var x in data){
				tR.append('<td>'+ i +'</td>');
				tR.append('<td>'+ data[x].kd_pemesanan +'</td>');
				var tD = $('<td>');
				var statusPemesanan = '';
				if (data[x].status_pemesanan == 'Belum Lengkap') {
					statusPemesanan = $('<div class="label label-danger">');
				} else if (data[x].status_pemesanan == 'Selesai') {
					statusPemesanan = $('<div class="label label-success">');
				} else{
					statusPemesanan = $('<div class="label label-info">');
				}
				statusPemesanan.append(data[x].status_pemesanan);
				tD.append(statusPemesanan);
				tR.append(tD);
				tD = $('<td>');
				var statusKeuangan = '';
				if (data[x].status_keuangan == 'Belum Lunas') {
					statusKeuangan = $('<div class="label label-danger">');
				} else{
					statusKeuangan = $('<div class="label label-success">');
				}
				statusKeuangan.append(data[x].status_keuangan);
				tD.append(statusKeuangan);
				tR.append(tD);
				tBody.append(tR);
				tR = $('<tr>');
				i = i + 1;
			}
		} else{
			fmDanger(response.msg);
		}
	}, 'json')
	.done(function(){
		$('#tableLaporanProduksi').DataTable({
			'ordering'			: false,
			'bLengthChange' 	: false,
			'pagingType'		: 'full',
			'iDisplayLength'	: 5
		});
		$('.dataTables_filter').addClass('pull-left');
	})
	.fail(function(jqXHR, textStatus, errorThrown){
		console.log(jqXHR);
		fmDanger('Tidak terhubung dengan server.');
	})
	.always(function(){;
		$('.content div').show();
		$('.loading').remove();
	});

	$(this).removeAttr('disabled');
});

$('#filter').on('click', '.btn-primary', function(){
	$('input[name="Filter[date_from]"]').val('');
	$('input[name="Filter[date_to]"]').val('')
});

$('.box .box-header').on('click', '.btn-primary', function(){
	if ($('#filter').is(':visible')) {
		$('#filter').slideUp();
		$('.box .box-header .btn-primary i').remove();
		$(this).prepend($('<i class="fa fa-plus"></i>'));
	} else{
		$('#filter').slideDown();
		$('.box .box-header .btn-primary i').remove();
		$(this).prepend($('<i class="fa fa-angle-down"></i>'));
	}
});

$(document).ready(function(){
	generateTable();

	$('body div').show();
	$('.loading').remove();

	$('#filter').hide();

	$('.content div').hide();
	$('.content').prepend(pleasewait);
});