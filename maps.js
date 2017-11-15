var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var axios = require("axios");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
var dataArr = ['SMU06112445000000001', 'SMU06125405000000001', 'SMU06170205000000001', 'SMU06209405000000001', 'SMU06234205000000001', 'SMU06252605000000001', 'SMU06310805000000001', 'SMU06310845000000001', 'SMU06314605000000001', 'SMU06329005000000001', 'SMU06337005000000001', 'SMU06349005000000001', 'SMU06360845000000001', 'SMU06371005000000001', 'SMU06398205000000001', 'SMU06401405000000001', 'SMU06409005000000001', 'SMU06415005000000001', 'SMU06417405000000001', 'SMU06418605000000001', 'SMU06418845000000001', 'SMU06419405000000001', 'SMU06420205000000001', 'SMU06420345000000001', 'SMU06421005000000001', 'SMU06422005000000001', 'SMU06422205000000001', 'SMU06447005000000001', 'SMU06467005000000001', 'SMU06473005000000001', 'SMU06497005000000001']

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static('assets'))
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/data", function (req, res) {
  for (var i = 0; i < dataArr.length; i++) {
    dataArr[i];
    console.log(dataArr[i]);
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/' + dataArr[i] + '?registrationkey=4b920f31441640c28f78a718782d5f6e')  
    .then(function (response) {
      var newArr = [];
      newArr.push(response);
        console.log(newArr);
        res.json(newArr[1]);
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).send({
          error: 'Something\'s not quite right'
        });
      });
  }

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