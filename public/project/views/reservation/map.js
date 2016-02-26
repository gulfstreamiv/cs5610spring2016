var map;
google.maps.event.addDomListener(window, 'load', drawMarker);

// Retrieve the variables in URL
function init() {
	// Student's latitude and longitude
	var slat = location.href.match(/[?&]slat=([^&]*)/)[1];
	var slng = location.href.match(/[?&]slng=([^&]*)/)[1];
	
	drawMap(slat, slng);
	drawMarker(slat, slng, 'Student');
	
	// Display tutor if the location information is given
	if(location.href.match(/[?&]lat=([^&]*)/) != null && location.href.match(/[?&]lng=([^&]*)/) != null) {
		var lat = location.href.match(/[?&]lat=([^&]*)/)[1];
		var lng = location.href.match(/[?&]lng=([^&]*)/)[1];
		drawMarker(lat, lng, 'Tutor');
		var latlng = new google.maps.LatLng(lat, lng);
		map.panTo(latlng);
	}
}

// Display Google Maps
function drawMap(lat, lng) {
	var latlng = new google.maps.LatLng(lat, lng);
	var myOptions = {
		zoom: 13,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('idMap'), myOptions);
}

// Place a Google Maps marker
function drawMarker(lat, lng, titleVar) {
	var latlng = new google.maps.LatLng(lat, lng);
	
	if(titleVar == 'Student')
		var image = {
			url: 'markerStudent.png',
			size: new google.maps.Size(30, 30),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(15, 15)
		};
	else
		var image = {
			url: 'markerTutor.png',
			size: new google.maps.Size(25, 30),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(12, 15)
		};
	
	var marker = new google.maps.Marker({
		position: latlng,
		map: map,
		title: titleVar,
		icon: image
	});
}