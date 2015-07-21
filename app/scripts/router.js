'use strict';

angular.module('frontendApp').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html'
    })
    .when('/login', {
      templateUrl: 'views/login-page.html'
    })
    .when('/followers', {
      templateUrl: 'views/user-list-view.html'
    })
    .when('/following', {
      templateUrl: 'views/user-list-view.html'
    })
    .when('/sign-up', {
      templateUrl: 'views/sign-up-view.html'
    })
    .when('/pictures/:pictureId', {
      templateUrl: 'views/picture-show-view.html'
    })
    .when('/discover', {
      templateUrl: 'views/discover-view.html'
    })
    .when('/glitch-a-pic', {
      templateUrl: 'views/new-picture-view.html'
    })
    .when('/users', {
      templateUrl: 'views/user-list-view.html'
    })
    .when('/users/:userId', {
      templateUrl: 'views/user-show-view.html'
    })
    .when('/glitch-in-progress', {
      templateUrl: 'views/glitch-in-progress-view.html'
    })
    .when('/glitch-error', {
      templateUrl: 'views/glitch-timeout-view.html'
    })
    .when('/preview/:pictureId', {
      templateUrl: 'views/preview-view.html',
      controller: PictureCtrl,
      controllerAs: 'PictureCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

