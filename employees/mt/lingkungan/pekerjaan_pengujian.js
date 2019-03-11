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
	$.get(baseurl + 'ajax_service/load?request=2a8ecc98081b9b86ed2e6d12115b010a&id_user='+ tokenData.id_user +'&token='+ tokenData.token, function(response){
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
				if (data[x].status_pengerjaan == 'Belum Dibagikan') {
					statusPengerjaan = $('<div class="label label-danger">');
				} else if (data[x].status_pengerjaan == 'Selesai') {
					statusPengerjaan = $('<div class="label label-success">');
				} else{
					statusPengerjaan = $('<div class="label label-info">');
				}
				statusPengerjaan.append(data[x].status_pengerjaan);
				tD.append(statusPengerjaan);
				tR.append(tD);
				if (data[x].status_pengerjaan == 'Belum Dibagikan') {
					tR.append('<td><button id="'+ data[x].id_pemesanan +'" type="button" class="btn btn-success btn-sm btn-flat"><i class="fa fa-check"></i></button></td>');
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
		$('#tablePekerjaanPengujian').DataTable({
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

$('#tablePekerjaanPengujian').on('click', '.btn-success', function(){
	$('.content div').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');

	$.post(baseurl + 'ajax_service?request=b2235b568aeaa5054bea8e21702efdb2', 
	{
		'id'	: id,
		'token'	: tokenData
	},
	function(response){
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

	$('.content div').show();
	$('.loading').remove();
});

$(document).ready(function(){
	generateTable();

	$('body div').show();
	$('.loading').remove();

	$('.content div').hide();
	$('.content').prepend(pleasewait);
});