console.log("carregado");

/* Mudar layout do Mural */
document.querySelector("#mudaLayout").addEventListener("click", function(){
	var mural = document.querySelector(".mural");

	mural.classList.toggle("mural--linhas");

	if (mural.classList.contains("mural--linhas")) {
		this.textContent = "Blocos";
	}
	else {
		this.textContent = "Linhas";
	}

});

/* Remover Botoes */
var botoes = document.querySelectorAll(".botao-remover");
for (var i = 0; i < botoes.length; i++) {
	botoes[i].addEventListener("click", removerCartao);
}

function removerCartao () {
	var cartao = document.querySelector("#cartao_" + this.dataset.id);
	console.log(this.dataset.id);
	cartao.classList.add("cartao--some");
	setTimeout(function() {
		cartao.remove();
	}, 400);
}