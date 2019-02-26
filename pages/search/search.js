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
	$('#tableTesting thead tr').append('<th>Invoice Number</th>');
	$('#tableTesting thead tr').append('<th>Order Number</th>');
	$('#tableTesting thead tr').append('<th>Finance</th>');
	$('#tableTesting thead tr').append('<th>Status</th>');
	$('#tableTesting thead tr').append('<th>Value</th>');

	// draw content table
	$i = 1;
	for(var x in sTestData){
		var row = $('<tr>');
		row.append('<td>'+ $i +'</td>');
		row.append('<td>'+ sTestData[x].kd_invoice +'</td>');
		row.append('<td>'+ sTestData[x].kd_pemesanan +'</td>');
		row.append('<td>'+ sTestData[x].status_keuangan +'</td>');
		row.append('<td>'+ sTestData[x].status_pemesanan +'</td>');
		row.append('<td>IDR. '+ setIDR(sTestData[x].total_bayar) +'</td>');
		$('#tableTesting tbody').append(row);
		$i = $i + 1;
	}
}

function generateTableCalibration()
{
	// redraw heading table
	$('#tableCalibration thead tr th').remove();
	$('#tableCalibration thead tr').append('<th>No.</th>');
	$('#tableCalibration thead tr').append('<th>Invoice Number</th>');
	$('#tableCalibration thead tr').append('<th>Order Number</th>');
	$('#tableCalibration thead tr').append('<th>Finance</th>');
	$('#tableCalibration thead tr').append('<th>Status</th>');
	$('#tableCalibration thead tr').append('<th>Value</th>');

	// draw content table
	$i = 1;
	for(var x in sCaliData){
		var row = $('<tr>');
		row.append('<td>'+ $i +'</td>');
		row.append('<td>'+ sCaliData[x].kd_invoice +'</td>');
		row.append('<td>'+ sCaliData[x].kd_pemesanan +'</td>');
		row.append('<td>'+ sCaliData[x].status_keuangan +'</td>');
		row.append('<td>'+ sCaliData[x].status_pemesanan +'</td>');
		row.append('<td>IDR. '+ setIDR(sCaliData[x].total_bayar) +'</td>');
		$('#tableCalibration tbody').append(row);
		$i = $i + 1;
	}
}

function generateTableCertification()
{
	// redraw heading table
	$('#tableCertification thead tr th').remove();
	$('#tableCertification thead tr').append('<th>No.</th>');
	$('#tableCertification thead tr').append('<th>Invoice Number</th>');
	$('#tableCertification thead tr').append('<th>Order Number</th>');
	$('#tableCertification thead tr').append('<th>Status</th>');
	$('#tableCertification thead tr').append('<th>Value</th>');

	// draw content table
	$i = 1;
	for(var x in sCertData){
		var row = $('<tr>');
		row.append('<td>'+ $i +'</td>');
		row.append('<td>'+ sCertData[x].kd_invoice +'</td>');
		row.append('<td>'+ sCertData[x].kd_sertifikasi +'</td>');
		row.append('<td>'+ sCertData[x].status_pemesanan +'</td>');
		row.append('<td>IDR. '+ setIDR(sCertData[x].total_bayar) +'</td>');
		$('#tableCertification tbody').append(row);
		$i = $i + 1;
	}
}

$(document).ready(function(){
	if (sTestData != null) {
		generateTableTesting();
		$('#tableTesting').DataTable();
	} else{
		$('.content .box:eq(1)').addClass('hidden');
	}

	if (sCaliData != null) {
		generateTableCalibration();
		$('#tableCalibration').DataTable();
	} else{
		$('.content .box:eq(2)').addClass('hidden');
	}

	if (sCertData != null) {
		generateTableCertification();
		$('#tableCertification').DataTable();
	} else{
		$('.content .box:eq(3)').addClass('hidden');
	}

	$('.content .box:eq(0) .box-body p').remove();
	$('.content .box:eq(0) .box-body').append('<p>You search: <strong>'+ sKeyword +'</strong></p>')
	$('.content .box:eq(0) .box-body').append('<p>Result: match found <strong>'+ sFound +'</strong> item(s)</p>')

	$('body div').show();
	$('.loading').remove();
});