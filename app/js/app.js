'use strict';


// Declare app level module which depends on filters, and services
angular.module('ebird', [
  'ngRoute',
  'ebird.services',
  'ebird.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/location', {templateUrl: 'app/partials/location.html', controller: 'LocCtrl'}).
  when('/location/:locID', {templateUrl: 'app/partials/location-detail.html', controller: 'LocDetailCtrl'}).
  when('/stratford', {templateUrl: 'app/partials/stratford.html', controller: 'LocationCtrl'}).
  when('/about', {templateUrl: 'app/partials/about.html'}).
  otherwise({redirectTo: '/location'});
}]);
