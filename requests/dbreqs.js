//Will use this to populate and query db for testing purposes
var request = require('superagent');

var body = {
  name: "James' Test Ring",
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

var path = "http://localhost:3000/ring/11";

// request
//   .post(path)
//   .send(body)
//   .end(function(err, results){
//     console.log(results);
//   });

request
  .get(path)
  .end(function(results){
    console.log(results.body);
  })
