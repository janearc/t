parser = require( '../lib/tokeparser.js' ).tokeparser;

console.log( parser( 'foo bar baz   bletch' ) );
console.log( parser( 'foo bar "baz bletch" qip' ) );
console.log( parser( 'foo bar' + "\n" + '  and baz bletch' ) );
