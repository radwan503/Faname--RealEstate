jQuery(function($) {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD9mGyoiEpmJ_0vvHFCF2N62kMf2bKcfyg&callback=initialize";
    document.body.appendChild(script);
});

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);

    // Multiple Markers
    var markers = [
        ['Karwan Bazar, Dhaka, Bangladesh', 23.754253, 90.393425],
        ['Mohakhali, Dhaka, Bangladesh', 23.777628, 90.405449],
        ['Motijheel, Dhaka, Bangladesh', 23.733330, 90.417458],
        ['Dhanmondi, Dhaka, Bangladesh', 23.746466,  90.376015]
    ];

    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
            '<h3 class="info_location_name">Karwan Bazar</h3>' +
            '<p class="info_location_text">Dhaka, Bangladesh</p>' +
            '<p class="info_location_call"><span><i class="fa fa-phone"></i></span>(800) 123-4567</p>' +
            '<a href="#" class="btn-link">View Location</a>' +


            '</div>'
        ],
        ['<div class="info_content">' +
            '<h3 class="info_location_name">Mohakhali</h3>' +
            '<p class="info_location_text">2105, Dhaka, Bangladesh</p>' +
            '<p class="info_location_call"><span><i class="fa fa-phone"></i></span>(800) 123-1314</p>' +
            '<a href="#" class="btn-link">View Location</a>' +


            '</div>'
        ],
        ['<div class="info_content">' +
            '<h3 class="info_location_name">Motijheel</h3>' +
            '<p class="info_location_text">1012, Dhaka, Bangladesh</p>' +
            '<p class="info_location_call"><span><i class="fa fa-phone"></i></span>(800) 123-1112</p>' +
            '<a href="#" class="btn-link">View Location</a>' +


            '</div>'
        ],
        ['<div class="info_content">' +
            '<h3 class="info_location_name">Dhanmondi</h3>' +
            '<p class="info_location_text">1537, Dhaka, Bangladesh</p>' +
            '<p class="info_location_call"><span><i class="fa fa-phone"></i></span>(800) 123-8910</p>' +
            '<a href="#" class="btn-link">View Location</a>' +


            '</div>'
        ]
    ];
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow({ maxWidth: 280 }),
        marker, i;

    // Loop through our array of markers & place each one on the map  
    for (i = 0; i < markers.length; i++) {
        var position = new google.maps.LatLng(markers[i][1],
            markers[i][2], markers[i][3], markers[i][4]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var  tilesloadedListener = google.maps.event.addListener((map),  'tilesloaded', function(event) {
        this.setZoom(5);
        google.maps.event.removeListener(tilesloadedListener);
    });

}