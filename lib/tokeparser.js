'use strict';

var T = require( './context' );

exports.init = function () {
	T.statement  = [ ];

	T.tokeparser = function (line, previous) {
		// Tokeparser takes a given line and returns the tokens therein. This would
		// be barewords and operators as well as strings bracketed by ticks and
		// double-ticks.
		//

		var words = [ ]
			, fin   = false;

		if ((typeof previous) == 'string') {
			line = previous + line;
		}
		if ((typeof previous) == 'array') {
			// We might do something here but for now just pay attention
			//
			var current = function () { return previous };
		}

		var characters = line.split('');

		while (characters.length) {
			var word   = '';
			var inword = true;

			// Note, we do not understand interpolation right now.
			//
			var quoted = false;

			while (inword) {

				var qtruthy = function (s) { // {{{
					if (quoted) {
						if (s == ' ')  { return true }
						if (s == "\t") { return true }
					} else {
						if (s == ' ')  { return false }
						if (s == "\t") { return false }
					}
					return true;
				} // }}}

				var thischar = characters.shift();

				// Check our quoting status
				//
				if ( (thischar == '"') || (thischar == "'") ) {
					if (quoted == true)  { inword = false }
					if (quoted == false) { quoted = true  }

					// Pretend we never saw the quote character
					//
					thischar = characters.shift();
				}

				if ( (thischar != undefined) && thischar.length && qtruthy( thischar )) {
					// Appears this is a \S-type character outside q auote, push it into the
					// word buffer
					//
					word += thischar;
				}
				else {
					inword = false;
				}
			}

			// We have finished a word, push it into words.
			//
			if (word.length) {
				// If word doesn't have length, it's a '' from split()
				//
				words.push( word );
			}

			// Clean up the wordbuffer
			//
			word = '';
		}

		if ((words[0] == 'and') && previous) {
			// This is a continuation of a previous statement
			//
			return {
				'current-statement': function () {
					var local_current = current();
					words.forEach( function (p) { local_previous.push(p) } );
					return local_current;
				}(),
				'previous'   : current(),
				'this-round' : words,
				'finished'   : fin
			};
		}
		else {
			return {
				'current-statement': words,
				'previous'         : [ ],
				'this-round'       : words,
				'finished'         : fin
			};
		}
	}
}
