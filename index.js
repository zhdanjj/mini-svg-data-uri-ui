var encoder = require('mini-svg-data-uri');

function svgHandler(){
	var svg = document.getElementById('input-svg').value;
	var result = encoder(svg);
	return result;
}

document.getElementById('svg-gen').addEventListener('click', function(){
	var result = svgHandler();
	document.getElementById('output-svg').value = result;
});
