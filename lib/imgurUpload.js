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
uploadToImgur = function(imageName, callback) {
	imgur.setClientId(clientID);

	console.log('Trying to upload file to imgur: ' + imageName);
	imgur.uploadFile(imageName)
		.then(function (json) {
			callback(json.data.link);
		})
		.catch(function (err) {
			console.error(err.message);
		});
}