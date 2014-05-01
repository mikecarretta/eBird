'use strict';

/* Services */
angular.module('ebird.services', [])
  .factory('getSearchLoc', ['$http', function($http) {
    return {
      eBirdApi: function(lat, lng) {
        var eBirdRootURL = 'http://ebird.org/ws1.1/data/obs/geo/recent';
        // Recent eBird Observations Made Nearby a Location
        var eBirdDist = '30';
        var eBirdDays = '30';
        var eBirdMaxResults = 50;

        var eBirdGeoRecentURL = eBirdRootURL + '?lng=' + lng
          + '&lat=' + lat + '&dist=' + eBirdDist + '&maxResults='
          + eBirdMaxResults + '&locale=en_US' + '&fmt=json';
        console.log(eBirdGeoRecentURL);

        return $http({
          url: eBirdGeoRecentURL
        });
      }
    }
  }])
  .factory('getLocation', ['$http', function($http) {
    return {
      eBirdApi: function(id) {
        // http://ebird.org/ws1.1/data/obs/loc/recent?r=L99381&r=L104031&back=5&maxResults=500&detail=simple&locale=en_US&fmt=json&includeProvisional=true
        var eBirdRootURL = 'http://ebird.org/ws1.1/data/obs/loc/recent?r=';
        var max = 50;
        var detail = 'full'; // simple, full

        var apiUrl = eBirdRootURL + id + '&maxResults=' + max + '&detail=' + detail + '&fmt=json';

        console.log(apiUrl);

        return $http({
          url: apiUrl
        });
      }
    }
  }])
  .factory('myHttpInterceptor', function ($q, $window) {
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