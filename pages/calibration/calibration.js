function generateTable()
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
	for(var x in caliData){
		var row = $('<tr>');
		row.append('<td>'+ $i +'</td>');
		row.append('<td>'+ caliData[x].kd_invoice +'</td>');
		row.append('<td>'+ caliData[x].kd_pemesanan +'</td>');
		row.append('<td>'+ caliData[x].status_keuangan +'</td>');
		row.append('<td>'+ caliData[x].status_pemesanan +'</td>');
		row.append('<td>IDR. '+ setIDR(caliData[x].total_bayar) +'</td>');
		$('#tableCalibration tbody').append(row);
		$i = $i + 1;
	}
}

$(document).ready(function(){
	generateTable();
	$('#tableCalibration').DataTable();

	$('body div').show();
	$('.loading').remove();
});