'use strict';

var T = require( './lib/context' );

exports.init = function () {
	T.builtins.diag = function () {
		return JSON.stringify( T, null, 2 );
	}
}
