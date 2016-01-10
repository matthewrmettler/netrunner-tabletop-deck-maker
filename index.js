/******************
 * Initialization *
 ******************/

//Import from modules and libraries
var express = require('express');
var bodyParser = require('body-parser');

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
app.use(bodyParser.json());

// Create applicaton/json parser
var jsonParser = bodyParser.json();


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

//Receive POST with data being decklist
// TODO: return a link to the image on imgur as the response
app.post('/buildimage', function (req, res) {
	//console.log(req);
	console.log('Request from decklist textarea receieved');
	console.log(req.body.dl_txt);
	res.send('You sent:' + req.body.decklist_text);
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