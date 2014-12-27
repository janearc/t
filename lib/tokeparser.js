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
		while (inword) {
			// Note, we do not understand interpolation right now.
			//
			var quoted = false;

			var thischar = characters.shift();
			if (
				(thischar != undefined) &&
				thischar.length         &&
				(thischar != ' ')       &&
				(thischar != "\t")         ) {
				// Appears this is a \S-type character, push it into the word
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
