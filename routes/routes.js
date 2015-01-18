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

//Below are the routes for creating a ring and for
//GETing a ring for a given id

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

			pool.query('INSERT INTO t_rings (name, center, creator, event,\
				 event_date, created, message, total_brownies, status, needs, invite_list, members) VALUES ? ',
			  [ring], function(err, results){
				  if(err) console.log(err);
				  //console.log(results.insertId);
				  res.json(results);
			  });
		})
		.get(function(req,res){
			pool.query('SELECT rid, name, center, creator, event,\
				event_date, created, message, total_brownies, status, needs, invite_list, members\
				from t_rings;', function(err,results){
					if(err) console.log(err);
					//console.log(results);
					res.json(results);
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
				//console.log(results);
				res.json(results[0]);
			});
		});

//TODO need to replace underscores with dashes in responses
//Below are the routes needed for registration and for selecting a user profile based on
//user id number
	router.route("/register")
		.post(function(req, res){
			console.log(req);
			var data = req.body;
			var firstName = data.firstName;
			var lastName = data.lastName;
			var email = data.email;
			var password = data.password;
			var address = data.address;
			var phone = data.phone;
			var user = [[firstName, lastName, email, password, phone, address, "[]", 0]];
			//var user = [["Gymbeaux", "Jangles", "tbone@carering.com", "12345", "555-555-5555", "123 Street Ct", "[]", 0]];
		
			

			pool.query('INSERT INTO t_users (first_name, last_name, email, password, phone, address, rings, brownies) VALUES ? ', 
				[user], function(err, results){
				if(err) res.send(err);
				//console.log(results);
				res.json(results);
			});
		});

	router.route("/profile/:id")
		.get(function(req, res){
			var uid = req.params.id;
			console.log(uid);
			pool.query('SELECT id, first_name, last_name, email, phone, address, rings, \
			brownies from t_users where id=?;',
			 [[uid]], function(err, results){
				if(err) res.send(err);
				//console.log(results);
				res.json(results[0]);
			});
		});

// Get a list of all users in the db
// Returns an array of user objects
	router.route("/profile")
		.get(function(req, res){
			pool.query('SELECT id, first_name, last_name, email, phone, address, rings, \
			brownies from t_users;',
			function(err, results){
				if(err) console.log(err);
				//console.log(results);
				res.json(results);
			});
		});
	return router;
}
