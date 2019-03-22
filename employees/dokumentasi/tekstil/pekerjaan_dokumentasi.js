var table = '';
var tableDataParameterUji = '';
var tableLampiranUji = '';

$(document).ready(function(){
	table = $('#tablePekerjaanDokumentasi').DataTable({
		'processing'	: true, 
        'serverSide'	: true, 
        
        'ajax' : {
        	'url'	: baseurl + 'source',
            'type'	: 'GET',
            'data'	: {
                'id_user'	: tokenData.id_user,
                'token'		: tokenData.token,
                'user'		: 'employee',
                'request'	: '6e8731c411ecb435a0cfcb673ab18a0f'
            },
            'dataSrc' : function(response){
            	var i = response.start;
            	var row = new Array();
            	if (response.result) {
            		for(var x in response.data){
            			var status_pengerjaan = '';
            			if (response.data[x].status_pemesanan == 'Pembuatan Sertifikat' && response.data[x].status_pengerjaan == 'Dokumentasi') {
            				status_pengerjaan = '<div class="label label-danger">'+ response.data[x].status_pengerjaan +'</div>';
            			} else if (response.data[x].status_pemesanan == 'Validasi Sertifikat' && response.data[x].status_pengerjaan == 'MT') {
            				status_pengerjaan = '<div class="label label-info">'+ response.data[x].status_pengerjaan +'</div>';
            			} else{
            				status_pengerjaan = '<div class="label label-danger">Dokumentasi</div>';
            			}

            			var button = '';
                        if (response.data[x].status_pemesanan == 'Pembuatan Sertifikat' && response.data[x].status_pengerjaan == 'Dokumentasi') {
                            button = '<button id="'+ response.data[x].id_pemesanan +'" type="button" class="btn btn-success btn-sm btn-flat"><i class="fa fa-file-text-o"></i></button>';
                        } else if (response.data[x].status_pemesanan == 'Validasi Sertifikat' && response.data[x].status_pengerjaan == 'Koordinator Lab') {
                            button = '<button id="'+ response.data[x].id_pemesanan +'" type="button" class="btn btn-success btn-sm btn-flat"><i class="fa fa-file-text-o"></i></button>';
                        } else{
                            button = '<button id="'+ response.data[x].id_pemesanan +'" type="button" class="btn btn-danger btn-sm btn-flat"><i class="fa fa-undo"></i></button>';
                        }

	            		row.push({
	            			'no'				: i,
	            			'kd_pemesanan'		: response.data[x].kd_pemesanan,
	            			'status_pengerjaan'	: status_pengerjaan,
	            			'id_pemesanan'		: button
	            		});
	            		i = i + 1;
	            	}

	            	response.data = row;
            		return row;
            	} else{
            		response.draw = 0;
            		return [];
            	}
            }
        },

        'columns' : [
        	{ 'data' : 'no' },
        	{ 'data' : 'kd_pemesanan' },
        	{ 'data' : 'status_pengerjaan' },
        	{ 'data' : 'id_pemesanan' }
        ],

        'pageLength'	: 5,
        'pagingType'	: 'full',
        'ordering'		: false,
        'bLengthChange'	: false,

        'language': {
	    	'emptyTable'	: 'Tidak ada data tersedia.',
	    	'info'			: '_START_ sampai _END_ dari _TOTAL_ data ',
	    	'infoFiltered'	: 'total: _MAX_.',
	    	'infoEmpty'		: '',
            'processing'    : '<img class="imageRotateHorizontal" src="../../favicon.ico" />'
	    }
	});
	$('.dataTables_filter').addClass('pull-left');
    $('#tablePekerjaanDokumentasi_processing').css('background', 'none');
    $('#tablePekerjaanDokumentasi_processing').css('border', 'none');

	$('body div').show();
	$('.loading').remove();

    $('.box:eq(1)').fadeOut('fast');
    $('.box:eq(2)').fadeOut('fast');
});

