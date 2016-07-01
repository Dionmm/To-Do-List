(function() {
  'use strict';

  angular
    .module('todoList')
    .service('TodoListService', TodoListService);

  TodoListService.$inject = ['$http', '$q'];

  function TodoListService($http, $q) {

    return {
      getTodos: getTodos,
      updateTodo: updateTodo,
      addTodo: addTodo
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
    
    function updateTodo(todo) {
      
      $http.put('/task/' + todo._id, todo).then(function(result) {
        console.log(result);
      }, function(error) {
        
      });

    }

    function addTodo(todo) {

      var deferred = $q.defer();

      $http.post('/task', todo).then(function(result) {
        deferred.resolve(result.data);
      }, function(error) {
        deferred.reject('Failed');
      });

      return deferred.promise;

    }

  }

})();