'use strict';

/* Controllers */

angular.module('ebird.controllers', [])
  // NAV pills controller - https://github.com/DanWahlin/CustomerManagerStandard
  .controller('NavbarController', function ($scope, $location) {
    $scope.getClass = function (path) {
      if ($location.path().substr(0, path.length) == path) {
        return true
      } else {
        return false;
      }
    }
  })
  .controller('SearchController', function($scope, $location, getSearchLoc) {
    $scope.latLg = '';
    $scope.towns = [{"name": "Greenwich", "lat": 41.0688, "lng": -73.64},
    {"name": "Norwalk", "lat": 41.109, "lng": -73.427},
    {"name": "Westport", "lat": 41.132, "lng": -73.342},
    {"name": "Fairfield", "lat": 41.174, "lng": -73.278},
    {"name": "Bridgeport", "lat": 41.19, "lng": -73.20},
    {"name": "Stratford", "lat": 41.20, "lng": -73.125},
    {"name": "Milford", "lat": 41.22, "lng": -73.05},
    {"name": "Madison", "lat": 41.34, "lng": -72.61},
    {"name": "New London", "lat": 41.34, "lng": -72.105}];

    $scope.$watch('latLg', function(newVal) {
      if (newVal) {
        $scope.submit = function() {
          var lat = $scope.latLg.lat;
          var lng = $scope.latLg.lng;

          getSearchLoc.eBirdApi(lat, lng).success(function (data) {
            $scope.ebirdList = data;
            //console.log($scope.ebirdList);
          });
        };
      }
    });
  })
  .controller('LocationController', function($scope, $routeParams, getLocation) {
    $scope.locID = $routeParams.locID;
    var id = $scope.locID;
    getLocation.eBirdApi(id).success(function (data) {
      $scope.birdLocDetail = data;
    });
  })
