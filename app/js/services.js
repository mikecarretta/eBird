'use strict';

/* Services */
angular.module('ebird.services', []).
  factory('ebird', function($http) {
    var ebirdAPI = {};

    ebirdAPI.getBirdJson = function() {
      return $http({
        url: 'app/js/data.json'
      });
    }

    ebirdAPI.getBirdLoc = function() {
      var eBirdRootURL = 'http://ebird.org/ws1.1/data/';
      // Recent eBird Observations Made Nearby a Location
      var eBirdDataURL = 'obs/geo/recent';
      var eBirdLng = '-73.27';
      var eBirdLat = '41.17';
      var eBirdDist = '50';
      var eBirdDays = '30';
      var eBirdMaxResults = 30;

      var eBirdGeoRecentURL = eBirdRootURL + eBirdDataURL + '?lng=' + eBirdLng
        + '&lat=' + eBirdLat + '&dist=' + eBirdDist + '&maxResults='
        + eBirdMaxResults + '&locale=en_US' + '&fmt=json';

      return $http({
        url: eBirdGeoRecentURL
      });
    }

    ebirdAPI.getBirdLocDetail = function(id) {
      // http://ebird.org/ws1.1/data/obs/loc/recent?r=L99381&r=L104031&back=5&maxResults=500&detail=simple&locale=en_US&fmt=json&includeProvisional=true
      var eBirdRootURL = 'http://ebird.org/ws1.1/data/obs/loc/recent?r=';
      var max = 30;
      var detail = 'full'; // simple, full

      var apiUrl = eBirdRootURL + id + '&maxResults=' + max + '&detail=' + detail + '&fmt=json';

      return $http({
        url: apiUrl
      });
    }

    return ebirdAPI;
  }).
  factory('myHttpInterceptor', function ($q, $window) {
    return function (promise) {
      return promise.then(function (response) {
        $("#spinner").hide();
        return response;
      }, function (response) {
        $("#spinner").hide();
        return $q.reject(response);
      });
    };
  });
