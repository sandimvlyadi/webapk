function generateTable()
{
	// redraw heading table
	$('#tableTesting thead tr th').remove();
	$('#tableTesting thead tr').append('<th>No.</th>');
	$('#tableTesting thead tr').append('<th>Work Order</th>');
	$('#tableTesting thead tr').append('<th>Check Detail</th>');

	// draw content table
	$i = 1;
	for(var x in testData){
		var row = $('<tr>');
		row.append('<td>'+ $i +'</td>');
		row.append('<td>'+ testData[x].kd_pemesanan +'</td>');
		row.append('<td><button id="'+ testData[x].id_pemesanan +'" type="button" class="btn btn-success btn-flat">Check Detail</button></td>');
		$('#tableTesting tbody').append(row);
		$i = $i + 1;
	}
}

$('#tableTesting').on('click', '.btn-success', function(){
	var id = $(this).attr('id');
	for(var x in testData){
		if (testData[x].id_pemesanan == id) {
			$('.box:eq(1) input[name="Testing[kd_pemesanan]"]').val(testData[x].kd_pemesanan);
			$('.box:eq(1) input[name="Testing[status_pemesanan]"]').val(testData[x].status_pemesanan);
			$('.box:eq(1) input[name="Testing[status_keuangan]"]').val(testData[x].status_keuangan);
			$('.box:eq(1) input[name="Testing[total_bayar]"]').val(setIDR(testData[x].total_bayar));
			$('.box:eq(1) input[name="Testing[tgl_masuk]"]').val(testData[x].tgl_masuk);
			$('.box:eq(1) input[name="Testing[tgl_perkiraan]"]').val(testData[x].tgl_perkiraan);
			$('.box:eq(1) input[name="Testing[tgl_selesai]"]').val(testData[x].tgl_selesai);
			$('.box:eq(1) input[name="Testing[atas_nama]"]').val(testData[x].atas_nama);
			$('.box:eq(1) input[name="Testing[bahasa]"]').val(testData[x].bahasa);
			$('.box:eq(1) input[name="Testing[dengan]"]').val(testData[x].dengan);
			$('.box:eq(1) input[name="Testing[pengambilan]"]').val(testData[x].pengambilan);
			$('.box:eq(1) input[name="Testing[kondisi]"]').val(testData[x].kondisi);
			$('.box:eq(1) input[name="Testing[sifat]"]').val(testData[x].sifat);
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
	$('#tableTesting').DataTable({
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