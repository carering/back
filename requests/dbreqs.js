//Will use this to populate and query db for testing purposes
var request = require('superagent');

var body = {
  name: "James Rules",
  center: "James Stiehl",
  creator: "James Stiehl",
  needs: "",
  event: "James got a car!",
  eventDate: Date.now(),
  created: Date.now(),
  message: "Buy me another car!",
  inviteList: "",
  members: "",
  requests: "",
  totalBrownies: 0,
  status: 1
};

//var getRingsPath = "http://localhost:3000/ring";
// var getRingPath = "http://carering.herokuapp.com/ring/11";
// var postRingPath = "http://carering.herokuapp.com/ring";
// var getRingsPath = "http://carering.herokuapp.com/ring";
// var getUser = "http://carering.herokuapp.com/profile/11";
// var getUsers = "http://carering.herokuapp.com/profile";

var getRingPath = "http://localhost:3000/ring/11";
var postRingPath = "http://localhost:3000/ring";
var getRingsPath = "http://localhost:3000/ring";
var getUser = "http://localhost:3000/profile/11";
var getUsers = "http://localhost:3000/profile";

var gets = [];

gets.push(getRingPath);
gets.push(getRingsPath);
gets.push(getUser);
gets.push(getUsers);
console.log(gets);
post(postRingPath);

gets.forEach(function(paths){
  getData(paths);
})

function post(postPath){
  request
    .post(postPath)
    .send(body)
    .end(function(err, results){
      console.log(results.body);
  });
}

function getData(postPath){
  request
    .get(postPath)
    .end(function(results){
      console.log(results.body);
    });
}
