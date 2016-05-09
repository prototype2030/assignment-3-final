var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var FertilityRate = mongoose.model('FertilityRate');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated()){
		return next();
	}
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport) {

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/index', passport.authenticate('index', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/register', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/register', passport.authenticate('register', {
		successRedirect: '/home',
		failureRedirect: '/register',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// route for facebook authentication and login
	// different scopes while logging in
	router.get('/login/facebook', 
		passport.authenticate('facebook', { scope : 'email' }
	));

	// handle the callback after facebook has authenticated the user
	router.get('/login/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/home',
			failureRedirect : '/'
		})
	);
	
	//MLL - data route, only if authenticated!
	router.get('/data', isAuthenticated, function(req, res, next) {
	  GraphData.find({}, {_id: 0}, function(err, data){
	  if(err){ return next(err); }
	  	res.json(data);
	  });
	});

	return router;
}

/*  GET Fertility Rates */
router.get('/fertility-rates', function(req, res, next) {
  FertilityRate.find(function(err, data){
    if(err){ return next(err); }
    
    res.json(data);
  });
});


