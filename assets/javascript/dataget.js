var myJSON = 0;

$.getJSON('/data', function (data) {
    for (i = 0; i < data.length; i++) {

        console.log(data[i]);
        var myJSON = JSON.stringify(data[i]);
        $("#test-place").append(data[i].year + "<br>");
        $("#test-place").append(data[i].period + "<br>");
        $("#test-place").append(data[i].periodName + "<br>");
        $("#test-place").append(data[i].value + "<br><br>");
        
    };
});
