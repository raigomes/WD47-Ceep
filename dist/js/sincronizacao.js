(function(controlador) {
	"use strict";
	
	var usuario = "raigomes2@hotmail.com";
	/* Carregar cartões do servidor com JSONP */
	$.getJSON(
		"https://ceep.herokuapp.com/cartoes/carregar?callback=?",
		{usuario: usuario},
		function(res) {
			var cartoes = res.cartoes;
			console.log(cartoes.length + " carregados em " + res.usuario);
			cartoes.forEach(function(cartao){
				controlador.adicionaCartao(cartao.conteudo, cartao.cor);
			});
		}
	)

	/*Trigga evento precisaSincronizar no documento ao clicar no botão*/
	$("#sync").click(function(){
		$(document).trigger("precisaSincronizar");
	});

	/* Salvar Cartões com AJAX e um evento personalizado*/
	$(document).on("precisaSincronizar", function () {
		$("#sync").removeClass("botaoSync--sincronizado");
		$("#sync").addClass("botaoSync--esperando");

		console.log($("#sync"));

		var cartoes = [];

		$(".cartao").each(function() {
			var cartao = {};

			cartao.conteudo = $(this).find(".cartao-conteudo").html();
			cartao.cor = $(this).css("background-color");

			cartoes.push(cartao);
		});

		var mural = {
			usuario: usuario,
			cartoes: cartoes
		}

		$.ajax({
			url: "https://ceep.herokuapp.com/cartoes/salvar",
			method: "POST",
			data: mural,
			success: function (res) {
				$("#sync").addClass("botaoSync--sincronizado");
				console.log(res.quantidade + " cartões salvos em " + res.usuario);
			},
			error: function () {
				$("#sync").addClass("botaoSync--deuRuim");
				console.log("Não foi possível salvar o mural");
			},
			complete: function() {
				$("#sync").removeClass("botaoSync--esperando");
			}
		});
	});
})(controladorCartao);