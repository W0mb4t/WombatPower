
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var axios = require("axios");
var dataString = "SMU06112445000000001";
var dataArray = dataString.split(" ");

// var dataArray = {"seriesid":["SMU06112445000000001", "LASST060000000000004", "LASST060000000000005"]};
// console.log(dataArray);

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static('assets'))
app.use(express.static('public'));
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html", "maps.js"));

});

app.get("/data/:hotdog/:soda?", function (req, res) {
  console.log(req.params.soda);
  console.log(req.params.hotdog);
  axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/' + req.params.hotdog + '?registrationkey=a4faaa6f019c42eabd6ba809c57f1c85')
    .then(function (response) {
      // console.log(response);
      res.json(response.data.Results.series[0].data);
    })
    .catch(function (error) {
      // console.log(error);
      res.status(500).send({ error: 'Something\'s not quite right' });
    });
});

// app.get("/add", function(req, res) {
//   res.sendFile(path.join(__dirname, "add.html"));
// });

// app.get("/all", function(req, res) {
//   res.sendFile(path.join(__dirname, "all.html"));
// });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});