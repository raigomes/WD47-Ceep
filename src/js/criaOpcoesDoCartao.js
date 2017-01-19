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

		/* Colorir cartões*/
		function opcoesDeCoresDoCartao(idDoCartao) {
			var cores = [
				{nome: "Padrão", codigo:"#EBEF40"},
				{nome: "Importante", codigo:"#F05450"},
				{nome: "Tarefa", codigo:"#92C4EC"},
				{nome: "Inspiração", codigo:"#76EF40"}
			];
			//Cria div com as cores
			var opcoesDeCor = $("<div>").addClass("opcoesDoCartao-cores")
										.attr("data-id", idDoCartao);

			//Preenche a div com um input e um label com as cores definidas no array
			cores.forEach(function(cor) {
				var idInputCor = "cor" + cor.nome + "-cartao" + idDoCartao;

				var inputCor = $("<input>").attr("type", "radio")
										   .attr("name", "corDoCartao" + idDoCartao)
										   .val(cor.codigo)
										   .attr("id", idInputCor)
										   .addClass("opcoesDoCartao-radioCor");

				var labelCor = $("<label>").css("color", cor.codigo)
										   .attr("for", idInputCor)
										   .attr("tabIndex", 0)
										   .addClass("opcoesDoCartao-cor")
										   .addClass("opcoesDoCartao-opcao")
										   .text(cor.nome);

				opcoesDeCor.data("id", idDoCartao).append(inputCor).append(labelCor);

			});

			//Delegando escuta do evento de colorir o cartão para a div
			opcoesDeCor.on("change", function(event) {
				if(event.target.classList.contains("opcoesDoCartao-radioCor")) {
					var cor = $(event.target);
					var cartao = $("#cartao_" + $(this).data("id"));
					cartao.css("background-color", cor.val());
					$(document).trigger("precisaSincronizar");
				}
			});

			return opcoesDeCor;
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
			
			//cria opções para colorir os cartões
			var opcoesDeCor = opcoesDeCoresDoCartao(idNovoCartao);			


			//cria a div de opçoes									     
			var opcoes = $("<div>").addClass("opcoesDoCartao")
					  			   .append(botaoRemove)
					  			   .append(botaoEdita)
					  			   .append(opcoesDeCor);

			return opcoes;
		}
	}
)();