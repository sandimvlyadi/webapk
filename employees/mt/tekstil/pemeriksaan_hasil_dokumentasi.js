function generateTable()
{
	// redraw heading table
	$('#tablePemeriksaanHasilDokumentasi thead tr th').remove();
	$('#tablePemeriksaanHasilDokumentasi thead tr').append('<th>No.</th>');
	$('#tablePemeriksaanHasilDokumentasi thead tr').append('<th>Work Order</th>');
	$('#tablePemeriksaanHasilDokumentasi thead tr').append('<th>Status</th>');
	$('#tablePemeriksaanHasilDokumentasi thead tr').append('<th>Aksi</th>');

	// redraw body table
	$('#tablePemeriksaanHasilDokumentasi tbody tr').remove();
	$.get(baseurl + 'ajax_service/load?request=687d02e508c280ad344b31c48ebc5b42&id_user='+ tokenData.id_user +'&token='+ tokenData.token, function(response){
		if (response.result) {
			var data = response.data;
			var tBody = $('#tablePemeriksaanHasilDokumentasi tbody');
			var tR = $('<tr>');
			var i = 1;
			for(var x in data){
				tR.append('<td>'+ i +'</td>');
				tR.append('<td>'+ data[x].kd_pemesanan +'</td>');
				var tD = $('<td>');
				var statusPengerjaan = '';
				if (data[x].status_pengerjaan == 'MT') {
					statusPengerjaan = $('<div class="label label-danger">');
				} else{
					statusPengerjaan = $('<div class="label label-success">');
				}
				statusPengerjaan.append(data[x].status_pengerjaan);
				tD.append(statusPengerjaan);
				tR.append(tD);
				if (data[x].status_pengerjaan == 'MT') {
					tR.append('<td><button id="'+ data[x].id_pemesanan +'" type="button" class="btn btn-success btn-sm btn-flat"><i class="fa fa-file-text-o"></i></button></td>');
				} else{
					tR.append('<td><button id="'+ data[x].id_pemesanan +'" type="button" class="btn btn-danger btn-sm btn-flat"><i class="fa fa-undo"></i></button></td>');
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
		$('#tablePemeriksaanHasilDokumentasi, #tableHasilDokumentasi, #tableLampiranGabungan, #tableLampiranUji').DataTable({
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
		$('.content .box:eq(0)').show();
		$('.loading').remove();
	});
}

function generateTableHasilDokumentasi(barangUji)
{
	$('#tableHasilDokumentasi').DataTable().destroy();

	// redraw heading table
	$('#tableHasilDokumentasi thead tr th').remove();
	$('#tableHasilDokumentasi thead tr').append('<th>No.</th>');
	$('#tableHasilDokumentasi thead tr').append('<th>Contoh</th>');
	$('#tableHasilDokumentasi thead tr').append('<th>Kategori</th>');
	$('#tableHasilDokumentasi thead tr').append('<th>Nama Uji</th>');
	$('#tableHasilDokumentasi thead tr').append('<th>Metoda</th>');
	$('#tableHasilDokumentasi thead tr').append('<th>Status</th>');

	// redraw body table
	var tBody = $('#tableHasilDokumentasi tbody');
	var tR = $('<tr>');
	var i = 1;
	$('#tableHasilDokumentasi tbody tr').remove();
	for(var x in barangUji){
		tR.append('<td>'+ i +'</td>');
		tR.append('<td>'+ barangUji[x].nama_contoh +'</td>');
		tR.append('<td>'+ barangUji[x].kategori +'</td>');
		tR.append('<td>'+ barangUji[x].nama_uji +'</td>');
		tR.append('<td>'+ barangUji[x].metoda +'</td>');
		var tD = $('<td>');
		var keterangan = '';
		if (barangUji[x].ket_dokumentasi == 'Belum Diisi') {
			keterangan = $('<div class="label label-danger">');
		} else{
			keterangan = $('<div class="label label-info">');
		}
		keterangan.append(barangUji[x].ket_dokumentasi);
		tD.append(keterangan);
		tR.append(tD);
		tBody.append(tR);
		tR = $('<tr>');
		i = i + 1;
	}

	$('#tableHasilDokumentasi').DataTable({
		'ordering'			: false,
		'bLengthChange' 	: false,
		'pagingType'		: 'full',
		'iDisplayLength'	: 5
	});
	$('.dataTables_filter').addClass('pull-left');
}

function generateTableLampiranGabungan(lampiran)
{
	$('#tableLampiranGabungan').DataTable().destroy();

	// redraw heading table
	$('#tableLampiranGabungan thead tr th').remove();
	$('#tableLampiranGabungan thead tr').append('<th>No.</th>');
	$('#tableLampiranGabungan thead tr').append('<th>Customer</th>');
	$('#tableLampiranGabungan thead tr').append('<th>Lampiran</th>');

	// redraw body table
	var tBody = $('#tableLampiranGabungan tbody');
	var tR = $('<tr>');
	var i = 1;
	$('#tableLampiranGabungan tbody tr').remove();
	for(var x in lampiran){
		tR.append('<td>'+ i +'</td>');
		tR.append('<td>'+ lampiran[x].nama_pelanggan +'</td>');
		tR.append('<td>'+ lampiran[x].lampiran_gab +'</td>');
		tBody.append(tR);
		tR = $('<tr>');
		i = i + 1;
	}

	$('#tableLampiranGabungan').DataTable({
		'ordering'			: false,
		'bLengthChange' 	: false,
		'pagingType'		: 'full',
		'iDisplayLength'	: 5
	});
	$('.dataTables_filter').addClass('pull-left');
}

function generateTableLampiranUji(lampiranUji)
{
	$('#tableLampiranUji').DataTable().destroy();

	// redraw heading table
	$('#tableLampiranUji thead tr th').remove();
	$('#tableLampiranUji thead tr').append('<th>No.</th>');
	$('#tableLampiranUji thead tr').append('<th>Kategori</th>');
	$('#tableLampiranUji thead tr').append('<th>Nama Uji</th>');
	$('#tableLampiranUji thead tr').append('<th>Analis / Teknisi</th>');
	$('#tableLampiranUji thead tr').append('<th>Status</th>');
	$('#tableLampiranUji thead tr').append('<th>Lampiran</th>');

	// redraw body table
	var tBody = $('#tableLampiranUji tbody');
	var tR = $('<tr>');
	var i = 1;
	$('#tableLampiranUji tbody tr').remove();
	for(var x in lampiranUji){
		tR.append('<td>'+ i +'</td>');
		tR.append('<td>'+ lampiranUji[x].kategori +'</td>');
		tR.append('<td>'+ lampiranUji[x].nama_uji +'</td>');
		tR.append('<td>'+ lampiranUji[x].pengguna +'</td>');
		tR.append('<td>'+ lampiranUji[x].status_uji +'</td>');
		if (lampiranUji[x].lampiran_uji != null) {
			tR.append('<td>'+ lampiranUji[x].lampiran_uji +'</td>');
		} else{
			tR.append('<td></td>');
		}
		tBody.append(tR);
		tR = $('<tr>');
		i = i + 1;
	}

	$('#tableLampiranUji').DataTable({
		'ordering'			: false,
		'bLengthChange' 	: false,
		'pagingType'		: 'full',
		'iDisplayLength'	: 5
	});
	$('.dataTables_filter').addClass('pull-left');
}

$('.box:eq(1) .box-header').on('click', '.btn-default', function(){
	$('.box:eq(0)').slideDown();
	$('.box:eq(1)').slideUp();
});

$('.box:eq(1) .box-footer').on('click', '.btn-success', function(){
	$('.content box').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');

	$.post(baseurl + 'ajax_service?request=8ca7594f9dc5cf1c7c8a6e6d7c6349a1', 
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

	$('.content .box:eq(0)').show();
	$('.loading').remove();
});

$('.box:eq(1) .box-footer').on('click', '.btn-danger', function(){
	$('.content box').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');

	$.post(baseurl + 'ajax_service?request=cb3c7d462b8fe82ea3a2d37ac9fdce5c', 
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

	$('.content .box:eq(0)').show();
	$('.loading').remove();
});

$('#tablePemeriksaanHasilDokumentasi').on('click', '.btn-success', function(){
	$('.content box').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');
	$('.box:eq(1) .box-footer .btn-success').attr('id', id);
	$('.box:eq(1) .box-footer .btn-danger').attr('id', id);

	$.post(baseurl + 'ajax_service?request=71b26b86d00773baaa7d582d301bf246', 
	{
		'id'	: id,
		'token'	: tokenData
	},
	function(response){
		if (response.result) {
			var sertifikat = response.data.sertifikat;
			var validSimpan = response.data.valid_simpan;
			var customer = response.data.customer;
			var barangUji = response.data.barang_uji;
			var lampiran = response.data.lampiran;
			var lampiranUji = response.data.lampiran_uji;

			$('input[name="Dokumentasi[nomor_wo]"]').val(customer[0].kd_pemesanan);
			$('input[name="Dokumentasi[nama_pelanggan]"]').val(customer[0].nama_pelanggan);

			generateTableHasilDokumentasi(barangUji);
			generateTableLampiranGabungan(lampiran);
			generateTableLampiranUji(lampiranUji);
		} else{
			fmDanger(response.msg);
		}
	}, 'json')
	.fail(function(jqXHR, textStatus, errorThrown){
		console.log(jqXHR);
		fmDanger('Tidak terhubung dengan server.');
	});

	$(this).removeAttr('disabled');

	$('.content .box:eq(0)').show();
	$('.loading').remove();

	$('.box:eq(1)').slideDown();
	$('.box:eq(0)').slideUp();
});

$('#tablePemeriksaanHasilDokumentasi').on('click', '.btn-danger', function(){
	$('.content box').hide();
	$('.content').prepend(pleasewait);

	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');

	$.post(baseurl + 'ajax_service?request=761847c4cad83ba27c5225e8d15846b1', 
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

	$('.content .box:eq(0)').show();
	$('.loading').remove();
});

$(document).ready(function(){
	generateTable();

	$('body div').show();
	$('.loading').remove();

	$('.content .box:eq(1)').fadeOut('fast');

	$('.content .box').hide();
	$('.content').prepend(pleasewait);
});