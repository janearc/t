#!/usr/bin/env node

'use strict';

var T = require( 'singleton' ).get();
var tokearser = require( 'lib/tokeparser' ).tokeparser;

// Setup {{{
//

// Set up the T machine
//
T.heap     = { };
T.stack    = [ ];
T.domain   = require( 'domain' ).create();

// Functions expected to exist in T without definition there
//
T.builtins = {
	print: console.log,
	die:   function () { process.exit(-255) }
};

// Error handling in T
//
T.domain.on( 'error', function (e) {
	console.log( 'uncaught error in T interpreter: ' + e );
} );


// The environment for T
//
T.env   = env_sanitise;
T.args  = arg_sanitise;

// For reaching back into the node environment from T
//
T._super = {
	env:  process.env,
	argv: process.argv
};

function env_sanitise () {
	// Lose the not-relevant-to-T things from the Node.js env and wrap in a closure.
	//
	return process.env;
}

function arg_sanitise () {
	// Lose the not-relevant-to-T things from the Node.js argv and wrap in a closure.
	//
	return process.argv;
}

// }}}

var parsed = require( 'sendak-usage' ).parsedown( {
	't-file' : { description: 'the T file you\'d like to run', type: [ String ] }
}, process.argv ), nopt = parsed[0];

var tfile = require('fs').readFileSync( nopt['t-file'] );

tfile.toString().split( "\n" ).forEach( function (line) {
	console.log( 'line: ' + line );
} );
