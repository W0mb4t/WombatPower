
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var axios = require("axios");


var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static('assets'))
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html", "maps.js"));
});

app.get("/data", function (req, res) {
  Promise.all([
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000000600000001?registrationkey=4b920f31441640c28f78a718782d5f6e'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000001000000001?registrationkey=4b920f31441640c28f78a718782d5f6e'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000003000000001?registrationkey=4b920f31441640c28f78a718782d5f6e'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000004200000001?registrationkey=4b920f31441640c28f78a718782d5f6e'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000004300000001?registrationkey=4b920f31441640c28f78a718782d5f6e'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000005000000001?registrationkey=4b920f31441640c28f78a718782d5f6e'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000005552000001?registrationkey=4b920f31441640c28f78a718782d5f6e'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000005553000001?registrationkey=4b920f31441640c28f78a718782d5f6e'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000006000000001?registrationkey=4b920f31441640c28f78a718782d5f6e'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000006054000001?registrationkey=4b920f31441640c28f78a718782d5f6e'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000006055000001?registrationkey=4b920f31441640c28f78a718782d5f6e'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000006500000001?registrationkey=4b920f31441640c28f78a718782d5f6e'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000007071000001?registrationkey=4b920f31441640c28f78a718782d5f6e'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000007072000001?registrationkey=4b920f31441640c28f78a718782d5f6e'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000009000000001?registrationkey=4b920f31441640c28f78a718782d5f6e')

  ]).then(function (response) {

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

    res.json(newResponse);
  })
    .catch(function (error) {
      res.status(500).send({ error: 'Something\'s not quite right' });
    });
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});