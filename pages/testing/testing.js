function generateTable()
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
	for(var x in testData){
		var row = $('<tr>');
		row.append('<td>'+ $i +'</td>');
		row.append('<td>'+ testData[x].kd_invoice +'</td>');
		row.append('<td>'+ testData[x].kd_pemesanan +'</td>');
		row.append('<td>'+ testData[x].status_keuangan +'</td>');
		row.append('<td>'+ testData[x].status_pemesanan +'</td>');
		row.append('<td>IDR. '+ setIDR(testData[x].total_bayar) +'</td>');
		$('#tableTesting tbody').append(row);
		$i = $i + 1;
	}
}

$(document).ready(function(){
	generateTable();
	$('#tableTesting').DataTable();

	$('body div').show();
	$('.loading').remove();
});