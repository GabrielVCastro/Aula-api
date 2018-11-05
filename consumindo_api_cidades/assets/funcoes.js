function inserir(){
	var cidade = document.getElementById("nome").value
	var uf = document.getElementById("uf").value

	var cadastro = {
		nome: cidade,
		uf: uf

	}

	
	$.ajax({
        url: 'http://localhost/api_cidades/index.php/Cidades/inserir',
        dataType: 'text',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(cadastro),
        success: function( data, textStatus, jQxhr ){
        	$("#tabela td").remove()
        	var resposta = JSON.parse(data)
        	if (typeof resposta.error !== 'undefined') {
        		$("#alert").append(' <div class="alert alert-danger" role="alert"><p>'+resposta.error+'</p></div>')
			}else{
				$("#alert").append(' <div class="alert alert-success" role="alert"><p>'+resposta.msg+'</p></div>')
			}
        	
        	console.log(resposta)
            listar()


			         
        },

    });
 

}


function listar(){


	$.ajax({
	    url: 'http://localhost/api_cidades/index.php/Cidades',
	    dataType: 'text',
	    type: 'get',
	    contentType: 'application/json',
	    success: function( data, textStatus, jQxhr ){
	    
			var cidades = JSON.parse(data)
			for(var i=0;cidades.length>i;i++){

				
				
				//Adicionando registros retornados na tabela
				$('#tabela').append('<tr><td>'+cidades[i].id+'</td><td>'+cidades[i].nome+'</td><td>'+cidades[i].uf+'</td><td><p><a href="#ex1" rel="modal:open"></p><i class="fas fa-pen"></a></i></a></td><td><button type="button" onClick="excluir('+cidades[i].id+')" ><i class="fas fa-times-circle"></i></button></td></tr>');
			}

	    }
	});
		
}



function excluir(id){


	  
		




			$.ajax({
			    url: 'http://localhost/api_cidades/index.php/Cidades/excluir?excluir='+id,
			    dataType: 'text',
			    type: 'GET',
			    
			    contentType: 'application/json',
			    success: function( data, textStatus, jQxhr ){
			     	
					console.log(data)
					

			    }
			});
}

function editar(){
	var cidade = document.getElementById("nome").value
	var uf = document.getElementById("uf").value
	var id = document.getElementById("id").value
	var cadastro = {
		nome: cidade,
		uf: uf,
		id: id

	}

	
	$.ajax({
        url: 'http://localhost/api_cidades/index.php/Cidades/editar',
        dataType: 'text',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(cadastro),
        success: function( data, textStatus, jQxhr ){
        	$("#tabela td").remove()
        	var resposta = JSON.parse(data)
        	if (typeof resposta.error !== 'undefined') {
        		$("#alert").append(' <div class="alert alert-danger" role="alert"><p>'+resposta.error+'</p></div>')
			}else{
				$("#alert").append(' <div class="alert alert-success" role="alert"><p>'+resposta.msg+'</p></div>')
			}
        	
        	console.log(resposta)
            listar()


			         
        },

    });
}


