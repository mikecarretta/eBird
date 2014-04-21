/*
	* eBird API
	* https://confluence.cornell.edu/display/CLOISAPI/eBird+API+1.1
*/

var eBirdRootURL = 'http://ebird.org/ws1.1/data/',
// Recent eBird Observations Made Nearby a Location
	eBirdDataURL = 'obs/geo/recent',
	eBirdLng = '-73.27',
	eBirdLat = '41.17',
	eBirdDist = '50',
	eBirdDays = '30',
	eBirdMaxResults = 10,
	eBirdGeoRecentURL = eBirdRootURL + eBirdDataURL + '?lng=' + eBirdLng
		+ '&lat=' + eBirdLat + '&dist=' + eBirdDist + '&maxResults=' 
		+ eBirdMaxResults + '&locale=en_US' + '&fmt=json';

var eBirdAjax = $.ajax({
	url: eBirdRootURL,
	type: 'GET',
	dataType: 'json',
	success: function(data) {
		$.each(data, function(k, v) {
			var ebirdData = $("#eBirdData");
			$('<li>' + v.comName + '</li>').appendTo(ebirdData);
		});
	},
	error: function(error) {
		console.log("error " + error.status);
	},
	beforeSend: function() {
		$('#eBirdData').addClass();
	},
	complete: function() {
		$('#eBirdData').removeClass();
	}
});

$(document).ready(function() {
	console.log(eBirdGeoRecentURL);
	console.log(eBirdAjax);
});
/*

Fully specified example:

http://ebird.org/ws1.1/data/
obs/geo/recent
?
lng=-76.51
&lat=42.46
&dist=2
&back=5
&maxResults=500
&locale=en_US
&fmt=json

Example JSON
[{
    "locID": "L99381",
    "lat": 42.4613266,
    "howMany": 1,
    "locName": "Stewart Park",
    "obsValid": true,
    "lng": -76.5059255,
    "sciName": "Hirundo rustica",
    "obsReviewed": false,
    "obsDt": "2009-06-24 17:00",
    "comName": "Barn Swallow"
}]
*/

/* NOW USING LOCAL DB, UPDATABLE FROM CORNELL'S BNA.CORNELL.EDU SITE
// get json birdlist (from cornell via YQL)
$.ajax({
	url: 'http://query.yahooapis.com/v1/public/yql/tim/birdlist',
	data: { "diagnostics": true, "format": "json", "callback": "birdlist" },
	type: 'GET',
	dataType: 'jsonp',
	success: birdlist
});

// creates SELECT list from Cornell (via YQL jsonp)
function birdlist(data){
	ebird.json_birdlist = data.query.results.div;
	
	$.each(ebird.json_birdlist, function(i, item) {
		if( typeof item.p != 'undefined' ){
			$('#sci-name').append("<option value='" + item.p.span.content + "'>" + item.a.span + "</option>");
		}
	});		
}
*/