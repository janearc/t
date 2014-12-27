"use strict";

exports.tokeparser = function (line, previous) {
	// Tokeparser takes a given line and returns the tokens therein. This would
	// be barewords and operators as well as strings bracketed by ticks and
	// double-ticks.
	//

	var characters = line.split('');

	var words = [ ];

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

	return words;
}
