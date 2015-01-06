var express = require('express');
var bodyparser = require('body-parser');
var mysql = require('mysql');
var async = require('async');

var router = express.Router();

module.exports = function(config) {
	var pool = mysql.createPool(config.mysql);
	console.log(config.mysql);
	router.use(bodyparser.json());

	router.route("/")
		.get(function(req,res){
			res.send("Hello James!");
		});

	router.route("/register")
		.post(function(req, res){
			var data = req.body;

			pool.query('SELECT email from t_users where id=?', [[1]], function(err, results){
				if(err) console.log(err);
				console.log(results);
				res.send("Registration information is: " + JSON.stringify(data)+"\n");
			});	
		});

	router.route("/profile/:email")
		.get(function(req, res){
			var email = req.params.email;
			console.log(email);

			pool.query('SELECT first_name, last_name, email, phone, address, rings, brownies from t_users where email=?', [[email]], function(err, results){
				if(err) console.log(err);
				console.log(results);
				res.send(JSON.stringify(results[0]));
			});	

		});

	return router;
}
