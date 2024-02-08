// Initialize the Leaflet map centered on Saint Louis
var map = L.map('map').setView([38.64068 ,-90.44341], 10);

// Add a tile layer
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Esri, HERE, Garmin, © OpenStreetMap contributors',
    maxZoom: 18
}).addTo(map);

// Load GeoJSON for County
$.getJSON("https://raw.githubusercontent.com/cagrigul/advprog_project1_data/main/county.geojson", function(countyData) {
    L.geoJson(countyData, {
        style: function(feature) {
            return {
                color: "#000000",
                fillColor: "#4682B4",
                fillOpacity: 0,
                weight: 3,             
                opacity: 1
            };
        }
    }).addTo(map);
});
$.getJSON("https://raw.githubusercontent.com/cagrigul/advprog_project1_data/main/district.geojson", function(data) {
    L.geoJson(data, {
        style: function(feature) {
            return {
                color: "#00008B", // 
                fillColor: "#4682B4", // 
                fillOpacity: 0.5, // 
                dashArray: '5, 5',
                weight: 2, // 
                opacity: 1 //
            };
        },
        onEachFeature: function(feature, layer) {
            var popupContent = "District Name: " + feature.properties.DIST_NAME +
                "<br>Low Grade: " + feature.properties.LOGRADE +
                "<br>High Grade: " + feature.properties.HIGRADE +
                "<br>Count School: " + feature.properties.CountSchool;
            layer.bindPopup(popupContent);
        }
    }).addTo(map);
});
// School katmanı
$.getJSON("https://raw.githubusercontent.com/cagrigul/advprog_project1_data/main/school.geojson", function(data) {
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            var schoolIcon = L.icon({
                iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Round_Landmark_School_Icon_-_Transparent.svg/512px-Round_Landmark_School_Icon_-_Transparent.svg.png', // İkonun URL'si
                iconSize: [16, 16], // İkonun boyutu
                iconAnchor: [16, 37], // İkonun "bağlanma noktası"
                popupAnchor: [0, -28] // Popup'ın konumu
            });
            return L.marker(latlng, {icon: schoolIcon});
        },
        onEachFeature: function(feature, layer) {
            var popupContent = "Facility: " + feature.properties.Facility +
                "<br>Address: " + feature.properties.Adress +
                "<br>City: " + feature.properties.City +
                "<br>Phone: " + feature.properties.Phone +
                "<br>Email: " + feature.properties.Email +
                "<br>Teachers: " + feature.properties.Teachers +
                "<br>Enrollment: " + feature.properties.Enrollment;
            layer.bindPopup(popupContent);
        }
    }).addTo(map);
});


var legend = L.control({position: 'bottomright'});

legend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.style.backgroundColor = 'White';
    div.style.padding = '25px';
    div.style.border = '1px solid #ccc';
    div.innerHTML += '<h4>Legend</h4>';
    div.innerHTML += '<i style="background: #000000; width: 30px; height: 2px; display: inline-block; margin-right: 5px; vertical-align: middle;"></i>County<br>';
    div.innerHTML += '<i style="border-top: 2px dashed #00008B; width: 30px; height: 2px; display: inline-block; margin-right: 5px; vertical-align: middle;"></i>District<br>';
    div.innerHTML += '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Round_Landmark_School_Icon_-_Transparent.svg/512px-Round_Landmark_School_Icon_-_Transparent.svg.png" width="18" height="18" style="vertical-align: middle;"> School<br>';

    return div;
};

legend.addTo(map);

