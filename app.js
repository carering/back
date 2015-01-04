var express = require('express');
var app = express();
var routes = require("./routes/routes");
var config = require("./config.json")


app.use(bodyparser.json());

app.use(routes);

app.get('/', function (req, res) {
  res.send('Hello World!')
});

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});