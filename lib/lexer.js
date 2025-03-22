'use strict';

var T = require( './context' );

// The lexer lexes, emitting sequences of statements that can be executed by
// the interpreter (T.run()).
//
exports.lex = function () {
	T.target.contents.toString().split( "\n" ).forEach( function (l) {
		var tokens = T.tokeparser( l );
		console.log( tokens );
	} );
}

exports.init = function () { /* NOP */ };
