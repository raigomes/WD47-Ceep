var controladorCartao = (
function() {
	"use strict";
	
	var contador = $(".cartao").length;
	var intervaloSyncEdicao;

	function adicionaCartao(conteudo, cor) {
		contador++;
		
		//cria as opçoes de remoção e edição de cartão
		var opcoes = criaOpcoesDoCartao(contador);

		var conteudoTag = $("<p>").addClass("cartao-conteudo")
								  .attr("contenteditable", true)
								  .on("input", editaCartaoHandler)
								  .append(conteudo);

		var tipoCartao = decideTipoCartao(conteudo);

		//Acrescenta o append para colocar a div opcoes no cartao
		$("<div>").attr("id", "cartao_" + contador)
				  .attr("tabindex", 0)
				  .addClass("cartao")
				  .addClass(tipoCartao)
				  .append(opcoes)
				  .append(conteudoTag)
				  .css("background-color", cor)
				  .prependTo(".mural");		
	}

	/* Tamanho dos textos dos cartoes*/
	function decideTipoCartao(conteudo) {
		var quebras = conteudo.split("<br>").length;
		var totalDeLetras = conteudo.replace(/<br>/g,"").length;

		var ultimoMaior = "";
		conteudo.replace(/<br>/g, " ")
		.split(" ")
		.forEach(function(palavra){
			if(palavra.length > ultimoMaior.length) {
				ultimoMaior = palavra;
			}
		});
		var tamMaior = ultimoMaior.length;

		var tipoCartao = "cartao--textoPequeno";
		if (tamMaior < 9 && quebras < 5 && totalDeLetras < 55) {
			tipoCartao = "cartao--textoGrande";
		}
		else if (tamMaior < 12 && quebras < 6 && totalDeLetras < 75) {
			tipoCartao = "cartao--textoMedio";
		}
		//console.log(quebras + " " + totalDeLetras + " " + tamMaior);
		return tipoCartao;
	}

	function editaCartaoHandler(event) {
		clearTimeout(intervaloSyncEdicao);

		intervaloSyncEdicao = setTimeout(function(){
			$(document).trigger("precisaSincronizar");
		}, 1000);
	}

	return {		
		adicionaCartao: adicionaCartao,
		idUltimoCartao: function() { return contador;}
	};	
})(criaOpcoesDoCartao);