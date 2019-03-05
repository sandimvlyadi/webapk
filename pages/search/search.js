var sTestData = JSON.parse(window.localStorage.getItem('sTest'));
var sCaliData = JSON.parse(window.localStorage.getItem('sCali'));
var sCertData = JSON.parse(window.localStorage.getItem('sCert'));
var sKeyword = JSON.parse(window.localStorage.getItem('sKeyword'));
var sFound = JSON.parse(window.localStorage.getItem('sFound'));

function generateTableTesting()
{
	// redraw heading table
	$('#tableTesting thead tr th').remove();
	$('#tableTesting thead tr').append('<th>No.</th>');
	$('#tableTesting thead tr').append('<th>Work Order</th>');
	$('#tableTesting thead tr').append('<th>Status</th>');
	$('#tableTesting thead tr').append('<th>Detail</th>');

	// draw content table
	$i = 1;
	for(var x in sTestData){
		var row = $('<tr>');
		row.append('<td>'+ $i +'</td>');
		row.append('<td>'+ testData[x].kd_pemesanan +'</td>');
		var tD = $('<td>');
		var statusPemesanan = '';
		if (testData[x].status_pemesanan == 'Belum Lengkap') {
			statusPemesanan = $('<div class="label label-danger">');
		} else if (testData[x].status_pemesanan == 'Pekerjaan Selesai') {
			statusPemesanan = $('<div class="label label-success">');
		} else{
			statusPemesanan = $('<div class="label label-info">');
		}
		statusPemesanan.append(testData[x].status_pemesanan);
		tD.append(statusPemesanan)
		row.append(tD);
		row.append('<td><button id="'+ testData[x].id_pemesanan +'" type="button" class="btn btn-success btn-flat">Detail</button></td>');
		$('#tableTesting tbody').append(row);
		$i = $i + 1;
	}
}

function generateTableCalibration()
{
	// redraw heading table
	$('#tableCalibration thead tr th').remove();
	$('#tableCalibration thead tr').append('<th>No.</th>');
	$('#tableCalibration thead tr').append('<th>Work Order</th>');
	$('#tableCalibration thead tr').append('<th>Status</th>');
	$('#tableCalibration thead tr').append('<th>Detail</th>');

	// draw content table
	$i = 1;
	for(var x in sCaliData){
		var row = $('<tr>');
		row.append('<td>'+ $i +'</td>');
		row.append('<td>'+ caliData[x].kd_pemesanan +'</td>');
		var tD = $('<td>');
		var statusPemesanan = '';
		if (sCaliData[x].status_pemesanan == 'Belum Lengkap') {
			statusPemesanan = $('<div class="label label-danger">');
		} else if (sCaliData[x].status_pemesanan == 'Pekerjaan Selesai') {
			statusPemesanan = $('<div class="label label-success">');
		} else{
			statusPemesanan = $('<div class="label label-info">');
		}
		statusPemesanan.append(sCaliData[x].status_pemesanan);
		tD.append(statusPemesanan)
		row.append(tD);
		row.append('<td><button id="'+ caliData[x].id_pemesanan +'" type="button" class="btn btn-success btn-flat">Detail</button></td>');
		$('#tableCalibration tbody').append(row);
		$i = $i + 1;
	}
}

