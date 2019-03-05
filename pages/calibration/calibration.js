function generateTable()
{
	// redraw heading table
	$('#tableCalibration thead tr th').remove();
	$('#tableCalibration thead tr').append('<th>No.</th>');
	$('#tableCalibration thead tr').append('<th>Work Order</th>');
	$('#tableCalibration thead tr').append('<th>Status</th>');
	$('#tableCalibration thead tr').append('<th>Detail</th>');

	// draw content table
	$i = 1;
	for(var x in caliData){
		var row = $('<tr>');
		row.append('<td>'+ $i +'</td>');
		row.append('<td>'+ caliData[x].kd_pemesanan +'</td>');
		var tD = $('<td>');
		var statusPemesanan = '';
		if (caliData[x].status_pemesanan == 'Belum Lengkap') {
			statusPemesanan = $('<div class="label label-danger">');
		} else if (caliData[x].status_pemesanan == 'Pekerjaan Selesai') {
			statusPemesanan = $('<div class="label label-success">');
		} else{
			statusPemesanan = $('<div class="label label-info">');
		}
		statusPemesanan.append(caliData[x].status_pemesanan);
		tD.append(statusPemesanan)
		row.append(tD);
		row.append('<td><button id="'+ caliData[x].id_pemesanan +'" type="button" class="btn btn-success btn-flat">Detail</button></td>');
		$('#tableCalibration tbody').append(row);
		$i = $i + 1;
	}
}

$('#tableCalibration').on('click', '.btn-success', function(){
	var id = $(this).attr('id');
	for(var x in caliData){
		if (caliData[x].id_pemesanan == id) {
			$('.box:eq(1) input[name="Calibration[kd_pemesanan]"]').val(caliData[x].kd_pemesanan);
			$('.box:eq(1) input[name="Calibration[status_pemesanan]"]').val(caliData[x].status_pemesanan);
			$('.box:eq(1) input[name="Calibration[status_keuangan]"]').val(caliData[x].status_keuangan);
			$('.box:eq(1) input[name="Calibration[total_bayar]"]').val(setIDR(caliData[x].total_bayar));
			$('.box:eq(1) input[name="Calibration[tgl_masuk]"]').val(caliData[x].tgl_masuk);
			$('.box:eq(1) input[name="Calibration[tgl_perkiraan]"]').val(caliData[x].tgl_perkiraan);
			$('.box:eq(1) input[name="Calibration[tgl_selesai]"]').val(caliData[x].tgl_selesai);
			$('.box:eq(1) input[name="Calibration[atas_nama]"]').val(caliData[x].atas_nama);
			$('.box:eq(1) input[name="Calibration[bahasa]"]').val(caliData[x].bahasa);
			$('.box:eq(1) input[name="Calibration[dengan]"]').val(caliData[x].dengan);
			$('.box:eq(1) input[name="Calibration[pengambilan]"]').val(caliData[x].pengambilan);
			$('.box:eq(1) input[name="Calibration[kondisi]"]').val(caliData[x].kondisi);
			$('.box:eq(1) input[name="Calibration[sifat]"]').val(caliData[x].sifat);
		}
	}

	$('.box:eq(1)').slideDown();
	$('.box:eq(0)').slideUp();
});

$('.box:eq(1) .box-header').on('click', '.btn-default', function(){
	$('.box:eq(0)').slideDown();
	$('.box:eq(1)').slideUp();
});

$(document).ready(function(){
	generateTable();
	$('#tableCalibration').DataTable({
		'ordering'			: false,
		'filter'			: false,
		'info'				: false,
		'bLengthChange' 	: false,
		'iDisplayLength'	: 5
	});

	$('body div').show();
	$('.loading').remove();

	$('.box:eq(1)').fadeOut('fast');
});