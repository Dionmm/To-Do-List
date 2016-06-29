(function() {
  'use strict';

  angular
    .module('todoList')
    .service('TodoListService', TodoListService);

  TodoListService.$inject = ['$http', '$q'];

  function TodoListService($http, $q) {

    return {
      "getTodos": getTodos
    }

    function getTodos() {

      var deferred = $q.defer();

      $http.get('/tickets').then(function(result) {
        console.log(result);
        deferred.resolve(result);
      }, function(error) {
        deferred.reject('Failed');
      });

      return deferred.promise;

    }

  }

})();