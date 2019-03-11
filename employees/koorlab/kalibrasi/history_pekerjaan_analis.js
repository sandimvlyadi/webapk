function generateTable()
{
	// redraw heading table
	$('#tableRiwayat thead tr th').remove();
	$('#tableRiwayat thead tr').append('<th>No.</th>');
	$('#tableRiwayat thead tr').append('<th>Work Order</th>');
	$('#tableRiwayat thead tr').append('<th>Analis</th>');
	$('#tableRiwayat thead tr').append('<th>Status</th>');

	// redraw body table
	$('#tableRiwayat tbody tr').remove();
	$.get(baseurl + 'ajax_service/load?request=2bb6dc53af6e4dd0d6c8ea95966dffec&id_user='+ tokenData.id_user +'&token='+ tokenData.token, function(response){
		if (response.result) {
			var data = response.data;
			var tBody = $('#tableRiwayat tbody');
			var tR = $('<tr>');
			var i = 1;
			for(var x in data){
				tR.append('<td>'+ i +'</td>');
				tR.append('<td>'+ data[x].kd_pemesanan +'</td>');
				tR.append('<td>'+ data[x].pengguna +'</td>');
				if (data[x].status_uji == 'Selesai') {
					tR.append('<td><div class="label label-success">'+ data[x].status_uji +'</div></td>');
				} else{
					tR.append('<td><div class="label label-danger">'+ data[x].status_uji +'</div></td>');
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
		$('#tableRiwayat').DataTable({
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

$(document).ready(function(){
	generateTable();

	$('body div').show();
	$('.loading').remove();

	$('.content div').hide();
	$('.content').prepend(pleasewait);
});