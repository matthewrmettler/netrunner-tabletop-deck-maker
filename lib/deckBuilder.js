/*
 * deckParser.js
 * Library for parsing the user input into making a deck image.
 */

/******************
 * Libraries      *
 ******************/



/******************
 * Variables      *
 ******************/


/******************
 *  Functions     *
 ******************/

createDeckImage = function(images) {
	var imageName = images[0];
	return __dirname + '/../public/img/cards/' + imageName + '.png'
}