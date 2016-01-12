/******************
 * Initialization *
 ******************/

//Import from modules and libraries
var express = require('express');
var bodyParser = require('body-parser');
var deckParser = require('./lib/deckParser');
var imgurVariable = require('./lib/imgurUpload');

//Set the .env file correctly
//Set up following this tutorial: http://kalapun.com/posts/node-js-open-source-and-secret-keys/
var fs = require('fs');
var env = require('node-env-file');

if (fs.existsSync(__dirname + '/.env' )) {
	env(__dirname + '/.env');
}

console.log("Client ID: " + process.env.CLIENT_ID);

//Initialize app
var app = express();

//Set up handlebars view engine
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Set the port
app.set('port', process.env.PORT || 3000);

//Set up static middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Create applicaton/json parser


/******************
 * Routing Table  *
 ******************/

//Testing
app.use(function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});


//Main
app.get('/', function(req, res) {
	res.render('home');
});


//About
app.get('/about', function(req, res) {
	res.render('about', { 
		pageTestScript: '/qa/tests-about.js' 
	} );
});


//Contact
app.get('/contact', function(req, res) {
	res.render('contact');
});

//Test
app.get('/test', function(req, res) {
	res.render('test', { 
		pageTestScript: '/qa/tests-testpage.js' 
	} );
});

//Receive POST with data being decklist
// TODO: return a link to the image on imgur as the response
app.post('/buildimage', function (req, res) {
	console.log('Request from decklist textarea recieved');
	var images = getImagesToDisplay(req.body.dl_txt);
	res.send(images);
});


//Custom 404
app.use( function(req, res) {
	res.status(404);
	res.render('404');
});


//Custom 500
app.use( function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

/******************
 *     Start      *
 ******************/

//Start the server
app.listen(app.get('port'), function() {
	console.log('Express started on localhost:' + app.get('port'));
})