$('#tablePekerjaanDokumentasi').on('click', '.btn-success', function(){
    $(this).attr('disabled', 'disabled');
    var id = $(this).attr('id');

    $.post(baseurl + 'ajax_service?request=96ffe7fdaa4b1717020b4e6c2c4c1dc4', 
    {
        'id'    : id,
        'token' : tokenData
    },
    function(response){
        if (response.result) {
            var data = response.data;
            $('input[name="Dokumentasi[nomor_wo]"]').val(data.customer.kd_pemesanan);
            $('input[name="Dokumentasi[nama_pelanggan]"]').val(data.customer.nama_pelanggan);
            $('input[name="Dokumentasi[upload_lampiran]"]').attr('id', id);
            
            $('.box:eq(1) .box-footer .btn-success').attr('id', id);
            if (data.sertifikat.lampiran_gab == '' || data.sertifikat.lampiran_gab == null) {
                $('input[name="Dokumentasi[id]"]').val(0);
                $('input[name="Dokumentasi[id_sertifikat]"]').val(0);
                $('.box:eq(1) .box-footer .btn-success').hide();
            } else if (data.sertifikat.id_sertifikat == null) {
                $('input[name="Dokumentasi[id]"]').val(data.sertifikat.id_ko);
                $('input[name="Dokumentasi[id_sertifikat]"]').val(data.kode_id);
                $('.box:eq(1) .box-footer .btn-success').show();
            } else{
                $('input[name="Dokumentasi[id]"]').val(data.sertifikat.id_ko);
                $('input[name="Dokumentasi[id_sertifikat]"]').val(0);
                $('.box:eq(1) .box-footer .btn-success').show();
            }

            $('#tableLampiranGabungan tbody tr').remove();
            var tr = $('<tr>');
            tr.append('<td>'+ data.lampiran_gab.nama_pelanggan +'</td>');
            if (data.lampiran_gab.lampiran_gab != null) {
                tr.append('<td>'+ data.lampiran_gab.lampiran_gab +'</td>');
            } else{
                tr.append('<td></td>');
            }
            $('#tableLampiranGabungan tbody').append(tr);
        } else{
            fmDanger(response.msg);
            $(this).removeAttr('disabled');
        }
    }, 'json')
    .fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR);
        fmDanger('Tidak terhubung dengan server.');
        $(this).removeAttr('disabled');
    });

    $('#tableDataParameterUji').DataTable().destroy();
    tableDataParameterUji = $('#tableDataParameterUji').DataTable({
        'processing'    : true, 
        'serverSide'    : true, 
        
        'ajax' : {
            'url'   : baseurl + 'source',
            'type'  : 'GET',
            'data'  : {
                'id'        : id,
                'id_user'   : tokenData.id_user,
                'token'     : tokenData.token,
                'user'      : 'employee',
                'request'   : '256606b0abd2ef77a7f5968d715bbcdf'
            },
            'dataSrc' : function(response){
                var i = response.start;
                var row = new Array();
                if (response.result) {
                    for(var x in response.data){
                        var keterangan = '';
                        var button = '';

                        if (response.data[x].ket_dokumentasi == 'Belum Diisi') {
                            keterangan = '<div class="label label-danger">'+ response.data[x].ket_dokumentasi +'</div>';
                            button = '<button id="'+ response.data[x].id_pengujian +'" type="button" class="btn btn-success btn-sm btn-flat"><i class="fa fa-pencil-square-o"></i></button>';
                        } else if (response.data[x].ket_dokumentasi == null) {
                            // nothing to do.
                        } else{
                            keterangan = '<div class="label label-info">'+ response.data[x].ket_dokumentasi +'</div>';
                            button = '<button id="'+ response.data[x].id_pengujian +'" type="button" class="btn btn-success btn-sm btn-flat"><i class="fa fa-pencil"></i></button>';
                        }

                        row.push({
                            'no'                : i,
                            'nama_contoh'       : response.data[x].nama_contoh,
                            'kategori'          : response.data[x].kategori,
                            'nama_uji'          : response.data[x].nama_uji,
                            'metoda'            : response.data[x].metoda,
                            'ket_dokumentasi'   : keterangan,
                            'id_pengujian'      : button
                        });
                        i = i + 1;
                    }

                    response.data = row;
                    return row;
                } else{
                    response.draw = 0;
                    return [];
                }
            }
        },

        'columns' : [
            { 'data' : 'no' },
            { 'data' : 'nama_contoh' },
            { 'data' : 'kategori' },
            { 'data' : 'nama_uji' },
            { 'data' : 'metoda' },
            { 'data' : 'ket_dokumentasi' },
            { 'data' : 'id_pengujian' }
        ],

        'pageLength'    : 5,
        'pagingType'    : 'full',
        'ordering'      : false,
        'bLengthChange' : false,
        'searching'     : false,

        'language': {
            'emptyTable'    : 'Tidak ada data tersedia.',
            'info'          : '_START_ sampai _END_ dari _TOTAL_ data ',
            'infoFiltered'  : 'total: _MAX_.',
            'infoEmpty'     : '',
            'processing'    : '<img class="imageRotateHorizontal" src="../../favicon.ico" />'
        }
    });
    $('.dataTables_filter').addClass('pull-left');
    $('#tableDataParameterUji_processing').css('background', 'none');
    $('#tableDataParameterUji_processing').css('border', 'none');

    $('#tableLampiranUji').DataTable().destroy();
    tableLampiranUji = $('#tableLampiranUji').DataTable({
        'processing'    : true, 
        'serverSide'    : true, 
        
        'ajax' : {
            'url'   : baseurl + 'source',
            'type'  : 'GET',
            'data'  : {
                'id'        : id,
                'id_user'   : tokenData.id_user,
                'token'     : tokenData.token,
                'user'      : 'employee',
                'request'   : '0fe47b9149a5fab7a491e86d694bd516'
            },
            'dataSrc' : function(response){
                var i = response.start;
                var row = new Array();
                if (response.result) {
                    for(var x in response.data){
                        var status = '';
                        var lampiran = '';

                        if (response.data[x].status == 'Selesai' && response.data[x].status_pengerjaan == 'Koordinator Lab') {
                            status = 'Belum Selesai';
                        } else if (response.data[x].status_uji == 'Selesai' && response.data[x].status_pengerjaan == 'Dokumentasi') {
                            status = 'Selesai';
                            lampiran = response.data[x].lampiran_uji;
                        } else{
                            status = 'Belum Selesai';
                        }

                        row.push({
                            'no'                : i,
                            'kategori'          : response.data[x].kategori,
                            'nama_uji'          : response.data[x].nama_uji,
                            'pengguna'          : response.data[x].pengguna,
                            'status'            : status,
                            'lampiran'          : lampiran
                        });
                        i = i + 1;
                    }

                    response.data = row;
                    return row;
                } else{
                    response.draw = 0;
                    return [];
                }
            }
        },

        'columns' : [
            { 'data' : 'no' },
            { 'data' : 'kategori' },
            { 'data' : 'nama_uji' },
            { 'data' : 'pengguna' },
            { 'data' : 'status' },
            { 'data' : 'lampiran' }
        ],

        'pageLength'    : 5,
        'pagingType'    : 'full',
        'ordering'      : false,
        'bLengthChange' : false,
        'searching'     : false,

        'language': {
            'emptyTable'    : 'Tidak ada data tersedia.',
            'info'          : '_START_ sampai _END_ dari _TOTAL_ data ',
            'infoFiltered'  : 'total: _MAX_.',
            'infoEmpty'     : '',
            'processing'    : '<img class="imageRotateHorizontal" src="../../favicon.ico" />'
        }
    });
    $('.dataTables_filter').addClass('pull-left');
    $('#tableLampiranUji_processing').css('background', 'none');
    $('#tableLampiranUji_processing').css('border', 'none');

    $(this).removeAttr('disabled');

    $('.box:eq(0)').fadeOut('fast');
    $('.box:eq(2)').fadeOut('fast');
    $('.box:eq(1)').fadeIn('fast');
});

