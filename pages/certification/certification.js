function generateTable()
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
	for(var x in certData){
		var row = $('<tr>');
		row.append('<td>'+ $i +'</td>');
		row.append('<td>'+ certData[x].kd_invoice +'</td>');
		row.append('<td>'+ certData[x].kd_sertifikasi +'</td>');
		row.append('<td>'+ certData[x].status_pemesanan +'</td>');
		row.append('<td>IDR. '+ setIDR(certData[x].total_bayar) +'</td>');
		$('#tableCertification tbody').append(row);
		$i = $i + 1;
	}
}

$(document).ready(function(){
	generateTable();
	$('#tableCertification').DataTable();

	$('body div').show();
	$('.loading').remove();
});