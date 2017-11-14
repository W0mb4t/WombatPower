var myJSON = 0;

$.getJSON('/data', function (data) {
    for (i = 0; i < data.length; i++) {

        console.log(data[i]);
        var myJSON = JSON.stringify(data[i]);
        document.write(data[i].year + "<br>");
        document.write(data[i].period + "<br>");
        document.write(data[i].periodName + "<br>");
        document.write(data[i].value + "<br><br>");
        
    };
});
