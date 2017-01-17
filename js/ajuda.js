/* Botão Ajuda - Cartões via GetJSON (AJAX)*/
(function(controlador) {
	"use strict";
	$("#ajuda").click(function(){
		$.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes", function(res) {
			console.log(res);

			res.instrucoes.forEach(function(instrucao) {
				controlador.adicionaCartao(instrucao.conteudo, instrucao.cor);
			});
		});
	})
})(controladorCartao);