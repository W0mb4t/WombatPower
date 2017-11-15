
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var axios = require("axios");
var dataString = "ENU0600010010 ENU0600110010 ENU0600310010 ENU0600510010 ENU0600710010 ENU0600910010 ENU0601110010 ENU0601310010 ENU0601510010 ENU0601710010 ENU0601910010 ENU0602110010 ENU0602310010 ENU0602510010 ENU0602710010 ENU0602910010 ENU0603110010 ENU0603310010 ENU0603510010 ENU0603710010 ENU0603910010 ENU0604110010 ENU0604310010 ENU0604510010 ENU0604710010 ENU0604910010 ENU0605110010 ENU0605310010 ENU0605510010 ENU0605710010 ENU0605910010 ENU0606110010 ENU0606310010 ENU0606510010 ENU0606710010 ENU0606910010 ENU0607110010 ENU0607310010 ENU0607510010 ENU0607710010 ENU0607910010 ENU0608110010 ENU0608310010 ENU0608510010 ENU0608710010 ENU0608910010 ENU0609110010 ENU0609310010 ENU0609510010 ENU0609710010 ENU0609910010 ENU0610110010 ENU0610310010 ENU0610510010 ENU0610710010 ENU0610910010 ENU0611110010 ENU0611310010 ENU0611510010";
var dataArray = dataString.split(" ");
console.log(dataArray);

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

app.get("/data", function (req, res) {
  axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/' + dataArray[0] + '?registrationkey=4b920f31441640c28f78a718782d5f6e')
    .then(function (response) {
      console.log(response);
      res.json(response.data.Results.series[0].data);
    })
    .catch(function (error) {
      console.log(error);
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