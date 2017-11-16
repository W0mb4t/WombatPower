var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 33.640495, lng: -117.844296 },
        zoom: 4,
        styles:
        [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#212121"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#212121"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#181818"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1b1b1b"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#2c2c2c"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8a8a8a"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#373737"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#3c3c3c"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#4e4e4e"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#3d3d3d"
                    }
                ]
            }
        ]
    });

    var layer = new google.maps.FusionTablesLayer({
        query: {
            select: '\'Geocodable address\'',
            from: '10-15741He9QL1OYhAUdTwVaQaFhZLe-1DvXguGru'
        }
    });
    layer.setMap(map);
    infoWindow = new google.maps.InfoWindow;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
            map.setZoom(10);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function openNav() {
    document.getElementById("mySidenav").style.width = "50%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    $(".nav-buttons").style = "0";
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("top-button").style.display = "block";
    } else {
        document.getElementById("top-button").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera 
    document.documentElement.scrollTop = 0; // For IE and Firefox
}



$.getJSON('/data', function (data) {
    
    $("#aco-buttons").on('click', function () {
        var buttonID = $(this).html();
        console.log(buttonID);

        $("#name-data").html("<em>Series ID:   </em><b>" + data.Accomodation.seriesID + "</b>");
        $("#industry-data").html("<em>Industry:  </em><b>" + buttonID + "</b>")
        $("#date-data").html("<br><em>Month:   </em><b>" + data.Accomodation.data[0].periodName + "<br></b>");
        $("#year-data").html("<em>Year:   </em><b>" + data.Accomodation.data[(data.Accomodation.data.length - 1)].year + " - " + data.Accomodation.data[0].year + "<br></b>");
        $("#unemployment-data").html("<em>Increase in employment (thousands):   </em><b>" + (data.Accomodation.data[0].value - (data.Accomodation.data[(data.Accomodation.data.length - 1)].value)) + "<br><br></b>");
    });
});
$.getJSON('/data', function (data) {
    $("#bus-buttons").on('click', function () {
        var buttonID = $(this).html();
        console.log(buttonID);

        $("#name-data").html("<em>Series ID:   </em><b>" + data.Business.seriesID + "</b>");
        $("#industry-data").html("<em>Industry:  </em><b>" + buttonID + "</b>")        
        $("#date-data").html("<br><em>Month:   </em><b>" + data.Business.data[0].periodName + "<br></b>");
        $("#year-data").html("<em>Year:   </em><b>" + data.Business.data[(data.Business.data.length - 1)].year + " - " + data.Business.data[0].year + "<br></b>");
        $("#unemployment-data").html("<em>Increase in employment (thousands):   </em><b>" + (data.Business.data[0].value - (data.Business.data[(data.Business.data.length - 1)].value)) + "<br><br></b>");
    });
});
$.getJSON('/data', function (data) {
    $("#edu-buttons").on('click', function () {
        var buttonID = $(this).html();
        console.log(buttonID);

        $("#name-data").html("<em>Series ID:   </em><b>" + data.Education.seriesID + "</b>");
        $("#industry-data").html("<em>Industry:  </em><b>" + buttonID + "</b>")      
        $("#date-data").html("<br><em>Month:   </em><b>" + data.Education.data[0].periodName + "<br></b>");
        $("#year-data").html("<em>Year:   </em><b>" + data.Education.data[(data.Education.data.length - 1)].year + " - " + data.Education.data[0].year + "<br></b>");
        $("#unemployment-data").html("<em>Increase in employment (thousands):   </em><b>" + (data.Education.data[0].value - (data.Education.data[(data.Education.data.length - 1)].value)) + "<br><br></b>");
    });
});
$.getJSON('/data', function (data) {
    $("#ent-buttons").on('click', function () {
        var buttonID = $(this).html();
        console.log(buttonID);

        $("#name-data").html("<em>Series ID:   </em><b>" + data.Entertainment.seriesID + "</b>");
        $("#industry-data").html("<em>Industry:  </em><b>" + buttonID + "</b>")        
        $("#date-data").html("<br><em>Month:   </em><b>" + data.Entertainment.data[0].periodName + "<br></b>");
        $("#year-data").html("<em>Year:   </em><b>" + data.Entertainment.data[(data.Entertainment.data.length - 1)].year + " - " + data.Entertainment.data[0].year + "<br></b>");
        $("#unemployment-data").html("<em>Increase in employment (thousands):   </em><b>" + (data.Entertainment.data[0].value - (data.Entertainment.data[(data.Entertainment.data.length - 1)].value)) + "<br><br></b>");
    });
});
$.getJSON('/data', function (data) {
    $("#est-buttons").on('click', function () {
        var buttonID = $(this).html();
        console.log(buttonID);

        $("#name-data").html("<em>Series ID:   </em><b>" + data.Estate.seriesID + "</b>");
        $("#industry-data").html("<em>Industry:  </em><b>" + buttonID + "</b>")        
        $("#date-data").html("<br><em>Month:   </em><b>" + data.Estate.data[0].periodName + "<br></b>");
        $("#year-data").html("<em>Year:   </em><b>" + data.Estate.data[(data.Estate.data.length - 1)].year + " - " + data.Estate.data[0].year + "<br></b>");
        $("#unemployment-data").html("<em>Increase in employment (thousands):   </em><b>" + (data.Estate.data[0].value - (data.Estate.data[(data.Estate.data.length - 1)].value)) + "<br><br></b>");
    });
});
$.getJSON('/data', function (data) {
    $("#fin-buttons").on('click', function () {
        var buttonID = $(this).html();
        console.log(buttonID);

        $("#name-data").html("<em>Series ID:   </em><b>" + data.Finance.seriesID + "</b>");
        $("#industry-data").html("<em>Industry:  </em><b>" + buttonID + "</b>")        
        $("#date-data").html("<br><em>Month:   </em><b>" + data.Finance.data[0].periodName + "<br></b>");
        $("#year-data").html("<em>Year:   </em><b>" + data.Finance.data[(data.Finance.data.length - 1)].year + " - " + data.Finance.data[0].year + "<br></b>");
        $("#unemployment-data").html("<em>Increase in employment (thousands):   </em><b>" + (data.Finance.data[0].value - (data.Finance.data[(data.Finance.data.length - 1)].value)) + "<br><br></b>");
    });
});
$.getJSON('/data', function (data) {
    $("#goo-buttons").on('click', function () {
        var buttonID = $(this).html();
        console.log(buttonID);

        $("#name-data").html("<em>Series ID:   </em><b>" + data.Goods.seriesID + "</b>");
        $("#industry-data").html("<em>Industry:  </em><b>" + buttonID + "</b>")                
        $("#date-data").html("<br><em>Month:   </em><b>" + data.Goods.data[0].periodName + "<br></b>");
        $("#year-data").html("<em>Year:   </em><b>" + data.Goods.data[(data.Goods.data.length - 1)].year + " - " + data.Goods.data[0].year + "<br></b>");
        $("#unemployment-data").html("<em>Increase in employment (thousands):   </em><b>" + (data.Goods.data[0].value - (data.Goods.data[(data.Goods.data.length - 1)].value)) + "<br><br></b>");
    });
});
$.getJSON('/data', function (data) {
    $("#gov-buttons").on('click', function () {
        var buttonID = $(this).html();
        console.log(buttonID);

        $("#name-data").html("<em>Series ID:   </em><b>" + data.Government.seriesID + "</b>");
        $("#industry-data").html("<em>Industry:  </em><b>" + buttonID + "</b>")        
        $("#date-data").html("<br><em>Month:   </em><b>" + data.Government.data[0].periodName + "<br></b>");
        $("#year-data").html("<em>Year:   </em><b>" + data.Government.data[(data.Government.data.length - 1)].year + " - " + data.Government.data[0].year + "<br></b>");
        $("#unemployment-data").html("<em>Increase in employment (thousands):   </em><b>" + (data.Government.data[0].value - (data.Government.data[(data.Government.data.length - 1)].value)) + "<br><br></b>");
    });
});
$.getJSON('/data', function (data) {
    $("#inf-buttons").on('click', function () {
        var buttonID = $(this).html();
        console.log(buttonID);

        $("#name-data").html("<em>Series ID:   </em><b>" + data.Information.seriesID + "</b>");
        $("#industry-data").html("<em>Industry:  </em><b>" + buttonID + "</b>")        
        $("#date-data").html("<br><em>Month:   </em><b>" + data.Information.data[0].periodName + "<br></b>");
        $("#year-data").html("<em>Year:   </em><b>" + data.Information.data[(data.Information.data.length - 1)].year + " - " + data.Information.data[0].year + "<br></b>");
        $("#unemployment-data").html("<em>Increase in employment (thousands):   </em><b>" + (data.Information.data[0].value - (data.Information.data[(data.Information.data.length - 1)].value)) + "<br><br></b>");
    });
});
$.getJSON('/data', function (data) {
    $("#man-buttons").on('click', function () {
        var buttonID = $(this).html();
        console.log(buttonID);

        $("#name-data").html("<em>Series ID:   </em><b>" + data.Management.seriesID + "</b>");
        $("#date-data").html("<br><em>Month:   </em><b>" + data.Management.data[0].periodName + "<br></b>");
        $("#year-data").html("<em>Year:   </em><b>" + data.Management.data[(data.Management.data.length - 1)].year + " - " + data.Management.data[0].year + "<br></b>");
        $("#unemployment-data").html("<em>Increase in employment (thousands):   </em><b>" + (data.Management.data[0].value - (data.Management.data[(data.Management.data.length - 1)].value)) + "<br><br></b>");
    });
});
$.getJSON('/data', function (data) {
    $("#manu-buttons").on('click', function () {
        var buttonID = $(this).html();
        console.log(buttonID);

        $("#name-data").html("<em>Series ID:   </em><b>" + data.Manufacturing.seriesID + "</b>");
        $("#industry-data").html("<em>Industry:  </em><b>" + buttonID + "</b>")        
        $("#date-data").html("<br><em>Month:   </em><b>" + data.Manufacturing.data[0].periodName + "<br></b>");
        $("#year-data").html("<em>Year:   </em><b>" + data.Manufacturing.data[(data.Manufacturing.data.length - 1)].year + " - " + data.Manufacturing.data[0].year + "<br></b>");
        $("#unemployment-data").html("<em>Increase in employment (thousands):   </em><b>" + (data.Manufacturing.data[0].value - (data.Manufacturing.data[(data.Manufacturing.data.length - 1)].value)) + "<br><br></b>");
    });
});
$.getJSON('/data', function (data) {
    $("#min-buttons").on('click', function () {
        var buttonID = $(this).html();
        console.log(buttonID);

        $("#name-data").html("<em>Series ID:   </em><b>" + data.Mining.seriesID + "</b>");
        $("#industry-data").html("<em>Industry:  </em><b>" + buttonID + "</b>")        
        $("#date-data").html("<br><em>Month:   </em><b>" + data.Mining.data[0].periodName + "<br></b>");
        $("#year-data").html("<em>Year:   </em><b>" + data.Mining.data[(data.Mining.data.length - 1)].year + " - " + data.Mining.data[0].year + "<br></b>");
        $("#unemployment-data").html("<em>Increase in employment (thousands):   </em><b>" + (data.Mining.data[0].value - (data.Mining.data[(data.Mining.data.length - 1)].value)) + "<br><br></b>");
    });
});
$.getJSON('/data', function (data) {
    $("#ret-buttons").on('click', function () {
        var buttonID = $(this).html();
        console.log(buttonID);

        $("#name-data").html("<em>Series ID:   </em><b>" + data.Retail.seriesID + "</b>");
        $("#industry-data").html("<em>Industry:  </em><b>" + buttonID + "</b>")        
        $("#date-data").html("<br><em>Month:   </em><b>" + data.Retail.data[0].periodName + "<br></b>");
        $("#year-data").html("<em>Year:   </em><b>" + data.Retail.data[(data.Retail.data.length - 1)].year + " - " + data.Retail.data[0].year + "<br></b>");
        $("#unemployment-data").html("<em>Increase in employment (thousands):   </em><b>" + (data.Retail.data[0].value - (data.Retail.data[(data.Retail.data.length - 1)].value)) + "<br><br></b>");
    });
});
$.getJSON('/data', function (data) {
    $("#tec-buttons").on('click', function () {
        var buttonID = $(this).html();
        console.log(buttonID);

        $("#name-data").html("<em>Series ID:   </em><b>" + data.Technical.seriesID + "</b>");
        $("#industry-data").html("<em>Industry:  </em><b>" + buttonID + "</b>")        
        $("#date-data").html("<br><em>Month:   </em><b>" + data.Technical.data[0].periodName + "<br></b>");
        $("#year-data").html("<em>Year:   </em><b>" + data.Technical.data[(data.Technical.data.length - 1)].year + " - " + data.Technical.data[0].year + "<br></b>");
        $("#unemployment-data").html("<em>Increase in employment (thousands):   </em><b>" + (data.Technical.data[0].value - (data.Technical.data[(data.Technical.data.length - 1)].value)) + "<br><br></b>");
    });
});
$.getJSON('/data', function (data) {
    $("#tra-buttons").on('click', function () {
        var buttonID = $(this).html();
        console.log(buttonID);

        $("#name-data").html("<em>Series ID:   </em><b>" + data.Transportation.seriesID + "</b>");
        $("#industry-data").html("<em>Industry:  </em><b>" + buttonID + "</b>")        
        $("#date-data").html("<br><em>Month:   </em><b>" + data.Transportation.data[0].periodName + "<br></b>");
        $("#year-data").html("<em>Year:   </em><b>" + data.Transportation.data[(data.Transportation.data.length - 1)].year + " - " + data.Transportation.data[0].year + "<br></b>");
        $("#unemployment-data").html("<em>Increase in employment (thousands):   </em><b>" + (data.Transportation.data[0].value - (data.Transportation.data[(data.Transportation.data.length - 1)].value)) + "<br><br></b>");
    });
});