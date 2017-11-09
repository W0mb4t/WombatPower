function initMap() {
    var uluru = { lat: -25.363, lng: 131.044 };
    var london = { lat: 51.321, lng: -0.150 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: london
    });
    var marker = new google.maps.Marker({
        position: london,
        map: map
    });
}