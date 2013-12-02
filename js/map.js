var map = L.map('map', {
    center: [-0.8788717828324148, 29.003906249999996],
    zoom: 3,
    minZoom: 3
});

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

var sidebar = L.control.sidebar('sidebar', {
    closeButton: true,
    position: 'left'
});

map.addControl(sidebar);

map.on('click', function () {
    sidebar.hide();
});

function onEachFeature(feature, layer) {

    layer.on('click', locationClick);
}

var skateaid = L.geoJson(skateaidlocations, {

    onEachFeature: onEachFeature,

}).addTo(map);

function locationClick(feature){

    var title = document.getElementById('title');
    var country = document.getElementById('country');
    var description = document.getElementById('description');
    var partner = document.getElementById('partner');
    var begin = document.getElementById('begin');

    var where = feature.target.feature.properties.country + ", " + feature.target.feature.properties.location

    title.innerHTML = feature.target.feature.properties.location;
    country.innerHTML = where;
    description.innerHTML = feature.target.feature.properties.description;
    partner.innerHTML = feature.target.feature.properties.partner;
    begin.innerHTML = feature.target.feature.properties.start;

    sidebar.show();
}

$(function() {
    $('#slides').slidesjs({
        width: 940,
        height: 528,
        navigation: false
    });
});