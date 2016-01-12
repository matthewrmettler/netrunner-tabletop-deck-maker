/*
 * imgurUpload.js
 * Library for uploading our deck image to imgur.
 */

/******************
 * Variables      *
 ******************/

//Client ID linked to our imgur application.
var clientID = process.env.Client_ID;
  
/******************
 *  Functions     *
 ******************/

//Uploads a binary file to imgur
function uploadToImgur(binary_file) {
	var auth = 'Client-ID ' + clientId;

	$.ajax({
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
}