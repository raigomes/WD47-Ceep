var criaOpcoesDoCartao = (
	function() {
		"use strict";
		
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
				$(document).trigger("precisaSincronizar");
			}, 400);			
		}

		/* Editar Cartões*/
		var ehParaEditar = false;

		function toggleEdicao() {
			var cartao = $("#cartao_" + this.dataset.id);
			var conteudo = cartao.find(".cartao-conteudo");

			if(ehParaEditar) {
				ehParaEditar = false;
				conteudo.attr("contenteditable", false);
				conteudo.blur();
			}
			else {
				ehParaEditar = true;
				conteudo.attr("contenteditable", true);
				conteudo.focus();
			}
		}

		return function(idNovoCartao) {
			//cria o botao de remover
			var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
										   .addClass("opcoesDoCartao-opcao")
			  						       .attr("data-id", idNovoCartao)
									       .text("Remover")
									       .click(removeCartao);
			//cria o botao de editar
			var botaoEdita = $("<button>").addClass("opcoesDoCartao-edita")
										  .addClass("opcoesDoCartao-opcao")
			  						       .attr("data-id", idNovoCartao)
									       .text("Editar")
									       .click(toggleEdicao);
			
			//cria a div de opçoes									     
			var opcoes = $("<div>").addClass("opcoesDoCartao")
					  			   .append(botaoRemove)
					  			   .append(botaoEdita);

			return opcoes;
		}
	}
)();