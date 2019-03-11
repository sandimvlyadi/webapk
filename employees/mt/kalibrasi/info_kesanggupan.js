function generateTable()
{
	// redraw heading table
	$('#tableInfoKesanggupan thead tr th').remove();
	$('#tableInfoKesanggupan thead tr').append('<th>No.</th>');
	$('#tableInfoKesanggupan thead tr').append('<th>Nama Contoh</th>');
	$('#tableInfoKesanggupan thead tr').append('<th>Kategori</th>');
	$('#tableInfoKesanggupan thead tr').append('<th>Status</th>');
	$('#tableInfoKesanggupan thead tr').append('<th>Nama Uji</th>');
	$('#tableInfoKesanggupan thead tr').append('<th>Metoda</th>');
	$('#tableInfoKesanggupan thead tr').append('<th>Harga Satuan</th>');
	$('#tableInfoKesanggupan thead tr').append('<th>Aksi</th>');

	// redraw body table
	$('#tableInfoKesanggupan tbody tr').remove();
	$.get(baseurl + 'ajax_service/load?request=738d2fc52897ece909a78f72926c1902&id_user='+ tokenData.id_user +'&token='+ tokenData.token, function(response){
		if (response.result) {
			var data = response.data;
			var tBody = $('#tableInfoKesanggupan tbody');
			var tR = $('<tr>');
			var i = 1;
			for(var x in data){
				tR.append('<td>'+ i +'</td>');
				tR.append('<td>'+ data[x].nama_contoh +'</td>');
				tR.append('<td>'+ data[x].kategori +'</td>');
				if (data[x].status == 'OK') {
					tR.append('<td><div class="label label-success">'+ data[x].status +'</div></td>');
					tR.append('<td>'+ data[x].nama_uji +'</td>');
					tR.append('<td>'+ data[x].metoda +'</td>');
					tR.append('<td>'+ setIDR(data[x].tarif) +'</td>');
					tR.append('<td><button id="'+ data[x].id_parameter +'" type="button" class="btn btn-danger btn-sm btn-flat"><i class="fa fa-times"></i></button></td>');
				} else{
					tR.append('<td><div class="label label-danger">'+ data[x].status +'</div></td>');
					tR.append('<td>'+ data[x].nama_uji +'</td>');
					tR.append('<td>'+ data[x].metoda +'</td>');
					tR.append('<td>'+ setIDR(data[x].tarif) +'</td>');
					tR.append('<td><button id="'+ data[x].id_parameter +'" type="button" class="btn btn-success btn-sm btn-flat"><i class="fa fa-check"></i></button></td>');
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
		$('#tableInfoKesanggupan').DataTable({
			'ordering'			: false,
			'bLengthChange' 	: false,
			'pagingType'		: 'full',
			'scrollX'			: true,
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

$('#tableInfoKesanggupan').on('click', '.btn-success', function(){
	$('.content div').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');

	$.post(baseurl + 'ajax_service?request=4107a0f5cf94d9f8af90d36bc5ad2351', 
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

$('#tableInfoKesanggupan').on('click', '.btn-danger', function(){
	$('.content div').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');

	$.post(baseurl + 'ajax_service?request=7e0566bc20b113e759bb22c29dccb116', 
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