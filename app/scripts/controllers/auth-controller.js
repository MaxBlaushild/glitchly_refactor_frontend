'use strict';
angular.module('MainController').controller('AuthCtrl', AuthCtrl);


AuthCtrl.$inject = ['$location', 'AuthFactory'];

function AuthCtrl($location, AuthFactory){
  var vm = this;
  vm.credentials = {};

  vm.login = function(credentials){
    debugger;
    AuthFactory.login(credentials).then(function(response){
      vm.credentials = {};
      $location.path('');
    });
  };

  vm.logout = function(){
    AuthFactory.logout();
  };
}
