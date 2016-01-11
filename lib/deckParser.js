/*
 * deckParser.js
 * Library for parsing the user input into making a deck image.
 */

/******************
 * Variables      *
 ******************/

var imgPrefix = '<img src="/img/cards/';
var imgPostfix = '.png" />';
	
/******************
 *  Functions     *
 ******************/

//Main call that handles calling the rest of the functions
//Takes in the 'req.body.dl_txt' object as input, and returns an array of images as output
getImagesToDisplay = function(text) {
 	
 	//Set up lists
	var fullList = text.replace(/\n/g, "<br />");
	var splitList = fullList.split('*');
	var finalList = [];

	//TODO: Explain what this is doing
	finalList.push(splitList[0].match(/\d{5}/));

	//TODO: Explain what this is doing
	for (var i = 1; i < splitList.length; i++) {
		var cardCount = splitList[i].substring(1,2);
		for (var j = 0; j < cardCount; j++) {
			finalList.push(splitList[i].match(/\d{5}/));
		}
	}

	//Temporary display
	var images = 'Your deck has ' + finalList.length + ' cards and is:<br />';
	for(var i = 0; i < finalList.length; i++)
	{
   		images += imgPrefix + finalList[i] + imgPostfix;
	}

	return images;
 }