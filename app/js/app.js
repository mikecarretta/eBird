'use strict';


// Declare app level module which depends on filters, and services
angular.module('ebird', [
  'ngRoute',
  'ui.bootstrap',
  'ebird.services',
  'ebird.controllers'
]).
config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.when('/location', {templateUrl: 'app/partials/location.html', controller: 'SearchController'});
  $routeProvider.when('/location/:locID', {templateUrl: 'app/partials/location-detail.html', controller: 'LocationController'});
  $routeProvider.when('/about', {templateUrl: 'app/partials/about.html'});
  $routeProvider.otherwise({redirectTo: '/location'});

    // SPINNER.gif - the Factory is above all the ajax calls: myHttpInterceptor
  // http://fdietz.github.io/recipes-with-angular-js/common-user-interface-patterns/displaying-a-loading-spinner.html
  $httpProvider.responseInterceptors.push('myHttpInterceptor');
    var spinnerFunction = function spinnerFunction(data, headersGetter) {
      $("#spinner").show();
      return data;
    };
  $httpProvider.defaults.transformRequest.push(spinnerFunction);
}]);
