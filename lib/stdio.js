var T = require( 'singleton' ).get();

// I suppose we could pass T in here, but if it's a singleton, that breaks the
// design pattern, right?
//
exports.init = function () {
	// STDOUT
	//
	T.builtins.print = console.log;

	// STDERR
	//
	T.builtins.warn  = console.warn;

	// STDNODESOMETHINGELSEBUTLOOKSLIKEERR
	//
	T.builtins.error = console.error;
}
