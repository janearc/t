#!/usr/bin/env node

'use strict';

var T = require( 'singleton' ).get();

T.builtins = { };

require( './lib/stdio'      ).init();
require( './lib/list'       ).init();
require( './lib/tokeparser' ).init();
require( './lib/domain'     ).init();
require( './lib/cli'        ).init();

// Set up the T machine
//
T.heap      = { };
T.domain    = require( 'domain' ).create();

// Functions expected to exist in T without definition there
//

// We hit something we really didn't expect, and should get out right away.
//
T.builtins.die = function () { process.exit(-255) },

// T's internal "re-run the interpeter and see if the stack has changed.
// If respin() returns true, there's still something in the stack, and we
// re-execute, top-down. When that while() reaches false, we exit. This
// should eventually be some kind of grown-up cleanup process but that works
// for now.
//
T.builtins.bye = function () { while (respin()) { /* NOP */ } process.exit(0) },

// T needs to be able to read JSON.
//
T.builtins.jsonp = function (s) { return JSON.stringify( s, null, 2 ) },

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

T.target.contents.toString().split( "\n" ).forEach( function (line) {
	var tokens = T.tokeparser( line );
	console.log( tokens );
} );
