/* Mudar layout do Mural */
(function() {
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
})();