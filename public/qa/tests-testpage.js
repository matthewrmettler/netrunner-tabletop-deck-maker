suite('Testpage Tests', function() {
	test('Uploading file to imgur works', function() {
		assert(imgurVariable.uploadToImgur("/img/cards/00005.png"));
	});
});