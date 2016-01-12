/*
 * imgurUpload.js
 * Library for uploading our deck image to imgur.
 */

/******************
 * Modules        *
 ******************/

var imgur = require('imgur');
path = require('path');


/******************
 * Variables      *
 ******************/

//Client ID linked to our imgur application.
var clientID = process.env.Client_ID;


/******************
 *  Functions     *
 ******************/

//Uploads a binary file to imgur
//Takes the
uploadToImgur = function(imageName) {
	imgur.setClientId(clientID);

	// Initialize the result link
	var resultLink;

	imgur.uploadFile(__dirname + '/../public/img/cards/' + imageName + '.png')
		.then(function (json) {
			resultLink = json.data.link;
			console.log("uploadToImgur result: " + resultLink);
		})
		.catch(function (err) {
			console.error(err.message);
		});
	while (!resultLink) {
		;
	}
	return resultLink;
}