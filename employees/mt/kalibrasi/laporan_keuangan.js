function generateTable()
{
	// redraw heading table
	$('#tableLaporanKeuangan thead tr th').remove();
	$('#tableLaporanKeuangan thead tr').append('<th>No.</th>');
	$('#tableLaporanKeuangan thead tr').append('<th>Work Order</th>');
	$('#tableLaporanKeuangan thead tr').append('<th>Tanggal</th>');
	$('#tableLaporanKeuangan thead tr').append('<th>Jumlah</th>');

	// redraw body table
	$('#tableLaporanKeuangan tbody tr').remove();
	$.get(baseurl + 'ajax_service/load?request=40dafea2a822bedfa115e5dc5e1fb9c7&id_user='+ tokenData.id_user +'&token='+ tokenData.token, function(response){
		if (response.result) {
			var data = response.data;
			var tBody = $('#tableLaporanKeuangan tbody');
			var tR = $('<tr>');
			var i = 1;
			for(var x in data){
				tR.append('<td>'+ i +'</td>');
				tR.append('<td>'+ data[x].kd_pemesanan +'</td>');
				tR.append('<td>'+ data[x].tgl_bayar +'</td>');
				tR.append('<td>'+ setIDR(data[x].total_pembayaran) +'</td>');
				tBody.append(tR);
				tR = $('<tr>');
				i = i + 1;
			}
		} else{
			fmWarning(response.msg);
		}
	}, 'json')
	.done(function(){
		$('#tableLaporanKeuangan').DataTable({
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

	$.post(baseurl + 'ajax_service?request=ab8f4c60f8f88284ed5d6c0ee1612634', 
	{
		'from'	: $('input[name="Filter[date_from]"]').val(),
		'to'	: $('input[name="Filter[date_to]"]').val(),
		'token'	: tokenData
	},
	function(response){
		if (response.result) {
			$('#tableLaporanKeuangan').DataTable().destroy();
			$('#tableLaporanKeuangan tbody tr').remove();
			var data = response.data;
			var tBody = $('#tableLaporanKeuangan tbody');
			var tR = $('<tr>');
			var i = 1;
			for(var x in data){
				tR.append('<td>'+ i +'</td>');
				tR.append('<td>'+ data[x].kd_pemesanan +'</td>');
				tR.append('<td>'+ data[x].tgl_bayar +'</td>');
				tR.append('<td>'+ setIDR(data[x].total_pembayaran) +'</td>');
				tBody.append(tR);
				tR = $('<tr>');
				i = i + 1;
			}
		} else{
			fmDanger(response.msg);
		}
	}, 'json')
	.done(function(){
		$('#tableLaporanKeuangan').DataTable({
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