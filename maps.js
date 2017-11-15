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

  //leo api key= a4faaa6f019c42eabd6ba809c57f1c85
  //roy api key= 4b920f31441640c28f78a718782d5f6e
  //bruteforced through this in order to get the data. Ideally create a for loop to populate the area with the seriesID
  Promise.all([
      axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000000600000001?registrationkey=a4faaa6f019c42eabd6ba809c57f1c85'),
      axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000001000000001?registrationkey=a4faaa6f019c42eabd6ba809c57f1c85'),
      axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000003000000001?registrationkey=a4faaa6f019c42eabd6ba809c57f1c85'),
      axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000004200000001?registrationkey=a4faaa6f019c42eabd6ba809c57f1c85'),
      axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000004300000001?registrationkey=a4faaa6f019c42eabd6ba809c57f1c85'),
      axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000005000000001?registrationkey=a4faaa6f019c42eabd6ba809c57f1c85'),
      axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000005552000001?registrationkey=a4faaa6f019c42eabd6ba809c57f1c85'),
      axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000005553000001?registrationkey=a4faaa6f019c42eabd6ba809c57f1c85'),
      axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000006000000001?registrationkey=a4faaa6f019c42eabd6ba809c57f1c85'),
      axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000006054000001?registrationkey=a4faaa6f019c42eabd6ba809c57f1c85'),
      axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000006055000001?registrationkey=a4faaa6f019c42eabd6ba809c57f1c85'),
      axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000006500000001?registrationkey=a4faaa6f019c42eabd6ba809c57f1c85'),
      axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000007071000001?registrationkey=a4faaa6f019c42eabd6ba809c57f1c85'),
      axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000007072000001?registrationkey=a4faaa6f019c42eabd6ba809c57f1c85'),
      axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000009000000001?registrationkey=a4faaa6f019c42eabd6ba809c57f1c85')

    ]).then(function (response) {
      //bruteforced here to create a new object from the array that was returned in the response, this way we can send it 
      //to the frontend. This let's us manipulate the giant object to get the data we want.
      console.log('RESPONSE', response);
      var goods = response[0].data.Results.series[0];
      var mining = response[1].data.Results.series[0];
      var manuf = response[2].data.Results.series[0];
      var retail = response[3].data.Results.series[0];
      var twu = response[4].data.Results.series[0];
      var infor = response[5].data.Results.series[0];
      var finance = response[6].data.Results.series[0];
      var estate = response[7].data.Results.series[0];
      var bservices = response[8].data.Results.series[0];
      var tservices = response[9].data.Results.series[0];
      var manage = response[10].data.Results.series[0];
      var education = response[11].data.Results.series[0];
      var entertain = response[12].data.Results.series[0];
      var food = response[13].data.Results.series[0];
      var govt = response[14].data.Results.series[0];
      
      var newResponse = {
        goods: goods,
        mining: mining,
        manuf: manuf,
        retail: retail,
        twu: twu,
        infor: infor,
        finance: finance,
        estate: estate,
        bservices: bservices,
        tservices: tservices,
        manage: manage,
        education: education,
        entertain: entertain,
        food: food,
        govt: govt
        
      };
      console.log(newResponse);
      res.json(newResponse);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send({
        error: 'Something\'s not quite right'
      });
    });
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});