var table = '';

$(document).ready(function(){
	table = $('#tablePekerjaanPengujian').DataTable({
		'processing'	: true, 
        'serverSide'	: true, 
        
        'ajax' : {
        	'url'	: baseurl + 'source',
            'type'	: 'GET',
            'data'	: {
                'id_user'	: tokenData.id_user,
                'token'		: tokenData.token,
                'user'		: 'employee',
                'request'	: '674e1717496617e5a1c88c697ce912fd'
            },
            'dataSrc' : function(response){
            	var i = response.start;
            	var row = new Array();
            	if (response.result) {
            		for(var x in response.data){
            			var status_pengerjaan = '';
            			if (response.data[x].status_pengerjaan == 'Belum Dibagikan') {
            				status_pengerjaan = '<div class="label label-danger">Belum Dibagikan</div>';
            			} else if (response.data[x].status_pengerjaan == 'Selesai') {
            				status_pengerjaan = '<div class="label label-success">Selesai</div>';
            			} else{
            				status_pengerjaan = '<div class="label label-info">'+ response.data[x].status_pengerjaan +'</div>';
            			}

            			var button = '';
            			if (response.data[x].status_pengerjaan == 'Belum Dibagikan') {
            				button = '<button id="'+ response.data[x].id_pemesanan +'" type="button" class="btn btn-success btn-sm btn-flat"><i class="fa fa-check"></i></button>';
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
    $('#tablePekerjaanPengujian_processing').css('background', 'none');
    $('#tablePekerjaanPengujian_processing').css('border', 'none');

	$('body div').show();
	$('.loading').remove();
});

$('#tablePekerjaanPengujian').on('click', '.btn-success', function(){
	$(this).attr('disabled', 'disabled');
	var id = $(this).attr('id');

	$.post(baseurl + 'ajax_service?request=731fcafdd77711bc391fd86510b32c5e', 
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