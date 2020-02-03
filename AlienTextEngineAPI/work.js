$(function(){

	//Hide elemts
	$("#code_matrix_hist").hide();
	$("#code_graph_hist").hide();

	//Show/hide matrix hist code
	$("#code_matrix_hist_button").click(
		function(){
			$("#code_matrix_hist").slideToggle();
		}
	);
	$("#code_graph_hist_button").click(
		function(){
			$("#code_graph_hist").slideToggle();
		}
	);

});

function loadTextFile(origin, elementid) {
	var file = new XMLHttpRequest();
    file.open("GET", origin, true);
    file.onreadystatechange = function() {
      if (file.readyState === 4) {  // Makes sure the document is ready to parse
        if (file.status === 200) {  // Makes sure it's found the file
          text = file.responseText;
          document.getElementById(elementid).innerHTML = text;
		  Prism.highlightAll();
        }
      }
    }
	file.send();
}

function loadCodeExamples(){
	/*Definitions*/
	loadTextFile("http://zumbi.co.nf/AlienTextEngineAPI/definitions/def_hist.txt","def_history");
	loadTextFile("http://zumbi.co.nf/AlienTextEngineAPI/definitions/def_howto_hist.txt","def_howto_history");
	loadTextFile("http://zumbi.co.nf/AlienTextEngineAPI/definitions/def_howto_assets.txt","def_howto_assets");

	/*Code examples*/
	loadTextFile("http://zumbi.co.nf/AlienTextEngineAPI/code_examples/matrix.txt","code_matrix_hist_code");
	loadTextFile("http://zumbi.co.nf/AlienTextEngineAPI/code_examples/graph.txt","code_graph_hist_code");
}

window.onLoad = loadCodeExamples();