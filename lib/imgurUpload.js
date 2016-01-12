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
uploadToImgur = function(imageName) {
	imgur.setClientId(clientID);

	// Initialize the result link
	var resultLink = '';

	imgur.uploadFile(__dirname + '/../public/img/cards/00005.png')
		.then(function (json) {
			resultLink = json.data.link;
			console.log(resultLink);

		})
		.catch(function (err) {
			console.error(err.message);
		});

	return resultLink;

/*
	$().ajax({
		url: 'https://api.imgur.com/3/image',
		type: 'POST',
		headers: {
			Authorization: auth,
			Accept: 'application/json'
		},
		data: {
			image: binary_file,
			type: 'binary'
		},
		success: function(result) {
			var id = result.data.id;
			console.log("Imgur upload callback, result id: " + id);
			//Where's the image? idk what to do lmao
			console.log("Result: " + JSON.stringify(result));	
		}
	});
*/
}