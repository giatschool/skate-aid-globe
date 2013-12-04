var map = L.map('map', {
    center: [-0.8788717828324148, 29.003906249999996],
    zoom: 3,
    minZoom: 3
});

var crossIcon = L.icon({
    iconUrl: 'img/cross.png',

    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
});

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

var fullExtent = L.control({position: 'topleft'});

fullExtent.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info extent');

    var stop = L.DomEvent.stopPropagation;

    L.DomEvent.on(div,'click',function(){
        sidebar.hide(); 
        map.setView([-0.8788717828324148, 29.003906249999996],3);
    });

    L.DomEvent
        .on(div, 'click', stop)
        .on(div, 'mousedown', stop)
        .on(div, 'dblclick', stop)
        .on(div, 'click', L.DomEvent.preventDefault);

    div.innerHTML = "<div id='extent'></div>";

    return div;
}

fullExtent.addTo(map);

var sidebar = L.control.sidebar('sidebar', {
    closeButton: true,
    position: 'left'
});

map.addControl(sidebar);

map.on('click', function () {
    sidebar.hide();
});

function zoomToFeature(e) {
    map.setView(e.latlng,12);
}

function onEachFeature(feature, layer) {

    layer.on({
        click: locationClick,
        click: zoomToFeature
    });

    layer.on('click', locationClick);
}

var skateaid = L.geoJson(skateaidlocations, {

    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: crossIcon});
    },

    onEachFeature: onEachFeature,

}).addTo(map);

$(function() {
    $('#slides').slidesjs({
        width: 940,
        height: 528,
        navigation: false
    });
});

function locationClick(feature){

    var title = document.getElementById('title');
    var country = document.getElementById('country');
    var description = document.getElementById('description');
    var partner = document.getElementById('partner');
    var begin = document.getElementById('begin');

    var where = feature.target.feature.properties.country + ", " + feature.target.feature.properties.location;

    title.innerHTML = feature.target.feature.properties.location;
    country.innerHTML = where;
    description.innerHTML = feature.target.feature.properties.description;
    partner.innerHTML = feature.target.feature.properties.partner;
    begin.innerHTML = feature.target.feature.properties.start;

    if (feature.target.feature.properties.images[0] != "") {
        $( "#image1" ).attr( "src", feature.target.feature.properties.images[0] );
    }

    if (feature.target.feature.properties.images[1] != "") {
        $( "#image2" ).attr( "src", feature.target.feature.properties.images[1] );   
    }

    if (feature.target.feature.properties.images[2] != "") {
        $( "#image3" ).attr( "src", feature.target.feature.properties.images[2] );
    }

    sidebar.show();
}

var logos = L.control({position: 'bottomright'});

logos.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = '<div class="skateaid"></div><div class="ifgi"></div>';

    return div;
};

logos.addTo(map);