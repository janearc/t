#!/usr/bin/env node

'use strict';

var T = require( 'singleton' ).get();

// Set up heap, stack, and env
//
T.heap  = { };
T.stack = [ ];
T.env   = env_sanitise;
T.args  = arg_sanitise;
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
