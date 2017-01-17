/* Busca de cartões*/
(function() {
	$("#busca").on("input", function(){	
		var busca = $(this).val();

		if(busca.length > 0) {
			$(".cartao").hide().filter(function () {
				return $(this).find(".cartao-conteudo")
				.text()
				.match(new RegExp(busca, "i"));
			}).show();
		}
		else {
			$(".cartao").show();	
		}
		
	});
})();