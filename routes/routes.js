var express = require('express');
var bodyparser = require('body-parser');
var mysql = require('mysql');
var async = require('async');
var url = require('url');

var router = express.Router();

module.exports = function(config) {
	var pool = mysql.createPool(config.mysql);
	//console.log(config.mysql);
	router.use(bodyparser.json());

	router.route("/")
		.get(function(req,res){
			res.send("Hello James!");
		});
	
	router.route("/status")
		.get(function(req,res){
			console.log(url.parse("http://"+req.headers.host).port);
			res.send("Listening on port: "+ url.parse("http://"+req.headers.host).port);
		});		

	router.route("/ring")
		.post(function(req, res){
			//var data = req.body;
			var user = [["Abby Baby", "Abby Stevens", "[]", "Abby had a baby!", "James", "Please join", 0, 1]];
			pool.query('INSERT INTO t_rings (name, center, needs, event, created, message, total_brownies, status) VALUES ? ', [user], function(err, results){
				if(err) console.log(err);
				console.log(results);
				res.send(JSON.stringify(results));
			});	
		});

	router.route("/register")
		.post(function(req, res){
			//var data = req.body;
			var user = [["Gymbeaux", "Jangles", "tbone@carering.com", "12345", "555-555-5555", "123 Street Ct", "[]", 0]];
			pool.query('INSERT INTO t_users (first_name, last_name, email, password, phone, address, rings, brownies) VALUES ? ', [user], function(err, results){
				if(err) console.log(err);
				console.log(results);
				res.send(JSON.stringify(results));
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
