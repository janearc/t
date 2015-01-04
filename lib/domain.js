"use strict";

var T = require( 'singleton' ).get();

exports.init = function () {
	// Error handling in T
	//
	T.domain.on( 'error', function (e) {
		console.log( 'uncaught error in T interpreter: ' + e );
	} );
}
