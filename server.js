const http = require('http'),
fs = require('fs'),
Twig = require("twig"),
express = require('express'),
app = express();

app.get('/', function(req, res) {
  res.render('index.twig', {

  });
});

app.use(express.static(__dirname));

app.listen(process.env.PORT || 1189);

console.log("server listening on " + (process.env.PORT || 1189));
console.log("Visit http://localhost:" + (process.env.PORT || 1189) + " in your browser");
