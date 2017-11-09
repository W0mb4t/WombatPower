
function initMap() {
    var startPoint = { lat: 51.321, lng: -0.150 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: startPoint
    });
    var marker = new google.maps.Marker({
        position: startPoint,
        map: map
    });
}