function generateTableCertification()
{
	// redraw heading table
	$('#tableCertification thead tr th').remove();
	$('#tableCertification thead tr').append('<th>No.</th>');
	$('#tableCertification thead tr').append('<th>Work Order</th>');
	$('#tableCertification thead tr').append('<th>Status</th>');
	$('#tableCertification thead tr').append('<th>Detail</th>');

	// draw content table
	$i = 1;
	for(var x in sCertData){
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

$('#tableTesting').on('click', '.btn-success', function(){
	var id = $(this).attr('id');
	for(var x in testData){
		if (testData[x].id_pemesanan == id) {
			$('.box:eq(2) input[name="Testing[kd_pemesanan]"]').val(testData[x].kd_pemesanan);
			$('.box:eq(2) input[name="Testing[status_pemesanan]"]').val(testData[x].status_pemesanan);
			$('.box:eq(2) input[name="Testing[status_keuangan]"]').val(testData[x].status_keuangan);
			$('.box:eq(2) input[name="Testing[total_bayar]"]').val(setIDR(testData[x].total_bayar));
			$('.box:eq(2) input[name="Testing[tgl_masuk]"]').val(testData[x].tgl_masuk);
			$('.box:eq(2) input[name="Testing[tgl_perkiraan]"]').val(testData[x].tgl_perkiraan);
			$('.box:eq(2) input[name="Testing[tgl_selesai]"]').val(testData[x].tgl_selesai);
			$('.box:eq(2) input[name="Testing[atas_nama]"]').val(testData[x].atas_nama);
			$('.box:eq(2) input[name="Testing[bahasa]"]').val(testData[x].bahasa);
			$('.box:eq(2) input[name="Testing[dengan]"]').val(testData[x].dengan);
			$('.box:eq(2) input[name="Testing[pengambilan]"]').val(testData[x].pengambilan);
			$('.box:eq(2) input[name="Testing[kondisi]"]').val(testData[x].kondisi);
			$('.box:eq(2) input[name="Testing[sifat]"]').val(testData[x].sifat);
		}
	}

	$('.box:eq(2)').slideDown();
	$('.box:eq(1)').slideUp();
});

$('.box:eq(2) .box-header').on('click', '.btn-default', function(){
	$('.box:eq(1)').slideDown();
	$('.box:eq(2)').slideUp();
});

$('#tableCalibration').on('click', '.btn-success', function(){
	var id = $(this).attr('id');
	for(var x in caliData){
		if (caliData[x].id_pemesanan == id) {
			$('.box:eq(4) input[name="Calibration[kd_pemesanan]"]').val(caliData[x].kd_pemesanan);
			$('.box:eq(4) input[name="Calibration[status_pemesanan]"]').val(caliData[x].status_pemesanan);
			$('.box:eq(4) input[name="Calibration[status_keuangan]"]').val(caliData[x].status_keuangan);
			$('.box:eq(4) input[name="Calibration[total_bayar]"]').val(setIDR(caliData[x].total_bayar));
			$('.box:eq(4) input[name="Calibration[tgl_masuk]"]').val(caliData[x].tgl_masuk);
			$('.box:eq(4) input[name="Calibration[tgl_perkiraan]"]').val(caliData[x].tgl_perkiraan);
			$('.box:eq(4) input[name="Calibration[tgl_selesai]"]').val(caliData[x].tgl_selesai);
			$('.box:eq(4) input[name="Calibration[atas_nama]"]').val(caliData[x].atas_nama);
			$('.box:eq(4) input[name="Calibration[bahasa]"]').val(caliData[x].bahasa);
			$('.box:eq(4) input[name="Calibration[dengan]"]').val(caliData[x].dengan);
			$('.box:eq(4) input[name="Calibration[pengambilan]"]').val(caliData[x].pengambilan);
			$('.box:eq(4) input[name="Calibration[kondisi]"]').val(caliData[x].kondisi);
			$('.box:eq(4) input[name="Calibration[sifat]"]').val(caliData[x].sifat);
		}
	}

	$('.box:eq(4)').slideDown();
	$('.box:eq(3)').slideUp();
});

$('.box:eq(4) .box-header').on('click', '.btn-default', function(){
	$('.box:eq(3)').slideDown();
	$('.box:eq(4)').slideUp();
});

$('#tableCertification').on('click', '.btn-success', function(){
	var id = $(this).attr('id');
	for(var x in certData){
		if (certData[x].id_wo_sertifikasi == id) {
			$('.box:eq(6) input[name="Certification[kd_sertifikasi]"]').val(certData[x].kd_sertifikasi);
			$('.box:eq(6) input[name="Certification[status_pemesanan]"]').val(certData[x].status_pemesanan);
			$('.box:eq(6) input[name="Certification[total_bayar]"]').val(setIDR(certData[x].total_bayar));
			$('.box:eq(6) input[name="Certification[tgl_m]"]').val(certData[x].tgl_m);
			$('.box:eq(6) input[name="Certification[nama_pemohon]"]').val(certData[x].nama_pemohon);
			$('.box:eq(6) input[name="Certification[kewarganegaraan]"]').val(certData[x].kewarganegaraan);
			$('.box:eq(6) input[name="Certification[telp_pemohon]"]').val(certData[x].telp_pemohon);
			$('.box:eq(6) input[name="Certification[jabatan]"]').val(certData[x].jabatan);
			$('.box:eq(6) input[name="Certification[alamat_pemohon]"]').val(certData[x].alamat_pemohon);
		}
	}

	$('.box:eq(6)').slideDown();
	$('.box:eq(5)').slideUp();
});

$('.box:eq(6) .box-header').on('click', '.btn-default', function(){
	$('.box:eq(5)').slideDown();
	$('.box:eq(6)').slideUp();
});

$(document).ready(function(){
	if (sTestData != null) {
		generateTableTesting();
		$('#tableTesting').DataTable({
			'ordering'			: false,
			'filter'			: false,
			'info'				: false,
			'bLengthChange' 	: false,
			'iDisplayLength'	: 5
		});
	} else{
		$('.content .box:eq(1)').addClass('hidden');
	}

	if (sCaliData != null) {
		generateTableCalibration();
		$('#tableCalibration').DataTable({
			'ordering'			: false,
			'filter'			: false,
			'info'				: false,
			'bLengthChange' 	: false,
			'iDisplayLength'	: 5
		});
	} else{
		$('.content .box:eq(3)').addClass('hidden');
	}

	if (sCertData != null) {
		generateTableCertification();
		$('#tableCertification').DataTable({
			'ordering'			: false,
			'filter'			: false,
			'info'				: false,
			'bLengthChange' 	: false,
			'iDisplayLength'	: 5
		});
	} else{
		$('.content .box:eq(5)').addClass('hidden');
	}

	$('.content .box:eq(0) .box-body p').remove();
	$('.content .box:eq(0) .box-body').append('<p>You search: <strong>'+ sKeyword +'</strong></p>')
	$('.content .box:eq(0) .box-body').append('<p>Result: match found <strong>'+ sFound +'</strong> item(s)</p>')

	$('body div').show();
	$('.loading').remove();

	$('.box:eq(2)').fadeOut('fast');
	$('.box:eq(4)').fadeOut('fast');
	$('.box:eq(6)').fadeOut('fast');
});