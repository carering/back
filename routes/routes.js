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
			var data = req.body;
			var name = data.name;
			var creator = data.creator;
			var center = creator;
			var event = data.event;
			var eventDate = data.eventDate;
			var created = Date.now();
			var message = data.message;
			var totalBrownies = 0; // this will need to be autocalculated most likely
			var status = 1;
			var needs = ""; // this should go away with db redesign
			var inviteList = ""; // this should go away with db redesign
			var members = ""; // this should go away with db redesign

			var ring = [[name, creator, center, event, eventDate, created, message,
			  totalBrownies, status, needs, inviteList, members]];

			//var ring = [["Abby Baby", "Abby Stevens", "Abby Stevens", "Abby had a baby!",
			//Date.now(), Date.now(), "Please join", 0, 1, "asdf", "asdafs", "asd"]];
			pool.query('INSERT INTO t_rings (name, center, creator, event,\
				 event_date, created, message, total_brownies, status, needs, invite_list, members) VALUES ? ',
			  [ring], function(err, results){
				  if(err) console.log(err);
				  console.log(results);
				  res.send(JSON.stringify(results));
			  });
		});

  router.route('/ring/:id')
		.get(function(req,res){
			var rid = req.params.id;
			var sql = "SELECT rid, name, center, creator, event, event_date, created,\
			 message, total_brownies, status, needs, invite_list, members\
			 from t_rings\
			 where rid = ?;"
			 pool.query(sql,[[rid]], function(err, results){
				console.log(results);
				res.send(results[0]);
			})
		});

	router.route("/register")
		.post(function(req, res){
			//var data = req.body;
			var user = [["Abby", "Stevens", "abby@carering.com", "12345", "555", "12 Street Ct", "[]", 0]];
			pool.query('INSERT INTO t_users (first_name, last_name, email, password, phone, address, rings, brownies) VALUES ? ', [user], function(err, results){
				if(err) console.log(err);
				console.log(results);
				res.send("Registration information is: " + JSON.stringify(results)+"\n");
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
