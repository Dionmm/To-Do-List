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

      $http.get('/task').then(function(result) {
        deferred.resolve(result.data);
      }, function(error) {
        deferred.reject('Failed');
      });

      return deferred.promise;

    }

  }

})();