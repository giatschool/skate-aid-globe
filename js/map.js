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
    
    layer.on('click', function (){
        sidebar.show();
    });
}


var skateaid = L.geoJson(skateaidlocations, {

    onEachFeature: onEachFeature,

}).addTo(map);
