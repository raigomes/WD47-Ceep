var controladorCartao = (
function() {
	"use strict";
	
	var contador = $(".cartao").length;

	function adicionaCartao(conteudo, cor) {
		contador++;

		//cria o botao de remover
		var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
		.attr("data-id", contador)
		.text("Remover")
		.click(removeCartao);

		//cria a div de opçoes
		var opcoes = $("<div>").addClass("opcoesDoCartao")
		.append(botaoRemove);

		var conteudoTag = $("<p>").addClass("cartao-conteudo")
		.append(conteudo);

		var tipoCartao = decideTipoCartao(conteudo);

		//Acrescenta o append para colocar a div opcoes no cartao
		$("<div>").attr("id", "cartao_" + contador)
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

	/* Remover Cartoes */
	var botoes = document.querySelectorAll(".botao-remover");
	for (var i = 0; i < botoes.length; i++) {
		botoes[i].addEventListener("click", removeCartao);
	}

	function removeCartao () {
		var cartao = document.querySelector("#cartao_" + this.dataset.id);
		console.log(cartao);	
		cartao.classList.add("cartao--some");
		setTimeout(function() {
			cartao.remove();
		}, 400);
	}

	return {		
		adicionaCartao: adicionaCartao,
		idUltimoCartao: function() { return contador;}
	};
})();