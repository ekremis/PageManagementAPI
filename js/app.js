var pagemanagementApp = angular.module('pagemanagementApp', ['ngRoute','pagemanagementControllers']);

pagemanagementApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
	  when('/documentation', {
        templateUrl: 'partials/documentation.html',
        controller: 'DocumentationCtrl'
      }).	
      when('/list_pages', {
        templateUrl: 'partials/list_pages.html',
        controller: 'ListCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);


