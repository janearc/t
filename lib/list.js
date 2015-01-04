'use strict';

var T = require( 'singleton' ).get();

// I suppose we could pass T in here, but if it's a singleton, that breaks the
// design pattern, right?
//
exports.init = function () {
	// The T universe revolves around push, pop, shift, and their 'un' variants.
	// No, there are no sacred cows. Quit asking.
	//
	T.stack = [ ];

	T.builtins.push    = function (p) { return T.stack.push( p )    };
	T.builtins.pop     = function (p) { return T.stack.pop( )       };
	T.builtins.shift   = function (p) { return T.stack.shift( )     };
	T.builtins.unpush  = function (p) { return T.stack.shift( )     };
	T.builtins.unpop   = function (p) { return T.stack.push( p )    };
	T.builtins.unshift = function (p) { return T.stack.unshift( p ) };
}
