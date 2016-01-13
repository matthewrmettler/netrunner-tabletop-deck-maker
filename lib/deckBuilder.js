/*
 * deckParser.js
 * Library for parsing the user input into making a deck image.
 */

/******************
 * Libraries      *
 ******************/

var fs = require('fs');
var gm = require('gm')
  , igm = gm.subClass({ imageMagick: true });


/******************
 * Variables      *
 ******************/

// URL Prefix for the card images
var cardsPrefix = __dirname + '/../public/img/cards/';

// Image extension
var cardsPostfix = '.png';

// Max rows for deck image
var maxRows = 7;

// Max columns for deck image
var maxCols = 10;

// Keep track of rows written by im; when we reach max rows, append em all vertically
var finishedRowCount = 0;

// Current ImageMagick State
var imstate;

// Path to black placeholder card image
var cardBlackPath = cardsPrefix + 'black' + cardsPostfix;

// Path to none placeholder card image
var cardNonePath = cardsPrefix + 'none' + cardsPostfix;

/******************
 *  Functions     *
 ******************/

appendVertically = function(currentPrefix, callback) {
	if (finishedRowCount < maxRows - 1) {
		finishedRowCount++;
	} else {
		console.log('Starting full composite');
		finishedRowCount = 0;
		for (var i = 0; i < maxRows; i++) {
			if (i == 0) {
				imstate = igm().append(currentPrefix + i + cardsPostfix);
			} else {
				imstate.append(currentPrefix + i + cardsPostfix);
			}
		}
		imstate.write(currentPrefix + 'full' + cardsPostfix, function(err) {
			if (!err) {
				callback(currentPrefix);
			}
		});
	}
}

// Creates the first part of the row
function createIMStateHorizontal(path) {
	if (fs.existsSync(path)){
    	imstate = igm().append(path, true);
	} else {
    	imstate = igm().append(cardNonePath, true);
	}

}

function appendToIMStateHorizontal(path) {
	if (fs.existsSync(path)){
    	imstate.append(path, true);
	} else {
    	imstate.append(cardNonePath, true);
	}

}

createDeckImage = function(cards, callback) {
	//var imageName = images[0];
	//return __dirname + '/../public/img/cards/' + imageName + '.png'

	// We need this so we know when to start entering blanks
	var cardCount = cards.length;

	// Generate a completely and totally random number to assign to the folder in which we will be doing the compositing.
	var date = new Date();
	compositesPrefix = __dirname + '/../public/img/composites/' + date.getTime() + '/';  // <-- Completely and totally random

	if (!fs.existsSync(__dirname + '/../public/img/composites/')){
    	fs.mkdirSync(__dirname + '/../public/img/composites/');
	}

	fs.mkdir(compositesPrefix);

	// We init a card counter outside of the horizontal loops;
	// need to keep track of card count to know when to start entering blanks.
	var curCount = 0;


	// First create all the rows
	for (var i = 0; i < maxRows; i++) {
		for (var j = 0; j < maxCols; j++) {
			if (curCount < cardCount) {
				if (j == 0) {
					createIMStateHorizontal(cardsPrefix + cards[i*10 + j] + cardsPostfix);
				} else {
					appendToIMStateHorizontal(cardsPrefix + cards[i*10 + j] + cardsPostfix);
				}
			} else {
				if (j == 0) {
					imstate = igm(cardBlackPath);
				} else {
					imstate.append(cardBlackPath, true);
				}				
			}
			curCount++;
		}
		imstate.write(compositesPrefix + i + cardsPostfix, function (err) {
  			if (!err) {
  				console.log('Wrote row!');
				appendVertically(compositesPrefix, callback);
  			}
		});
	}
}