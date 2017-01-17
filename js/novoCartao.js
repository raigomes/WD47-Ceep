/* Adicionar Cartoes com JQuery */
(function(controlador) {
	"use strict";
	$(".novoCartao").submit(function(event){
		event.preventDefault(); //Previne recarregar a página (comportamento default do form)

		var campoConteudo = $(".novoCartao-conteudo");
		//var conteudo = campoConteudo.val().formatText();
		var conteudo = formatText(campoConteudo.val());

		if(conteudo) {
			controlador.adicionaCartao(conteudo); /* REFATORAÇÃO: conteudo incluido na função adicionaCartao() */		
		}

		campoConteudo.val("");	
	});

	function formatText (content) {
		return content.trim().replace(/\n/g,"<br>")
				   .replace(/\*\*(.*)\*\*/g,"<b>$1</b>") //Negrito com **Texto**
				   .replace(/\*(.*)\*/g,"<em>$1</em>"); //Italico com *Texto*
	}
})(controladorCartao);