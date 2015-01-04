#!/usr/bin/env node

'use strict';

var T = require( 'singleton' ).get();
var tokeparser = require( './lib/tokeparser' ).tokeparser;

// Setup {{{
//

// Set up the T machine
//
T.heap      = { };
T.stack     = [ ];
T.statement = [ ];
T.domain    = require( 'domain' ).create();

// Functions expected to exist in T without definition there
//
T.builtins = {
	// T's builtin "print" function just passes through to console.log
	//
	print: console.log,

	// We hit something we really didn't expect, and should get out right away.
	//
	die:   function () { process.exit(-255) },

	// T's internal "re-run the interpeter and see if the stack has changed.
	// If respin() returns true, there's still something in the stack, and we
	// re-execute, top-down. When that while() reaches false, we exit. This
	// should eventually be some kind of grown-up cleanup process but that works
	// for now.
	//
	bye:   function () { while (respin()) { /* NOP */ } process.exit(0) },

	// T needs to be able to read JSON.
	//
	jsonp: function (s) { return JSON.stringify( s, null, 2 ) },

	// The T universe revolves around push, pop, shift, and their 'un' variants.
	// No, there are no sacred cows. Quit asking.
	//
	push:    function (p) { return T.stack.push( p )    },
	pop:     function (p) { return T.stack.pop( )       },
	shift:   function (p) { return T.stack.shift( )     },
	unpush:  function (p) { return T.stack.shift( )     },
	unpop:   function (p) { return T.stack.push( p )    },
	unshift: function (p) { return T.stack.unshift( p ) }

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
	't-file' : { description: 'the T file you\'d like to run', type: [ String ] },
	'help'   : { description: 'some halps', type: [ Boolean ] }
}, process.argv ), nopt = parsed[0], usage = parsed[1];

if ((! nopt['t-file']) || (nopt['help'])) {
	console.log( 'Usage: ' );
	console.log( usage );
	process.exit( -255 );
}

var tfile = require('fs').readFileSync( nopt['t-file'] );

tfile.toString().split( "\n" ).forEach( function (line) {
	var tokens = tokeparser( line );
	console.log( tokens );
} );
