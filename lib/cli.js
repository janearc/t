"use strict";

var T = require( 'singleton' ).get();

exports.init = function () {
	var parsed = require( 'sendak-usage' ).parsedown( {
		't-file' : { description: 'the T file you\'d like to run', type: [ String ] },
		'help'   : { description: 'some halps', type: [ Boolean ] }
	}, process.argv ), nopt = parsed[0], usage = parsed[1];
	
	if ((! nopt['t-file']) || (nopt['help'])) {
		console.log( 'Usage: ' );
		console.log( usage );
		process.exit( -255 );
	}

	T.target = {
		filename: nopt['t-file'],
		contents: require('fs').readFileSync( nopt['t-file'] )
	};
}
