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

  .controller('LocCtrl', function($scope, ebird) {
    ebird.getBirdLoc().success(function (data) {
      $scope.ebirdList = data;
    });
  })

  .controller('LocDetailCtrl', function($scope, $routeParams, ebird) {
    $scope.locID = $routeParams.locID;
    var id = $scope.locID;
    ebird.getBirdLocDetail(id).success(function (data) {
      $scope.birdLocDetail = data;
    });
  })

  .controller('LocationCtrl', function($scope, ebird) {
    ebird.getBirdJson().success(function (response) {
      $scope.birdLocList = response;
    });
  });

  // SPINNER.gif - the Factory is above all the ajax calls: myHttpInterceptor
// http://fdietz.github.io/recipes-with-angular-js/common-user-interface-patterns/displaying-a-loading-spinner.html
$httpProvider.responseInterceptors.push('myHttpInterceptor');
  var spinnerFunction = function spinnerFunction(data, headersGetter) {
    $("#spinner").show();
    return data;
  };
$httpProvider.defaults.transformRequest.push(spinnerFunction);

