var table = '';
var tableDataSertifikat = '';

$(document).ready(function(){
	table = $('#tableArsipSertifikat').DataTable({
		'processing'	: true, 
        'serverSide'	: true, 
        
        'ajax' : {
        	'url'	: baseurl + 'source',
            'type'	: 'GET',
            'data'	: {
                'id_user'	: tokenData.id_user,
                'token'		: tokenData.token,
                'user'		: 'employee',
                'request'	: 'fcce92ea257ab45d47cc207fae90c123'
            },
            'dataSrc' : function(response){
            	var i = response.start;
            	var row = new Array();
            	if (response.result) {
            		for(var x in response.data){
            			var button = '<button id="'+ response.data[x].id_pemesanan +'" type="button" class="btn btn-success btn-sm btn-flat"><i class="fa fa-file-text-o"></i></button>';

	            		row.push({
	            			'no'				: i,
	            			'kd_pemesanan'		: response.data[x].kd_pemesanan,
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
    $('#tableArsipSertifikat_processing').css('background', 'none');
    $('#tableArsipSertifikat_processing').css('border', 'none');

	$('body div').show();
	$('.loading').remove();

    $('.box:eq(1)').fadeOut('fast');
});

$('#tableArsipSertifikat').on('click', '.btn-success', function(){
    $(this).attr('disabled', 'disabled');
    var id = $(this).attr('id');

    $.post(baseurl + 'ajax_service?request=730dbdba4538afa8998ff28d6f395db2', 
    {
        'id'    : id,
        'token' : tokenData
    },
    function(response){
        if (response.result) {
            var data = response.data;
            $('input[name="Arsip[nomor_wo]"]').val(data.kd_pemesanan);
            $('input[name="Arsip[nama_pelanggan]"]').val(data.nama_pelanggan);
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

    $('#tableDataSertifikat').DataTable().destroy();
    tableDataSertifikat = $('#tableDataSertifikat').DataTable({
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
                'request'   : '84d07290680d5f011891776f8c8118d9'
            },
            'dataSrc' : function(response){
                var i = response.start;
                var row = new Array();
                if (response.result) {
                    for(var x in response.data){
                        row.push({
                            'no'                : i,
                            'nama_contoh'       : response.data[x].nama_contoh,
                            'kategori'          : response.data[x].kategori,
                            'nama_uji'          : response.data[x].nama_uji,
                            'metoda'            : response.data[x].metoda
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
            { 'data' : 'metoda' }
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
    $('#tableDataSertifikat_processing').css('background', 'none');
    $('#tableDataSertifikat_processing').css('border', 'none');

    $(this).removeAttr('disabled');

    $('.box:eq(0)').fadeOut('fast');
    $('.box:eq(1)').fadeIn('fast');
});

$('.box:eq(1)').on('click', '.btn-default', function(){
    $('.box:eq(1)').fadeOut('fast');
    $('.box:eq(0)').fadeIn('fast');
});