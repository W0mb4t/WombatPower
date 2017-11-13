var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function (req, res, next) {
    var context = {
        test: 'test'
    };
    console.log('test');
    res.render('bls', context);
    console.log(context);
    
});

router.post('/data/', function (req, res, next) {
    console.log('b');

    if (req.body['Add Series']) {
        var context = {};
        context.results = [];
        console.log('c');
        request({
            "url": "https://api.bls.gov/publicAPI/v2/timeseries/data/APU0000702421",
            "method": "POST",
            "headers": { "Content-Type": "application/json" },
            "body": '{"seriesid":["' + req.body.series + '"], "startyear": "' + req.body.syear + '", "endyear": "' + req.body.eyear + '"}'
        },

            function (err, response, body) {
                if (!err && response.statusCode < 400) {
                    var parsedBody = JSON.parse(body);
                    var index = 0;
                    console.log(parsedBody);
                    console.log(body);

                    while (parsedBody.Results.series[0].data[index] != undefined) {
                        context.results.push({
                            "year": parsedBody.Results.series[0].data[index].year,
                            "month": parsedBody.Results.series[0].data[index].periodName,
                            "value": parsedBody.Results.series[0].data[index].value
                        });
                        index = index + 1;
                    }
                    res.send(body);
                } else {
                    if (response) {
                        console.log(response.statusCode);
                    }
                    res.pipe('500');
                    console.log('d');

                }
            });
    }
});
module.exports = router;