var express = require('express');
var bodyparser = require('body-parser');
var mysql = require('mysql');

var router = express.Router();

module.exports = function(config) {
	var pool = mysql.createPool(config.mysql);

	router.route("/")
		.get(function(req,res){
			res.send("Hello James!");
		});

	return router;
}