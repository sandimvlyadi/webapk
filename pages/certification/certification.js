function generateTable()
{
	// redraw heading table
	$('#tableCertification thead tr th').remove();
	$('#tableCertification thead tr').append('<th>No.</th>');
	$('#tableCertification thead tr').append('<th>Work Order</th>');
	$('#tableCertification thead tr').append('<th>Status</th>');
	$('#tableCertification thead tr').append('<th>Detail</th>');

	// draw content table
	$i = 1;
	for(var x in certData){
		var row = $('<tr>');
		row.append('<td>'+ $i +'</td>');
		row.append('<td>'+ certData[x].kd_sertifikasi +'</td>');
		var tD = $('<td>');
		var statusPemesanan = '';
		if (certData[x].status_pemesanan == 'Kaji Ulang') {
			statusPemesanan = $('<div class="label label-info">');
		} else if (certData[x].status_pemesanan == 'Pembayaran' && statusPemesanan[x].biaya == null) {
			statusPemesanan = $('<div class="label label-info">');
		} else{
			statusPemesanan = $('<div class="label label-success">');
		}
		statusPemesanan.append(certData[x].status_pemesanan);
		tD.append(statusPemesanan)
		row.append(tD);
		row.append('<td><button id="'+ certData[x].id_wo_sertifikasi +'" type="button" class="btn btn-success btn-flat">Detail</button></td>');
		$('#tableCertification tbody').append(row);
		$i = $i + 1;
	}
}

$('#tableCertification').on('click', '.btn-success', function(){
	var id = $(this).attr('id');
	for(var x in certData){
		if (certData[x].id_wo_sertifikasi == id) {
			$('.box:eq(1) input[name="Certification[kd_sertifikasi]"]').val(certData[x].kd_sertifikasi);
			$('.box:eq(1) input[name="Certification[status_pemesanan]"]').val(certData[x].status_pemesanan);
			$('.box:eq(1) input[name="Certification[total_bayar]"]').val(setIDR(certData[x].total_bayar));
			$('.box:eq(1) input[name="Certification[tgl_m]"]').val(certData[x].tgl_m);
			$('.box:eq(1) input[name="Certification[nama_pemohon]"]').val(certData[x].nama_pemohon);
			$('.box:eq(1) input[name="Certification[kewarganegaraan]"]').val(certData[x].kewarganegaraan);
			$('.box:eq(1) input[name="Certification[telp_pemohon]"]').val(certData[x].telp_pemohon);
			$('.box:eq(1) input[name="Certification[jabatan]"]').val(certData[x].jabatan);
			$('.box:eq(1) input[name="Certification[alamat_pemohon]"]').val(certData[x].alamat_pemohon);
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
	$('#tableCertification').DataTable({
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