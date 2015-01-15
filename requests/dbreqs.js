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

var postPath = "http://localhost:3000/ring";
//var getPath = "http://carering.herokuapp.com/ring/11";
//var postPath = "http://carering.herokuapp.com/ring";
  // request
  //   .post(postPath)
  //   .send(body)
  //   .end(function(err, results){
  //     console.log(results.body);
  //   });
  //
  // request
  //   .get(getPath)
  //   .end(function(results){
  //     console.log(results.body);
  //   });

request
  .get(postPath)
  .end(function(results){
    console.log(results.body);
  });
