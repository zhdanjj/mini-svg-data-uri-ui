/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var encoder = __webpack_require__(1);

	function svgHandler(){
		var svg = document.getElementById('input-svg').value;
		var result = encoder(svg);
		return result;
	}

	document.getElementById('svg-gen').addEventListener('click', function(){
		var result = svgHandler();
		document.getElementById('output-svg').value = result;
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var shorterNames = __webpack_require__(2);
	var REGEX = {
	  whitespace: /\s+/g,
	  urlHexPairs: /%[\dA-F]{2}/g,
	  quotes: /"/g,
	}

	function collapseWhitespace(str) {
	  return str.trim().replace(REGEX.whitespace, ' ');
	}

	function dataURIPayload(string) {
	  return encodeURIComponent(string)
	    .replace(REGEX.urlHexPairs, specialHexEncode);
	}

	// `#` gets converted to `%23`, so quite a few CSS named colors are shorter than
	// their equivalent URL-encoded hex codes.
	function colorCodeToShorterNames(string) {
	  Object.keys(shorterNames).forEach(function(key) {
	    if (shorterNames[key].test(string)) {
	      string = string.replace(shorterNames[key], key);
	    }
	  });

	  return string;
	}

	function specialHexEncode(match) {
	  switch (match) { // Browsers tolerate these characters, and they're frequent
	    case '%20': return ' ';
	    case '%3D': return '=';
	    case '%3A': return ':';
	    case '%2F': return '/';
	    default: return match.toLowerCase(); // compresses better
	  }
	}

	function svgToTinyDataUri(svgString) {
	  if (typeof svgString !== 'string') {
	    throw new TypeError('Expected a string, but received ' + typeof svgString);
	  }
	  // Strip the Byte-Order Mark if the SVG has one
	  if (svgString.charCodeAt(0) === 0xfeff) { svgString = svgString.slice(1) }

	  var body = colorCodeToShorterNames(collapseWhitespace(svgString))
	    .replace(REGEX.quotes, "'");
	  return 'data:image/svg+xml,' + dataURIPayload(body);
	}

	svgToTinyDataUri.toSrcset = function toSrcset(svgString) {
	  return svgToTinyDataUri(svgString).replace(/ /g, '%20');
	}

	module.exports = svgToTinyDataUri;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
	  aqua: /#00ffff(ff)?(?!\w)|#0ff(f)?(?!\w)/gi,
	  azure: /#f0ffff(ff)?(?!\w)/gi,
	  beige: /#f5f5dc(ff)?(?!\w)/gi,
	  bisque: /#ffe4c4(ff)?(?!\w)/gi,
	  black: /#000000(ff)?(?!\w)|#000(f)?(?!\w)/gi,
	  blue: /#0000ff(ff)?(?!\w)|#00f(f)?(?!\w)/gi,
	  brown: /#a52a2a(ff)?(?!\w)/gi,
	  coral: /#ff7f50(ff)?(?!\w)/gi,
	  cornsilk: /#fff8dc(ff)?(?!\w)/gi,
	  crimson: /#dc143c(ff)?(?!\w)/gi,
	  cyan: /#00ffff(ff)?(?!\w)|#0ff(f)?(?!\w)/gi,
	  darkblue: /#00008b(ff)?(?!\w)/gi,
	  darkcyan: /#008b8b(ff)?(?!\w)/gi,
	  darkgrey: /#a9a9a9(ff)?(?!\w)/gi,
	  darkred: /#8b0000(ff)?(?!\w)/gi,
	  deeppink: /#ff1493(ff)?(?!\w)/gi,
	  dimgrey: /#696969(ff)?(?!\w)/gi,
	  gold: /#ffd700(ff)?(?!\w)/gi,
	  green: /#008000(ff)?(?!\w)/gi,
	  grey: /#808080(ff)?(?!\w)/gi,
	  honeydew: /#f0fff0(ff)?(?!\w)/gi,
	  hotpink: /#ff69b4(ff)?(?!\w)/gi,
	  indigo: /#4b0082(ff)?(?!\w)/gi,
	  ivory: /#fffff0(ff)?(?!\w)/gi,
	  khaki: /#f0e68c(ff)?(?!\w)/gi,
	  lavender: /#e6e6fa(ff)?(?!\w)/gi,
	  lime: /#00ff00(ff)?(?!\w)|#0f0(f)?(?!\w)/gi,
	  linen: /#faf0e6(ff)?(?!\w)/gi,
	  maroon: /#800000(ff)?(?!\w)/gi,
	  moccasin: /#ffe4b5(ff)?(?!\w)/gi,
	  navy: /#000080(ff)?(?!\w)/gi,
	  oldlace: /#fdf5e6(ff)?(?!\w)/gi,
	  olive: /#808000(ff)?(?!\w)/gi,
	  orange: /#ffa500(ff)?(?!\w)/gi,
	  orchid: /#da70d6(ff)?(?!\w)/gi,
	  peru: /#cd853f(ff)?(?!\w)/gi,
	  pink: /#ffc0cb(ff)?(?!\w)/gi,
	  plum: /#dda0dd(ff)?(?!\w)/gi,
	  purple: /#800080(ff)?(?!\w)/gi,
	  red: /#ff0000(ff)?(?!\w)|#f00(f)?(?!\w)/gi,
	  salmon: /#fa8072(ff)?(?!\w)/gi,
	  seagreen: /#2e8b57(ff)?(?!\w)/gi,
	  seashell: /#fff5ee(ff)?(?!\w)/gi,
	  sienna: /#a0522d(ff)?(?!\w)/gi,
	  silver: /#c0c0c0(ff)?(?!\w)/gi,
	  skyblue: /#87ceeb(ff)?(?!\w)/gi,
	  snow: /#fffafa(ff)?(?!\w)/gi,
	  tan: /#d2b48c(ff)?(?!\w)/gi,
	  teal: /#008080(ff)?(?!\w)/gi,
	  thistle: /#d8bfd8(ff)?(?!\w)/gi,
	  tomato: /#ff6347(ff)?(?!\w)/gi,
	  violet: /#ee82ee(ff)?(?!\w)/gi,
	  wheat: /#f5deb3(ff)?(?!\w)/gi,
	  white: /#ffffff(ff)?(?!\w)|#fff(f)?(?!\w)/gi,
	};


/***/ }
/******/ ]);