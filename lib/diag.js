'use strict';

var T = require( 'singleton' ).get();

exports.init = function () {
	T.builtins.diag = function () {
		return JSON.stringify( T, null, 2 );
	}
}