$('.box:eq(1)').on('click', '.btn-default', function(){
    $('.box:eq(1)').fadeOut('fast');
    $('.box:eq(2)').fadeOut('fast');
    $('.box:eq(0)').fadeIn('fast');
});

$('#tableDataParameterUji').on('click', '.btn-success', function(){
    $(this).attr('disabled', 'disabled');
    var id = $(this).attr('id');

    $.post(baseurl + 'ajax_service?request=7c8b8fe1ed2a316c2a81dc2d0b99d009', 
    {
        'id'    : id,
        'token' : tokenData
    },
    function(response){
        // console.log(response);
        if (response.result) {
            $('.box:eq(2) .box-footer .btn-success').attr('id', id);
            var data = response.data;
            if (data.merek != null || data.merek != '') {
                $('input[name="Dokumentasi[merek]"]').val(data.merek);
            } else{
                $('input[name="Dokumentasi[merek]"]').val('');
            }
            if (data.tipe != null || data.tipe != '') {
                $('textarea[name="Dokumentasi[tipe_model]"]').text(data.tipe);
            } else{
                $('textarea[name="Dokumentasi[tipe_model]"]').text('');
            }
        } else{
            fmDanger(response.msg);
            $(this).removeAttr('disabled');
        }
    }, 'json')
    .fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR);
        fmDanger('Tidak terhubung dengan server.');
        $(this).removeAttr('disabled');
    });

    $(this).removeAttr('disabled');

    $('.box:eq(0)').fadeOut('fast');
    $('.box:eq(1)').fadeOut('fast');
    $('.box:eq(2)').fadeIn('fast');
});

$('.box:eq(2)').on('click', '.btn-danger', function(){
    $('.box:eq(0)').fadeOut('fast');
    $('.box:eq(2)').fadeOut('fast');
    $('.box:eq(1)').fadeIn('fast');
});

