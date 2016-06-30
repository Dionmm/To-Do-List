(function () {
  'use strict';

  angular
    .module('todoList')
    .controller('todoListCtrl', todoListCtrl);

  todoListCtrl.$inject = ['TodoListService'];

  function todoListCtrl(TodoListService) {

    var vm = this;


    TodoListService.getTodos().then(function(data){
      vm.items = data;
    });

  }

})();