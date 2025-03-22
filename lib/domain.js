"use strict";

var T = require( './lib/context' );

exports.init = function () {
	// Error handling in T
	//
	T.domain = require( 'domain' ).create();
	T.domain.on( 'error', function (e) {
		console.log( 'uncaught error in T interpreter: ' + e );
	} );
}
