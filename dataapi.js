
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
  res.sendFile(path.join(__dirname, "index.html", "data.html", "about.html", "maps.js"));
});

app.get("/data", function (req, res) {
  // Extra API Keys: d17ddaa6addf4f2d8068222b736ea817 ; ae16ac12483a44eaaf5fc0079150c5ba ;
  Promise.all([
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000000600000001?registrationkey=ae16ac12483a44eaaf5fc0079150c5ba'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000001000000001?registrationkey=ae16ac12483a44eaaf5fc0079150c5ba'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000003000000001?registrationkey=ae16ac12483a44eaaf5fc0079150c5ba'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000004200000001?registrationkey=ae16ac12483a44eaaf5fc0079150c5ba'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000004300000001?registrationkey=ae16ac12483a44eaaf5fc0079150c5ba'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000005000000001?registrationkey=ae16ac12483a44eaaf5fc0079150c5ba'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000005552000001?registrationkey=ae16ac12483a44eaaf5fc0079150c5ba'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000005553000001?registrationkey=ae16ac12483a44eaaf5fc0079150c5ba'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000006000000001?registrationkey=ae16ac12483a44eaaf5fc0079150c5ba'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000006054000001?registrationkey=ae16ac12483a44eaaf5fc0079150c5ba'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000006055000001?registrationkey=ae16ac12483a44eaaf5fc0079150c5ba'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000006500000001?registrationkey=ae16ac12483a44eaaf5fc0079150c5ba'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000007071000001?registrationkey=ae16ac12483a44eaaf5fc0079150c5ba'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000007072000001?registrationkey=ae16ac12483a44eaaf5fc0079150c5ba'),
    axios.post('https://api.bls.gov/publicAPI/v2/timeseries/data/SMS06000009000000001?registrationkey=ae16ac12483a44eaaf5fc0079150c5ba')

  ]).then(function (response) {

    var Goods = response[0].data.Results.series[0];
    var Mining = response[1].data.Results.series[0];
    var Manufacturing = response[2].data.Results.series[0];
    var Retail = response[3].data.Results.series[0];
    var Transportation = response[4].data.Results.series[0];
    var Information = response[5].data.Results.series[0];
    var Finance = response[6].data.Results.series[0];
    var Estate = response[7].data.Results.series[0];
    var Business = response[8].data.Results.series[0];
    var Technical = response[9].data.Results.series[0];
    var Management = response[10].data.Results.series[0];
    var Education = response[11].data.Results.series[0];
    var Entertainment = response[12].data.Results.series[0];
    var Accomodation = response[13].data.Results.series[0];
    var Government = response[14].data.Results.series[0];

    var newResponse = {
      Goods: Goods,
      Mining: Mining,
      Manufacturing: Manufacturing,
      Retail: Retail,
      Transportation: Transportation,
      Information: Information,
      Finance: Finance,
      Estate: Estate,
      Business: Business,
      Technical: Technical,
      Management: Management,
      Education: Education,
      Entertainment: Entertainment,
      Accomodation: Accomodation,
      Government: Government,
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