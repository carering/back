var express = require('express');
var app = express();
var config = require("./config.json");
var routes = require("./routes/routes")(config);
//console.log(config);
app.use(routes);


var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});