$('input[name="Dokumentasi[upload_lampiran]"]').change(function(){
    $(this).attr('disabled', 'disabled');
    var id = $(this).attr('id');
    var lampiran = $(this).val();
    if (lampiran != '') {
        var fd = $(this).prop('files')[0];
        var fu = new FormData();
        fu.append('file', fd);
        fu.append('id', id);

        $.ajax({
            type        : 'POST',
            url         : baseurl + 'ajax_service/upload?request=92e56b76b7301b0f81098f6736e2c33a&employee=true&id_user=' + tokenData.id_user + '&token=' + tokenData.token,
            dataType    : 'json',
            cache       : false,
            contentType : false,
            processData : false,
            data        : fu,                         
            success     : function(response){
                // console.log(response);
                if (response.result) {
                    $('#tableLampiranGabungan tbody tr:eq(0) td:eq(1)').text(response.file_name);

                    table.ajax.reload();
                    $('#tablePekerjaanDokumentasi .btn-success').each(function(){
                        var triggerId = $(this).attr('id');
                        if (triggerId == id) {
                            $(this).trigger('click');
                        }
                    });

                    fmSuccess(response.msg);
                } else{
                    fmDanger(response.msg);
                    $(this).removeAttr('disabled');
                }
            },
            error       : function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR);
                fmDanger('Tidak terhubung dengan server.');
                $(this).removeAttr('disabled');
            }
        });
    }

    $(this).removeAttr('disabled');
});

$('.box:eq(1) .box-footer').on('click', '.btn-success', function(){
    $(this).attr('disabled', 'disabled');
    var id = $(this).attr('id');
    var id_ko = $('input[name="Dokumentasi[id]"]').val();
    var id_sertifikat = $('input[name="Dokumentasi[id_sertifikat]"]').val();

    $.post(baseurl + 'ajax_service?request=547f21a9ff5c5e6be7b7fd52578e542d', 
    {
        'id'            : id,
        'id_ko'         : id_ko,
        'id_sertifikat' : id_sertifikat,
        'token'         : tokenData
    },
    function(response){
        // console.log(response);
        if (response.result) {
            table.ajax.reload();
            fmSuccess(response.msg);
        } else{
            fmDanger(response.msg);
            $(this).removeAttr('disabled');
        }
    }, 'json')
    .fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR);
        fmDanger('Tidak terhubung dengan server.');
        $(this).removeAttr('disabled');
    });

    $(this).removeAttr('disabled');

    $('.box:eq(1)').fadeOut('fast');
    $('.box:eq(2)').fadeOut('fast');
    $('.box:eq(0)').fadeIn('fast');
});

$('.box:eq(2)').on('click', '.btn-success', function(){
    $(this).attr('disabled', 'disabled');
    var id = $(this).attr('id');
    var merek = $('input[name="Dokumentasi[merek]"]').val();
    var tipe = $('textarea[name="Dokumentasi[tipe_model]"]').val();
    if (merek == '') {
        fmDanger('Kolom merek tidak boleh kosong.');
        return;
    }
    if (tipe == '') {
        fmDanger('Kolom tipe / model tidak boleh kosong.');
        return;
    }

    $.post(baseurl + 'ajax_service?request=9779e20e7df3eb909d62c3136ec0beed', 
    {
        'id'    : id,
        'merek' : merek,
        'tipe'  : tipe,
        'token' : tokenData
    },
    function(response){
        // console.log(response);
        if (response.result) {
            tableDataParameterUji.ajax.reload();
            fmSuccess(response.msg);
        } else{
            fmDanger(response.msg);
            $(this).removeAttr('disabled');
        }
    }, 'json')
    .fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR);
        fmDanger('Tidak terhubung dengan server.');
        $(this).removeAttr('disabled');
    });

    $(this).removeAttr('disabled');

    $('.box:eq(0)').fadeOut('fast');
    $('.box:eq(2)').fadeOut('fast');
    $('.box:eq(1)').fadeIn('fast');
});

$('#tablePekerjaanDokumentasi').on('click', '.btn-danger', function(){
	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');

	$.post(baseurl + 'ajax_service?request=a401b368b2a0f54cdbc357680e1cd5f9', 
	{
		'id'	: id,
		'token'	: tokenData
	},
	function(response){
		if (response.result) {
			fmSuccess(response.msg);
			table.ajax.reload(null, false);
		} else{
			fmDanger(response.msg);
            $(this).removeAttr('disabled');
		}
	}, 'json')
	.fail(function(jqXHR, textStatus, errorThrown){
		console.log(jqXHR);
		fmDanger('Tidak terhubung dengan server.');
        $(this).removeAttr('disabled');
	});
});