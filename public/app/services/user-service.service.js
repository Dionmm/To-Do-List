(function() {
  'use strict';

  angular
    .module('todoList')
    .service('UserService', TodoListService);

  TodoListService.$inject = ['$http', '$q'];

  function TodoListService($http, $q) {

    return {
      login: login,
      register: register,
      forgot: forgot
    };

    function login(email, password) {

      var deferred = $q.defer();

      $http.post('/user/auth', { email: email, password: password }).then(function(result) {
        deferred.resolve(result.data);
      }, function(error) {
        deferred.reject('Failed');
      });

      return deferred.promise;

    }

    function register(email, password) {

      var deferred = $q.defer();

      $http.post('/user/register', { email: email, password: password }).then(function(result) {
        login(email, password).then(function(loginResult) {
          deferred.resolve(loginResult);
        });
      }, function(error) {
        deferred.reject('Failed');
      });

      return deferred.promise;

    }

    function forgot(email) {

      var deferred = $q.defer();

      $http.post('/user/forgot', { email: email }).then(function(result) {
        deferred.resolve(result.data);
      }, function(error) {
        deferred.reject('Failed');
      });

      return deferred.promise;

    }

  }

})();